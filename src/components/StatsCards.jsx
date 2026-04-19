import React from 'react';
import { Card, Typography, Grid, Box, useTheme } from '@mui/material';

// Individual stat card
const StatCard = ({ title, value, bgColor }) => (
  <Card
    sx={{
      backgroundColor: bgColor,
      color: '#fff',
      borderRadius: 2,
      p: 3,
      textAlign: 'center',
      boxShadow: 3,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 6,
      },
    }}
  >
    <Typography variant="subtitle2" sx={{ opacity: 0.85, mb: 0.5 }}>
      {title}
    </Typography>
    <Typography variant="h5" fontWeight="bold">
      {value}
    </Typography>
  </Card>
);

// Stats grid section
export default function StatsCards({ stats }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4, // 🔽 Reduced top & bottom spacing
        px: 2,
        backgroundColor: isDark ? 'transparent' : '#f5f5f510', // slightly translucent for light mode
      }}
    >
      <Grid container spacing={3} maxWidth="lg" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Market Cap"
            value={stats.marketCap}
            bgColor="#14532d"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="24h Volume"
            value={stats.volume24h}
            bgColor="#166534"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="BTC Dominance"
            value={stats.btcDominance}
            bgColor="#7f1d1d"
          />
        </Grid>
      </Grid>
    </Box>
  );
}


