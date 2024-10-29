import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom"

import Home from "./pages/Common_Pages/Home"
import Layouts from "./Layouts/Layouts"
import About from "./pages/Common_Pages/About"

import SignUpHos from "./pages/SignUpHos"
import SignIn from "./pages/SignIn"
import ScrollToTop from "./auth/ScrollToTop"

import HospitalCreate from "./pages/Hospital_pages/HospitalCreate"
import ProtectRouter from "./auth/ProtectRouter"
import HospitalsPage from "./pages/Hospital_pages/HospitalsPage"
import DetailPage from "./pages/Hospital_pages/DetailPage"
import Dashboard from "./pages/Common_Pages/Dashboard"
import MyAppoinment from "./pages/Patient_pages/MyAppoinment"

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
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
        <Route
          path="/myaopoinment"
          element={
            <Layouts showhero={false}>
              <MyAppoinment />
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
              <Layouts showhero={false}>
                <Dashboard />
              </Layouts>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
