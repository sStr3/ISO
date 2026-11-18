# ISO STUDIO 2.0 — ARQUITECTURA DEL MODELO DE DATOS
## Documentación Técnica de Esquema y Persistencia (v2)

### 1. Visión General y Separación de Contextos
El modelo de datos de ISO STUDIO 2.0 está diseñado bajo el principio de **desacoplamiento estricto de responsabilidades** entre la evaluación formal y el aprendizaje continuo:

- **Contexto A (Evaluación Oficial e Histórica)**: Almacena resultados inmutables de exámenes oficiales y convocatorias pasadas. El motor de aprendizaje no puede alterar retroactivamente las calificaciones de este contexto.
- **Contexto B (Aprendizaje Adaptativo y Repetición)**: Almacena el estado de memoria del alumno, máquina de estados SM-2, intentos individuales, notas y favoritos.

---

### 2. Claves de Persistencia en `localStorage`

| Clave | Tipo | Esquema / Estructura | Propósito |
| :--- | :--- | :--- | :--- |
| `iso_schema_version` | String | `"2"` | Control de versión para migraciones automáticas. |
| `iso_test_history` | Array | `Array<TestResult>` | Historial inmutable de exámenes completados. |
| `iso_learning_state` | Object | `Record<string, QuestionLearningState>` | Estado SM-2 por pregunta (intervalos, facilidad, estado). |
| `iso_answer_attempts`| Array | `Array<AttemptRecord>` | Registro cronológico central de intentos. |
| `iso_personal_annotations` | Object | `Record<string, PersonalAnnotation>` | Favoritos, notas y categorización de errores. |
| `iso_custom_questions` | Array | `Array<CustomQuestion>` | Preguntas importadas por el usuario en JSON. |
| `iso_backup_vault` | Object | `BackupVault` | Bóveda de snapshot de seguridad previo a migraciones. |
| `iso_theme` | String | `"dark" \| "light"` | Preferencia visual del usuario. |
| `iso_sound_muted` | String | `"true" \| "false"` | Estado del sintetizador de audio. |

---

### 3. Definición de Entidades

#### 3.1 `TestResult` (Historial de Examen)
```typescript
interface TestResult {
  id: string;                      // Identificador único (test_timestamp_random)
  date: string;                    // Timestamp ISO 8601
  name: string;                    // Nombre de la sesión (ej. 'Simulacro (50 preguntas)')
  score: number;                   // Calificación oficial en escala 0–10 (ej. 7.50)
  netPoints: number;               // Puntos netos: correct - wrong
  correct: number;                 // Cantidad de aciertos (+1.0 c/u)
  wrong: number;                   // Cantidad de fallos (-1.0 c/u)
  blank: number;                   // Cantidad en blanco (0.0 c/u)
  totalQ: number;                  // Total preguntas (50 para oficial)
  passed: boolean;                 // true si netPoints >= 16 (corte oficial UMU)
  timeSpent: number;               // Segundos empleados
  topicBreakdown: Record<string, {
    correct: number;
    wrong: number;
    blank: number;
    total: number;
  }>;
}
```

#### 3.2 `QuestionLearningState` (Algoritmo SM-2)
```typescript
interface QuestionLearningState {
  id: string;                      // ID estable de la pregunta (ej. 'base_42')
  state: 'new' | 'pending' | 'learning' | 'consolidating' | 'mastered';
  intervalDays: number;            // Días hasta el próximo repaso
  easeFactor: number;              // Factor de facilidad (inicial 2.5, min 1.3)
  consecutiveSuccesses: number;    // Racha de respuestas correctas consecutivas
  totalAttempts: number;           // Total de intentos realizados
  lastAttemptDate: string | null;  // ISO 8601
  nextReviewDate: string | null;   // ISO 8601
  lastConfidence: 'fail' | 'hard' | 'easy' | null;
}
```

#### 3.3 `PersonalAnnotation` (Anotaciones y Taxonomía)
```typescript
interface PersonalAnnotation {
  isFavorite: boolean;             // Marcador de estrella
  isMarkedForReview: boolean;      // Marcador de bandera
  notes: string;                   // Apuntes personales y mnemotecnia
  errorCategory?: 'concept' | 'confusion' | 'reading' | 'calculation' | 'lapse';
  updatedAt: string;               // ISO 8601
}
```

#### 3.4 `AttemptRecord` (Motor Central de Registro)
```typescript
interface AttemptRecord {
  id: string;                      // ID del intento
  questionId: string;              // Referencia a la pregunta
  timestamp: string;               // ISO 8601
  isCorrect: boolean;              // Resultado binario
  userAnswer: number;              // 0 ó 1
  confidence: 'fail' | 'hard' | 'easy' | null;
  context: 'official_exam' | 'topic_test' | 'smart_session' | 'spaced_review' | 'doubt_stack';
  timeSpentMs?: number;
}
```

---

### 4. Política de Migración e Integridad
1. **Detección Automática**: Al iniciar, `migrateStorageSchema()` comprueba `iso_schema_version`.
2. **Snapshot de Seguridad**: Si detecta datos de esquema v1 o claves previas, genera un snapshot íntegro en `iso_backup_vault`.
3. **Auditoría de Integridad (`runDataAudit`)**: Comprueba y subsana:
   - Estados huérfanos sin pregunta correspondiente en el banco.
   - Puntuaciones con tipos no numéricos (`parseFloat`).
   - Sincronización entre `iso_personal_annotations` e `iso_learning_state`.
