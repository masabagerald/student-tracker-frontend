import type { Student } from "@/types/student"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8083/api"

  

export interface CreateStudentRequest {
  
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  program: string
  department: string
  academicYear: string
}

export type UpdateStudentRequest = CreateStudentRequest

/**
 * Handle API responses consistently.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const error = await response.json()

      if (error?.message) {
        message = error.message
      }
    } catch {
      // Response did not contain JSON
    }

    throw new Error(message)
  }

  // No content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

/**
 * Student service
 *
 * All communication with the Student API
 * should go through this service.
 */
export const studentService = {

  /**
   * Get all students.
   */
  async getStudents(): Promise<Student[]> {
    const response = await fetch(
      `${API_BASE_URL}/students`
    )

    return handleResponse<Student[]>(response)
  },

  /**
   * Get a single student.
   */
  async getStudent(id: string): Promise<Student> {
    const response = await fetch(
      `${API_BASE_URL}/students/${id}`
    )

    return handleResponse<Student>(response)
  },

  /**
   * Create a new student.
   */
  async createStudent(
    data: CreateStudentRequest
  ): Promise<Student> {
    const response = await fetch(
      `${API_BASE_URL}/students/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    return handleResponse<Student>(response)
  },

  /**
   * Update an existing student.
   */
  async updateStudent(
    id: string,
    data: UpdateStudentRequest
  ): Promise<Student> {
    const response = await fetch(
      `${API_BASE_URL}/students/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    return handleResponse<Student>(response)
  },

  /**
   * Delete/deactivate a student.
   */
  async deleteStudent(id: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/students/${id}`,
      {
        method: "DELETE",
      }
    )

    return handleResponse<void>(response)
  },
}