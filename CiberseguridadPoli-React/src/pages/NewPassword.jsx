import Form from "../components/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import useDynamicStyles from "../functions/useDynamicStyles";
import BACKEND_URL from "../functions/urls";

const styleRoutes = ["/styles/adminlte.min.css", "/styles/styles.css"];

const BASE_URL = `${BACKEND_URL}signin/password-reset/`;

const djangoPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
function validPassword(password) {
  return djangoPasswordRegex.test(password);
}
const toolTipDisplay = {
  display: "block",
};
function NewPassword() {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [email, setEmail] = useState("");
  const getRequestURL = BASE_URL + `${uidb64}/${token}`;
  const postRequestURL = getRequestURL;
  useEffect(
    function () {
      async function validateToken() {
        try {
          const response = await axios.get(getRequestURL);
          console.log(response.data);
          setEmail(response.data.email);
        } catch (err) {
          console.log(err);
        }
      }
      validateToken();
    },
    [getRequestURL]
  );
  const [loaded, setLoaded] = useState(false);
  useDynamicStyles(styleRoutes, setLoaded);
  if (!loaded) return;
  function handlePasswordChange(e) {
    e.preventDefault();
    async function emailPost() {
      try {
        const response = await axios.post(postRequestURL, { password });
        console.log(response);
        alert("Contraseña cambiada con éxito");
        navigate("/signin");
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
              Cambiar contraseña para <br />
              {email}
            </p>

            <Form action={(e) => handlePasswordChange(e)}>
              <div className="form-group position-relative">
                <div className="input-group">
                  <Input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña*"
                    value={password}
                    changeEvent={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                  <div
                    className="invalid-tooltip"
                    style={
                      !(password === null) && !validPassword(password)
                        ? toolTipDisplay
                        : {}
                    }
                  >
                    La contraseña debe ser válida.
                  </div>
                </div>
              </div>

              <div className="form-group position-relative">
                <div className="input-group">
                  <Input
                    type="password"
                    className="form-control"
                    placeholder="Repita la contraseña*"
                    disabled={password === null}
                    value={passwordConfirm}
                    toggle="tooltip"
                    changeEvent={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text" id="lockIconContainer">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                  <div
                    className="invalid-tooltip"
                    style={
                      !(passwordConfirm === null) &&
                      passwordConfirm !== password
                        ? toolTipDisplay
                        : {}
                    }
                  >
                    Las contraseñas deben coincidir
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

export default NewPassword;
