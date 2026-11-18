# ISO STUDIO 2.0 — ESTRATEGIA Y SUITE DE PRUEBAS
## Documentación de Aseguramiento de Calidad (QA)

### 1. Filosofía de Pruebas
El proyecto exige validación empírica en cada nivel funcional y visual. Ninguna fase se considera completa sin la ejecución y pase del 100% de sus pruebas automatizadas.

---

### 2. Inventario de Suites de Pruebas

| Suite / Archivo | Cobertura / Responsabilidad | Casos de Prueba |
| :--- | :--- | :--- |
| `test_phase3_full.js` | Migración de esquema v2, persistencia, estados SM-2, auditoría de integridad. | 15 pruebas |
| `test_phase4_full.js` | Repetición espaciada, motor de flashcard, evaluación de 3 botones (`fail`, `hard`, `easy`). | 12 pruebas |
| `test_phase5_full.js` | Sesión Inteligente adaptativa, telemetría predictiva, balanceo de preguntas, modo tutor. | 25 pruebas |
| `test_phase6_full.js` | Mapa de dominio T1–T6, Centro de Errores, taxonomía cognitiva de 5 categorías. | 40 pruebas |
| `test_phase7_full.js` | Módulo de notas personales, favoritos, atajos de teclado y práctica focalizada. | 30 pruebas |
| `test_phase8_full.js` | Indicador de preparación UMU, 4 pilares ponderados, umbral oficial $\ge 16$ netos. | 18 pruebas |
| `test_modal_popups.js`| Modales nativos `<dialog>`, menú de herramientas rápidas y prevención de abandono. | 10 pruebas |
| **Total Cobertura** | **Validación integral de extremo a extremo (E2E)** | **150 pruebas** |

---

### 3. Ejecución Automatizada

Para ejecutar la batería completa de pruebas:
```bash
node scratch/test_phase3_full.js && \
node scratch/test_phase4_full.js && \
node scratch/test_phase5_full.js && \
node scratch/test_phase6_full.js && \
node scratch/test_phase7_full.js && \
node scratch/test_phase8_full.js && \
node scratch/test_modal_popups.js
```

---

### 4. Pruebas Visuales y de Renderizado Headless
El sistema utiliza Firefox headless para verificar la presentación en tiempo real en resoluciones estándar:
- **1280x950** (Desktop / Laptop)
- **1024x768** (Tablet horizontal)
- **768x1024** (Tablet vertical)
- **390x844** (Móvil)

Criterios de verificación visual:
1. Ausencia de solapamiento en tarjetas temáticas (`.topic-header-bar`).
2. Contraste mínimo WCAG AAA ($\ge 7:1$) en tema claro (`#202630` sobre `#FFFFFF`).
3. Ausencia de efectos prohibidos (cero resplandores neón, cero desenfoques artificiales).
4. Unificación de color de acento (`#8CA8D8` en oscuro, `#5277B5` en claro).
