import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="stack-gap">
      <section className="hero card hero-panel">
        <span className="chip">Next-Gen Training Portal</span>
        <h1>Build Data Engineering Mastery with a Tech-First LMS Experience</h1>
        <p>
          Explore courses, preview notes, enroll with Indian payment rails, and learn in a distraction-free
          student workspace with role-based access and watermark deterrence.
        </p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/catalog">
            Browse Courses
          </Link>
          <Link className="btn-secondary" to="/notes">
            Explore Notes
          </Link>
          <Link className="btn-secondary" to="/signup">
            Sign Up
          </Link>
          <Link className="btn-secondary" to="/login">
            Login
          </Link>
        </div>
      </section>

      <section className="grid-3">
        <article className="card">
          <h3>Course-First Discovery</h3>
          <p>Visitors can browse curriculum, pricing, and outcomes before creating an account.</p>
        </article>
        <article className="card">
          <h3>Notes + Practice</h3>
          <p>Each course can expose quick notes and practice links for iterative, hands-on learning.</p>
        </article>
        <article className="card">
          <h3>Secure Learning Layer</h3>
          <p>Session checks, role controls, and dynamic watermarking help deter content leakage.</p>
        </article>
      </section>

      <div className="cta-strip card">
        <p>Already enrolled?</p>
        <Link className="btn-primary" to="/student/dashboard">
          Go to Student Dashboard
        </Link>
      </div>
    </section>
  );
}
