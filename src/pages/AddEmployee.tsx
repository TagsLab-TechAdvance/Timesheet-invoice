import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { departments } from '../data/mockData'
import { IconArrowLeft, IconCheck, IconUpload } from '../components/ui/Icons'

const steps = ['Personal', 'Employment', 'Documents', 'Review'] as const
type Step = (typeof steps)[number]

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  departmentId: string
  jobTitle: string
  employmentType: string
  joiningDate: string
  documents: string[]
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  departmentId: departments[0]?.id ?? '',
  jobTitle: '',
  employmentType: 'Full-time',
  joiningDate: '',
  documents: [],
}

export function AddEmployee() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState<FormState>(initial)

  const step: Step = steps[stepIndex]

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleDoc(name: string) {
    setForm((f) => ({
      ...f,
      documents: f.documents.includes(name) ? f.documents.filter((d) => d !== name) : [...f.documents, name],
    }))
  }

  if (done) {
    return (
      <div className="card card-pad" style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
        <div
          className="avatar lg"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent-strong)', margin: '0 auto 16px' }}
        >
          <IconCheck width={24} height={24} />
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800 }}>Onboarding started</h2>
        <p className="muted small" style={{ marginTop: 8, marginBottom: 24 }}>
          {form.firstName} {form.lastName} has been added and will appear under Onboarding
          until their record and documents are fully verified.
        </p>
        <div className="flex gap-8" style={{ justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => { setForm(initial); setStepIndex(0); setDone(false) }}>
            Add another
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/onboarding')}>
            View onboarding
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Link to="/employees" className="breadcrumb">
        <IconArrowLeft width={13} height={13} /> Back to employees
      </Link>

      <h1 className="page-title" style={{ marginBottom: 20 }}>Add employee</h1>

      <div className="stepper">
        {steps.map((s, i) => (
          <div key={s} className="stepper-step">
            <div className={`stepper-circle ${i < stepIndex ? 'done' : i === stepIndex ? 'current' : ''}`}>
              {i < stepIndex ? <IconCheck width={14} height={14} /> : i + 1}
            </div>
            <span className={`stepper-label ${i <= stepIndex ? 'active' : ''}`}>{s}</span>
            {i < steps.length - 1 && <div className={`stepper-line ${i < stepIndex ? 'done' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="card card-pad">
        {step === 'Personal' && (
          <div>
            <div className="field-row">
              <div className="field">
                <label>First name</label>
                <input className="input" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="e.g. Elke" />
              </div>
              <div className="field">
                <label>Last name</label>
                <input className="input" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="e.g. Claes" />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Work email</label>
                <input className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="name@novarahr.be" />
              </div>
              <div className="field">
                <label>Phone</label>
                <input className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+32 4xx xx xx xx" />
              </div>
            </div>
            <div className="field">
              <label>City</label>
              <input className="input" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="e.g. Antwerp" />
            </div>
          </div>
        )}

        {step === 'Employment' && (
          <div>
            <div className="field-row">
              <div className="field">
                <label>Department</label>
                <select className="select" value={form.departmentId} onChange={(e) => update('departmentId', e.target.value)}>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Job title</label>
                <input className="input" value={form.jobTitle} onChange={(e) => update('jobTitle', e.target.value)} placeholder="e.g. HR Coordinator" />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Employment type</label>
                <select className="select" value={form.employmentType} onChange={(e) => update('employmentType', e.target.value)}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contractor</option>
                </select>
              </div>
              <div className="field">
                <label>Joining date</label>
                <input type="date" className="input" value={form.joiningDate} onChange={(e) => update('joiningDate', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 'Documents' && (
          <div>
            <p className="small muted" style={{ marginBottom: 14 }}>
              Mark which documents have been collected. Missing items will show under Onboarding.
            </p>
            {['Employment contract', 'National ID', 'Diploma', 'Bank details'].map((docName) => (
              <label
                key={docName}
                className="doc-row"
                style={{ cursor: 'pointer' }}
              >
                <div className="flex gap-12" style={{ alignItems: 'center' }}>
                  <div className="doc-icon"><IconUpload width={15} height={15} /></div>
                  <span className="small" style={{ fontWeight: 600 }}>{docName}</span>
                </div>
                <input
                  type="checkbox"
                  checked={form.documents.includes(docName)}
                  onChange={() => toggleDoc(docName)}
                />
              </label>
            ))}
          </div>
        )}

        {step === 'Review' && (
          <div>
            <div className="field-row">
              <ReviewField label="Name" value={`${form.firstName || '—'} ${form.lastName || ''}`} />
              <ReviewField label="Email" value={form.email || '—'} />
              <ReviewField label="Department" value={departments.find((d) => d.id === form.departmentId)?.name ?? '—'} />
              <ReviewField label="Job title" value={form.jobTitle || '—'} />
              <ReviewField label="Employment type" value={form.employmentType} />
              <ReviewField label="Joining date" value={form.joiningDate || '—'} />
            </div>
            <div className="field">
              <label>Documents collected</label>
              <div className="small muted">
                {form.documents.length > 0 ? form.documents.join(', ') : 'None yet — will show as missing in onboarding'}
              </div>
            </div>
          </div>
        )}

        <div className="flex-between mt-24">
          <button
            className="btn btn-ghost"
            onClick={() => (stepIndex === 0 ? navigate('/employees') : setStepIndex((i) => i - 1))}
          >
            {stepIndex === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => (stepIndex === steps.length - 1 ? setDone(true) : setStepIndex((i) => i + 1))}
          >
            {stepIndex === steps.length - 1 ? 'Submit' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="small" style={{ fontWeight: 600 }}>{value}</div>
    </div>
  )
}
