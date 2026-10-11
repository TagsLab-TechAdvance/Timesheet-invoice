import { useState } from 'react'
import { StatusBadge } from '../components/ui/Badge'
import { clients, clientAssignments, hourlyRates } from '../data/billingData'
import { employeeById, fullName } from '../data/mockData'
import { formatEur } from '../lib/billing'

const tabs = ['Company profile', 'Users & roles', 'Permissions', 'Clients & billing'] as const
type Tab = (typeof tabs)[number]

const teamUsers = [
  { name: 'Marie Dubois', email: 'marie.dubois@novarahr.be', role: 'Super Admin', status: 'Active' as const },
  { name: 'Tom Van Damme', email: 'tom.vandamme@novarahr.be', role: 'HR Admin', status: 'Active' as const },
  { name: 'Bram De Smet', email: 'bram.desmet@novarahr.be', role: 'Manager', status: 'Active' as const },
  { name: 'Emma Janssens', email: 'emma.janssens@novarahr.be', role: 'HR Admin', status: 'Inactive' as const },
]

const roles = [
  { name: 'Super Admin', desc: 'Full access to all company data, settings and user management.' },
  { name: 'HR Admin', desc: 'Manage employees, departments, documents and onboarding.' },
  { name: 'Manager', desc: 'View and approve requests for their own direct reports only.' },
]

export function Settings() {
  const [tab, setTab] = useState<Tab>('Company profile')
  const [companyName, setCompanyName] = useState('Novara HR — Belgium Operations')
  const [vat, setVat] = useState('BE 0123.456.789')
  const [address, setAddress] = useState('Rue de la Loi 24, 1000 Brussels, Belgium')

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Company information, users and access control</p>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          {tabs.map((t) => (
            <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>

        <div className="card-pad">
          {tab === 'Company profile' && (
            <div style={{ maxWidth: 480 }}>
              <div className="field">
                <label>Company name</label>
                <input className="input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div className="field">
                <label>VAT / company number</label>
                <input className="input" value={vat} onChange={(e) => setVat(e.target.value)} />
                <span className="hint">Used for Belgian payroll and compliance modules in later phases.</span>
              </div>
              <div className="field">
                <label>Registered address</label>
                <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <button className="btn btn-primary mt-8">Save changes</button>
            </div>
          )}

          {tab === 'Users & roles' && (
            <div>
              <div className="flex-between" style={{ marginBottom: 10 }}>
                <span className="small muted">{teamUsers.length} users with platform access</span>
                <button className="btn btn-secondary sm">Invite user</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teamUsers.map((u) => (
                    <tr key={u.email}>
                      <td>
                        <div className="table-person-name">{u.name}</div>
                        <div className="table-person-sub">{u.email}</div>
                      </td>
                      <td>{u.role}</td>
                      <td><StatusBadge status={u.status} /></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-ghost sm">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'Clients & billing' && (
            <div>
              <div className="small muted" style={{ marginBottom: 10 }}>
                Clients are invoiced at each employee's hourly rate plus 21% Belgian VAT.
              </div>
              <table className="data-table">
                <thead>
                  <tr><th>Client</th><th>VAT number</th><th>Payment terms</th></tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} style={{ cursor: 'default' }}>
                      <td><div className="table-person-name">{c.name}</div><div className="table-person-sub">{c.city}</div></td>
                      <td>{c.vatNumber}</td>
                      <td>{c.paymentTermsDays} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="data-table mt-24">
                <thead>
                  <tr><th>Billable employee</th><th>Client</th><th>Hourly rate</th></tr>
                </thead>
                <tbody>
                  {Object.keys(clientAssignments).map((id) => {
                    const e = employeeById(id)
                    return (
                      <tr key={id} style={{ cursor: 'default' }}>
                        <td>{e ? fullName(e) : id}</td>
                        <td>{clients.find((c) => c.id === clientAssignments[id])?.name}</td>
                        <td>{formatEur(hourlyRates[id])}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'Permissions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {roles.map((r) => (
                <div key={r.name} className="card card-pad" style={{ boxShadow: 'none' }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.name}</div>
                  <div className="small muted mt-8">{r.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
