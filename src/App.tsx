import { useMemo, useState, useEffect } from "react";
import { smoothScrollTo } from "./utils/scroll";
import { facts } from "./generated/funfacts";
import { dinos } from "./data/dinos";

function nowStamp() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const y = d.getFullYear();
  return `${day}/${m}/${y}`;
}


const translations = {
  es: {
    navAria: "Navegación principal",
    navTimeline: "Convergencia",
    navSpecies: "Especies",
    navGallery: "Galería",
    menuLabel: "Opciones",
    languageMenu: "Idiomas",
    themeMenu: "Modo de color",
    spanish: "Español",
    english: "Inglés",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    heroTitle: "Una lectura científica de criaturas imposibles",
    heroLead: "Sitio no oficial de las especies ficticias vistas por el hombre... y otras creadas por su ambición.",
    factTitle: "Curiosidad del día",
    updated: "Actualizado",
    more: "Más",
    aboutTitle: "Acerca del proyecto",
    aboutIntro: "Descubriendo Dinos nace de la pasión por la paleontología y la creatividad digital. Este proyecto combina ciencia, tecnología y experiencia visual para ofrecer una inmersión única en el mundo de los dinosaurios, explorando no solo su anatomía y comportamiento, sino también la ecología de los ecosistemas que podrían haber habitado, de manera que incluso las especies ficticias se presentan con un trasfondo creíble y detallado.",
    scientificTitle: "Enfoque científico",
    technicalTitle: "Arquitectura técnica",
    timelineTitle: "Convergencia",
    timelineOneTitle: "Aislamiento y diseño biotecnológico",
    timelineTwoTitle: "Equilibrio natural y ruptura ecológica",
    speciesTitle: "Especies",
    speciesIntro: "Esta sección reúne la forma, función en el ecosistema y contexto biológico de las especies, analizados con criterios anatómicos, coherencia ecológica y realismo biomecánico.",
    all: "Todos",
    galleryTitle: "Galería",
    galleryPrevious: "Imagen anterior",
    galleryNext: "Imagen siguiente",
    galleryEmpty: "No hay imágenes de galería para esta selección.",
    modalAlt: "Vista ampliada",
    rights: "Todos los derechos reservados",
    categoryLabel: "Categoría",
    dinoLabel: "Entrada",
    selectDino: "Elegí un dinosaurio",
    encyclopediaTitle: "Entrada enciclopédica",
    entriesAvailable: "entradas disponibles",
    noEntries: "No hay entradas para esta categoría.",
    technicalSheet: "Ficha técnica",
    openImage: "Ampliar imagen de",
    categoryMenu: "Exploración",
    aboutScientificOne: "Cada especie es analizada siguiendo criterios de anatomía comparada y modelado biomecánico: estimamos masa corporal, centro de gravedad, tipo de locomoción, resistencia estructural y la función de su cráneo y dientes. Las criaturas inventadas se estudian bajo las mismas reglas que los fósiles reales, asegurando consistencia y plausibilidad.",
    aboutScientificTwo: "Además, consideramos las presiones selectivas que podrían actuar en sus ecosistemas: la competencia entre especies, la adaptación a recursos limitados y el rol trófico de cada dinosaurio dentro de redes alimentarias hipotéticas, creando así un entorno coherente donde cada criatura tiene un propósito y un lugar.",
    aboutScientificThree: "Este enfoque permite que los usuarios no solo observen a los dinosaurios, sino que comprendan cómo podrían haber interactuado entre sí y con su ambiente, haciendo de la exploración algo educativo y entretenido al mismo tiempo.",
    aboutTechnicalOne: "El sitio está construido sobre React y TypeScript, lo que garantiza una base sólida, escalable y fácil de mantener a medida que el proyecto crece. Esto nos permite incorporar nuevas especies, rutas individuales por dinosaurio y filtros taxonómicos sin comprometer la estabilidad del sistema.",
    aboutTechnicalTwo: "Para funcionalidades interactivas más dinámicas usamos JavaScript, mientras que el módulo editorial de datos se gestiona con CoffeeScript, compilado automáticamente durante el proceso de build. Esta combinación asegura eficiencia y flexibilidad técnica.",
    aboutTechnicalThree: "La arquitectura está pensada para soportar contenido multimedia avanzado, como animaciones, galerías 3D y mapas de ecosistemas, permitiendo que la experiencia del usuario sea rica, educativa y envolvente, al mismo tiempo que la base de datos de especies se mantiene organizada y lista para futuras expansiones.",
    aboutTechnicalFour: "En definitiva, cada capa del proyecto —desde el código hasta el contenido— ha sido diseñada para que la exploración de estas criaturas ficticias se sienta real, educativa y apasionante, reflejando la misma curiosidad que inspira a los paleontólogos del mundo real.",
    timelineOneBody: ["En entornos de alta competencia, la selección natural favorece mayor tamaño, refuerzo estructural y defensas especializadas.", "Mientras la evolución actúa durante millones de años, la manipulación deliberada del ADN responde a objetivos humanos concretos: aumentar masa, inteligencia o capacidad ofensiva. Así, la especialización puede surgir tanto por presión evolutiva sostenida como por intervención tecnológica, generando especies distintas en origen pero comparables en impacto ecológico."],
    timelineTwoBody: ["Los ecosistemas naturales funcionan a partir de ciclos de vida y relaciones tróficas que sostienen un equilibrio dinámico a lo largo del tiempo evolutivo.", "Cuando se introducen organismos diseñados, ese balance se altera, ya que carecen de una historia adaptativa integrada al entorno.", "El resultado es un sistema mezclado, redefiniendo los límites entre la creación artificial, la naturaleza y la paleobiología tradicional."],
  },
  en: {
    navAria: "Main navigation",
    navTimeline: "Convergence",
    navSpecies: "Species",
    navGallery: "Gallery",
    menuLabel: "Options",
    languageMenu: "Languages",
    themeMenu: "Color mode",
    spanish: "Spanish",
    english: "English",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    heroTitle: "A scientific reading of impossible creatures",
    heroLead: "An unofficial site about fictional species seen by humankind... and others created by its ambition.",
    factTitle: "Fact of the day",
    updated: "Updated",
    more: "More",
    aboutTitle: "About the project",
    aboutIntro: "Discovering Dinos was born from a passion for paleontology and digital creativity. This project combines science, technology and visual experience to offer a unique immersion into the world of dinosaurs, exploring not only their anatomy and behavior, but also the ecology of the ecosystems they might have inhabited, so even fictional species are presented with a believable and detailed background.",
    scientificTitle: "Scientific approach",
    technicalTitle: "Technical architecture",
    timelineTitle: "Convergence",
    timelineOneTitle: "Isolation and biotechnological design",
    timelineTwoTitle: "Natural balance and ecological rupture",
    speciesTitle: "Species",
    speciesIntro: "This section brings together each species' form, ecosystem role and biological context, analyzed through anatomical criteria, ecological coherence and biomechanical realism.",
    all: "All",
    galleryTitle: "Gallery",
    galleryPrevious: "Previous image",
    galleryNext: "Next image",
    galleryEmpty: "There are no gallery images for this selection.",
    modalAlt: "Expanded view",
    rights: "All rights reserved",
    categoryLabel: "Category",
    dinoLabel: "Entry",
    selectDino: "Choose a dinosaur",
    encyclopediaTitle: "Encyclopedia entry",
    entriesAvailable: "available entries",
    noEntries: "There are no entries for this category.",
    technicalSheet: "Technical sheet",
    openImage: "Open image of",
    categoryMenu: "Exploration",
    aboutScientificOne: "Each species is analyzed through comparative anatomy and biomechanical modeling: body mass, center of gravity, locomotion type, structural resistance, and skull and tooth function. Invented creatures are studied under the same rules as real fossils, ensuring consistency and plausibility.",
    aboutScientificTwo: "We also consider the selective pressures that could shape their ecosystems: interspecies competition, adaptation to limited resources, and the trophic role of each dinosaur within hypothetical food webs, creating a coherent environment where every creature has a purpose and a place.",
    aboutScientificThree: "This approach lets users not only observe dinosaurs, but also understand how they might have interacted with one another and with their environment, making exploration educational and entertaining at the same time.",
    aboutTechnicalOne: "The site is built with React and TypeScript, providing a solid, scalable, and maintainable foundation as the project grows. This allows new species, individual dinosaur routes, and taxonomic filters to be added without compromising system stability.",
    aboutTechnicalTwo: "More dynamic interactive features use JavaScript, while the editorial data module is managed with CoffeeScript and compiled automatically during the build process. This combination provides technical efficiency and flexibility.",
    aboutTechnicalThree: "The architecture is designed to support advanced multimedia content, such as animations, 3D galleries, and ecosystem maps, keeping the user experience rich, educational, and immersive while the species database remains organized and ready for future expansion.",
    aboutTechnicalFour: "Ultimately, every layer of the project —from code to content— has been designed so exploring these fictional creatures feels real, educational, and exciting, reflecting the same curiosity that inspires real-world paleontologists.",
    timelineOneBody: ["In highly competitive environments, natural selection favors greater size, reinforced structures, and specialized defenses.", "While evolution acts over millions of years, deliberate DNA manipulation responds to specific human goals: increased mass, intelligence, or offensive capability. Specialization can therefore arise both from sustained evolutionary pressure and from technological intervention, producing species that differ in origin but are comparable in ecological impact."],
    timelineTwoBody: ["Natural ecosystems operate through life cycles and trophic relationships that sustain a dynamic balance across evolutionary time.", "When engineered organisms are introduced, that balance changes because they lack an adaptive history integrated into the environment.", "The result is a blended system that redefines the boundaries between artificial creation, nature, and traditional paleobiology."],
  },
} as const;
const englishFacts = [
  "Fossil records are not complete albums; they are archives with torn-out pages.",
  "Footprints tell stories bones cannot: behavior, speed, and direction.",
  "Skull Island would be an extreme evolutionary laboratory shaped by ruthless selection.",
  "Biomechanics sets limits: not every giant can run, but mass can still dominate.",
  "Taphonomy explains how a body became a fossil: death, transport, burial, and mineralization.",
  "Mass extinctions do not erase life; they change the rules of the game.",
];

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
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Filtros de enciclopedia
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedDinoId, setSelectedDinoId] = useState(dinos[0]?.id ?? "");
  const [galleryScope, setGalleryScope] = useState<"all" | "dino">("dino");

  // Rotación Galería
  const [galleryIndex, setGalleryIndex] = useState(0);

  const t = translations[language];

  const fact = useMemo(() => {
    const sourceFacts = language === "en" ? englishFacts : facts;
    const i = ((factIndex % sourceFacts.length) + sourceFacts.length) % sourceFacts.length;
    return sourceFacts[i];
  }, [factIndex, language]);

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

  // Catálogo de etiquetas disponibles (tags + era/diet)
  const availableFilters = useMemo(() => {
    const all = dinos.flatMap((d: any) => getDinoTags(d));
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredDinos = useMemo(() => {
    if (!activeFilter) return dinos;

    const tag = normalizeTag(activeFilter);
    return dinos.filter((d: any) => getDinoTags(d).includes(tag));
  }, [activeFilter]);

  useEffect(() => {
    setSelectedDinoId(filteredDinos[0]?.id ?? "");
  }, [filteredDinos]);

  const selectedDino = useMemo(
    () => filteredDinos.find((d: any) => d.id === selectedDinoId) ?? filteredDinos[0],
    [filteredDinos, selectedDinoId]
  );

  const translateCategory = (tag: string) => {
    if (language === "es") return tag;

    const labels: Record<string, string> = {
      Holoceno: "Holocene",
      "Carnívoro": "Carnivore",
      "Duróvoro": "Durophage",
      "Herbívoro": "Herbivore",
      "Insectívoro": "Insectivore",
      "Piscívoro": "Piscivore",
      "Omnívoro": "Omnivore",
    };

    return labels[tag] ?? tag;
  };


  const displayedGallery = useMemo(() => {
    if (galleryScope === "all" || !selectedDino) return gallery;

    const dinoName = selectedDino.name.toLowerCase();
    const dinoId = selectedDino.id.toLowerCase();
    const searchTerms = new Set([
      dinoId,
      ...dinoId.split("-"),
      ...dinoName.split(/\s+/),
    ]);

    const matchingGallery = gallery.filter((item) => {
      const haystack = `${item.src} ${item.caption}`.toLowerCase();
      return Array.from(searchTerms).some((term) => term.length > 3 && haystack.includes(term));
    });

    if (matchingGallery.length > 0) return matchingGallery;

    return [{
      id: 0,
      src: selectedDino.image,
      caption: selectedDino.name,
    }];
  }, [gallery, galleryScope, selectedDino]);

  useEffect(() => {
    setGalleryIndex(0);
  }, [displayedGallery]);

  const normalizedGalleryIndex = displayedGallery.length === 0 ? 0 : galleryIndex % displayedGallery.length;
  const activeGalleryItem = displayedGallery[normalizedGalleryIndex];

  const moveGallery = (step: number) => {
    setGalleryIndex((current) => {
      if (displayedGallery.length === 0) return 0;
      return (current + step + displayedGallery.length) % displayedGallery.length;
    });
  };

  const localizeDescription = (description: string) => {
    if (language === "es") return description;

    return description
      .replaceAll("Género:", "Genus:")
      .replaceAll("Masa estimada:", "Estimated mass:")
      .replaceAll("Longitud:", "Length:")
      .replaceAll("Altura:", "Height:")
      .replaceAll("Locomoción:", "Locomotion:")
      .replaceAll("Adaptaciones:", "Adaptations:")
      .replaceAll("Comunicación:", "Communication:")
      .replaceAll("Estrategias:", "Strategies:")
      .replaceAll("Temperamento:", "Temperament:")
      .replaceAll("desconocida", "unknown")
      .replaceAll("No especificada", "Not specified")
      .replaceAll("aprox.", "approx.")
      .replaceAll("bípeda", "bipedal")
      .replaceAll("cuadrúpeda", "quadrupedal")
      .replaceAll("semi-cuadrúpeda", "semi-quadrupedal")
      .replaceAll("Carnívoro", "Carnivore")
      .replaceAll("Herbívoro", "Herbivore")
      .replaceAll("Omnívoro", "Omnivore")
      .replaceAll("Piscívoro", "Piscivore")
      .replaceAll("Insectívoro", "Insectivore")
      .replaceAll("Duróvoro", "Durophage")
      .replaceAll("Holoceno", "Holocene");
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

          <nav className="nav-links" aria-label={t.navAria}>
            <details className="nav-menu">
              <summary className="nav-btn nav-menu-button" aria-label={t.menuLabel}>
                ☰
              </summary>

              <div className="nav-menu-panel">
                <div className="nav-menu-group" aria-label={t.navAria}>
                  <span className="nav-menu-title">{t.categoryMenu}</span>
                  <button className="nav-menu-option" type="button" onClick={() => smoothScrollTo("linea-tiempo")}>{t.navTimeline}</button>
                  <button className="nav-menu-option" type="button" onClick={() => smoothScrollTo("explorar")}>{t.navSpecies}</button>
                  <button className="nav-menu-option" type="button" onClick={() => smoothScrollTo("galeria")}>{t.navGallery}</button>
                </div>

                <div className="nav-menu-group" aria-label={t.languageMenu}>
                  <span className="nav-menu-title">{t.languageMenu}</span>
                  <button
                    className={`nav-menu-option ${language === "es" ? "nav-menu-option-active" : ""}`}
                    type="button"
                    aria-pressed={language === "es"}
                    onClick={() => setLanguage("es")}
                  >
                    🇪🇸 {t.spanish}
                  </button>
                  <button
                    className={`nav-menu-option ${language === "en" ? "nav-menu-option-active" : ""}`}
                    type="button"
                    aria-pressed={language === "en"}
                    onClick={() => setLanguage("en")}
                  >
                    🇺🇸 {t.english}
                  </button>
                </div>

                <div className="nav-menu-group" aria-label={t.themeMenu}>
                  <span className="nav-menu-title">{t.themeMenu}</span>
                  <button
                    className={`nav-menu-option ${theme === "dark" ? "nav-menu-option-active" : ""}`}
                    type="button"
                    aria-pressed={theme === "dark"}
                    onClick={() => setTheme("dark")}
                  >
                    🌙 {t.darkMode}
                  </button>
                  <button
                    className={`nav-menu-option ${theme === "light" ? "nav-menu-option-active" : ""}`}
                    type="button"
                    aria-pressed={theme === "light"}
                    onClick={() => setTheme("light")}
                  >
                    ☀️ {t.lightMode}
                  </button>
                </div>
              </div>
            </details>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="card hero-card">
              <div className="hero-inner">
                <div>
                  <h1 className="h1">{t.heroTitle}</h1>
                  <p className="lead">
                    {t.heroLead}
                  </p>
                </div>

                <aside className="hero-aside" aria-label={t.factTitle}>
                  <div className="fact-title"><strong>{t.factTitle}</strong></div>
                  <div className="fact">{fact}</div>
                  <div className="fact-footer">
                    <span className="pill">{t.updated}: {nowStamp()}</span>
                    <button className="smallbtn" onClick={() => setFactIndex((v) => v + 1)}>{t.more}</button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="section">
          <div className="container">
            <h2 className="h2">{t.aboutTitle}</h2>
            <p className="section-intro">
              {t.aboutIntro}
            </p>

            <div className="cards">
              <div className="card">
                <h3 className="card-title">{t.scientificTitle}</h3>
                <p>
                  {t.aboutScientificOne}
                </p>
                <p>
                  {t.aboutScientificTwo}
                </p>
                <p>
                  {t.aboutScientificThree}
                </p>
              </div>

              <div className="card">
                <h3 className="card-title">{t.technicalTitle}</h3>
                <p>{t.aboutTechnicalOne}</p>
                <p>
                  {t.aboutTechnicalTwo}
                </p>
                <p>
                  {t.aboutTechnicalThree}
                </p>
                <p>
                  {t.aboutTechnicalFour}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="linea-tiempo" className="section">
          <div className="container">
            <h2 className="h2">{t.timelineTitle}</h2>
          <div className="cards cards-2col">
            <article className="card timeline-card">
              <strong className="timeline-title">{t.timelineOneTitle}</strong>

              <div className="timeline-text">
                {t.timelineOneBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>

            <article className="card timeline-card">
              <strong className="timeline-title">{t.timelineTwoTitle}</strong>

              <div className="timeline-text">
                {t.timelineTwoBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          </div>     {/* cierre cards */}
        </div>       {/* cierre container */}
      </section>

        <section id="explorar" className="section">
          <div className="container">
            <h2 className="h2">{t.speciesTitle}</h2>
            <p className="sub">
              {t.speciesIntro}
            </p>

            <div className="encyclopedia-controls" aria-label={t.navSpecies}>
              <label className="select-field">
                <span>{t.categoryLabel}</span>
                <select
                  value={activeFilter ?? "all"}
                  onChange={(event) => {
                    const value = event.target.value;
                    setActiveFilter(value === "all" ? null : value);
                    setGalleryScope(value === "all" ? "all" : "dino");
                  }}
                >
                  <option value="all">{t.all}</option>
                  {availableFilters.map((tag) => (
                    <option key={tag} value={tag}>
                      {translateCategory(tag)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select-field">
                <span>{t.dinoLabel}</span>
                <select
                  value={selectedDinoId}
                  onChange={(event) => {
                    setSelectedDinoId(event.target.value);
                    setGalleryScope("dino");
                  }}
                  disabled={filteredDinos.length === 0}
                >
                  {filteredDinos.length === 0 ? (
                    <option value="">{t.noEntries}</option>
                  ) : (
                    filteredDinos.map((d: any) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))
                  )}
                </select>
              </label>
            </div>

            <p className="sub encyclopedia-count">
              {filteredDinos.length} {t.entriesAvailable}
            </p>

            {selectedDino ? (
              <article className="card encyclopedia-entry">
                <div className="entry-header">
                  <div>
                    <span className="entry-kicker">{t.encyclopediaTitle}</span>
                    <h3 className="dino-title">{selectedDino.name}</h3>
                  </div>

                  <div className="badges entry-badges" aria-label={t.categoryLabel}>
                    <button
                      className={`badge ${activeFilter === selectedDino.era ? "badge-active" : ""}`}
                      type="button"
                      onClick={() => {
                        setActiveFilter(selectedDino.era);
                        setGalleryScope("dino");
                      }}
                    >
                      {translateCategory(selectedDino.era)}
                    </button>

                    <button
                      className={`badge ${activeFilter === selectedDino.diet ? "badge-active" : ""}`}
                      type="button"
                      onClick={() => {
                        setActiveFilter(selectedDino.diet);
                        setGalleryScope("dino");
                      }}
                    >
                      {translateCategory(selectedDino.diet)}
                    </button>
                  </div>
                </div>

                <img
                  src={(selectedDino as any).image}
                  alt={`${t.openImage} ${selectedDino.name}`}
                  className="dino-image encyclopedia-image"
                  onClick={() => setSelectedImage((selectedDino as any).image)}
                />

                <div className="sub dino-text encyclopedia-text">
                  {localizeDescription(String(selectedDino.description ?? ""))
                    .split("\n\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </article>
            ) : (
              <div className="card"><p>{t.noEntries}</p></div>
            )}
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="container">
            <h2 className="h2">{t.galleryTitle}</h2>
          {activeGalleryItem ? (
            <div className="gallery" aria-live="polite">
              <button
                className="gallery-arrow gallery-arrow-left"
                type="button"
                aria-label={t.galleryPrevious}
                onClick={() => moveGallery(-1)}
              >
                ‹
              </button>

              <div className="gimg">
                <img
                  src={activeGalleryItem.src}
                  alt={activeGalleryItem.caption}
                  onClick={() => setSelectedImage(activeGalleryItem.src)}
                />
                <div className="gcap">
                  {activeGalleryItem.caption}
                  <span className="gallery-counter">{normalizedGalleryIndex + 1} / {displayedGallery.length}</span>
                </div>
              </div>

              <button
                className="gallery-arrow gallery-arrow-right"
                type="button"
                aria-label={t.galleryNext}
                onClick={() => moveGallery(1)}
              >
                ›
              </button>
            </div>
          ) : (
            <div className="card"><p>{t.galleryEmpty}</p></div>
          )}
          </div>
        </section>
      </main>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt={t.modalAlt} />
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <small>© {new Date().getFullYear()} {t.rights} • Built with HTML5, CSS3, JavaScript, TypeScript, CoffeeScript & React.js • UX/UI Interface • Deployed on Vercel ®</small>
        </div>
      </footer>
    </>
  );
}
