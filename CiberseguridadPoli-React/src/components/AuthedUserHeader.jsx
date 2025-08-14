import { NavLink } from "react-router-dom";
import { useAccountInfo } from "../contexts/AccountContext";

function AuthedUserHeader() {
  const { firstName, profilePictureURL } = useAccountInfo();

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
          <NavLink to={"/help-center"}>
            <i className="fas fa-question-circle"></i> Ayuda
          </NavLink>
        </nav>
        <div className="profile-section">
          <NavLink to={"/account"} className="profile-btn">
            <div className="profile-icon">
              {profilePictureURL ? (
                <img
                  src={profilePictureURL}
                  style={{ width: "32px", borderRadius: "50%" }}
                  alt=""
                  srcset=""
                />
              ) : (
                <i className="fas fa-user"></i>
              )}
            </div>
            <span>{firstName}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AuthedUserHeader;
