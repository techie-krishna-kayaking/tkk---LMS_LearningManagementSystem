export function ProfilePage() {
  const userRaw = localStorage.getItem('tkk_lms_user');
  const user = userRaw ? (JSON.parse(userRaw) as { fullName?: string; email?: string }) : null;

  return (
    <section>
      <div className="section-head">
        <h2>My Profile</h2>
        <p>Manage your student identity and communication preferences.</p>
      </div>

      <div className="grid-2">
        <article className="card stack-gap">
          <h3>Profile Info</h3>
          <label>
            Full Name
            <input value={user?.fullName || 'Demo Student'} readOnly />
          </label>
          <label>
            Email
            <input value={user?.email || 'student@tkklms.demo'} readOnly />
          </label>
          <label>
            Phone
            <input value="+91-9000000000" readOnly />
          </label>
        </article>

        <article className="card stack-gap">
          <h3>Learning Identity</h3>
          <p>
            Your name and email are embedded in dynamic forensic watermarks during lesson playback as a
            practical anti-leak deterrence layer.
          </p>
          <span className="chip">Watermark Enabled</span>
          <span className="chip">Session Tracking Enabled</span>
        </article>
      </div>
    </section>
  );
}
