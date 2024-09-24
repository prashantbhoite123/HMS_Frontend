import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Home from "./pages/Home"
import Layouts from "./Layouts/Layouts"
import About from "./pages/About"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layouts>
              <Home />
            </Layouts>
          }
        />

        <Route
          path="/about"
          element={
            <Layouts>
              <About />
            </Layouts>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
