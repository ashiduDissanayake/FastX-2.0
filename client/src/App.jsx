import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
//import ProtectedRoute from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import MainHome from "./Main Manager/pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ManagerDashBoard from "./Manager/pages/ManagerDashboard";
import ScheduleTrip from "./Manager/pages/ScheduleTrip";
import Shop from "./pages/Shop";
import Store from "./Main Manager/pages/Store";
import TrainSchedule from "./Main Manager/pages/TrainSchedule";
import Orders from "./Main Manager/pages/Orders";
import ProtectedRoute from "./layouts/ProtectedLayout";
import AdminDashboard from "../src/components/Admin/pages/AdminDashboard";
import Driver from "../src/components/Admin/pages/Driver";
import Profile from "../src/components/Admin/pages/Profile";
import Customer from "../src/components/Admin/pages/Customer";
import AssistentDriver from "../src/components/Admin/pages/AssistentDriver";
import Manager from "../src/components/Admin/pages/Manager";
import Report from "../src/components/Admin/pages/Report";

import Cart from "./pages/Cart";
import ActiveTrips from "./Manager/pages/ActiveTrips";
import FinishedTrips from "./Manager/pages/FinishedTrips";
import ViewOrders from "./Manager/pages/ViewOrders";
import Login from "./Manager/pages/ManagerLogin";



import ProductDetail from "./components/ProductDetail";
import SelectRoute from "./components/SelectRoute";
import UserProfile from "./pages/UserProfile";
import OrdersDetails from "./pages/Orders";
import Mainmanagerlogin from "./MainManager/Mainmanagerlogin";
import MainManagerDashboard from "./MainManager/MainManagerDashboard";


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

            {/* Admin  Route*/}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admindriver" element={<Driver />} />
            <Route path="/adminprofile" element={<Profile />} />
            <Route path="/admincustomer" element={<Customer />} />
            <Route path="/adminassistentdriver" element={<AssistentDriver />} />
            <Route path="/adminmanager" element={<Manager />} />
            <Route path="/adminreport" element={<Report />} />

            

            {/* Main manager */}
            <Route path="/maindashboard" element={<MainHome/>} />
            <Route path="/store" element={<Store/>} />
            <Route path="/trainschedule" element={<TrainSchedule/>} />
            <Route path="/orders" element={<Orders/>} />
              
            {/* Manager Route */}
            <Route path="/manager-dashboard" element={<ManagerDashBoard />} />
            <Route path="/manager-view-orders" element={<ViewOrders />} />
            <Route path="/manager-schedule-trip" element={<ScheduleTrip />} />
            <Route path="/manager-active-trips" element={<ActiveTrips />} />
            <Route path="/manager-finished-trips" element={<FinishedTrips />} />
            <Route path="/manager-login" element={<Login/>}/>
            <Route path="/mainmanager-login" element={<Mainmanagerlogin />} />
            <Route path="/mainmanager-dashboard" element={<MainManagerDashboard />} />
            

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
                  <SelectRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
