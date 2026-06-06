import { useMemo } from 'react';
import { ForensicWatermarkOverlay } from '../../components/ForensicWatermarkOverlay';
import { DATABRICKS_FALLBACK_URL } from '../../lib/constants';

export function LessonPlayerPage() {
  const allowLiveJoin = useMemo(() => true, []);
  const storedUser = localStorage.getItem('tkk_lms_user');
  const parsedUser = storedUser ? (JSON.parse(storedUser) as { fullName?: string; email?: string }) : null;
  const playlistId = 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE';

  return (
    <section className="lesson-layout">
      <div className="video-shell">
        <iframe
          title="lesson-player"
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <ForensicWatermarkOverlay
          fullName={parsedUser?.fullName || 'Demo Student'}
          email={parsedUser?.email || 'student@tkklms.demo'}
          phone="+91-9000000000"
          sessionHint="sess-9ab2"
        />
      </div>

      <aside className="card">
        <h3>Databricks Playlist Course</h3>
        <p>This lesson player is now bound to your provided YouTube playlist.</p>
        <a className="btn-secondary" target="_blank" rel="noreferrer" href={DATABRICKS_FALLBACK_URL}>
          Practice in Databricks Community
        </a>
        {allowLiveJoin && (
          <button className="btn-primary" type="button">
            Join Live Class
          </button>
        )}
      </aside>
    </section>
  );
}
