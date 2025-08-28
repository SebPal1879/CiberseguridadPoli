import { Link } from "react-router-dom";
import useStyleUpdate from "../functions/useStyleUpdate";

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Home",
};

function Home() {
  const hasLoadedStyles = useStyleUpdate(styleRoutes);

  if (!hasLoadedStyles) return;
  return (
    <>
      <div className="content-wrapper">
        <main>
          <section className="hero">
            <div className="hero-content">
              <h2>Formación en Ciberseguridad para Ingenieros del Futuro</h2>
              <p className="hero-text">
                Protege lo que más importa en la era digital. Aprende las
                mejores prácticas de seguridad con nuestros cursos
                especializados.
              </p>
              <Link to={"/course"} className="btn-primary">
                <i className="fas fa-arrow-right"></i> Explorar cursos
                disponibles
              </Link>
            </div>
          </section>

          <section className="intro">
            <div className="section-header">
              <h2>
                Bienvenido a nuestra plataforma de concienciación en
                ciberseguridad
              </h2>
              <div className="divider"></div>
            </div>
            <p className="intro-text">
              En el Politécnico Colombiano Jaime Isaza Cadavid, hemos
              desarrollado esta plataforma para fortalecer las competencias
              digitales de nuestros estudiantes de Ingeniería Informática.
              Nuestros cursos combinan teoría fundamentada, ejercicios prácticos
              y simulaciones de escenarios reales para prepararte ante las
              amenazas del mundo digital.
            </p>
          </section>

          <section id="cursos-lista" className="cursos-grid"></section>

          <section id="importancia" className="info-section">
            <div className="section-header">
              <h2>¿Por qué es crucial la ciberseguridad?</h2>
              <div className="divider"></div>
            </div>
            <div className="importance-cards">
              <div className="importance-card">
                <div className="card-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Crecimiento exponencial</h3>
                <p>
                  El mercado de ciberseguridad crecerá un 10% anual hasta 2027,
                  con más de 3.5 millones de empleos sin cubrir.
                </p>
              </div>
              <div className="importance-card">
                <div className="card-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3>Oportunidades laborales</h3>
                <p>
                  Los profesionales en seguridad informática tienen una tasa de
                  empleabilidad del 95% en Latinoamérica.
                </p>
              </div>
              <div className="importance-card">
                <div className="card-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Protección esencial</h3>
                <p>
                  El 43% de los ataques cibernéticos están dirigidos a pequeñas
                  y medianas empresas, muchas sin protección adecuada.
                </p>
              </div>
            </div>
          </section>

          <section id="estadisticas" className="stats-section">
            <div className="section-header">
              <h2>El panorama actual de la ciberseguridad</h2>
              <div className="divider"></div>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">73%</span>
                <p className="stat-text">
                  de las organizaciones han sufrido al menos un incidente de
                  seguridad significativo en el último año
                </p>
              </div>
              <div className="stat-item">
                <span className="stat-number">+300%</span>
                <p className="stat-text">
                  aumento en ataques de ransomware desde 2020
                </p>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <p className="stat-text">
                  de las brechas de seguridad son causadas por error humano
                </p>
              </div>
              <div className="stat-item">
                <span className="stat-number">$4.35M</span>
                <p className="stat-text">
                  es el costo promedio de una violación de datos en 2024
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;
