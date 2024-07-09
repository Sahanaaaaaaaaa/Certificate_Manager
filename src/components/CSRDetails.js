import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import CaSigning from './CaSigning';

const CSRDetails = () => {
  const { id } = useParams();
  const [csr, setCsr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificate, setCertificate] = useState({
    username: '',
    csrId: '',
  });  

  useEffect(() => {
    const fetchCSR = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/csrs/${id}`);
        setCsr(response.data);
        setCertificate({
          email: response.data.username || '', // Assuming CSR has an 'email' field
          csrId: response.data._id || '',   // Assuming CSR has an '_id' field for csrId
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CSR details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCSR();
  }, [id]);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">CSR Details</Typography>
      <Typography variant="h6">Username: {csr?.username}</Typography>
      {csr?.organization && (
        <Typography variant="body2">Organization: {csr.organization}</Typography>
      )}
      {csr?.country && (
        <Typography variant="body2">Country: {csr.country}</Typography>
      )}
      {csr?.subscriptionDays && (
        <Typography variant="body2">Subscription Days: {csr.subscriptionDays}</Typography>
      )}
      
      <Typography variant="body2">Status: {csr.status}</Typography>
      <Box sx={{ mt: 3 }}>
        <CaSigning />
      </Box>
    </Box>
  );
};

export default CSRDetails;
