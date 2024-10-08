import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
import ProtectedRoute from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import DashBoard from "./Manager/pages/Dashboard";
import ScheduleTrip from "./Manager/pages/ScheduleTip";
import ProductDetail from "./components/ProductDetail";
import Shop from "./pages/Shop";

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
            <Route path="/product/:productId" element={<ProductDetail />} />

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
