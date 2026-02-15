import { useMemo, useState } from "react";
import { smoothScrollTo } from "./utils/scroll";
import { facts } from "./generated/funfacts.js";
import { dinos } from "./data/dinos";

function nowStamp() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function App() {
  const [factIndex, setFactIndex] = useState(0);

  const fact = useMemo(() => {
    const i = ((factIndex % facts.length) + facts.length) % facts.length;
    return facts[i];
  }, [factIndex]);

  const gallery = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        src: `/images/gallery-${i + 1}.jpg`,
        label: `Galería ${i + 1}`
      })),
    []
  );

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#" onClick={(e) => (e.preventDefault(), smoothScrollTo("top"))}>
            <div className="logo" aria-hidden="true">🦴</div>
            <div>
              <div className="brand-title">Descubriendo Dinos</div>
              <div className="brand-sub">Paleobiología · Evolución · Isla Calavera</div>
            </div>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <button onClick={() => smoothScrollTo("sobre")}>Sobre</button>
            <button onClick={() => smoothScrollTo("linea-tiempo")}>Línea de tiempo</button>
            <button onClick={() => smoothScrollTo("galeria")}>Galería</button>
            <button className="cta" onClick={() => smoothScrollTo("explorar")}>Explorar</button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <div className="hero-inner">
                <div>
                  <div className="kicker">Museo digital · Proyecto React + TypeScript + CoffeeScript</div>
                  <h1 className="h1">Una lectura científica de criaturas imposibles</h1>
                  <p className="lead">
                    Un sitio profesional para presentar fichas, contexto evolutivo y una galería visual.
                    Pensado para deploy directo en Vercel y para escalar a más especies, notas y material multimedia.
                  </p>
                  <div className="hero-actions">
                    <a className="primary" href="#explorar" onClick={(e) => (e.preventDefault(), smoothScrollTo("explorar"))}>
                      Ver especies
                    </a>
                    <a href="#galeria" onClick={(e) => (e.preventDefault(), smoothScrollTo("galeria"))}>
                      Abrir galería
                    </a>
                    <a href="#sobre" onClick={(e) => (e.preventDefault(), smoothScrollTo("sobre"))}>
                      Metodología
                    </a>
                  </div>
                </div>

                <aside className="hero-aside" aria-label="Dato destacado">
                  <div className="fact-title">Dato del día</div>
                  <div className="fact">{fact}</div>
                  <div className="fact-footer">
                    <span className="pill">Actualizado: {nowStamp()}</span>
                    <button className="smallbtn" onClick={() => setFactIndex((v) => v + 1)}>Otro</button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="section">
          <div className="container">
            <h2 className="h2">Sobre el proyecto</h2>
            <p className="sub">
              “Descubriendo Dinos” presenta un enfoque ordenado: anatomía, biomecánica, ecología y evolución insular.
              La idea es mostrar cómo se escribe un informe sólido incluso cuando el material proviene de ficción,
              manteniendo consistencia interna y criterios científicos.
            </p>

            <div className="cards">
              <div className="card">
                <strong>Enfoque</strong>
                <p>
                  Anatomía comparada y plausibilidad biomecánica. Se prioriza lo que impone límites reales: masa, energía,
                  locomoción, mordida y ecología.
                </p>
                <div className="badges">
                  <span className="badge">Biología evolutiva</span>
                  <span className="badge">Tafonomía</span>
                  <span className="badge">Paleoclima</span>
                </div>
              </div>

              <div className="card">
                <strong>Arquitectura</strong>
                <p>
                  React con TypeScript para el núcleo, utilidades en JavaScript y un módulo de CoffeeScript para la sección
                  editorial de “hechos” que se compila durante el build.
                </p>
                <div className="badges">
                  <span className="badge">Vite</span>
                  <span className="badge">Vercel-ready</span>
                  <span className="badge">Accesibilidad</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="linea-tiempo" className="section">
          <div className="container">
            <h2 className="h2">Línea de tiempo</h2>
            <p className="sub">
              Un marco simple para ubicar conceptos: aislamiento, presión selectiva y carreras armamentistas depredador–presa.
            </p>

            <div className="timeline">
              <div className="step">
                <div className="dot">1</div>
                <div>
                  <h3>Aislamiento prolongado</h3>
                  <p>
                    Una isla cerrada opera como experimento natural: deriva genética, cuellos de botella y adaptación rápida
                    cuando el ambiente no perdona.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="dot">2</div>
                <div>
                  <h3>Especialización extrema</h3>
                  <p>
                    El ecosistema premia rasgos funcionales: blindaje, robustez craneal, tamaño defensivo, socialidad o
                    conductas territoriales.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="dot">3</div>
                <div>
                  <h3>Equilibrio inestable</h3>
                  <p>
                    Pocas especies dominantes, alta mortalidad y recuperación por reemplazo. La estabilidad no es calma:
                    es un balance violento.
                  </p>
                </div>
              </div>
            </div>

            <div className="cta">
              <p>
                Esta página está lista para sumar artículos largos, fichas ampliadas y contenido multimedia sin tocar la estructura base.
              </p>
              <a href="#galeria" onClick={(e) => (e.preventDefault(), smoothScrollTo("galeria"))}>Ir a galería</a>
            </div>
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="container">
            <h2 className="h2">Galería</h2>
            <p className="sub">
              Imágenes cargadas desde <span className="pill">public/</span> con los nombres <span className="pill">gallery-1.jpg</span> a <span className="pill">gallery-8.jpg</span>.
              Reemplazá los placeholders por tus archivos reales manteniendo los nombres.
            </p>

            <div className="gallery" role="list">
              {gallery.map((g) => (
                <div className="gimg" role="listitem" key={g.src}>
                  <img src={g.src} alt={g.label} />
                  <div className="gcap">{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="explorar" className="section">
          <div className="container">
            <h2 className="h2">Explorar especies</h2>
            <p className="sub">
              Fichas resumidas con criterios científicos. Este bloque está pensado para crecer a un catálogo completo con rutas,
              filtros y páginas de detalle.
            </p>

            <div className="cards">
              {dinos.map((d) => (
                <article className="card" key={d.id}>
                  <strong>{d.name}</strong>
                  <p>{d.summary}</p>
                  <div className="badges">
                    <span className="badge">{d.era}</span>
                    <span className="badge">{d.diet}</span>
                    <span className="badge">{d.size}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <small>© {new Date().getFullYear()} Descubriendo Dinos · Repositorio: Dinosauria</small>
          <small>React · TypeScript · JavaScript · CoffeeScript</small>
        </div>
      </footer>
    </>
  );
}
