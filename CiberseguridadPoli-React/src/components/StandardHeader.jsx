import { NavLink } from "react-router-dom";
import useDynamicStyles from "../pages/useDynamicStyles";
import { useState } from "react";

function StandardHeader() {
  const [loaded, setLoaded] = useState(false);
  const styleRoutes = ["/styles/stylescursos.css", "/styles/all.min.css"];
  useDynamicStyles(new Set(styleRoutes), setLoaded);
  if (!loaded) return;
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

          <NavLink to={"/help-center"}>
            <i className="fas fa-question-circle"></i> Ayuda
          </NavLink>
        </nav>
        <div className="profile-section">
          <NavLink to={"/signin"} className="profile-btn">
            <div className="profile-icon">
              <i className="fas fa-user"></i>
            </div>
            <span>Iniciar sesión</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default StandardHeader;
