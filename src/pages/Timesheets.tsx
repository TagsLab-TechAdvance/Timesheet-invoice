import { useState } from 'react'
import { Link } from 'react-router-dom'
import { employeeById, fullName } from '../data/mockData'
import { availableMonths, billableEmployeeIds, clients, hourlyRates } from '../data/billingData'
import { useTimeBilling } from '../store/TimeBillingContext'
import {
  STANDARD_WEEK_HOURS,
  VAT_RATE,
  daysOfMonth,
  formatDate,
  formatEur,
  isWeekend,
  monthLabel,
  totalHours,
  weeklyTotals,
} from '../lib/billing'
import { TimesheetBadge } from '../components/ui/Badge'

export function Timesheets() {
  const { findTimesheet, createTimesheet, setHours, fillWeekdays, submitTimesheet, invoices } = useTimeBilling()
  const [employeeId, setEmployeeId] = useState(billableEmployeeIds[0])
  const [month, setMonth] = useState(availableMonths[availableMonths.length - 1])

  const employee = employeeById(employeeId)
  const ts = findTimesheet(employeeId, month)
  const client = ts ? clients.find((c) => c.id === ts.clientId) : undefined
  const rate = hourlyRates[employeeId] ?? 0
  const hours = ts ? totalHours(ts.entries) : 0
  const subtotal = hours * rate
  const editable = ts?.status === 'Draft' || ts?.status === 'Rejected'
  const invoice = ts?.invoiceId ? invoices.find((i) => i.id === ts.invoiceId) : undefined
  const overWeeks = ts ? weeklyTotals(ts.entries).filter((w) => w.hours > STANDARD_WEEK_HOURS) : []

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Timesheets</h1>
          <p className="page-subtitle">Employees log hours per month. Approved hours become an invoice automatically.</p>
        </div>
        <div className="flex gap-8">
          <select className="select" style={{ width: 200 }} value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
            {billableEmployeeIds.map((id) => {
              const e = employeeById(id)
              return <option key={id} value={id}>{e ? fullName(e) : id}</option>
            })}
          </select>
          <select className="select" style={{ width: 160 }} value={month} onChange={(e) => setMonth(e.target.value)}>
            {availableMonths.map((m) => (
              <option key={m} value={m}>{monthLabel(m)}</option>
            ))}
          </select>
        </div>
      </div>

      {!ts ? (
        <div className="card">
          <div className="empty-state">
            <div style={{ marginBottom: 14 }}>
              No timesheet for {employee ? fullName(employee) : ''} in {monthLabel(month)} yet.
            </div>
            <button className="btn btn-primary" onClick={() => createTimesheet(employeeId, month)}>
              Start timesheet
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Status</div>
              <div style={{ marginTop: 10 }}><TimesheetBadge status={ts.status} /></div>
              <div className="stat-label mt-8">{client?.name}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total hours</div>
              <div className="stat-value" style={{ marginTop: 6 }}>{hours}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Hourly rate</div>
              <div className="stat-value" style={{ marginTop: 6 }}>{formatEur(rate)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Invoice amount (excl. {VAT_RATE}% VAT)</div>
              <div className="stat-value" style={{ marginTop: 6 }}>{formatEur(subtotal)}</div>
            </div>
          </div>

          {ts.status === 'Submitted' && (
            <div className="notice info">Submitted on {formatDate(ts.submittedOn ?? '')}. Waiting for manager approval.</div>
          )}
          {ts.status === 'Rejected' && (
            <div className="notice warn">This timesheet was sent back. Correct the hours and submit it again.</div>
          )}
          {ts.status === 'Approved' && invoice && (
            <div className="notice ok">
              Approved on {formatDate(ts.decidedOn ?? '')}. Invoice{' '}
              <Link to={`/invoices/${invoice.id}`} style={{ fontWeight: 700, textDecoration: 'underline' }}>{invoice.number}</Link>{' '}
              was created automatically.
            </div>
          )}
          {overWeeks.length > 0 && (
            <div className="notice warn">
              {overWeeks.length} week(s) above the standard {STANDARD_WEEK_HOURS}-hour working week. The manager will see this flag when approving.
            </div>
          )}

          <div className="card">
            <div className="card-header" style={{ paddingBottom: 12 }}>
              <div>
                <div className="card-title">{monthLabel(month)}</div>
                <div className="card-title-sub">Enter hours worked per day</div>
              </div>
              {editable && (
                <button className="btn btn-ghost sm" onClick={() => fillWeekdays(ts.id, 8)}>
                  Fill weekdays with 8h (demo)
                </button>
              )}
            </div>
            <div style={{ padding: '0 10px 6px' }}>
              <table className="data-table ts-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th style={{ width: 140 }}>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {daysOfMonth(month).map((d) => {
                    const weekend = isWeekend(d)
                    const value = ts.entries[d] ?? ''
                    return (
                      <tr key={d} className={weekend ? 'weekend' : ''} style={{ cursor: 'default' }}>
                        <td>{formatDate(d)}</td>
                        <td className="muted">{new Date(d).toLocaleDateString('en-GB', { weekday: 'long' })}</td>
                        <td>
                          <input
                            className="input hours-input"
                            type="number"
                            min={0}
                            max={24}
                            step={0.5}
                            value={value}
                            disabled={!editable}
                            placeholder={weekend ? '' : '0'}
                            onChange={(e) => setHours(ts.id, d, parseFloat(e.target.value))}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex-between" style={{ padding: '14px 22px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700 }}>Total: {hours} hours · {formatEur(subtotal)} excl. VAT</div>
              <button
                className="btn btn-primary"
                disabled={!editable || hours === 0}
                onClick={() => submitTimesheet(ts.id)}
              >
                Submit for approval
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
