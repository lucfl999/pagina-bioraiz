// ─── BIORAIZ — App entry / Router ───────────────────────────────

function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash && ["home", "feria", "expositores", "programa", "entradas", "participa", "prensa"].includes(hash) ? hash : "home";
  });

  // Sync to hash
  useEffect(() => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  // Handle back/forward
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h && h !== page) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [page]);

  const transparentHeader = page === "home";

  let Page;
  switch (page) {
    case "feria":        Page = PageFeria;       break;
    case "expositores":  Page = PageExpositores; break;
    case "programa":     Page = PagePrograma;    break;
    case "entradas":     Page = PageEntradas;    break;
    case "participa":    Page = PageParticipa;   break;
    case "prensa":       Page = PagePrensa;      break;
    default:             Page = PageHome;
  }

  return (
    <React.Fragment>
      <Header page={page} setPage={setPage} transparent={transparentHeader} />
      <main key={page}>
        <Page setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
