const calcTotal = (data) => {
  let totals = { CAD_Total: 0, BTC_Total: 0, ETH_Total: 0 };
  let finalValue = 0;
  const { BTC_rate, ETH_rate, transactions } = data;

  for (let i = 0; i < transactions.length; i++) {
    switch (transactions[i].direction) {
      case "credit":
        if (transactions[i].currency === "BTC")
          totals.BTC_Total += parseFloat(transactions[i].amount);
        else if (transactions[i].currency === "ETH")
          totals.ETH_Total += parseFloat(transactions[i].amount);
        else totals.CAD_Total += parseFloat(transactions[i].amount);
        break;
      case "debit":
        if (transactions[i].currency === "BTC")
          totals.BTC_Total += parseFloat(transactions[i].amount);
        else if (transactions[i].currency === "ETH")
          totals.ETH_Total += parseFloat(transactions[i].amount);
        else totals.CAD_Total += parseFloat(transactions[i].amount);
        break;
      default:
        if (transactions[i].to.currency === "BTC")
          totals.BTC_Total += parseFloat(transactions[i].to.amount);
        else if (transactions[i].to.currency === "ETH")
          totals.ETH_Total += parseFloat(transactions[i].to.amount);
        if (transactions[i].to.currency === "CAD")
          totals.CAD_Total += parseFloat(transactions[i].to.amount);

        break;
    }
  }
  finalValue =
    totals.CAD_Total +
    totals.BTC_Total * checkRate(transactions[0], BTC_rate) +
    totals.ETH_Total * checkRate(transactions[0], ETH_rate);
  return Math.round(finalValue);
};

// you will need checkRate function later
const checkRate = (transaction, rate) => {
  const target = transaction.createdAt;

  let floorIndex = -1;
  let ceilingIndex = rate.length - 1;
  let lastIndexChecked = 0;

  while (floorIndex + 1 < ceilingIndex) {
    // Binary Search to find matching date.
    const distance = ceilingIndex - floorIndex;
    const halfDistance = Math.floor(distance / 2);
    const guessIndex = floorIndex + halfDistance;
    const guessValue = rate[guessIndex].createdAt;
    if (guessValue === target) {
      return rate[guessIndex].midMarketRate;
    } else if (guessValue > target) {
      ceilingIndex = guessIndex;
      lastIndexChecked = guessIndex + 1;
    } else if (guessValue < target) {
      floorIndex = guessIndex;
      lastIndexChecked = guessIndex;
    }
  }
  return rate[lastIndexChecked].midMarketRate;
};

/* const btcConvertor = (transaction, ETH_rate, BTC_rate) => {
  switch (transaction.currency) {
    case "BTC":
      const amount =
        parseFloat(transaction.amount) * checkRate(transaction, BTC_rate);
      return amount;
    case "CAD":
      return parseFloat(transaction.amount);
    case "ETH":
      return parseFloat(transaction.amount) * checkRate(transaction, ETH_rate);
    default:
      break;
  }
}; */

export default calcTotal;
