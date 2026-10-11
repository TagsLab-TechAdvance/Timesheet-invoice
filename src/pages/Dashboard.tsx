import { Link } from 'react-router-dom'
import { StatCard } from '../components/ui/StatCard'
import { StatusBadge } from '../components/ui/Badge'
import { departments, employees, onboardingCases, activity, departmentById, fullName } from '../data/mockData'
import { useTimeBilling } from '../store/TimeBillingContext'
import { formatEur } from '../lib/billing'
import { IconUsers, IconBuilding, IconClipboard, IconTrend, IconChevronRight } from '../components/ui/Icons'

export function Dashboard() {
  const { timesheets, invoices } = useTimeBilling()
  const awaiting = timesheets.filter((t) => t.status === 'Submitted').length
  const outstanding = invoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.total, 0)
  const activeCount = employees.filter((e) => e.status === 'Active').length
  const pendingCount = employees.filter((e) => e.status === 'Pending').length
  const newThisMonth = employees.filter((e) => e.joiningDate >= '2026-08-01').length
  const recent = [...employees].sort((a, b) => (a.joiningDate < b.joiningDate ? 1 : -1)).slice(0, 5)

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title serif">Good morning, Marie</h1>
          <p className="page-subtitle">Here's what's happening across Novara HR today.</p>
        </div>
        <Link to="/employees/add" className="btn btn-primary">
          + Add employee
        </Link>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={<IconUsers width={16} height={16} />}
          iconBg="var(--accent-soft)"
          iconColor="var(--accent-strong)"
          value={employees.length}
          label="Total employees"
          delta={`${activeCount} active`}
        />
        <StatCard
          icon={<IconTrend width={16} height={16} />}
          iconBg="var(--accent-soft)"
          iconColor="var(--accent-strong)"
          value={newThisMonth}
          label="New this month"
          delta="+2 vs last month"
        />
        <StatCard
          icon={<IconBuilding width={16} height={16} />}
          iconBg="var(--gold-soft)"
          iconColor="var(--gold)"
          value={departments.length}
          label="Departments"
        />
        <StatCard
          icon={<IconClipboard width={16} height={16} />}
          iconBg="var(--warn-soft)"
          iconColor="var(--warn)"
          value={pendingCount + onboardingCases.length}
          label="Pending onboarding"
          delta={`${onboardingCases.length} in progress`}
          deltaTone="warn"
        />
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Link to="/approvals" className="stat-card">
          <div className="stat-label">Timesheets awaiting approval</div>
          <div className="stat-value" style={{ marginTop: 6 }}>{awaiting}</div>
        </Link>
        <Link to="/invoices" className="stat-card">
          <div className="stat-label">Invoices created</div>
          <div className="stat-value" style={{ marginTop: 6 }}>{invoices.length}</div>
        </Link>
        <Link to="/invoices" className="stat-card">
          <div className="stat-label">Outstanding (incl. VAT)</div>
          <div className="stat-value" style={{ marginTop: 6 }}>{formatEur(outstanding)}</div>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent employees</div>
              <div className="card-title-sub">Latest additions to the company</div>
            </div>
            <Link to="/employees" className="btn btn-ghost sm">
              View all <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          <div style={{ padding: '8px 10px 6px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((emp) => {
                  const dept = departmentById(emp.departmentId)
                  return (
                    <tr key={emp.id} onClick={() => (window.location.hash = `#/employees/${emp.id}`)}>
                      <td>
                        <Link to={`/employees/${emp.id}`} className="table-person">
                          <div className="avatar md" style={{ background: emp.avatarColor }}>
                            {emp.firstName[0]}
                            {emp.lastName[0]}
                          </div>
                          <div>
                            <div className="table-person-name">{fullName(emp)}</div>
                            <div className="table-person-sub">{emp.jobTitle}</div>
                          </div>
                        </Link>
                      </td>
                      <td>{dept?.name}</td>
                      <td className="muted">{new Date(emp.joiningDate).toLocaleDateString('en-GB')}</td>
                      <td>
                        <StatusBadge status={emp.status} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 4 }}>Recent activity</div>
          <div className="card-title-sub" style={{ marginBottom: 16 }}>Across employees and onboarding</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {activity.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: 10 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div className="small" style={{ lineHeight: 1.4 }}>{item.message}</div>
                  <div className="small muted" style={{ marginTop: 2 }}>{item.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
