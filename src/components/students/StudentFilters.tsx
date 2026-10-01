import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface StudentFilterValues {
  search: string
  status: string
  program: string
  academicYear: string
}

interface StudentFiltersProps {
  filters: StudentFilterValues
  onFiltersChange: (
    filters: StudentFilterValues
  ) => void
}

export function StudentFilters({
  filters,
  onFiltersChange,
}: StudentFiltersProps) {

  const updateFilter = (
    key: keyof StudentFilterValues,
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      program: "all",
      academicYear: "all",
    })
  }

  const hasFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.program !== "all" ||
    filters.academicYear !== "all"

  return (
    <div className="space-y-4">

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search by name, student number or email..."
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

        {/* Status */}
        <Select
          value={filters.status}
          onValueChange={(value) =>
            updateFilter("status", value)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Statuses
            </SelectItem>

            <SelectItem value="Active">
              Active
            </SelectItem>

            <SelectItem value="Inactive">
              Inactive
            </SelectItem>

            <SelectItem value="Graduated">
              Graduated
            </SelectItem>

            <SelectItem value="Suspended">
              Suspended
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Program */}
        <Select
          value={filters.program}
          onValueChange={(value) =>
            updateFilter("program", value)
          }
        >
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Program" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Programs
            </SelectItem>

            <SelectItem value="computer-science">
              Computer Science
            </SelectItem>

            <SelectItem value="information-technology">
              Information Technology
            </SelectItem>

            <SelectItem value="software-engineering">
              Software Engineering
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Academic Year */}
        <Select
          value={filters.academicYear}
          onValueChange={(value) =>
            updateFilter("academicYear", value)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Academic Year" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Academic Years
            </SelectItem>

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

        {/* Clear */}
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}