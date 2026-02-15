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
              <div className="brand-title">Dinosauria</div>
              <div className="brand-sub">Paleobiología · Evolución</div>
            </div>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <button className="nav-btn" onClick={() => smoothScrollTo("sobre")}>Sobre</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("linea-tiempo")}>Línea de tiempo</button>
            <button className="nav-btn" onClick={() => smoothScrollTo("galeria")}>Galería</button>
            <button className="nav-btn nav-primary" onClick={() => smoothScrollTo("explorar")}>Explorar</button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <div className="hero-inner">
                <div>
                  <div className="kicker">Museo digital</div>
                  <h1 className="h1">Una lectura científica de criaturas imposibles</h1>
                  <p className="lead">
                    Sitio no oficial de las especies jamás vistas por el hombre.
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

        <section id="sobre" className="section">
          <div className="container">
            <h2 className="h2">Sobre el proyecto</h2>
            <p className="sub">
              Es un ejercicio de análisis paleobiológico aplicado a criaturas ficticias.
              Cada especie se evalúa bajo criterios reales de anatomía funcional, biomecánica, dinámica poblacional y evolución insular.
              El objetivo es sostener coherencia estructural, límites físicos plausibles y lógica ecológica interna, incluso cuando el punto de partida proviene de la ficción cinematográfica.
            </p>

            <div className="cards">
              <div className="card">
                <strong>Enfoque</strong>
                <p>
                  El análisis parte de anatomía comparada y modelado biomecánico básico: masa corporal estimada, centro de gravedad, tipo de locomoción, resistencia estructural y función craneodentaria.
                  Se consideran presiones selectivas propias de ecosistemas cerrados, competencia interespecífica y rol trófico dentro de una red alimentaria coherente.
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
                  El sitio está desarrollado en React con TypeScript como núcleo estructural.
                  Se utiliza JavaScript para utilidades específicas de interacción y CoffeeScript para el módulo editorial de datos dinámicos, compilado durante el proceso de build.
                  La estructura está preparada para escalar hacia un catálogo completo con rutas individuales por especie, filtros taxonómicos y extensiones multimedia sin alterar la base del proyecto.
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
              Reconstrucción evolutiva del ecosistema insular a partir de presión selectiva extrema, aislamiento prolongado y competencia trófica permanente.
            </p>

            <div className="timeline">
              <div className="step">
                <div className="dot">1</div>
                <div>
                  <h3>Aislamiento prolongado</h3>
                  <p>
                    La Isla Calavera habría permanecido aislada desde finales del Cretácico, funcionando como un refugio biológico cerrado tras eventos de extinción global. Este aislamiento impidió intercambio genético con el exterior y favoreció procesos de deriva genética acelerada.
                    En ausencia de competencia externa, las especies sobrevivientes no conservaron su forma original: divergieron. Los linajes de saurópodos, terópodos y abelisáuridos evolucionaron hacia morfologías más robustas, con densidad ósea incrementada y mayor tolerancia al daño físico.
                    El resultado no es un “mundo congelado en el tiempo”, sino un ecosistema que continuó evolucionando bajo reglas propias durante millones de años.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="dot">2</div>
                <div>
                  <h3>Especialización extrema</h3>
                  <p>
                    En ecosistemas de alta densidad trófica y competencia permanente, la selección natural no premia rasgos ornamentales sino funcionales.
                    Aumentos en masa corporal, reforzamiento craneal, densidad ósea elevada y comportamiento territorial son respuestas típicas a presión predatoria intensa.
                    Las especies que sobreviven no son las más rápidas o espectaculares, sino aquellas que optimizan energía, resistencia estructural y eficiencia biomecánica dentro de su nicho ecológico.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="dot">3</div>
                <div>
                  <h3>Equilibrio inestable</h3>
                  <p>
                    La estabilidad del ecosistema no depende de abundancia masiva, sino de equilibrio entre natalidad elevada y mortalidad constante.
                    En entornos cerrados, la mortalidad juvenil suele ser extremadamente alta, lo que mantiene control poblacional sin necesidad de grandes fluctuaciones demográficas.
                    La aparente estabilidad ecológica es el resultado de ciclos continuos de reemplazo generacional, no de armonía permanente. La competencia por territorio y recursos es constante y estructural.
                  </p>
                </div>
              </div>
            </div>

            <div className="cta">
              <p>
                El ecosistema de Isla Calavera no es una fantasía desordenada: es un sistema evolutivo cerrado que puede analizarse con criterios paleobiológicos reales.
                Representa un modelo hipotético de cómo la presión ambiental sostenida puede moldear linajes enteros hacia morfologías radicalmente funcionales.
              </p>
            </div>
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="container">
            <div className="sub gallery-text">
            <p>
              La siguiente galería no cumple una función meramente ilustrativa. Cada imagen actúa como soporte visual para el análisis anatómico y ecológico desarrollado en las secciones anteriores.
            </p>
            <p>
              Se documentan proporciones corporales, relación entre masa y estructura ósea, configuración craneal, disposición de extremidades y patrones de interacción interespecífica dentro del ecosistema insular.
            </p>
            <p>
              En un entorno de presión selectiva constante, la morfología no es estética: es funcional. Las estructuras observadas —blindaje dérmico, densidad muscular, volumen torácico, longitud cervical y robustez mandibular— responden a demandas energéticas y dinámicas tróficas concretas.
            </p>
            <p>
              Las imágenes permiten evaluar coherencia biomecánica: distribución del peso, equilibrio del centro de masa, rango de movimiento articular y plausibilidad locomotora.
            </p>
            <p>
              Este archivo visual funciona como evidencia contextual para la reconstrucción hipotética del ecosistema de Isla Calavera: un sistema aislado, de competencia permanente y estabilidad basada en reemplazo generacional.
            </p>
          </div>

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
              Esta sección reúne fichas sintéticas de las especies reconstruidas dentro del ecosistema insular. Cada entrada resume rasgos morfológicos, rol trófico y contexto evolutivo bajo criterios de anatomía funcional y plausibilidad biomecánica.
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
