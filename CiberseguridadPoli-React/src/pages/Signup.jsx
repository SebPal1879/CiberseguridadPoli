import { useReducer, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { submitRegisterForm } from "../api/access.api";
import InputGroup from "./InputGroup";
import { useDynamicImports } from "./useDynamicImports";

const emailRegex = /^[a-zA-Z0-9._%+-]+@elpoli\.edu\.co$/;
const djangoPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function validEmail(email) {
  return emailRegex.test(email);
}

function validPassword(password) {
  return djangoPasswordRegex.test(password);
}

function notEmptyValidation(field) {
  if (!field.length) return false;
  return true;
}

function reducer(state, action) {
  switch (action.type) {
    case "first_name":
      return {
        ...state,
        first_name: action.payload,
        validFirstName: notEmptyValidation(action.payload),
      };
    case "last_name":
      return {
        ...state,
        last_name: action.payload,
        validLastName: notEmptyValidation(action.payload),
      };
    case "username":
      return {
        ...state,
        username: action.payload,
        validUserName: notEmptyValidation(action.payload),
      };
    case "email":
      return {
        ...state,
        email: action.payload,
        validEmail: validEmail(action.payload),
      };
    case "password":
      return {
        ...state,
        password: action.payload,
        validPassword: validPassword(action.payload),
      };
    case "passwordConfirm":
      return { ...state, passwordConfirm: action.payload };
    case "formSubmit":
      {
        action.e.preventDefault();
        if (
          state.validFirstName &&
          state.validLastName &&
          state.validEmail &&
          state.validUserName &&
          state.validPassword
        ) {
          async function formSubmission() {
            const formResponse = await submitRegisterForm(state);
            if (formResponse.status == 201) {
              localStorage.setItem("ciberpoli_token", formResponse.data.token);
            }
            alert("Cuenta creada con éxito");
            action.navigate("/");
          }
          formSubmission();
        } else {
          alert("Faltan campos por diligenciar.");
        }
      }
      return state;
    default:
      throw new Error("Acción desconocida");
  }
}

const initialState = {
  first_name: "",
  validFirstName: null,
  last_name: "",
  validLastName: null,
  username: "",
  validUserName: null,
  email: "",
  validEmail: "",
  password: "",
  validPassword: "",
  passwordConfirm: "",
};

const styleRoutes = ["/styles/styles.css", "/styles/adminlte.min.css"];

function Signup() {
  const navigate = useNavigate();

  const toolTipDisplay = {
    display: "block",
  };
  const [
    {
      first_name,
      validFirstName,
      last_name,
      validLastName,
      username,
      validUserName,
      email,
      validEmail,
      password,
      validPassword,
      passwordConfirm,
    },
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
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;

  return (
    <>
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body ">
            <img src="/logo.png" />
            <p className="login-box-msg">Registrate en CiberseguridadPoli</p>
            <Form action={(e) => dispatch({ type: "formSubmit", e, navigate })}>
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
                  <div
                    className="invalid-tooltip"
                    style={
                      !(validFirstName == null) && !validFirstName
                        ? toolTipDisplay
                        : {}
                    }
                  >
                    El nombre no debe ir vacío.
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
                  <div
                    className="invalid-tooltip"
                    style={
                      !(validLastName == null) && !validLastName
                        ? toolTipDisplay
                        : {}
                    }
                  >
                    El nombre no debe ir vacío.
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
                  <div
                    className="invalid-tooltip"
                    style={
                      !(validUserName == null) && !validUserName
                        ? toolTipDisplay
                        : {}
                    }
                  >
                    El nombre de usuario no debe ir vacío.
                  </div>
                </div>
              </div>

              <div className="form-group position-relative">
                <InputGroup>
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
                  <div
                    className="invalid-tooltip"
                    style={email.length && !validEmail ? toolTipDisplay : {}}
                  >
                    Debe ser una dirección de correo válida del Poli.
                  </div>
                </InputGroup>
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
                  <div
                    className="invalid-tooltip"
                    style={
                      password.length && !validPassword ? toolTipDisplay : {}
                    }
                  >
                    La contraseña debe ser válida.
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
                  <div
                    className="invalid-tooltip"
                    style={
                      password != passwordConfirm && passwordConfirm.length > 0
                        ? toolTipDisplay
                        : {}
                    }
                  >
                    Las contraseñas deben coincidir
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

            <Link to="/signin" className={"text-center"}>
              Ya estoy registrado
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
