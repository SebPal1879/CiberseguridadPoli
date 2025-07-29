import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { submitLoginForm } from "../api/access.api";
import Form from "../components/Form";
import Input from "../components/Input";
import { useDynamicImports } from "./useDynamicImports";
import useAccessStyles from "./useAccessStyles";

const styleRoutes = ["/styles/adminlte.min.css", "/styles/styles.css"];

function Signin() {
  useAccessStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;

  function submitLogin(e) {
    e.preventDefault();
    async function login(username, password) {
      const formData = { username, password };
      try {
        const response = await submitLoginForm(formData);
        localStorage.setItem("ciberpoli_token", response.data.token);
        alert("Autenticación exitosa.");
        navigate("/course");
      } catch (err) {
        console.log(err);
        alert("Algo salió mal.");
      }
    }
    login(username, password);
  }

  return (
    <div className="login-box">
      <Link to="/">a</Link>
      <div className="card card-outline">
        <div className="card-body">
          <img src="/logo.png" />
          <div className="login-div">
            <h2>¡Bienvenido a Ciberseguridad Poli!</h2>
            <p>Inicia sesión con tu cuenta Institucional</p>
          </div>

          <Form action={(e) => submitLogin(e)}>
            <div className="input-group mb-3">
              <Input
                type="text"
                id="email"
                className="form-control"
                placeholder="Nombre de usuario"
                value={username}
                changeEvent={(e) => setUsername(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-1">
              <Input
                type="password"
                id="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                changeEvent={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div className="mb-3 text-left">
              <Link
                to={"/signin/forgot-password"}
                target="_blank"
                className="small forgot-password"
              >
                Olvidé mi contraseña
              </Link>
            </div>

            <div className="button-container">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Ingresar
                </button>
              </div>
            </div>
          </Form>

          <div className="login-div">
            <p className="mb-0">
              ¿No tienes cuenta?&nbsp;
              <Link className="text-center" to="/signup">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
