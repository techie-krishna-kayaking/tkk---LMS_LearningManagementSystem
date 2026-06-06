export function AdminDashboardPage() {
  const kpis = [
    { label: 'Revenue (YTD)', value: 'INR 28,45,000', trend: '+12.8% vs last month' },
    { label: 'Outstanding Dues', value: 'INR 4,12,000', trend: '21 learners pending' },
    { label: 'Visitor to Paid', value: '3.9%', trend: 'Funnel improving' },
    { label: 'Completion Rate', value: '61.4%', trend: 'Target: 65%' },
  ];

  const alertSignals = [
    { title: 'Sharing Alerts', value: '14', detail: '3 high-risk accounts require review' },
    { title: 'Refund Ratio', value: '2.1%', detail: 'Within healthy threshold' },
    { title: 'Support SLA', value: '92%', detail: 'Resolved within 24h' },
  ];

  const dueItems = [
    { learner: 'Ravi K', course: 'Databricks Playlist Course', dueIn: '3 days', amount: 'INR 1,000', status: 'At Risk' },
    { learner: 'Asha P', course: 'Databricks Playlist Course', dueIn: '7 days', amount: 'INR 999', status: 'On Track' },
    { learner: 'Meera S', course: 'Spark Streaming Mastery', dueIn: '1 day', amount: 'INR 1,500', status: 'At Risk' },
  ];

  const supportTickets = [
    { id: 'TCK-1042', type: 'Payment issue', status: 'Open', priority: 'High' },
    { id: 'TCK-1043', type: 'Video playback', status: 'In Progress', priority: 'Medium' },
    { id: 'TCK-1044', type: 'Certificate', status: 'Open', priority: 'Low' },
    { id: 'TCK-1045', type: 'Course access', status: 'Resolved', priority: 'Medium' },
  ];

  return (
    <section className="admin-shell stack-gap">
      <div className="section-head">
        <h2>Admin Command Center</h2>
        <p>Track business health, collections, support load, and risk signals with a cleaner operational view.</p>
      </div>

      <section className="admin-kpi-grid">
        {kpis.map((kpi) => (
          <article className="card admin-kpi-card" key={kpi.label}>
            <p>{kpi.label}</p>
            <h3>{kpi.value}</h3>
            <span>{kpi.trend}</span>
          </article>
        ))}
      </section>

      <section className="admin-panels">
        <article className="card admin-panel-main">
          <h3>Revenue Mix Snapshot</h3>
          <div className="metric-row">
            <span>Course Sales</span>
            <strong>41%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill animated" style={{ width: '41%' }} />
          </div>
          <div className="metric-row">
            <span>Installment Collections</span>
            <strong>34%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill animated" style={{ width: '34%' }} />
          </div>
          <div className="metric-row">
            <span>Other Income</span>
            <strong>25%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill animated" style={{ width: '25%' }} />
          </div>
        </article>

        <article className="card admin-panel-side">
          <h3>Risk and Operations Signals</h3>
          <div className="admin-alert-list">
            {alertSignals.map((signal) => (
              <div className="admin-alert-item" key={signal.title}>
                <div>
                  <p>{signal.title}</p>
                  <small>{signal.detail}</small>
                </div>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className="grid-2">
        <article className="card">
          <h3>Upcoming Installment Dues</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Course</th>
                <th>Due In</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dueItems.map((item) => (
                <tr key={`${item.learner}-${item.dueIn}`}>
                  <td>{item.learner}</td>
                  <td>{item.course}</td>
                  <td>{item.dueIn}</td>
                  <td>{item.amount}</td>
                  <td>
                    <span className={`status-pill ${item.status === 'At Risk' ? 'status-risk' : 'status-ok'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="card">
          <h3>Support Queue</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.type}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </section>
  );
}
