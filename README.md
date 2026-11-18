# ISO Studio — Simulador Oficial UMU

Plataforma web de alto rendimiento y diseño de alto contraste (#1C1C28 y #F6E6EA) para la preparación del examen de teoría de **Introducción a los Sistemas Operativos (ISO)** en la Universidad de Murcia (UMU).

---

## Características Principales

- **Normativa Oficial UMU:**
  - Simulacros de **50 preguntas** con distribución proporcional por temario oficial (8 T1 + 20 T2 + 6 T3 + 16 T4).
  - Sistema de corrección estricto: **1 acierto suma +1.0, 1 fallo resta -1.0, preguntas no contestadas puntúan 0.0**.
  - Umbral oficial de aprobado: **$\ge 16$ puntos netos** ($\ge 5.0$ sobre 10.0).
  - Temporizador de examen de **60 minutos**.

- **Banco Completo de 358 Preguntas Verificadas:**
  - Examen Oficial Noviembre 2023 (50Q).
  - Examen Oficial Noviembre 2022 (50Q).
  - Examen Parcial I Oficial (30Q).
  - Prueba de Evaluación Noviembre 2022 (30Q).
  - Baterías temáticas oficiales de teoría (T1 a T6).
  - Explicaciones y justificaciones detalladas para cada solución oficial.

- **Analítica de Rendimiento y Diagnóstico Algorítmico:**
  - Curva de evolución de notas con línea de corte visual (5.0 / 16 netos).
  - **Radar temático:** Diagnostica automáticamente el tema más vulnerable según tus respuestas y te sugiere entrenarlo.
  - Historial de simulacros guardado localmente en `localStorage`.

- **Experiencia de Usuario Inmersiva y Gamificada:**
  - **Atmósfera Cyber Dark:** Iluminación ambiental sutil con orbes flotantes, acabado *glassmorphism* con desenfoque de fondo y bordes luminosos reactivos.
  - **Animaciones Fluidas y Micro-interacciones:**
    - Barra de progreso de examen en vivo con destello animado y medidor de racha (*streak flame*).
    - Deslizamiento suave entre preguntas (`qSlideIn`) y pulsación táctil al responder.
    - Curva de evolución de notas SVG que se dibuja automáticamente en pantalla.
    - Medidor circular (*gauge ring*) animado para la calificación final del examen.
    - Cañón de confeti en Canvas a 60fps y fanfarria al superar el corte oficial (≥ 16 netos / 5.0).
  - **Efectos de Sonido Integrados (Web Audio API):** Audio sintetizado nativo de latencia cero para selecciones, navegación y celebraciones, con control de silenciado (🔊 / 🔇).
  - **Menú lateral plegable:** Dock de iconos con tooltips flotantes inteligentes.
  - **Tipografía técnica:** IBM Plex Mono e IBM Plex Sans con jerarquía de alto contraste.
  - **Totalmente autónomo:** Sin dependencias externas ni librerías pesadas (100% JavaScript y CSS nativo).
  - **Atajos de teclado:** `[A]`, `[B]`, `[Espacio / D]` para dejar en blanco, `[←] / [→]` para navegar, `[F]` para marcar duda.

---

## Ejecución Local

No requiere compilación ni dependencias externas.

### Opción 1: Directo en navegador
Abre el archivo `index.html` en cualquier navegador web moderno (Brave, Chrome, Firefox, Safari).

### Opción 2: Servidor estático
```bash
# Con Python
python3 -m http.server 3000

# Con Node.js
npx serve .
```
Accede a `http://localhost:3000`.

---

## Estructura del Proyecto

```
ISO/
├── index.html          # Shell de la aplicación y vistas SPA
├── favicon.svg         # Favicon vectorial
├── README.md           # Documentación
├── css/
│   └── app.css         # Motor de estilos y animaciones
└── js/
    ├── questions.js    # Banco de 358 preguntas verificadas
    └── app.js          # Lógica, router, motor de examen y analíticas
```
