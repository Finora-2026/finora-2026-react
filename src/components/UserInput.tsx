import { useState } from "react";
import * as React from "react";

type UserInputState = {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
};

export default function UserInput() {
  const [userInput, setUserInput] = useState<UserInputState>({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });
  
  function handleChange(
    inputIdentifier: keyof UserInputState,
    newValue: number
  ) {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [inputIdentifier]: newValue
    }));
  }
  
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
              handleChange("initialInvestment", +event.target.value)
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
              handleChange("annualInvestment", +event.target.value)
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
              handleChange("expectedReturn", +event.target.value)
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
              handleChange("duration", +event.target.value)
            }
          />
        </div>
      </div>
    
    </section>
  );
}