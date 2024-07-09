import React, { useState } from 'react';
import CertificateAuthorityForm from './CertificateAuthorityForm';
import IssueCertificateForm from './IssueCertificateForm';

const CaSigning = () => {
    const [showCAForm, setShowCAForm] = useState(false);

    const toggleCAForm = () => {
        setShowCAForm(!showCAForm);
    };

    return (
        <div>
            <h2 onClick={toggleCAForm} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {showCAForm ? '▼ Cancel' : '▶ Create Certificate Authority'}
            </h2>
            {showCAForm && <CertificateAuthorityForm />}
            <h2>Issue User Certificate</h2>
            <IssueCertificateForm />
        </div>
    );
};

export default CaSigning;
