import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Components/Admin/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

// Lazy load components
const Home = lazy(() => import('./Components/Home/Home'));
const Rooms = lazy(() => import('./Components/Rooms/Rooms'));
const Contact = lazy(() => import('./Components/Contact/Contact'));
const About = lazy(() => import('./Components/About/About'));
const Facilities = lazy(() => import('./Components/Facilities/Facilities'));
const Offers = lazy(() => import('./Components/Offers/Offers'));
const Login = lazy(() => import('./Components/Login/Login'));
const AdminLogin = lazy(() => import('./Components/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./Components/Admin/AdminDashboard'));
const MyBookings = lazy(() => import('./Components/User/MyBookings'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="app">
          <Routes>
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<div className="loading">Loading...</div>}>
                  <Routes>
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="dashboard/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  </Routes>
                </Suspense>
              }
            />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <main className="main-content">
                    <Suspense fallback={<div className="loading">Loading...</div>}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rooms" element={<Rooms />} />
                        {/* <Route path="/facilities" element={<Facilities />} /> */}
                        {/* <Route path="/offers" element={<Offers />} /> */}
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
