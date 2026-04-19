 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from 'chart.js';
import { FaArrowUp, FaArrowDown, FaStar, FaSearch, FaCoins } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { RiExchangeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

function MarketPage() {
  const { mode } = useThemeContext();
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);

  const currencySymbols = {
    usd: '$',
    inr: '₹',
    eur: '€',
    gbp: '£',
    jpy: '¥',
  };

  // Theme-based colors
  const colors = {
    light: {
      background: '#ffffff',
      card: '#f9fafb',
      text: '#111827',
      secondaryText: '#6b7280',
      border: '#e5e7eb',
      accent: '#3b82f6',
      positive: '#10b981',
      negative: '#ef4444',
      headerBg: '#f3f4f6',
      searchBg: '#f3f4f6',
    },
    dark: {
      background: '#0f172a',
      card: '#1e293b',
      text: '#f8fafc',
      secondaryText: '#94a3b8',
      border: '#334155',
      accent: '#60a5fa',
      positive: '#34d399',
      negative: '#f87171',
      headerBg: '#1e293b',
      searchBg: '#1e293b',
    }
  };

  const currentColors = colors[mode === 'dark' ? 'dark' : 'light'];

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: 20,
          page: page,
          sparkline: true,
          price_change_percentage: '1h,24h,7d',
        }
      });
      setCoins(response.data);
      
      const trendingResponse = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      setTrendingCoins(trendingResponse.data.coins.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency, page]);

  const toggleWatchlist = (coinId) => {
    if (watchlist.includes(coinId)) {
      setWatchlist(watchlist.filter(id => id !== coinId));
    } else {
      setWatchlist([...watchlist, coinId]);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const formatNumber = (num) => {
    if (num >= 1e12) return `${currencySymbols[currency]}${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${currencySymbols[currency]}${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${currencySymbols[currency]}${(num / 1e6).toFixed(2)}M`;
    return `${currencySymbols[currency]}${num.toLocaleString()}`;
  };

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: currentColors.background,
      minHeight: '100vh',
      color: currentColors.text,
      fontFamily: "'Inter', sans-serif",
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: '700',
      margin: 0,
      background: mode === 'dark' 
        ? 'linear-gradient(90deg, #60a5fa, #a78bfa)' 
        : 'linear-gradient(90deg, #2563eb, #7c3aed)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    currencyInfo: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: currentColors.card,
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      color: currentColors.text,
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    statCard: {
      backgroundColor: currentColors.card,
      padding: '1.5rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      color: currentColors.text,
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: currentColors.text,
    },
    trendingContainer: {
      display: 'flex',
      gap: '1rem',
      overflowX: 'auto',
      paddingBottom: '0.5rem',
    },
    trendingCoin: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: currentColors.card,
      padding: '0.75rem 1.25rem',
      borderRadius: '50px',
      whiteSpace: 'nowrap',
      color: currentColors.text,
    },
    trendingImage: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    searchContainer: {
      position: 'relative',
      flex: 1,
      minWidth: '250px',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: currentColors.secondaryText,
    },
    searchInput: {
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      fontSize: '1rem',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: currentColors.searchBg,
      color: currentColors.text,
      width: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'background-color 0.3s ease',
    },
    dropdown: {
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: currentColors.card,
      color: currentColors.text,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: currentColors.secondaryText,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: currentColors.card,
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s, background-color 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    image: {
      width: '40px',
      height: '40px',
      marginRight: '1rem',
    },
    coinName: {
      flex: 1,
      textAlign: 'left',
    },
    watchlistButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      color: currentColors.text,
    },
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
    },
    price: {
      fontSize: '1.5rem',
      fontWeight: '700',
      margin: 0,
      color: currentColors.text,
    },
    priceChangeContainer: {
      display: 'flex',
      gap: '0.75rem',
    },
    metaData: {
      marginTop: 'auto',
    },
    metaItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '0.5rem',
      fontSize: '0.9rem',
      color: currentColors.secondaryText,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '2rem',
    },
    paginationButton: {
      padding: '0.5rem 1rem',
      backgroundColor: currentColors.card,
      color: currentColors.text,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    pageNumber: {
      padding: '0.5rem 1rem',
      color: currentColors.text,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <GiTwoCoins size={32} style={{ marginRight: '10px', color: currentColors.accent }} />
          <h1 style={styles.heading}>Crypto Market</h1>
        </div>
        <div style={styles.currencyInfo}>
          <RiExchangeFill size={20} style={{ marginRight: '5px', color: currentColors.accent }} />
          <span>1 USD = {(1/coins[0]?.current_price || 0).toFixed(8)} BTC</span>
        </div>
      </div>

      {/* Market Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <FaCoins size={24} color={currentColors.accent} />
          <h3>Total Market Cap</h3>
          <p>{formatNumber(coins.reduce((sum, coin) => sum + coin.market_cap, 0))}</p>
        </div>
        <div style={styles.statCard}>
          <FaCoins size={24} color={currentColors.accent} />
          <h3>24h Volume</h3>
          <p>{formatNumber(coins.reduce((sum, coin) => sum + coin.total_volume, 0))}</p>
        </div>
        <div style={styles.statCard}>
          <FaCoins size={24} color={currentColors.accent} />
          <h3>Active Cryptos</h3>
          <p>{coins.length}</p>
        </div>
      </div>

      {/* Trending Coins */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>🔥 Trending Today</h3>
        <div style={styles.trendingContainer}>
          {trendingCoins.map((coin) => (
            <div key={coin.item.id} style={styles.trendingCoin}>
              <img src={coin.item.large} alt={coin.item.name} style={styles.trendingImage} />
              <span>{coin.item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={styles.dropdown}
        >
          {Object.entries(currencySymbols).map(([key, symbol]) => (
            <option key={key} value={key}>{key.toUpperCase()} ({symbol})</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={styles.loading}>
          <div className="spinner"></div>
          <p>Loading market data...</p>
        </div>
      )}

      {/* Coin Grid */}
      <div style={styles.grid}>
        {filteredCoins.map((coin) => {
          const priceChange24h = coin.price_change_percentage_24h_in_currency;
          const priceChange7d = coin.price_change_percentage_7d_in_currency;
          const isPositive24h = priceChange24h >= 0;
          const isPositive7d = priceChange7d >= 0;
          const isWatchlisted = watchlist.includes(coin.id);

          return (
            <motion.div 
              key={coin.id} 
              style={styles.card}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div style={styles.cardHeader}>
                <img src={coin.image} alt={coin.name} style={styles.image} />
                <div style={styles.coinName}>
                  <h3 style={{ color: currentColors.text }}>{coin.name}</h3>
                  <span style={{ color: currentColors.secondaryText }}>{coin.symbol.toUpperCase()}</span>
                </div>
                <button 
                  onClick={() => toggleWatchlist(coin.id)}
                  style={styles.watchlistButton}
                >
                  <FaStar color={isWatchlisted ? "#FFD700" : currentColors.secondaryText} />
                </button>
              </div>

              <div style={styles.priceContainer}>
                <p style={styles.price}>{currencySymbols[currency]}{coin.current_price.toLocaleString()}</p>
                <div style={styles.priceChangeContainer}>
                  <span style={{ 
                    color: isPositive24h ? currentColors.positive : currentColors.negative,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {isPositive24h ? <FaArrowUp /> : <FaArrowDown />}
                    {Math.abs(priceChange24h).toFixed(2)}%
                  </span>
                  <span style={{ 
                    color: isPositive7d ? currentColors.positive : currentColors.negative,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {isPositive7d ? <FaArrowUp /> : <FaArrowDown />}
                    {Math.abs(priceChange7d).toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Sparkline Chart */}
              <div style={{ height: '80px', margin: '1rem 0' }}>
                <Line
                  data={{
                    labels: coin.sparkline_in_7d?.price?.map((_, i) => i),
                    datasets: [{
                      data: coin.sparkline_in_7d?.price,
                      borderColor: isPositive24h ? currentColors.positive : currentColors.negative,
                      borderWidth: 2,
                      pointRadius: 0,
                      fill: {
                        target: 'origin',
                        above: isPositive24h 
                          ? `${currentColors.positive}20` 
                          : `${currentColors.negative}20`,
                      },
                      tension: 0.4,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { 
                      x: { display: false, grid: { display: false } }, 
                      y: { display: false, grid: { display: false } } 
                    },
                    elements: {
                      line: {
                        borderWidth: 2
                      }
                    }
                  }}
                />
              </div>

              <div style={styles.metaData}>
                <div style={styles.metaItem}>
                  <span>Market Cap</span>
                  <span>{formatNumber(coin.market_cap)}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>Volume (24h)</span>
                  <span>{formatNumber(coin.total_volume)}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>Circulating Supply</span>
                  <span>{formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>
        <span style={styles.pageNumber}>Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MarketPage;