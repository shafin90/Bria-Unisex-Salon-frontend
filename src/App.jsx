import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Public Components
import PublicLayout from './components/Public/PublicLayout';
import Home from './pages/Public/Home';
import BookAppointment from './pages/Public/BookAppointment';
import SubmitReview from './pages/Public/SubmitReview';

// Admin Components
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Services from './pages/Services/Services';
import Bookings from './pages/Bookings/Bookings';
import Offers from './pages/Offers/Offers';
import Users from './pages/Users/Users';
import Reviews from './pages/Reviews/Reviews';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          } />
          <Route path="/book" element={
            <PublicLayout>
              <BookAppointment />
            </PublicLayout>
          } />
          <Route path="/review" element={
            <PublicLayout>
              <SubmitReview />
            </PublicLayout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          {isAuthenticated ? (
            <Route path="/admin/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </Layout>
            } />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
          )}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;