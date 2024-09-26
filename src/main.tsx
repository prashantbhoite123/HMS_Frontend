import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import AppRoutes from "./AppRoutes.tsx"
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
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
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </StrictMode>
)
