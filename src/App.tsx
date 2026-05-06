import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home.tsx";
import Portfolio from "./pages/Portfolio.tsx";

import './App.css'
import Navbar from "./components/NavBar.tsx";
import FinoraLogin from "./pages/FinoraLogin.tsx";
import InvestmentCalculator from "./pages/InvestmentCalculator.tsx";
import Movie from "./pages/Movie.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/finora-login" element={<FinoraLogin />} />
        <Route path="/investment-calculator" element={<InvestmentCalculator />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:imdbId" element={<MovieDetail />} />
      </Routes>
    </>
  )
}