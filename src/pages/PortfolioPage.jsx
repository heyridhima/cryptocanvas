 import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Avatar,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Settings as SettingsIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function CryptoPortfolioPage() {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: true,
            price_change_percentage: "1h,24h,7d",
          },
        });
        setCoins(res.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleCoinSelect = (coin) => {
    if (!selectedCoins.find((c) => c.id === coin.id)) {
      setSelectedCoins([...selectedCoins, coin]);
    }
  };

  const handleRemoveCoin = (coinId) => {
    setSelectedCoins(selectedCoins.filter((c) => c.id !== coinId));
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num) => {
    if (!num) return "$0";
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  const getPercentageColor = (value) => {
    if (!value) return "text.primary";
    return value >= 0 ? "success.main" : "error.main";
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* App Bar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              Overview
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              My Portfolio
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Portfolio Header */}
      <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              My Portfolio
            </Typography>
            <Chip
              label="Default"
              icon={<StarIcon sx={{ fontSize: "16px" }} />}
              size="small"
              sx={{ backgroundColor: "action.selected" }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setShowSelector(true)}
            >
              Add coin
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        {loading && selectedCoins.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <LinearProgress sx={{ width: "100%", maxWidth: 400 }} />
          </Box>
        ) : selectedCoins.length > 0 ? (
          <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "divider" }}>
            <Table sx={{ minWidth: 800 }} aria-label="portfolio table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "action.hover" }}>
                  <TableCell>Coin</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">1h</TableCell>
                  <TableCell align="right">24h</TableCell>
                  <TableCell align="right">7d</TableCell>
                  <TableCell align="right">24h Volume</TableCell>
                  <TableCell align="right">Market Cap</TableCell>
                  <TableCell align="right">Last 7 Days</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCoins.map((coin) => (
                  <TableRow key={coin.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={coin.image} alt={coin.name} sx={{ width: 24, height: 24 }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            {coin.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {coin.symbol.toUpperCase()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        ${coin.current_price.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color={getPercentageColor(coin.price_change_percentage_1h_in_currency)}
                      >
                        {coin.price_change_percentage_1h_in_currency?.toFixed(1) || "0.0"}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color={getPercentageColor(coin.price_change_percentage_24h_in_currency)}
                      >
                        {coin.price_change_percentage_24h_in_currency?.toFixed(1) || "0.0"}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color={getPercentageColor(coin.price_change_percentage_7d_in_currency)}
                      >
                        {coin.price_change_percentage_7d_in_currency?.toFixed(1) || "0.0"}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatNumber(coin.total_volume)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatNumber(coin.market_cap)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ width: 150 }}>
                      <Box
                        component="img"
                        src={`https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{data:[${coin.sparkline_in_7d?.price?.slice(
                          0,
                          20
                        )}],borderColor:'${coin.price_change_percentage_7d_in_currency >= 0 ? "green" : "red"}'}]}}`}
                        alt="trend"
                        sx={{ height: 40, width: "100%" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveCoin(coin.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary">
                Showing 1 to {selectedCoins.length} of {selectedCoins.length} results
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Rows per page:
                </Typography>
                <Chip label="100" size="small" />
              </Box>
            </Box>
          </TableContainer>
        ) : (
          <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your portfolio is empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add coins to your portfolio to track their performance
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowSelector(true)}
              >
                Add Coins
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Coin Selector Dialog */}
      <Dialog
        open={showSelector}
        onClose={() => setShowSelector(false)}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Add Coins to Portfolio</Typography>
            <IconButton onClick={() => setShowSelector(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search coins..."
            size="small"
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <LinearProgress sx={{ width: "100%" }} />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredCoins.map((coin) => (
                <Grid item xs={12} sm={6} md={4} key={coin.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                      ...(selectedCoins.find((c) => c.id === coin.id) && {
                        borderColor: "primary.main",
                        backgroundColor: "primary.light",
                      }),
                    }}
                    onClick={() => handleCoinSelect(coin)}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src={coin.image} alt={coin.name} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography variant="subtitle2">{coin.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: "auto", textAlign: "right" }}>
                        <Typography variant="subtitle2">
                          ${coin.current_price.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          color={getPercentageColor(coin.price_change_percentage_24h_in_currency)}
                        >
                          {coin.price_change_percentage_24h_in_currency?.toFixed(1) || "0.0"}%
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSelector(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setShowSelector(false)}
            disabled={selectedCoins.length === 0}
          >
            Add {selectedCoins.length > 0 ? `${selectedCoins.length} coins` : "coins"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}