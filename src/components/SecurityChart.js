import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const SecurityChart = () => {
  const [data, setData] = useState([]);
  const [revokedCount, setRevokedCount] = useState(0);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        const certificates = response.data;

        // Process data to count occurrences of each CA based on commonName
        const caCounts = {};
        certificates.forEach(cert => {
          const caName = cert.commonName;
          if (caCounts[caName]) {
            caCounts[caName]++;
          } else {
            caCounts[caName] = 1;
          }
        });

        // Convert counts to array of objects for pie chart data
        const pieChartData = Object.keys(caCounts).map(caName => ({
          name: caName,
          value: caCounts[caName],
        }));

        setData(pieChartData);
      } catch (error) {
        console.error('Error fetching certificates data:', error);
      }
    };

    const fetchRevokedCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/revoked/count');
        setRevokedCount(response.data.count);
      } catch (error) {
        console.error('Error fetching revoked certificates count:', error);
      }
    };

    fetchCertificates();
    fetchRevokedCount();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Define colors for pie slices

  return (
    <div>
      <PieChart width={600} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Revoked Certificates
          </Typography>
          <Typography variant="body2">
            Number of revoked certificates: {revokedCount}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityChart;
