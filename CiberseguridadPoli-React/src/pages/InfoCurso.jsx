import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function InfoCurso() {
  const location = useLocation();
  useEffect(
    function () {
      if (location.pathname.startsWith("/course")) {
        import("../pages_css/css/stylescursos.css");
        import("../pages_css/css/all.min.css");
      }
    },
    [location]
  );
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <main className="curso-detail-container">
          <section className="detalle-curso">
            <div className="curso-header">
              <div className="curso-badge">Intermedio</div>
              <h2>Protección de Datos Personales</h2>
              <p className="curso-subtitulo">
                Domina los principios de privacidad y protección de información
              </p>

              <div className="curso-meta">
                <span className="meta-item">
                  <i className="far fa-clock"></i> <strong>Duración:</strong> 4
                  semanas (30 horas totales)
                </span>
                <span className="meta-item">
                  <i className="fas fa-signal"></i> <strong>Nivel:</strong>{" "}
                  Intermedio
                </span>
                <span className="meta-item">
                  <i className="fas fa-certificate"></i>{" "}
                  <strong>Certificación:</strong> Avalado por CiberseguridadPoli
                </span>
                <span className="meta-item">
                  <i className="fas fa-users"></i> <strong>Cupos:</strong>{" "}
                  Limitados
                </span>
              </div>
            </div>

            <div className="curso-content">
              <div className="descripcion-section">
                <h3>
                  <i className="fas fa-info-circle"></i> Descripción del curso
                </h3>
                <p>
                  Este curso integral te preparará para entender y aplicar los
                  principios fundamentales de protección de datos en el entorno
                  digital. Como futuros ingenieros informáticos, es crucial que
                  comprendan no solo los aspectos técnicos sino también los
                  legales y éticos del manejo de información personal. A través
                  de casos prácticos y simulaciones, aprenderás a implementar
                  medidas de seguridad adecuadas en los sistemas que
                  desarrolles.
                </p>
              </div>

              <div className="objetivos-section">
                <h3>
                  <i className="fas fa-bullseye"></i> Objetivos de aprendizaje
                </h3>
                <ul className="objetivos-list">
                  <li>
                    <i className="fas fa-check-circle"></i> Comprender los
                    fundamentos teóricos de la ciberseguridad aplicada
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i> Identificar
                    vulnerabilidades comunes en sistemas informáticos
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i> Implementar medidas
                    de protección efectivas
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i> Desarrollar
                    habilidades prácticas mediante laboratorios virtuales
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i> Aplicar
                    conocimientos en proyectos realistas
                  </li>
                </ul>
              </div>

              <div className="contenido-section">
                <h3>
                  <i className="fas fa-list-ul"></i> Plan de estudios
                </h3>
                <div className="modulos-container">
                  <div className="modulo">
                    <h4>
                      <i className="fas fa-layer-group"></i> Módulo 1:
                      Fundamentos
                    </h4>
                    <ul className="modulo-list">
                      <li>
                        <i className="far fa-dot-circle"></i> Fundamentos
                        teóricos de protección de datos (4 horas)
                      </li>
                      <li>
                        <i className="far fa-dot-circle"></i> Ley 1581 de 2012 y
                        normativa aplicable en Colombia (3 horas)
                      </li>
                      <li>
                        <i className="far fa-dot-circle"></i> Principios de
                        Privacy by Design (2 horas)
                      </li>
                      <li>
                        <i className="far fa-dot-circle"></i> Análisis de riesgo
                        en el tratamiento de datos (3 horas)
                      </li>
                    </ul>
                  </div>
                  <div className="modulo">
                    <h4>
                      <i className="fas fa-chart-line"></i> Módulo 2:
                      Profundización
                    </h4>
                    <ul className="modulo-list">
                      <li>
                        <i className="far fa-dot-circle"></i> Técnicas de
                        anonimización y pseudonimización (3 horas)
                      </li>
                      <li>
                        <i className="far fa-dot-circle"></i> Taller práctico:
                        Evaluación de sistemas existentes (4 horas)
                      </li>
                    </ul>
                  </div>
                  <div className="modulo">
                    <h4>
                      <i className="fas fa-laptop-code"></i> Módulo 3:
                      Aplicación práctica
                    </h4>
                    <ul className="modulo-list">
                      <li>
                        <i className="far fa-dot-circle"></i> Cifrado aplicado a
                        datos personales (3 horas)
                      </li>
                      <li>
                        <i className="far fa-dot-circle"></i> Proyecto final:
                        Diseño de un sistema compliant (6 horas)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="metodologia-section">
                <h3>
                  <i className="fas fa-atom"></i> Metodología
                </h3>
                <div className="metodologia-cards">
                  <div className="metodologia-card">
                    <div className="card-icon">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <h4>Clases interactivas</h4>
                    <p>Sesiones en vivo con expertos en ciberseguridad</p>
                  </div>
                  <div className="metodologia-card">
                    <div className="card-icon">
                      <i className="fas fa-flask"></i>
                    </div>
                    <h4>Laboratorios prácticos</h4>
                    <p>Entornos virtuales para practicar sin riesgos</p>
                  </div>
                  <div className="metodologia-card">
                    <div className="card-icon">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <h4>Proyecto final</h4>
                    <p>Aplicación de conocimientos en un caso real</p>
                  </div>
                  <div className="metodologia-card">
                    <div className="card-icon">
                      <i className="fas fa-comments"></i>
                    </div>
                    <h4>Foros de discusión</h4>
                    <p>Interacción con compañeros y profesores</p>
                  </div>
                </div>
              </div>

              <div className="instructor-section">
                <h3>
                  <i className="fas fa-chalkboard-teacher"></i> Equipo docente
                </h3>
                <div className="instructors-grid">
                  <div className="instructor-card">
                    <div className="instructor-avatar">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="instructor-info">
                      <h4>Dr. Carlos Andrés Ramírez</h4>
                      <p className="instructor-title">
                        PhD en Seguridad Informática
                      </p>
                      <p className="instructor-bio">
                        Más de 15 años de experiencia en seguridad ofensiva y
                        defensiva. Ex consultor de INTERPOL en cibercrimen.
                        Certificaciones: CISSP, OSCP, CEH.
                      </p>
                      <div className="instructor-social">
                        <a href="#">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-github"></i>
                        </a>
                        <a href="#">
                          <i className="fas fa-globe"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="instructor-card">
                    <div className="instructor-avatar">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="instructor-info">
                      <h4>Ing. Laura Gómez</h4>
                      <p className="instructor-title">
                        Especialista en Forense Digital
                      </p>
                      <p className="instructor-bio">
                        Experta en análisis forense e inteligencia de amenazas.
                        Líder del equipo de respuesta a incidentes en una
                        entidad financiera. Certificaciones: GCFA, GNFA.
                      </p>
                      <div className="instructor-social">
                        <a href="#">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="evaluacion-section">
                <h3>
                  <i className="fas fa-clipboard-check"></i> Sistema de
                  evaluación
                </h3>
                <div className="evaluacion-grid">
                  <div className="evaluacion-item">
                    <div className="evaluacion-icon">
                      <i className="fas fa-tasks"></i>
                    </div>
                    <div className="evaluacion-content">
                      <h4>Quizzes y tests</h4>
                      <p>
                        Evaluaciones periódicas para medir comprensión de
                        conceptos (30%)
                      </p>
                    </div>
                  </div>
                  <div className="evaluacion-item">
                    <div className="evaluacion-icon">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <div className="evaluacion-content">
                      <h4>Laboratorios prácticos</h4>
                      <p>Ejercicios en entornos controlados (40%)</p>
                    </div>
                  </div>
                  <div className="evaluacion-item">
                    <div className="evaluacion-icon">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <div className="evaluacion-content">
                      <h4>Proyecto final</h4>
                      <p>Aplicación integral de conocimientos (30%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="curso-actions">
              <button className="btn-primary btn-inscribirse">
                <i className="fas fa-user-plus"></i> Inscribirse ahora
              </button>
              <a href="unidades.html" className="btn-secondary">
                <i className="fas fa-list-ul"></i> Ver unidades del programa
              </a>
              <button className="btn-tertiary">
                <i className="far fa-question-circle"></i> ¿Tienes preguntas?
              </button>
            </div>
          </section>

          <aside className="curso-sidebar">
            <div className="sidebar-card">
              <h4>
                <i className="fas fa-calendar-alt"></i> Próximas fechas
              </h4>
              <div className="fechas-container">
                <div className="fecha-item">
                  <div className="fecha-icon">
                    <i className="far fa-calendar"></i>
                  </div>
                  <div className="fecha-content">
                    <h5>Inicio:</h5>
                    <p>15 de junio, 2025</p>
                  </div>
                </div>
                <div className="fecha-item">
                  <div className="fecha-icon">
                    <i className="far fa-calendar-check"></i>
                  </div>
                  <div className="fecha-content">
                    <h5>Fin:</h5>
                    <p>20 de julio, 2025</p>
                  </div>
                </div>
                <div className="fecha-item">
                  <div className="fecha-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="fecha-content">
                    <h5>Horario:</h5>
                    <p>Martes y jueves, 6:00pm - 9:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h4>
                <i className="fas fa-graduation-cap"></i> Requisitos
              </h4>
              <ul className="requirements-list">
                <li>
                  <i className="fas fa-check"></i> Conocimientos básicos de
                  informática
                </li>
                <li>
                  <i className="fas fa-check"></i> Acceso a computador con 4GB
                  RAM mínimo
                </li>
                <li>
                  <i className="fas fa-check"></i> Conexión estable a internet
                </li>
                <li>
                  <i className="fas fa-check"></i> Cuenta institucional
                  @elpoli.edu.co
                </li>
                <li>
                  <i className="fas fa-check"></i> Dedicación de 5 horas
                  semanales
                </li>
              </ul>
            </div>

            <div className="sidebar-card benefits-card">
              <h4>
                <i className="fas fa-award"></i> Beneficios
              </h4>
              <ul className="benefits-list">
                <li>
                  <i className="fas fa-star"></i> Acceso ilimitado a
                  laboratorios virtuales
                </li>
                <li>
                  <i className="fas fa-star"></i> Sesiones de mentoría
                  personalizada
                </li>
                <li>
                  <i className="fas fa-star"></i> Material didáctico exclusivo
                </li>
                <li>
                  <i className="fas fa-star"></i> Certificado digital con
                  tecnología blockchain
                </li>
                <li>
                  <i className="fas fa-star"></i> Acceso a comunidad de
                  egresados
                </li>
                <li>
                  <i className="fas fa-star"></i> Bolsa de empleo especializada
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h4>
                <i className="fas fa-chart-line"></i> Resultados esperados
              </h4>
              <div className="resultados-chart">
                <div className="chart-item">
                  <div
                    className="chart-bar"
                    style={{
                      width: "90%",
                      backgroundColor: "var(--verde-claro)",
                    }}
                  ></div>
                  <span>90%</span>
                  <p>Habilidad para identificar vulnerabilidades</p>
                </div>
                <div className="chart-item">
                  <div
                    className="chart-bar"
                    style={{
                      width: "85%",
                      backgroundColor: "var(--verde-oscuro)",
                    }}
                  ></div>
                  <span>85%</span>
                  <p>Capacidad para implementar contramedidas</p>
                </div>
                <div className="chart-item">
                  <div
                    className="chart-bar"
                    style={{
                      width: "85%",
                      backgroundColor: "var(--amarillo)",
                    }}
                  ></div>
                  <span>80%</span>
                  <p>Comprensión de normativas legales</p>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <section className="related-courses">
          <h3>
            <i className="fas fa-book-open"></i> Cursos relacionados
          </h3>
          <div className="related-grid">
            <div className="related-card">
              <div className="related-badge">Avanzado</div>
              <h4>Seguridad en Desarrollo Web</h4>
              <p>
                Aprende a construir aplicaciones web seguras desde su
                concepción.
              </p>
              <div className="related-meta">
                <span>
                  <i className="far fa-clock"></i> 6 semanas
                </span>
                <a href="curso-seguridad-web.html" className="btn-related">
                  Ver detalles <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="related-card">
              <div className="related-badge">Intermedio</div>
              <h4>Introducción a la Criptografía</h4>
              <p>
                Fundamentos matemáticos y aplicaciones prácticas de la
                criptografía.
              </p>
              <div className="related-meta">
                <span>
                  <i className="far fa-clock"></i> 4 semanas
                </span>
                <a href="curso-criptografia.html" className="btn-related">
                  Ver detalles <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="related-card">
              <div className="related-badge">Avanzado</div>
              <h4>Forense Digital</h4>
              <p>Técnicas para investigación de incidentes de seguridad.</p>
              <div className="related-meta">
                <span>
                  <i className="far fa-clock"></i> 5 semanas
                </span>
                <a href="curso-forense.html" className="btn-related">
                  Ver detalles <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h3>
            <i className="fas fa-quote-left"></i> Testimonios de estudiantes
          </h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div>
                  <h5>María Fernanda López</h5>
                  <p>Ing. Informática - 8vo semestre</p>
                </div>
              </div>
              <div className="testimonial-content">
                <p>
                  "Los conocimientos adquiridos en este curso me permitieron
                  conseguir mi primera práctica profesional en el área de
                  seguridad. Los laboratorios son excepcionales!"
                </p>
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div>
                  <h5>Juan David Martínez</h5>
                  <p>Ing. Informática - Egresado</p>
                </div>
              </div>
              <div className="testimonial-content">
                <p>
                  "La metodología práctica y los instructores con experiencia
                  real en el campo hacen que este curso sea invaluable para
                  cualquier estudiante de ingeniería."
                </p>
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default InfoCurso;
