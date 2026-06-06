import { Link } from 'react-router-dom';

const sampleCourses = [
  {
    slug: 'ultimate-etl-testing-automation-mastery',
    title: 'Ultimate ETL Testing & Automation Mastery: Python, Pandas, PySpark + Cloud Projects',
    priceInr: 17999,
    originalPriceInr: 33010,
    lessonPath: '/student/lesson/ultimate-etl-testing-automation-mastery/playlist-main',
    level: 'Advanced',
    duration: 'Live + Recorded',
    mode: 'LIVE CLASS • FREE CONTENT • VIDEOS',
  },
  {
    slug: 'notest-250-sql-queries-etl-bigdata-bi',
    title: '[NOTEST] 250 SQL Queries for ETL + Big Data + BI',
    priceInr: 99,
    originalPriceInr: 209,
    lessonPath: '/student/lesson/notest-250-sql-queries-etl-bigdata-bi/playlist-main',
    level: 'Beginner',
    duration: 'Reference Pack',
    mode: 'FILES',
  },
  {
    slug: 'notes-250-sqls-dwh-etl-testing-concepts',
    title: '[NOTES] 250 SQLs & DWH Concepts + ETL Testing Concepts',
    priceInr: 499,
    originalPriceInr: 1010,
    lessonPath: '/student/lesson/notes-250-sqls-dwh-etl-testing-concepts/playlist-main',
    level: 'Beginner to Intermediate',
    duration: 'Self-paced',
    mode: 'VIDEOS • FILES',
  },
  {
    slug: 'roadmap-doc-bigdata-etl-bi-testing',
    title: 'ROAD MAP DOC- Big Data Testing + ETL Testing + BI Testing',
    priceInr: 36,
    lessonPath: '/student/lesson/roadmap-doc-bigdata-etl-bi-testing/playlist-main',
    level: 'Beginner',
    duration: 'Quick Reference',
    mode: 'FILES',
  },
  {
    slug: 'resume-profile-building-course',
    title: 'Master Your Career with Our Resume & Profile Building Course',
    priceInr: 509,
    originalPriceInr: 1009,
    lessonPath: '/student/lesson/resume-profile-building-course/playlist-main',
    level: 'All Levels',
    duration: 'Short Course',
    mode: 'FREE CONTENT • VIDEOS • FILES',
  },
];

export function CatalogPage() {
  return (
    <section>
      <div className="section-head">
        <h2>Course Catalog</h2>
        <p>Explore premium tech tracks built for practical career acceleration.</p>
      </div>
      <div className="grid-2">
        {sampleCourses.map((course) => (
          <article key={course.slug} className="card catalog-card">
            <span className="chip">{course.level}</span>
            <h3 className="catalog-title">{course.title}</h3>

            <p className="catalog-price-row">
              <span className="catalog-price">INR {course.priceInr}</span>
              {course.originalPriceInr ? (
                <span className="catalog-original-price">INR {course.originalPriceInr}</span>
              ) : null}
            </p>

            <p className="catalog-meta">{course.duration} • {course.mode}</p>

            <div className="catalog-actions">
              <Link className="btn-primary" to="/login">
                Login to Access
              </Link>
              <Link className="btn-secondary" to={course.lessonPath}>
                Open Course Player
              </Link>
              <Link className="btn-secondary" to={`/student/checkout?course=${course.slug}`}>
                Enroll Now
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
