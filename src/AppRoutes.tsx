import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom"

import Home from "./pages/Home"
import Layouts from "./Layouts/Layouts"
import About from "./pages/About"

import SignUpHos from "./pages/SignUpHos"

const AppRoutes = () => {
  return (
    <Router>
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
          path="/signuphospital"
          element={
            <Layouts showhero={false}>
              <SignUpHos />
            </Layouts>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  )
}

export default AppRoutes
