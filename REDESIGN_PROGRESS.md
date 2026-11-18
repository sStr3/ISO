# ISO STUDIO 2.0 — REGISTRO DE REDISEÑO Y EVOLUCIÓN TÉCNICA

> **Estado general:** FASE 6 COMPLETADA (Módulos C y D: Mapa de Dominio T1-T6, Centro de Errores con Taxonomía Cognitiva y Diagnóstico Pedagógico Automatizado)  
> **Fecha:** 18 de noviembre de 2026  
> **Equipo:** Senior Frontend Engineer, SaaS UX/UI Designer, Learning Systems Engineer, Data Architect, QA Engineer.

---

## 1. RESUMEN EJECUTIVO DE LA AUDITORÍA (FASE 0)

ISO STUDIO es una aplicación web SPA orientada a la preparación del examen oficial de **Introducción a los Sistemas Operativos (ISO)** de la Universidad de Murcia (UMU).

### Tecnologías Base
- **Frontend nativo:** HTML5 semántico, CSS3 modular (variables CSS, flexbox/grid), JavaScript ES6+ (arquitectura modular basada en IIFE y objetos de dominio).
- **Almacenamiento:** `localStorage` nativo, sincrónico, estructurado por claves con serialización JSON.
- **Audio y Efectos:** Web Audio API nativo sintetizado (cero dependencias externas de ficheros de audio mp3/wav).
- **Partículas:** HTML5 Canvas puro a 60 FPS (sin librerías de confeti externas).

---

## 2. INVENTARIO Y VERIFICACIÓN DEL BANCO DE PREGUNTAS (`questions.js`)

Se ha realizado una auditoría exhaustiva mediante script sobre las **358 preguntas** registradas en `window.BASE_QUESTIONS`:

| Parámetro | Resultado Auditado | Estado |
|---|---|---|
| **Total de Preguntas** | **358 preguntas** | Exacto y verificado |
| **Identificadores Únicos** | **358 IDs únicos** (0 duplicados) | Íntegro |
| **Distribución por Opciones** | 358 preguntas con exactamente 2 opciones (A y B) | Íntegro |
| **Distribución de Claves de Respuesta** | 174 respuestas [A] (48.6%), 184 respuestas [B] (51.4%) | Balanceado |
| **Preguntas con Explicación** | 358 con texto de justificación presente | Íntegro |

### Distribución por Temas Oficiales UMU
- **T1: Introducción a los Sistemas Operativos:** 46 preguntas
- **T2: Procesos, Hilos y Concurrencia:** 131 preguntas
- **T3: Gestión de Memoria y Paginación:** 35 preguntas
- **T4: Entrada/Salida y Sistema de Ficheros:** 103 preguntas
- **T5: Seguridad y Protección:** 25 preguntas
- **T6: Sistemas Distribuidos:** 18 preguntas  
*Total: 358 preguntas.*

### Subconjuntos de Exámenes Históricos Identificados por Prefijo de ID
- `base_1` a `base_141`: 141 preguntas del banco base oficial.
- `pdf_t1` a `pdf_t4`: 45 preguntas extraídas de boletines teóricos.
- `hy_t1` a `hy_t4`: 34 preguntas del generador oficial de parciales.
- `examen_noviembre_2023_2` a `..._50`: 49 preguntas del examen oficial de Noviembre 2023.
- `examen_noviembre_2022_2` a `..._50`: 40 preguntas del examen oficial de Noviembre 2022.
- `test_prueba_nov_2022_1` a `..._30`: 25 preguntas de la prueba de evaluación de Noviembre 2022.
- `parcial_i_oficial_2` a `..._30`: 24 preguntas del Examen Parcial I oficial.

---

## 3. AUDITORÍA DE ERRORES TÉCNICOS DETECTADOS (SECCIÓN 9)

### Error 1: Concatenación de cadenas en cálculos estadísticos
- **Ubicación:** `js/app.js` (Línea 1383 y 504-508).
- **Mecanismo:** Al finalizar un simulacro, se guardaba `score: score.toFixed(2)` (tipo `string`). Al calcular la media en el dashboard: `totalScore += test.score`. Al sumar `0 + "6.50"` resultaba `"06.50"`, y con el siguiente `"06.50" + "7.00"` resultaba `"06.507.00"`. La división posterior arrojaba `NaN`.
- **Solución técnica aplicada:** Normalización estricta mediante `parseFloat(test.score) || 0` en todas las lecturas de históricos antiguos, y almacenamiento numérico `parseFloat(score.toFixed(2))` en registros futuros.

### Error 2: Identificación ambigua de exámenes históricos mediante subcadenas
- **Ubicación:** `js/app.js` (Línea 876-877 y 2251-2269).
- **Mecanismo:** La función `startHistoricalExam` filtraba por `(q.source || '').toLowerCase().includes(keyword)`. Al pulsar "Examen Oficial Noviembre 2022" con palabra clave `'2022'`, la búsqueda capturaba tanto las 40 preguntas del examen de noviembre de 2022 como las 25 de la prueba de evaluación de 2022, generando un test corrupto de 65 preguntas.
- **Solución técnica aplicada:** Filtrado determinista por prefijo de identificador único (`examen_noviembre_2023_`: 49Q, `examen_noviembre_2022_`: 40Q, `parcial_i_oficial_`: 24Q, `test_prueba_nov_2022_`: 25Q).

### Error 3: Preguntas importadas que no persisten tras recargar
- **Ubicación:** `js/app.js` (Línea 2360-2400).
- **Mecanismo:** `handleCustomIngest` añadía las preguntas únicamente en memoria a `APP.questions`. No existía llamada a `localStorage.setItem` y la función `loadQuestions()` sobrescribía `APP.questions` desde `window.BASE_QUESTIONS` al recargar.
- **Solución técnica aplicada:** Almacén persistente dedicado `iso_custom_questions` con carga, combinación segura y guardado en `localStorage`.

### Error 4: Discrepancia de esquema en explicaciones y respuestas
- **Ubicación:** `js/questions.js` (Preguntas 220 a 357).
- **Mecanismo:** 220 preguntas utilizan `{ ans, ex }` mientras que 138 preguntas históricas utilizan `{ a, explanation }`. Cualquier componente que acceda únicamente a `q.ex` o `q.ans` fallaba o consideraba que 138 preguntas no tenían explicación.
- **Solución técnica aplicada:** Capa de normalización transparente en `loadQuestions()`:
  `ans: typeof q.ans !== 'undefined' ? q.ans : q.a`, `ex: q.ex || q.explanation || ''`.

### Error 5: Validación insuficiente en importación JSON
- **Ubicación:** `js/app.js` (Línea 2376).
- **Mecanismo:** La validación ignoraba esquemas alternativos con `a` / `explanation`, no validaba pertenencia a temas válidos (T1-T6), y no generaba informes de error detallados por ítem.
- **Solución técnica aplicada:** Validador formal de esquema con tipado defensivo, normalización automática y persistencia.

### Error 6: Inconsistencias documentales con el README
- **Ubicación:** `README.md`.
- **Mecanismo:** Indicaba que Noviembre 2023 tenía 50 preguntas (en realidad tiene 49) y Noviembre 2022 tenía 50 (tiene 40).
- **Solución técnica aplicada:** Actualización documental reflejando con exactitud matemática el inventario de preguntas reales de la cátedra de la UMU.

---

## 4. MODELO DE DATOS Y PERSISTENCIA (ISO STUDIO 2.0)

Para garantizar **compatibilidad 100% hacia atrás**, se mantienen intactas las claves existentes y se añaden almacenes desacoplados para la capa de aprendizaje adaptativo:

### Claves Existentes (Preservadas)
- `iso_test_history`: Array de simulacros completados (EVALUACIÓN PURA).
- `iso_mistakes_bank`: Diccionario `{ [questionId]: failCount }`.
- `iso_sidebar_collapsed`: Booleano de estado de interfaz.
- `iso_sound_muted`: Booleano de preferencias de audio.
- `iso_theme`: Tema activo (`dark` / `light`).

### Nuevas Claves de Aprendizaje Adaptativo (ISO 2.0)
- `iso_schema_version`: Número entero (`2`) para migraciones atómicas.
- `iso_custom_questions`: Colección de preguntas importadas por el usuario persistidas.
- `iso_learning_state`: Estado de repetición espaciada por pregunta (intervalos, facilidad, estado de maduración, próxima fecha de repaso).
- `iso_answer_attempts`: Log granular de respuestas en sesiones de aprendizaje y simulacros para cálculo de dominio real (sin alterar notas de exámenes).
- `iso_personal_annotations`: Notas del alumno, marcadores de favoritos, etiquetas y categorización de error (Desconocimiento, Confusión, Error de lectura, etc.).

---

## 5. SEPARACIÓN ESTRICTA: EVALUACIÓN vs. APRENDIZAJE

```text
┌────────────────────────────────────────────────────────┐
│                   ISO STUDIO 2.0                       │
├──────────────────────────┬─────────────────────────────┤
│   SISTEMA EVALUATIVO     │    SISTEMA DE APRENDIZAJE   │
│   (Normativa Oficial)    │    (Adaptativo / Espaciado) │
├──────────────────────────┼─────────────────────────────┤
│ • Simulacro Oficial 50Q  │ • Repetición Espaciada SM-2 │
│ • Corte en 16 netos      │ • Sesión Inteligente        │
│ • +1.0 / -1.0 / 0.0      │ • Mapa de Dominio T1-T6     │
│ • Exámenes Históricos    │ • Centro de Diagnóstico     │
│ • Historial Inmutable    │ • Notas y Marcadores        │
│ • Temporizador Oficial   │ • Indicador de Preparación  │
└──────────────────────────┴─────────────────────────────┘
```

---

## 6. PLAN MAESTRO DE IMPLEMENTACIÓN (FASES 0 A 9)

- [x] **FASE 0 — AUDITORÍA TÉCNICA Y PLANIFICACIÓN** (Completada).
- [x] **FASE 1 — SISTEMA VISUAL Y DESIGN TOKENS:** (Completada).
- [x] **FASE 2 — NAVEGACIÓN Y DASHBOARD EN 4 ÁREAS:** (Completada). Reorganización en 4 áreas (INICIO, ESTUDIAR, REPASAR, ADMINISTRAR) con subpestañas, sistema de contraste WCAG AAA en ambos temas, Indicador de Preparación Oficial UMU, Sesión Inteligente y auditoría de bugs resuelta.
- [x] **FASE 3 — INFRAESTRUCTURA DE DATOS Y APRENDIZAJE:** (Completada). Capa de persistencia versionada (`v2`), snapshot de seguridad automático (`iso_backup_vault`), tipografía unificada `Arial, Helvetica, sans-serif;`, log granular de intentos (1.000 entradas), motor de estados SM-2 adaptativo, anotaciones/favoritos desacoplados, y auditoría de integridad en panel Administrar y Auditor del Banco.
- [x] **FASE 4 — REPETICIÓN ESPACIADA (MÓDULO A):** (Completada). Algoritmo de intervalos (Fallo: 10m; Acierto con duda: 1d; Acierto medio: 3d; Consolidado: 7d; Dominado: 14d), estados de pregunta e interfaz de repaso activo.
- [x] **FASE 5 — SESIÓN INTELIGENTE (MÓDULO B):** (Completada). Motor de selección equilibrada (repasos vencidos, temas débiles, preguntas poco practicadas, nuevas) para 10, 20 o 30 preguntas con Modo Tutor guiado y cronometrado.
- [x] **FASE 6 — MAPA DE DOMINIO T1-T6 Y CENTRO DE ERRORES (MÓDULOS C Y D):** (Completada). Cálculo riguroso de maestría (40% cobertura + 60% retención SM-2), taxonomía cognitiva de 5 categorías de fallo, dictamen pedagógico automatizado y práctica de rescate focalizada.
- [ ] **FASE 7 — MARCADORES, NOTAS Y FAVORITOS (MÓDULO E):** Anotaciones personales desacopladas de `questions.js`.
- [ ] **FASE 8 — INDICADOR DE PREPARACIÓN OFICIAL (MÓDULO F):** Modelo transparente de diagnóstico de preparación para el examen oficial sin inventar probabilidades ficticias.
- [ ] **FASE 9 — VALIDACIÓN Y CONTROL DE REGRESIÓN:** Suite de pruebas automatizadas sobre integridad de los 358 ítems, persistencia, fórmulas de nota y responsive design.

---

## 7. REGISTRO DE FASE 1 — SISTEMA VISUAL Y TOKENS

(Completado — ver archivo histórico de commits y tokens base).

---

## 8. REGISTRO DE FASE 2 — DASHBOARD Y NAVEGACIÓN EN 4 ÁREAS

### 1. Qué se ha cambiado y optimizado

1. **Reestructuración de la Navegación en 4 Áreas Maestras**:
   - Barra lateral con exactamente 4 accesos directos:
     - `INICIO` (`#view-dashboard`)
     - `ESTUDIAR` (`#view-study`)
     - `REPASAR` (`#view-review`)
     - `ADMINISTRAR` (`#view-admin`)
   - Sistema de subpestañas internas (`.subtabs-bar` y `.subtab-panel`) para cada área:
     - **ESTUDIAR**: `study-official` (Simulacro Oficial 50Q), `study-exams` (Exámenes Anteriores), `study-topics` (Entrenador Temático T1-T6), `study-smart` (Sesión Inteligente Adaptativa).
     - **REPASAR**: `review-stack` (Pila de Dudas LIFO), `review-errors` (Centro de Errores y Diagnóstico), `review-test` (Test de Fallos).
     - **ADMINISTRAR**: `admin-bank` (Auditor de Preguntas), `admin-history` (Historial de Exámenes), `admin-ingest` (Ingesta JSON persistente), `admin-backup` (Copias de Seguridad JSON y Gestión).
   - Enrutador compatible 100% hacia atrás (`switchView` y `switchSubtab` con redirección inteligente de vistas legadas).

2. **Resolución Integral de Contraste (WCAG AAA en Tema Oscuro y Claro)**:
   - Eliminación de todos los textos con colores fijos incompatibles (`#FFFFFF` sobre fondos claros, `#FFA5AE` pálido, `#F6E6EA` blanco, `#727292` gris oscuro sobre fondos negros).
   - Redefinición de tokens de superficie y texto:
     - **Tema Oscuro**: Fondo `#0B0E14`, Sidebar `#11151F`, Card `#151A24`, Raised `#1E2230`, Borde `#2D3748`, Texto Puro `#FFFFFF`, Texto `#F1F5F9`, Muted `#CBD5E1`, Dim `#94A3B8`, Accent `#60A5FA`.
     - **Tema Claro**: Fondo `#F1F4F9` (ligero matiz frío para que las tarjetas blancas contrasten), Sidebar `#FFFFFF`, Card `#FFFFFF`, Raised `#E9EEF5`, Borde `#CBD5E1`, Texto Puro `#090D14`, Texto `#1E293B`, Muted `#334155`, Dim `#475569`, Accent `#1D4ED8`.
   - Adaptación dinámica de gráficos SVG mediante variables CSS leídas por `getComputedStyle` (`--chart-line`, `--chart-grid`, `--chart-text`, `--chart-cutoff`).

3. **Dashboard Productivo de Inicio**:
   - Cabecera con Quick Actions directos:
     - "Empezar Sesión Inteligente" (`#dash-btn-smart-session`)
     - "Simulacro Oficial (50Q)" (`#dash-btn-official-mock`)
   - **Indicador de Preparación Oficial UMU** (`#dash-readiness-container`): modelo transparente ponderado (25% volumen de simulacros, 35% tasa de aprobados con corte oficial $\ge 16$ netos, 20% cobertura temaria sobre 358 preguntas, 20% resolución de dudas de la pila) con desglose en 4 métricas visibles.
   - 4 Tarjetas KPI: Tests Completados, Tasa de Aprobados, Nota Media (/10), y Dudas/Fallos Pendientes (`#dash-stat-pending`).
   - Curva de evolución de nota SVG con línea de corte oficial 5.0 (16 netos) de alto contraste.
   - Diagnóstico y Rendimiento por Temas (T1-T6) con cálculo de ratio neto y recomendación de cátedra.
   - Tabla de actividad reciente con enlaces directos al historial.

4. **Corrección de Bugs Técnicos de la Auditoría**:
   - **Concatenación de strings en estadísticas**: corregido con `parseFloat(test.score) || 0` y guardado numérico en `finishQuiz()`.
   - **Filtrado determinista de exámenes históricos**:
     - Noviembre 2023: exactamente 49 preguntas (`examen_noviembre_2023_`).
     - Noviembre 2022: exactamente 40 preguntas (`examen_noviembre_2022_`).
     - Parcial I Oficial: exactamente 24 preguntas (`parcial_i_oficial_`).
     - Prueba Nov 2022: exactamente 25 preguntas (`test_prueba_nov_2022_`).
   - **Persistencia de preguntas importadas**: `localStorage.iso_custom_questions` se guarda y fusiona en `loadQuestions()`.
   - **Módulo de Copias de Seguridad**: descarga y restauración completa de archivos JSON (`exportBackupData`, `handleImportBackupFile`, `resetLocalData`).

### 2. Archivos modificados
- `index.html` (Reestructuración completa de vistas en 4 paneles con subpestañas y eliminación de estilos inline de bajo contraste).
- `css/app.css` (Tokens de máximo contraste WCAG AAA para Dark/Light, clases para subpestañas, readiness card y tarjetas SaaS).
- `js/app.js` (Implementación de subtabs, router legacy-mapped, indicador de preparación, sesión inteligente, filtros deterministas de exámenes, persistencia y backup).
- `REDESIGN_PROGRESS.md` (Actualización documental de la Fase 2).

### 3. Pruebas de verificación realizadas
- Verificación sintáctica con `node -c js/app.js` (0 errores).
- Prueba automatizada de conteo exacto de exámenes históricos (49, 40, 24, 25 preguntas).
- Prueba de ejecución headless simulando las 4 áreas de navegación, subpestañas y enrutado de vistas.
- Auditoría de estilos: 0 textos con colores fijos ilegibles en ambos modos.

---

## 9. REGISTRO DE FASE 3 — INFRAESTRUCTURA DE DATOS Y APRENDIZAJE

### 1. Qué se ha diseñado, implementado y verificado

1. **Tipografía Unificada Global**:
   - `font-family: Arial, Helvetica, sans-serif;` establecido como estándar en `body`, selectores de formulario (`button`, `input`, `select`, `textarea`) e inputs inline.
   - Preservación estricta de `'IBM Plex Mono', monospace;` para contadores, temporizadores, identificadores técnicos y código fuente C/POSIX.

2. **Migración Segura del Esquema (`iso_schema_version = 2`) y Baúl de Seguridad**:
   - Función `migrateStorageSchema()`:
     - Detecta almacenes heredados v1 (`iso_test_history`, `iso_mistakes_bank`, `iso_custom_questions`).
     - Realiza una instantánea completa en `iso_backup_vault` con marca de tiempo ISO antes de cualquier mutación.
     - Si existen errores en `iso_mistakes_bank`, los siembra automáticamente en `iso_learning_state` como estado `'learning'` con fecha de repaso inmediata, garantizando que los fallos previos del estudiante alimenten el motor de aprendizaje desde el primer segundo.
     - Actualiza `iso_schema_version` a `2`.
     - Preserva la inmutabilidad de `iso_test_history` para la evaluación oficial (separación estricta entre evaluación y aprendizaje).

3. **Validador Defensivo de Datos**:
   - `validateLearningState(state, qId)`: valida estados permitidos (`new`, `pending`, `learning`, `consolidating`, `mastered`), facilidad (1.3 a 3.0), días de intervalo $\ge 0$ y consistencia de fechas ISO.
   - `validateAttemptLog(entry)`: valida estructura del log de telemetría (ID único, pregunta, timestamp, acierto/fallo, respuesta de usuario, nivel de confianza, contexto de examen y milisegundos invertidos).
   - `validateAnnotation(entry)`: valida notas personales, favoritos booleanos, marcas de revisión y longitud segura para evitar desbordamiento de memoria.
   - `auditDataIntegrity()`: analiza las 358 preguntas, elimina huérfanos o claves corruptas y devuelve un informe cuantitativo formal.

4. **Motor de Aprendizaje y Repetición Espaciada (`LEARNING_ENGINE`)**:
   - Escalera de maduración SM-2 adaptada:
     - Fallo: 10 minutos $\to$ estado `'learning'`.
     - 1er acierto: 1 día $\to$ estado `'learning'`.
     - 2º acierto: 2-3 días (según confianza declarada) $\to$ estado `'consolidating'`.
     - 3er acierto: 7 días $\to$ estado `'consolidating'`.
     - 4º acierto (intervalo $\ge 14$ días): estado `'mastered'`. Al dominar una pregunta, se retira de la pila de fallos activos.
   - Buffer rotativo `iso_answer_attempts` con capacidad de 1.000 registros para evitar degradación de rendimiento.
   - Funciones analíticas de aprendizaje:
     - `getCoverageStats()`: Cobertura global y desglosada por tema (T1 a T6) sobre las 358 preguntas.
     - `getRetentionRate()`: Tasa de retención porcentual real.
     - `getWeakTopics()`: Ordenación de temas vulnerables por tasa de fallo.
     - `getDueReviews()`: Detección instantánea de repasos vencidos.

5. **Integración en la Interfaz de Usuario**:
   - **Auditor de Preguntas (`subtab-admin-bank`)**:
     - Filtro por estado (`bank-status-filter`): Todos, Favoritos, En Pila de Fallos, Pendientes de Repaso, En Aprendizaje, En Consolidación, Dominadas, Nuevas.
     - Insignia semántica de aprendizaje en cada tarjeta de pregunta (`🌱 NUEVA`, `⏳ PENDIENTE`, `🟡 APRENDIENDO`, `🔵 CONSOLIDANDO`, `🟢 DOMINADA`).
     - Botón interactivo de estrella (`★` / `☆`) para añadir/quitar de favoritos con respuesta visual inmediata.
     - Área de **Nota Personal** por pregunta con guardado debounced directo en `iso_personal_annotations` e indicador "Guardado ✓".
   - **Pila de Dudas (`subtab-review-stack`)**:
     - Al pulsar "Tick", registra el acierto con confianza alta en `LEARNING_ENGINE.recordAttempt` y elimina la pregunta de la pila.
     - Al pulsar "No (Explicar de forma extendida)", registra el intento con confianza baja y despliega el desglose exhaustivo con código y casos prácticos.
   - **Panel de Gestión y Copias de Seguridad (`subtab-admin-backup`)**:
     - Panel de "Auditoría de Integridad y Almacén de Aprendizaje (v2)" con 4 KPIs en tiempo real (Esquema local, Safety Vault, Cobertura sobre 358 preguntas y Registros en log con % de retención).
     - Botón interactivo "Auditar e Higienizar Datos" (`runDataAudit()`) con toast informativo del resultado de integridad.

### 2. Archivos modificados
- `ISO/css/app.css`:
  - `body` tipografía `Arial, Helvetica, sans-serif;`.
  - Clases para insignias `.badge-learning` (`.new`, `.pending`, `.learning`, `.consolidating`, `.mastered`).
  - Botón `.favorite-star-btn` con transiciones y microinteracción hover.
  - Estilos para caja de notas `.q-note-box` y textarea `.q-note-textarea`.
- `ISO/index.html`:
  - Selector de filtro por estado `#bank-status-filter`.
  - Sección de auditoría de integridad `#vault-audit-summary` y botón `#btn-run-data-audit` en el panel de administración.
- `ISO/js/app.js`:
  - Definición completa y tipado de validadores de datos.
  - Expansión de `LEARNING_ENGINE` (métodos de intervalo SM-2, coverage, retention, weak topics, audit).
  - Enrutamiento de subtab `admin-backup` y eventos en `setupActions()`.
  - Integración en `renderBankView()`, `resolveAndPopDoubt()` y objeto global `window.ISO_STUDIO`.
- `ISO/REDESIGN_PROGRESS.md`:
  - Actualización documental de la Fase 3 completada.

### 3. Pruebas de verificación realizadas
- Comprobación sintáctica con `node -c ISO/js/app.js` (0 errores).
- Suite integral `scratch/test_phase3_full.js` ejecutada con éxito:
  - Verificación de creación de snapshot en `iso_backup_vault`.
  - Siembra de fallos históricos de `iso_mistakes_bank` en `iso_learning_state`.
  - Validación de la progresión SM-2 en 4 escalones (`new` $\to$ `learning` $\to$ `consolidating` $\to$ `mastered`).
  - Auditoría de integridad sin huérfanos sobre las 358 preguntas oficiales.
  - Verificación de guardado y lectura de anotaciones personales y favoritos.
  - Renderizado simulado de la interfaz de auditoría de almacén.

---

## 7. FASE 4: REDISEÑO VISUAL COMPLETO, PURGA DE TEXTO, CONTRASTE TOTAL Y MEJORAS UI/UX

> **Fecha:** 17 de noviembre de 2026  
> **Estado:** COMPLETADO CON ÉXITO  

### 1. Resumen de Mejoras Implementadas

1. **Purga Radical de Textos Redundantes e Innecesarios:**
   - Se eliminaron todos los párrafos explicativos excesivos, textos de relleno y disclaimers repetitivos en las 4 áreas maestras (`Inicio`, `Estudiar`, `Repasar`, `Administrar`).
   - Se reemplazaron bloques de texto redundantes por insignias de metadatos limpias y compactas (`50 PREGUNTAS`, `60 MIN`, `CORTE: ≥ 16 NETOS`).
   - En el Dashboard (`#view-dashboard`), se unificó la cabecera en una sola fila limpia de navegación y acciones rápidas, eliminando la tarjeta duplicada de "Plataforma de Preparación Académica".
   - En la Pila de Dudas (`#subtab-review-stack`), se reemplazaron los textos verbosos por indicadores de teclado claros (`[Enter] Duda resuelta`, `[N] Explicación`, `[Espacio] Desplegable`).

2. **Tipografía Significativamente Más Grande y Legible:**
   - Escala base aumentada a `html { font-size: 18px; }`.
   - Enunciados de examen (`.q-stem-text`): escalados a `1.38rem` (~25px), `font-weight: 700`, interlineado `1.6`.
   - Fichas de opción (`.opt-tile`): padding generoso (`18px 24px`), altura mínima de `64px`, texto a `1.15rem` (`font-weight: 600`), con microinteracción táctil (`active: scale(0.99)`).
   - Insignias de letra [A] / [B] (`.opt-key-badge`): aumentadas a `38x38px` con tipografía monoespaciada a `1.05rem` (`font-weight: 800`).
   - Pila de Dudas (`.doubt-card-stem`): escalado a `1.35rem` (`font-weight: 700`) con opciones a `1.08rem` y botones de acción a `1rem` (`font-weight: 700`).
   - Cifras estadísticas (`.analytics-num`): `2.25rem` (`font-weight: 800`), títulos de sección a `1.85rem` y `1.32rem`.

3. **Modo Claro con Tipografía 100% NEGRA PURA (`#000000`):**
   - Se configuraron los tokens de texto en modo claro (`[data-theme="light"]`) con valores absolutos:
     - `--text-pure: #000000;`
     - `--text: #000000;`
     - `--text-muted: #000000;`
     - `--text-dim: #1F2937;`
   - Se eliminaron todos los textos grises lavados. Todo el contenido y las etiquetas presentan contraste nítido y óptimo para sesiones prolongadas de estudio.

4. **Color de Acento Unificado en Ambos Temas:**
   - Se eliminó la divergencia de tono de acento entre temas.
   - Tanto el tema oscuro como el claro utilizan un azul corporativo unificado `--accent: #3B82F6;` con hover dinámico y texto blanco puro `--accent-ink: #FFFFFF;` en botones principales.

5. **Mejoras UX/UI Avanzadas (Más allá de Figma):**
   - **Navegación completa por teclado en Simulacros:**
     - Selección de opciones con teclas `1` o `A` (Opción A) y `2` o `B` (Opción B).
     - Dejar en blanco con `0`, `Espacio` o `D`.
     - Marcar/Desmarcar para revisión con `F`.
     - Navegación entre preguntas con `←` y `→`.
   - **Navegación completa por teclado en Pila de Dudas:**
     - Resolver y descartar duda con `Enter`, `Y` o `T` (con sonido de fanfarria y animación fluida de descarte).
     - Desplegar explicación extendida con `N` o `E`.
     - Alternar acordeón oficial con `Espacio`.
   - **Microinteracciones y feedback táctil:** estados `:active` en todas las opciones y botones para sensación de respuesta inmediata.

---

## 7. FASE 4 IMPLEMENTADA — MÓDULO A: REPETICIÓN ESPACIADA (SM-2) Y REPRODUCTOR

### 7.1 Limpieza Radical de Textos Innecesarios y Boilerplate
- **Top Bar:** Eliminación completa de las 3 pastillas de estadísticas redundantes (`Test: N, Aprobados: N%, Fallos: N`).
- **Sidebar Header:** Retirada definitiva del distintivo `UMU` de la marca, dejando un limpio y profesional `ISO STUDIO`.
- **Sidebar Footer:** Eliminación completa del pie repetitivo (`Normativa UMU: +1.0 / -1.0 / 0 | Corte: 16 netos`). La información sobre puntuación oficial se presenta exclusivamente en la pantalla de inicio del examen (`#subtab-study-official`).
- **Depuración Integral:** Eliminación de disclaimers repetitivos, referencias a cátedra y textos redundantes en Dashboard, Analítica, Resultados y Auditor de Preguntas.

### 7.2 Pantalla de Repetición Espaciada (Figma Pantalla 7)
- **Subpestaña Principal en Repasar:** `#subtab-review-spaced` (Repetición Espaciada SM-2) activada por defecto.
- **Métricas en Cabecera (KPIs):**
  - `Repasos Pendientes`: preguntas programadas para hoy (`nextReviewDate <= now`).
  - `Atrasados (>24h)`: preguntas con más de 24 horas de retraso.
  - `Preguntas Nuevas`: preguntas aún no intentadas (`totalAttempts === 0`).
  - `Dominadas`: preguntas con dominio permanente consolidado.
  - `Tiempo Estimado`: duración estimada de la sesión de repaso (`~X min`).
- **Configuración de la Sesión:**
  - Selector de tamaño: 10 preguntas, 20 preguntas, todas las pendientes o añadir 10 nuevas.
  - Filtro por tema opcional (T1–T6).
  - Botón primario: `Comenzar Repaso (N preguntas)`.
- **Guía de Intervalos SM-2:**
  - 🔴 *No la sabía:* intervalo de 10 minutos (fase de aprendizaje activo).
  - 🟡 *Me costó recordarla:* intervalo de 1 a 3 días (afianzamiento y consolidación).
  - 🟢 *La sabía con seguridad:* intervalo de 7 a 14 días (promoción a dominada al superar 14 días).

### 7.3 Reproductor de Repaso Interactivo (Figma Pantalla 15)
- **Modo Active Recall:**
  - Cabecera con progreso (`Pregunta X de Y`), etiqueta temática y estado actual de repetición (`Intervalo: X días · Facilidad: 2.5x`).
  - Enunciado en tipografía grande y sobria (`1.32rem`, `font-weight: 700`).
  - Fichas de opción A y B sobrias y nítidas (`min-height: 60px`).
  - Botón de revelado: `Mostrar Respuesta [Espacio]`.
- **Evaluación de Confianza tras Revelar:**
  - Resaltado de la opción correcta con borde verde y marca de verificación `✓`.
  - Explicación oficial detallada en tarjeta con borde de acento.
  - **Los 3 botones de calificación cognitiva:**
    - `[1] No la sabía` (rojo, intervalo 10 min, reduce factor de facilidad).
    - `[2] Me costó recordarla` (amarillo, intervalo 1-3 días).
    - `[3] La sabía con seguridad` (verde, intervalo 7-14 días, incrementa facilidad).
  - Editor de notas personales con autoguardado para cada pregunta.
  - Atajos de teclado: `[Espacio]` para revelar, teclas `1`, `2`, `3` para evaluar directamente.
- **Resumen al Finalizar la Sesión:**
  - Pantalla de felicitación con porcentaje de retención global.
  - Desglose de preguntas recordadas con seguridad, con duda y para reintentar.
  - Acciones para volver al panel de repaso o iniciar otra sesión de inmediato.

### 7.4 Verificación de Calidad y Pruebas
- Pruebas automatizadas de regresión de Fase 3: 100% superadas (`test_phase3_full.js`).
- Pruebas automatizadas de flujo completo de Fase 4: 100% superadas (`test_phase4_full.js`).
- Validación estricta de sintaxis en `app.js` y `questions.js` sin errores.

---

## 8. FASE 5 IMPLEMENTADA — MÓDULO B: SESIÓN INTELIGENTE ADAPTATIVA Y MODO TUTOR (FIGMA PANTALLAS 14 Y 15)

### 8.1 Configurador de Sesión Adaptativa (`#subtab-study-smart`, Figma Pantalla 14)
- **Selector de Modo de Estudio:**
  - **Modo Tutor Guiado:** retroalimentación y explicación inmediata tras cada pregunta, bloqueo de respuesta, audio didáctico y avance fluido. Ideal para aprendizaje activo, asimilación y comprensión de conceptos técnicos.
  - **Modo Simulacro Evaluativo:** cronómetro estricto ajustado a 72 segundos por pregunta, sin retroalimentación intermedia, evaluación acumulativa con desglose de aciertos, fallos y nota neta final.
- **Selector de Volumen de Preguntas:**
  - `10 Preguntas`: sesión rápida (~8 min).
  - `20 Preguntas`: sesión estándar recomendada (~18 min).
  - `30 Preguntas`: sesión intensiva (~28 min).
  - `Personalizada`: selector numérico interactivo (rango de 5 a 50 preguntas).
- **Alcance Temático:**
  - Botón de selección global `Todos los temas`.
  - Chips temáticos multiselección individuales (`T1` a `T6`) con indicación de volumen y ponderación oficial de la asignatura (`T2: 131Q · 40%`, `T4: 103Q · 32%`).
- **Panel de Telemetría Predictiva del Lote:**
  - Análisis reactivo en tiempo real del banco antes de iniciar la sesión:
    - *Repasos Vencidos SM-2:* estimación de preguntas pendientes en el intervalo de recuperación activa.
    - *Tema Más Débil:* detección automática del tema con menor tasa de acierto acumulada en el historial.
    - *Nuevas (Ampliación):* preguntas aún no intentadas para expandir la cobertura del temario.
    - *Tiempo Estimado:* cálculo predictivo de duración de la sesión.
- **Botón Primario de Lanzamiento:**
  - Botón CTA de gran visibilidad (`Iniciar Sesión Inteligente (N Preguntas · Modo X)`) que lanza la sesión instantáneamente con los parámetros configurados.

### 8.2 Algoritmo de Equilibrado Adaptativo (`generateSmartSessionQuestions`)
- **Jerarquía Estricta de Priorización:**
  1. Preguntas vencidas según el algoritmo SM-2 (`nextReviewDate <= now`).
  2. Preguntas de la pila de fallos activos (`mistakesBank`).
  3. Preguntas pertenecientes al tema con menor rendimiento del usuario (`weakestTopic`).
  4. Preguntas no practicadas (`totalAttempts === 0`) para garantizar cobertura del 100% del temario.
  5. Preguntas de afianzamiento y consolidación de la memoria a largo plazo.
- **Garantías Matemáticas y de Calidad:**
  - **Cero duplicados garantizados:** control mediante estructura `Set` de identificadores únicos en todo el proceso de selección.
  - **Regla anti-fatiga:** limitación de preguntas erróneas a un máximo del 40-50% de la sesión para evitar frustración cognitiva.
  - **Regla anti-sobreexposición:** barajado determinista de candidatos prioritarios.
  - **Alineación con el examen oficial:** cuando no hay datos históricos, prioriza automáticamente T2 (40%) y T4 (32%).

### 8.3 Modo Tutor Guiado en el Lienzo de Examen (`#view-quiz`)
- **Interacción y Retroalimentación Inmediata:**
  - Al pulsar una opción, la tarjeta seleccionada se evalúa instantáneamente:
    - Si es correcta: resalta en verde `.is-tutor-correct`, distintivo `✓` y reproduce `AUDIO.playSuccess()`.
    - Si es incorrecta: resalta en rojo `.is-tutor-wrong`, muestra la opción correcta en verde `.is-tutor-correct` y reproduce `AUDIO.playAlert()`.
  - Bloqueo inmediato de opciones para evitar respuestas posteriores fraudulentas (`disabled`).
  - Tarjeta de justificación pedagógica (`.tutor-feedback-box`):
    - Título de estado (`✓ ¡Respuesta Correcta!` o `✗ Respuesta Incorrecta (-1.0 ptos)`).
    - Justificación académica oficial (`q.ex`).
    - Botón primario: `Siguiente Pregunta →` o `Finalizar y Ver Resultados`.
- **Integración con Navegador y Telemetría:**
  - La pastilla correspondiente en la tira superior del navegador (`#quiz-navigator`) se colorea de inmediato en verde (`.answered-correct`) o rojo (`.answered-wrong`).
  - Se registra automáticamente el intento en `LEARNING_ENGINE.recordAttempt` con contexto `'smart_tutor'`.
- **Navegación Ergonométrica por Teclado:**
  - Al revelarse la retroalimentación, pulsar `Enter`, `Flecha Derecha (→)` o `Espacio` avanza automáticamente a la siguiente pregunta.

### 8.4 Verificación de Calidad y Pruebas
- Pruebas automatizadas de Fase 5: **35/35 pruebas superadas (100%)** (`test_phase5_full.js`).
- Suite de regresión integral (Fases 1 a 5): **100% superada**.
- Sintaxis JavaScript verificada con Node.js sin advertencias.

---

## 9. FASE 6 IMPLEMENTADA — MÓDULOS C Y D: MAPA DE DOMINIO T1-T6 Y CENTRO DE ERRORES CON TAXONOMÍA COGNITIVA

> **Fecha:** 18 de noviembre de 2026  
> **Estado:** COMPLETADO AL 100% CON ÉXITO  

### 9.1 Módulo C: Mapa de Dominio T1-T6 (Mastery Map)
- **Cálculo Riguroso de Maestría Temática:**
  - `Cobertura (% Coverage):` Ratio de preguntas exploradas y practicadas sobre el total del banco temático (`practiced / total * 100`).
  - `Consistencia / Retención (% Retention):` Escalera de maduración SM-2 ponderada (Dominadas: 1.0, Consolidando: 0.7, Aprendizaje: 0.35).
  - `Índice Compuesto de Maestría (0%–100%):` Modelo matemático `Maestría = Cobertura × 0.4 + Retención × 0.6`, penalizado por fallos activos no resueltos para forzar la remediación de errores antes de proclamar dominio.
  - `Nivel de Maduración Cualitativo:`
    - 🟢 `DOMINADO` (Maestría $\ge 75\%$).
    - 🟡 `CONSOLIDANDO` ($40\% - 74\%$).
    - 🔴 `EN DESARROLLO` ($1\% - 39\%$).
    - ⚪ `SIN EXPLORAR` ($0\%$).
- **Visualización Detallada de los 6 Temas Oficiales:**
  - Tarjetas temáticas responsivas (`.mastery-topic-card`) en rejilla minmax de 320px.
  - Insignia temática con color oficial y peso en el examen oficial (`T1: 16%`, `T2: 40%`, `T3: 12%`, `T4: 32%`, `T5/T6: Ampliación`).
  - Barras de progreso dobles para Cobertura y Retención con contraste optimizado.
  - Desglose cuantitativo por estado de aprendizaje: `Nuevas`, `En Aprendizaje`, `Afianzar / Consolidando`, `Dominadas`.
  - Botón de acción directo `Entrenar 15Q` y `Ver Fallos del Tema`.
  - Integración en el Dashboard (`#radar-topics-grid`): tarjetas de diagnóstico conectadas al motor `getTopicDeepStats()`.

### 9.2 Módulo D: Centro de Errores y Taxonomía Cognitiva de Fallos
- **Taxonomía Cognitiva de 5 Categorías:**
  - 🧠 `concept` — **Desconocimiento Teórico:** No conocía la teoría, estructura de datos o llamada al sistema.
  - 🔄 `confusion` — **Confusión Conceptual:** Duda entre dos conceptos o términos análogos/similares (p. ej. mutex vs semáforo binario, tuberías con nombre vs anónimas).
  - 👁️ `reading` — **Error de Lectura / Trampa:** Lectura apresurada, negación inadvertida ("cuál NO es correcta") o caso límite.
  - 🧮 `calculation` — **Cálculo / Traza:** Fallo aritmético en simulación paso a paso de algoritmos (Round Robin, TLB hit/miss, cómputo de inodos).
  - ⚡ `lapse` — **Descuido / Lapsus:** Conocía la respuesta correcta pero marcó erróneamente por prisa o distracción.
- **Selector Rápido de Categorías en 1 Clic (`.category-pill`):**
  - Botones táctiles interactivos en cada tarjeta de fallo, en la Pila de Dudas (LIFO) y en el listado completo.
  - Persistencia instantánea en `iso_personal_annotations` (`LEARNING_ENGINE.setErrorCategory`) sin recargas molestas de la interfaz.
  - Actualización reactiva de contadores en vivo.
- **Dictamen Pedagógico Automatizado:**
  - Análisis contextual de la causa de fallo predominante y el tema más castigado, generando recomendaciones de estudio concretas y accionables para el temario de ISO.
- **Buscador y Filtros Avanzados:**
  - Filtrado instantáneo por Tema (T1-T6 o Todos), por Causa Cognitiva, por Reincidencia ($\ge 2$ fallos) y buscador en tiempo real por texto en enunciado o justificación.
- **Práctica de Rescate Focalizada:**
  - Botón `🎯 Practicar en Modo Tutor`: lanza un mini-examen inmediato de 1 pregunta en Modo Tutor con retroalimentación instantánea y bloqueo de opciones.
  - Botón `Lanzar Test con Estos Fallos`: genera una sesión adaptativa con las preguntas filtradas.
  - Botón `✓ Aclarada`: retira la pregunta de la pila de fallos y actualiza el contador.

### 9.3 Verificación y Control de Calidad
- Pruebas automatizadas de Fase 6: **40/40 pruebas superadas (100%)** (`test_phase6_full.js`).
- Suite de regresión integral (Fases 3, 4, 5 y 6): **100% superadas con cero regresiones**.
- Capturas visuales verificadas en modo oscuro y claro:
  - `errors_view_dark.png`
  - `dash_dark.png`
  - `topics_dark.png`
- Sintaxis JavaScript verificada con `node -c js/app.js` (0 errores).


