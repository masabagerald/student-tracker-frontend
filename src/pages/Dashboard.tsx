import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {EnrollmentChart} from "@/components/dashboard/enrollment-chart"
import {RecentStudents} from "@/components/dashboard/recent-students"

const stats = [
  {
    title: "Total Students",
    value: "2,450",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Lecturers",
    value: "86",
    change: "+4.2%",
    icon: GraduationCap,
  },
  {
    title: "Courses",
    value: "124",
    change: "+8.1%",
    icon: BookOpen,
  },
  {
    title: "Programs",
    value: "18",
    change: "+2",
    icon: Building2,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Overview of your student management system.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>

                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                </div>

                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">

        <EnrollmentChart />
        <RecentStudents />
      </div>

    </div>
    
  )
}