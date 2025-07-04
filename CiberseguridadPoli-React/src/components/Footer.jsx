import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <img
            src="/logo-poli.png"
            alt="Logo Politécnico"
            className="footer-logo"
          />
          <p className="footer-about">
            Institución de Educación Superior comprometida con la excelencia
            académica y la formación de profesionales íntegros.
          </p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="footer-section links">
          <h3>Enlaces rápidos</h3>
          <ul>
            <li>
              <Link to={"/"}>
                <i className="fas fa-chevron-right"></i> Inicio
              </Link>
            </li>
            <li>
              <Link to={"/learning"}>
                <i className="fas fa-chevron-right"></i> Curso
              </Link>
            </li>
            <li>
              <Link to={"/help"}>
                <i className="fas fa-chevron-right"></i> Ayuda
              </Link>
            </li>
            <li>
              <Link to={"/account"}>
                <i className="fas fa-chevron-right"></i> Mi Perfil
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contacto</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> Cl. 48 #7-151, Medellín,
            Antioquia
          </p>
          <p>
            <i className="fas fa-phone"></i> +57 300 123 4567
          </p>
          <p>
            <i className="fas fa-envelope"></i> ciberseguridad@elpoli.edu.co
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2025 Politécnico Colombiano Jaime Isaza Cadavid. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
