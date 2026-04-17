import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home.tsx";
import Portfolio from "./pages/Portfolio.tsx";

import './App.css'
import Navbar from "./components/NavBar.tsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </>
  )
}