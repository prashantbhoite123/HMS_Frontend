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
import ScrollToTop from "./components/ScrollToTop"

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
        
      </Routes>
    </Router>
  )
}

export default AppRoutes
