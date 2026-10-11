import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { employees, departments, departmentById, fullName } from '../data/mockData'
import { StatusBadge } from '../components/ui/Badge'
import { IconSearch, IconPlus } from '../components/ui/Icons'
import type { EmployeeStatus } from '../types'

const statusFilters: (EmployeeStatus | 'All')[] = ['All', 'Active', 'Pending', 'Inactive']

export function Employees() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<EmployeeStatus | 'All'>('All')
  const [dept, setDept] = useState<string>('All')

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesQuery =
        query.trim() === '' ||
        fullName(e).toLowerCase().includes(query.toLowerCase()) ||
        e.employeeCode.toLowerCase().includes(query.toLowerCase()) ||
        e.jobTitle.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || e.status === status
      const matchesDept = dept === 'All' || e.departmentId === dept
      return matchesQuery && matchesStatus && matchesDept
    })
  }, [query, status, dept])

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">{employees.length} employees across {departments.length} departments</p>
        </div>
        <Link to="/employees/add" className="btn btn-primary">
          <IconPlus width={15} height={15} />
          Add employee
        </Link>
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }} className="flex-between">
          <div className="search-box">
            <IconSearch width={15} height={15} />
            <input
              placeholder="Search by name, ID or role"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-8">
            {statusFilters.map((s) => (
              <button
                key={s}
                className={`chip-filter ${status === s ? 'active' : ''}`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
            <select className="select" value={dept} onChange={(e) => setDept(e.target.value)} style={{ width: 170 }}>
              <option value="All">All departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ padding: '4px 10px' }}>
          {filtered.length === 0 ? (
            <div className="empty-state">No employees match your filters.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Joining date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => {
                  const d = departmentById(emp.departmentId)
                  return (
                    <tr key={emp.id}>
                      <td colSpan={1}>
                        <Link to={`/employees/${emp.id}`} className="table-person">
                          <div className="avatar md" style={{ background: emp.avatarColor }}>
                            {emp.firstName[0]}
                            {emp.lastName[0]}
                          </div>
                          <div>
                            <div className="table-person-name">{fullName(emp)}</div>
                            <div className="table-person-sub">{emp.email}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="muted">{emp.employeeCode}</td>
                      <td>{d?.name}</td>
                      <td>{emp.jobTitle}</td>
                      <td><StatusBadge status={emp.status} /></td>
                      <td className="muted">{new Date(emp.joiningDate).toLocaleDateString('en-GB')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
