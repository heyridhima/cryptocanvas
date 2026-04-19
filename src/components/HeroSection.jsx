 import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

export default function HeroSection() {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        position: 'relative',
        height: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 4,
        mb: 8,
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url('https://images7.alphacoders.com/888/888098.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Foreground Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          px: 3,
          maxWidth: 800,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
            Track{' '}
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{
                color: '#FACC15',
                display: 'inline-block',
                padding: '0 6px',
              }}
            >
              Live
            </motion.span>{' '}
            Crypto Markets
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Typography variant="h6" sx={{ color: 'grey.300', mb: 4 }}>
            Real-time data for 1000+ cryptocurrencies around the world
          </Typography>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            component={RouterLink}
            to="market"  // This will navigate to PortfolioPage
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#15aefaff',
              color: '#000',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 999,  
              '&:hover': {
                backgroundColor: '#eab308',
              },
            }}
          >
            Explore  
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}