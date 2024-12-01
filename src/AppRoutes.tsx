import { Suspense, lazy } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom"
import ScrollToTop from "./auth/ScrollToTop"
import Layouts from "./Layouts/Layouts"
import DashLayout from "./Layouts/DashLayout"
import ProtectRouter from "./auth/ProtectRouter"
import AdminProtect from "./auth/AdminProtect"
import PatientDetailPage from "./pages/Common_Pages/PatientDetailPage"

const Home = lazy(() => import("./pages/Common_Pages/Home"))
const About = lazy(() => import("./pages/Common_Pages/About"))
const SignUpHos = lazy(() => import("./pages/Common_Pages/SignUpHos"))
const SignIn = lazy(() => import("./pages/Common_Pages/SignIn"))
const HospitalCreate = lazy(
  () => import("./pages/Hospital_pages/HospitalCreate")
)
const HospitalsPage = lazy(() => import("./pages/Hospital_pages/HospitalsPage"))
const DetailPage = lazy(() => import("./pages/Hospital_pages/DetailPage"))
const MyAppoinment = lazy(() => import("./pages/Patient_pages/MyAppoinment"))
const HosDashboard = lazy(() => import("./pages/Hospital_pages/HosDashboard"))
const AdminSignin = lazy(() => import("./pages/Common_Pages/AdminSignin"))
const AdminOtp = lazy(() => import("./pages/Common_Pages/AdminOtp"))
const AdminRequestHosPage = lazy(
  () => import("./pages/Admin/AdminRequestHosPage")
)
const PatientProfile = lazy(
  () => import("./pages/Patient_pages/PatientProfile")
)

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Layouts showhero>
                <Home />
              </Layouts>
            }
          />
          <Route
            path="/about"
            element={
              <Layouts showhero={false}>
                <About />
              </Layouts>
            }
          />
          <Route element={<ProtectRouter />}>
            <Route
              path="/createhospital"
              element={
                <Layouts showhero={false}>
                  <HospitalCreate />
                </Layouts>
              }
            />
            <Route
              path="/myappoinment"
              element={
                <Layouts showhero={false}>
                  <MyAppoinment />
                </Layouts>
              }
            />
            <Route
              path="/hospitals"
              element={
                <Layouts showhero={false}>
                  <HospitalsPage />
                </Layouts>
              }
            />
            <Route
              path="/detail/:hospitalId"
              element={
                <Layouts showhero={false}>
                  <DetailPage />
                </Layouts>
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashLayout>
                  <HosDashboard />
                </DashLayout>
              }
            />
            <Route
              path="/requestedhos/:hospitalId"
              element={
                <Layouts showhero={false}>
                  <AdminRequestHosPage />
                </Layouts>
              }
            />
            <Route
              path="/patientprofile"
              element={
                <Layouts showhero={false}>
                  <PatientProfile />
                </Layouts>
              }
            />

            <Route
              path="/profile/:patientId"
              element={
                <Layouts showhero={false}>
                  <PatientDetailPage />
                </Layouts>
              }
            />
          </Route>
          <Route element={<AdminProtect />}>
            <Route
              path="/admin-sign"
              element={
                <Layouts showhero={false}>
                  <AdminSignin />
                </Layouts>
              }
            />
            <Route
              path="/otppage"
              element={
                <Layouts showhero={false}>
                  <AdminOtp />
                </Layouts>
              }
            />
            <Route
              path="/signuphospital"
              element={
                <Layouts showhero={false}>
                  <SignUpHos />
                </Layouts>
              }
            />
            <Route
              path="/signin"
              element={
                <Layouts showhero={false}>
                  <SignIn />
                </Layouts>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRoutes
