import React from "react";
import getData from "./utilities/FetchData";

function App() {
  const [da, setDa] = React.useState({});

  const ratesUrl =
    "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
  const portURL =
    "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

  React.useEffect(() => {
    getData(setDa, ratesUrl, portURL);
  }, []);

  const calculateValue = (port) => {
    const total = port.reduce((sum, item) => {
      return (sum += item.amount);
    }, 0);
    setDa({ total: total });
  };
  if (da.portfolio) {
    calculateValue(da.portfolio.data);
  }

  return (
    <div>
      <h1> Current Portfolio Value: {da ? `${da.total}` : `fetching`}</h1>
    </div>
  );
}

export default App;
