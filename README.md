# ISO Studio 2.0 — Plataforma de Preparación y Aprendizaje Adaptativo UMU

Plataforma de alta fidelidad, minimalismo gráfico y aprendizaje adaptativo diseñada para la preparación rigurosa del examen oficial de **Introducción a los Sistemas Operativos (ISO)** en la Universidad de Murcia (UMU).

---

## 1. Características Principales

### 1.1 Normativa Oficial UMU (Contexto de Evaluación)
- **Simulacro Oficial de 50 Preguntas:** Distribución curricular exacta: T1 (8Q · 16%), T2 (20Q · 40%), T3 (6Q · 12%), T4 (16Q · 32%).
- **Corrección Oficial Estricta:** $+1.0$ por acierto, $-1.0$ por fallo, $0.0$ preguntas en blanco.
- **Corte de Aprobado Oficial:** $\ge 16$ puntos netos ($\ge 5.0$ / 10).
- **Temporizador de Examen:** 60 minutos con control de entrega y confirmación de preguntas sin contestar.

### 1.2 Banco Completo de 358 Preguntas Verificadas
- Identificadores alfanuméricos estables únicos en el 100% de las preguntas (`base_1` a `base_141`, `examen_noviembre_2023_2` a `50`, etc.).
- Convocatorias reales íntegras: Noviembre 2023 (49Q), Noviembre 2022 (40Q), Parcial 1 Oficial (24Q) y Test Departamental (25Q).
- 100% de explicaciones académicas argumentadas pedagógicamente.
- Estructura homogénea de opción binaria (A y B / V y F).

### 1.3 Sistemas de Aprendizaje Adaptativo (Contexto de Estudio)
- **Repetición Espaciada (SM-2):** Algoritmo de consolidación de memoria a largo plazo con 5 estados (`new`, `pending`, `learning`, `consolidating`, `mastered`) y 3 niveles de confianza (*No la sabía*, *Me costó recordarla*, *Fácil*).
- **Sesión Inteligente:** Constructor adaptativo que pondera repasos vencidos, refuerzo de temas débiles y preguntas poco exploradas, con Modo Tutor (explicación inmediata) y Modo Simulacro.
- **Centro de Errores & Taxonomía Cognitiva:** Clasificación manual de fallos en 5 categorías (Desconocimiento, Confusión conceptual, Lectura, Cálculo y Lapsus).
- **Anotaciones y Favoritos Desacoplados:** Guardado persistente de apuntes y estrellas sin modificar `questions.js`.
- **Diagnóstico de Preparación UMU:** Medidor pedagógico basado en 4 pilares ponderados (Simulacros, Superación del corte $\ge 16$ netos, Cobertura de temario y Retención SM-2).

---

## 2. Sistema Visual (Figma Design System)

- **Minimalismo Gráfico con Alta Riqueza Visual:** Basado en las 15 pantallas aprobadas del diseño de Figma.
- **Paleta Centralizada:**
  - *Tema Oscuro (Predeterminado):* Fondo `#111318`, Sidebar `#171A21`, Superficie `#1C2029`, Elevada `#242A35`, Bordes `#303744`, Acento `#8CA8D8`, Texto `#F1F3F5`.
  - *Tema Claro (Alternativo de Alto Contraste):* Fondo `#F5F6F8`, Superficie `#FFFFFF`, Elevada `#EEF1F5`, Bordes `#E1E5EB`, Acento `#5277B5`, Texto `#202630`.
- **Cero Artificios Prohibidos:** Sin glassmorphism, sin orbes decorativos, sin resplandores neón ni animaciones infinitas.
- **Tipografía:** IBM Plex Sans (interfaz) + IBM Plex Mono (datos técnicos, tiempos y puntuaciones).

---

## 3. Ejecución y Pruebas

No requiere compiladores ni dependencias externas (`node_modules`).

### Ejecución Directa
Abre `index.html` en cualquier navegador web moderno (Firefox, Chrome, Safari, Edge).

### Batería de Pruebas de Calidad (QA)
```bash
node scratch/test_phase2_dashboard.js && \
node scratch/test_phase3_full.js && \
node scratch/test_phase4_full.js && \
node scratch/test_phase5_full.js && \
node scratch/test_phase6_full.js && \
node scratch/test_phase7_full.js && \
node scratch/test_phase8_full.js && \
node scratch/test_modal_popups.js
```

---

## 4. Estructura del Proyecto

```
ISO/
├── index.html              # Shell SPA semántico y vistas aprobadas
├── favicon.svg             # Favicon vectorial
├── REDESIGN_AUDIT.md       # Auditoría técnica oficial (Fase 0)
├── REDESIGN_PROGRESS.md    # Registro de evolución por fases
├── README.md               # Documentación general
├── docs/
│   ├── DATA_MODEL.md       # Arquitectura del modelo de datos v2
│   └── TESTING.md          # Especificación y suites de pruebas
├── css/
│   └── app.css             # Motor de estilos unificado (Tokens Figma)
└── js/
    ├── questions.js        # Banco canónico de 358 preguntas UMU
    └── app.js              # Controlador central y motores de aprendizaje
```
