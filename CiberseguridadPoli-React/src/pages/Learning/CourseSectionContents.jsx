import SectionCard from "./SectionCard";
import CourseSectionAside from "./CourseSectionAside";
import { Link } from "react-router-dom";

function CourseSectionContents({ sections }) {
  return (
    <div>
      <div className="content-wrapper">
        <div className="curso-breadcrumb">
          <Link to={"/course"}>
            <i className="fas fa-arrow-left"></i> Volver al curso
          </Link>

          <h2>Unidades del Programa: Protección de Datos Personales</h2>
        </div>

        <main className="unidades-container">
          <section className="unidades-list">
            {sections.map((element) => (
              <SectionCard data={element} key={element.id} />
            ))}
          </section>
          <CourseSectionAside />
        </main>
      </div>
    </div>
  );
}

export default CourseSectionContents;
