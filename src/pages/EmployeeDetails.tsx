import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { employeeById, departmentById, employeeById as byId, fullName, employees } from '../data/mockData'
import { StatusBadge, DocStatusBadge } from '../components/ui/Badge'
import { IconArrowLeft, IconMail, IconPhone, IconFile, IconUpload } from '../components/ui/Icons'

type Tab = 'Personal' | 'Employment' | 'Documents' | 'Emergency Contact'

export function EmployeeDetails() {
  const { id } = useParams()
  const employee = id ? employeeById(id) : undefined
  const [tab, setTab] = useState<Tab>('Personal')

  if (!employee) {
    return (
      <div className="empty-state">
        Employee not found. <Link to="/employees">Back to employees</Link>
      </div>
    )
  }

  const dept = departmentById(employee.departmentId)
  const manager = employee.managerId ? byId(employee.managerId) : undefined
  const reports = employees.filter((e) => e.managerId === employee.id)

  return (
    <div>
      <Link to="/employees" className="breadcrumb">
        <IconArrowLeft width={13} height={13} /> Back to employees
      </Link>

      <div className="card card-pad" style={{ marginBottom: 16 }}>
        <div className="flex-between">
          <div className="flex gap-12" style={{ alignItems: 'center' }}>
            <div className="avatar lg" style={{ background: employee.avatarColor }}>
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div>
              <div className="flex gap-8" style={{ alignItems: 'center' }}>
                <h2 style={{ fontSize: 18, fontWeight: 800 }}>{fullName(employee)}</h2>
                <StatusBadge status={employee.status} />
              </div>
              <div className="muted small" style={{ marginTop: 3 }}>
                {employee.jobTitle} · {dept?.name} · {employee.employeeCode}
              </div>
              <div className="flex gap-12 small muted" style={{ marginTop: 8 }}>
                <span className="flex gap-8" style={{ alignItems: 'center' }}>
                  <IconMail width={13} height={13} /> {employee.email}
                </span>
                <span className="flex gap-8" style={{ alignItems: 'center' }}>
                  <IconPhone width={13} height={13} /> {employee.phone}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <button className="btn btn-secondary sm">Edit profile</button>
            <button className="btn btn-danger-ghost sm">Deactivate</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          {(['Personal', 'Employment', 'Documents', 'Emergency Contact'] as Tab[]).map((t) => (
            <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t}
            </div>
          ))}
        </div>

        <div className="card-pad">
          {tab === 'Personal' && (
            <div className="field-row">
              <ReadField label="First name" value={employee.firstName} />
              <ReadField label="Last name" value={employee.lastName} />
              <ReadField label="Date of birth" value={new Date(employee.dateOfBirth).toLocaleDateString('en-GB')} />
              <ReadField label="City" value={employee.city} />
              <ReadField label="Address" value={employee.address} />
              <ReadField label="Email" value={employee.email} />
              <ReadField label="Phone" value={employee.phone} />
            </div>
          )}

          {tab === 'Employment' && (
            <div className="field-row">
              <ReadField label="Employee ID" value={employee.employeeCode} />
              <ReadField label="Job title" value={employee.jobTitle} />
              <ReadField label="Department" value={dept?.name ?? '—'} />
              <ReadField label="Manager" value={manager ? fullName(manager) : '— (no manager)'} />
              <ReadField label="Employment type" value={employee.employmentType} />
              <ReadField label="Joining date" value={new Date(employee.joiningDate).toLocaleDateString('en-GB')} />
              {reports.length > 0 && (
                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label>Direct reports</label>
                  <div className="small muted">{reports.map(fullName).join(', ')}</div>
                </div>
              )}
            </div>
          )}

          {tab === 'Documents' && (
            <div>
              <div className="flex-between" style={{ marginBottom: 8 }}>
                <span className="small muted">{employee.documents.length} documents on file</span>
                <button className="btn btn-secondary sm">
                  <IconUpload width={14} height={14} /> Upload document
                </button>
              </div>
              {employee.documents.map((doc) => (
                <div className="doc-row" key={doc.id}>
                  <div className="flex gap-12" style={{ alignItems: 'center' }}>
                    <div className="doc-icon"><IconFile width={15} height={15} /></div>
                    <div>
                      <div className="small" style={{ fontWeight: 600 }}>{doc.name}</div>
                      <div className="small muted">
                        {doc.type}{doc.uploadedOn ? ` · uploaded ${new Date(doc.uploadedOn).toLocaleDateString('en-GB')}` : ''}
                      </div>
                    </div>
                  </div>
                  <DocStatusBadge status={doc.status} />
                </div>
              ))}
            </div>
          )}

          {tab === 'Emergency Contact' && (
            <div className="field-row">
              <ReadField label="Full name" value={employee.emergencyContact.name} />
              <ReadField label="Relationship" value={employee.emergencyContact.relationship} />
              <ReadField label="Phone" value={employee.emergencyContact.phone} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="small" style={{ padding: '9px 0' }}>{value}</div>
    </div>
  )
}
