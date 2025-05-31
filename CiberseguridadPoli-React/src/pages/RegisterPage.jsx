import { useEffect, useReducer } from "react";
import Form from "./Form";
import Input from "./Input";
import { data, useLocation } from "react-router-dom";
import { submitForm } from "../api/quiz.api";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "first_name":
      return { ...state, first_name: action.payload };
    case "last_name":
      return { ...state, last_name: action.payload };
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "passwordConfirm":
      return { ...state, passwordConfirm: action.payload };
    case "formSubmit":
      {
        action.e.preventDefault();
        console.log(state);
        async function formSubmission() {
          await submitForm(state);
        }
        formSubmission();
      }
      return state;
    default:
      throw new Error("Acción desconocida");
  }
}

const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function RegisterPage() {
  const [
    { first_name, last_name, username, email, password, passwordConfirm },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log(
    first_name,
    last_name,
    username,
    email,
    password,
    passwordConfirm
  );
  const location = useLocation();
  useEffect(
    function () {
      if (location.pathname.startsWith("/registro")) {
        import("../pages_css/css/all.min.css");
        import("../pages_css/css/adminlte.min.css");
        import("../pages_css/css/styles.css");
      }
    },
    [location]
  );
  return (
    <>
      <div className="hold-transition">
        <div className="register-box">
          <div className="card">
            <div className="card-body register-card-body ">
              <img src="/logo.png" className="logo" />
              <p className="login-box-msg">Registrate en CiberseguridadPoli</p>
              <Form dispatch={dispatch}>
                <div className="form-group position-relative">
                  <div className="input-group">
                    <Input
                      type="text"
                      id="firstNames"
                      className="form-control"
                      placeholder="Nombre(s)*"
                      value={first_name}
                      changeEvent={(e) =>
                        dispatch({
                          type: "first_name",
                          payload: e.target.value,
                        })
                      }
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
                    <Input
                      type="text"
                      id="lastNames"
                      className="form-control"
                      placeholder="Apellido(s)*"
                      value={last_name}
                      changeEvent={(e) =>
                        dispatch({
                          type: "last_name",
                          payload: e.target.value,
                        })
                      }
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
                    <Input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Nombre de usuario*"
                      value={username}
                      changeEvent={(e) =>
                        dispatch({
                          type: "username",
                          payload: e.target.value,
                        })
                      }
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
                    <Input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Email*"
                      value={email}
                      changeEvent={(e) =>
                        dispatch({
                          type: "email",
                          payload: e.target.value,
                        })
                      }
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
                    <Input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Contraseña*"
                      value={password}
                      changeEvent={(e) =>
                        dispatch({
                          type: "password",
                          payload: e.target.value,
                        })
                      }
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
                    {/* <input
                      type="password"
                      id="passwordRepeat"
                      className="form-control"
                      placeholder="Repita la contraseña*"
                      disabled={!password.length && true}
                      data-bs-toggle="tooltip"
                      title=""
                      value={passwordConfirm}
                      onChange={(e) => {
                        e.preventDefault(),
                          dispatch({
                            type: "passwordConfirm",
                            payload: e.target.value,
                          });
                      }}
                    /> */}
                    <Input
                      type="password"
                      id="passwordRepeat"
                      className="form-control"
                      placeholder="Repita la contraseña*"
                      disabled={!password.length && true}
                      value={passwordConfirm}
                      toggle="tooltip"
                      changeEvent={(e) => {
                        e.preventDefault(),
                          dispatch({
                            type: "passwordConfirm",
                            payload: e.target.value,
                          });
                      }}
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
                    src={null}
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
              </Form>

              <p className="font-italic text-muted">
                Los campos obligatorios están indicados con *
              </p>

              <a href="login.html" className="text-center">
                Ya estoy registrado
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
