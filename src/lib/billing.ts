import type { Invoice, Timesheet } from '../types'
import { clients, hourlyRates, company } from '../data/billingData'

export const VAT_RATE = 21 // standard Belgian VAT rate (%)
export const STANDARD_WEEK_HOURS = 38 // standard full-time working week in Belgium

/* ---------- Formatting (Belgian style) ---------- */

const eur = new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' })
export const formatEur = (n: number) => eur.format(n)

export const formatDate = (iso: string) => (iso ? new Date(iso).toLocaleDateString('en-GB') : '—')

export function monthLabel(month: string): string {
  const [y, m] = month.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

/* ---------- Dates ---------- */

const pad = (n: number) => String(n).padStart(2, '0')
export const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

/** Every calendar day of a 'YYYY-MM' month as ISO strings. */
export function daysOfMonth(month: string): string[] {
  const [y, m] = month.split('-').map(Number)
  const count = new Date(y, m, 0).getDate()
  return Array.from({ length: count }, (_, i) => `${y}-${pad(m)}-${pad(i + 1)}`)
}

export const isWeekend = (iso: string) => {
  const day = new Date(iso).getDay()
  return day === 0 || day === 6
}

/** Monday of the week containing the given ISO date. */
export function weekStart(iso: string): string {
  const d = new Date(iso)
  const diff = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - diff)
  return isoDate(d)
}

export function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return isoDate(d)
}

/* ---------- Timesheet maths ---------- */

export const totalHours = (entries: Record<string, number>) =>
  Object.values(entries).reduce((sum, h) => sum + (Number.isFinite(h) ? h : 0), 0)

export function weeklyTotals(entries: Record<string, number>): { week: string; hours: number }[] {
  const map: Record<string, number> = {}
  Object.entries(entries).forEach(([date, h]) => {
    const w = weekStart(date)
    map[w] = (map[w] ?? 0) + h
  })
  return Object.entries(map)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([week, hours]) => ({ week, hours }))
}

/** Demo helper: spread `total` hours over weekdays at `perDay` hours a day. */
export function buildEntries(month: string, perDay: number, total: number): Record<string, number> {
  const entries: Record<string, number> = {}
  let remaining = total
  for (const d of daysOfMonth(month)) {
    if (remaining <= 0) break
    if (isWeekend(d)) continue
    const h = Math.min(perDay, remaining)
    entries[d] = h
    remaining -= h
  }
  return entries
}

/* ---------- Belgian structured communication (OGM / VCS) ---------- */

/**
 * Belgian payment reference: 10 digits + 2 check digits (digits mod 97),
 * written +++XXX/XXXX/XXXXX+++. Banks use it to match payments automatically.
 */
export function structuredCommunication(seed: number): string {
  const base = String(seed).padStart(10, '0').slice(-10)
  const rest = Number(base) % 97
  const check = String(rest === 0 ? 97 : rest).padStart(2, '0')
  const all = base + check
  return `+++${all.slice(0, 3)}/${all.slice(3, 7)}/${all.slice(7)}+++`
}

/* ---------- Auto-invoice generation ---------- */

const round2 = (n: number) => Math.round(n * 100) / 100

/**
 * Builds an invoice from an approved timesheet:
 * hours x hourly rate = subtotal, + 21% VAT = total.
 */
export function createInvoiceFromTimesheet(
  ts: Timesheet,
  employeeName: string,
  existing: Invoice[],
  today: string
): Invoice {
  const client = clients.find((c) => c.id === ts.clientId)
  const rate = hourlyRates[ts.employeeId] ?? 0
  const hours = totalHours(ts.entries)
  const subtotal = round2(hours * rate)
  const vatAmount = round2((subtotal * VAT_RATE) / 100)
  const year = today.slice(0, 4)
  const sequence = existing.filter((i) => i.number.includes(`-${year}-`)).length + 1
  const terms = client?.paymentTermsDays ?? company.defaultPaymentTermsDays

  return {
    id: `inv-${Date.now()}-${sequence}`,
    number: `INV-${year}-${String(sequence).padStart(4, '0')}`,
    timesheetId: ts.id,
    clientId: ts.clientId,
    employeeId: ts.employeeId,
    month: ts.month,
    issueDate: today,
    dueDate: addDays(today, terms),
    lines: [
      {
        description: `${employeeName} — services ${monthLabel(ts.month)}`,
        hours,
        rate,
        amount: subtotal,
      },
    ],
    subtotal,
    vatRate: VAT_RATE,
    vatAmount,
    total: round2(subtotal + vatAmount),
    status: 'Draft',
    structuredCommunication: structuredCommunication(Number(year) * 1000 + sequence * 7 + 1000),
  }
}
