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

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@tkklms.demo');
  const [password, setPassword] = useState('Demo@12345');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiPost<LoginResponse>('/auth/login', { email, password });
      localStorage.setItem('tkk_lms_access_token', response.accessToken);
      localStorage.setItem('tkk_lms_user', JSON.stringify(response.user));
      navigate('/student/dashboard');
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
        <p className="muted">Use the demo credentials pre-filled below to access the course.</p>

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="muted">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
