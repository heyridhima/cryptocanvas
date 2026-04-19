// src/components/Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        background: isDark
          ? 'linear-gradient(to right, #0d1117, #1a1f2b)' // Dark theme gradient
          : '#5ba098', // 🟦 Light mode background based on image
        color: isDark ? '#ddd' : '#ffffff', // Contrast white text in light mode too
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              CryptoCanvas
            </Typography>
            <Typography variant="body2">
              Your one-stop platform for cryptocurrency tracking and portfolio management.
            </Typography>
          </Grid>

          

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">Email: support@cryptocanvas.com</Typography>
            <Typography variant="body2">Phone: +1 (555) 123-4567</Typography>
          </Grid>

          {/* Social Icons */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" sx={{ color: isDark ? '#90caf9' : '#64b5f6' }}>
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: isDark ? '#90caf9' : '#64b5f6' }}>
                <Twitter />
              </IconButton>
              <IconButton aria-label="LinkedIn" sx={{ color: isDark ? '#90caf9' : '#64b5f6' }}>
                <LinkedIn />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{ color: isDark ? '#f48fb1' : '#f06292' }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} CryptoCanvas. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
