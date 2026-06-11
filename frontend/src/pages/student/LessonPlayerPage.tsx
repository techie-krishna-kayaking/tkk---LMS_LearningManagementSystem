import { useMemo, useState } from 'react';
import { ForensicWatermarkOverlay } from '../../components/ForensicWatermarkOverlay';
import { DATABRICKS_FALLBACK_URL } from '../../lib/constants';

interface Chapter {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
}

interface ModuleSection {
  id: string;
  title: string;
  chapters: Chapter[];
}

export function LessonPlayerPage() {
  const allowLiveJoin = useMemo(() => true, []);
  const storedUser = localStorage.getItem('tkk_lms_user');
  const parsedUser = storedUser ? (JSON.parse(storedUser) as { fullName?: string; email?: string }) : null;
  const playlistId = 'PLhXtefn-T4njrv4MS1aiB5w3P0w9jBVYE';
  const curriculum: ModuleSection[] = [
    {
      id: 'm1',
      title: 'Module 1: ETL Testing Foundations',
      chapters: [
        { id: 'c1', title: 'Course Orientation', duration: '07:30', completed: true },
        { id: 'c2', title: 'What is ETL & DWH', duration: '15:12', completed: true },
        { id: 'c3', title: 'Testing Layers & Scope', duration: '18:40', completed: true },
      ],
    },
    {
      id: 'm2',
      title: 'Module 2: SQL + Validation Patterns',
      chapters: [
        { id: 'c4', title: 'Source to Target Validation', duration: '23:10', completed: true },
        { id: 'c5', title: '250 SQL Query Patterns', duration: '31:45', completed: false },
        { id: 'c6', title: 'Performance Tuning Checks', duration: '22:19', completed: false },
      ],
    },
    {
      id: 'm3',
      title: 'Module 3: Automation with Python & PySpark',
      chapters: [
        { id: 'c7', title: 'Python ETL Test Harness', duration: '28:30', completed: false },
        { id: 'c8', title: 'Pandas Validation Workflow', duration: '24:42', completed: false },
        { id: 'c9', title: 'PySpark Data Quality Suite', duration: '36:55', completed: false },
      ],
    },
  ];
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1', 'm2']);
  const [activeChapterId, setActiveChapterId] = useState('c5');

  const allChapters = curriculum.flatMap((m) => m.chapters);
  const completedCount = allChapters.filter((c) => c.completed).length;
  const completionPercent = Math.round((completedCount / Math.max(allChapters.length, 1)) * 100);
  const activeChapter = allChapters.find((chapter) => chapter.id === activeChapterId) || allChapters[0];

  function toggleModule(moduleId: string) {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId],
    );
  }

  return (
    <section className="lesson-layout udemy-like-layout">
      <div className="stack-gap">
        <div className="card">
          <div className="progress-head">
            <h3>Ultimate ETL Testing & Automation Mastery</h3>
            <strong>{completionPercent}% complete</strong>
          </div>
          <p className="muted">Now learning: {activeChapter.title} ({activeChapter.duration})</p>
          <div className="progress-track">
            <div className="progress-fill animated" style={{ width: `${completionPercent}%` }} />
          </div>
        </div>

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

        <div className="hero-actions">
          <a className="btn-secondary" target="_blank" rel="noreferrer" href={DATABRICKS_FALLBACK_URL}>
            Practice in Databricks Community
          </a>
          {allowLiveJoin && (
            <button className="btn-primary" type="button">
              Join Live Class
            </button>
          )}
        </div>
      </div>

      <aside className="card curriculum-panel">
        <div className="progress-head">
          <h3>Course Content</h3>
          <strong>
            {completedCount}/{allChapters.length}
          </strong>
        </div>
        <p className="muted">Modules and chapters with completion tracking, similar to Udemy flow.</p>

        <div className="curriculum-list">
          {curriculum.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            return (
              <article key={module.id} className="module-block">
                <button className="module-title-btn" type="button" onClick={() => toggleModule(module.id)}>
                  <span>{module.title}</span>
                  <span>{isExpanded ? '−' : '+'}</span>
                </button>

                {isExpanded && (
                  <div className="chapter-list">
                    {module.chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        className={`chapter-item ${chapter.id === activeChapterId ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveChapterId(chapter.id)}
                      >
                        <div>
                          <p>{chapter.title}</p>
                          <small>{chapter.duration}</small>
                        </div>
                        <span className={`chapter-status ${chapter.completed ? 'done' : 'pending'}`}>
                          {chapter.completed ? 'Done' : 'Pending'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </aside>
    </section>
  );
}
