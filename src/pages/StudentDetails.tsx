import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  User,
} from "lucide-react"

import { studentService } from "@/services/studentService"
import type { Student } from "@/types/student"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { StudentEditDialog } from "@/components/students/StudentEditDialog"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

function formatDate(value: string) {
  if (!value) return "—"

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}

function getStatusVariant(status: Student["status"]) {
  switch (status) {
    case "Active":
      return "default"
    case "Inactive":
      return "secondary"
    case "Graduated":
      return "outline"
    case "Suspended":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function StudentDetails() {
  const { studentId } = useParams<{ studentId: string }>()
  const navigate = useNavigate()

  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    if (!studentId) {
      setError("Student ID was not provided.")
      setLoading(false)
      return
    }

    let cancelled = false

    async function loadStudent() {
      try {
        setLoading(true)
        setError(null)

        const data = await studentService.getStudent(studentId)

        if (!cancelled) {
          setStudent(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load student details.",
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStudent()

    return () => {
      cancelled = true
    }
  }, [studentId])

  if (loading) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => navigate("/students")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>

        <Card>
          <CardContent className="flex min-h-[320px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">
                Loading student details...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => navigate("/students")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>

        <Card>
          <CardContent className="flex min-h-[320px] items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <User className="h-6 w-6 text-destructive" />
              </div>

              <h2 className="text-lg font-semibold">
                Unable to load student
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">{error}</p>

              <Button
                className="mt-5"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => navigate("/students")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>

        <Card>
          <CardContent className="flex min-h-[320px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Student not found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The requested student could not be found.
              </p>

              <Button
                className="mt-5"
                onClick={() => navigate("/students")}
              >
                Return to Students
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page navigation */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-2"
        >
          <Link to="/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
      </div>

      {/* Student header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-xl font-semibold">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {student.name}
                  </h1>

                  <Badge variant={getStatusVariant(student.status)}>
                    {student.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Student ID: {student.id}
                </p>

                <p className="text-sm text-muted-foreground">
                  {student.program}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Student
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/students">Back to Students</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick contact information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Email</p>
              <a
                href={`mailto:${student.email}`}
                className="truncate text-sm font-medium hover:underline"
              >
                {student.email}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a
                href={`tel:${student.phone}`}
                className="text-sm font-medium hover:underline"
              >
                {student.phone}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Basic information about the student
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              <DetailRow
                label="Full Name"
                value={student.name}
              />

              <Separator />

              <DetailRow
                label="Date of Birth"
                value={formatDate(student.dateOfBirth)}
              />

              <Separator />

              <DetailRow
                label="Gender"
                value={student.gender}
              />

              <Separator />

              <DetailRow
                label="Email"
                value={student.email}
              />

              <Separator />

              <DetailRow
                label="Phone"
                value={student.phone}
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>
              Current academic information for the student
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              <DetailRow
                label="Program"
                value={student.program}
              />

              <Separator />

              <DetailRow
                label="Department"
                value={student.department}
              />

              <Separator />

              <DetailRow
                label="Academic Year"
                value={student.academicYear}
              />

              <Separator />

              <DetailRow
                label="Year of Study"
                value={student.yearOfStudy}
              />

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Status
                </span>

                <Badge variant={getStatusVariant(student.status)}>
                  {student.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student record summary */}
      <Card>
        <CardHeader>
          <CardTitle>Student Record</CardTitle>
          <CardDescription>
            Current student identification and academic placement
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryItem
              label="Student ID"
              value={student.id}
            />

            <SummaryItem
              label="Program"
              value={student.program}
            />

            <SummaryItem
              label="Academic Year"
              value={student.academicYear}
            />

            <SummaryItem
              label="Year of Study"
              value={student.yearOfStudy}
            />
          </div>
        </CardContent>
      </Card>

      <StudentEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        student={student}
        onSuccess={(updatedStudent) => {
          setStudent(updatedStudent)
        }}
      />
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <span className="shrink-0 text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-right text-sm font-medium">
        {value || "—"}
      </span>
    </div>
  )
}

interface SummaryItemProps {
  label: string
  value: string
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold">
        {value || "—"}
      </p>
    </div>
  )
}
