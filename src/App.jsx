 import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MarketPage from './pages/MarketPage';
import LoginPage from './pages/LoginPage';
import PortfolioPage from './pages/PortfolioPage';
import CoinDetails from './pages/CoinDetails';
import ComparePage from './components/ComparePage'; // Import the new ComparePage
 
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/compare" element={<ComparePage />} /> {/* Add Compare route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
             <Route path="/coin/:id" element={<CoinDetails />} />
           </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;