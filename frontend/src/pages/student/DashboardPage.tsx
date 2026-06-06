import { Link } from 'react-router-dom';
import { enrolledCourses } from '../../lib/studentCourses';

export function DashboardPage() {
  const avgProgress = Math.round(
    enrolledCourses.reduce((sum, course) => sum + course.progressPercent, 0) / Math.max(enrolledCourses.length, 1),
  );

  return (
    <section className="stack-gap">
      <div className="section-head">
        <h2>Student Dashboard</h2>
        <p>You are enrolled in {enrolledCourses.length} courses. Track completion for each one below.</p>
      </div>

      <div className="grid-3">
        <div className="card"><h3>Avg Progress</h3><p>{avgProgress}% across enrolled courses</p></div>
        <div className="card"><h3>Quiz Avg</h3><p>81%</p></div>
        <div className="card"><h3>Next Installment</h3><p>Due in 7 days</p></div>
      </div>

      <section className="stack-gap">
        {enrolledCourses.map((course) => (
          <article className="card stack-gap" key={course.id}>
            <div className="progress-head">
              <h3>{course.title}</h3>
              <strong>{course.progressPercent}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill animated" style={{ width: `${course.progressPercent}%` }} />
            </div>
            <p className="muted">
              {course.completedLessons}/{course.totalLessons} lessons completed • Last watched {course.lastWatchedAt}
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" to={`/student/course/${course.id}`}>
                View Detailed Progress
              </Link>
              <Link className="btn-secondary" to={course.nextLessonPath}>
                Continue Course
              </Link>
            </div>
          </article>
        ))}
      </section>

      <div className="stack-gap">
        <Link className="btn-secondary" to="/notes">
          Open Study Notes
        </Link>
        <Link className="btn-secondary" to="/student/profile">
          View Profile
        </Link>
        <Link className="btn-secondary" to="/student/settings">
          Notification & Security Settings
        </Link>
      </div>
    </section>
  );
}
