import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home.tsx";
import Portfolio from "./pages/portfolio/Portfolio.tsx";

import './App.css'
import Navbar from "./components/NavBar.tsx";
import FinoraLogin from "./pages/FinoraLogin.tsx";
import InvestmentCalculator from "./pages/InvestmentCalculator.tsx";
import Movie from "./pages/Movie.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";
import SignUp from "./pages/signUp/SignUp.tsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/finora-login" element={<FinoraLogin />} />
        <Route path="/investment-calculator" element={<InvestmentCalculator />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:imdbId" element={<MovieDetail />} />

        {/* Protected Routes */}

        {/* Handle error and all pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}