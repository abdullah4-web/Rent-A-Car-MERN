import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Vehicles from './Pages/Vehicles';
import Client from './Pages/Client';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Contact from './Pages/Contact';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './Pages/AdminDashboard';
import AddCar from './Pages/AddCar';
import ShowCars from './Pages/ShowCars';
import Booking from './Pages/Booking';
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./Pages/Error";
import UserBookedCars from './Pages/UserBookedCars';
import AllBookings from './Pages/AllBookings';
import ProfileScreen from './Pages/ProfileScreen';
import UserListScreen from './Pages/UserListScreen';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/client" element={<Client />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />

        <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              >
        </Route>
        <Route
                path="/userlist"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              >
        </Route>
      
        

        <Route
                path="/addcar"
                element={
                  <AdminRoute>
                    <AddCar />
                  </AdminRoute>
                }
              >
        </Route>
      
        <Route
                path="/showcars"
                element={
                  <AdminRoute>
                    <ShowCars />
                  </AdminRoute>
                }
              >
        </Route>


        <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              ></Route>


<Route
                path="/userprofile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              ></Route>


<Route
                path="/userbookedcars"
                element={
                  <AdminRoute>
                    <UserBookedCars/>
                  </AdminRoute>
                }
              ></Route>

<Route
                path="/allbookings"
                element={
                  <ProtectedRoute>
                    <AllBookings/>
                  </ProtectedRoute>
                }
              ></Route>
              
        

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
