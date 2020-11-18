import React from "react";
import { Line } from "react-chartjs-2";
import calcTotal from "../utilities/CaculateTotal";

const Chart = (props) => {
  let transactions = [];
  let BTC_rate = [];
  let ETH_rate = [];
  if (props.transactions) {
    transactions = props.transactions.transactions;
    BTC_rate = props.transactions.BTC_rate;
    ETH_rate = props.transactions.ETH_rate;
  }
  const data = {
    labels: transactions
      .map((t) => {
        return new Date(t.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      })
      .reverse(),

    datasets: [
      {
        label: "Portfolio Value",
        data: transactions
          .map((t) => {
            return calcTotal({
              transactions: transactions.filter((trans) => {
                return trans.createdAt <= t.createdAt;
              }),
              BTC_rate: BTC_rate,
              ETH_rate: ETH_rate,
            });
          })
          .reverse(),
        borderColor: "teal",
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <div>
        <Line
          data={data}
          options={{
            onClick: (e, x) => {
              if (x[0]) {
                const a = x[0]._chart.getElementAtEvent(e)[0]._index;
                console.log(data.labels[a]);
                console.log(data.datasets[0].data[a]);
              }
            },
            tooltips: { labelColor: "black" },
          }}
        />
      </div>
    </>
  );
};

export default Chart;
