import { useState } from 'react'
import { Link } from 'react-router-dom'
import { employeeById, fullName } from '../data/mockData'
import { clients, hourlyRates } from '../data/billingData'
import { useTimeBilling } from '../store/TimeBillingContext'
import { STANDARD_WEEK_HOURS, formatDate, formatEur, monthLabel, totalHours, weeklyTotals } from '../lib/billing'
import { TimesheetBadge } from '../components/ui/Badge'
import type { Invoice } from '../types'

export function Approvals() {
  const { timesheets, approveTimesheet, rejectTimesheet } = useTimeBilling()
  const [created, setCreated] = useState<Invoice | null>(null)

  const pending = timesheets.filter((t) => t.status === 'Submitted')
  const processed = timesheets.filter((t) => t.status === 'Approved' || t.status === 'Rejected')

  function approve(id: string) {
    const invoice = approveTimesheet(id)
    if (invoice) setCreated(invoice)
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Approvals</h1>
          <p className="page-subtitle">{pending.length} timesheet(s) waiting for your decision</p>
        </div>
      </div>

      {created && (
        <div className="notice ok">
          Timesheet approved. Invoice{' '}
          <Link to={`/invoices/${created.id}`} style={{ fontWeight: 700, textDecoration: 'underline' }}>{created.number}</Link>{' '}
          for {formatEur(created.total)} (incl. VAT) was created automatically.
        </div>
      )}

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header" style={{ paddingBottom: 8 }}>
          <div className="card-title">Pending approval</div>
        </div>
        <div style={{ padding: '4px 10px 6px' }}>
          {pending.length === 0 ? (
            <div className="empty-state">Nothing to approve. You are all caught up.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Client</th>
                  <th>Period</th>
                  <th>Hours</th>
                  <th>Invoice (excl. VAT)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pending.map((t) => {
                  const emp = employeeById(t.employeeId)
                  const client = clients.find((c) => c.id === t.clientId)
                  const hours = totalHours(t.entries)
                  const flagged = weeklyTotals(t.entries).some((w) => w.hours > STANDARD_WEEK_HOURS)
                  return (
                    <tr key={t.id} style={{ cursor: 'default' }}>
                      <td>
                        <div className="table-person">
                          {emp && (
                            <div className="avatar md" style={{ background: emp.avatarColor }}>
                              {emp.firstName[0]}{emp.lastName[0]}
                            </div>
                          )}
                          <div>
                            <div className="table-person-name">{emp ? fullName(emp) : t.employeeId}</div>
                            <div className="table-person-sub">Submitted {formatDate(t.submittedOn ?? '')}</div>
                          </div>
                        </div>
                      </td>
                      <td>{client?.name}</td>
                      <td>{monthLabel(t.month)}</td>
                      <td>
                        {hours}h {flagged && <span className="badge review" style={{ marginLeft: 6 }}>Over {STANDARD_WEEK_HOURS}h/week</span>}
                      </td>
                      <td>{formatEur(hours * (hourlyRates[t.employeeId] ?? 0))}</td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button className="btn btn-danger-ghost sm" onClick={() => rejectTimesheet(t.id)}>Reject</button>{' '}
                        <button className="btn btn-primary sm" onClick={() => approve(t.id)}>Approve &amp; create invoice</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ paddingBottom: 8 }}>
          <div className="card-title">Recently decided</div>
        </div>
        <div style={{ padding: '4px 10px 6px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Period</th>
                <th>Hours</th>
                <th>Decision</th>
                <th>Decided on</th>
              </tr>
            </thead>
            <tbody>
              {processed.map((t) => {
                const emp = employeeById(t.employeeId)
                return (
                  <tr key={t.id} style={{ cursor: 'default' }}>
                    <td>{emp ? fullName(emp) : t.employeeId}</td>
                    <td>{monthLabel(t.month)}</td>
                    <td>{totalHours(t.entries)}h</td>
                    <td><TimesheetBadge status={t.status} /></td>
                    <td className="muted">{formatDate(t.decidedOn ?? '')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
