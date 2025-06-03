import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Help() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/help")) {
      import("../pages_css/css/stylescursos.css");
      import("../pages_css/css/all.min.css");
    }
  }, [location]);

  return (
    <>
      <Header />
      <div class="content-wrapper">
        <main class="help-container">
          <div class="help-header">
            <h1>
              <i class="fas fa-hands-helping"></i> Centro de Ayuda
            </h1>
            <p>
              Encuentra respuestas a tus preguntas o contacta directamente con
              nuestro equipo de soporte.
            </p>
          </div>

          <div class="help-content">
            <section class="faq-section">
              <div class="section-header">
                <h2>
                  <i class="fas fa-question-circle"></i> Preguntas Frecuentes
                </h2>
                <div class="divider"></div>
              </div>

              <div class="faq-accordion">
                <div class="faq-item">
                  <button class="faq-question">
                    <i class="fas fa-angle-right"></i>
                    <span>¿Cómo me inscribo a los cursos?</span>
                  </button>
                  <div class="faq-answer">
                    <p>
                      Puedes inscribirte directamente desde la página del curso
                      haciendo clic en el botón "Inscribirse". Necesitarás
                      iniciar sesión con tu cuenta institucional del Politécnico
                      (@elpoli.edu.co).
                    </p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question">
                    <i class="fas fa-angle-right"></i>
                    <span>¿Los cursos tienen algún costo?</span>
                  </button>
                  <div class="faq-answer">
                    <p>
                      Actualmente todos nuestros cursos de ciberseguridad son
                      completamente gratuitos para estudiantes activos del
                      Politécnico Colombiano Jaime Isaza Cadavid.
                    </p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question">
                    <i class="fas fa-angle-right"></i>
                    <span>¿Recibiré certificación al completar un curso?</span>
                  </button>
                  <div class="faq-answer">
                    <p>
                      Sí, al completar satisfactoriamente cualquier curso (con
                      un mínimo del 80% de progreso) recibirás un certificado
                      digital con validación institucional que podrás descargar
                      desde tu perfil.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section class="contact-section">
              <div class="section-header">
                <h2>
                  <i class="fas fa-envelope"></i> Formulario de Contacto
                </h2>
                <div class="divider"></div>
              </div>

              <form class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">
                      <i class="fas fa-user"></i> Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Ingresa tu nombre completo"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">
                      <i class="fas fa-envelope"></i> Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="subject">
                      <i class="fas fa-tag"></i> Asunto
                    </label>
                    <select id="subject" name="subject" required>
                      <option value="" disabled selected>
                        Selecciona un tema
                      </option>
                      <option value="technical">Problema técnico</option>
                      <option value="course">Consulta sobre cursos</option>
                      <option value="account">Problema con mi cuenta</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="phone">
                      <i class="fas fa-phone"></i> Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="message">
                    <i class="fas fa-comment"></i> Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Describe tu consulta o problema en detalle..."
                    required
                  ></textarea>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn-primary">
                    <i class="fas fa-paper-plane"></i> Enviar mensaje
                  </button>
                </div>
              </form>
            </section>
          </div>

          <aside class="help-sidebar">
            <div class="support-card">
              <div class="card-header">
                <i class="fas fa-headset"></i>
                <h3>Soporte Técnico</h3>
              </div>
              <div class="support-info">
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <h4>Horario de atención</h4>
                    <p>
                      Lunes a viernes: 8:00 am - 6:00 pm
                      <br />
                      Sábados: 9:00 am - 12:00 m
                    </p>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-phone"></i>
                  <div>
                    <h4>Teléfono</h4>
                    <p>+57 300 123 4567</p>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <div>
                    <h4>Correo electrónico</h4>
                    <p>soporte.ciberseguridad@elpoli.edu.co</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="resources-card">
              <div class="card-header">
                <i class="fas fa-book"></i>
                <h3>Recursos Adicionales</h3>
              </div>
              <ul class="resources-list">
                <li>
                  <a href="#">
                    <i class="fas fa-file-pdf"></i>
                    <span>Manual del estudiante</span>
                    <i class="fas fa-download"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fas fa-video"></i>
                    <span>Tutoriales en video</span>
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fas fa-download"></i>
                    <span>Descargas útiles</span>
                    <i class="fas fa-arrow-down"></i>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Help;
