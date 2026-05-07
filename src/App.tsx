import {Route, Routes} from "react-router-dom";

import Home from "./pages/home/Home.tsx";
import Portfolio from "./pages/portfolio/Portfolio.tsx";

import './App.css'
import Navbar from "./components/NavBar/NavBar.tsx";
import InvestmentCalculator from "./pages/investment/InvestmentCalculator.tsx";
import Movie from "./pages/movie/Movie.tsx";
import MovieDetail from "./pages/movie/MovieDetail.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";
import SignUp from "./pages/AuthPages/SignUp.tsx";
import SignIn from "./pages/AuthPages/SignIn.tsx";
import {ToastProvider} from "./components/ToastProvider/ToastProvider.tsx";
import FinoraPage from "./pages/finora/FinoraPage.tsx";

export default function App() {
  return (
    <ToastProvider>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/finora" element={<FinoraPage />} />
        <Route path="/investment-calculator" element={<InvestmentCalculator />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:imdbId" element={<MovieDetail />} />

        {/* Protected Routes */}

        {/* Handle error and all pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}