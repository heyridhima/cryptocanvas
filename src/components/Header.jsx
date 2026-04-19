 // src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Badge,
  Switch,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle,
  Google as GoogleIcon,
  Email as EmailIcon,
  NightsStay as NightIcon,
  WbSunny as DayIcon,
  Compare as CompareIcon,
  BarChart as MarketIcon,
  Wallet as PortfolioIcon,
  Help as FAQIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const Header = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  // Enhanced color scheme with better contrast
  const colors = {
    light: {
      primary: '#0C1D1D',
      secondary: '#465A5A',
      background: '#ffffff',
      text: '#111827',
      card: '#f9fafb',
      border: '#e5e7eb',
      accent: '#15aefaff',
      hover: '#f3f4f6',
      button: '#15aefaff',
      buttonText: '#ffffff',
      disabled: '#9ca3af',
      market: {
        up: '#10B981',
        down: '#EF4444',
        volume: '#3B82F6',
        background: '#ffffff',
        card: '#f9fafb',
        text: '#111827'
      }
    },
    dark: {
      primary: '#111521',
      secondary: '#1e293b',
      background: '#121212',
      text: '#f3f4f6',
      card: '#1e293b',
      border: '#2d3748',
      accent: '#15aefaff',
      hover: '#334155',
      button: '#15aefaff',
      buttonText: '#000000',
      disabled: '#6b7280',
      market: {
        up: '#10B981',
        down: '#EF4444',
        volume: '#3B82F6',
        background: '#1e293b',
        card: '#334155',
        text: '#f3f4f6'
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/coin/${searchQuery.trim().toLowerCase()}`);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setError('');
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleAuthTypeToggle = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
    setError('');
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      handleLoginClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordAuth = async () => {
    try {
      setLoading(true);
      if (authType === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      handleLoginClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { text: 'Market', to: '/market', icon: <MarketIcon /> },
    { text: 'Compare', to: '/compare', icon: <CompareIcon /> },
    { text: 'Portfolio', to: '/portfolio', icon: <PortfolioIcon /> },
   ];

  const drawerContent = (
    <Box 
      sx={{ 
        width: 280,
        height: '100%',
        bgcolor: mode === 'dark' ? colors.dark.card : colors.light.background,
        color: mode === 'dark' ? colors.dark.text : colors.light.text,
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }} 
      role="presentation"
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          CryptoCanvas
        </Typography>
      </Box>
      <Divider sx={{ borderColor: mode === 'dark' ? colors.dark.border : colors.light.border }} />
      <List sx={{ flex: 1 }}>
        {navItems.map((item, index) => (
          <ListItem 
            button 
            key={index} 
            component={RouterLink} 
            to={item.to}
            onClick={toggleDrawer(false)}
            sx={{
              '&:hover': {
                bgcolor: mode === 'dark' ? colors.dark.hover : colors.light.hover
              }
            }}
          >
            <ListItemIcon sx={{ color: mode === 'dark' ? colors.dark.text : colors.light.text }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: mode === 'dark' ? colors.dark.border : colors.light.border }} />
      <Box sx={{ p: 2 }}>
        <Box 
          onClick={toggleTheme}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 1,
            bgcolor: mode === 'dark' ? colors.dark.hover : colors.light.hover,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: mode === 'dark' ? colors.dark.accent + '22' : colors.light.accent + '22'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mode === 'dark' ? (
              <NightIcon sx={{ mr: 1, color: colors.dark.text }} />
            ) : (
              <DayIcon sx={{ mr: 1, color: colors.light.text }} />
            )}
            <Typography variant="body1" sx={{ color: 'inherit' }}>
              {mode === 'dark' ? 'Night Mode' : 'Day Mode'}
            </Typography>
          </Box>
          <Switch
            checked={mode === 'dark'}
            onChange={toggleTheme}
            color="default"
            inputProps={{ 'aria-label': 'toggle theme' }}
          />
        </Box>
      </Box>
      {!user ? (
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleLoginOpen}
            sx={{
              bgcolor: colors.light.accent,
              color: colors.light.buttonText,
              '&:hover': {
                bgcolor: '#eab308',
              }
            }}
          >
            Sign In
          </Button>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: mode === 'dark' ? colors.dark.border : colors.light.border,
              color: mode === 'dark' ? colors.dark.text : colors.light.text,
              '&:hover': {
                borderColor: mode === 'dark' ? colors.dark.accent : colors.light.accent
              }
            }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: mode === 'dark' ? colors.dark.primary : colors.light.primary,
          backgroundImage: mode === 'dark' ? 'none' : 'linear-gradient(90deg, #ffffffff 0%, #ffffffff 100%)',
          color: mode === 'dark' ? colors.dark.text : colors.light.text,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${mode === 'dark' ? colors.dark.border : colors.light.border}`,
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
           <Box 
  component={RouterLink} 
  to="/" 
  sx={{ 
    display: 'flex', 
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit'
  }}
>
  <Box
    component="img"
    src={logo}
    alt="CryptoCanvas Logo"
    sx={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      objectFit: 'cover',
      mr: 1
    }}
  />
  <Typography
    variant="h6"
    component="div"
    sx={{
      fontWeight: 'bold',
      display: { xs: 'none', sm: 'block' }
    }}
  >
    CryptoCanvas
  </Typography>
</Box>



</Box>

          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            gap: 1,
            flex: 1,
            maxWidth: '600px',
            mx: 2
          }}>
            <Paper
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                py: 0.5,
                borderRadius: '24px',
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: 'inherit',
                flex: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
                }
              }}
            >
              <IconButton type="button" sx={{ color: 'inherit' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{ 
                  ml: 1, 
                  flex: 1, 
                  color: 'inherit',
                  '& input::placeholder': {
                    color: 'inherit',
                    opacity: 0.7
                  }
                }}
                inputProps={{ 'aria-label': 'search coins' }}
              />
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={RouterLink}
                to={item.to}
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  minWidth: 'auto',
                  px: 1.5,
                  '&:hover': {
                    bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                  }
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}

            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                ml: 1
              }}
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {mode === 'dark' ? <DayIcon /> : <NightIcon />}
            </IconButton>

            {!user ? (
              <Button 
                color="inherit"
                onClick={handleLoginOpen}
                sx={{
                  ml: 1,
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                  }
                }}
              >
                Login
              </Button>
            ) : (
              <IconButton 
                onClick={handleProfileClick} 
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color="success"
                >
                  <Avatar 
                    sx={{ 
                      width: 34, 
                      height: 34,
                      bgcolor: mode === 'dark' ? colors.dark.hover : colors.light.hover,
                      color: mode === 'dark' ? colors.dark.text : colors.light.text
                    }}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  >
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </Avatar>
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderRight: 'none',
            bgcolor: mode === 'dark' ? colors.dark.card : colors.light.background
          }
        }}
      >
        {drawerContent}
      </Drawer>

      <Dialog 
        open={loginOpen} 
        onClose={handleLoginClose}
        PaperProps={{
          sx: {
            bgcolor: mode === 'dark' ? colors.dark.card : colors.light.background,
            color: mode === 'dark' ? colors.dark.text : colors.light.text,
            minWidth: '400px',
            transition: 'all 0.3s ease'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {authType === 'login' ? 'Sign In to CryptoCanvas' : 'Create Account'}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ 
              mb: 2,
              py: 1.5,
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: mode === 'dark' ? colors.dark.text : colors.light.text,
              borderColor: mode === 'dark' ? colors.dark.border : colors.light.border,
              '&:hover': {
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                borderColor: mode === 'dark' ? colors.dark.accent : colors.light.accent
              }
            }}
            disabled={loading}
          >
            Continue with Google
          </Button>
          
          <Divider sx={{ 
            my: 2,
            '&::before, &::after': {
              borderColor: mode === 'dark' ? colors.dark.border : colors.light.border
            }
          }}>
            <Typography variant="body2" sx={{ px: 1, color: mode === 'dark' ? colors.dark.text : colors.light.text }}>
              OR
            </Typography>
          </Divider>
          
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
            InputLabelProps={{
              style: { color: mode === 'dark' ? colors.dark.text : colors.light.text }
            }}
            InputProps={{
              style: { color: mode === 'dark' ? colors.dark.text : colors.light.text }
            }}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            InputLabelProps={{
              style: { color: mode === 'dark' ? colors.dark.text : colors.light.text }
            }}
            InputProps={{
              style: { color: mode === 'dark' ? colors.dark.text : colors.light.text }
            }}
          />
          
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: mode === 'dark' ? colors.dark.text : colors.light.text }}>
            {authType === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Button 
              size="small" 
              onClick={handleAuthTypeToggle}
              disabled={loading}
              sx={{ 
                color: colors.light.accent,
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              {authType === 'login' ? 'Create one' : 'Sign in'}
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleLoginClose} 
            disabled={loading}
            sx={{ 
              color: mode === 'dark' ? colors.dark.text : colors.light.text
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEmailPasswordAuth}
            variant="contained"
            disabled={!email || !password || loading}
            startIcon={loading ? <CircularProgress size={20} /> : <EmailIcon />}
            sx={{
              borderRadius: '20px',
              px: 3,
              py: 1,
              bgcolor: colors.light.accent,
              color: colors.light.buttonText,
              '&:hover': {
                bgcolor: '#eab308',
              }
            }}
          >
            {authType === 'login' ? 'Sign In' : 'Register'}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            bgcolor: mode === 'dark' ? colors.dark.card : colors.light.background,
            color: mode === 'dark' ? colors.dark.text : colors.light.text,
            minWidth: '200px',
            mt: 1,
            boxShadow: theme.shadows[4],
            border: `1px solid ${mode === 'dark' ? colors.dark.border : colors.light.border}`,
            transition: 'all 0.3s ease'
          }
        }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2" noWrap sx={{ color: 'inherit' }}>
            {user?.displayName || user?.email}
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: mode === 'dark' ? colors.dark.border : colors.light.border }} />
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            {mode === 'dark' ? <DayIcon fontSize="small" /> : <NightIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText sx={{ color: 'inherit' }}>
            {mode === 'dark' ? 'Day Mode' : 'Night Mode'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'inherit' }}>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;























