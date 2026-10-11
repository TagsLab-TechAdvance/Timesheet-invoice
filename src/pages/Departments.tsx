import { useState } from 'react'
import { departments, employees, employeeById, fullName } from '../data/mockData'
import { IconPlus, IconUsers } from '../components/ui/Icons'

export function Departments() {
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Departments</h1>
          <p className="page-subtitle">{departments.length} departments, {employees.length} employees total</p>
        </div>
        <button className="btn btn-primary" onClick={() => setAdding((v) => !v)}>
          <IconPlus width={15} height={15} />
          New department
        </button>
      </div>

      {adding && (
        <div className="card card-pad mt-16" style={{ marginBottom: 20 }}>
          <div className="flex gap-12" style={{ alignItems: 'flex-end' }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <label>Department name</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Marketing" />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => { setName(''); setAdding(false) }}
            >
              Create
            </button>
            <button className="btn btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {departments.map((dept) => {
          const members = employees.filter((e) => e.departmentId === dept.id)
          const manager = dept.managerId ? employeeById(dept.managerId) : undefined
          return (
            <div className="card card-pad" key={dept.id}>
              <div className="flex-between">
                <div className="flex gap-12" style={{ alignItems: 'center' }}>
                  <div
                    className="stat-icon"
                    style={{ background: `${dept.color}1A`, color: dept.color, width: 38, height: 38, borderRadius: 10 }}
                  >
                    <IconUsers width={17} height={17} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{dept.name}</div>
                    <div className="small muted">{members.length} employees</div>
                  </div>
                </div>
                <button className="btn btn-secondary sm">Manage</button>
              </div>

              <div className="mt-16 small muted">
                Manager: <strong style={{ color: 'var(--text)' }}>{manager ? fullName(manager) : 'Unassigned'}</strong>
              </div>

              <div className="flex mt-16" style={{ marginLeft: -4 }}>
                {members.slice(0, 6).map((m) => (
                  <div
                    key={m.id}
                    className="avatar md"
                    title={fullName(m)}
                    style={{ background: m.avatarColor, marginLeft: -6, border: '2px solid var(--surface)' }}
                  >
                    {m.firstName[0]}{m.lastName[0]}
                  </div>
                ))}
                {members.length > 6 && (
                  <div
                    className="avatar md"
                    style={{ background: 'var(--bg)', color: 'var(--text-muted)', marginLeft: -6, border: '2px solid var(--surface)' }}
                  >
                    +{members.length - 6}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
