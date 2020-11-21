import React, { useEffect } from "react";

const Portfolio = (props) => {
  const portfolioValue = props;
  const [data, setData] = React.useState(0);

  useEffect(() => {
    setData(portfolioValue);
  }, [portfolioValue]);

  console.log(data);

  return (
    <div>
      Current Portfolio Value:{" "}
      {typeof data.portfolioValue === "string"
        ? `fetching....`
        : `${Math.round(data.portfolioValue)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
    </div>
  );
};

export default Portfolio;
