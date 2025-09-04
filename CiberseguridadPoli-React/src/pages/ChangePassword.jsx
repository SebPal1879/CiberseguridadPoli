import Form from "../components/Form";
import { useState } from "react";
import { API_URL } from "../../urls.js";
import useStyleUpdate from "../functions/useStyleUpdate";
import BackButton from "../components/BackButton";
import { postRequest } from "../api/access.api";
const styleRoutes = {
  styleRoutes: [
    "/styles/adminlte.min.css",
    "/styles/styles.css",
    "/styles/all.min.css",
  ],
  requester: "ChangePassword",
};

const BASE_URL = `${API_URL}/signin/request-reset-email/`;

function ChangePassword() {
  const hasLoadedStyles = useStyleUpdate(styleRoutes);
  const [email, setEmail] = useState("");
  if (!hasLoadedStyles) return;

  function handlePasswordChange(e) {
    e.preventDefault();
    async function emailPost() {
      try {
        const response = await postRequest(BASE_URL, { email });
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

            <BackButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
