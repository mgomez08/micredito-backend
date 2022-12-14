const calculateCredit = ({ amount, period, interest }) => {
  interest = interest / 100;
  const PMT = calculatePTM({ amount, period, interest });

  let dues = [];
  let lastAmount = amount;

  for (let i = 1; i <= period; i++) {
    dues.push({
      amount: lastAmount,
      fee: PMT,
      interest: Math.round(lastAmount * interest),
      capital: Math.round(PMT - lastAmount * interest),
      balance:
        i === period
          ? 0
          : Math.round(lastAmount - (PMT - lastAmount * interest)),
      due: i,
    });
    lastAmount = Math.round(lastAmount - (PMT - lastAmount * interest));
  }
  return dues;
};

const calculatePTM = ({ amount, period, interest }) => {
  return Math.round(
    (amount * interest) / (1 - Math.pow(1 + interest, -period))
  );
};

module.exports = {
  calculateCredit,
};
