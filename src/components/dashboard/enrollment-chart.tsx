"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", students: 180 },
  { month: "Feb", students: 220 },
  { month: "Mar", students: 195 },
  { month: "Apr", students: 260 },
  { month: "May", students: 310 },
  { month: "Jun", students: 280 },
]

const chartConfig = {
  students: {
    label: "Students",
  },
}

export function EnrollmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Enrollment</CardTitle>
        <CardDescription>
          Student enrollment over the last six months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="students"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}