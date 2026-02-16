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
        label: `Imagen ${i + 1}`
      })),
    []
  );

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#" onClick={(e) => (e.preventDefault(), smoothScrollTo("top"))}>
            <div className="logo" aria-hidden="true">🧬➝🦴</div>
            <div>
              <div className="brand-title">Dinosauria</div>
              <div className="brand-sub">Paleobiología · Evolución</div>
            </div>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <button className="nav-btn" onClick={() => smoothScrollTo("sobre")}>Acerca de</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("linea-tiempo")}>Línea de tiempo</button>
            <button className="nav-btn nav-primary" onClick={() => smoothScrollTo("explorar")}>Especies</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("galeria")}>Galería</button>
          </nav>
        </div>
      </header>

      <main id="top">

        {/* -------- HERO -------- */}

        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <div className="hero-inner">
                <div>
                  <div className="kicker">Museo digital</div>
                  <h1 className="h1">Una lectura científica de criaturas imposibles</h1>
                  <p className="lead">
                    Sitio no oficial de las especies jamás vistas por el hombre... y otras creadas por su ambición.
                  </p>
                </div>

                <aside className="hero-aside" aria-label="Dato destacado">
                  <div className="fact-title">Curiosidad del día</div>
                  <div className="fact">{fact}</div>
                  <div className="fact-footer">
                    <span className="pill">Actualizado: {nowStamp()}</span>
                    <button className="smallbtn" onClick={() => setFactIndex((v) => v + 1)}>Más</button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* -------- ESPECIES -------- */}

        <section id="explorar" className="section">
          <div className="container">
            <h2 className="h2">Especies</h2>
            <p className="sub">
              Esta sección reúne fichas sintéticas de las especies tanto de origen evolutivo "natural" como resultado de la ingeniería genética practicada.
            </p>

            <div className="cards">
              {dinos.map((d) => (
                <article className="card" key={d.id}>

                  {/* 🔥 IMAGEN AGREGADA */}
                  <div className="dino-image-wrapper">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="dino-image"
                    />
                  </div>

                  <strong>{d.name}</strong>

                  <div className="sub dino-text">
                    {d.description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

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

        {/* -------- GALERÍA -------- */}

        <section id="galeria" className="section">
          <div className="container">
            <h2 className="h2">Galería</h2>

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

      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <small>© {new Date().getFullYear()} Todos los derechos reservados</small>
          <small>Realizado por Lucas Leonel Montenegro Burgos</small>
        </div>
      </footer>
    </>
  );
}
