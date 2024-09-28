import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store, persistor } from "./App/Store.ts"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"
import AppRoutes from "./AppRoutes.tsx"
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "./components/ui/sonner.tsx"
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
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <Auth0ProviderWithNavigate>
            <AppRoutes />
            <Toaster visibleToasts={1} position="top-right" richColors />
          </Auth0ProviderWithNavigate>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  </StrictMode>
)
