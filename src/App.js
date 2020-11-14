import React from "react";
import getData from "./utilities/FetchData";
import Chart from "./components/LineChart";
import calcTotal from "./utilities/CaculateTotal";

const App = () => {
  const [rates, setRates] = React.useState();
  const [portfolio, setPortfolio] = React.useState();
  let portfoliovalue = 0;
  if (portfolio) portfoliovalue = calcTotal(portfolio, "all");

  const ratesUrl =
    "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
  const portURL =
    "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

  React.useEffect(() => {
    getData(setRates, ratesUrl);
    getData(setPortfolio, portURL);
  }, []);

  return (
    <>
      <h1>
        {" "}
        Current Portfolio Value:{" "}
        {portfolio
          ? `${Math.round(portfoliovalue)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          : `fetching`}
      </h1>
      <Chart portfolio={portfolio} setport={setPortfolio} />
    </>
  );
};

export default App;
