const cursos = [
    {
      id: 1,
      titulo: "Protección de Datos Personales",
      subtitulo: "Domina los principios de privacidad y protección de información",
      descripcion: "Este curso integral te preparará para entender y aplicar los principios fundamentales de protección de datos en el entorno digital. Como futuros ingenieros informáticos, es crucial que comprendan no solo los aspectos técnicos sino también los legales y éticos del manejo de información personal. A través de casos prácticos y simulaciones, aprenderás a implementar medidas de seguridad adecuadas en los sistemas que desarrolles.",
      contenido: [
        "Fundamentos teóricos de protección de datos (4 horas)",
        "Ley 1581 de 2012 y normativa aplicable en Colombia (3 horas)",
        "Principios de Privacy by Design (2 horas)",
        "Análisis de riesgo en el tratamiento de datos (3 horas)",
        "Técnicas de anonimización y pseudonimización (3 horas)",
        "Taller práctico: Evaluación de sistemas existentes (4 horas)",
        "Cifrado aplicado a datos personales (3 horas)",
        "Proyecto final: Diseño de un sistema compliant (6 horas)"
      ],
      duracion: "4 semanas (30 horas totales)",
      nivel: "Intermedio",
      destacado: true
    },
    {
      id: 2,
      titulo: "Seguridad en Redes Sociales",
      subtitulo: "Estrategias avanzadas para protección en plataformas digitales",
      descripcion: "En este curso analizaremos las vulnerabilidades específicas de las principales plataformas sociales desde una perspectiva técnica. Como ingenieros, van más allá del usuario común: entenderán cómo funcionan estos sistemas por dentro, sus puntos débiles y cómo explotarlos (ética y legalmente) para mejorar sus defensas. Incluye laboratorios prácticos con herramientas profesionales.",
      contenido: [
        "Arquitectura de redes sociales: cómo almacenan y procesan datos (4 horas)",
        "OWASP Top 10 aplicado a redes sociales (3 horas)",
        "Ingeniería social: técnicas y contramedidas (3 horas)",
        "API Security: riesgos en integraciones (3 horas)",
        "Laboratorio: Análisis de tráfico en apps sociales (4 horas)",
        "Configuración segura para desarrolladores (2 horas)",
        "Automatización de seguridad con Python (4 horas)",
        "Proyecto: Auditoría de una plataforma real (7 horas)"
      ],
      duracion: "5 semanas (35 horas totales)",
      nivel: "Avanzado",
      destacado: true
    },
    {
      id: 3,
      titulo: "Introducción a la Criptografía",
      subtitulo: "Fundamentos matemáticos y aplicaciones prácticas",
      descripcion: "Curso esencial que cubre los conceptos criptográficos que todo ingeniero informático debe dominar. Desde los algoritmos clásicos hasta las últimas tendencias en criptografía post-cuántica, con implementaciones prácticas en Python para fijar los conocimientos.",
      contenido: [
        "Historia y conceptos básicos (3 horas)",
        "Criptografía simétrica: AES, DES (4 horas)",
        "Criptografía asimétrica: RSA, ECC (5 horas)",
        "Funciones hash y aplicaciones (3 horas)",
        "PKI y certificados digitales (4 horas)",
        "Taller: Implementación en Python (6 horas)",
        "Introducción a criptografía post-cuántica (2 horas)",
        "Retos CTF aplicados (3 horas)"
      ],
      duracion: "4 semanas (30 horas totales)",
      nivel: "Intermedio"
    },
    {
      id: 4,
      titulo: "Seguridad en Desarrollo Web",
      subtitulo: "Construye aplicaciones seguras desde el primer día",
      descripcion: "Este curso práctico te enseñará a identificar y mitigar las vulnerabilidades más comunes en aplicaciones web. Trabajarás con herramientas profesionales como Burp Suite y OWASP ZAP mientras aprendes metodologías de testing de seguridad.",
      contenido: [
        "OWASP Top 10 2024: análisis detallado (4 horas)",
        "Inyecciones SQL y NoSQL (4 horas)",
        "Gestión segura de sesiones (3 horas)",
        "Configuración segura de headers HTTP (2 horas)",
        "Taller con Burp Suite (5 horas)",
        "Seguridad en APIs REST (4 horas)",
        "Automatización de pruebas de seguridad (4 horas)",
        "Proyecto: Auditoría completa a una web app (8 horas)"
      ],
      duracion: "6 semanas (40 horas totales)",
      nivel: "Avanzado"
    }
  ];
  
  function renderizarCursos() {
    const contenedor = document.getElementById('cursos-lista');
    if (contenedor) {
      cursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = `curso-card ${curso.destacado ? 'destacado' : ''}`;
        card.innerHTML = `
          <div class="curso-badge">${curso.nivel}</div>
          <h3>${curso.titulo}</h3>
          <p>${curso.subtitulo}</p>
          <div class="curso-footer">
            <span class="duracion">⏱️ ${curso.duracion}</span>
            <a href="curso.html?id=${curso.id}" class="btn-ver-curso">Ver detalles</a>
          </div>
        `;
        contenedor.appendChild(card);
      });
    }
  }
  
  function cargarDetalleCurso() {
    if (window.location.pathname.includes("curso.html")) {
      const params = new URLSearchParams(window.location.search);
      const cursoId = parseInt(params.get("id"));
      const curso = cursos.find(c => c.id === cursoId);
  
      if (curso) {
        document.title = `${curso.titulo} | Politécnico Colombiano`;
        document.querySelector('meta[name="description"]').setAttribute('content', curso.descripcion.substring(0, 160));
  
        document.getElementById("curso-titulo").textContent = curso.titulo;
        document.getElementById("curso-subtitulo").textContent = curso.subtitulo;
        document.getElementById("curso-descripcion").textContent = curso.descripcion;
        document.getElementById("curso-duracion").textContent = curso.duracion;
        document.getElementById("curso-nivel").textContent = curso.nivel;
  
        const listaContenido = document.getElementById("curso-contenido");
        listaContenido.innerHTML = '';
        curso.contenido.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          listaContenido.appendChild(li);
        });
  
        const breadcrumbs = document.querySelector('.breadcrumbs');
        if (breadcrumbs) {
          breadcrumbs.innerHTML += ` <span>></span> <a href="curso.html?id=${curso.id}">${curso.titulo}</a>`;
        }
      } else {
        window.location.href = 'index.html';
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    renderizarCursos();
    cargarDetalleCurso();
    
    const cards = document.querySelectorAll('.curso-card, .importance-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  });
  
  document.querySelector('.footer-bottom').innerHTML = `&copy; ${new Date().getFullYear()} Pol