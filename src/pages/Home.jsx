import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CryptoTable from '../components/CryptoTable';
import ChartCard from '../components/ChartCard';
import PortfolioCard from '../components/PortfolioCard';
import StatsCards from '../components/StatsCards';
import { getTopCryptos, getMarketStats } from '../services/cryptoService';

export default function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [stats, setStats] = useState({
    marketCap: '$0',
    volume24h: '$0',
    btcDominance: '0%',
  });

  useEffect(() => {
    const fetchData = async () => {
      const cryptosData = await getTopCryptos();
      const marketData = await getMarketStats();
      setCryptos(cryptosData);
      setStats(marketData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      {/* Equal spacing top and bottom for stats */}
      <div className="my-12">
        <StatsCards stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
        <div className="lg:col-span-2">
          <CryptoTable cryptos={cryptos} />
        </div>
        <div className="lg:col-span-1">
          <ChartCard cryptos={cryptos} />
        </div>
      </div>

      <PortfolioCard />
    </div>
  );
}
