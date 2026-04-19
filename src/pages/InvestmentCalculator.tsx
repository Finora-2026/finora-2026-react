import {useEffect, useState} from "react";
import Header from "../components/InvestmentCalculator/Header.tsx";
import UserInput from "../components/InvestmentCalculator/UserInput.tsx";
import type {InvestmentCalculatorInput} from "../data/InvestmentCalculatorInput.ts";
import Results from "../components/InvestmentCalculator/Results.tsx";

export default function InvestmentCalculator() {

  useEffect(() => {
    document.title = 'Bellamy Phan | Investment Calculator'
  }, [])
  
  const [userInput, setUserInput] = useState<InvestmentCalculatorInput>({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });
  
  const isInputValid = userInput.duration >= 1;
  
  function handleChange(
    inputIdentifier: keyof InvestmentCalculatorInput,
    newValue: number
  ) {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [inputIdentifier]: newValue
    }));
  }

  return (
    <section>
      
      <Header />
      
      <UserInput userInput={userInput} onChange={handleChange}/>
      
      {isInputValid ? (
        <Results userInput={userInput} />
      ) : (
        <div className="container mt-3">
          <div className="alert alert-danger text-center" role="alert">
            Duration must be at least 1 year
          </div>
        </div>
      )}
      
    </section>
  )
}