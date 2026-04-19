 import { useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
} from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CryptoTable({ cryptos }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Top Cryptocurrencies
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Asset</strong></TableCell>
                  <TableCell align="right"><strong>Price</strong></TableCell>
                  <TableCell align="right"><strong>24h</strong></TableCell>
                  <TableCell align="right"><strong>Market Cap</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptos.map((crypto) => (
                  <motion.tr
                    key={crypto.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar src={crypto.image} alt={crypto.name} sx={{ width: 32, height: 32 }} />
                        <Typography>{crypto.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${crypto.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: crypto.price_change_percentage_24h >= 0 ? 'green' : 'red' }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        &nbsp;{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${crypto.market_cap.toLocaleString()}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
