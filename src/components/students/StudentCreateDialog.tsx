import { useForm } from "react-hook-form"
import { _ZodString, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

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

import type { Student } from "@/types/student"
import { studentService } from "@/services/studentService"


/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
|
| This defines the rules for creating a student.
|
*/

const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  
  email: z
    .email("Enter a valid email address"),

  phone: z
    .string()
    .min(9, "Enter a valid phone number"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  gender: z
    .string()
    .min(1, "Please select a gender"),

  program: z
    .string()
    .min(1, "Please select a program"),

  department: z
    .string()
    .min(1, "Please select a department"),

  academicYear: z
    .string()
    .min(1, "Please select an academic year"),
})


/*
|--------------------------------------------------------------------------
| Form Type
|--------------------------------------------------------------------------
*/

type StudentFormValues =
  z.infer<typeof studentSchema>


/*
|--------------------------------------------------------------------------
| Component Props
|--------------------------------------------------------------------------
*/

interface StudentCreateDialogProps {

  /*
   * Controls whether the dialog is visible.
   */
  open: boolean

  /*
   * Called when the dialog should open or close.
   */
  onOpenChange: (open: boolean) => void

  /*
   * Called after a student has been successfully created.
   */
  onSuccess?: (student: Student) => void
}


/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export function StudentCreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: StudentCreateDialogProps) {

  /*
  |--------------------------------------------------------------------------
  | React Hook Form
  |--------------------------------------------------------------------------
  */

  const [loading,setLoading]= useState(false)

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
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (
    values: StudentFormValues
  ) => {

    try {

      setLoading(true)

      const student =   await studentService.createStudent(values)  
      form.reset()  

      onOpenChange(false)
      onSuccess?.(student)
      
      //Notify parent
      onSuccess?.(student)

    } catch (error) {

      console.error(
        "Failed to create student:",
        error
      )

    }finally{
      setLoading(false)
    }
  }

//render
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {

        onOpenChange(value)

        /*
         * Reset form when dialog closes.
         */
        if (!value) {
          form.reset()
        }

      }}
    >

      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          sm:max-w-2xl
        "
      >

        {/* ================================================================
            HEADER
        ================================================================= */}

        <DialogHeader>

          <DialogTitle>
            Create Student
          </DialogTitle>

          <DialogDescription>
            Enter the student's personal and
            academic information.
          </DialogDescription>

        </DialogHeader>


        {/* ================================================================
            FORM
        ================================================================= */}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >

          <FieldGroup className="space-y-6">


            {/* ============================================================
                PERSONAL INFORMATION
            ============================================================= */}

            <div>

              <h3 className="text-sm font-semibold">
                Personal Information
              </h3>

              <p className="text-sm text-muted-foreground">
                Enter the student's basic personal
                and contact information.
              </p>

            </div>


            {/* First + Last Name */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* First Name */}

              <Field>

                <FieldLabel>
                 Student Name
                </FieldLabel>

                <Input
                  placeholder="John"
                  {...form.register("name")}
                />


              </Field>


              {/* Last Name */}

              
            </div>


            {/* Email + Phone */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Email */}

              <Field>

                <FieldLabel>
                  Email
                </FieldLabel>

                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...form.register("email")}
                />

                {form.formState.errors.email && (
                  <FieldError>
                    {
                      form.formState
                        .errors
                        .email
                        .message
                    }
                  </FieldError>
                )}

              </Field>


              {/* Phone */}

              <Field>

                <FieldLabel>
                  Phone
                </FieldLabel>

                <Input
                  placeholder="+256 700 000000"
                  {...form.register("phone")}
                />

                {form.formState.errors.phone && (
                  <FieldError>
                    {
                      form.formState
                        .errors
                        .phone
                        .message
                    }
                  </FieldError>
                )}

              </Field>

            </div>


            {/* Date of Birth + Gender */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Date of Birth */}

              <Field>

                <FieldLabel>
                  Date of Birth
                </FieldLabel>

                <Input
                  type="date"
                  {...form.register("dateOfBirth")}
                />

                {form.formState.errors.dateOfBirth && (
                  <FieldError>
                    {
                      form.formState
                        .errors
                        .dateOfBirth
                        .message
                    }
                  </FieldError>
                )}

              </Field>


              {/* Gender */}

              <Field>

                <FieldLabel>
                  Gender
                </FieldLabel>

                <Select
                  value={form.watch("gender")}
                  onValueChange={(value) =>
                    form.setValue(
                      "gender",
                      value,
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >

                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select gender"
                    />
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
                    {
                      form.formState
                        .errors
                        .gender
                        .message
                    }
                  </FieldError>
                )}

              </Field>

            </div>


            {/* ============================================================
                ACADEMIC INFORMATION
            ============================================================= */}

            <div className="pt-2">

              <h3 className="text-sm font-semibold">
                Academic Information
              </h3>

              <p className="text-sm text-muted-foreground">
                Select the student's academic
                program and enrollment details.
              </p>

            </div>


            {/* Program */}

            <Field>

              <FieldLabel>
                Program
              </FieldLabel>

              <Select
                value={form.watch("program")}
                onValueChange={(value) =>
                  form.setValue(
                    "program",
                    value,
                    {
                      shouldValidate: true,
                    }
                  )
                }
              >

                <SelectTrigger>
                  <SelectValue
                    placeholder="Select program"
                  />
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
                  {
                    form.formState
                      .errors
                      .program
                      .message
                  }
                </FieldError>
              )}

            </Field>


            {/* Department + Academic Year */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Department */}

              <Field>

                <FieldLabel>
                  Department
                </FieldLabel>

                <Select
                  value={form.watch("department")}
                  onValueChange={(value) =>
                    form.setValue(
                      "department",
                      value,
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >

                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select department"
                    />
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
                    {
                      form.formState
                        .errors
                        .department
                        .message
                    }
                  </FieldError>
                )}

              </Field>


              {/* Academic Year */}

              <Field>

                <FieldLabel>
                  Academic Year
                </FieldLabel>

                <Select
                  value={form.watch("academicYear")}
                  onValueChange={(value) =>
                    form.setValue(
                      "academicYear",
                      value,
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >

                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select academic year"
                    />
                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="2026/2027">
                      2026/2027
                    </SelectItem>

                    <SelectItem value="2025/2026">
                      2025/2026
                    </SelectItem>

                    <SelectItem value="2024/2025">
                      2024/2025
                    </SelectItem>

                  </SelectContent>

                </Select>

                {form.formState.errors.academicYear && (
                  <FieldError>
                    {
                      form.formState
                        .errors
                        .academicYear
                        .message
                    }
                  </FieldError>
                )}

              </Field>

            </div>


            {/* ============================================================
                ACTIONS
            ============================================================= */}

            <div
              className="
                flex
                justify-end
                gap-2
                border-t
                pt-4
              "
            >

              {/* Cancel */}

              <Button
                type="button"
                variant="outline"
                disabled={
                  form.formState.isSubmitting
                }
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Cancel
              </Button>


              {/* Submit */}

              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting
                }
              >

                {form.formState.isSubmitting
                  ? "Creating..."
                  : "Create Student"}

              </Button>

            </div>

          </FieldGroup>

        </form>

      </DialogContent>

    </Dialog>
  )
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.")
}
