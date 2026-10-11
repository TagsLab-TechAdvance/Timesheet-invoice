import { NavLink } from 'react-router-dom'
import {
  IconGrid,
  IconUsers,
  IconBuilding,
  IconClipboard,
  IconFolder,
  IconSettings,
  IconFile,
  IconCheck,
  IconTrend,
} from '../ui/Icons'
import { useTimeBilling } from '../../store/TimeBillingContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: IconGrid, end: true },
  { to: '/employees', label: 'Employees', icon: IconUsers },
  { to: '/departments', label: 'Departments', icon: IconBuilding },
  { to: '/onboarding', label: 'Onboarding', icon: IconClipboard },
  { to: '/documents', label: 'Documents', icon: IconFolder },
]

export function Sidebar() {
  const { timesheets } = useTimeBilling()
  const pending = timesheets.filter((t) => t.status === 'Submitted').length
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">NH</div>
        <div className="sidebar-brand-text">
          <strong>Novara HR</strong>
          <span>Core HR · Phase 1</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Workspace</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon width={17} height={17} />
            {item.label}
          </NavLink>
        ))}
        <div className="sidebar-section-label">Time &amp; Billing</div>
        <NavLink to="/timesheets" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <IconTrend width={17} height={17} />
          Timesheets
        </NavLink>
        <NavLink to="/approvals" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <IconCheck width={17} height={17} />
          Approvals
          {pending > 0 && <span className="nav-badge">{pending}</span>}
        </NavLink>
        <NavLink to="/invoices" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <IconFile width={17} height={17} />
          Invoices
        </NavLink>
        <div className="sidebar-section-label">Configuration</div>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <IconSettings width={17} height={17} />
          Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <strong>Phase 1 — Core HR + Billing</strong>
        Employees, onboarding, timesheets and automatic invoicing. Payroll and Belgian
        compliance arrive in later phases.
      </div>
    </aside>
  )
}
