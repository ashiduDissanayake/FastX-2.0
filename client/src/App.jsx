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
import ManagerReports from "./Manager/pages/ManagerReports";

import ProductDetail from "./components/ProductDetail";
import SelectRoute from "./components/SelectRoute";
import UserProfile from "./pages/UserProfile";
import OrdersDetails from "./pages/Orders";
import Mainmanagerlogin from "./MainManager/Mainmanagerlogin";
import MainManagerSidepanel from "./MainManager/MainManagerSidepanel";
import ProductAdder from "./pages/ProductAdder";
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
import CategoryView from "./pages/CategoryView";
import AdminLogin from "./components/Admin/pages/AdminLogin";


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
            <Route path="/adminlogin" element={<AdminLogin/>} />

            

            {/* Main manager */}
            <Route path="/maindashboard" element={<MainHome/>} />
            <Route path="/store" element={<Store/>} />
            <Route path="/trainschedule" element={<TrainSchedule/>} />
            <Route path="/mainmanager-orders" element={<Orders/>} />
              
            {/* Manager Route */}
            <Route path="/manager-dashboard" element={<ManagerDashBoard />} />
            <Route path="/manager-view-orders" element={<ViewOrders />} />
            <Route path="/manager-schedule-trip" element={<ScheduleTrip />} />
            <Route path="/manager-active-trips" element={<ActiveTrips />} />
            <Route path="/manager-finished-trips" element={<FinishedTrips />} />
            <Route path="/manager-login" element={<Login/>}/>
            <Route path="/manager-reports" element={<ManagerReports />} />
           
            <Route path="/mainmanager-login" element={<Mainmanagerlogin />} />
            <Route path="/mainmanager-dashboard" element={<MainManagerDashboard />} />
            <Route path="/mainmanager-customers" element={<MainmanagerCustomer />} />
            <Route path="/mainmanager-report" element={<MainmanagerReport />} />
            <Route path="/mainmanager-trainschedule" element={<MainmanagerTrainSchedule />} />
            <Route path="/mainmanager-profile" element={<MainmanagerProfile />} />
            <Route path="/quarterly-sales" element={<Quarterly />} />
            <Route path="/most-ordered-items" element={<MostOrdered />} />
            <Route path="/sales-by-city-route" element={<SalesbyCity />} />
            <Route path="/store1" element={<Store1/>} />
            <Route path="/store2" element={<Store2/>} />
            <Route path="/store3" element={<Store3/>} />
            <Route path="/store4" element={<Store4/>} />
            <Route path="/store5" element={<Store5/>} />

            
            

            {/* Other routes */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/shop" element={<PublicRoute><Shop /></PublicRoute>} />
            <Route path="/shop/:category" element={<PublicRoute><CategoryView /></PublicRoute>} />
            <Route path="/product/:productId" element={<PublicRoute><ProductDetail /></PublicRoute>} />
            <Route path="/placeorder" element={<PublicRoute><SelectRoute /></PublicRoute>} />
            <Route path="/profile" element={<PublicRoute><UserProfile /></PublicRoute>} />
            <Route path="/orders" element={<PublicRoute><OrdersDetails /></PublicRoute>} />
            <Route path="/imageupload" element={<PublicRoute><ProductAdder /></PublicRoute>} />

          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
