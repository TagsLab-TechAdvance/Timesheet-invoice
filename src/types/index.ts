export type EmployeeStatus = 'Active' | 'Pending' | 'Inactive'

export interface Department {
  id: string
  name: string
  managerId: string | null
  color: string
}

export interface EmployeeDocument {
  id: string
  name: string
  type: string
  uploadedOn: string
  status: 'Verified' | 'Awaiting review' | 'Missing'
}

export interface Employee {
  id: string
  employeeCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  dateOfBirth: string
  departmentId: string
  jobTitle: string
  managerId: string | null
  employmentType: 'Full-time' | 'Part-time' | 'Contractor'
  joiningDate: string
  status: EmployeeStatus
  avatarColor: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  documents: EmployeeDocument[]
}

export interface OnboardingCase {
  id: string
  employeeId: string
  startedOn: string
  currentStep: 'Personal' | 'Employment' | 'Documents' | 'Review' | 'Completed'
  progress: number
  missingDocuments: string[]
}

export interface ActivityItem {
  id: string
  message: string
  timestamp: string
  kind: 'employee' | 'onboarding' | 'document' | 'department'
}

/* ---------- Time & Billing (Phase 1.5) ---------- */

export interface Client {
  id: string
  name: string
  vatNumber: string
  address: string
  city: string
  contactEmail: string
  paymentTermsDays: number
}

export type TimesheetStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected'

export interface Timesheet {
  id: string
  employeeId: string
  clientId: string
  month: string // 'YYYY-MM'
  entries: Record<string, number> // 'YYYY-MM-DD' -> hours
  status: TimesheetStatus
  submittedOn?: string
  decidedOn?: string
  invoiceId?: string
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue'

export interface InvoiceLine {
  description: string
  hours: number
  rate: number
  amount: number
}

export interface Invoice {
  id: string
  number: string
  timesheetId: string
  clientId: string
  employeeId: string
  month: string
  issueDate: string
  dueDate: string
  lines: InvoiceLine[]
  subtotal: number
  vatRate: number
  vatAmount: number
  total: number
  status: InvoiceStatus
  structuredCommunication: string
}
