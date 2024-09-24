import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import AppRoutes from "./AppRoutes.tsx"
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0ProviderWithNavigate>
      <AppRoutes />
    </Auth0ProviderWithNavigate>
  </StrictMode>
)
