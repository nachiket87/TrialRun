const remakePortfolio = (portfolio, year) => {
  const transactions = portfolio.data;
  let newPortfolio = [];
  for (let i = 0; i < transactions.length; i++) {
    const currentTransDate = new Date(transactions[i].createdAt);
    const yearinNumber = currentTransDate.getFullYear();
    if (yearinNumber < year) {
      newPortfolio.push(transactions[i]);
    }
  }
  return { data: newPortfolio };
};

export default remakePortfolio;
