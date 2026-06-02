export const Header = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'feria', label: 'La Feria' },
    { id: 'expositores', label: 'Expositores' },
    { id: 'programa', label: 'Programa' },
    { id: 'entradas', label: 'Entradas' },
    { id: 'participa', label: 'Participá' },
    { id: 'prensa', label: 'Prensa' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="logo">BIORAIZ</div>
        <nav className="nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
