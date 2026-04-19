// src/components/ComparePage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  Grid, 
  Paper,
  CircularProgress,
  Divider
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ComparePage = () => {
  const [coin1, setCoin1] = useState('');
  const [coin2, setCoin2] = useState('');
  const [coinsList, setCoinsList] = useState([]);
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7');

  useEffect(() => {
    const fetchCoinsList = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false
          }
        });
        setCoinsList(response.data);
      } catch (error) {
        console.error('Error fetching coins list:', error);
      }
    };

    fetchCoinsList();
  }, []);

  useEffect(() => {
    const fetchCoinData = async () => {
      if (!coin1 || !coin2) return;

      setLoading(true);
      try {
        const days = timeRange;
        const interval = days === '1' ? 'hourly' : 'daily';

        const [res1, res2] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${coin1}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days,
              interval
            }
          }),
          axios.get(`https://api.coingecko.com/api/v3/coins/${coin2}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days,
              interval
            }
          })
        ]);

        setCoin1Data(res1.data);
        setCoin2Data(res2.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coin1, coin2, timeRange]);

  const chartData = {
    labels: coin1Data?.prices.map((_, index) => {
      if (timeRange === '1') return `${index}h`;
      if (timeRange === '7') return `Day ${index + 1}`;
      if (timeRange === '30') return `Week ${Math.floor(index / 7) + 1}`;
      return `Month ${Math.floor(index / 30) + 1}`;
    }),
    datasets: [
      {
        label: coin1.toUpperCase(),
        data: coin1Data?.prices.map(price => price[1]),
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: coin2.toUpperCase(),
        data: coin2Data?.prices.map(price => price[1]),
        borderColor: '#f50057',
        backgroundColor: 'rgba(245, 0, 87, 0.1)',
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Compare Cryptocurrencies
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Select
              value={coin1}
              onChange={(e) => setCoin1(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>Select first coin</MenuItem>
              {coinsList.map((coin) => (
                <MenuItem key={coin.id} value={coin.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      style={{ width: 24, height: 24, marginRight: 8 }} 
                    />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Select
              value={coin2}
              onChange={(e) => setCoin2(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>Select second coin</MenuItem>
              {coinsList.map((coin) => (
                <MenuItem key={coin.id} value={coin.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      style={{ width: 24, height: 24, marginRight: 8 }} 
                    />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              fullWidth
            >
              <MenuItem value="1">24 Hours</MenuItem>
              <MenuItem value="7">7 Days</MenuItem>
              <MenuItem value="30">30 Days</MenuItem>
              <MenuItem value="90">3 Months</MenuItem>
              <MenuItem value="365">1 Year</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        coin1Data && coin2Data && (
          <>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Price Comparison Chart
              </Typography>
              <Box sx={{ height: '400px' }}>
                <Line data={chartData} options={options} />
              </Box>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {coin1.toUpperCase()} Stats
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography>
                      Current Price: ${coin1Data.prices[coin1Data.prices.length - 1][1].toLocaleString()}
                    </Typography>
                    <Typography>
                      24h Change: {(
                        ((coin1Data.prices[coin1Data.prices.length - 1][1] - coin1Data.prices[0][1]) / 
                        coin1Data.prices[0][1]) * 100
                      ).toFixed(2)}%
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {coin2.toUpperCase()} Stats
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography>
                      Current Price: ${coin2Data.prices[coin2Data.prices.length - 1][1].toLocaleString()}
                    </Typography>
                    <Typography>
                      24h Change: {(
                        ((coin2Data.prices[coin2Data.prices.length - 1][1] - coin2Data.prices[0][1]) / 
                        coin2Data.prices[0][1]) * 100
                      ).toFixed(2)}%
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )
      )}
    </Box>
  );
};

export default ComparePage;

 