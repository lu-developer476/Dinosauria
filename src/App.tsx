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
    { id: 1, src: "/images/ambulaquasaurus-cristarufus-illustration.jpg", caption: "Ilustración del Ambulaquasaurus cristarufus" },
    { id: 2, src: "/images/asperdorsus-bellator-bones.jpg", caption: "Representación ósea del Asperdorsus bellator" },
    { id: 3, src: "/images/asperdorsus-bellator-eating.jpg", caption: "Un Asperdorsus bellator alimentándose" },
    { id: 4, src: "/images/atercurisaurus-bones.jpg", caption: "Representación ósea del Atercurisaurus" },
    { id: 5, src: "/images/beta.jpg", caption: "Beta, la intrépida hija de la velociraptor Blue" },
    { id: 6, src: "/images/blue.jpg", caption: "Blue, la velociraptor genéticamente modificada, ex miembro de la 'Raptor Squad'. Protagonista de varias aventuras" },
    { id: 7, src: "/images/brontosaurus-baxteri-bones.jpg", caption: "Representación ósea del Brontosaurus baxteri" },
    { id: 8, src: "/images/brontosaurus-baxteri-illustration.jpg", caption: "Ilustración a mano alzada del Brontosaurus baxteri" },
    { id: 9, src: "/images/chalyceratops-seradorsus-illustration.jpg", caption: "Ilustración de un chalyceratops seradorsus fallecido" },
    { id: 10, src: "/images/charlie.jpg", caption: "Charlie, velociraptor genéticamente modificado y ex miembro de la 'Raptor Squad'" },
    { id: 11, src: "/images/delta.jpg", caption: "Delta, velociraptor genéticamente modificado y ex miembro de la 'Raptor Squad'" },
    { id: 12, src: "/images/diablosaurus-rufus-bones.jpg", caption: "Representación ósea del Diablosaurus rufus" },
    { id: 13, src: "/images/diablosaurus-rufus-dismorfism.jpg", caption: "Dismorfismo sexual de la especie Diablosaurus rufus" },
    { id: 14, src: "/images/diablosaurus-rufus-illustration.jpg", caption: "Ilustración del Diablosaurus rufus" },
    { id: 15, src: "/images/echo.jpg", caption: "Echo, velociraptor genéticamente modificado y ex miembro de la 'Raptor Squad'" },
    { id: 16, src: "/images/ferrucutus-cerastes-bones.jpg", caption: "Representación ósea del Ferrucutus cerastes" },
    { id: 17, src: "/images/ferrucutus-cerastes-illustration.jpg", caption: "Ilustración a mano alzada del Ferrucutus cerastes" },
    { id: 18, src: "/images/foetodon-ferrus-body.jpg", caption: "Representación completa de un Foetodon ferrus" },
    { id: 19, src: "/images/foetodon-ferrus-bones.jpg", caption: "Representación ósea del Foetodon ferrus" },
    { id: 20, src: "/images/foetodon-ferrus-illustration.jpg", caption: "Ilustración a mano alzada del Foetodon ferrus" },
    { id: 21, src: "/images/foetodon-ferrus-sneaking.jpg", caption: "Un Foetodon ferrus en posición de acecho" },
    { id: 22, src: "/images/furcidactylus-illustration.jpg", caption: "Ilustración a mano alzada de un Furcidactylus" },
    { id: 23, src: "/images/indominus-rex-GEN2-variant.jpg", caption: "Una variante del Indominus Rex de 2° Generación" },
    { id: 24, src: "/images/indoraptor-attack.jpg", caption: "Un Indoraptor en posición de ataque" },
    { id: 25, src: "/images/indoraptor-bones.jpg", caption: "Representación ósea del Indoraptor" },
    { id: 26, src: "/images/indoraptor-GEN2-defense.jpg", caption: "Un Indoraptor de 2° Generación en modo defensivo" },
    { id: 27, src: "/images/indoraptor-illustration.jpg", caption: "Ilustración ósea del Indoraptor" },
    { id: 28, src: "/images/indoraptor-sneaking.jpg", caption: "Un Indoraptor al acecho de su potencial presa" },
    { id: 29, src: "/images/ligocristus-innocens-family.jpg", caption: "Ilustración de una familia de Ligocristus innocens" },
    { id: 30, src: "/images/ligocristus-innocens-illustration.jpg", caption: "Ilustración a mano alzada de un Ligocristus" },
    { id: 31, src: "/images/nefundusaurus-accerbus-eating.jpg", caption: "Un pequeño grupo de Nefundusaurus accerbus a punto de alimentarse" },
    { id: 32, src: "/images/spinoceratops-body.jpg", caption: "Representación completa de un Spinoceratops" },
    { id: 33, src: "/images/spinoceratops-variant.jpg", caption: "Una variante del Spinoceratops" },
    { id: 34, src: "/images/spinoraptor-body.jpg", caption: "Representación completa de un Spinoraptor" },
    { id: 35, src: "/images/stegoceratops-bones.jpg", caption: "Representación ósea de un Stegoceratops" },
    { id: 36, src: "/images/sylvaceratops-pursuit.jpg", caption: "Un grupo de Sylvaceratops siendo cazados por crías de Vastatosaurus" },
    { id: 37, src: "/images/tartarusaurus-saevus-defense.jpg", caption: "Un Tartarusaurus saevus en posición defensiva" },
    { id: 38, src: "/images/vastatosaurus-rex-bones.jpg", caption: "Representación ósea de un Vastatosaurus Rex" },
    { id: 39, src: "/images/vastatosaurus-rex-illustration.jpg", caption: "Ilustración del grupo endogámico de Vastatosaurus Rex" },
    { id: 40, src: "/images/vastatosaurus-rex-juvenile.jpg", caption: "Una cría de Vastatosaurus Rex" },
    { id: 41, src: "/images/vastatosaurus-rex-male.jpg", caption: "Un macho Vastatosaurus Rex visto en la película 'King Kong' del 2005" },
    { id: 42, src: "/images/vastatosaurus-rex-matriarch.jpg", caption: "Una hembra Vastatosaurus Rex antagonista de la película 'King Kong' del 2005" },
    { id: 43, src: "/images/vastatosaurus-rex-scream.jpg", caption: "Un Vastatosaurus Rex haciendo notar su presencia mediante su grito" },
    { id: 44, src: "/images/velociraptor-nublarensis-body.jpg", caption: "Representación completa de la especie Velociraptor nublarensis" },
    { id: 45, src: "/images/velociraptor-nublarensis-illustration.jpg", caption: "Ilustración a color del Velociraptor nublarensis" },
    { id: 46, src: "/images/velociraptor-nublarensis-variant.jpg", caption: "Una variante del Velociraptor nublarensis" },
    { id: 47, src: "/images/venatosaurus-saevidicus-bones.jpg", caption: "Representación ósea del Venatosaurus saevidicus" },
    { id: 48, src: "/images/venatosaurus-saevidicus-illustration.jpg", caption: "Ilustración a mano alzada de un Venatosaurus saevidicus" },
    { id: 49, src: "/images/vultusaurus-bones.jpg", caption: "Representación ósea del Vultusaurus" },
    { id: 50, src: "/images/vultusaurus-illustration.jpg", caption: "Ilustración de un Vultusaurus" }    
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
            <div className="logo" aria-hidden="true">🧬 + 🦴</div>
            <div>
              <div className="brand-title">🦖</div>
              <div className="brand-sub">🦕</div>
            </div>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <button className="nav-btn" onClick={() => smoothScrollTo("linea-tiempo")}>Convergencia</button>
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
                    Sitio no oficial de las especies ficticias vistas por el hombre... y otras creadas por su ambición.
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
            <p className="section-intro">
              "Descubriendo Dinos" nace de la pasión por la paleontología y la creatividad digital. Este proyecto combina ciencia, tecnología y experiencia visual para ofrecer una inmersión única en el mundo de los dinosaurios, explorando no solo su anatomía y comportamiento, sino también la ecología de los ecosistemas que podrían haber habitado, de manera que incluso las especies ficticias se presentan con un trasfondo creíble y detallado.
            </p>
        
            <div className="cards">
              <div className="card">
                <h3 className="card-title">Enfoque científico</h3>
                <p>
                  Cada especie es analizada siguiendo criterios de anatomía comparada y modelado biomecánico: estimamos masa corporal, centro de gravedad, tipo de locomoción, resistencia estructural y la función de su cráneo y dientes. Las criaturas inventadas se estudian bajo las mismas reglas que los fósiles reales, asegurando consistencia y plausibilidad.
                </p>
                <p>
                  Además, consideramos las presiones selectivas que podrían actuar en sus ecosistemas: la competencia entre especies, la adaptación a recursos limitados y el rol trófico de cada dinosaurio dentro de redes alimentarias hipotéticas, creando así un entorno coherente donde cada criatura tiene un propósito y un lugar.
                </p>
                <p>
                  Este enfoque permite que los usuarios no solo observen a los dinosaurios, sino que comprendan cómo podrían haber interactuado entre sí y con su ambiente, haciendo de la exploración algo educativo y entretenido al mismo tiempo.
                </p>
              </div>
        
              <div className="card">
                <h3 className="card-title">Arquitectura técnica</h3>
                <p>
                  El sitio está construido sobre <strong>React</strong> y <strong>TypeScript</strong>, lo que garantiza una base sólida, escalable y fácil de mantener a medida que el proyecto crece. Esto nos permite incorporar nuevas especies, rutas individuales por dinosaurio y filtros taxonómicos sin comprometer la estabilidad del sistema.
                </p>
                <p>
                  Para funcionalidades interactivas más dinámicas usamos <strong>JavaScript</strong>, mientras que el módulo editorial de datos se gestiona con <strong>CoffeeScript</strong>, compilado automáticamente durante el proceso de build. Esta combinación asegura eficiencia y flexibilidad técnica.
                </p>
                <p>
                  La arquitectura está pensada para soportar contenido multimedia avanzado, como animaciones, galerías 3D y mapas de ecosistemas, permitiendo que la experiencia del usuario sea rica, educativa y envolvente, al mismo tiempo que la base de datos de especies se mantiene organizada y lista para futuras expansiones.
                </p>
                <p>
                  En definitiva, cada capa del proyecto —desde el código hasta el contenido— ha sido diseñada para que la exploración de estas criaturas ficticias se sienta real, educativa y apasionante, reflejando la misma curiosidad que inspira a los paleontólogos del mundo real.
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
                  Los ecosistemas naturales funcionan a partir de ciclos de vida y relaciones tróficas que sostienen un equilibrio dinámico a lo largo del tiempo evolutivo.
                </p>
                
                <p>
                  Cuando se introducen organismos diseñados, ese balance se altera, ya que carecen de una historia adaptativa integrada al entorno.
                </p>
          
                <p>
                  El resultado es un sistema mezclado, redefiniendo los límites entre la creación artificial, la naturaleza y la paleobiología tradicional.
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
              Esta sección reúne fichas de especies, tanto naturales como creadas por ingeniería genética. En cada una se describe su forma, su función en el ecosistema y su contexto biológico, analizados con criterios anatómicos, coherencia ecológica y realismo biomecánico.
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
          <small>© {new Date().getFullYear()} Todos los derechos reservados • Built with HTML5, CSS3, JavaScript, TypeScript, CoffeeScript, React.js • UX/UI Interface • Deployed on Vercel ®</small>
        </div>
      </footer>
    </>
  );
}
