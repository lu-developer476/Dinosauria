import { useMemo, useState, useEffect } from "react";
import { smoothScrollTo } from "./utils/scroll";
import { facts } from "./generated/funfacts";
import { dinos } from "./data/dinos";

function nowStamp() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function normalizeTag(tag: string) {
  return tag.trim();
}

function getDinoTags(d: any): string[] {
  const tags: string[] = [];

  // Si existe tags: string[]
  if (Array.isArray(d.tags)) tags.push(...d.tags);

  // Backups: era/diet/size como etiquetas útiles
  if (typeof d.era === "string") tags.push(d.era);
  if (typeof d.diet === "string") tags.push(d.diet);
  if (typeof d.size === "string") tags.push(d.size);

  // Normalizar y evitar vacíos
  return Array.from(
    new Set(tags.map(normalizeTag).filter(Boolean))
  );
}

export default function App() {
  const [factIndex, setFactIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filtros + rotación
  const [filteredDinos, setFilteredDinos] = useState(dinos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Rotación Galería
  const [galleryIndex, setGalleryIndex] = useState(0);

  const fact = useMemo(() => {
    const i = ((factIndex % facts.length) + facts.length) % facts.length;
    return facts[i];
  }, [factIndex]);

const gallery = useMemo(
  () => [
    { id: 2, src: "/images/Gallery-2.jpg", caption: "Representación ósea del Atercurisaurus" },
    { id: 4, src: "/images/Gallery-4.jpg", caption: "Representación ósea del Brontosaurus baxteri" },
    { id: 5, src: "/images/Gallery-5.jpg", caption: "Ilustración a mano alzada del Brontosaurus baxteri" },
    { id: 8, src: "/images/Gallery-8.jpg", caption: "Representación ósea del Ferrucutus cerastes" },
    { id: 9, src: "/images/Gallery-9.jpg", caption: "Ilustración a mano alzada del Ferrucutus cerastes" },
    { id: 10, src: "/images/Gallery-10.jpg", caption: "Mirada intimidante del Foetodon ferrus" },
    { id: 11, src: "/images/Gallery-11.jpg", caption: "Ilustración del Foetodon ferrus" },
    { id: 13, src: "/images/Gallery-13.jpg", caption: "Representación ósea del Foetodon ferrus" },
    { id: 14, src: "/images/Gallery-14.jpg", caption: "Ilustración a mano alzada del Foetodon ferrus" },
    { id: 18, src: "/images/Gallery-18.jpg", caption: "Adulto y cría de Ligocristus innocens" },
    { id: 19, src: "/images/Gallery-19.jpg", caption: "Ilustración a mano alzada del Ligocristus innocens" },
    { id: 23, src: "/images/Gallery-23.jpg", caption: "Variante 2 del Spinoceratops" },
    { id: 24, src: "/images/Gallery-24.jpg", caption: "Variante 3 del Spinoceratops" },
    { id: 27, src: "/images/Gallery-27.jpg", caption: "Variante 2 del Spinoraptor" },
    { id: 29, src: "/images/Gallery-29.jpg", caption: "Representación ósea del Stegoceratops" },
    { id: 30, src: "/images/Gallery-30.jpg", caption: "Ilustración 1 de un Vastatosaurus Rex macho" },
    { id: 31, src: "/images/Gallery-31.jpg", caption: "Ilustración 2 de un Vastatosaurus Rex macho" },
    { id: 32, src: "/images/Gallery-32.jpg", caption: "Ilustración de un Vastatosaurus Rex hembra" },
    { id: 33, src: "/images/Gallery-33.jpg", caption: "Ilustración de una cría de Vastatosaurus Rex joven" },
    { id: 35, src: "/images/Gallery-35.jpg", caption: "Representación ósea del Vastatosaurus Rex adulto" },
    { id: 36, src: "/images/Gallery-36.jpg", caption: "Ilustración a mano alzada de una familia de Vastatosaurus Rex" },
    { id: 38, src: "/images/Gallery-38.jpg", caption: "Representación ósea del Venatosaurus saevidicus" },
    { id: 39, src: "/images/Gallery-39.jpg", caption: "Ilustración a mano alzada del Venatosaurus saevidicus" }
  ],
  []
);

  // Catálogo de etiquetas disponibles (tags + era/diet/size)
  const availableFilters = useMemo(() => {
    const all = dinos.flatMap((d: any) => getDinoTags(d));
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }, []);

  // Aplicar filtro y resetear índice de rotación
  useEffect(() => {
    if (!activeFilter) {
      setFilteredDinos(dinos);
      setCurrentIndex(0);
      return;
    }

    const tag = normalizeTag(activeFilter);
    const next = dinos.filter((d: any) => getDinoTags(d).includes(tag));

    setFilteredDinos(next);
    setCurrentIndex(0);
  }, [activeFilter]);

  // Rotación catálogo (cada 45s: avanza 2 cards)
  useEffect(() => {
    if (filteredDinos.length <= 2) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 2 >= filteredDinos.length ? 0 : prev + 2
      );
    }, 45000);

    return () => window.clearInterval(intervalId);
  }, [filteredDinos]);

  // Rotación automática galería (1 imagen cada 25s)
  useEffect(() => {
    if (gallery.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % gallery.length);
    }, 25000);

    return () => window.clearInterval(intervalId);
  }, [gallery.length]);

  const visibleDinos = useMemo(() => {
    return filteredDinos.slice(currentIndex, currentIndex + 2);
  }, [filteredDinos, currentIndex]);

  const handleFilterClick = (tag: string) => {
    setActiveFilter((prev) => (prev === tag ? null : tag));
  };

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a
            className="brand"
            href="#"
            onClick={(e) => (e.preventDefault(), smoothScrollTo("top"))}
          >
            <div className="logo" aria-hidden="true">🧬➝🦴</div>
            <div>
              <div className="brand-title">Dinosauria</div>
              <div className="brand-sub">Paleobiología · Evolución</div>
            </div>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <button className="nav-btn" onClick={() => smoothScrollTo("linea-tiempo")}>Línea de tiempo</button>
            <button className="nav-btn nav-primary" onClick={() => smoothScrollTo("explorar")}>Especies</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("galeria")}>Galería</button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="card hero-card">
              <div className="hero-inner">
                <div>
                  <h1 className="h1">Una lectura científica de criaturas imposibles</h1>
                  <p className="lead">
                    Sitio no oficial de las especies jamás vistas por el hombre... y otras creadas por su ambición.
                  </p>
                </div>

                <aside className="hero-aside" aria-label="Dato destacado">
                  <div className="fact-title"><strong>Curiosidad del día</strong></div>
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

        <section id="sobre" className="section">
          <div className="container">
            <h2 className="h2">Acerca del proyecto</h2>

            <p className="sub">
              Cada especie se evalúa bajo criterios reales, límites físicos plausibles y lógica ecológica interna, cuando la base proviene de la ficción cinematográfica.
            </p>

            <div className="cards">
              <div className="card">
                <strong>Enfoque</strong>
                <p>
                  El análisis parte de anatomía comparada y modelado biomecánico básico: masa corporal estimada, centro de gravedad, tipo de locomoción, resistencia estructural y función craneodentaria.
                </p>
                <p>
                  Se consideran presiones selectivas propias de ecosistemas cerrados, competencia interespecífica y rol trófico dentro de una red alimentaria coherente.
                </p>
              </div>

              <div className="card">
                <strong>Arquitectura</strong>
                <p>
                  El sitio está desarrollado en React con TypeScript como núcleo estructural.
                </p>
                <p>
                  Se utiliza JavaScript para utilidades específicas de interacción y CoffeeScript para el módulo editorial de datos dinámicos, compilado durante el proceso de build.
                </p>
                <p>
                  La estructura está preparada para escalar hacia un catálogo completo con rutas individuales por especie, filtros taxonómicos y extensiones multimedia sin alterar la base del proyecto.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="linea-tiempo" className="section">
          <div className="container">
            <h2 className="h2">Convergencia</h2>      
          <div className="cards cards-2col">
            <article className="card timeline-card">
              <strong className="timeline-title">Aislamiento y diseño biotecnológico</strong>
          
              <div className="timeline-text">
                <p>
                  En entornos de alta competencia, la selección natural favorece mayor tamaño, refuerzo estructural y defensas especializadas.
                </p>
                    
                <p>
                  Mientras la evolución actúa durante millones de años, la manipulación deliberada del ADN responde a objetivos humanos concretos: aumentar masa, inteligencia o capacidad ofensiva. Así, la especialización puede surgir tanto por presión evolutiva sostenida como por intervención tecnológica, generando especies distintas en origen pero comparables en impacto ecológico.
                </p>
              </div>
            </article>
          
            <article className="card timeline-card">
              <strong className="timeline-title">Equilibrio natural y ruptura ecológica</strong>
          
              <div className="timeline-text">
                <p>
                  Los ecosistemas naturales funcionan a partir de ciclos de vida y relaciones tróficas que sostienen un equilibrio dinámico a lo largo del tiempo evolutivo. Cuando se introducen organismos diseñados, ese balance se altera, ya que carecen de una historia adaptativa integrada al entorno.
                </p>
          
                <p>
                  El resultado es un sistema híbrido redefiniendo los límites entre la naturaleza y la paleobiología tradicional.
                </p>
              </div>
            </article>
          </div>     {/* cierre cards */}
        </div>       {/* cierre container */}
      </section>

        <section id="explorar" className="section">
          <div className="container">
            <h2 className="h2">Especies</h2>
            <p className="sub">
              Esta sección reúne fichas sintéticas de las especies tanto de origen evolutivo "natural" como resultado de la ingeniería genética practicada. Cada entrada resume rasgos morfológicos, rol trófico y contexto biológico, analizados bajo criterios de anatomía funcional, coherencia ecológica y plausibilidad biomecánica.
            </p>

            {/* Panel de filtros */}
            <div className="filters" aria-label="Filtros de especies">
              <button
                className={`pill ${activeFilter === null ? "pill-active" : ""}`}
                onClick={() => setActiveFilter(null)}
                type="button"
              >
                Todos
              </button>

              {availableFilters.map((tag) => (
                <button
                  key={tag}
                  className={`pill ${activeFilter === tag ? "pill-active" : ""}`}
                  onClick={() => handleFilterClick(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="cards cards-2col">
              {visibleDinos.map((d: any) => (
                <article className="card" key={d.id}>
                  <strong className="dino-title">{d.name}</strong>

                  <img
                    src={d.image}
                    alt={d.name}
                    className="dino-image"
                    onClick={() => setSelectedImage(d.image)}
                  />

                  <div className="sub dino-text">
                    {String(d.description ?? "")
                      .split("\n\n")
                      .map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>

                  {/* Badges clickeables (sirven como “atajo” de filtro) */}
                  <div className="badges">
                    <button
                      className={`badge ${activeFilter === d.era ? "badge-active" : ""}`}
                      type="button"
                      onClick={() => handleFilterClick(d.era)}
                    >
                      {d.era}
                    </button>

                    <button
                      className={`badge ${activeFilter === d.diet ? "badge-active" : ""}`}
                      type="button"
                      onClick={() => handleFilterClick(d.diet)}
                    >
                      {d.diet}
                    </button>

                    <button
                      className={`badge ${activeFilter === d.size ? "badge-active" : ""}`}
                      type="button"
                      onClick={() => handleFilterClick(d.size)}
                    >
                      {d.size}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="container">
            <h2 className="h2">Galería</h2>
          <div className="gallery">
            <div className="gimg">
              <img
                src={gallery[galleryIndex].src}
                alt={gallery[galleryIndex].caption}
              />
              <div className="gcap">
                {gallery[galleryIndex].caption}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Vista ampliada" />
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <small>© {new Date().getFullYear()} Todos los derechos reservados | Realizado por Lucas Leonel Montenegro Burgos</small>
        </div>
      </footer>
    </>
  );
}
