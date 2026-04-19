 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Badge,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  TrendingUp as TrendingUpIcon,
  ShowChart as ShowChartIcon,
  AttachMoney as AttachMoneyIcon,
  VerifiedUser as VerifiedUserIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  History as HistoryIcon,
  BarChart as BarChartIcon,
  AccountBalanceWallet as WalletIcon,
  Notifications as NotificationsIcon,
  SwapHoriz as SwapIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  EmojiEvents as TopIcon,
  Whatshot as HotIcon,
  LocalFireDepartment as FireIcon,
  MonetizationOn as MoneyIcon
} from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Extended mock data for cryptocurrencies
const cryptoData = Array.from({ length: 12 }, (_, i) => {
  const baseData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 50234.56,
      change24h: 2.34,
      marketCap: 950000000000,
      volume: 28000000000,
      image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      sparkline: [48000, 48500, 49000, 49500, 50000, 50234]
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2856.78,
      change24h: -1.23,
      marketCap: 340000000000,
      volume: 15000000000,
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      sparkline: [2700, 2750, 2800, 2820, 2840, 2856]
    },
    // Additional crypto data...
  ];
  return baseData[i % baseData.length];
});

const trendingCoins = [
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 102.45, change24h: 5.67, image: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: 3.21, image: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 6.78, change24h: -0.89, image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
  { id: 'ripple', name: 'Ripple', symbol: 'XRP', price: 0.52, change24h: 1.45, image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: 8.90, image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 35.67, change24h: 4.56, image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', price: 0.89, change24h: 2.34, image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
  { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', price: 9.45, change24h: -1.23, image: 'https://cryptologos.cc/logos/cosmos-atom-logo.png' }
];

const newsItems = [
  {
    title: 'Bitcoin Reaches New All-Time High',
    summary: 'Bitcoin surpasses $50,000 mark as institutional adoption grows',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
    date: 'May 15, 2023'
  },
  {
    title: 'Ethereum 2.0 Upgrade Complete',
    summary: 'Successful transition to proof-of-stake consensus mechanism',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
    date: 'May 10, 2023'
  },
  {
    title: 'Regulatory Changes Coming',
    summary: 'Governments worldwide preparing new crypto regulations',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
    date: 'May 5, 2023'
  },
  {
    title: 'DeFi Summer 2.0 Begins',
    summary: 'Decentralized finance protocols see record TVL growth',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
    date: 'April 28, 2023'
  },
  {
    title: 'NFT Market Rebounds',
    summary: 'Blue-chip NFT collections see 30% price increase',
    image: 'https://images.unsplash.com/photo-1642784353725-5bf7f6d212e7',
    date: 'April 22, 2023'
  },
  {
    title: 'Crypto Exchanges Expand Services',
    summary: 'Major platforms adding staking and lending products',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
    date: 'April 18, 2023'
  }
];

const faqs = [
  {
    question: 'What is cryptocurrency?',
    answer: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on decentralized networks based on blockchain technology.'
  },
  {
    question: 'How do I buy cryptocurrency?',
    answer: 'You can buy cryptocurrency through exchanges, peer-to-peer platforms, or ATMs. Our platform provides direct access to major exchanges.'
  },
  {
    question: 'Is cryptocurrency safe?',
    answer: 'While cryptocurrency technology is secure, users must practice good security habits like using strong passwords and enabling two-factor authentication.'
  },
  {
    question: 'What is blockchain?',
    answer: 'Blockchain is a distributed ledger technology that records transactions across many computers in a way that prevents retroactive alteration.'
  },
  {
    question: 'Can I track multiple portfolios?',
    answer: 'Yes, our platform allows you to create and track multiple portfolios with different asset allocations.'
  }
];

const features = [
  {
    icon: <TrendingUpIcon fontSize="large" />,
    title: 'Real-time Data',
    description: 'Get up-to-the-second price updates for all major cryptocurrencies'
  },
  {
    icon: <ShowChartIcon fontSize="large" />,
    title: 'Advanced Charts',
    description: 'Interactive charts with technical indicators for in-depth analysis'
  },
  {
    icon: <AttachMoneyIcon fontSize="large" />,
    title: 'Portfolio Tracking',
    description: 'Track your investments and see your portfolio performance'
  },
  {
    icon: <VerifiedUserIcon fontSize="large" />,
    title: 'Secure Platform',
    description: 'Bank-level security to protect your data and privacy'
  },
  {
    icon: <NotificationsIcon fontSize="large" />,
    title: 'Price Alerts',
    description: 'Set custom alerts for price movements and news'
  },
  {
    icon: <SwapIcon fontSize="large" />,
    title: 'Exchange Integration',
    description: 'Connect with major exchanges for seamless trading'
  },
  {
    icon: <HistoryIcon fontSize="large" />,
    title: 'Historical Data',
    description: 'Access years of historical price data for analysis'
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: 'Market Insights',
    description: 'Expert analysis and market commentary'
  }
];

const gainers = [
  { id: 'shib', name: 'Shiba Inu', symbol: 'SHIB', price: 0.000012, change24h: 15.67 },
  { id: 'pepe', name: 'Pepe Coin', symbol: 'PEPE', price: 0.00000045, change24h: 12.34 },
  { id: 'floki', name: 'Floki Inu', symbol: 'FLOKI', price: 0.000023, change24h: 9.87 },
  { id: 'bonk', name: 'Bonk', symbol: 'BONK', price: 0.00000078, change24h: 8.76 }
];

const losers = [
  { id: 'luna', name: 'Terra Classic', symbol: 'LUNC', price: 0.00012, change24h: -5.67 },
  { id: 'ftt', name: 'FTX Token', symbol: 'FTT', price: 1.23, change24h: -4.56 },
  { id: 'cel', name: 'Celsius', symbol: 'CEL', price: 0.45, change24h: -3.45 },
  { id: 'voy', name: 'Voyager Token', symbol: 'VGX', price: 0.12, change24h: -2.34 }
];

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Crypto Trader',
    content: 'This platform has transformed how I track the markets. The real-time data and portfolio tools are unmatched.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Sarah Williams',
    role: 'Blockchain Developer',
    content: 'As a developer, I appreciate the clean API and detailed documentation. Makes integrating with my projects a breeze.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Investment Analyst',
    content: 'The market insights and analytics tools have become essential to my research process. Highly recommended.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

const exchanges = [
  { name: 'Binance', volume: '$18.2B', pairs: 1500, image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
  { name: 'Coinbase', volume: '$3.5B', pairs: 350, image: 'https://cryptologos.cc/logos/coinbase-coin-logo.png' },
  { name: 'Kraken', volume: '$1.2B', pairs: 280, image: 'https://cryptologos.cc/logos/kraken-krk-logo.png' },
  { name: 'FTX', volume: '$0.8B', pairs: 180, image: 'https://cryptologos.cc/logos/ftx-token-ftt-logo.png' }
];

const categories = [
  { name: 'DeFi', marketCap: '$45B', change: 3.2, icon: <MoneyIcon /> },
  { name: 'NFTs', marketCap: '$12B', change: -1.5, icon: <TopIcon /> },
  { name: 'Gaming', marketCap: '$8B', change: 5.7, icon: <HotIcon /> },
  { name: 'Layer 1', marketCap: '$320B', change: 2.1, icon: <SecurityIcon /> },
  { name: 'Layer 2', marketCap: '$15B', change: 7.3, icon: <LanguageIcon /> }
];

// Animation for "Live" text
const livePulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px #ffeb3b, 0 0 10px #ffeb3b;
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 20px #fff176, 0 0 30px #fff176;
    transform: scale(1.1);
  }
`;

const AnimatedLive = styled('span')(() => ({
  color: '#ffeb3b',
  display: 'inline-block',
  animation: `${livePulse} 2s ease-in-out infinite`,
  fontWeight: 600,
}));

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => navigate('/market');
  const handleViewAll = () => navigate('/market');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/coin/${searchQuery.trim().toLowerCase()}`);
    }
  };

  const toggleWatchlist = (coinId) => {
    setWatchlist(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId) 
        : [...prev, coinId]
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const testimonialSettings = {
    ...sliderSettings,
    slidesToShow: 1,
    autoplaySpeed: 8000
  };

  const exchangeSettings = {
    ...sliderSettings,
    slidesToShow: isMobile ? 1 : 2,
    autoplaySpeed: 6000
  };

  const renderPriceChange = (change) => {
    const isPositive = change > 0;
    return (
      <Chip
        label={`${isPositive ? '+' : ''}${change.toFixed(2)}%`}
        sx={{
          backgroundColor: isPositive ? 'success.light' : 'error.light',
          color: 'white',
          fontWeight: 600
        }}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '80%', maxWidth: 400 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Loading Crypto Dashboard
          </Typography>
          <LinearProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section with Animated Background */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
          color: 'white',
          py: 15,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1639762681057-408e52192e55)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Track <AnimatedLive>Live</AnimatedLive> Crypto Markets
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Real-time data for 1000+ cryptocurrencies with advanced charting tools
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleGetStarted}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '50px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Explore Markets
          </Button>
        </Container>
      </Box>

      {/* Search Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            Search Cryptocurrencies
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or symbol (e.g., Bitcoin or BTC)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{
                maxWidth: 600,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  height: 56
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                borderRadius: '50px',
                height: 56,
                minWidth: 150
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Market Overview Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Market Overview
            </Typography>
            <Button 
              endIcon={<ArrowForwardIcon />} 
              onClick={handleViewAll}
              sx={{ textTransform: 'none' }}
            >
              View All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {cryptoData.slice(0, 8).map((crypto) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={crypto.id}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={crypto.image} sx={{ width: 40, height: 40, mr: 2 }} />
                        <Box>
                          <Typography variant="h6">{crypto.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {crypto.symbol}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton onClick={() => toggleWatchlist(crypto.id)}>
                        {watchlist.includes(crypto.id) ? (
                          <StarIcon color="warning" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      ${crypto.price.toLocaleString()}
                    </Typography>

                    {renderPriceChange(crypto.change24h)}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      Market Cap: ${(crypto.marketCap / 1000000000).toFixed(2)}B
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trending Coins Carousel */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Trending Today
          </Typography>
          
          <Slider {...sliderSettings}>
            {trendingCoins.map((coin) => (
              <Box key={coin.id} sx={{ px: 2 }}>
                <Card sx={{ 
                  borderRadius: 3, 
                  p: 3,
                  height: 180,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  color: 'white'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={coin.image} 
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        mr: 2,
                        bgcolor: 'background.paper'
                      }}
                    />
                    <Box>
                      <Typography variant="h6">{coin.name}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {coin.symbol}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    ${coin.price.toLocaleString()}
                  </Typography>
                  {renderPriceChange(coin.change24h)}
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Gainers & Losers Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Top Movers
          </Typography>
          
          <Paper sx={{ mb: 4, borderRadius: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 4,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }
              }}
            >
              <Tab label="Top Gainers" icon={<FireIcon />} iconPosition="start" />
              <Tab label="Top Losers" icon={<TrendingUpIcon />} iconPosition="start" />
            </Tabs>
            
            <Box sx={{ p: 2 }}>
              {tabValue === 0 && (
                <List>
                  {gainers.map((coin) => (
                    <ListItem key={coin.id} sx={{ py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.light' }}>
                          <Typography variant="body2">{coin.symbol}</Typography>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={coin.name}
                        secondary={`$${coin.price.toLocaleString()}`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderPriceChange(coin.change24h)}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
              
              {tabValue === 1 && (
                <List>
                  {losers.map((coin) => (
                    <ListItem key={coin.id} sx={{ py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'error.light' }}>
                          <Typography variant="body2">{coin.symbol}</Typography>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={coin.name}
                        secondary={`$${coin.price.toLocaleString()}`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderPriceChange(coin.change24h)}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Crypto Categories Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Crypto Categories
          </Typography>
          
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    {React.cloneElement(category.icon, { fontSize: 'large', color: 'primary' })}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Market Cap: {category.marketCap}
                  </Typography>
                  {renderPriceChange(category.change)}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* News Carousel Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Latest Crypto News
          </Typography>
          
          <Slider {...sliderSettings}>
            {newsItems.map((news, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={news.image}
                    alt={news.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {news.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {news.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {news.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
            Why Choose Our Platform
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.light', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
            What Our Users Say
          </Typography>
          
          <Slider {...testimonialSettings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <Card sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                  <Avatar 
                    src={testimonial.avatar} 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: 'auto',
                      mb: 3
                    }} 
                  />
                  <Typography variant="h6" gutterBottom>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {testimonial.role}
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Exchanges Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Popular Exchanges
          </Typography>
          
          <Slider {...exchangeSettings}>
            {exchanges.map((exchange, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <Card sx={{ p: 3, borderRadius: 3, height: 200 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={exchange.image} sx={{ width: 40, height: 40, mr: 2 }} />
                    <Typography variant="h6">{exchange.name}</Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    24h Volume: {exchange.volume}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Trading Pairs: {exchange.pairs}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon color="primary" sx={{ mr: 2 }} />
                  <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: 10, 
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Start Trading?
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of investors tracking the crypto markets with our platform
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleGetStarted}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Get Started Now
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;