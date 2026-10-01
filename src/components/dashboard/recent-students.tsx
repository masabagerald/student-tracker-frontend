import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

const students = [
  {
    name: "John Doe",
    program: "Computer Science",
    year: "Year 2",
    status: "Active",
  },
  {
    name: "Jane Doe",
    program: "Information Systems",
    year: "Year 1",
    status: "Active",
  },
  {
    name: "Robert Smith",
    program: "Software Engineering",
    year: "Year 3",
    status: "Inactive",
  },
]

export function RecentStudents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Students</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student.name}>
                <TableCell className="font-medium">
                  {student.name}
                </TableCell>

                <TableCell>
                  {student.program}
                </TableCell>

                <TableCell>
                  {student.year}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {student.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}