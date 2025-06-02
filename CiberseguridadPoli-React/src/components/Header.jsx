import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <div className="titles">
            <h1>CiberseguridadPoli</h1>
            <p>Facultad de Ingeniería Informática</p>
          </div>
        </div>
        <nav className="navbar">
          <NavLink to={"/"}>
            <i className="fas fa-home"></i> Inicio
          </NavLink>
          <NavLink to={"/learning"}>
            <i className="fas fa-home"></i> Curso
          </NavLink>
          <NavLink to={"/help"}>
            <i className="fas fa-home"></i> Ayuda
          </NavLink>
        </nav>
        <div className="profile-section">
          <NavLink to={"/account"} className="profile-btn">
            <div className="profile-icon">
              <i className="fas fa-user"></i>
            </div>
            <span>Mi Cuenta</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
