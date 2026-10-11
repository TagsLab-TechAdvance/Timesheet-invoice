import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Invoice, InvoiceStatus, Timesheet } from '../types'
import { clientAssignments } from '../data/billingData'
import { employeeById, fullName } from '../data/mockData'
import { buildEntries, createInvoiceFromTimesheet, isoDate } from '../lib/billing'

interface TimeBillingState {
  timesheets: Timesheet[]
  invoices: Invoice[]
  findTimesheet: (employeeId: string, month: string) => Timesheet | undefined
  createTimesheet: (employeeId: string, month: string) => void
  setHours: (timesheetId: string, date: string, hours: number) => void
  fillWeekdays: (timesheetId: string, perDay: number) => void
  submitTimesheet: (timesheetId: string) => void
  approveTimesheet: (timesheetId: string) => Invoice | undefined
  rejectTimesheet: (timesheetId: string) => void
  setInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void
}

const Ctx = createContext<TimeBillingState | null>(null)

const todayIso = () => isoDate(new Date())

function seedTimesheets(): Timesheet[] {
  return [
    // Waiting for manager approval
    { id: 'ts-1', employeeId: 'emp-002', clientId: 'cl-1', month: '2026-09', entries: buildEntries('2026-09', 8, 152), status: 'Submitted', submittedOn: '2026-09-30' },
    // The "20 hours this month" example
    { id: 'ts-2', employeeId: 'emp-010', clientId: 'cl-3', month: '2026-09', entries: buildEntries('2026-09', 4, 20), status: 'Submitted', submittedOn: '2026-09-30' },
    // Already approved, invoice generated and sent
    { id: 'ts-3', employeeId: 'emp-003', clientId: 'cl-2', month: '2026-09', entries: buildEntries('2026-09', 8, 80), status: 'Approved', submittedOn: '2026-09-29', decidedOn: '2026-10-02', invoiceId: 'inv-seed-1' },
    // Current month, still being filled in
    { id: 'ts-4', employeeId: 'emp-002', clientId: 'cl-1', month: '2026-10', entries: buildEntries('2026-10', 8, 56), status: 'Draft' },
  ]
}

function seedInvoices(timesheets: Timesheet[]): Invoice[] {
  const ts = timesheets.find((t) => t.id === 'ts-3')!
  const emp = employeeById(ts.employeeId)!
  const inv = createInvoiceFromTimesheet(ts, fullName(emp), [], '2026-10-02')
  return [{ ...inv, id: 'inv-seed-1', status: 'Sent' }]
}

export function TimeBillingProvider({ children }: { children: ReactNode }) {
  const [timesheets, setTimesheets] = useState<Timesheet[]>(seedTimesheets)
  const [invoices, setInvoices] = useState<Invoice[]>(() => seedInvoices(seedTimesheets()))

  const value = useMemo<TimeBillingState>(() => {
    const patch = (id: string, fn: (t: Timesheet) => Timesheet) =>
      setTimesheets((list) => list.map((t) => (t.id === id ? fn(t) : t)))

    return {
      timesheets,
      invoices,

      findTimesheet: (employeeId, month) =>
        timesheets.find((t) => t.employeeId === employeeId && t.month === month),

      createTimesheet: (employeeId, month) => {
        const clientId = clientAssignments[employeeId]
        if (!clientId) return
        setTimesheets((list) => [
          ...list,
          { id: `ts-${Date.now()}`, employeeId, clientId, month, entries: {}, status: 'Draft' },
        ])
      },

      setHours: (id, date, hours) =>
        patch(id, (t) => {
          const entries = { ...t.entries }
          if (!hours || hours <= 0) delete entries[date]
          else entries[date] = Math.min(24, hours)
          return { ...t, entries }
        }),

      fillWeekdays: (id, perDay) =>
        patch(id, (t) => ({ ...t, entries: buildEntries(t.month, perDay, 999) })),

      submitTimesheet: (id) =>
        patch(id, (t) => ({ ...t, status: 'Submitted', submittedOn: todayIso() })),

      rejectTimesheet: (id) =>
        patch(id, (t) => ({ ...t, status: 'Rejected', decidedOn: todayIso() })),

      approveTimesheet: (id) => {
        const ts = timesheets.find((t) => t.id === id)
        const emp = ts ? employeeById(ts.employeeId) : undefined
        if (!ts || !emp) return undefined
        // Approving a timesheet automatically generates its invoice.
        const invoice = createInvoiceFromTimesheet(ts, fullName(emp), invoices, todayIso())
        setInvoices((list) => [invoice, ...list])
        patch(id, (t) => ({ ...t, status: 'Approved', decidedOn: todayIso(), invoiceId: invoice.id }))
        return invoice
      },

      setInvoiceStatus: (invoiceId, status) =>
        setInvoices((list) => list.map((i) => (i.id === invoiceId ? { ...i, status } : i))),
    }
  }, [timesheets, invoices])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTimeBilling(): TimeBillingState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTimeBilling must be used inside TimeBillingProvider')
  return ctx
}
