import { Link } from "react-router-dom"
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Student } from "@/types/student"

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete?: (student: Student) => void
}



export function StudentTable({
  students,
  onEdit,
  onDelete,
}: StudentTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
             <TableHead>Student Email</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

      

        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center"
              >
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id}>

                {/* Student */}
                <TableCell>
                  {student.name}
                </TableCell>

                 <TableCell>
                  {student.email}
                </TableCell>


              
                {/* Program */}
                <TableCell>
                  {student.program}
                </TableCell>

                {/* Year */}
                <TableCell>
                  {student.yearOfStudy}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={
                      student.status === "Active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {student.status}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">
                          Open actions
                        </span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                      {/* View */}
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/students/${student.id}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Student
                        </Link>
                      </DropdownMenuItem>

                      {/* Edit */}
                      <DropdownMenuItem
                        onSelect={() => onEdit(student)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Student
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Delete */}
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => onDelete?.(student)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Student
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}