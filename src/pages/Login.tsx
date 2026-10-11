import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconLock, IconMail } from '../components/ui/Icons'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('marie.dubois@novarahr.be')
  const [password, setPassword] = useState('••••••••')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="login-shell">
      <div className="login-visual">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">NH</div>
          <div className="sidebar-brand-text">
            <strong style={{ fontSize: 17 }}>Novara HR</strong>
            <span>Core HR · Phase 1</span>
          </div>
        </div>
        <div>
          <h1 className="serif" style={{ fontSize: 34, lineHeight: 1.25, fontWeight: 600, maxWidth: 420 }}>
            One place for employee records, departments and onboarding.
          </h1>
          <p className="small" style={{ color: '#B9C3BE', marginTop: 14, maxWidth: 380 }}>
            This Phase 1 preview establishes the Core HR foundation — company, employee,
            department, document and onboarding management — that later phases will build
            time tracking, payroll and Belgian compliance on top of.
          </p>
        </div>
        <div className="small" style={{ color: '#8FA098' }}>© 2026 Novara HR · Internal prototype</div>
      </div>

      <div className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Sign in to your workspace</h2>
          <p className="muted small" style={{ marginTop: 6, marginBottom: 26 }}>
            Enter your company credentials to continue.
          </p>

          <div className="field">
            <label>Work email</label>
            <div className="search-box">
              <IconMail width={15} height={15} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="search-box">
              <IconLock width={15} height={15} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex-between" style={{ marginBottom: 18 }}>
            <label className="small muted flex gap-8" style={{ alignItems: 'center' }}>
              <input type="checkbox" defaultChecked style={{ margin: 0 }} />
              Keep me signed in
            </label>
            <a className="small" style={{ color: 'var(--accent-strong)', fontWeight: 600 }} href="#forgot">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary block">
            Sign in
          </button>

          <p className="small muted" style={{ marginTop: 18, textAlign: 'center' }}>
            Demo prototype — any credentials will sign you in.
          </p>
        </form>
      </div>
    </div>
  )
}
