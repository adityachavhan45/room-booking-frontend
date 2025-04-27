import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Components/Admin/ProtectedRoute';
import { motion, AnimatePresence } from 'framer-motion';
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
const UserProfile = lazy(() => import('./Components/User/UserProfile'));
const BookingProcess = lazy(() => import('./Components/Booking/BookingProcess'));

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

// Page transition options
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Loading component with animation
const LoadingFallback = () => (
  <motion.div 
    className="loading flex items-center justify-center h-screen w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="flex flex-col items-center">
      <div className="animate-pulse-soft mb-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-lg text-gray-700 animate-pulse">Loading...</p>
    </div>
  </motion.div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="app">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/admin/*"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="login" element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <AdminLogin />
                        </motion.div>
                      } />
                      <Route path="dashboard/*" element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                        </motion.div>
                      } />
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
                      <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                          <Route path="/" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <Home />
                            </motion.div>
                          } />
                          <Route path="/rooms" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <Rooms />
                            </motion.div>
                          } />
                         
                          <Route path="/contact" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <Contact />
                            </motion.div>
                          } />
                          <Route path="/about" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <About />
                            </motion.div>
                          } />
                          <Route path="/login" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <Login />
                            </motion.div>
                          } />
                          <Route path="/my-bookings" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <MyBookings />
                            </motion.div>
                          } />
                          <Route path="/profile" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <UserProfile />
                            </motion.div>
                          } />
                          <Route path="/booking-process" element={
                            <motion.div
                              initial="initial"
                              animate="in"
                              exit="out"
                              variants={pageVariants}
                              transition={pageTransition}
                              className="page-transition"
                            >
                              <BookingProcess />
                            </motion.div>
                          } />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
