# Dinosauria

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React DOM](https://img.shields.io/badge/React_DOM-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CoffeeScript](https://img.shields.io/badge/CoffeeScript-2F2625?style=for-the-badge&logo=coffeescript&logoColor=white)

Dinosauria es una SPA editorial e interactiva desarrollada con **React + TypeScript**, utilidades en **JavaScript** y un módulo de curiosidades escrito en **CoffeeScript** que se compila automáticamente durante el build.

El proyecto combina divulgación, ficción especulativa y una interfaz bilingüe para explorar especies reales, ficticias e híbridas desde una lectura científica, anatómica y narrativa. Está preparado para despliegue directo en **Vercel**.

## 🎯 Estado actual del proyecto

- Aplicación de una sola página construida con Vite y React 18.
- Interfaz bilingüe en español e inglés, con traducciones para navegación, contenido editorial, galería y fichas técnicas.
- Selector de tema claro/oscuro aplicado a nivel de documento.
- Landing inmersiva con navegación sticky, menú desplegable y scroll suave.
- Secciones activas: Acerca del proyecto, Convergencia, Especies y Galería.
- Sistema de “Curiosidad del día” con rotación manual y fecha dinámica localizada.
- Enciclopedia de especies con filtros por categoría, dieta/era y selector de entrada individual.
- Contador visible de entradas sobre dinosaurios en la sección Especies, incluyendo total del catálogo y cantidad afectada por los filtros activos.
- Galería con navegación anterior/siguiente, contador de imágenes, alcance global o por especie y modal de ampliación.
- Datos de catálogo, traducciones técnicas e imágenes organizados para seguir escalando el contenido.

## 🧱 Stack tecnológico

- React 18
- TypeScript
- JavaScript para utilidades auxiliares
- CoffeeScript para el módulo editorial compilado
- Vite 5
- CSS personalizado responsive

## 📦 Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## 🚀 Instalación

```bash
npm install
```

## 🧪 Desarrollo

```bash
npm run dev
```

Abrí el navegador en la URL que Vite indique en consola.

## 🏗 Build de producción

```bash
npm run build
```

Este comando:

- Compila `src/coffee/funfacts.coffee` hacia `src/generated/funfacts.js`.
- Valida y transpila la aplicación React + TypeScript.
- Genera el build optimizado de Vite en `dist/`.

## ✅ Checks disponibles

```bash
npm run check:translations
npm run build
```

`check:translations` valida que las fichas técnicas tengan cobertura en inglés para las entradas del catálogo.

## 🖼 Galería de imágenes

Las imágenes públicas están ubicadas dentro de:

```text
public/images/
```

La galería puede mostrarse en modo global o enfocada en la especie seleccionada, reutilizando imágenes específicas cuando hay coincidencias por nombre o identificador.

## 📁 Estructura principal

```text
src/
├── App.tsx
├── main.tsx
├── styles.css
├── types.ts
├── coffee/
│   └── funfacts.coffee
├── data/
│   ├── dinos.ts
│   ├── dinoTechnicalSheetsEn.ts
│   └── funfactsEn.ts
├── generated/
│   └── funfacts.js
└── utils/
    └── scroll.js
```

El archivo `src/generated/funfacts.js` se regenera automáticamente en cada build.

## ☁ Deploy en Vercel

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

El repositorio está listo para deploy directo sin configuraciones adicionales.

## 📈 Próximos pasos sugeridos

- Ruteo dinámico con React Router.
- Páginas individuales por especie.
- Filtros taxonómicos más específicos.
- Sistema de etiquetas ampliado para Natural / Híbrido / Ficticio.
- Optimización de imágenes y carga diferida.
- Internacionalización completa del contenido narrativo largo.
