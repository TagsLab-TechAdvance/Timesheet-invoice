import { Link, useParams } from 'react-router-dom'
import { clients, company } from '../data/billingData'
import { useTimeBilling } from '../store/TimeBillingContext'
import { formatDate, formatEur } from '../lib/billing'
import { InvoiceBadge } from '../components/ui/Badge'
import { IconArrowLeft } from '../components/ui/Icons'

export function InvoiceDetails() {
  const { id } = useParams()
  const { invoices, setInvoiceStatus } = useTimeBilling()
  const inv = invoices.find((i) => i.id === id)

  if (!inv) {
    return (
      <div className="empty-state">
        Invoice not found. <Link to="/invoices">Back to invoices</Link>
      </div>
    )
  }

  const client = clients.find((c) => c.id === inv.clientId)

  return (
    <div>
      <Link to="/invoices" className="breadcrumb no-print">
        <IconArrowLeft width={13} height={13} /> Back to invoices
      </Link>

      <div className="flex-between no-print" style={{ marginBottom: 16 }}>
        <div className="flex gap-12" style={{ alignItems: 'center' }}>
          <h1 className="page-title">{inv.number}</h1>
          <InvoiceBadge status={inv.status} />
        </div>
        <div className="flex gap-8">
          {inv.status === 'Draft' && (
            <button className="btn btn-primary sm" onClick={() => setInvoiceStatus(inv.id, 'Sent')}>Mark as sent</button>
          )}
          {inv.status === 'Sent' && (
            <button className="btn btn-primary sm" onClick={() => setInvoiceStatus(inv.id, 'Paid')}>Mark as paid</button>
          )}
          <button className="btn btn-secondary sm" onClick={() => window.print()}>Print / save as PDF</button>
        </div>
      </div>

      <div className="card invoice-sheet">
        <div className="invoice-head">
          <div>
            <div className="sidebar-brand" style={{ padding: 0 }}>
              <div className="sidebar-brand-mark">NH</div>
              <div style={{ fontWeight: 800, fontSize: 17 }}>Novara HR</div>
            </div>
          </div>
          <div className="invoice-meta">
            <div style={{ fontSize: 20, fontWeight: 800 }}>Invoice</div>
            <div>No. <strong>{inv.number}</strong></div>
            <div>Date: {formatDate(inv.issueDate)}</div>
            <div>Due date: {formatDate(inv.dueDate)}</div>
          </div>
        </div>

        <div className="invoice-parties">
          <div>
            <div className="invoice-label">From</div>
            <strong>{company.name}</strong><br />
            {company.address}<br />
            {company.city}<br />
            VAT: {company.vatNumber}
          </div>
          <div>
            <div className="invoice-label">Billed to</div>
            <strong>{client?.name}</strong><br />
            {client?.address}<br />
            {client?.city}<br />
            VAT: {client?.vatNumber}
          </div>
        </div>

        <table className="data-table" style={{ cursor: 'default' }}>
          <thead>
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right' }}>Hours</th>
              <th style={{ textAlign: 'right' }}>Rate</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.lines.map((l, i) => (
              <tr key={i} style={{ cursor: 'default' }}>
                <td>{l.description}</td>
                <td style={{ textAlign: 'right' }}>{l.hours}</td>
                <td style={{ textAlign: 'right' }}>{formatEur(l.rate)}</td>
                <td style={{ textAlign: 'right' }}>{formatEur(l.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-totals">
          <div><span>Subtotal (excl. VAT)</span><span>{formatEur(inv.subtotal)}</span></div>
          <div><span>VAT {inv.vatRate}%</span><span>{formatEur(inv.vatAmount)}</span></div>
          <div className="grand"><span>Total</span><span>{formatEur(inv.total)}</span></div>
        </div>

        <div className="invoice-pay">
          <strong>Payment details</strong><br />
          IBAN: {company.iban} · BIC: {company.bic}<br />
          Structured communication: <strong>{inv.structuredCommunication}</strong><br />
          Please pay by {formatDate(inv.dueDate)}.
        </div>
      </div>
    </div>
  )
}
