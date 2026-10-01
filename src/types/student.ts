export interface Student {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  program: string
  department: string
  academicYear: string
  yearOfStudy: string
  status: "Active" | "Inactive" | "Graduated" | "Suspended"
}