import React from "react";
import Navbar from "../components/Navbar";
import ChartCard from "../components/ChartCard";
import PortfolioCard from "../components/PortfolioCard";
import CryptoTable from "../components/CryptoTable"; // <-- if not created, I can provide it

export default function DashboardPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>📊 Dashboard</h2>

        {/* Bitcoin Price Chart */}
        <section style={{ marginBottom: "3rem" }}>
          <ChartCard />
        </section>

        {/* Portfolio */}
        <section style={{ marginBottom: "3rem" }}>
          <PortfolioCard />
        </section>

        {/* Crypto Table - Top 10 coins */}
        <section>
          <CryptoTable />
        </section>
      </div>
    </div>
  );
}
