import { Link } from 'react-router-dom'
import { clients } from '../data/billingData'
import { useTimeBilling } from '../store/TimeBillingContext'
import { formatDate, formatEur, monthLabel } from '../lib/billing'
import { InvoiceBadge } from '../components/ui/Badge'

export function Invoices() {
  const { invoices } = useTimeBilling()

  const invoiced = invoices.reduce((s, i) => s + i.total, 0)
  const paid = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.total, 0)
  const outstanding = invoiced - paid

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">Created automatically when a timesheet is approved</p>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-label">Total invoiced (incl. VAT)</div>
          <div className="stat-value" style={{ marginTop: 6 }}>{formatEur(invoiced)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Paid</div>
          <div className="stat-value" style={{ marginTop: 6 }}>{formatEur(paid)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value" style={{ marginTop: 6 }}>{formatEur(outstanding)}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '4px 10px 6px' }}>
          {invoices.length === 0 ? (
            <div className="empty-state">No invoices yet. Approve a timesheet to create one.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Client</th>
                  <th>Period</th>
                  <th>Issued</th>
                  <th>Due</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} style={{ cursor: 'default' }}>
                    <td><Link to={`/invoices/${inv.id}`} style={{ fontWeight: 700, color: 'var(--accent-strong)' }}>{inv.number}</Link></td>
                    <td>{clients.find((c) => c.id === inv.clientId)?.name}</td>
                    <td>{monthLabel(inv.month)}</td>
                    <td className="muted">{formatDate(inv.issueDate)}</td>
                    <td className="muted">{formatDate(inv.dueDate)}</td>
                    <td style={{ fontWeight: 600 }}>{formatEur(inv.total)}</td>
                    <td><InvoiceBadge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
