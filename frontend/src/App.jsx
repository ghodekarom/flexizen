import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageClasses from './pages/admin/ManageClasses';
import Profile from './pages/admin/Profile';
import ManageBookings from './pages/admin/ManageBookings';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import SearchBooking from './pages/admin/SearchBooking';
import Home from './pages/Home';
import Classes from './pages/Classes';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<BookingForm />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes" element={
            <ProtectedRoute>
              <ManageClasses />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute>
              <ManageBookings />
            </ProtectedRoute>
          } />
          <Route path="/admin/enquiries" element={
            <ProtectedRoute>
              <ManageEnquiries />
            </ProtectedRoute>
          } />
          <Route path="/admin/search" element={
            <ProtectedRoute>
              <SearchBooking />
            </ProtectedRoute>
          } />
          <Route path="/admin/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
