export function StatusBadge({ status }: { status: 'Active' | 'Pending' | 'Inactive' }) {
  const cls = status === 'Active' ? 'active' : status === 'Pending' ? 'pending' : 'inactive'
  return (
    <span className={`badge ${cls}`}>
      <span className="bdot" />
      {status}
    </span>
  )
}

export function DocStatusBadge({ status }: { status: 'Verified' | 'Awaiting review' | 'Missing' }) {
  const cls = status === 'Verified' ? 'verified' : status === 'Awaiting review' ? 'review' : 'missing'
  return <span className={`badge ${cls}`}>{status}</span>
}

export function TimesheetBadge({ status }: { status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' }) {
  const cls =
    status === 'Approved' ? 'verified' : status === 'Submitted' ? 'review' : status === 'Rejected' ? 'missing' : 'inactive'
  return <span className={`badge ${cls}`}>{status}</span>
}

export function InvoiceBadge({ status }: { status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' }) {
  const cls =
    status === 'Paid' ? 'verified' : status === 'Sent' ? 'review' : status === 'Overdue' ? 'missing' : 'inactive'
  return <span className={`badge ${cls}`}>{status}</span>
}
