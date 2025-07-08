import { NavLink } from "react-router-dom";

function AuthedUserHeader() {
  return (
    <header className="main-header" style={{ marginBottom: "32px" }}>
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
            <i className="fas fa-book"></i> Curso
          </NavLink>
          <NavLink to={"/history"}>
            <i className="fas fa-bars"></i> Historial
          </NavLink>
          <NavLink to={"/challenges"}>
            <i className="fas fa-check"></i> Desafíos
          </NavLink>
          <NavLink to={"/help"}>
            <i className="fas fa-question-circle"></i> Ayuda
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

export default AuthedUserHeader;
