import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home.tsx";
import Portfolio from "./pages/Portfolio.tsx";

import './App.css'
import Navbar from "./components/NavBar.tsx";
import FinoraLogin from "./pages/FinoraLogin.tsx";
import InvestmentCalculator from "./pages/InvestmentCalculator.tsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/finora-login" element={<FinoraLogin />} />
        <Route path="/investment-calculator" element={<InvestmentCalculator />} />
      </Routes>
    </>
  )
}