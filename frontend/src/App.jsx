import { useState, useEffect } from 'react';
import './App.css';
import './styles/main.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeriaPage from './pages/FeriaPage';
import ExpositorPage from './pages/ExpositorPage';
import ProgramaPage from './pages/ProgramaPage';
import EntradasPage from './pages/EntradasPage';
import ParticipaPage from './pages/ParticipaPage';
import PrensaPage from './pages/PrensaPage';

const VALID_PAGES = ["home", "feria", "expositores", "programa", "entradas", "participa", "prensa"];

function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return VALID_PAGES.includes(hash) ? hash : "home";
  });

  useEffect(() => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h && h !== page && VALID_PAGES.includes(h)) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [page]);

  const pages = {
    home: HomePage,
    feria: FeriaPage,
    expositores: ExpositorPage,
    programa: ProgramaPage,
    entradas: EntradasPage,
    participa: ParticipaPage,
    prensa: PrensaPage,
  };

  const CurrentPage = pages[page] || HomePage;

  return (
    <>
      <Header page={page} setPage={setPage} transparent={page === "home"} />
      <main key={page}>
        <CurrentPage setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </>
  );
}

export default App;
