import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
import ProtectedRoute from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ManagerDashBoard from "./Manager/pages/ManagerDashBoard";
import ScheduleTrip from "./Manager/pages/ScheduleTrip";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
// import ActiveTrips from "./Manager/components/";
import ActiveTrips from "./Manager/pages/ActiveTrips";
import FinishedTrips from "./Manager/pages/FinishedTrips";
import ViewOrders from "./Manager/pages/ViewOrders";
import ProductDetail from "./components/ProductDetail";


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public route - accessible only if not authenticated */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />

            {/* Protected route - accessible only if authenticated */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
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
          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/placeorder"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />

          {/* Manager Route */}
          <Route path="/manager-dashboard" element={<ManagerDashBoard />} />
          <Route path="/manager-view-orders" element={<ViewOrders />} />
          <Route path="/manager-schedule-trip" element={<ScheduleTrip />} />
          <Route path="/manager-active-trips" element={<ActiveTrips />} />
          <Route path="/manager-finished-trips" element={<FinishedTrips />} />

          {/* Other routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
