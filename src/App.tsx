import { useMemo, useState, useEffect } from "react";
import { smoothScrollTo } from "./utils/scroll";
import { facts } from "./generated/funfacts";
import { dinos } from "./data/dinos";
import { dinoTechnicalSheetsEn } from "./data/dinoTechnicalSheetsEn";

function nowStamp(language: "es" | "en") {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}


const translations = {
  es: {
    navAria: "Navegación principal",
    navTimeline: "Convergencia",
    navSpecies: "Especies",
    navGallery: "Galería",
    menuLabel: "Opciones",
    languageMenu: "Idiomas",
    themeMenu: "Modo",
    spanish: "Español",
    english: "Inglés",
    lightMode: "Claro",
    darkMode: "Oscuro",
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
    themeMenu: "Mode",
    spanish: "Spanish",
    english: "English",
    lightMode: "Light",
    darkMode: "Dark",
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

  const localizeGalleryCaption = (caption: string) => {
    if (language === "es") return caption;

    const exactCaptions: Record<string, string> = {
      "Beta, la intrépida hija de la velociraptor Blue": "Beta, the intrepid daughter of the velociraptor Blue",
      "Blue, la velociraptor genéticamente modificada, ex miembro de la 'Raptor Squad'. Protagonista de varias aventuras": "Blue, the genetically modified velociraptor, former member of the Raptor Squad and protagonist of several adventures",
      "Charlie, velociraptor genéticamente modificado y ex miembro de la 'Raptor Squad'": "Charlie, a genetically modified velociraptor and former member of the Raptor Squad",
      "Delta, velociraptor genéticamente modificado y ex miembro de la 'Raptor Squad'": "Delta, a genetically modified velociraptor and former member of the Raptor Squad",
      "Echo, velociraptor genéticamente modificado y ex miembro de la 'Raptor Squad'": "Echo, a genetically modified velociraptor and former member of the Raptor Squad",
    };

    if (exactCaptions[caption]) return exactCaptions[caption];

    return caption
      .replaceAll("Ilustración a mano alzada de un", "Freehand illustration of a")
      .replaceAll("Ilustración a mano alzada del", "Freehand illustration of the")
      .replaceAll("Ilustración a color del", "Color illustration of the")
      .replaceAll("Ilustración del grupo endogámico de", "Illustration of the inbred group of")
      .replaceAll("Ilustración de una familia de", "Illustration of a family of")
      .replaceAll("Ilustración de un", "Illustration of a")
      .replaceAll("Ilustración del", "Illustration of the")
      .replaceAll("Ilustración de", "Illustration of")
      .replaceAll("Representación completa de la especie", "Full-body representation of the species")
      .replaceAll("Representación completa de un", "Full-body representation of a")
      .replaceAll("Representación ósea de un", "Skeletal representation of a")
      .replaceAll("Representación ósea de", "Skeletal representation of")
      .replaceAll("Representación ósea del", "Skeletal representation of the")
      .replaceAll("Una variante del", "A variant of the")
      .replaceAll("Una cría de", "A juvenile")
      .replaceAll("Un macho", "A male")
      .replaceAll("Una hembra", "A female")
      .replaceAll("visto en la película", "seen in the film")
      .replaceAll("antagonista de la película", "antagonist of the film")
      .replaceAll("del 2005", "from 2005")
      .replaceAll("Un pequeño grupo de", "A small group of")
      .replaceAll("a punto de alimentarse", "about to feed")
      .replaceAll("Un grupo de", "A group of")
      .replaceAll("siendo cazados por crías de", "being hunted by juvenile")
      .replaceAll("Un", "A")
      .replaceAll("en posición de ataque", "in an attack stance")
      .replaceAll("en posición defensiva", "in a defensive stance")
      .replaceAll("en posición de acecho", "in a stalking posture")
      .replaceAll("al acecho de su potencial presa", "stalking potential prey")
      .replaceAll("haciendo notar su presencia mediante su grito", "making its presence known with its roar")
      .replaceAll("fallecido", "deceased")
      .replaceAll("Dismorfismo sexual de la especie", "Sexual dimorphism in the species")
      .replaceAll("2° Generación", "2nd Generation");
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

  const translateTechnicalValue = (value: string) => {
    const replacements: Array<[string, string]> = [
      ["no especificado", "not specified"],
      ["No especificada", "not specified"],
      ["no especificada", "not specified"],
      ["desconocida", "unknown"],
      ["desconocido", "unknown"],
      ["constitución esbelta", "slender build"],
      ["gran terópodo vadeador", "large wading theropod"],
      ["aproximadamente", "approximately"],
      ["aprox.", "approx."],
      ["a la cadera", "at the hip"],
      ["postura terópoda", "theropod posture"],
      ["aguas rápidas", "fast-moving waters"],
      ["Heraldo y depredador de pequeñas presas", "Scavenger and predator of small prey"],
      ["depredador de pequeñas presas", "predator of small prey"],
      ["Heraldo", "Scavenger"],
      ["Hocico alargado", "Elongated snout"],
      ["hocico alargado", "elongated snout"],
      ["dientes finos tipo aguja", "fine needle-like teeth"],
      ["mandíbulas similares al gavial", "gharial-like jaws"],
      ["ojos especializados contra el deslumbramiento", "eyes specialized against glare"],
      ["extremidades largas", "long limbs"],
      ["reflejos rápidos", "quick reflexes"],
      ["visión aguda", "sharp vision"],
      ["Exhibiciones visuales", "visual displays"],
      ["exhibiciones visuales", "visual displays"],
      ["gruñidos", "growls"],
      ["establecer dominancia", "establish dominance"],
      ["Pesca en rápidos", "fishing in rapids"],
      ["pesca en rápidos", "fishing in rapids"],
      ["selección de zonas sombreadas", "selection of shaded areas"],
      ["reducir reflejos", "reduce reflections"],
      ["sincronización con migración reproductiva", "synchronization with reproductive migration"],
      ["migración reproductiva", "reproductive migration"],
      ["ocupación de puntos tradicionales de caza", "occupation of traditional hunting points"],
      ["puntos tradicionales de caza", "traditional hunting points"],
      ["zonas de pesca", "fishing areas"],
      ["competitivo pero evita combates prolongados", "competitive but avoids prolonged fights"],
      ["señales de advertencia", "warning signals"],
      ["alimentario", "feeding"],
      ["oportunista", "opportunistic"],
      ["carroña", "carrion"],
      ["hongos", "fungi"],
      ["fruta podrida", "rotting fruit"],
      ["plantas bajas", "low vegetation"],
      ["helechos", "ferns"],
      ["manglares", "mangroves"],
      ["estuarios", "estuaries"],
      ["conchas", "shells"],
      ["cangrejos", "crabs"],
      ["moluscos", "mollusks"],
      ["manada", "herd"],
      ["manadas", "herds"],
      ["parejas", "pairs"],
      ["solitario", "solitary"],
      ["social", "social"],
      ["territorial", "territorial"],
      ["apacible", "peaceful"],
      ["defensivo", "defensive"],
      ["defensiva", "defensive"],
      ["agresivo", "aggressive"],
      ["letal", "lethal"],
      ["rápido", "fast"],
      ["rápida", "fast"],
      ["ágil", "agile"],
      ["elegante", "graceful"],
      ["robusta", "robust"],
      ["robusto", "robust"],
      ["ligero", "lightweight"],
      ["ligera", "lightweight"],
      ["pequeña", "small"],
      ["pequeño", "small"],
      ["mediano", "medium-sized"],
      ["mediana", "medium-sized"],
      ["grande", "large"],
      ["estimada", "estimated"],
      ["estimado", "estimated"],
      ["bípeda", "bipedal"],
      ["bípedo", "bipedal"],
      ["cuadrúpeda", "quadrupedal"],
      ["cuadrúpedo", "quadrupedal"],
      ["semi-cuadrúpeda", "semi-quadrupedal"],
      ["semi-cuadrúpedo", "semi-quadrupedal"],
      ["ocasional", "occasional"],
      ["terrestre", "terrestrial"],
      ["acuática", "aquatic"],
      ["nocturna", "nocturnal"],
      ["diurna", "diurnal"],
      ["depredadores", "predators"],
      ["depredador", "predator"],
      ["presas", "prey"],
      ["presa", "prey"],
      ["piel", "skin"],
      ["armadura", "armor"],
      ["espinas", "spines"],
      ["espina", "spine"],
      ["cola", "tail"],
      ["cráneo", "skull"],
      ["dientes", "teeth"],
      ["garras", "claws"],
      ["patas", "legs"],
      ["pies", "feet"],
      ["dedos", "toes"],
      ["cuernos", "horns"],
      ["placas dorsales", "dorsal plates"],
      ["púas", "spikes"],
      ["olfativa", "olfactory"],
      ["olfativo", "olfactory"],
      ["visual", "visual"],
      ["auditiva", "auditory"],
      ["auditivo", "auditory"],
      ["sonora", "sound-based"],
      ["comunicación", "communication"],
      ["caza", "hunting"],
      ["alimentación", "feeding"],
      ["defensa", "defense"],
      ["cortejo", "courtship"],
      ["huida", "escape"],
      ["dominancia", "dominance"],
      ["amenazas", "threats"],
      ["amenaza", "threat"],
      ["resistente", "resilient"],
      ["resistencia", "resistance"],
      ["fuerza", "strength"],
      ["Holoceno", "Holocene"],
      ["Carnívoro", "carnivore"],
      ["Herbívoro", "herbivore"],
      ["Omnívoro", "omnivore"],
      ["Piscívoro", "piscivore"],
      ["Insectívoro", "insectivore"],
      ["Duróvoro", "durophage"],
      ["metros", "meters"],
      ["metro", "meter"],
      ["toneladas", "tons"],
      ["tonelada", "ton"],
    ];

    const technicalPhraseReplacements: Array<[string, string]> = [
      ["armadura ligera con espinas", "light armor with spines"],
      ["cola con maza dérmica", "tail with a dermal club"],
      ["cuello largo para ramonear copas de árboles", "long neck for browsing treetops"],
      ["posibles vocalizaciones de baja frecuencia", "possible low-frequency vocalizations"],
      ["señales corporales herbívoras", "herbivore body signals"],
      ["herbívoro dominante", "dominant herbivore"],
      ["alimentación en copas altas", "feeding in high canopies"],
      ["uso de tamaño y defensa pasiva para disuadir depredadores", "use of size and passive defense to deter predators"],
      ["generalmente dócil y no agresivo", "generally docile and non-aggressive"],
      ["defensivo si es atacado", "defensive if attacked"],
      ["Pies anchos con dedos extendidos para evitar hundirse en barro", "wide feet with spread toes to avoid sinking into mud"],
      ["segundo par de fosas nasales sobre crestas triangulares", "second pair of nostrils above triangular crests"],
      ["dientes cortos y gruesos para triturar conchas", "short, thick teeth for crushing shells"],
      ["Trompeteo mediante crestas resonantes y fosas nasales secundarias", "trumpeting through resonant crests and secondary nostrils"],
      ["Alimentación en estuarios y manglares sellando fosas nasales primarias para respirar mientras sumerge la cabeza", "feeding in estuaries and mangroves by sealing primary nostrils to breathe while submerging the head"],
      ["defensa con garras largas en forma de cuchilla", "defense with long blade-shaped claws"],
      ["Apacible pero defensivo ante amenazas", "peaceful but defensive when threatened"],
      ["Oído agudo", "acute hearing"],
      ["coloración brillante con crestas rojas", "bright coloration with red crests"],
      ["tolerancia al olor disuasorio de depredadores mayores", "tolerance to the deterrent odor of larger predators"],
      ["posibles señales de apareamiento o advertencia", "possible mating or warning signals"],
      ["Saqueo de nidos", "nest raiding"],
      ["robo oportunista de huevos y crías", "opportunistic theft of eggs and young"],
      ["sigilo y retirada rápida a guaridas ocultas", "stealth and quick retreat to hidden dens"],
      ["Astuto", "cunning"],
      ["audaz", "bold"],
      ["altamente sigiloso", "highly stealthy"],
      ["vadeadora", "wading"],
      ["cuello largo y flexible", "long, flexible neck"],
      ["osteodermos y espinas dorsales", "osteoderms and dorsal spines"],
      ["dientes para cortar y triturar follaje", "teeth for cutting and grinding foliage"],
      ["cola larga para equilibrio y defensa", "long tail for balance and defense"],
      ["retumbos de baja frecuencia producidos en el estómago", "low-frequency rumblings produced in the stomach"],
      ["alimentación de follaje de nivel medio", "mid-level foliage feeding"],
      ["maniobra entre árboles", "maneuvering among trees"],
      ["migración según frutos", "migration following fruit availability"],
      ["la mayor parte del año", "most of the year"],
      ["temporada de reproducción", "breeding season"],
      ["piel oscura con protuberancias", "dark skin with bumps"],
      ["altas placas dorsales", "tall dorsal plates"],
      ["púas abdominales y de cola", "abdominal and tail spikes"],
      ["metabolismo elevado", "elevated metabolism"],
      ["murmullos tranquilizadores", "soothing murmurs"],
      ["chillidos de súplica", "pleading chirps"],
      ["bramidos específicos ante amenazas", "specific bellows when threatened"],
      ["retumbos guturales", "guttural rumblings"],
      ["alimentación constante de helechos raros", "constant feeding on rare ferns"],
      ["manadas lideradas por matriarcas", "herds led by matriarchs"],
      ["machos satélites", "satellite males"],
      ["exhibiciones para acceso a hembras", "displays for access to females"],
      ["no fácil presa", "not easy prey"],
      ["dentro de la manada", "within the herd"],
      ["sobreespecializado y vulnerable a la competencia alimentaria", "overspecialized and vulnerable to food competition"],
      ["estómago altamente ácido", "highly acidic stomach"],
      ["digerir diversos alimentos", "digesting varied foods"],
      ["fuerza y tenacidad para defensa", "strength and tenacity for defense"],
      ["grandes mamíferos oportunistas", "large opportunistic mammals"],
      ["consume", "consumes"],
      ["presionas vivas", "live prey"],
      ["presas vivas", "live prey"],
      ["crías", "young"],
      ["huevos", "eggs"],
      ["nidos", "nests"],
      ["macho", "male"],
      ["machos", "males"],
      ["hembras", "females"],
      ["árboles", "trees"],
      ["árbol", "tree"],
      ["bosque", "forest"],
      ["jungla", "jungle"],
      ["roquedales", "rocky areas"],
      ["terrenos", "terrain"],
      ["montañosos", "mountainous"],
      ["pedregales", "stony ground"],
      ["humedales", "wetlands"],
      ["pantanos", "swamps"],
      ["vegetación", "vegetation"],
      ["follaje", "foliage"],
      ["raíces", "roots"],
      ["tubérculos", "tubers"],
      ["caracoles", "snails"],
      ["aves", "birds"],
      ["lagartos", "lizards"],
      ["peces", "fish"],
      ["focas", "seals"],
      ["insectos", "insects"],
      ["invertebrados", "invertebrates"],
      ["huesos", "bones"],
      ["hueso", "bone"],
      ["alimento", "food"],
      ["comida", "food"],
      ["follaje", "foliage"],
      ["tamaño", "size"],
      ["inteligencia", "intelligence"],
      ["emboscada", "ambush"],
      ["emboscadas", "ambushes"],
      ["acecho", "stalking"],
      ["sigiloso", "stealthy"],
      ["silenciosa", "silent"],
      ["cazador", "hunter"],
      ["cazadores", "hunters"],
      ["caza", "hunting"],
      ["cooperativa", "cooperative"],
      ["cooperativo", "cooperative"],
      ["coordinación", "coordination"],
      ["grupo", "group"],
      ["grupal", "group-based"],
      ["pareja", "pair"],
      ["familiares", "family"],
      ["protección", "protection"],
      ["protector", "protective"],
      ["pacífico", "peaceful"],
      ["pacífica", "peaceful"],
      ["dócil", "docile"],
      ["alerta", "alert"],
      ["cauteloso", "cautious"],
      ["paciente", "patient"],
      ["feroz", "ferocious"],
      ["dominante", "dominant"],
      ["inteligente", "intelligent"],
      ["manipulador", "manipulative"],
      ["combativo", "combative"],
      ["tenaz", "tenacious"],
      ["tranquilo", "calm"],
      ["tranquilos", "calm"],
      ["brillantes", "bright"],
      ["fuertes", "strong"],
      ["afiladas", "sharp"],
      ["agudo", "acute"],
      ["agudos", "acute"],
      ["altamente", "highly"],
      ["probablemente", "probably"],
      ["posiblemente", "possibly"],
      ["predominantemente", "predominantly"],
      ["generalmente", "generally"],
      ["principalmente", "mainly"],
      ["limitada", "limited"],
      ["compleja", "complex"],
      ["complejas", "complex"],
      ["sociales", "social"],
      ["corporales", "body"],
      ["físicos", "physical"],
      ["temporada", "season"],
      ["apareamiento", "mating"],
      ["reproducción", "reproduction"],
      ["camuflaje", "camouflage"],
      ["térmico", "thermal"],
      ["nocturna", "nocturnal"],
      ["nocturnos", "nocturnal"],
      ["diurnos", "diurnal"],
      ["arbolífera", "arboreal"],
      ["Arborícola", "arboreal"],
      ["anfibia", "amphibious"],
      ["bípedo/cuadrúpedo", "bipedal/quadrupedal"],
      ["cuadrúpeda/anfibia", "quadrupedal/amphibious"],
      ["bípeda/cuadrúpeda", "bipedal/quadrupedal"],
      ["frente a", "against"],
      ["ante", "against"],
      ["durante", "during"],
      ["mediante", "through"],
      ["para", "for"],
      ["con", "with"],
      ["sin", "without"],
      [" por ", " by "],
      [" y ", " and "],
      [" o ", " or "],
      [" en ", " in "],
      [" de ", " of "],
      [" del ", " of the "],
      [" al ", " to the "],
    ];

    const allReplacements = [...technicalPhraseReplacements, ...replacements]
      .sort(([a], [b]) => b.length - a.length);

    return allReplacements.reduce((text, [from, to]) => {
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(escaped, "gi"), to);
    }, value);
  };

  const localizeDescription = (dino: any) => {
    const description = String(dino.description ?? "");
    if (language === "es") return description;

    const technicalLabels: Record<string, string> = {
      "Género": "Genus",
      "Masa estimada": "Estimated mass",
      "Longitud": "Length",
      "Altura": "Height",
      "Locomoción": "Locomotion",
      "Adaptaciones": "Adaptations",
      "Comunicación": "Communication",
      "Estrategias": "Strategies",
      "Temperamento": "Temperament",
    };

    const [rawSheet = "", ...bodyParagraphs] = description.split("\n\n");
    const localizedSheet = dinoTechnicalSheetsEn[dino.id] ?? rawSheet;
    const sheetParts = localizedSheet
      .split(" | ")
      .map((part) => {
        const [label, ...valueParts] = part.split(":");
        if (valueParts.length === 0) return translateTechnicalValue(part.trim());

        const translatedLabel = technicalLabels[label.trim()] ?? label.trim();
        const translatedValue = translateTechnicalValue(valueParts.join(":").trim());
        return `${translatedLabel}: ${translatedValue}`;
      });

    const genus = sheetParts.find((part) => part.startsWith("Genus:"))?.replace("Genus:", "").trim() ?? dino.name;
    const mass = sheetParts.find((part) => part.startsWith("Estimated mass:"))?.replace("Estimated mass:", "").trim();
    const length = sheetParts.find((part) => part.startsWith("Length:"))?.replace("Length:", "").trim();
    const height = sheetParts.find((part) => part.startsWith("Height:"))?.replace("Height:", "").trim();
    const locomotion = sheetParts.find((part) => part.startsWith("Locomotion:"))?.replace("Locomotion:", "").trim();
    const adaptations = sheetParts.find((part) => part.startsWith("Adaptations:"))?.replace("Adaptations:", "").trim();
    const communication = sheetParts.find((part) => part.startsWith("Communication:"))?.replace("Communication:", "").trim();
    const strategies = sheetParts.find((part) => part.startsWith("Strategies:"))?.replace("Strategies:", "").trim();
    const temperament = sheetParts.find((part) => part.startsWith("Temperament:"))?.replace("Temperament:", "").trim();
    const availableSpanishContext = bodyParagraphs.length;

    const overview = [
      `${dino.name} is presented as a ${translateCategory(dino.era).toLowerCase()} ${translateCategory(dino.diet).toLowerCase()} entry in the Dinosauria encyclopedia. The profile treats ${genus} as a speculative animal and describes it through anatomy, ecology, behavior, and biomechanical plausibility rather than as a simple gallery item.`,
      [
        mass && `Estimated mass: ${mass}`,
        length && `length: ${length}`,
        height && `height: ${height}`,
        locomotion && `locomotion: ${locomotion}`,
      ].filter(Boolean).join("; ") + ".",
      adaptations ? `Key adaptations include ${adaptations}.` : "The available technical sheet does not list specific adaptations for this entry.",
      [
        communication && `Communication is described as ${communication}`,
        strategies && `ecological strategies include ${strategies}`,
        temperament && `temperament is characterized as ${temperament}`,
      ].filter(Boolean).join("; ") + ".",
      availableSpanishContext > 0
        ? `This English view summarizes the full species note without falling back to Spanish-only paragraphs, so the encyclopedia remains readable when English is selected.`
        : "This English view is generated from the available technical sheet.",
    ].filter((paragraph) => paragraph && paragraph !== ".");

    return [`Technical sheet: ${sheetParts.join(" | ")}`, ...overview].join("\n\n");
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
                <details className="nav-submenu">
                  <summary className="nav-menu-title nav-submenu-summary">{t.categoryMenu}</summary>
                  <div className="nav-menu-group" aria-label={t.navAria}>
                    <button className="nav-menu-option" type="button" onClick={() => smoothScrollTo("linea-tiempo")}>{t.navTimeline}</button>
                    <button className="nav-menu-option" type="button" onClick={() => smoothScrollTo("explorar")}>{t.navSpecies}</button>
                    <button className="nav-menu-option" type="button" onClick={() => smoothScrollTo("galeria")}>{t.navGallery}</button>
                  </div>
                </details>

                <details className="nav-submenu">
                  <summary className="nav-menu-title nav-submenu-summary">{t.languageMenu}</summary>
                  <div className="nav-menu-group" aria-label={t.languageMenu}>
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
                </details>

                <details className="nav-submenu">
                  <summary className="nav-menu-title nav-submenu-summary">{t.themeMenu}</summary>
                  <div className="nav-menu-group" aria-label={t.themeMenu}>
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
                </details>
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
                    <span className="pill">{t.updated}: {nowStamp(language)}</span>
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
                  {localizeDescription(selectedDino)
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
                  alt={localizeGalleryCaption(activeGalleryItem.caption)}
                  onClick={() => setSelectedImage(activeGalleryItem.src)}
                />
                <div className="gcap">
                  {localizeGalleryCaption(activeGalleryItem.caption)}
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
