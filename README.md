# Dinosauria — Descubriendo Dinos

SPA profesional creado con React + TypeScript, con utilidades en JavaScript y un módulo editorial escrito en CoffeeScript (compilado en el build). Preparado para desplegar en Vercel.

## Qué incluye

- Landing moderna con navegación sticky y scroll suave.
- Secciones: Línea de tiempo, Especies, Galería.
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

El proyecto contiene 40 imágenes en `public/` con la siguiente estructura:

- `gallery-[NÚMERO].jpg`

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
