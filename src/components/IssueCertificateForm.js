import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './IssueCertificateForm.css'; // Import the CSS file

const IssueCertificateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [csr, setCsr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commonName, setCommonName] = useState('');
    const [cas, setCas] = useState([]);
    const [selectedCa, setSelectedCa] = useState('');
    const [issuedSuccessfully, setIssuedSuccessfully] = useState(false);

    useEffect(() => {
        const fetchCSR = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/csrs/${id}`);
                setCsr(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching CSR details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCSR();
    }, [id]);

    const fetchCas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ca/list');
            setCas(response.data);
        } catch (error) {
            console.error('Error fetching CAs', error);
        }
    };

    useEffect(() => {
        fetchCas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + csr.subscriptionDays);

            await axios.post(`http://localhost:5000/api/ca/issue`, {
                commonName,
                caId: selectedCa,
                username: csr.username,
                csrId: csr._id,
                country: csr.country,
                organization: csr.organization,
                subscriptionDays: csr.subscriptionDays,
                publicKey: csr.publicKey,
                expiryDate: expiryDate.toISOString()
            });
            alert('Certificate issued successfully');
            setIssuedSuccessfully(true);
            setCommonName('');
            setSelectedCa('');
            fetchCas();
        } catch (error) {
            console.error('Error issuing certificate', error);
            alert('Error issuing certificate');
        }
    };

    const handleCompleteAuthorization = async () => {
        try {
            await axios.post(`http://localhost:5000/authorize/${id}`);
            setCsr(prevCsr => ({ ...prevCsr, status: 'Authorized' }));
            navigate('/Pending Requests');
        } catch (error) {
            console.error('Error authorizing CSR:', error);
            setError('Failed to authorize CSR');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="issue-form">
                <input
                    type="text"
                    value={commonName}
                    onChange={(e) => setCommonName(e.target.value)}
                    placeholder="Common Name"
                    required
                    className="issue-input"
                />
                <select
                    value={selectedCa}
                    onChange={(e) => setSelectedCa(e.target.value)}
                    required
                    className="issue-select"
                >
                    <option value="" disabled>Select Certificate Authority</option>
                    {cas.length === 0 ? (
                        <option value="" disabled>No Certificate Authorities available</option>
                    ) : (
                        cas.map(ca => (
                            <option key={ca._id} value={ca._id}>{ca.commonName}</option>
                        ))
                    )}
                </select>
                <button type="submit" className="issue-button">Issue Certificate</button>
            </form>

            {issuedSuccessfully && (
                <button onClick={handleCompleteAuthorization} className="issue-button">Complete Authorization</button>
            )}
        </div>
    );
};

export default IssueCertificateForm;
