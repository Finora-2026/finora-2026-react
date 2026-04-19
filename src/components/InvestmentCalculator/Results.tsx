import type { InvestmentCalculatorInput } from "../../data/InvestmentCalculatorInput";
import { calculateInvestmentResults, formatter } from "../../utils/InvestmentCalculatorFunctions";

type ResultsProps = {
  userInput: InvestmentCalculatorInput;
};

export default function Results({ userInput }: ResultsProps) {
  const resultData = calculateInvestmentResults(userInput);
  
  if (resultData.length === 0) {
    return <p className="text-center mt-4">No data available.</p>;
  }
  
  const initialInvestment =
    resultData[0].valueEndOfYear -
    resultData[0].interest -
    resultData[0].annualInvestment;
  
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title mb-3 text-center">Investment Results</h4>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center align-middle">
              <thead className="table-dark">
              <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
              </tr>
              </thead>
              
              <tbody>
              {resultData.map((yearData) => {
                const totalInterestValue =
                  yearData.valueEndOfYear -
                  yearData.annualInvestment * yearData.year -
                  initialInvestment;
                
                const totalAmountInvested =
                  yearData.valueEndOfYear - totalInterestValue;
                
                return (
                  <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{formatter.format(yearData.valueEndOfYear)}</td>
                    <td>{formatter.format(yearData.interest)}</td>
                    <td>{formatter.format(totalInterestValue)}</td>
                    <td>{formatter.format(totalAmountInvested)}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}