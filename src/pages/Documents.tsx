import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { employees, employeeById, fullName } from '../data/mockData'
import { DocStatusBadge } from '../components/ui/Badge'
import { IconFile, IconSearch } from '../components/ui/Icons'

interface Row {
  docId: string
  employeeId: string
  name: string
  type: string
  uploadedOn: string
  status: 'Verified' | 'Awaiting review' | 'Missing'
}

export function Documents() {
  const [query, setQuery] = useState('')

  const rows: Row[] = useMemo(
    () =>
      employees.flatMap((e) =>
        e.documents.map((d) => ({
          docId: d.id,
          employeeId: e.id,
          name: d.name,
          type: d.type,
          uploadedOn: d.uploadedOn,
          status: d.status,
        }))
      ),
    []
  )

  const filtered = rows.filter((r) => {
    const emp = employeeById(r.employeeId)
    const haystack = `${r.name} ${r.type} ${emp ? fullName(emp) : ''}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
  })

  const verified = rows.filter((r) => r.status === 'Verified').length
  const review = rows.filter((r) => r.status === 'Awaiting review').length
  const missing = rows.filter((r) => r.status === 'Missing').length

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Documents</h1>
          <p className="page-subtitle">{rows.length} documents across all employees</p>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-value">{verified}</div>
          <div className="stat-label">Verified</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{review}</div>
          <div className="stat-label">Awaiting review</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{missing}</div>
          <div className="stat-label">Missing</div>
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="search-box">
            <IconSearch width={15} height={15} />
            <input
              placeholder="Search by document, type or employee"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div style={{ padding: '4px 10px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Employee</th>
                <th>Type</th>
                <th>Uploaded</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const emp = employeeById(r.employeeId)
                return (
                  <tr key={r.docId}>
                    <td>
                      <div className="flex gap-12" style={{ alignItems: 'center' }}>
                        <div className="doc-icon"><IconFile width={15} height={15} /></div>
                        <span style={{ fontWeight: 600 }}>{r.name}</span>
                      </div>
                    </td>
                    <td>
                      {emp ? (
                        <Link to={`/employees/${emp.id}`} className="muted">{fullName(emp)}</Link>
                      ) : '—'}
                    </td>
                    <td className="muted">{r.type}</td>
                    <td className="muted">{r.uploadedOn ? new Date(r.uploadedOn).toLocaleDateString('en-GB') : '—'}</td>
                    <td><DocStatusBadge status={r.status} /></td>
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
