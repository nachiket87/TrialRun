import React from "react";
import Chart from "./components/LineChart";
import Portfolio from "./components/Portfolio";
import calcTotal from "./utilities/CaculateTotal";
import "./global.css";

const BTC_RATE_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
const ETH_RATE_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json";
const PORT_URL =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

const App = () => {
  const [data, setData] = React.useState();
  let portfolioValue = 0;

  React.useEffect(() => {
    const callAPI = (url) => fetch(url).then((res) => res.json());

    Promise.all([
      callAPI(BTC_RATE_URL),
      callAPI(ETH_RATE_URL),
      callAPI(PORT_URL),
    ])
      .then((res) => {
        setData({
          BTC_rate: res[0],
          ETH_rate: res[1],
          transactions: res[2],
        });
      })
      .catch((err) => console.log("whoops: ", err));
  }, []);
  if (data) {
    portfolioValue = calcTotal(data);
  }

  return (
    <div className="container">
      <h1>
        <Portfolio portfolioValue={data ? portfolioValue : `fetching`} />
      </h1>
      <div className="chart">
        <Chart transactions={data} setportfolio={setData} />
      </div>
      <div
        className="motto"
        style={{ marginTop: "2rem", fontSize: "72px", textAlign: "center" }}
      >
        STRIKE FIRST
        <br /> STRIKE HARD
        <br /> NO MERCY
      </div>
    </div>
  );
};

export default App;
