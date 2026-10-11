import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

const titles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Overview of company headcount and activity' },
  '/employees': { title: 'Employees', subtitle: 'Manage employee records across all departments' },
  '/departments': { title: 'Departments', subtitle: 'Organise employees into teams and reporting lines' },
  '/onboarding': { title: 'Onboarding', subtitle: 'Track new hires through setup and paperwork' },
  '/documents': { title: 'Documents', subtitle: 'Employee contracts, IDs and HR records' },
  '/timesheets': { title: 'Timesheets', subtitle: 'Log monthly hours for billing' },
  '/approvals': { title: 'Approvals', subtitle: 'Review submitted timesheets' },
  '/invoices': { title: 'Invoices', subtitle: 'Auto-generated from approved timesheets' },
  '/settings': { title: 'Settings', subtitle: 'Company profile, users and permissions' },
  '/employees/add': { title: 'Add employee', subtitle: 'Create a new employee record' },
}

export function AppLayout() {
  const location = useLocation()
  const match =
    titles[location.pathname] ??
    (location.pathname.startsWith('/employees/')
      ? { title: 'Employee profile', subtitle: '' }
      : location.pathname.startsWith('/invoices/')
        ? { title: 'Invoice', subtitle: '' }
        : { title: 'Novara HR', subtitle: '' })

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-column">
        <Topbar title={match.title} subtitle={match.subtitle} />
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
