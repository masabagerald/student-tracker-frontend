import { createBrowserRouter } from "react-router-dom"
import Students from "./pages/Student"
import DashboardLayout from "./layouts/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import StudentDetails from "./pages/StudentDetails"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,

    children: [

    {
        index: true,
        element: <Dashboard />,
    },
    {
        path: "students",
        element: <Students />,
    },

     {
      path: "students/:studentId",
      element: <StudentDetails />,
    },
    ],
  },

 
])