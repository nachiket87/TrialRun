const calcTotal = (portfolio, year) => {
  const transactions = portfolio.data;
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    const currentTransDate = new Date(transactions[i].createdAt);
    const yearinNumber = currentTransDate.getFullYear();
    if (yearinNumber <= year || year === "all") {
      switch (transactions[i].direction) {
        case "credit":
          total += btcConvertor(transactions[i]);

          break;
        case "debit":
          total -= btcConvertor(transactions[i]);
          break;
        default:
          break;
      }
    }
  }
  return total;
};

const btcConvertor = (transaction) => {
  switch (transaction.currency) {
    case "BTC":
      return parseFloat(transaction.amount) * 21318.55;
    case "CAD":
      return parseFloat(transaction.amount);
    case "ETH":
      return parseFloat(transaction.amount) * 620.27;

    default:
      break;
  }
};

export default calcTotal;
