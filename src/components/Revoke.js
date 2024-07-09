/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Revoke.css'; // Import a CSS file for styling if needed

const Revoke = () => {
  const [certificates, setCertificates] = useState([]);
  const [revokeKey, setRevokeKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  const handleRevokeClick = (cert) => {
    setSelectedCert(cert);
    setShowKeyInput(true);
  };

  const handleKeyChange = (e) => {
    setRevokeKey(e.target.value);
  };

  const handleKeySubmit = async () => {
    if (revokeKey === '1234') {
      try {
        await axios.post('http://localhost:5000/revoke', { id: selectedCert._id, key: revokeKey });
        setCertificates(certificates.filter((cert) => cert.username !== selectedCert.username));
        alert('Certificate revoked successfully!');
      } catch (error) {
        console.error('Error revoking certificate:', error);
        alert('Failed to revoke certificate. Please try again.');
      }
    } else {
      alert('Incorrect key. Please try again.');
    }
    setRevokeKey('');
    setShowKeyInput(false);
  };

  const calculateExpiryDate = (dateAuthorized, subscriptionDays) => {
    if (!dateAuthorized) {
      return 'Unknown';
    }

    const authDate = new Date(dateAuthorized);
    authDate.setDate(authDate.getDate() + subscriptionDays);
    return authDate.toLocaleDateString();
  };

  return (
    <div className="info-container">
      <h1>Certificate Revocation</h1>
      <div className="info-table">
        <div className="info-row header">
          <div className="info-cell">Username</div>
          <div className="info-cell">ID</div>
          <div className="info-cell">Common Name</div>
          <div className="info-cell">Issued By</div>
          <div className="info-cell">Country</div>
          <div className="info-cell">Expiry Date</div>
          <div className="info-cell">Actions</div>
        </div>

        {certificates.map((cert) => (
          <div key={cert.username} className="info-row">
            <div className="info-cell">{cert.username}</div>
            <div className="info-cell">{cert._id}</div>
            <div className="info-cell">{cert.commonName}</div>
            <div className="info-cell">Cinezo</div>
            <div className="info-cell">{cert.country}</div>
            <div className="info-cell">
              {calculateExpiryDate(cert.dateAuthorized, cert.subscriptionDays)}
            </div>
            <div className="info-cell">
              <button className="revoke-button" onClick={() => handleRevokeClick(cert)}>
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>

      {showKeyInput && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowKeyInput(false)}>
              &times;
            </span>
            <h2>Enter Revoke Key</h2>
            <input
              type="password"
              value={revokeKey}
              onChange={handleKeyChange}
              placeholder="Enter Revoke Key"
              className="key-input"
            />
            <button onClick={handleKeySubmit} className="key-submit">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revoke;
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Revoke.css'; // Import a CSS file for styling if needed

const Revoke = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [revokeKey, setRevokeKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    commonName: '',
    country: ''
  });

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        setCertificates(response.data);
        setFilteredCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  const handleRevokeClick = (cert) => {
    setSelectedCert(cert);
    setShowKeyInput(true);
  };

  const handleKeyChange = (e) => {
    setRevokeKey(e.target.value);
  };

  const handleKeySubmit = async () => {
    if (revokeKey === '1234') {
      try {
        await axios.post('http://localhost:5000/revoke', { id: selectedCert._id, key: revokeKey });
        setCertificates(certificates.filter((cert) => cert.username !== selectedCert.username));
        setFilteredCertificates(filteredCertificates.filter((cert) => cert.username !== selectedCert.username));
        alert('Certificate revoked successfully!');
      } catch (error) {
        console.error('Error revoking certificate:', error);
        alert('Failed to revoke certificate. Please try again.');
      }
    } else {
      alert('Incorrect key. Please try again.');
    }
    setRevokeKey('');
    setShowKeyInput(false);
  };

  const calculateExpiryDate = (dateAuthorized, subscriptionDays) => {
    if (!dateAuthorized) {
      return 'Unknown';
    }

    const authDate = new Date(dateAuthorized);
    authDate.setDate(authDate.getDate() + subscriptionDays);
    return authDate.toLocaleDateString();
  };

  const handleSearch = () => {
    const filtered = certificates.filter(cert =>
      cert.username && cert.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

  const handleFilter = () => {
    const filtered = certificates.filter(cert =>
      (filters.commonName ? cert.commonName.includes(filters.commonName) : true) &&
      (filters.country ? cert.country.includes(filters.country) : true)
    );
    setFilteredCertificates(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ commonName: '', country: '' });
    setFilteredCertificates(certificates);
  };

  return (
    <div className="info-container">
      <h1>Certificate Revocation</h1>
      <div className="icon-container">
        <i className="fas fa-search" onClick={handleSearch}></i>
        <i className="fas fa-filter" onClick={handleFilter}></i>  
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by CA"
          value={filters.commonName}
          onChange={(e) => setFilters({ ...filters, commonName: e.target.value })}
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
      <div className="info-table">
        <div className="info-row header">
          <div className="info-cell">Username</div>
          <div className="info-cell">ID</div>
          <div className="info-cell">Common Name</div>
          <div className="info-cell">Issued By</div>
          <div className="info-cell">Country</div>
          <div className="info-cell">Expiry Date</div>
          <div className="info-cell">Actions</div>
        </div>

        {filteredCertificates.map((cert) => (
          <div key={cert.username} className="info-row">
            <div className="info-cell">{cert.username}</div>
            <div className="info-cell">{cert._id}</div>
            <div className="info-cell">{cert.commonName}</div>
            <div className="info-cell">Cinezo</div>
            <div className="info-cell">{cert.country}</div>
            <div className="info-cell">
              {calculateExpiryDate(cert.dateAuthorized, cert.subscriptionDays)}
            </div>
            <div className="info-cell">
              <button className="revoke-button" onClick={() => handleRevokeClick(cert)}>
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>

      {showKeyInput && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowKeyInput(false)}>
              &times;
            </span>
            <h2>Enter Revoke Key</h2>
            <input
              type="password"
              value={revokeKey}
              onChange={handleKeyChange}
              placeholder="Enter Revoke Key"
              className="key-input"
            />
            <button onClick={handleKeySubmit} className="key-submit">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revoke;
