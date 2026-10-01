import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { studentService } from "@/services/studentService"

const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(9, "Enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Select a gender"),
  program: z.string().min(1, "Select a program"),
  department: z.string().min(1, "Select a department"),
  academicYear: z.string().min(1, "Select an academic year"),
})

type StudentFormValues = z.infer<typeof studentSchema>

export interface Student {
  id: string
  studentNumber: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  program: string
  department: string
  academicYear: string
}

interface StudentEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student | null
  onSuccess?: () => void
}

export function StudentEditDialog({
  open,
  onOpenChange,
  student,
  onSuccess,
}: StudentEditDialogProps) {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",    
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      program: "",
      department: "",
      academicYear: "",
    },
  })

  /*
   * Populate the form whenever the student changes.
   */
  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,      
        email: student.email,
        phone: student.phone,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        program: student.program,
        department: student.department,
        academicYear: student.academicYear,
      })
    }
  }, [student, form])

  const onSubmit = async (values: StudentFormValues) => {
    if (!student) return

    console.log("Updating student:", student.id, values)
    
    await studentService.updateStudent(student.id, values)     

    onOpenChange(false)
    onSuccess?.()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value)

        if (!value) {
          form.reset()
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>

          <DialogDescription>
            Update the student's personal and academic information.
          </DialogDescription>
        </DialogHeader>

        {student && (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">

             

              {/* Personal Information */}

              <div>
                <h3 className="text-sm font-semibold">
                  Personal Information
                </h3>

                <p className="text-sm text-muted-foreground">
                  Update the student's personal and contact details.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <Field>
                  <FieldLabel>Full Name</FieldLabel>

                  <Input
                    placeholder="John"
                    {...form.register("name")}
                  />

                  {form.formState.errors.name && (
                    <FieldError>
                      {form.formState.errors.name.message}
                    </FieldError>
                  )}
                </Field>

                

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <Field>
                  <FieldLabel>Email</FieldLabel>

                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...form.register("email")}
                  />

                  {form.formState.errors.email && (
                    <FieldError>
                      {form.formState.errors.email.message}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>

                  <Input
                    placeholder="+256 700 000000"
                    {...form.register("phone")}
                  />

                  {form.formState.errors.phone && (
                    <FieldError>
                      {form.formState.errors.phone.message}
                    </FieldError>
                  )}
                </Field>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <Field>
                  <FieldLabel>Date of Birth</FieldLabel>

                  <Input
                    type="date"
                    {...form.register("dateOfBirth")}
                  />

                  {form.formState.errors.dateOfBirth && (
                    <FieldError>
                      {form.formState.errors.dateOfBirth.message}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Gender</FieldLabel>

                  <Select
                    value={form.watch("gender")}
                    onValueChange={(value) =>
                      form.setValue("gender", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="MALE">
                        Male
                      </SelectItem>

                      <SelectItem value="FEMALE">
                        Female
                      </SelectItem>

                      <SelectItem value="OTHER">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {form.formState.errors.gender && (
                    <FieldError>
                      {form.formState.errors.gender.message}
                    </FieldError>
                  )}
                </Field>

              </div>

              {/* Academic Information */}

              <div className="pt-2">
                <h3 className="text-sm font-semibold">
                  Academic Information
                </h3>

                <p className="text-sm text-muted-foreground">
                  Update the student's current academic enrollment.
                </p>
              </div>

              <Field>
                <FieldLabel>Program</FieldLabel>

                <Select
                  value={form.watch("program")}
                  onValueChange={(value) =>
                    form.setValue("program", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="computer-science">
                      Bachelor of Computer Science
                    </SelectItem>

                    <SelectItem value="information-technology">
                      Bachelor of Information Technology
                    </SelectItem>

                    <SelectItem value="software-engineering">
                      Bachelor of Software Engineering
                    </SelectItem>
                  </SelectContent>
                </Select>

                {form.formState.errors.program && (
                  <FieldError>
                    {form.formState.errors.program.message}
                  </FieldError>
                )}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">

                <Field>
                  <FieldLabel>Department</FieldLabel>

                  <Select
                    value={form.watch("department")}
                    onValueChange={(value) =>
                      form.setValue("department", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="computing">
                        Department of Computing
                      </SelectItem>

                      <SelectItem value="business">
                        Department of Business
                      </SelectItem>

                      <SelectItem value="engineering">
                        Department of Engineering
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {form.formState.errors.department && (
                    <FieldError>
                      {form.formState.errors.department.message}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Academic Year</FieldLabel>

                  <Select
                    value={form.watch("academicYear")}
                    onValueChange={(value) =>
                      form.setValue("academicYear", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="2026/2027">
                        2026/2027
                      </SelectItem>

                      <SelectItem value="2025/2026">
                        2025/2026
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {form.formState.errors.academicYear && (
                    <FieldError>
                      {form.formState.errors.academicYear.message}
                    </FieldError>
                  )}
                </Field>

              </div>

              {/* Actions */}

              <div className="flex justify-end gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={
                    form.formState.isSubmitting ||
                    !student
                  }
                >
                  {form.formState.isSubmitting
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </div>

            </FieldGroup>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}