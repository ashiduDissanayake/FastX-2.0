import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
//import ProtectedRoute from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import MainHome from "./Main Manager/pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import DashBoard from "./Manager/pages/Dashboard";
import ScheduleTrip from "./Manager/pages/ScheduleTip";
import Shop from "./pages/Shop";
import Store from "./Main Manager/pages/Store";
import TrainSchedule from "./Main Manager/pages/TrainSchedule";
import Orders from "./Main Manager/pages/Orders";

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

            {/* Main manager */}
            <Route path="/maindashboard" element={<MainHome/>} />
            <Route path="/store" element={<Store/>} />
            <Route path="/trainschedule" element={<TrainSchedule/>} />
            <Route path="/orders" element={<Orders/>} />
              
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
