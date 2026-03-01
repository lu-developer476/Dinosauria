# Dinosauria

Es una SPA profesional desarrollada con **React + TypeScript**, con utilidades en **JavaScript** y un módulo editorial escrito en **CoffeeScript** (compilado automáticamente en el build).

El proyecto combina divulgación, ficción especulativa y estructura técnica moderna, preparado para despliegue directo en **Vercel**.

## 🎯 Concepto

Es una experiencia editorial interactiva que explora criaturas reales y ficticias desde una lectura científica y narrativa.

## Qué incluye

- Landing inmersiva con navegación sticky y scroll suave.
- Secciones: Convergencia, Especies, Galería.
- Fichas con curiosidades, etimologías y contexto
- Sistema de "Curiosidad del día"
- Fecha dinámica en formato DD/MM/YYYY
- Base preparada para escalar hacia catálogo completo con rutas dinámicas
- Estructura lista para escalar a un catálogo con rutas, filtros y páginas de detalle
- CoffeeScript integrado: `src/coffee/funfacts.coffee` se compila a `src/generated/funfacts.js`

## 🧱 Stack Tecnológico

- React 18
- TypeScript
- JavaScript (utilidades auxiliares)
- CoffeeScript (módulo editorial compilado)
- Vite 5

## 📦 Requisitos

-   Node.js 18+ (recomendado 20+)
-   npm 9+

------------------------------------------------------------------------

## 🚀 Instalación

``` bash
npm install
```

------------------------------------------------------------------------

## 🧪 Desarrollo

``` bash
npm run dev
```

Abrí el navegador en la URL que Vite indique en consola.

------------------------------------------------------------------------

## 🏗 Build de Producción

``` bash
npm run build
```

Este comando:

- Compila CoffeeScript
- Valida TypeScript
- Genera el build optimizado de Vite

------------------------------------------------------------------------

## 👀 Preview del Build

``` bash
npm run preview
```

------------------------------------------------------------------------

## 🖼 Galería de Imágenes

Las imágenes están ubicadas dentro de:

    public/

Estructura pensada para escalar a:

-   /public/dinos/
-   /public/hibridos/
-   /public/skull-island/
-   /public/jurassic-world/

------------------------------------------------------------------------

## 📁 Estructura del Proyecto

    src/
    │
    ├── App.tsx
    ├── styles.css
    ├── data/dinos.ts
    ├── utils/scroll.js
    │
    ├── coffee/
    │   └── funfacts.coffee
    │
    └── generated/
        └── funfacts.js

El archivo `funfacts.js` se regenera automáticamente en cada build.

------------------------------------------------------------------------

## ☁ Deploy en Vercel

- Framework: Vite
- Build Command: npm run build
- Output Directory: dist

Repositorio listo para deploy directo sin configuraciones adicionales.

------------------------------------------------------------------------

## 📈 Escalabilidad Proyectada

Dinosauria está diseñado para evolucionar hacia:

- Ruteo dinámico con React Router
- Filtros por categoría/universo
- Páginas individuales por especie
- Sistema de etiquetas (Natural / Híbrido / Ficticio)
- Optimización de imágenes y carga diferida
- Internacionalización futura

------------------------------------------------------------------------
