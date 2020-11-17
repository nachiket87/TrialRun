const calcTotal = (data, year) => {
  const { BTC_rate, ETH_rate, transactions } = data;

  let total = 0;

  for (let i = 0; i < transactions.length; i++) {
    const currentTransDate = new Date(transactions[i].createdAt);
    const yearinNumber = currentTransDate.getFullYear();
    if (yearinNumber <= year || year === "all") {
      switch (transactions[i].direction) {
        case "credit":
          total += btcConvertor(transactions[i], ETH_rate, BTC_rate);
          break;
        case "debit":
          total -= btcConvertor(transactions[i], ETH_rate, BTC_rate);
          break;
        default:
          break;
      }
    }
  }
  return total;
};
const checkRate = (transaction, rate) => {
  if (!transaction) {
    return 0;
  }
  const transactionDate = new Date(transaction.createdAt);
  const target = transactionDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let floorIndex = -1;
  let ceilingIndex = rate.length - 1;
  let lastIndexChecked = 0;

  while (floorIndex + 1 < ceilingIndex) {
    // Find the index ~halfway between the floor and ceiling
    // We have to round down, to avoid getting a "half index"
    const distance = ceilingIndex - floorIndex;
    const halfDistance = Math.floor(distance / 2);
    const guessIndex = floorIndex + halfDistance;
    const guessDate = new Date(rate[guessIndex].createdAt);
    const guessValue = guessDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (guessValue === target) {
      return rate[guessIndex].midMarketRate;
    } else if (guessDate > transactionDate) {
      ceilingIndex = guessIndex;
    } else if (guessDate < transactionDate) {
      floorIndex = guessIndex;
    }
    lastIndexChecked = guessIndex;
  }
  return rate[lastIndexChecked].midMarketRate;
};

const btcConvertor = (transaction, ETH_rate, BTC_rate) => {
  switch (transaction.currency) {
    case "BTC":
      return parseFloat(transaction.amount) * checkRate(transaction, BTC_rate);
    case "CAD":
      return parseFloat(transaction.amount);
    case "ETH":
      return parseFloat(transaction.amount) * checkRate(transaction, ETH_rate);

    default:
      break;
  }
};

export default calcTotal;
