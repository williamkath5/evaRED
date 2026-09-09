/* ===================================================
   evaRED · SPA navigation + interactions
   =================================================== */
(function () {
  'use strict';

  /* ---------- DATA: 6 modelos ---------- */
  const MODELS = [
    {
      name: 'LORI',
      sub: 'Learning Object Review Instrument',
      descripcion: 'Instrumento de revisión entre pares creado por Nesbit, Belfer y Leacock (2002) para evaluar objetos de aprendizaje digitales mediante 9 criterios estandarizados. Ampliamente adoptado en repositorios educativos internacionales.',
      criterios: ['Calidad de los contenidos', 'Alineación de objetivos de aprendizaje', 'Retroalimentación y adaptabilidad', 'Motivación', 'Presentación visual', 'Usabilidad de la interacción', 'Accesibilidad', 'Reusabilidad', 'Cumplimiento de estándares'],
      metrica: 'Escala Likert 1–5 (1 = Muy bajo, 5 = Muy alto) por criterio. Puntuación máxima: 45 puntos.',
      metodologia: 'Revisión colaborativa entre pares (peer review) mediante cuestionario estructurado. Cada evaluador puntúa y los resultados se promedian.',
      instrumento: 'Cuestionario de 9 ítems con rúbrica descriptiva por nivel para cada criterio.'
    },
    {
      name: 'COdA',
      sub: 'Herramienta de Evaluación de la Calidad de OA',
      descripcion: 'Desarrollado por Fernández-Pampillón, Domínguez y Armas (UCM, 2012), evalúa la calidad de Objetos de Aprendizaje desde dos dimensiones: didáctica y tecnológica. Es uno de los más utilizados en el contexto hispanohablante.',
      criterios: ['Dimensión Didáctica (5): Identificación, Aspectos pedagógicos, Contenido, Interactividad, Competencias', 'Dimensión Tecnológica (5): Accesibilidad, Reusabilidad, Interoperabilidad, Metadatos, Derechos'],
      metrica: 'Escala 1–5 por ítem. Puntuación máxima: 50 puntos. Umbral de calidad: ≥ 35/50 (70%).',
      metodologia: 'Evaluación experta mediante plantilla Excel oficial disponible en UCM. Doble evaluación didáctica y tecnológica.',
      instrumento: 'Plantilla Excel con 10 criterios descriptivos, ponderación y cálculo automático.'
    },
    {
      name: 'Norma UNE 71362:2020',
      sub: 'Calidad de los materiales educativos digitales (AENOR)',
      descripcion: 'Norma española (AENOR) que establece los requisitos de calidad para materiales educativos digitales en entornos de aprendizaje. Referencia normativa de obligatorio cumplimiento en contextos de educación formal en España y adoptada en Latinoamérica.',
      criterios: ['Eficacia pedagógica', 'Eficiencia técnica', 'Usabilidad', 'Accesibilidad', 'Portabilidad', 'Mantenibilidad', 'Seguridad', 'Metadatos', 'Aspectos legales'],
      metrica: '% de conformidad por dimensión. Nivel mínimo aceptable: 70% de conformidad global.',
      metodologia: 'Auditoría de conformidad basada en lista de verificación normativa. Revisión técnica y pedagógica.',
      instrumento: 'Checklist de conformidad por dimensión con evidencias documentales.'
    },
    {
      name: 'FURPS',
      sub: 'Functionality · Usability · Reliability · Performance · Supportability',
      descripcion: 'Desarrollado por Robert Grady y Caswell (1987) en Hewlett-Packard. Acrónimo de los 5 factores de calidad de software aplicables a RED: Functionality, Usability, Reliability, Performance, Supportability.',
      criterios: ['F — Funcionalidad (características y capacidades)', 'U — Usabilidad (facilidad de uso, estética, documentación)', 'R — Confiabilidad (frecuencia de fallos, recuperabilidad)', 'P — Desempeño (velocidad de respuesta, throughput)', 'S — Soporte (extensibilidad, adaptabilidad, mantenimiento)'],
      metrica: 'Matriz de evaluación con escala cualitativa (Deficiente / Aceptable / Bueno / Excelente) o cuantitativa según adaptación del evaluador.',
      metodologia: 'Inspección técnica del software educativo mediante lista de comprobación por factor. Orientada a ingeniería de software educativo.',
      instrumento: 'Lista de comprobación por dimensión FURPS con evidencias de verificación.'
    },
    {
      name: 'Modelo McCall',
      sub: 'McCall, Richards y Walters (1977)',
      descripcion: 'Propuesto por Jim McCall, Paul Richards y Gene Walters (1977) para el Departamento de Defensa de EE. UU. Define 11 factores de calidad del software organizados en 3 perspectivas del usuario final aplicables a RED.',
      criterios: ['Operación (5): Corrección, Fiabilidad, Eficiencia, Integridad, Usabilidad', 'Revisión (3): Mantenibilidad, Flexibilidad, Facilidad de prueba', 'Transición (3): Portabilidad, Reusabilidad, Interoperabilidad'],
      metrica: 'Escala 0–10 por factor con métricas primitivas de software. Puntuación compuesta ponderada.',
      metodologia: 'Descomposición jerárquica del factor en criterios y métricas. Evaluación técnica cuantitativa.',
      instrumento: 'Árbol de calidad con métricas primitivas y fórmulas de cálculo ponderadas.'
    },
    {
      name: 'Modelo Boehm',
      sub: 'Barry Boehm (1978)',
      descripcion: 'Propuesto por Barry Boehm (1978) como modelo jerárquico de calidad de software. Introduce la distinción entre características primarias (para diferentes tipos de usuarios) y establece una taxonomía de atributos de calidad con enfoque en las necesidades del usuario.',
      criterios: ['Características primarias: Utilidad general, Mantenibilidad, Portabilidad', 'Sub-características de utilidad: Confiabilidad, Eficiencia, Ingeniería humana (usabilidad), Testabilidad, Comprensibilidad, Modificabilidad'],
      metrica: 'Árbol jerárquico de características con métricas primitivas. Evaluación cualitativa-cuantitativa ponderada según contexto.',
      metodologia: 'Evaluación estructurada mediante árbol de atributos de calidad con métricas derivadas. Orientada a desarrolladores y mantenedores de software.',
      instrumento: 'Árbol de calidad de Boehm con lista de verificación por nivel de característica.'
    }
  ];

  const TAB_DEFS = [
    { key: 'descripcion', label: 'Descripción' },
    { key: 'criterios', label: 'Criterios' },
    { key: 'metrica', label: 'Métrica' },
    { key: 'metodologia', label: 'Metodología' },
    { key: 'instrumento', label: 'Instrumento' }
  ];

  /* ---------- DATA: RED ---------- */
  const REDS = [
    {
      name: 'W3Schools Python Tutorial',
      tag: 'Clases, Objetos y Herencia',
      fields: [
        ['Nombre', 'W3Schools Python Tutorial — Clases, Objetos y Herencia'],
        ['Área de conocimiento', 'Tecnología e Informática / Programación Orientada a Objetos'],
        ['Nivel o grado', 'Educación Media (Grado 9° y 10°) / Educación Superior'],
        ['Autor(es)', 'Refsnes Data AS (Norway). Equipo editorial W3Schools. Fundada 1998.'],
        ['Enlace al repositorio', 'link:https://www.w3schools.com'],
        ['Enlace al RED', 'link:https://www.w3schools.com/python/python_classes.asp'],
        ['Descripción', 'Recurso web de referencia gratuita para el aprendizaje de programación. La sección de Python cubre clases, objetos, herencia, polimorfismo, iteradores y modificadores de acceso mediante ejemplos ejecutables en línea (Try it Yourself). Estructura progresiva desde conceptos básicos hasta aplicaciones intermedias de POO.'],
        ['Características y posibilidades de uso', 'Acceso libre y gratuito sin registro, editor en línea interactivo (Try it Yourself), ejemplos de código ejecutables, navegación por temas, disponible en múltiples idiomas, compatible con todos los navegadores, baja demanda de ancho de banda.'],
        ['Limitaciones', 'Contenido principalmente en inglés, sin retroalimentación pedagógica automática, ausencia de gamificación, no incluye evaluaciones formativas integradas, no permite tracking del progreso del estudiante, enfoque tutorial (no adaptativo).'],
        ['Verificación de estándares', 'Cumple WCAG 2.1 nivel AA básico, HTML5 semántico verificado en W3C Validator, compatible con lectores de pantalla, contraste de color adecuado, responsive design.']
      ],
      badges: ['Válido HTML5 ✓', 'CSS3 válido ✓', 'WCAG 2.1 AA ✓']
    },
    {
      name: 'Codecademy Learn Python 3',
      tag: 'Object-Oriented Programming',
      fields: [
        ['Nombre', 'Codecademy Learn Python 3 — Object-Oriented Programming'],
        ['Área de conocimiento', 'Ciencias de la Computación / Programación Orientada a Objetos'],
        ['Nivel o grado', 'Educación Media Superior / Universitario / Autodidacta'],
        ['Autor(es)', 'Codecademy Inc. (New York, USA). CEO Zach Sims. Fundada 2011. Plataforma con +50M usuarios registrados.'],
        ['Enlace al repositorio', 'link:https://www.codecademy.com'],
        ['Enlace al RED', 'link:https://www.codecademy.com/learn/learn-python-3/modules/learn-python3-classes'],
        ['Descripción', 'Plataforma de aprendizaje interactivo con metodología "Learn by Doing". El módulo de OOP incluye lecciones teóricas, ejercicios de código en tiempo real con compilador integrado (panel izquierdo: instrucciones, panel central: editor, panel derecho: output), proyectos guiados y cuestionarios de evaluación. Certificación al completar el curso.'],
        ['Características y posibilidades de uso', 'Interfaz de 3 paneles integrada (instrucciones + editor + output), feedback inmediato por ejercicio, progresión gamificada (XP, puntos, streaks), proyectos de portfolio, certificaciones, modo mobile, comunidad de aprendizaje.'],
        ['Limitaciones', 'Requiere conectividad estable (demanda alta de ancho de banda), funcionalidades avanzadas bajo plan PRO (de pago, ~$20/mes USD), requiere creación de cuenta, módulos en inglés principalmente, puede no funcionar en dispositivos de bajas especificaciones técnicas.'],
        ['Verificación de estándares', 'WCAG 2.1 AA, SSL/HTTPS certificado, política de privacidad COPPA/GDPR, accesibilidad mejorada en 2023.']
      ],
      badges: ['WCAG 2.1 AA ✓', 'SSL/HTTPS ✓', 'COPPA/GDPR ✓']
    }
  ];

  /* ---------- DATA: ECO-RED dimensions ---------- */
  const ECO_DIMS = [
    { n: '1', name: 'Pedagógica y Didáctica', weight: 35, ind: ['Pertinencia curricular', 'Objetivos claros', 'Retroalimentación', 'Adaptabilidad NEE', 'Motivación', 'Secuencia lógica', 'Evaluación formativa'] },
    { n: '2', name: 'Tecnológica y Usabilidad', weight: 25, ind: ['Compatibilidad de navegadores', 'Velocidad de carga', 'Diseño responsive', 'Navegación intuitiva', 'Estabilidad', 'Accesibilidad WCAG'] },
    { n: '3', name: 'Resiliencia y Adaptabilidad al Contexto', weight: 25, ind: ['Funciona sin internet (offline)', 'Baja demanda de datos', 'Compatible equipos viejos', 'Adaptable a NEE', 'Disponible sin costo', 'Multiidioma/multicontexto'] },
    { n: '4', name: 'Ética, Seguridad y Protección del Menor', weight: 15, ind: ['COPPA/GDPR para menores', 'Sin publicidad invasiva', 'Política de privacidad', 'Contenido filtrado', 'Datos seguros', 'Licenciamiento claro'] }
  ];

  /* ---------- DATA: results bars ---------- */
  const RESULTS = [
    { title: 'LORI (%)', rows: [['W3Schools', 85.5, 'w3'], ['Codecademy', 91.1, 'cc']] },
    { title: 'COdA (%)', rows: [['W3Schools', 83.8, 'w3'], ['Codecademy', 90.6, 'cc']] },
    { title: 'UNE 71362:2020 (% conformidad promedio)', rows: [['W3Schools', 85.3, 'w3'], ['Codecademy', 88.8, 'cc']] }
  ];

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ---------- RENDER: models ---------- */
  function renderModels() {
    const grid = document.getElementById('modelsGrid');
    if (!grid) return;
    grid.innerHTML = MODELS.map((m, i) => {
      const tabs = TAB_DEFS.map((t, j) =>
        `<button class="model-tab${j === 0 ? ' active' : ''}" data-card="${i}" data-tab="${t.key}">${t.label}</button>`).join('');
      const panels = TAB_DEFS.map((t, j) => {
        let inner = '';
        if (t.key === 'descripcion') inner = `<p>${esc(m.descripcion)}</p>`;
        else if (t.key === 'criterios') inner = `<ul>${m.criterios.map(c => `<li>${esc(c)}</li>`).join('')}</ul>`;
        else if (t.key === 'metrica') inner = `<p>${esc(m.metrica)}</p><span class="metric-pill">Métrica de puntuación</span>`;
        else if (t.key === 'metodologia') inner = `<p>${esc(m.metodologia)}</p>`;
        else inner = `<p>${esc(m.instrumento)}</p>`;
        return `<div class="model-panel${j === 0 ? ' active' : ''}" data-card="${i}" data-panel="${t.key}">${inner}</div>`;
      }).join('');
      return `<article class="model-card">
        <div class="model-head"><h3>${esc(m.name)}</h3><span class="model-sub">${esc(m.sub)}</span></div>
        <div class="model-tabs" role="tablist">${tabs}</div>
        <div class="model-body">${panels}</div>
      </article>`;
    }).join('');

    grid.querySelectorAll('.model-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.dataset.card, tab = btn.dataset.tab;
        grid.querySelectorAll(`.model-tab[data-card="${card}"]`).forEach(b => b.classList.toggle('active', b === btn));
        grid.querySelectorAll(`.model-panel[data-card="${card}"]`).forEach(p =>
          p.classList.toggle('active', p.dataset.panel === tab));
      });
    });
  }

  /* ---------- RENDER: RED accordion ---------- */
  function renderReds() {
    const list = document.getElementById('redList');
    if (!list) return;
    list.innerHTML = REDS.map((r, i) => {
      const fields = r.fields.map(([label, val]) => {
        let v;
        if (typeof val === 'string' && val.startsWith('link:')) {
          const url = val.slice(5);
          v = `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>`;
        } else v = `<p>${esc(val)}</p>`;
        return `<div class="red-field"><span class="rf-label">${esc(label)}</span>${v}</div>`;
      }).join('');
      const badges = `<div class="red-field"><span class="rf-label">Estándares W3C</span><div class="std-badges">${r.badges.map(b => `<span>${esc(b)}</span>`).join('')}</div></div>`;
      return `<article class="red-card${i === 0 ? ' open' : ''}">
        <button class="red-toggle" aria-expanded="${i === 0}">
          <span><h3>RED ${i + 1}: ${esc(r.name)}</h3><span class="red-tag">${esc(r.tag)}</span></span>
          <span class="red-plus" aria-hidden="true">+</span>
        </button>
        <div class="red-content"><div class="red-inner">${fields}${badges}</div></div>
      </article>`;
    }).join('');

    list.querySelectorAll('.red-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.red-card');
        const content = card.querySelector('.red-content');
        const open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
        content.style.maxHeight = open ? content.scrollHeight + 'px' : '0';
      });
    });
    // open first by default
    const first = list.querySelector('.red-card.open .red-content');
    if (first) first.style.maxHeight = first.scrollHeight + 'px';
  }

  /* ---------- RENDER: ECO matrix ---------- */
  function renderEco() {
    const box = document.getElementById('ecoMatrix');
    if (!box) return;
    box.innerHTML = ECO_DIMS.map(d => `
      <div class="eco-dim">
        <div class="eco-dim-head"><h3>${d.n}. Dimensión ${esc(d.name)}</h3><span class="eco-weight">${d.weight}%</span></div>
        <div class="weight-bar"><div class="weight-fill" data-w="${d.weight}"></div></div>
        <div class="eco-indicators">${d.ind.map(x => `<span>${esc(x)}</span>`).join('')}</div>
      </div>`).join('');
  }

  /* ---------- RENDER: results bars ---------- */
  function renderResults() {
    const box = document.getElementById('resultsBars');
    if (!box) return;
    box.innerHTML = RESULTS.map(g => `
      <div class="rb-group">
        <h4>${esc(g.title)}</h4>
        ${g.rows.map(([label, val, cls]) => `
          <div class="rb-row">
            <div class="rb-label"><span>${esc(label)}</span><span>${val}%</span></div>
            <div class="rb-track"><div class="rb-fill ${cls}" data-w="${val}">${val}%</div></div>
          </div>`).join('')}
      </div>`).join('');
  }

  /* ---------- Animate bars when visible ---------- */
  function setupBarAnimation() {
    const bars = document.querySelectorAll('.weight-fill, .rb-fill');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => io.observe(b));
  }

  /* ---------- SPA navigation ---------- */
  const pages = Array.from(document.querySelectorAll('.page'));
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));

  function showPage(id, push) {
    const target = document.getElementById(id);
    if (!target) return;
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    // active nav state (top-level ids only)
    const topLevel = { inicio: 'inicio', modelos: 'modelos', seleccion: 'modelos', recursos: 'modelos', rediseno: 'rediseno', aplicacion: 'aplicacion', referencias: 'referencias' };
    const activeTop = topLevel[id] || id;
    document.querySelectorAll('.nav-menu .nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.nav === id || l.dataset.nav === activeTop);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (push) history.replaceState(null, '', '#' + id);
    // re-trigger bar animation for newly visible page
    requestAnimationFrame(() => {
      target.querySelectorAll('.weight-fill, .rb-fill').forEach(b => {
        if (b.style.width === '' || b.style.width === '0%') { /* IO will handle */ }
      });
    });
    closeMobileMenu();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.dataset.nav;
      if (id && document.getElementById(id)) {
        e.preventDefault();
        showPage(id, true);
      }
    });
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('open');
    if (navToggle) { navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
    document.querySelectorAll('.has-dropdown.open').forEach(d => d.classList.remove('open'));
  }
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
    });
  }

  /* ---------- Dropdown (mobile tap) ---------- */
  document.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        // On mobile the parent link toggles the submenu instead of navigating
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* ---------- Video placeholder ---------- */
  const videoBtn = document.getElementById('btn-video-sustentacion');
  if (videoBtn) {
    videoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = videoBtn.dataset.youtube;
      const id = extractYouTubeId(url);
      if (!id) { return; }
      const container = videoBtn.closest('.video-container');
      container.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="Video de Sustentación" allow="accelerated-download; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }
  function extractYouTubeId(url) {
    if (!url) return '';
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return m ? m[1] : '';
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderModels();
    renderReds();
    renderEco();
    renderResults();
    setupBarAnimation();
    // deep link support
    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) showPage(hash, false);
  });
})();
