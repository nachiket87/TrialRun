import React from "react";
import Chart from "./components/LineChart";
import calcTotal from "./utilities/CaculateTotal";
import "./global.css";
import fetchData from "./utilities/FetchData";

const BTC_RATE_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
const ETH_RATE_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json";
const PORT_URL =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

const App = () => {
  const [data, setData] = React.useState();
  const [portfolio, setPortfolio] = React.useState();
  let portfolioValue = 0;
  if (data) portfolioValue = calcTotal(data, "all");

  React.useEffect(() => {
    const callAPI = (url) => fetch(url).then((res) => res.json());

    Promise.all([
      callAPI(BTC_RATE_URL),
      callAPI(ETH_RATE_URL),
      callAPI(PORT_URL),
    ])
      .then((res) => {
        setData({ BTC_rate: res[0], ETH_rate: res[1], transactions: res[2] });
      })
      .catch((err) => console.log("whoops: ", err));
  }, []);

  return (
    <div className="container">
      <h1>
        {" "}
        Current Portfolio Value:{" "}
        {data
          ? `${Math.round(portfolioValue)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          : `fetching`}
      </h1>
      <div className="chart">
        <Chart portfolio={portfolio} setport={setData} />
      </div>
    </div>
  );
};

export default App;
