export const Footer = ({ onPageChange }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BIORAIZ</h3>
            <p>Feria sustentable de la Patagonia</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: hola@bioraiz.net</p>
            <p>Teléfono: +54 9 299 XXX-XXXX</p>
          </div>
          <div className="footer-section">
            <h4>Redes</h4>
            <ul>
              <li><a href="https://instagram.com/bioraiz" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com/bioraiz" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 BIORAIZ. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
