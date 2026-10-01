import { useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  StudentFilters,
  type StudentFilterValues,
} from "@/components/students/StudentFilters"

import { StudentTable } from "@/components/students/StudentTable"
import { StudentCreateDialog } from "@/components/students/StudentCreateDialog"
import { StudentEditDialog } from "@/components/students/StudentEditDialog"
import { StudentDeleteDialog } from "@/components/students/StudentDeleteDialog"

import { studentService } from "@/services/studentService"
import type { Student } from "@/types/student"

export default function Students() {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState<StudentFilterValues>({
    search: "",
    status: "all",
    program: "all",
    academicYear: "all",
  })

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null)

  // ---------------------------------------------------------------------------
  // Load Students
  // ---------------------------------------------------------------------------

  const loadStudents = async () => {
    try {
      setLoading(true)

      const data = await studentService.getStudents()

      setStudents(data)
    } catch (error) {
      console.error("Failed to load students:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  // ---------------------------------------------------------------------------
  // Refresh Students
  // ---------------------------------------------------------------------------

  const refreshStudents = async () => {
    await loadStudents()
  }

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  const filteredStudents = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesSearch =
        search === "" ||
        student.name.toLowerCase().includes(search) ||    
        student.email.toLowerCase().includes(search)

      const matchesStatus =
        filters.status === "all" ||
        student.status === filters.status

      const matchesProgram =
        filters.program === "all" ||
        student.program === filters.program

      const matchesAcademicYear =
        filters.academicYear === "all" ||
        student.academicYear === filters.academicYear

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProgram &&
        matchesAcademicYear
      )
    })
  }, [students, filters])

  // ---------------------------------------------------------------------------
  // Create Student
  // ---------------------------------------------------------------------------

  const handleStudentCreated = async () => {
    await refreshStudents()
  }

  // ---------------------------------------------------------------------------
  // Edit Student
  // ---------------------------------------------------------------------------

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student)
    setEditDialogOpen(true)
  }

  const handleStudentUpdated = async () => {
    await refreshStudents()
  }

  // ---------------------------------------------------------------------------
  // Delete Student
  // ---------------------------------------------------------------------------

  const handleDeleteStudent = (student: Student) => {
    setSelectedStudent(student)
    setDeleteDialogOpen(true)
  }

  const handleStudentDeleted = async () => {
    await refreshStudents()
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Students
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage students, enrollment and academic information.
          </p>
        </div>

        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Filters */}

      <Card>
        <CardContent className="pt-6">
          <StudentFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
        </CardContent>
      </Card>

      {/* Results Summary */}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredStudents.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {students.length}
          </span>{" "}
          students
        </div>
      </div>

      {/* Student Table */}

      {loading ? (
        <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
          Loading students...
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      )}

      {/* Create Student */}

      <StudentCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleStudentCreated}
      />

      {/* Edit Student */}

      <StudentEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        student={selectedStudent}
        onSuccess={handleStudentUpdated}
      />

      {/* Delete Student */}

      <StudentDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        student={selectedStudent}
        onSuccess={handleStudentDeleted}
      />
    </div>
  )
}