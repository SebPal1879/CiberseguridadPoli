function RegisterPage() {
  return (
    <>
      <body className="hold-transition register-page">
        <div className="register-box">
          <div className="card">
            <div className="card-body register-card-body ">
              <img src="../../img/logo.png" className="logo" />
              <p className="login-box-msg">Registrate en CiberseguridadPoli</p>

              <form>
                <div className="form-group position-relative">
                  <div className="input-group">
                    <input
                      type="text"
                      id="firstNames"
                      className="form-control"
                      placeholder="Nombre(s)*"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>
                    <div className="invalid-tooltip">
                      Este campo debe tener menos de 30 caracteres
                    </div>
                  </div>
                </div>

                <div className="form-group position-relative">
                  <div className="input-group">
                    <input
                      type="text"
                      id="lastNames"
                      className="form-control"
                      placeholder="Apellido(s)*"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>
                    <div className="invalid-tooltip">
                      Este campo debe tener menos de 30 caracteres
                    </div>
                  </div>
                </div>

                <div className="form-group position-relative">
                  <div className="input-group">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Nombre de usuario*"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user-circle"></span>
                      </div>
                    </div>
                    <div className="invalid-tooltip">
                      El nombre de usuario debe tener menos de 10 caracteres
                    </div>
                  </div>
                </div>

                <div className="form-group position-relative">
                  <div className="input-group">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Email*"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                    <div className="invalid-tooltip">
                      El email debe tener menos de 30 caracteres
                    </div>
                  </div>
                </div>

                <div className="form-group position-relative">
                  <div className="input-group">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Contraseña*"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                    <div className="invalid-tooltip">
                      La contraseña debe tener 15 caracteres
                    </div>
                  </div>
                </div>

                <div className="form-group position-relative">
                  <div className="input-group">
                    <input
                      type="password"
                      id="passwordRepeat"
                      className="form-control"
                      placeholder="Repita la contraseña*"
                      disabled
                      data-bs-toggle="tooltip"
                      title=""
                    />
                    <div className="input-group-append">
                      <div className="input-group-text" id="lockIconContainer">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                    <div className="invalid-tooltip" id="passwordRepeatTooltip">
                      Las contraseñas no coinciden
                    </div>
                  </div>
                </div>

                <div id="avatar-pick" className="input-group mb-3">
                  <input
                    type="file"
                    id="customFile"
                    className="d-none"
                    accept="image/*"
                  />
                  <label
                    htmlFor="customFile"
                    className="btn btn-outline-secondary"
                    id="customFileLabel"
                  >
                    Seleccionar archivo
                  </label>
                  <span id="fileName" className="form-control custom-file-name">
                    Foto de perfil
                  </span>
                </div>

                <div
                  id="drop-area"
                  className="custom-drop-area text-center p-4 border rounded"
                >
                  <p>... o arrastra y suelta una imagen aquí.</p>
                </div>

                <div
                  id="image-container"
                  style={{
                    display: "none",
                    width: "316px",
                    height: "auto",
                    marginTop: "10px",
                  }}
                >
                  <div
                    id="avatar-text"
                    style={{ color: "black", padding: "3px 8px" }}
                  >
                    Avatar
                  </div>
                  <img
                    id="imagePreview"
                    src=""
                    alt="Vista previa"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    id="removeImageButton"
                    type="button"
                    className="btn btn-danger btn-sm"
                    style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
                  >
                    Eliminar imagen
                  </button>
                </div>

                <div className="row">
                  <div className="col-4 mx-auto text-center">
                    <button
                      type="submit"
                      className="btn btn-primary register-btn"
                    >
                      Registrarse
                    </button>
                  </div>
                </div>
              </form>

              <p className="font-italic text-muted">
                Los campos obligatorios están indicados con *
              </p>

              <a href="login.html" className="text-center">
                Ya estoy registrado
              </a>
            </div>
          </div>
        </div>

        <script src="../../js/jquerys/jquery.min.js"></script>
        <script src="../../js/jquerys/bootstrap.bundle.min.js"></script>
        <script src="../../js/jquerys/bs-custom-file-input.min.js"></script>
        <script src="../../js/jquerys/adminlte.min.js"></script>
        <script src="../../js/jquerys/registro.js"></script>
      </body>
    </>
  );
}

export default RegisterPage;
