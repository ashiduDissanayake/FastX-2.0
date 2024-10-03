import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
import ProtectedRoute from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import Carousel from "./components/Carousel/Carousel";
import DashBoard from "./Manager/pages/Dashboard";
import ScheduleTrip from "./Manager/pages/ScheduleTip";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public route - accessible only if not authenticated */}
            <Route path="/login" element={<LoginForm />} />
            {/* Protected route - accessible only if authenticated */}
            <Route path="/signup" element={<SignUpForm />} />

            {/* Manager Route */}
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/schedule-trip" element={<ScheduleTrip/>} />

            {/* Other routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
