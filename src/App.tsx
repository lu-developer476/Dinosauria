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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <a
            className="brand"
            href="#"
            onClick={(e) => (e.preventDefault(), smoothScrollTo("top"))}
          >
            <div className="logo" aria-hidden="true">🦴</div>
            <div>
              <div className="brand-title">Dinosauria</div>
              <div className="brand-sub">Paleobiología · Evolución</div>
            </div>
          </a>

          <nav className="nav-links">
            <button className="nav-btn" onClick={() => smoothScrollTo("sobre")}>Acerca de</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("linea-tiempo")}>Línea de tiempo</button>
            <button className="nav-btn nav-primary" onClick={() => smoothScrollTo("explorar")}>Especies</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("galeria")}>Galería</button>
          </nav>
        </div>
      </header>

      <main id="top">

        {/* ================== ESPECIES ================== */}

        <section id="explorar" className="section">
          <div className="container">
            <h2 className="h2">Especies</h2>

            <div className="cards">
              {dinos.map((d) => (
                <article className="card" key={d.id}>
                  
                  {/* Imagen pequeña */}
                  <img
                    src={d.image}
                    alt={d.name}
                    className="dino-thumb"
                    onClick={() => setSelectedImage(d.image)}
                  />

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

      </main>

      {/* ================== MODAL ================== */}

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <small>© {new Date().getFullYear()} Todos los derechos reservados</small>
          <small>Realizado por Lucas Leonel Montenegro Burgos</small>
        </div>
      </footer>
    </>
  );
}
