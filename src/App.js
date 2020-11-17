import React from "react";
import Chart from "./components/LineChart";
import calcTotal from "./utilities/CaculateTotal";
import "./global.css";
import fetchData from "./utilities/FetchData";

const RATES_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
const PORT_URL =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

const App = () => {
  const [rates, setRates] = React.useState();
  const [portfolio, setPortfolio] = React.useState();
  let portfolioValue = 0;
  if (portfolio) portfolioValue = calcTotal(portfolio, "all");

  React.useEffect(() => {
    fetchData(PORT_URL, setPortfolio);
    fetchData(RATES_URL, setRates);
  }, []);
  console.log(portfolio);

  return (
    <div className="container">
      <h1>
        {" "}
        Current Portfolio Value:{" "}
        {portfolio
          ? `${Math.round(portfolioValue)
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
