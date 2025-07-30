import Footer from "../../components/Footer";
import HelpItem from "./HelpItem";

const faq = [
  {
    question: "¿Cómo me inscribo a los cursos?",
    answer: `Puedes inscribirte directamente desde la página del curso
                      haciendo clic en el botón "Inscribirse". Necesitarás
                      iniciar sesión con tu cuenta institucional del Politécnico
                      (@elpoli.edu.co).`,
  },
  {
    question: "¿Los cursos tienen algún costo?",
    answer: ` Actualmente todos nuestros cursos de ciberseguridad son
                      completamente gratuitos para estudiantes activos del
                      Politécnico Colombiano Jaime Isaza Cadavid.`,
  },
  {
    question: "¿Recibiré certificación al completar un curso?",
    answer: ` Sí, al completar satisfactoriamente cualquier curso (con
                      un mínimo del 80% de progreso) recibirás un certificado
                      digital con validación institucional que podrás descargar
                      desde tu perfil.`,
  },
];

function HelpCenter() {
  return (
    <>
      <div className="content-wrapper">
        <main className="help-container">
          <div className="help-header">
            <h1>
              <i className="fas fa-hands-helping"></i> Centro de Ayuda
            </h1>
            <p>
              Encuentra respuestas a tus preguntas o contacta directamente con
              nuestro equipo de soporte.
            </p>
          </div>

          <div className="help-content">
            <section className="faq-section">
              <div className="section-header">
                <h2>
                  <i className="fas fa-question-circle"></i> Preguntas
                  Frecuentes
                </h2>
                <div className="divider"></div>
              </div>

              <div className="faq-accordion">
                {faq.map((element) => (
                  <HelpItem
                    question={element.question}
                    answer={element.answer}
                  />
                ))}
              </div>
            </section>

            <section className="contact-section">
              <div className="section-header">
                <h2>
                  <i className="fas fa-envelope"></i> Formulario de Contacto
                </h2>
                <div className="divider"></div>
              </div>

              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="fas fa-user"></i> Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Ingresa tu nombre completo"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i> Correo electrónico
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject">
                      <i className="fas fa-tag"></i> Asunto
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
                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="fas fa-phone"></i> Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <i className="fas fa-comment"></i> Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Describe tu consulta o problema en detalle..."
                    required
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    <i className="fas fa-paper-plane"></i> Enviar mensaje
                  </button>
                </div>
              </form>
            </section>
          </div>

          <aside className="help-sidebar">
            <div className="support-card">
              <div className="card-header">
                <i className="fas fa-headset"></i>
                <h3>Soporte Técnico</h3>
              </div>
              <div className="support-info">
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h4>Horario de atención</h4>
                    <p>
                      Lunes a viernes: 8:00 am - 6:00 pm
                      <br />
                      Sábados: 9:00 am - 12:00 m
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Teléfono</h4>
                    <p>+57 300 123 4567</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Correo electrónico</h4>
                    <p>soporte.ciberseguridad@elpoli.edu.co</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="resources-card">
              <div className="card-header">
                <i className="fas fa-book"></i>
                <h3>Recursos Adicionales</h3>
              </div>
              <ul className="resources-list">
                <li>
                  <a href="#">
                    <i className="fas fa-file-pdf"></i>
                    <span>Manual del estudiante</span>
                    <i className="fas fa-download"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fas fa-video"></i>
                    <span>Tutoriales en video</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fas fa-download"></i>
                    <span>Descargas útiles</span>
                    <i className="fas fa-arrow-down"></i>
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

export default HelpCenter;
