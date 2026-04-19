import React, { useState } from "react";

export default function PortfolioCard() {
  const [holdings, setHoldings] = useState([
    { coin: "Bitcoin", amount: 0.5, price: 63000 },
    { coin: "Ethereum", amount: 2, price: 3500 },
  ]);

  const totalValue = holdings.reduce((acc, coin) => acc + coin.amount * coin.price, 0);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>💼 Portfolio</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", padding: "0.5rem" }}>Coin</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "0.5rem" }}>Amount</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "0.5rem" }}>Price (USD)</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "0.5rem" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((coin, index) => (
            <tr key={index}>
              <td style={{ padding: "0.5rem" }}>{coin.coin}</td>
              <td style={{ padding: "0.5rem" }}>{coin.amount}</td>
              <td style={{ padding: "0.5rem" }}>${coin.price.toLocaleString()}</td>
              <td style={{ padding: "0.5rem" }}>
                ${(coin.amount * coin.price).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 style={{ marginTop: "1.5rem", textAlign: "right" }}>
        Total Value: ${totalValue.toLocaleString()}
      </h4>
    </div>
  );
}
