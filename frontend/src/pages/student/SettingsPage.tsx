import { useState } from 'react';

export function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [whatsAppReminders, setWhatsAppReminders] = useState(true);

  return (
    <section>
      <div className="section-head">
        <h2>Settings</h2>
        <p>Control notification channels and platform behavior.</p>
      </div>

      <div className="grid-2">
        <article className="card stack-gap">
          <h3>Notification Preferences</h3>
          <label className="toggle-row">
            <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs((v) => !v)} />
            Email updates for announcements and class reminders
          </label>
          <label className="toggle-row">
            <input type="checkbox" checked={smsNotifs} onChange={() => setSmsNotifs((v) => !v)} />
            SMS reminders for installments and live class starts
          </label>
          <label className="toggle-row">
            <input type="checkbox" checked={whatsAppReminders} onChange={() => setWhatsAppReminders((v) => !v)} />
            WhatsApp nudges for inactive learning streaks
          </label>
        </article>

        <article className="card stack-gap">
          <h3>Account Security</h3>
          <p>Enable stronger account checks when unusual logins are detected.</p>
          <label className="toggle-row">
            <input type="checkbox" checked readOnly />
            OTP re-verification for suspicious device activity
          </label>
          <label className="toggle-row">
            <input type="checkbox" checked readOnly />
            Limit concurrent sessions
          </label>
        </article>
      </div>
    </section>
  );
}
