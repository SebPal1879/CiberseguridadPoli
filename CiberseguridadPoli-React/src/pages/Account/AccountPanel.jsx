import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAccountInfo } from "../../contexts/AccountContext";
import Form from "../../components/Form";
import Input from "../../components/Input";
import AvatarPicker from "../../components/AvatarPicker.jsx";
import { API_URL } from "../../../urls.js";
import { postRequest } from "../../api/access.api";
import useCustomModal from "../../components/CustomModal.jsx";

const BASE_URL = `${API_URL}/signup/change/`;
const PFP_UPLOAD = `${API_URL}/signup/image/`;

function AccountPanel() {
  const { setShowModal, CustomModal } = useCustomModal();
  const [modalText, setModalText] = useState("");

  const {
    level,
    telephoneNumber,
    firstName,
    lastName,
    userName,
    email,
    profilePictureURL,
    id,
    program,
    setResponse,
  } = useAccountInfo();

  const token = localStorage.getItem("ciberpoli_token");
  const imageRef = useRef();

  console.log(imageRef.current);

  const [formLevel, setFormLevel] = useState(level);
  const [formTelephoneNumber, setFormTelephoneNumber] =
    useState(telephoneNumber);

  function handleSubmit(e) {
    e.preventDefault();
    const newData = { level: formLevel, telephone: formTelephoneNumber };

    async function changeAccountInfo() {
      const response = await postRequest(BASE_URL, newData, {
        Authorization: `Token ${token}`,
      });
      switch (response.status) {
        case 200:
          alert("Se ha actualizado la información exitosamente");
          break;
        case 400:
          alert("Hubo un error");
          break;
        default:
          console.log("Respuesta desconocida");
          break;
      }
    }
    changeAccountInfo();
  }

  async function changeProfilePicture(blob) {
    try {
      const formData = new FormData();

      const picture = new File([blob], "image.jpeg", {
        type: "image/jpeg",
      });

      formData.append("picture", picture);

      //formData.append("picture", blob);

      const response = await postRequest(PFP_UPLOAD, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      });
      if (response.status === 200) {
        setResponse((current) => ({
          ...current,
          data: {
            ...current.data,
            user_profile_data: {
              ...current.data?.user_profile_data,
              profile_picture: response.data.user_profile_data,
            },
          },
        }));
        setShowModal(true);
        setModalText("Se ha cambiado la foto de perfil exitosamente");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="content-wrapper">
      <CustomModal>{modalText}</CustomModal>
      <main className="profile-container">
        <section className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {profilePictureURL ? (
                <img
                  src={profilePictureURL}
                  style={{ width: "128px", borderRadius: "50%" }}
                  alt="User profile picture"
                  ref={imageRef}
                />
              ) : (
                <i className="fas fa-user"></i>
              )}
            </div>
            <div className="avatar-actions">
              <AvatarPicker onImageCreationHandler={changeProfilePicture}>
                <div className="btn-avatar-change">
                  <i className="fas fa-camera" type="file"></i>
                </div>
              </AvatarPicker>
            </div>
          </div>
          <div className="profile-info">
            <h2>
              {firstName}
              {` `}
              {lastName}{" "}
            </h2>
            <h5>Usuario: {userName}</h5>
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

            <Form className="profile-form" action={(e) => handleSubmit(e)}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Correo institucional
                  </label>
                  <Input
                    type="email"
                    id="email"
                    defaultValue={email}
                    disabled
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="program">
                    <i className="fas fa-graduation-cap"></i> Programa académico
                  </label>
                  <Input
                    type="text"
                    id="program"
                    defaultValue={program}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="semester">
                    <i className="fas fa-layer-group"></i> Nivel académico
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value)}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(
                      (number) => (
                        <option value={number} key={number}>
                          {number}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Teléfono
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    defaultValue={telephoneNumber}
                    changeEvent={(e) => setFormTelephoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions">
                <Link to="/signin/forgot-password">
                  <button type="button" className="btn-secondary">
                    <i className="fas fa-lock"></i> Cambiar contraseña
                  </button>
                </Link>
                <button type="submit" className="btn-primary">
                  <i className="fas fa-save"></i> Guardar cambios
                </button>
              </div>
            </Form>
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
            <div className="card-header" style={{ display: "flex" }}>
              <i className="fas fa-shield-alt">&nbsp;</i>
              <h3>Seguridad de la Cuenta</h3>
            </div>
            <ul className="security-list">
              <div className="security-item verified">
                <i className="fas fa-check-circle"></i>
                <span>&nbsp;Correo verificado</span>
              </div>
              <div className="security-item warning">
                <i className="fas fa-exclamation-circle"></i>
                <span>
                  &nbsp;Autenticación de dos factores: <strong>Inactiva</strong>
                </span>
                {/* <button className="btn-enable">Activar</button> */}
              </div>
              <div className="security-item">
                <i className="fas fa-clock"></i>
                <span>&nbsp;Último acceso: Hoy, 10:45 am</span>
              </div>
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
                  <span>&nbsp;Primer curso completado</span>
                </div>
              </div>
              <div className="achievement">
                <div className="achievement-icon silver">
                  <i className="fas fa-star"></i>
                  <span>&nbsp;Estudiante destacado</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default AccountPanel;
