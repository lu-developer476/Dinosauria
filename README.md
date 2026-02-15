# Dinosauria — Descubriendo Dinos

Sitio profesional (single-page) creado con React + TypeScript, con utilidades en JavaScript y un módulo editorial escrito en CoffeeScript (compilado en el build). Preparado para desplegar en Vercel.

## Qué incluye

- Landing moderna con navegación sticky y scroll suave.
- Secciones: Hero, Sobre, Línea de tiempo, Galería (gallery-1.jpg a gallery-8.jpg) y Exploración de especies.
- Estructura lista para escalar a un catálogo con rutas, filtros y páginas de detalle.
- CoffeeScript integrado: `src/coffee/funfacts.coffee` se compila a `src/generated/funfacts.js`.

## Stack

- React 18
- TypeScript
- JavaScript (utilidades)
- CoffeeScript (módulo compilado)
- Vite 5

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrí el proyecto en el navegador con la URL que Vite muestre en consola.

## Build

```bash
npm run build
```

Este comando compila CoffeeScript, valida TypeScript y genera el build de Vite.

## Preview

```bash
npm run preview
```

## Galería de imágenes

El proyecto espera 8 imágenes en `public/` con estos nombres:

- `gallery-1.jpg`
- `gallery-2.jpg`
- `gallery-3.jpg`
- `gallery-4.jpg`
- `gallery-5.jpg`
- `gallery-6.jpg`
- `gallery-7.jpg`
- `gallery-8.jpg`

Reemplazá los placeholders por tus imágenes reales manteniendo los nombres.

## Estructura

- `src/App.tsx` — página principal y composición de secciones
- `src/styles.css` — estilos globales
- `src/data/dinos.ts` — dataset de fichas (ejemplo)
- `src/utils/scroll.js` — utilidades en JavaScript
- `src/coffee/funfacts.coffee` — fuente CoffeeScript
- `src/generated/funfacts.js` — salida compilada (se regenera en build)

## Deploy en Vercel

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

El repositorio está listo para deploy directo sin configuraciones extra.

## Licencia

MIT
