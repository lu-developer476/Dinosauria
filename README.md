# Dinosauria

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CoffeeScript](https://img.shields.io/badge/CoffeeScript-2F2625?style=for-the-badge&logo=coffeescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Dinosauria** es una enciclopedia visual e interactiva dedicada a los dinosaurios y otras criaturas prehistóricas, reales y ficticias. El proyecto combina divulgación, ficción especulativa y criterios de anatomía comparada, biomecánica y ecología para explorar cada especie desde una perspectiva científica y narrativa.

Desarrollada como una aplicación de una sola página con **React, TypeScript y Vite**, ofrece una experiencia bilingüe en español e inglés y está preparada para desplegarse en **Vercel**.

## 🦖 Características

- **Enciclopedia de especies:** catálogo de 50 entradas con descripciones y fichas técnicas.
- **Exploración y filtros:** selección de especies y filtros por categoría, dieta y otros atributos disponibles en el catálogo.
- **Fichas técnicas:** información organizada para consultar las características y el contexto biológico de cada entrada, con cobertura en inglés.
- **Interfaz bilingüe:** navegación y contenido disponible en español e inglés.
- **Curiosidad del día:** módulo de datos breves con rotación y fecha localizada.
- **Galería visual:** 58 imágenes con navegación anterior/siguiente, contador, vista global o filtrada por especie y ampliación en modal.
- **Tema claro y oscuro:** selector manual de apariencia.
- **Diseño adaptable:** estilos CSS personalizados para distintos tamaños de pantalla.
- **Navegación fluida:** desplazamiento suave entre las secciones de la aplicación.

## 🧬 Enfoque del proyecto

Dinosauria reúne especies de distintos orígenes y las presenta mediante una lectura que considera:

- Anatomía comparada y características morfológicas.
- Masa corporal estimada, locomoción y biomecánica.
- Dieta, función trófica y relaciones ecológicas.
- Adaptaciones y posibles interacciones con el entorno.
- Coherencia biológica para criaturas ficticias y organismos diseñados.

Las especies ficticias se analizan con criterios de plausibilidad anatómica y ecológica, sin confundir su origen narrativo con el de los taxones paleontológicos reales.

## 🧱 Stack tecnológico

| Tecnología | Uso |
| --- | --- |
| React 18 | Componentes e interfaz de usuario |
| TypeScript | Tipado y estructura de la aplicación |
| JavaScript | Utilidades y lógica complementaria |
| CoffeeScript | Módulo de curiosidades en español |
| Vite 5 | Servidor de desarrollo y build de producción |
| CSS | Estilos, temas y diseño responsive |
| React DOM | Renderizado de la aplicación |

## 📦 Requisitos

- Node.js 18 o superior (recomendado: Node.js 20+).
- npm 9 o superior.

## 🚀 Instalación y ejecución

Cloná el repositorio e ingresá al directorio:

```bash
git clone https://github.com/lu-developer476/Dinosauria.git
cd Dinosauria
```

Instalá las dependencias:

```bash
npm install
```

Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

## 🛠 Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo. |
| `npm run coffee` | Compila los archivos CoffeeScript a JavaScript. |
| `npm run check:translations` | Comprueba la cobertura de fichas técnicas y curiosidades en inglés. |
| `npm run build` | Compila CoffeeScript y genera el build optimizado de Vite. |
| `npm run preview` | Sirve localmente el build de producción. |

### Build de producción

```bash
npm run build
```

El proceso ejecuta la compilación de CoffeeScript y luego genera la versión optimizada de la aplicación en `dist/`.

Para revisar la cobertura de traducciones:

```bash
npm run check:translations
```

## 📁 Estructura del proyecto

```text
Dinosauria/
├── public/
│   ├── images/                 # Recursos visuales de la galería
│   ├── favicon.ico
│   └── robots.txt
├── scripts/
│   └── check-english-coverage.mjs
├── src/
│   ├── App.tsx                 # Aplicación y componentes principales
│   ├── main.tsx                # Punto de entrada
│   ├── styles.css              # Estilos y temas
│   ├── types.ts                # Tipos TypeScript
│   ├── coffee/
│   │   └── funfacts.coffee     # Curiosidades en español
│   ├── data/
│   │   ├── dinos.ts            # Catálogo de especies
│   │   ├── dinoTechnicalSheetsEn.ts
│   │   └── funfactsEn.ts       # Curiosidades en inglés
│   ├── generated/
│   │   └── funfacts.js         # Archivo generado durante la compilación
│   └── utils/
│       └── scroll.js           # Utilidades de desplazamiento
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
```

El archivo `src/generated/funfacts.js` es un artefacto generado: se vuelve a crear a partir de los fuentes CoffeeScript durante el build. Los cambios del módulo deben realizarse en `src/coffee/funfacts.coffee`.

## ☁️ Despliegue en Vercel

El proyecto utiliza Vite y está preparado para desplegarse directamente en Vercel con la siguiente configuración:

| Configuración | Valor |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

El archivo `vercel.json` forma parte de la configuración del repositorio.

## 📄 Licencia y uso

Todos los derechos reservados. El proyecto está disponible públicamente para visualización y evaluación. No se autoriza su uso, copia, modificación, distribución ni explotación sin consentimiento previo y por escrito del autor.

Consultá el archivo [LICENSE](LICENSE) para conocer los términos completos. La versión en inglés prevalece ante cualquier diferencia de interpretación.

---

**Dinosauria** — una exploración visual de la paleontología, la biología y la imaginación.
