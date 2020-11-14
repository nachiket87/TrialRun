import React from "react";
import { Line } from "react-chartjs-2";
import calcTotal from "../utilities/CaculateTotal";

const Chart = (props) => {
  const test = {
    data: [
      {
        createdAt: "2020-04-20T15:49:57.741Z",
        amount: 100,
        currency: "BTC",
        type: "external account",
        direction: "credit",
        from: {},
      },
    ],
  };
  const setPort = props.setport;
  const data = {
    labels: [2018, 2019, 2020],
    datasets: [
      {
        label: "Portfolio Value",
        data: [
          props.portfolio ? Math.round(calcTotal(props.portfolio, 2018)) : 100,
          props.portfolio ? Math.round(calcTotal(props.portfolio, 2019)) : 100,
          props.portfolio ? Math.round(calcTotal(props.portfolio, 2020)) : 100,
        ],
      },
    ],
  };

  return (
    <>
      <div>
        <button onClick={() => setPort(test)}> click me </button>
        <Line
          data={data}
          options={{
            onClick: (e, x) => {
              if (x[0]) {
                //console.log(x[0]._chart.getElementAtEvent(e)[0]);
                const a = x[0]._chart.getElementAtEvent(e)[0]._index;
                console.log(data.labels[a]);
                const yearToRemake = data.labels[a];
                console.log(data.datasets[0].data[a]);
              }
            },
          }}
        />
      </div>
    </>
  );
};

export default Chart;
