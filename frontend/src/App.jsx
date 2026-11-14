import { useEffect, useState } from 'react';
import './navidad/styles.css';
import {
  BZ_ACT_DEFINIDAS,
} from './navidad/data.js';
import { Footer, Header, NAV_LINKS } from './navidad/components.jsx';
import PageActividades from './navidad/PageActividades.jsx';
import PageEdicion1 from './navidad/PageEdicion1.jsx';
import PageExpositores from './navidad/PageExpositores.jsx';
import PageHome from './navidad/PageHome.jsx';
import PageParticipa from './navidad/PageParticipa.jsx';

const PAGES = {
  home: PageHome,
  actividades: PageActividades,
  edicion1: PageEdicion1,
  expositores: PageExpositores,
  participa: PageParticipa,
};

const VALID_PAGES = NAV_LINKS.map(link => link.id);

function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return VALID_PAGES.includes(hash) ? hash : 'home';
  });
  const [role, setRole] = useState(null);

  const navigate = (nextPage, nextRole) => {
    if (!PAGES[nextPage]) return;
    setPage(nextPage);
    setRole(nextRole || null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = window.location.hash.slice(1);
      if (PAGES[nextPage] && nextPage !== page) {
        setPage(nextPage);
        setRole(null);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [page]);

  const CurrentPage = PAGES[page] || PageHome;

  return (
    <>
      <Header page={page} setPage={navigate} transparent={page === 'home'} />
      <main key={page}>
        <CurrentPage setPage={navigate} initialRole={role} definido={BZ_ACT_DEFINIDAS} />
      </main>
      <Footer setPage={navigate} />
    </>
  );
}

export default App;
