import { Link } from 'react-router-dom'
import { onboardingCases, employeeById, departmentById, fullName } from '../data/mockData'
import { IconChevronRight } from '../components/ui/Icons'

const stepOrder = ['Personal', 'Employment', 'Documents', 'Review', 'Completed']

export function Onboarding() {
  return (
    <div>
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Onboarding</h1>
          <p className="page-subtitle">{onboardingCases.length} employees currently onboarding</p>
        </div>
        <Link to="/employees/add" className="btn btn-primary">Start onboarding</Link>
      </div>

      {onboardingCases.length === 0 ? (
        <div className="card">
          <div className="empty-state">No one is currently onboarding.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {onboardingCases.map((oc) => {
            const emp = employeeById(oc.employeeId)
            if (!emp) return null
            const dept = departmentById(emp.departmentId)
            return (
              <div className="card card-pad" key={oc.id}>
                <div className="flex-between">
                  <Link to={`/employees/${emp.id}`} className="table-person">
                    <div className="avatar md" style={{ background: emp.avatarColor }}>
                      {emp.firstName[0]}{emp.lastName[0]}
                    </div>
                    <div>
                      <div className="table-person-name">{fullName(emp)}</div>
                      <div className="table-person-sub">{emp.jobTitle} · {dept?.name}</div>
                    </div>
                  </Link>
                  <Link to={`/employees/${emp.id}`} className="btn btn-secondary sm">
                    Review <IconChevronRight width={13} height={13} />
                  </Link>
                </div>

                <div className="mt-16">
                  <div className="flex-between small muted" style={{ marginBottom: 6 }}>
                    <span>Current step: <strong style={{ color: 'var(--text)' }}>{oc.currentStep}</strong></span>
                    <span>{oc.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${oc.progress}%` }} />
                  </div>
                </div>

                <div className="flex gap-8 mt-16" style={{ flexWrap: 'wrap' }}>
                  {stepOrder.map((s) => (
                    <span
                      key={s}
                      className="small"
                      style={{
                        padding: '3px 10px',
                        borderRadius: 999,
                        border: '1px solid var(--border)',
                        color: s === oc.currentStep ? 'var(--accent-strong)' : 'var(--text-faint)',
                        background: s === oc.currentStep ? 'var(--accent-soft)' : 'transparent',
                        borderColor: s === oc.currentStep ? 'var(--accent)' : 'var(--border)',
                        fontWeight: s === oc.currentStep ? 700 : 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {oc.missingDocuments.length > 0 && (
                  <div className="small mt-16" style={{ color: 'var(--warn)' }}>
                    Missing documents: {oc.missingDocuments.join(', ')}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
