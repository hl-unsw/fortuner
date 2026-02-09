const VEHICLE_PRICE = 154_900;

export function calcHirePurchase(price, downPaymentPct, annualRate, termYears) {
  const termMonths = termYears * 12;
  const downPayment = price * downPaymentPct;
  const loan = price * (1 - downPaymentPct);
  const interest = loan * annualRate * termYears;
  const emi = (loan + interest) / termMonths;
  const totalRepayment = downPayment + loan + interest;

  return {
    vehiclePrice: price,
    downPaymentPct,
    downPayment,
    loanAmount: loan,
    annualRate,
    termYears,
    termMonths,
    totalInterest: interest,
    monthlyPayment: emi,
    totalRepayment,
  };
}

export function flatToReducingRate(loan, termMonths, flatEmi) {
  let lo = 0;
  let hi = 0.05;
  for (let i = 0; i < 300; i++) {
    const mid = (lo + hi) / 2;
    const pmt =
      mid === 0
        ? loan / termMonths
        : (loan * mid) / (1 - Math.pow(1 + mid, -termMonths));
    if (pmt < flatEmi) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 12;
}

export { VEHICLE_PRICE };
