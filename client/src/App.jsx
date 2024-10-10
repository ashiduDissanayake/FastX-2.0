import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
import ProtectedRoute from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import DashBoard from "./Manager/pages/Dashboard";
import ScheduleTrip from "./Manager/pages/ScheduleTip";
import Shop from "./pages/Shop";
import AdminDashboard from "../src/components/Admin/pages/AdminDashboard";
import Driver from "../src/components/Admin/pages/Driver";
import Profile from "../src/components/Admin/pages/Profile";
import Customer from "../src/components/Admin/pages/Customer";
import AssistentDriver from "../src/components/Admin/pages/AssistentDriver";
import Manager from "../src/components/Admin/pages/Manager";
import Report from "../src/components/Admin/pages/Report";

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

            {/* Admin  Route*/}
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admindriver" element={<Driver/>} />
            <Route path="/adminprofile" element={<Profile/>} />
            <Route path="/admincustomer" element={<Customer/>} />
            <Route path="/adminassistentdriver" element={<AssistentDriver/>} />
            <Route path="/adminmanager" element={<Manager/>} />
            <Route path="/adminreport" element={<Report/>} />
            
              
            {/* Other routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />

            <Route
              path="/shop"
              element={
                <PublicRoute>
                  <Shop />
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
