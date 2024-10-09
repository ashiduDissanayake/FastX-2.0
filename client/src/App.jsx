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
import Cart from "./pages/Cart";
// import ActiveTrips from "./Manager/components/";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public route - accessible only if not authenticated */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/product/:productId" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />

            {/* Protected route - accessible only if authenticated */}
            <Route path="/cart" element={<ProtectedRoute>
              <Cart />
            </ProtectedRoute>} />

            {/* Manager Route */}
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/schedule-trip" element={<ScheduleTrip/>} />
            {/* <Route path="/active-trips" element={<ActiveTrips/>} /> */}
              
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
