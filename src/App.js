import React from "react";
import Chart from "./components/LineChart";
//import calcTotal from "./utilities/CaculateTotal";
import "./global.css";
import fetchData from "./utilities/FetchData";

const RATES_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
const PORT_URL =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

const App = () => {
  const [rates, setRates] = React.useState([
    { pair: null, midMarketRate: null, createdAt: null },
  ]);
  const [portfolio, setPortfolio] = React.useState([
    { amount: 0, createdAt: null, currency: null, from: null, type: null },
  ]);

  React.useEffect(() => {
    fetchData(PORT_URL, setPortfolio);
    fetchData(RATES_URL, setRates);
  }, []);

  console.log(rates);

  return (
    <div className="container">
      <h1>
        {" "}
        Current Portfolio Value:{" "}
        {portfolio
          ? `${Math.round(1000000)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          : `fetching`}
      </h1>
      <div className="chart">
        <Chart portfolio={portfolio} setport={setPortfolio} />
      </div>
    </div>
  );
};

export default App;
