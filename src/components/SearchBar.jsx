import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      navigate(`/coin/${trimmed}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
      <TextField
        label="Enter coin name (e.g., bitcoin)"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: '300px' }}
      />
      <Button type="submit" variant="contained" endIcon={<SearchIcon />}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
