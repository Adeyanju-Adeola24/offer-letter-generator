export interface FormData {
  companyName: string
  companyAddress: string
  companyCity: string
  companyState: string
  companyPincode: string
  candidateName: string
  candidateAddress: string
  position: string
  department: string
  joiningDate: string
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship'
  workMode: 'Office' | 'Remote' | 'Hybrid'
  workLocation: string
  ctc: string
  basicSalary: string
  hra: string
  specialAllowance: string
  probationPeriod: string
  noticePeriod: string
  offerValidity: string
  managerName: string
  managerTitle: string
}

export interface ValidationErrors {
  [key: string]: string
}

export type FormSection = 'company' | 'candidate' | 'job' | 'compensation' | 'terms'
