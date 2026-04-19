// src/services/cryptoService.js
import axios from 'axios';

export const getTopCryptos = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching top cryptocurrencies:', error);
    return [];
  }
};

// ✅ NEW: getMarketStats function
export const getMarketStats = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/global');
    const data = response.data.data;

    return {
      marketCap: `$${Number(data.total_market_cap.usd).toLocaleString()}`,
      volume24h: `$${Number(data.total_volume.usd).toLocaleString()}`,
      btcDominance: `${data.market_cap_percentage.btc.toFixed(1)}%`,
    };
  } catch (error) {
    console.error('❌ Error fetching market stats:', error);
    return {
      marketCap: '$0',
      volume24h: '$0',
      btcDominance: '0%',
    };
  }
};
