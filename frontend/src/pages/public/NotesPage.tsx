const notes = [
  {
    id: 'n1',
    title: 'Databricks Spark Architecture Quick Notes',
    summary: 'Cluster manager, workers, jobs, tasks, caching strategy, and optimizer basics.',
    tag: 'Databricks',
  },
  {
    id: 'n2',
    title: 'Delta Lake Transaction Log Cheat Sheet',
    summary: 'ACID on data lake, transaction log, time travel, compaction and vacuum best practices.',
    tag: 'Delta Lake',
  },
  {
    id: 'n3',
    title: 'Streaming Design Patterns',
    summary: 'Exactly-once design, checkpoint strategy, stateful windows, and backpressure handling.',
    tag: 'Streaming',
  },
];

export function NotesPage() {
  return (
    <section>
      <div className="section-head">
        <h2>Public Study Notes</h2>
        <p>Preview learning notes before purchase. Enrolled students unlock full structured note packs.</p>
      </div>
      <div className="grid-3">
        {notes.map((note) => (
          <article className="card" key={note.id}>
            <span className="chip">{note.tag}</span>
            <h3>{note.title}</h3>
            <p>{note.summary}</p>
            <button className="btn-secondary" type="button">
              Preview
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
