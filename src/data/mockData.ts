import type { Department, Employee, OnboardingCase, ActivityItem } from '../types'

export const departments: Department[] = [
  { id: 'dep-it', name: 'IT & Engineering', managerId: 'emp-004', color: '#2F6F5E' },
  { id: 'dep-fin', name: 'Finance', managerId: 'emp-006', color: '#8A6D3B' },
  { id: 'dep-hr', name: 'Human Resources', managerId: 'emp-001', color: '#5B5FEF' },
  { id: 'dep-sales', name: 'Sales', managerId: 'emp-009', color: '#B2455A' },
  { id: 'dep-ops', name: 'Operations', managerId: 'emp-011', color: '#2C6E8E' },
]

export const employees: Employee[] = [
  {
    id: 'emp-001', employeeCode: 'EMP-1001', firstName: 'Marie', lastName: 'Dubois',
    email: 'marie.dubois@novarahr.be', phone: '+32 478 12 34 56',
    address: 'Rue de la Loi 24', city: 'Brussels', dateOfBirth: '1985-03-12',
    departmentId: 'dep-hr', jobTitle: 'HR Manager', managerId: null,
    employmentType: 'Full-time', joiningDate: '2019-04-01', status: 'Active', avatarColor: '#5B5FEF',
    emergencyContact: { name: 'Paul Dubois', relationship: 'Spouse', phone: '+32 478 99 11 22' },
    documents: [
      { id: 'doc-1', name: 'Employment contract', type: 'Contract', uploadedOn: '2019-04-01', status: 'Verified' },
      { id: 'doc-2', name: 'National ID', type: 'Identification', uploadedOn: '2019-04-01', status: 'Verified' },
    ],
  },
  {
    id: 'emp-002', employeeCode: 'EMP-1002', firstName: 'Jonas', lastName: 'Peeters',
    email: 'jonas.peeters@novarahr.be', phone: '+32 470 22 45 12',
    address: 'Meir 88', city: 'Antwerp', dateOfBirth: '1990-07-22',
    departmentId: 'dep-it', jobTitle: 'Frontend Developer', managerId: 'emp-004',
    employmentType: 'Full-time', joiningDate: '2021-09-15', status: 'Active', avatarColor: '#2F6F5E',
    emergencyContact: { name: 'Anke Peeters', relationship: 'Sister', phone: '+32 470 55 33 12' },
    documents: [
      { id: 'doc-3', name: 'Employment contract', type: 'Contract', uploadedOn: '2021-09-15', status: 'Verified' },
      { id: 'doc-4', name: 'National ID', type: 'Identification', uploadedOn: '2021-09-15', status: 'Verified' },
      { id: 'doc-5', name: 'Diploma', type: 'Education', uploadedOn: '2021-09-16', status: 'Awaiting review' },
    ],
  },
  {
    id: 'emp-003', employeeCode: 'EMP-1003', firstName: 'Aurélie', lastName: 'Lambert',
    email: 'aurelie.lambert@novarahr.be', phone: '+32 486 77 44 09',
    address: 'Place Saint-Lambert 5', city: 'Liège', dateOfBirth: '1993-11-02',
    departmentId: 'dep-sales', jobTitle: 'Account Executive', managerId: 'emp-009',
    employmentType: 'Full-time', joiningDate: '2022-01-10', status: 'Active', avatarColor: '#B2455A',
    emergencyContact: { name: 'Nicolas Lambert', relationship: 'Brother', phone: '+32 486 12 90 44' },
    documents: [
      { id: 'doc-6', name: 'Employment contract', type: 'Contract', uploadedOn: '2022-01-10', status: 'Verified' },
    ],
  },
  {
    id: 'emp-004', employeeCode: 'EMP-1004', firstName: 'Tom', lastName: 'Van Damme',
    email: 'tom.vandamme@novarahr.be', phone: '+32 495 33 21 77',
    address: 'Korenmarkt 12', city: 'Ghent', dateOfBirth: '1982-05-19',
    departmentId: 'dep-it', jobTitle: 'Engineering Lead', managerId: null,
    employmentType: 'Full-time', joiningDate: '2018-06-01', status: 'Active', avatarColor: '#2F6F5E',
    emergencyContact: { name: 'Ellen Van Damme', relationship: 'Spouse', phone: '+32 495 88 20 10' },
    documents: [
      { id: 'doc-7', name: 'Employment contract', type: 'Contract', uploadedOn: '2018-06-01', status: 'Verified' },
      { id: 'doc-8', name: 'National ID', type: 'Identification', uploadedOn: '2018-06-01', status: 'Verified' },
    ],
  },
  {
    id: 'emp-005', employeeCode: 'EMP-1005', firstName: 'Sofie', lastName: 'Willems',
    email: 'sofie.willems@novarahr.be', phone: '+32 472 60 15 88',
    address: 'Diestsestraat 40', city: 'Leuven', dateOfBirth: '1997-02-28',
    departmentId: 'dep-it', jobTitle: 'Backend Developer', managerId: 'emp-004',
    employmentType: 'Full-time', joiningDate: '2026-08-01', status: 'Pending', avatarColor: '#2F6F5E',
    emergencyContact: { name: 'Karel Willems', relationship: 'Father', phone: '+32 472 09 77 21' },
    documents: [
      { id: 'doc-9', name: 'Employment contract', type: 'Contract', uploadedOn: '2026-08-01', status: 'Verified' },
      { id: 'doc-10', name: 'National ID', type: 'Identification', uploadedOn: '', status: 'Missing' },
      { id: 'doc-11', name: 'Diploma', type: 'Education', uploadedOn: '', status: 'Missing' },
    ],
  },
  {
    id: 'emp-006', employeeCode: 'EMP-1006', firstName: 'Bram', lastName: 'De Smet',
    email: 'bram.desmet@novarahr.be', phone: '+32 468 90 12 34',
    address: 'Vrijdagmarkt 3', city: 'Bruges', dateOfBirth: '1979-09-08',
    departmentId: 'dep-fin', jobTitle: 'Finance Manager', managerId: null,
    employmentType: 'Full-time', joiningDate: '2017-03-20', status: 'Active', avatarColor: '#8A6D3B',
    emergencyContact: { name: 'Lotte De Smet', relationship: 'Spouse', phone: '+32 468 45 90 12' },
    documents: [
      { id: 'doc-12', name: 'Employment contract', type: 'Contract', uploadedOn: '2017-03-20', status: 'Verified' },
    ],
  },
  {
    id: 'emp-007', employeeCode: 'EMP-1007', firstName: 'Charlotte', lastName: 'Maes',
    email: 'charlotte.maes@novarahr.be', phone: '+32 483 21 05 66',
    address: 'Grote Markt 9', city: 'Mechelen', dateOfBirth: '1996-12-14',
    departmentId: 'dep-fin', jobTitle: 'Payroll Analyst', managerId: 'emp-006',
    employmentType: 'Full-time', joiningDate: '2023-05-02', status: 'Active', avatarColor: '#8A6D3B',
    emergencyContact: { name: 'Sara Maes', relationship: 'Sister', phone: '+32 483 77 40 21' },
    documents: [
      { id: 'doc-13', name: 'Employment contract', type: 'Contract', uploadedOn: '2023-05-02', status: 'Verified' },
      { id: 'doc-14', name: 'National ID', type: 'Identification', uploadedOn: '2023-05-02', status: 'Verified' },
    ],
  },
  {
    id: 'emp-008', employeeCode: 'EMP-1008', firstName: 'Youssef', lastName: 'El Amrani',
    email: 'youssef.elamrani@novarahr.be', phone: '+32 491 66 08 45',
    address: 'Avenue Louise 200', city: 'Brussels', dateOfBirth: '1994-04-30',
    departmentId: 'dep-ops', jobTitle: 'Operations Coordinator', managerId: 'emp-011',
    employmentType: 'Full-time', joiningDate: '2026-09-01', status: 'Pending', avatarColor: '#2C6E8E',
    emergencyContact: { name: 'Nadia El Amrani', relationship: 'Mother', phone: '+32 491 30 12 09' },
    documents: [
      { id: 'doc-15', name: 'Employment contract', type: 'Contract', uploadedOn: '2026-09-01', status: 'Verified' },
      { id: 'doc-16', name: 'National ID', type: 'Identification', uploadedOn: '2026-09-02', status: 'Awaiting review' },
      { id: 'doc-17', name: 'Diploma', type: 'Education', uploadedOn: '', status: 'Missing' },
    ],
  },
  {
    id: 'emp-009', employeeCode: 'EMP-1009', firstName: 'Isabelle', lastName: 'Simon',
    email: 'isabelle.simon@novarahr.be', phone: '+32 475 40 88 19',
    address: 'Rue Neuve 60', city: 'Namur', dateOfBirth: '1981-01-17',
    departmentId: 'dep-sales', jobTitle: 'Sales Director', managerId: null,
    employmentType: 'Full-time', joiningDate: '2016-11-14', status: 'Active', avatarColor: '#B2455A',
    emergencyContact: { name: 'Marc Simon', relationship: 'Spouse', phone: '+32 475 12 60 88' },
    documents: [
      { id: 'doc-18', name: 'Employment contract', type: 'Contract', uploadedOn: '2016-11-14', status: 'Verified' },
    ],
  },
  {
    id: 'emp-010', employeeCode: 'EMP-1010', firstName: 'Lien', lastName: 'Goossens',
    email: 'lien.goossens@novarahr.be', phone: '+32 460 14 77 02',
    address: 'Sint-Jansplein 2', city: 'Hasselt', dateOfBirth: '1999-06-05',
    departmentId: 'dep-sales', jobTitle: 'Sales Development Rep', managerId: 'emp-009',
    employmentType: 'Contractor', joiningDate: '2025-10-01', status: 'Active', avatarColor: '#B2455A',
    emergencyContact: { name: 'Wout Goossens', relationship: 'Brother', phone: '+32 460 88 21 40' },
    documents: [
      { id: 'doc-19', name: 'Freelance agreement', type: 'Contract', uploadedOn: '2025-10-01', status: 'Verified' },
    ],
  },
  {
    id: 'emp-011', employeeCode: 'EMP-1011', firstName: 'Pieter', lastName: 'Wouters',
    email: 'pieter.wouters@novarahr.be', phone: '+32 479 55 90 33',
    address: 'Stationsplein 14', city: 'Kortrijk', dateOfBirth: '1977-08-25',
    departmentId: 'dep-ops', jobTitle: 'Operations Manager', managerId: null,
    employmentType: 'Full-time', joiningDate: '2015-02-16', status: 'Active', avatarColor: '#2C6E8E',
    emergencyContact: { name: 'Griet Wouters', relationship: 'Spouse', phone: '+32 479 03 66 12' },
    documents: [
      { id: 'doc-20', name: 'Employment contract', type: 'Contract', uploadedOn: '2015-02-16', status: 'Verified' },
    ],
  },
  {
    id: 'emp-012', employeeCode: 'EMP-1012', firstName: 'Emma', lastName: 'Janssens',
    email: 'emma.janssens@novarahr.be', phone: '+32 465 20 08 71',
    address: 'Grote Steenweg 5', city: 'Aalst', dateOfBirth: '2001-10-11',
    departmentId: 'dep-hr', jobTitle: 'HR Coordinator', managerId: 'emp-001',
    employmentType: 'Part-time', joiningDate: '2024-03-11', status: 'Inactive', avatarColor: '#5B5FEF',
    emergencyContact: { name: 'Hans Janssens', relationship: 'Father', phone: '+32 465 77 09 15' },
    documents: [
      { id: 'doc-21', name: 'Employment contract', type: 'Contract', uploadedOn: '2024-03-11', status: 'Verified' },
    ],
  },
]

export const onboardingCases: OnboardingCase[] = [
  { id: 'ob-1', employeeId: 'emp-005', startedOn: '2026-08-01', currentStep: 'Documents', progress: 60, missingDocuments: ['National ID', 'Diploma'] },
  { id: 'ob-2', employeeId: 'emp-008', startedOn: '2026-09-01', currentStep: 'Review', progress: 80, missingDocuments: ['Diploma'] },
]

export const activity: ActivityItem[] = [
  { id: 'act-1', message: 'Sofie Willems was added to IT & Engineering', timestamp: '2026-09-18 09:14', kind: 'employee' },
  { id: 'act-2', message: 'Youssef El Amrani submitted onboarding documents for review', timestamp: '2026-09-17 16:32', kind: 'onboarding' },
  { id: 'act-3', message: 'Employment contract verified for Charlotte Maes', timestamp: '2026-09-17 11:05', kind: 'document' },
  { id: 'act-4', message: 'Emma Janssens was marked inactive', timestamp: '2026-09-15 14:47', kind: 'employee' },
  { id: 'act-5', message: 'New department "Operations" reached 3 employees', timestamp: '2026-09-12 10:00', kind: 'department' },
]

export function departmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id)
}

export function employeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id)
}

export function fullName(e: Employee): string {
  return `${e.firstName} ${e.lastName}`
}
