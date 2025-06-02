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
          <a href="index.html">
            <i className="fas fa-home"></i> Inicio
          </a>
          <a href="curso.html">
            <i className="fas fa-book"></i> Cursos
          </a>
          <a href="ayuda.html">
            <i className="fas fa-question-circle"></i> Ayuda
          </a>
        </nav>
        <div className="profile-section">
          <a href="perfil.html" className="profile-btn">
            <div className="profile-icon">
              <i className="fas fa-user"></i>
            </div>
            <span>Mi Cuenta</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
