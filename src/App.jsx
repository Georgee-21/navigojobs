import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

import ConsoleBar from "./components/ConsoleBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import Contact from "./pages/Contact.jsx";
import SeafarerRegister from "./pages/SeafarerRegister.jsx";
import PostJob from "./pages/PostJob.jsx";
import CompanyRegister from "./pages/CompanyRegister.jsx";

export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <LanguageProvider>
      <div className={`nj-root nj-${theme}`}>
        <ConsoleBar />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register-seafarer" element={<SeafarerRegister />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/register-company" element={<CompanyRegister />} />
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
