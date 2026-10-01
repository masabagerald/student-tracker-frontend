import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Welcome to the Student Management System.
          </p>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default App