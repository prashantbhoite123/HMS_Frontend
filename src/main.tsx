import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import AppRoutes from "./AppRoutes.tsx"

import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "./components/ui/sonner.tsx"

export const BACKEND_API_URL = import.meta.env.VITE_API_BASE_URL as string
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster visibleToasts={1} position="top-right" richColors />
    </QueryClientProvider>
  </StrictMode>
)
