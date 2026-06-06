import { Link, Navigate, useParams } from 'react-router-dom';
import { enrolledCourses } from '../../lib/studentCourses';

export function CourseProgressPage() {
  const { courseId } = useParams();
  const course = enrolledCourses.find((item) => item.id === courseId);

  if (!course) {
    return <Navigate to="/student/dashboard" replace />;
  }

  return (
    <section className="stack-gap">
      <div className="section-head">
        <h2>{course.title}</h2>
        <p>Detailed completion status for this enrolled course.</p>
      </div>

      <article className="card stack-gap">
        <div className="progress-head">
          <h3>Completion</h3>
          <strong>{course.progressPercent}%</strong>
        </div>
        <div className="progress-track large">
          <div className="progress-fill animated" style={{ width: `${course.progressPercent}%` }} />
        </div>
        <p className="muted">
          {course.completedLessons} of {course.totalLessons} lessons completed • Quiz average {course.avgQuizPercent}%
        </p>
      </article>

      <div className="grid-3">
        <article className="card">
          <h3>Lessons Completed</h3>
          <p>{course.completedLessons}</p>
        </article>
        <article className="card">
          <h3>Total Lessons</h3>
          <p>{course.totalLessons}</p>
        </article>
        <article className="card">
          <h3>Last Watched</h3>
          <p>{course.lastWatchedAt}</p>
        </article>
      </div>

      <div className="stack-gap">
        <Link className="btn-primary" to={course.nextLessonPath}>
          Continue Course
        </Link>
        <Link className="btn-secondary" to="/student/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
}
