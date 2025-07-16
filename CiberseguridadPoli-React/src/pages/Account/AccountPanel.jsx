function AccountPanel({
  id,
  firstName,
  lastName,
  email,
  telephoneNumber,
  program,
  level,
  profilePictureURL,
}) {
  return (
    <div className="content-wrapper">
      <main className="profile-container">
        <section className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="avatar-actions">
              <button className="btn-avatar-change" onClick={() => {}}>
                <i className="fas fa-camera"></i> Cambiar icono
              </button>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="profile-info">
            <h2>
              {firstName}
              {` `}
              {lastName}{" "}
            </h2>
            <div className="profile-meta">
              <span className="profile-role">
                <i className="fas fa-user-tag"></i> Estudiante
              </span>
              <span className="profile-id">
                <i className="fas fa-id-card"></i> ID: {id}
              </span>
            </div>
            <div className="profile-status">
              <span className="status-badge active">
                <i className="fas fa-circle"></i> Activo
              </span>
              <span className="status-date">
                <i className="fas fa-calendar-alt"></i> Miembro desde: Enero
                2023
              </span>
            </div>
          </div>
        </section>

        <div className="profile-content-wrapper">
          <section className="profile-details-section">
            <div className="section-header">
              <h3>
                <i className="fas fa-user-cog"></i> Configuración del Perfil
              </h3>
              <div className="divider"></div>
            </div>

            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Correo institucional
                  </label>
                  <input type="email" id="email" value={email} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Teléfono
                  </label>
                  <input type="tel" id="phone" value={telephoneNumber} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="program">
                    <i className="fas fa-graduation-cap"></i> Programa académico
                  </label>
                  <input type="text" id="program" value={program} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="semester">
                    <i className="fas fa-layer-group"></i> Semestre
                  </label>
                  <input type="text" id="semester" value={level} readOnly />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary">
                  <i className="fas fa-lock"></i> Cambiar contraseña
                </button>
                <button type="submit" className="btn-primary">
                  <i className="fas fa-save"></i> Guardar cambios
                </button>
              </div>
            </form>
          </section>

          <section className="profile-courses-section">
            <div className="section-header">
              <h3>
                <i className="fas fa-book-open"></i> Mis Cursos
              </h3>
              <div className="divider"></div>
            </div>

            <div className="courses-grid">
              <div className="course-card enrolled">
                <div className="course-header">
                  <h4>Protección de Datos Personales</h4>
                  <span className="course-status">En progreso</span>
                </div>
                <div className="course-progress">
                  <div className="progress-bar" style={{ width: "75%" }}>
                    <span>75%</span>
                  </div>
                </div>
                <div className="course-meta">
                  <div className="meta-item">
                    <i className="far fa-calendar-alt"></i>
                    <span>15 Jun - 20 Jul 2025</span>
                  </div>
                  <a
                    href="/frontend/cursos/curso.html?id=1"
                    className="btn-continue"
                  >
                    <i className="fas fa-arrow-right"></i> Continuar
                  </a>
                </div>
              </div>

              <div className="course-card completed">
                <div className="course-header">
                  <h4>Introducción a la Ciberseguridad</h4>
                  <span className="course-status">Completado</span>
                </div>
                <div className="course-progress">
                  <div className="progress-bar" style={{ width: "100%" }}>
                    <span>100%</span>
                  </div>
                </div>
                <div className="course-meta">
                  <div className="meta-item">
                    <i className="fas fa-certificate"></i>
                    <span>Certificado obtenido</span>
                  </div>
                  <a href="#" className="btn-download">
                    <i className="fas fa-download"></i> Descargar
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="profile-sidebar">
          <div className="sidebar-card security-card">
            <div className="card-header">
              <i className="fas fa-shield-alt"></i>
              <h3>Seguridad de la Cuenta</h3>
            </div>
            <ul className="security-list">
              <li className="security-item verified">
                <i className="fas fa-check-circle"></i>
                <span>Correo verificado</span>
              </li>
              <li className="security-item warning">
                <i className="fas fa-exclamation-circle"></i>
                <span>
                  Autenticación de dos factores: <strong>Inactiva</strong>
                </span>
                <button className="btn-enable">Activar</button>
              </li>
              <li className="security-item">
                <i className="fas fa-clock"></i>
                <span>Último acceso: Hoy, 10:45 am</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-card achievements-card">
            <div className="card-header">
              <i className="fas fa-trophy"></i>
              <h3>Logros</h3>
            </div>
            <div className="achievements-grid">
              <div className="achievement">
                <div className="achievement-icon gold">
                  <i className="fas fa-book"></i>
                </div>
                <p>Primer curso completado</p>
              </div>
              <div className="achievement">
                <div className="achievement-icon silver">
                  <i className="fas fa-star"></i>
                </div>
                <p>Estudiante destacado</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default AccountPanel;
