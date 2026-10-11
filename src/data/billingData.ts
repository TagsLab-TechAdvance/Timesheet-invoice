import type { Client } from '../types'

/** The company issuing the invoices (the "seller"). Demo values only. */
export const company = {
  name: 'Novara HR — Belgium Operations',
  vatNumber: 'BE 0123.456.789',
  address: 'Rue de la Loi 24',
  city: '1000 Brussels, Belgium',
  email: 'billing@novarahr.be',
  iban: 'BE68 5390 0754 7034', // demo IBAN
  bic: 'BBRUBEBB',
  defaultPaymentTermsDays: 30,
}

export const clients: Client[] = [
  {
    id: 'cl-1',
    name: 'Brabant Logistics NV',
    vatNumber: 'BE 0456.123.789',
    address: 'Havenlaan 86',
    city: '1000 Brussels',
    contactEmail: 'accounts@brabantlogistics.example',
    paymentTermsDays: 30,
  },
  {
    id: 'cl-2',
    name: 'Flandria Retail BV',
    vatNumber: 'BE 0789.456.123',
    address: 'Meirbrug 14',
    city: '2000 Antwerp',
    contactEmail: 'finance@flandriaretail.example',
    paymentTermsDays: 30,
  },
  {
    id: 'cl-3',
    name: 'Wallonie Digital SRL',
    vatNumber: 'BE 0321.654.987',
    address: 'Rue du Pont 7',
    city: '4000 Liège',
    contactEmail: 'compta@walloniedigital.example',
    paymentTermsDays: 15,
  },
]

/** Hourly billing rate per employee, in EUR excl. VAT. */
export const hourlyRates: Record<string, number> = {
  'emp-002': 65,
  'emp-003': 70,
  'emp-004': 85,
  'emp-005': 60,
  'emp-010': 50,
}

/** Which client each billable employee works for. */
export const clientAssignments: Record<string, string> = {
  'emp-002': 'cl-1',
  'emp-003': 'cl-2',
  'emp-004': 'cl-2',
  'emp-005': 'cl-1',
  'emp-010': 'cl-3',
}

export const billableEmployeeIds = Object.keys(clientAssignments)

export const availableMonths = ['2026-09', '2026-10']
