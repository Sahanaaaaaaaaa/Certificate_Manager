/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Info.css';  // Import a CSS file for styling if needed

const Info = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        setCertificates(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Request made but server responded with status:', error.response.status);
        } else if (error.request) {
          console.error('Request made but no response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchCertificates();
  }, []);

  const calculateExpiryDate = (dateAuthorized, subscriptionDays) => {
    if (!dateAuthorized) {
      return 'Unknown';
    }

    const authDate = new Date(dateAuthorized);

    if (isNaN(authDate)) {
      return 'Invalid Date';
    }

    authDate.setDate(authDate.getDate() + subscriptionDays);
    return authDate.toLocaleDateString();
  };

  const formatDate = (date) => {
    if (!date) {
      return 'Unknown';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!date) {
      return 'Unknown';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleTimeString();
  };

  return (
    <div className="info-container">
      <h1>Certificates Information</h1>
      <table className="info-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Issued By</th>
            <th>Organization</th>
            <th>Country</th>
            <th>Subscription Days</th>
            <th>Date Authorized</th>
            <th>Time Authorized</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert.id}>
              <td>{cert.username}</td>
              <td>{cert.commonName}</td>
              <td>Cinezo</td>
              <td>{cert.country}</td>
              <td>{cert.subscriptionDays}</td>
              <td>{formatDate(cert.dateAuthorized)}</td>
              <td>{formatTime(cert.dateAuthorized)}</td>
              <td>{calculateExpiryDate(cert.dateAuthorized, cert.subscriptionDays)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
 */

/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Info.css';  // Import a CSS file for styling if needed

const Info = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    commonName: '',
    subscriptionDays: '',
    country: ''
  });

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        setCertificates(response.data);
        setFilteredCertificates(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Request made but server responded with status:', error.response.status);
        } else if (error.request) {
          console.error('Request made but no response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchCertificates();
  }, []);

  const handleSearch = () => {
    const filtered = certificates.filter(cert =>
      cert.username && cert.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };
  
  const handleFilter = () => {
    const filtered = certificates.filter(cert =>
      (filters.commonName ? cert.commonName.includes(filters.commonName) : true) &&
      (filters.subscriptionDays ? cert.subscriptionDays === parseInt(filters.subscriptionDays) : true) &&
      (filters.country ? cert.country.includes(filters.country) : true)
    );
    setFilteredCertificates(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ commonName: '', subscriptionDays: '', country: '' });
    setFilteredCertificates(certificates);
  };

  const calculateExpiryDate = (dateAuthorized, subscriptionDays) => {
    if (!dateAuthorized) {
      return 'Unknown';
    }

    const authDate = new Date(dateAuthorized);

    if (isNaN(authDate)) {
      return 'Invalid Date';
    }

    authDate.setDate(authDate.getDate() + subscriptionDays);
    return authDate.toLocaleDateString();
  };

  const formatDate = (date) => {
    if (!date) {
      return 'Unknown';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!date) {
      return 'Unknown';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleTimeString();
  };

  return (
    <div className="info-container">
      <h1>Certificates Information</h1>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <input
          type="text"
          placeholder="Filter by CA"
          value={filters.commonName}
          onChange={(e) => setFilters({ ...filters, commonName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Filter by Subscription Days"
          value={filters.subscriptionDays}
          onChange={(e) => setFilters({ ...filters, subscriptionDays: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Country"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
      <table className="info-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Issued By</th>
            <th>Organization</th>
            <th>Country</th>
            <th>Subscription Days</th>
            <th>Date Authorized</th>
            <th>Time Authorized</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCertificates.map((cert) => (
            <tr key={cert.id}>
              <td>{cert.username}</td>
              <td>{cert.commonName}</td>
              <td>Cinezo</td>
              <td>{cert.country}</td>
              <td>{cert.subscriptionDays}</td>
              <td>{formatDate(cert.dateAuthorized)}</td>
              <td>{formatTime(cert.dateAuthorized)}</td>
              <td>{calculateExpiryDate(cert.dateAuthorized, cert.subscriptionDays)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info; */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Info.css';  // Import a CSS file for styling if needed

const Info = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    commonName: '',
    subscriptionDays: '',
    country: ''
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        setCertificates(response.data);
        setFilteredCertificates(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Request made but server responded with status:', error.response.status);
        } else if (error.request) {
          console.error('Request made but no response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchCertificates();
  }, []);

  const handleSearch = () => {
    const filtered = certificates.filter(cert =>
      cert.username && cert.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

  const handleFilter = () => {
    const filtered = certificates.filter(cert =>
      (filters.commonName ? cert.commonName.includes(filters.commonName) : true) &&
      (filters.subscriptionDays ? cert.subscriptionDays === parseInt(filters.subscriptionDays) : true) &&
      (filters.country ? cert.country.includes(filters.country) : true)
    );
    setFilteredCertificates(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ commonName: '', subscriptionDays: '', country: '' });
    setFilteredCertificates(certificates);
  };

  const calculateExpiryDate = (dateAuthorized, subscriptionDays) => {
    if (!dateAuthorized) {
      return 'Unknown';
    }

    const authDate = new Date(dateAuthorized);

    if (isNaN(authDate)) {
      return 'Invalid Date';
    }

    authDate.setDate(authDate.getDate() + subscriptionDays);
    return authDate.toLocaleDateString();
  };

  const formatDate = (date) => {
    if (!date) {
      return 'Unknown';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!date) {
      return 'Unknown';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleTimeString();
  };

  return (
    <div className="info-container">
      <h1>Certificates Information</h1>
      <div className="icon-container">
        <i className="fas fa-search" onClick={() => setShowSearch(!showSearch)}></i>
        <i className="fas fa-filter" onClick={() => setShowFilters(!showFilters)}></i>  
      </div>
      {showSearch && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {showFilters && (
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by CA"
            value={filters.commonName}
            onChange={(e) => setFilters({ ...filters, commonName: e.target.value })}
          />
          <input
            type="number"
            placeholder="Filter by Subscription Days"
            value={filters.subscriptionDays}
            onChange={(e) => setFilters({ ...filters, subscriptionDays: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by Country"
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          />
          <button onClick={handleFilter}>Filter</button>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      )}
      <table className="info-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Issued By</th>
            <th>Organization</th>
            <th>Country</th>
            <th>Subscription Days</th>
            <th>Date Authorized</th>
            <th>Time Authorized</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCertificates.map((cert) => (
            <tr key={cert.id}>
              <td>{cert.username}</td>
              <td>{cert.commonName}</td>
              <td>Cinezo</td>
              <td>{cert.country}</td>
              <td>{cert.subscriptionDays}</td>
              <td>{formatDate(cert.dateAuthorized)}</td>
              <td>{formatTime(cert.dateAuthorized)}</td>
              <td>{calculateExpiryDate(cert.dateAuthorized, cert.subscriptionDays)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info;

