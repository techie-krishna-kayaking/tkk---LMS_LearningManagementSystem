import { FormEvent, useMemo, useState } from 'react';
import { apiGet, apiPost } from '../../lib/api';

interface ImportedChapter {
  id: string;
  title: string;
  ytLink: string;
}

interface ImportedModule {
  id: string;
  title: string;
  chapters: ImportedChapter[];
}

interface ImportedCourse {
  id: string;
  title: string;
  slug: string;
  modules: ImportedModule[];
}

interface ImportResponse {
  importedCourses: ImportedCourse[];
  totalRows: number;
  message: string;
}

const SAMPLE_CSV = [
  'course,module,chapter,yt-link',
  'ETL Mastery,Module 1,Intro to ETL,https://www.youtube.com/watch?v=abc123',
  'ETL Mastery,Module 1,Validation Patterns,https://www.youtube.com/watch?v=def456',
  'ETL Mastery,Module 2,PySpark Basics,https://www.youtube.com/watch?v=ghi789',
].join('\n');

export function AdminCourseImportPage() {
  const [csv, setCsv] = useState(SAMPLE_CSV);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<ImportedCourse[]>([]);

  const totalChapters = useMemo(
    () => courses.flatMap((course) => course.modules).flatMap((module) => module.chapters).length,
    [courses],
  );

  async function fetchCurrentCurriculum() {
    try {
      const resp = await apiGet<ImportedCourse[]>('/courses/admin/curriculum');
      setCourses(resp);
      setError(null);
      setMessage('Loaded current imported curriculum.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load curriculum');
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const resp = await apiPost<ImportResponse>('/courses/admin/import-csv', { csv });
      setCourses(resp.importedCourses || []);
      setMessage(resp.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="stack-gap">
      <div className="section-head">
        <h2>Admin Course CSV Import</h2>
        <p>Paste your CSV with columns: course, module, chapter, yt-link.</p>
      </div>

      <form className="card stack-gap" onSubmit={onSubmit}>
        <label>
          CSV content
          <textarea
            rows={10}
            value={csv}
            onChange={(event) => setCsv(event.target.value)}
            style={{ width: '100%', marginTop: 8 }}
          />
        </label>

        <div className="hero-actions">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Importing...' : 'Import CSV'}
          </button>
          <button className="btn-secondary" type="button" onClick={fetchCurrentCurriculum}>
            Load Current Imported Data
          </button>
        </div>

        {message && <p className="muted">{message}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>

      <article className="card stack-gap">
        <h3>Imported Structure</h3>
        <p className="muted">
          Courses: {courses.length} | Chapters: {totalChapters}
        </p>

        {courses.map((course) => (
          <div key={course.id}>
            <h4>{course.title}</h4>
            {course.modules.map((module) => (
              <div key={module.id} style={{ marginLeft: 12, marginBottom: 8 }}>
                <strong>{module.title}</strong>
                <ul>
                  {module.chapters.map((chapter) => (
                    <li key={chapter.id}>
                      {chapter.title} - {chapter.ytLink}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {courses.length === 0 && <p className="muted">No imported curriculum yet.</p>}
      </article>
    </section>
  );
}
