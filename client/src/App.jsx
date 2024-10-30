import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./layouts/PublicLayout";
import ProtectedRoute from "./layouts/ProtectedLayout";
import MainManagerProtectedRoute from "./layouts/MainManagerProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import { MainManagerAuthProvider } from "./context/MainManagerAuthContext";

import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProductDetail from "./components/ProductDetail";
import SelectRoute from "./components/SelectRoute";
import UserProfile from "./pages/UserProfile";
import OrdersDetails from "./pages/Orders";
import ProductAdder from "./pages/ProductAdder";
import CategoryView from "./pages/CategoryView";

// Manager Imports
import ManagerDashBoard from "./Manager/pages/ManagerDashboard";
import ScheduleTrip from "./Manager/pages/ScheduleTrip";
import ActiveTrips from "./Manager/pages/ActiveTrips";
import FinishedTrips from "./Manager/pages/FinishedTrips";
import ViewOrders from "./Manager/pages/ViewOrders";
import ManagerReports from "./Manager/pages/ManagerReports";
import ManagerLogin from "./Manager/pages/ManagerLogin";

// Admin Imports
import AdminDashboard from "./components/Admin/pages/AdminDashboard";
import Driver from "./components/Admin/pages/Driver";
import Profile from "./components/Admin/pages/Profile";
import Customer from "./components/Admin/pages/Customer";
import AssistentDriver from "./components/Admin/pages/AssistentDriver";
import Manager from "./components/Admin/pages/Manager";
import Report from "./components/Admin/pages/Report";
import AdminLogin from "./components/Admin/pages/AdminLogin";

// Driver Imports

import DriverLogin from "./Driver/Driverlogin";

// Main Manager Imports
import MainHome from "./Main Manager/pages/Home";
import Store from "./Main Manager/pages/Store";
import TrainSchedule from "./Main Manager/pages/TrainSchedule";
import Orders from "./Main Manager/pages/Orders";
import Mainmanagerlogin from "./MainManager/Mainmanagerlogin";
import MainManagerDashboard from "./MainManager/MainManagerDashboard";
import MainmanagerCustomer from "./MainManager/MainmanagerCustomer";
import MainmanagerReport from "./MainManager/MainmanagerReport";
import MainmanagerTrainSchedule from "./MainManager/MainmanagerTrainSchedule";
import MainmanagerProfile from "./MainManager/MainmanagerProfile";
import Quarterly from "./MainManager/Quarterly"
import SalesbyCity from "./MainManager/SalesbyCity"
import MostOrdered from "./MainManager/MostOrdered"
import Store1 from './MainManager/Store/Store1'
import Store2 from './MainManager/Store/Store2'
import Store3 from './MainManager/Store/Store3'
import Store4 from './MainManager/Store/Store4'
import Store5 from './MainManager/Store/Store5'
import DriverDashboard from "./Driver/DriverDashboard";
import Driverlogin from "./Driver/Driverlogin";
import DriverProfile from "./Driver/DriverProfile";
import DriverReport from "./Driver/DriverReport";
import DriverTruckSchedule from "./Driver/DriverTruckSchedule";
import { ManagerAuthProvider } from "./context/ManagerAuthContext";
import ManagerProtectedRoute from "./layouts/ManagerProtectedLayout";
import { DriverAuthProvider } from "./context/DriverAuthContext";
import DriverProtectedRoute from "./layouts/DriverProtectedLayout";
import Store6 from "./MainManager/Store/Srore6";


function App() {
  return (
    <AuthProvider>
      <MainManagerAuthProvider>
        <ManagerAuthProvider>
          <DriverAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/shop" element={<PublicRoute><Shop /></PublicRoute>} />
            <Route path="/shop/:category" element={<PublicRoute><CategoryView /></PublicRoute>} />
            
            {/* Protected Routes */}
            <Route path="/product/:productId" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/placeorder" element={<ProtectedRoute><SelectRoute /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersDetails /></ProtectedRoute>} />
            <Route path="/imageupload" element={<ProtectedRoute><ProductAdder /></ProtectedRoute>} />

            {/* Main Manager Routes */}
            <Route path="/mainmanager-login" element={<Mainmanagerlogin />} />
            <Route path="/maindashboard" element={<MainManagerProtectedRoute><MainHome /></MainManagerProtectedRoute>} />
            <Route path="/store" element={<MainManagerProtectedRoute><Store /></MainManagerProtectedRoute>} />
            <Route path="/trainschedule" element={<MainManagerProtectedRoute><TrainSchedule /></MainManagerProtectedRoute>} />
            <Route path="/mainmanager-orders" element={<MainManagerProtectedRoute><Orders /></MainManagerProtectedRoute>} />
            <Route path="/mainmanager-dashboard" element={<MainManagerProtectedRoute><MainManagerDashboard /></MainManagerProtectedRoute>} />
            <Route path="/mainmanager-customers" element={<MainManagerProtectedRoute><MainmanagerCustomer /></MainManagerProtectedRoute>} />
            <Route path="/mainmanager-report" element={<MainManagerProtectedRoute><MainmanagerReport /></MainManagerProtectedRoute>} />
            <Route path="/mainmanager-trainschedule" element={<MainManagerProtectedRoute><MainmanagerTrainSchedule /></MainManagerProtectedRoute>} />
            <Route path="/mainmanager-profile" element={<MainManagerProtectedRoute><MainmanagerProfile /></MainManagerProtectedRoute>} />
            <Route path="/quarterly-sales" element={<MainManagerProtectedRoute><Quarterly /></MainManagerProtectedRoute>} />
            <Route path="/most-ordered-items" element={<MainManagerProtectedRoute><MostOrdered /></MainManagerProtectedRoute>} />
            <Route path="/sales-by-city-route" element={<MainManagerProtectedRoute><SalesbyCity /></MainManagerProtectedRoute>} />
            <Route path="/store1" element={<MainManagerProtectedRoute><Store1 /></MainManagerProtectedRoute>} />
            <Route path="/store2" element={<MainManagerProtectedRoute><Store2 /></MainManagerProtectedRoute>} />
            <Route path="/store3" element={<MainManagerProtectedRoute><Store3 /></MainManagerProtectedRoute>} />
            <Route path="/store4" element={<MainManagerProtectedRoute><Store4 /></MainManagerProtectedRoute>} />
            <Route path="/store5" element={<MainManagerProtectedRoute><Store5 /></MainManagerProtectedRoute>} />
            <Route path="/store6" element={<MainManagerProtectedRoute><Store6 /></MainManagerProtectedRoute>} />

            {/* Manager Routes */}
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/manager-dashboard" element={<ManagerProtectedRoute><ManagerDashBoard /></ManagerProtectedRoute>} />
            <Route path="/manager-view-orders" element={<ManagerProtectedRoute><ViewOrders /></ManagerProtectedRoute>} />
            <Route path="/manager-schedule-trip" element={<ManagerProtectedRoute><ScheduleTrip /></ManagerProtectedRoute>} />
            <Route path="/manager-active-trips" element={<ManagerProtectedRoute><ActiveTrips /></ManagerProtectedRoute>} />
            <Route path="/manager-finished-trips" element={<ManagerProtectedRoute><FinishedTrips /></ManagerProtectedRoute>} />
            <Route path="/manager-reports" element={<ManagerProtectedRoute><ManagerReports /></ManagerProtectedRoute>} />

            {/*Driver routes*/}
            <Route path="/driver-login" element={<Driverlogin/>} />
            <Route path="/driver-dashboard" element={<DriverProtectedRoute><DriverDashboard/></DriverProtectedRoute>} />
            <Route path="/driver-profile" element={<DriverProtectedRoute><DriverProfile/></DriverProtectedRoute>} />
            <Route path="/driver-report" element={<DriverProtectedRoute><DriverReport/></DriverProtectedRoute>} />
            <Route path="/driver-truckschedule" element={<DriverProtectedRoute><DriverTruckSchedule/></DriverProtectedRoute>} />


            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admindriver" element={<Driver />} />
            <Route path="/adminprofile" element={<Profile />} />
            <Route path="/admincustomer" element={<Customer />} />
            <Route path="/adminassistentdriver" element={<AssistentDriver />} />
            <Route path="/adminmanager" element={<Manager />} />
            <Route path="/adminreport" element={<Report />} />
            <Route path="/adminlogin" element={<AdminLogin />} />              
          </Routes>
        </Router>
        </DriverAuthProvider>
        </ManagerAuthProvider>
      </MainManagerAuthProvider>
    </AuthProvider>
  );
}

export default App;
