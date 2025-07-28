import Form from "../components/Form";
import axios from "axios";
import { useDynamicImports } from "./useDynamicImports";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const styleRoutes = ["/styles/adminlte.min.css", "/styles/styles.css"];

const BASE_URL =
  "https://ciberseguridad-poli.vercel.app/signin/request-reset-email/";

function ChangePassword() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;

  function handlePasswordChange(e) {
    e.preventDefault();
    async function emailPost() {
      try {
        const response = await axios.post(BASE_URL, { email });
        console.log(response);
        alert(
          "Si existe el correo en nuestra base de datos, recibirás un enlace para cambiar la contraseña"
        );
      } catch (error) {
        console.log(error);
        alert("Algo salió mal");
      }
    }
    emailPost();
    console.log("acción");
  }
  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card-body">
            <img src="/logo.png" className="logo" />
            <h2>Recuperar contraseña</h2>

            <p className="login-box-msg">
              Ingresa el correo electrónico asociado a tu cuenta para recuperar
              tu contraseña.
            </p>

            <Form action={(e) => handlePasswordChange(e)}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Recuperar contraseña
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
