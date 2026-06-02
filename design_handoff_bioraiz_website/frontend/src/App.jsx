import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeriaPage from './pages/FeriaPage';
import ExpositorPage from './pages/ExpositorPage';
import ProgramaPage from './pages/ProgramaPage';
import EntradasPage from './pages/EntradasPage';
import ParticipaPage from './pages/ParticipaPage';
import PrensaPage from './pages/PrensaPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setCurrentPage(hash);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const pages = {
    home: HomePage,
    feria: FeriaPage,
    expositores: ExpositorPage,
    programa: ProgramaPage,
    entradas: EntradasPage,
    participa: ParticipaPage,
    prensa: PrensaPage,
  };

  const CurrentPage = pages[currentPage] || HomePage;

  return (
    <div className="app">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        <CurrentPage onPageChange={handlePageChange} />
      </main>
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
