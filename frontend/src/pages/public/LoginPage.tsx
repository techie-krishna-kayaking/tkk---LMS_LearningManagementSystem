import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../../lib/api';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

type AuthMode = 'password' | 'smsOtp' | 'gmailOtp' | 'google';

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('password');
  const [email, setEmail] = useState('student@tkklms.demo');
  const [password, setPassword] = useState('Demo@12345');
  const [phone, setPhone] = useState('+919000000000');
  const [smsOtp, setSmsOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [googleName, setGoogleName] = useState('Demo Student');
  const [otpHint, setOtpHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onAuthSuccess(response: LoginResponse) {
    localStorage.setItem('tkk_lms_access_token', response.accessToken);
    localStorage.setItem('tkk_lms_user', JSON.stringify(response.user));
    navigate('/student/dashboard');
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOtpHint(null);

    try {
      if (mode === 'password') {
        const response = await apiPost<LoginResponse>('/auth/login', { email, password });
        onAuthSuccess(response);
        return;
      }

      if (mode === 'smsOtp') {
        if (!smsOtp) {
          const sendResp = await apiPost<{ otp?: string; message?: string }>('/auth/otp/sms/request', { phone });
          setOtpHint(`SMS OTP sent (demo OTP: ${sendResp.otp || '******'})`);
        } else {
          const response = await apiPost<LoginResponse>('/auth/otp/sms/verify', { phone, otp: smsOtp });
          onAuthSuccess(response);
        }
        return;
      }

      if (mode === 'gmailOtp') {
        if (!emailOtp) {
          const sendResp = await apiPost<{ otp?: string; message?: string }>('/auth/otp/email/request', { email });
          setOtpHint(`Gmail OTP sent (demo OTP: ${sendResp.otp || '******'})`);
        } else {
          const response = await apiPost<LoginResponse>('/auth/otp/email/verify', { email, otp: emailOtp });
          onAuthSuccess(response);
        }
        return;
      }

      const response = await apiPost<LoginResponse>('/auth/google/sign-in', {
        email,
        fullName: googleName,
      });
      onAuthSuccess(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-wrap">
      <form className="card auth-card" onSubmit={onSubmit}>
        <h2>Login to TKK LMS</h2>
        <p className="muted">Choose login method: SMS OTP, Gmail OTP, Google Sign-In, or password.</p>

        <div className="auth-tabs" role="tablist" aria-label="Login methods">
          <button className={`auth-tab ${mode === 'password' ? 'active' : ''}`} type="button" onClick={() => setMode('password')}>
            Password
          </button>
          <button className={`auth-tab ${mode === 'smsOtp' ? 'active' : ''}`} type="button" onClick={() => setMode('smsOtp')}>
            SMS OTP
          </button>
          <button className={`auth-tab ${mode === 'gmailOtp' ? 'active' : ''}`} type="button" onClick={() => setMode('gmailOtp')}>
            Gmail OTP
          </button>
          <button className={`auth-tab ${mode === 'google' ? 'active' : ''}`} type="button" onClick={() => setMode('google')}>
            Google Sign-In
          </button>
        </div>

        {mode === 'password' && (
          <div className="auth-panel stack-gap">
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
        )}

        {mode === 'smsOtp' && (
          <div className="auth-panel stack-gap">
            <label>
              Phone Number
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+919000000000" />
            </label>
            <label>
              OTP (enter after requesting)
              <input value={smsOtp} onChange={(e) => setSmsOtp(e.target.value)} placeholder="6-digit OTP" />
            </label>
          </div>
        )}

        {mode === 'gmailOtp' && (
          <div className="auth-panel stack-gap">
            <label>
              Gmail Address
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              OTP (enter after requesting)
              <input value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} placeholder="6-digit OTP" />
            </label>
          </div>
        )}

        {mode === 'google' && (
          <div className="auth-panel stack-gap">
            <label>
              Google Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Full Name
              <input value={googleName} onChange={(e) => setGoogleName(e.target.value)} />
            </label>
          </div>
        )}

        {otpHint && <p className="otp-hint">{otpHint}</p>}

        {error && <p className="error-text">{error}</p>}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading
            ? 'Please wait...'
            : mode === 'smsOtp'
              ? smsOtp
                ? 'Verify SMS OTP'
                : 'Send SMS OTP'
              : mode === 'gmailOtp'
                ? emailOtp
                  ? 'Verify Gmail OTP'
                  : 'Send Gmail OTP'
                : mode === 'google'
                  ? 'Continue with Google'
                  : 'Login'}
        </button>

        <p className="muted">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
