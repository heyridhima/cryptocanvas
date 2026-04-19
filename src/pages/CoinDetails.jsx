import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress, Box } from '@mui/material';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`
        );
        setCoin(data);
      } catch (error) {
        console.error('Error fetching coin:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  if (!coin) return <Typography variant="h6" color="error">Coin not found</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{coin.name} ({coin.symbol.toUpperCase()})</Typography>
      <img src={coin.image.large} alt={coin.name} width={100} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Rank:</strong> {coin.market_cap_rank}
      </Typography>
      <Typography variant="body1">
        <strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}
      </Typography>
      <Typography variant="body1">
        <strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {coin.description.en?.split('. ')[0]}.
      </Typography>
    </Box>
  );
};

export default CoinDetails;