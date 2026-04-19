
import * as React from "react";
import type {InvestmentCalculatorInput} from "../../data/InvestmentCalculatorInput.ts";

type UserInputProps = {
  userInput: InvestmentCalculatorInput;
  onChange: (
    inputIdentifier: keyof InvestmentCalculatorInput,
    newValue: number
  ) => void;
};

export default function UserInput({userInput, onChange}: UserInputProps) {
  
  return (
    <section className="container mt-4 p-4 bg-success bg-gradient rounded text-light">
      
      {/* Row 1 */}
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Initial Investment</label>
          <input
            type="number"
            className="form-control"
            required
            value={userInput.initialInvestment}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange("initialInvestment", +event.target.value)
            }
          />
        </div>
        
        <div className="col">
          <label className="form-label">Annual Investment</label>
          <input
            type="number"
            className="form-control"
            required
            value={userInput.annualInvestment}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange("annualInvestment", +event.target.value)
            }
          />
        </div>
      </div>
      
      {/* Row 2 */}
      <div className="row">
        <div className="col">
          <label className="form-label">Expected Return</label>
          <input
            type="number"
            className="form-control"
            required
            value={userInput.expectedReturn}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange("expectedReturn", +event.target.value)
            }
          />
        </div>
        
        <div className="col">
          <label className="form-label">Duration</label>
          <input
            type="number"
            className="form-control"
            required
            value={userInput.duration}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange("duration", +event.target.value)
            }
          />
        </div>
      </div>
    
    </section>
  );
}