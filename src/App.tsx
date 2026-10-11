import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Employees } from './pages/Employees'
import { EmployeeDetails } from './pages/EmployeeDetails'
import { AddEmployee } from './pages/AddEmployee'
import { Departments } from './pages/Departments'
import { Onboarding } from './pages/Onboarding'
import { Documents } from './pages/Documents'
import { Settings } from './pages/Settings'
import { Timesheets } from './pages/Timesheets'
import { Approvals } from './pages/Approvals'
import { Invoices } from './pages/Invoices'
import { InvoiceDetails } from './pages/InvoiceDetails'
import { TimeBillingProvider } from './store/TimeBillingContext'

export default function App() {
  return (
    <TimeBillingProvider>
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
    </TimeBillingProvider>
  )
}
