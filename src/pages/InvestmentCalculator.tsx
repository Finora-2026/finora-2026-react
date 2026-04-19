import {useEffect} from "react";
import Header from "../components/Header.tsx";
import UserInput from "../components/UserInput.tsx";

export default function InvestmentCalculator() {

  useEffect(() => {
    document.title = 'Bellamy Phan | Investment Calculator'
  }, [])

  return (
    <section>
      
      <Header />
      <p>This page's content is being built.</p>
      <UserInput/>
      
    </section>
  )
}