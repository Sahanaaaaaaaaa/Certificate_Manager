import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Certificates from './components/Certificates';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Home from './components/Home';
import CSRList from './components/CSRList';
import Info from './components/Info';
import CertificateAuthorityForm from './components/CertificateAuthorityForm';
import CSRDetails from './components/CSRDetails';
import Revoke from './components/Revoke';
import axios from 'axios';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data);
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false'); // Set loggedIn to false in localStorage
    setLoggedIn(false); // Update state to reflect logout
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Render Navbar and Sidebar only when logged in */}
        {loggedIn && <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} />}
        {loggedIn && <Sidebar open={sidebarOpen} />}

        <div style={{ display: 'flex', flexGrow: 1, marginTop: loggedIn ? '60px' : 0 }}>
          <div style={{ flexGrow: 1, padding: '20px', overflow: 'auto' }}>
            <Routes>
              {/* Homepage route renders initially */}
              <Route path="/" element={<Homepage />} />

              {/* Routes accessible after login/register */}
              {loggedIn && (
                <>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/A/1" element={<Certificates />} />
                  <Route path="/Stats" element={<Dashboard />} />
                  <Route path="/Pending Requests" element={<CSRList />} />
                  <Route path="/csr-details/:id" element={<CSRDetails />} />
                  <Route path="/Info" element={<Info />} />
                  <Route path="/Info/CAs" element={<CertificateAuthorityForm />} />
                  <Route path="/revoke" element={<Revoke />} />
                </>
              )}

              {/* Login and Register routes */}
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/register" element={<Register handleRegister={handleRegister} />} />

              {/* Redirect to Homepage if not logged in */}
              {!loggedIn && <Route path="*" element={<Homepage />} />}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
