/**
 * ═══════════════════════════════════════════════════════════════════
 * ISO STUDIO — CORE APPLICATION ENGINE
 * High-Contrast UMU Operating Systems Exam Simulator & Analytics
 * Palette: #1C1C28 (Charcoal Slate) & #F6E6EA (Alabaster Blush)
 * Typography: IBM Plex Mono & IBM Plex Sans
 * Negative marking: 1 correct = +1.0, 1 wrong = -1.0, blank = 0
 * Pass threshold: >= 16 net points (5.0 / 10.0)
 * ═══════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── Global App State ──────────────────────────────────────────────
  const APP = {
    currentView: 'dashboard',
    sidebarCollapsed: false,
    questions: [],
    testHistory: [],
    mistakesBank: {}, // { [questionId]: failCount }
    activeQuiz: null,
    activeReviewSession: null, // { questions: [], currentIndex: 0, results: [], isRevealed: false }
    lastResult: null,
    timerHandle: null,
    activeReviewFilter: 'all',
    doubtsViewMode: 'stack', // 'stack' or 'list'
    doubtsStackIndex: 0,

    // Phase 3 — Adaptive Learning & Telemetry Stores
    schemaVersion: 2,
    learningState: {}, // { [questionId]: stateObj }
    answerAttempts: [], // Log of all responses across all modes
    personalAnnotations: {}, // { [questionId]: { notes, isFavorite, flaggedForReview, customTag, updatedAt } }

    // Topic metadata adaptativo a temas
    topicKeys: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    topicMeta: {
      T1: { title: 'T1: Introducción a los SSOO', color: 'var(--T1)', officialExamShare: 8 },
      T2: { title: 'T2: Procesos y Concurrencia', color: 'var(--T2)', officialExamShare: 20 },
      T3: { title: 'T3: Gestión de Memoria', color: 'var(--T3)', officialExamShare: 6 },
      T4: { title: 'T4: E/S y Sistema de Ficheros', color: 'var(--T4)', officialExamShare: 16 },
      T5: { title: 'T5: Seguridad y Protección', color: 'var(--T5)', officialExamShare: 0 },
      T6: { title: 'T6: Sistemas Distribuidos', color: 'var(--T6)', officialExamShare: 0 }
    }
  };

  // ── Audio Synthesis Engine (Zero-Dependency Web Audio API) ─────────
  const AUDIO = {
    ctx: null,
    muted: false,
    init() {
      this.muted = localStorage.getItem('iso_sound_muted') === 'true';
      this.updateToggleBtn();
      const unlock = () => {
        this.ensureCtx();
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
    },
    ensureCtx() {
      try {
        if (!this.ctx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      } catch (e) {
        console.warn('AudioContext not supported:', e);
      }
    },
    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('iso_sound_muted', this.muted ? 'true' : 'false');
      this.updateToggleBtn();
      if (!this.muted) {
        this.playClick();
        showToast('Efectos de sonido activados 🔊', 'info', 2000);
      } else {
        showToast('Sonido silenciado 🔇', 'info', 2000);
      }
    },
    updateToggleBtn() {
      const btn = document.getElementById('btn-toggle-sound');
      if (!btn) return;
      const onIcon = btn.querySelector('.sound-icon-on');
      const offIcon = btn.querySelector('.sound-icon-off');
      if (this.muted) {
        if (onIcon) onIcon.style.display = 'none';
        if (offIcon) offIcon.style.display = 'block';
        btn.title = 'Sonido silenciado (clic para activar)';
      } else {
        if (onIcon) onIcon.style.display = 'block';
        if (offIcon) offIcon.style.display = 'none';
        btn.title = 'Sonido activado (clic para silenciar)';
      }
    },
    playClick() {
      if (this.muted) return;
      this.ensureCtx();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch(e) {}
    },
    playSelect() {
      if (this.muted) return;
      this.ensureCtx();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(920, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch(e) {}
    },
    playWhoosh() {
      if (this.muted) return;
      this.ensureCtx();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
      } catch(e) {}
    },
    playFanfare() {
      if (this.muted) return;
      this.ensureCtx();
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          const start = this.ctx.currentTime + idx * 0.09;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.45);
        });
      } catch(e) {}
    },
    playAlert() {
      if (this.muted) return;
      this.ensureCtx();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.065, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.22);
      } catch(e) {}
    },
    playSuccess() {
      if (this.muted) return;
      this.ensureCtx();
      if (!this.ctx) return;
      try {
        const notes = [659.25, 880.00];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const start = this.ctx.currentTime + idx * 0.08;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.08, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.16);
        });
      } catch(e) {}
    }
  };

  // ── Confetti Particle Celebration Engine ──────────────────────────
  const CONFETTI = {
    canvas: null,
    ctx: null,
    particles: [],
    animHandle: null,
    init() {
      this.canvas = document.getElementById('confetti-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
      }
    },
    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    launch() {
      if (!this.canvas || !this.ctx) return;
      this.resize();
      const colors = ['#F6E6EA', '#B39DF2', '#52D195', '#F5B054', '#38BDF8', '#FB7185', '#FFFFFF'];
      this.particles = [];
      const count = 160;

      for (let i = 0; i < count; i++) {
        const isLeft = Math.random() < 0.5;
        const x = isLeft ? Math.random() * (this.canvas.width * 0.25) : this.canvas.width - Math.random() * (this.canvas.width * 0.25);
        this.particles.push({
          x: x,
          y: this.canvas.height + Math.random() * 20,
          w: 8 + Math.random() * 8,
          h: 6 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (isLeft ? 1 : -1) * (5 + Math.random() * 11),
          vy: -(13 + Math.random() * 15),
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 14,
          gravity: 0.38 + Math.random() * 0.15,
          opacity: 1,
          fadeSpeed: 0.005 + Math.random() * 0.006
        });
      }

      if (this.animHandle) cancelAnimationFrame(this.animHandle);
      this.update();
    },
    update() {
      if (!this.ctx || !this.canvas) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let alive = 0;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.fadeSpeed;

        if (p.opacity > 0 && p.y < this.canvas.height + 60) {
          alive++;
          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.globalAlpha = Math.max(0, p.opacity);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          this.ctx.restore();
        }
      }

      if (alive > 0) {
        this.animHandle = requestAnimationFrame(() => this.update());
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animHandle = null;
      }
    }
  };

  // ── Animated Number Utility ───────────────────────────────────────
  function animateNumberValue(element, start, end, duration, decimals = 0, prefix = '', suffix = '') {
    if (!element) return;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * ease;
      element.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current)) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = prefix + (decimals > 0 ? end.toFixed(decimals) : Math.round(end)) + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // ── Theme Manager (Minimal SaaS Light / Dark) ─────────────────────
  function initTheme() {
    let saved = 'dark';
    try {
      saved = localStorage.getItem('iso_theme') || 'dark';
    } catch (e) {}
    applyTheme(saved);

    const btn = document.getElementById('btn-toggle-theme');
    if (btn) {
      btn.addEventListener('click', function () {
        AUDIO.playClick();
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
          localStorage.setItem('iso_theme', next);
        } catch (e) {}
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('btn-toggle-theme');
    if (btn) {
      const isLight = theme === 'light';
      const iconDark = btn.querySelector('.theme-icon-dark');
      const iconLight = btn.querySelector('.theme-icon-light');
      if (iconDark && iconLight) {
        iconDark.style.display = isLight ? 'none' : 'block';
        iconLight.style.display = isLight ? 'block' : 'none';
      }
      btn.title = isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro';
      btn.setAttribute('aria-label', btn.title);
    }
  }

  // ── Initialization ────────────────────────────────────────────────
  function init() {
    initTheme();
    loadQuestions();
    loadPersistentStorage();
    AUDIO.init();
    CONFETTI.init();
    setupSidebarToggle();
    setupKeyboardShortcuts();
    setupNavigation();
    setupActions();
    updateGlobalHeaderStats();
    renderAnalyticsDashboard();

    // Default view
    switchView('dashboard');
  }

  function loadQuestions() {
    let base = [];
    if (window.BASE_QUESTIONS && Array.isArray(window.BASE_QUESTIONS)) {
      base = window.BASE_QUESTIONS.map(q => ({
        ...q,
        ans: typeof q.ans !== 'undefined' ? q.ans : (typeof q.a !== 'undefined' ? q.a : 0),
        ex: q.ex || q.explanation || ''
      }));
    } else {
      console.warn('BASE_QUESTIONS not found on window, fallback to empty array.');
    }

    // Merge persistent custom questions if any
    try {
      const customRaw = localStorage.getItem('iso_custom_questions');
      if (customRaw) {
        const custom = JSON.parse(customRaw);
        if (Array.isArray(custom)) {
          base = base.concat(custom);
        }
      }
    } catch (e) {
      console.warn('Error reading iso_custom_questions:', e);
    }

    APP.questions = base;
    const qCountEl = document.getElementById('sidebar-q-count');
    if (qCountEl) qCountEl.textContent = APP.questions.length;
  }

  // ── Schema Migration & Safety Vault (Phase 3) ─────────────────────
  function migrateStorageSchema() {
    try {
      const currentVer = localStorage.getItem('iso_schema_version');
      if (currentVer !== '2') {
        const rawHistory = localStorage.getItem('iso_test_history');
        const rawMistakes = localStorage.getItem('iso_mistakes_bank');
        const rawCustom = localStorage.getItem('iso_custom_questions');
        if (rawHistory || rawMistakes || rawCustom) {
          const vaultSnapshot = {
            snapshotAt: new Date().toISOString(),
            fromVersion: currentVer || '1',
            testHistory: rawHistory ? JSON.parse(rawHistory) : [],
            mistakesBank: rawMistakes ? JSON.parse(rawMistakes) : {},
            customQuestions: rawCustom ? JSON.parse(rawCustom) : []
          };
          localStorage.setItem('iso_backup_vault', JSON.stringify(vaultSnapshot));
        }

        // Initialize learning state from existing mistakes bank if available
        if (rawMistakes) {
          try {
            const parsedMistakes = JSON.parse(rawMistakes);
            const initialLearning = {};
            const nowIso = new Date().toISOString();
            Object.keys(parsedMistakes).forEach(qId => {
              const fails = parsedMistakes[qId] || 1;
              initialLearning[qId] = {
                id: qId,
                state: 'learning',
                intervalDays: 10 / 1440,
                easeFactor: Math.max(1.3, Number((2.5 - fails * 0.1).toFixed(2))),
                consecutiveSuccesses: 0,
                totalAttempts: fails,
                lastReviewed: nowIso,
                nextReviewDate: nowIso,
                lastConfidence: 'low'
              };
            });
            localStorage.setItem('iso_learning_state', JSON.stringify(initialLearning));
          } catch (e) {}
        }

        localStorage.setItem('iso_schema_version', '2');
      }
    } catch (e) {
      console.warn('Migration warning:', e);
    }
  }

  // ── Data Validators (Phase 3) ─────────────────────────────────────
  function validateLearningState(state, qId) {
    if (!state || typeof state !== 'object') {
      return {
        id: qId,
        state: 'new',
        intervalDays: 0,
        easeFactor: 2.5,
        consecutiveSuccesses: 0,
        totalAttempts: 0,
        lastReviewed: null,
        nextReviewDate: null,
        lastConfidence: null
      };
    }
    const validStates = ['new', 'pending', 'learning', 'consolidating', 'mastered'];
    return {
      id: qId,
      state: validStates.includes(state.state) ? state.state : 'new',
      intervalDays: typeof state.intervalDays === 'number' && state.intervalDays >= 0 ? state.intervalDays : 0,
      easeFactor: typeof state.easeFactor === 'number' && state.easeFactor >= 1.3 && state.easeFactor <= 3.0 ? state.easeFactor : 2.5,
      consecutiveSuccesses: Number.isInteger(state.consecutiveSuccesses) && state.consecutiveSuccesses >= 0 ? state.consecutiveSuccesses : 0,
      totalAttempts: Number.isInteger(state.totalAttempts) && state.totalAttempts >= 0 ? state.totalAttempts : 0,
      lastReviewed: state.lastReviewed && !isNaN(Date.parse(state.lastReviewed)) ? state.lastReviewed : null,
      nextReviewDate: state.nextReviewDate && !isNaN(Date.parse(state.nextReviewDate)) ? state.nextReviewDate : null,
      lastConfidence: ['low', 'medium', 'high', null].includes(state.lastConfidence) ? state.lastConfidence : null
    };
  }

  function validateAttemptLog(entry) {
    if (!entry || typeof entry !== 'object') return null;
    if (!entry.questionId || typeof entry.isCorrect !== 'boolean') return null;
    return {
      id: entry.id || ('att_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)),
      questionId: String(entry.questionId),
      timestamp: entry.timestamp && !isNaN(Date.parse(entry.timestamp)) ? entry.timestamp : new Date().toISOString(),
      isCorrect: Boolean(entry.isCorrect),
      userAnswer: typeof entry.userAnswer === 'number' ? entry.userAnswer : null,
      confidence: ['low', 'medium', 'high'].includes(entry.confidence) ? entry.confidence : null,
      context: typeof entry.context === 'string' ? entry.context : 'general',
      timeSpentMs: typeof entry.timeSpentMs === 'number' && entry.timeSpentMs >= 0 ? entry.timeSpentMs : 0
    };
  }

  function validateAnnotation(entry) {
    if (!entry || typeof entry !== 'object') {
      return { notes: '', isFavorite: false, flaggedForReview: false, customTag: '', updatedAt: null };
    }
    return {
      notes: typeof entry.notes === 'string' ? entry.notes.slice(0, 2000) : '',
      isFavorite: Boolean(entry.isFavorite),
      flaggedForReview: Boolean(entry.flaggedForReview),
      customTag: typeof entry.customTag === 'string' ? entry.customTag.slice(0, 50) : '',
      updatedAt: entry.updatedAt && !isNaN(Date.parse(entry.updatedAt)) ? entry.updatedAt : null
    };
  }

  // ── Motor de Aprendizaje y Repetición Espaciada (LEARNING_ENGINE) ──
  const LEARNING_ENGINE = {
    createDefaultState(questionId) {
      return {
        id: questionId,
        state: 'new', // 'new' | 'pending' | 'learning' | 'consolidating' | 'mastered'
        intervalDays: 0,
        easeFactor: 2.5,
        consecutiveSuccesses: 0,
        totalAttempts: 0,
        lastReviewed: null,
        nextReviewDate: null,
        lastConfidence: null
      };
    },

    getState(questionId) {
      if (!APP.learningState[questionId]) {
        APP.learningState[questionId] = this.createDefaultState(questionId);
      } else {
        APP.learningState[questionId] = validateLearningState(APP.learningState[questionId], questionId);
      }
      return APP.learningState[questionId];
    },

    recordAttempt({ questionId, isCorrect, userAnswer = null, confidence = null, context = 'quiz', timeSpentMs = 0 }) {
      if (!questionId) return null;

      const now = new Date();
      const nowIso = now.toISOString();
      const state = this.getState(questionId);

      state.totalAttempts++;
      state.lastReviewed = nowIso;
      state.lastConfidence = confidence;

      // Intervalos de Repetición Espaciada (Heurística SM-2 adaptada):
      // Fallo: 10 minutos (10 / 1440 días) -> state: 'learning'
      // Acierto con poca confianza: 1 día -> state: 'learning'
      // Acierto con confianza media: 3 días -> state: 'consolidating'
      // Acierto consolidado: 7 días -> state: 'consolidating'
      // Dominio mantenido: 14 días -> state: 'mastered'
      if (!isCorrect) {
        state.consecutiveSuccesses = 0;
        state.state = 'learning';
        state.intervalDays = 10 / 1440; // 10 minutes
        state.easeFactor = Math.max(1.3, Number((state.easeFactor - 0.2).toFixed(2)));
        APP.mistakesBank[questionId] = (APP.mistakesBank[questionId] || 0) + 1;
      } else {
        state.consecutiveSuccesses++;

        if (confidence === 'high') {
          state.easeFactor = Math.min(3.0, Number((state.easeFactor + 0.15).toFixed(2)));
        } else if (confidence === 'low') {
          state.easeFactor = Math.max(1.3, Number((state.easeFactor - 0.15).toFixed(2)));
        }

        if (state.consecutiveSuccesses === 1) {
          state.intervalDays = 1;
          state.state = 'learning';
        } else if (state.consecutiveSuccesses === 2) {
          state.intervalDays = confidence === 'low' ? 2 : 3;
          state.state = 'consolidating';
        } else if (state.consecutiveSuccesses === 3) {
          state.intervalDays = 7;
          state.state = 'consolidating';
        } else {
          state.intervalDays = Math.round(state.intervalDays * state.easeFactor);
          if (state.intervalDays >= 14) {
            state.state = 'mastered';
            if (APP.mistakesBank[questionId]) {
              delete APP.mistakesBank[questionId];
            }
          } else {
            state.state = 'consolidating';
          }
        }
      }

      const nextDate = new Date(now.getTime() + state.intervalDays * 24 * 60 * 60 * 1000);
      state.nextReviewDate = nextDate.toISOString();

      const rawAttempt = {
        id: 'att_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        questionId: questionId,
        timestamp: nowIso,
        isCorrect: isCorrect,
        userAnswer: userAnswer,
        confidence: confidence,
        context: context,
        timeSpentMs: timeSpentMs
      };

      const validatedAttempt = validateAttemptLog(rawAttempt);
      if (validatedAttempt) {
        APP.answerAttempts.push(validatedAttempt);
        if (APP.answerAttempts.length > 1000) {
          APP.answerAttempts = APP.answerAttempts.slice(-1000);
        }
      }

      savePersistentStorage();
      return state;
    },

    getStateCounts() {
      const counts = { new: 0, pending: 0, learning: 0, consolidating: 0, mastered: 0 };
      const now = new Date();
      const mistakeSet = new Set(Object.keys(APP.mistakesBank));

      APP.questions.forEach(q => {
        const st = APP.learningState[q.id];
        if (!st || st.totalAttempts === 0) {
          if (mistakeSet.has(q.id)) {
            counts.pending++;
          } else {
            counts.new++;
          }
        } else {
          const isDue = (st.nextReviewDate && new Date(st.nextReviewDate) <= now);
          if (st.state === 'mastered' && !isDue) {
            counts.mastered++;
          } else if (isDue || mistakeSet.has(q.id)) {
            counts.pending++;
          } else if (st.state === 'consolidating') {
            counts.consolidating++;
          } else if (st.state === 'learning') {
            counts.learning++;
          } else {
            counts.new++;
          }
        }
      });
      return counts;
    },

    getDueReviews() {
      const now = new Date();
      const mistakeSet = new Set(Object.keys(APP.mistakesBank));
      return APP.questions.filter(q => {
        if (mistakeSet.has(q.id)) return true;
        const st = APP.learningState[q.id];
        if (!st || !st.nextReviewDate) return false;
        return new Date(st.nextReviewDate) <= now;
      });
    },

    getAnnotation(questionId) {
      if (!APP.personalAnnotations[questionId]) {
        return {
          notes: '',
          isFavorite: false,
          flaggedForReview: false,
          customTag: '',
          updatedAt: null
        };
      }
      return validateAnnotation(APP.personalAnnotations[questionId]);
    },

    setAnnotation(questionId, patch) {
      const current = this.getAnnotation(questionId);
      const merged = {
        ...current,
        ...patch,
        updatedAt: new Date().toISOString()
      };
      APP.personalAnnotations[questionId] = validateAnnotation(merged);
      savePersistentStorage();
      return APP.personalAnnotations[questionId];
    },

    toggleFavorite(questionId) {
      const cur = this.getAnnotation(questionId);
      const next = !cur.isFavorite;
      this.setAnnotation(questionId, { isFavorite: next });
      return next;
    },

    getCoverageStats() {
      const total = APP.questions.length;
      const practicedIds = new Set();
      const byTopic = {};
      const topicKeys = APP.topicKeys || ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];

      topicKeys.forEach(k => {
        byTopic[k] = { total: 0, practiced: 0, mastered: 0 };
      });

      APP.questions.forEach(q => {
        const top = q.t || 'T1';
        if (!byTopic[top]) byTopic[top] = { total: 0, practiced: 0, mastered: 0 };
        byTopic[top].total++;

        const st = APP.learningState[q.id];
        if (st && st.totalAttempts > 0) {
          practicedIds.add(q.id);
          byTopic[top].practiced++;
          if (st.state === 'mastered') byTopic[top].mastered++;
        }
      });

      return {
        total: total,
        practiced: practicedIds.size,
        coveragePercent: total > 0 ? Math.round((practicedIds.size / total) * 100) : 0,
        byTopic: byTopic
      };
    },

    getRetentionRate() {
      if (APP.answerAttempts.length === 0) return 0;
      let correct = 0;
      APP.answerAttempts.forEach(a => {
        if (a.isCorrect) correct++;
      });
      return Math.round((correct / APP.answerAttempts.length) * 100);
    },

    getWeakTopics() {
      const stats = {};
      const topicKeys = APP.topicKeys || ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
      topicKeys.forEach(k => {
        stats[k] = { attempts: 0, errors: 0, topic: k };
      });

      APP.answerAttempts.forEach(att => {
        const q = APP.questions.find(x => x.id === att.questionId);
        if (q && q.t && stats[q.t]) {
          stats[q.t].attempts++;
          if (!att.isCorrect) stats[q.t].errors++;
        }
      });

      return Object.values(stats)
        .map(s => ({
          ...s,
          errorRate: s.attempts > 0 ? Math.round((s.errors / s.attempts) * 100) : 0
        }))
        .sort((a, b) => b.errorRate - a.errorRate);
    },

    getTopicMastery(topicKey) {
      const topicQs = APP.questions.filter(q => q.t === topicKey);
      if (topicQs.length === 0) return 0;
      let scoreSum = 0;
      topicQs.forEach(q => {
        const st = APP.learningState[q.id];
        if (!st) return;
        if (st.state === 'mastered') scoreSum += 1.0;
        else if (st.state === 'consolidating') scoreSum += 0.7;
        else if (st.state === 'learning') scoreSum += 0.3;
      });
      return Math.round((scoreSum / topicQs.length) * 100);
    },

    auditDataIntegrity() {
      const report = {
        totalQuestions: APP.questions.length,
        initialStatesCount: Object.keys(APP.learningState).length,
        fixedStates: 0,
        prunedStateOrphans: 0,
        initialAttemptsCount: APP.answerAttempts.length,
        validAttempts: 0,
        prunedAttemptOrphans: 0,
        initialAnnotationsCount: Object.keys(APP.personalAnnotations).length,
        prunedAnnotationOrphans: 0,
        vaultAvailable: Boolean(localStorage.getItem('iso_backup_vault'))
      };

      const validIdSet = new Set(APP.questions.map(q => q.id));

      // Audit learningState
      const cleanLearning = {};
      for (const [qId, st] of Object.entries(APP.learningState)) {
        if (!validIdSet.has(qId)) {
          report.prunedStateOrphans++;
          continue;
        }
        const validated = validateLearningState(st, qId);
        if (JSON.stringify(validated) !== JSON.stringify(st)) {
          report.fixedStates++;
        }
        cleanLearning[qId] = validated;
      }
      APP.learningState = cleanLearning;

      // Audit answerAttempts
      const cleanAttempts = [];
      APP.answerAttempts.forEach(att => {
        if (!validIdSet.has(att.questionId)) {
          report.prunedAttemptOrphans++;
          return;
        }
        const val = validateAttemptLog(att);
        if (val) cleanAttempts.push(val);
      });
      APP.answerAttempts = cleanAttempts.slice(-1000);
      report.validAttempts = APP.answerAttempts.length;

      // Audit personalAnnotations
      const cleanAnnotations = {};
      for (const [qId, ann] of Object.entries(APP.personalAnnotations)) {
        if (!validIdSet.has(qId)) {
          report.prunedAnnotationOrphans++;
          continue;
        }
        cleanAnnotations[qId] = validateAnnotation(ann);
      }
      APP.personalAnnotations = cleanAnnotations;

      return report;
    }
  };

  function loadPersistentStorage() {
    migrateStorageSchema();

    try {
      const savedHistory = localStorage.getItem('iso_test_history');
      if (savedHistory) {
        APP.testHistory = JSON.parse(savedHistory);
      }
      const savedMistakes = localStorage.getItem('iso_mistakes_bank');
      if (savedMistakes) {
        APP.mistakesBank = JSON.parse(savedMistakes);
      }
      const savedCollapse = localStorage.getItem('iso_sidebar_collapsed');
      if (savedCollapse === 'true') {
        APP.sidebarCollapsed = true;
        applySidebarCollapsedState(true);
      }

      // Phase 3 persistent stores
      const savedLearning = localStorage.getItem('iso_learning_state');
      if (savedLearning) {
        APP.learningState = JSON.parse(savedLearning);
      }
      const savedAttempts = localStorage.getItem('iso_answer_attempts');
      if (savedAttempts) {
        APP.answerAttempts = JSON.parse(savedAttempts);
      }
      const savedAnnotations = localStorage.getItem('iso_personal_annotations');
      if (savedAnnotations) {
        APP.personalAnnotations = JSON.parse(savedAnnotations);
      }
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
  }

  function savePersistentStorage() {
    try {
      localStorage.setItem('iso_test_history', JSON.stringify(APP.testHistory));
      localStorage.setItem('iso_mistakes_bank', JSON.stringify(APP.mistakesBank));
      localStorage.setItem('iso_sidebar_collapsed', APP.sidebarCollapsed ? 'true' : 'false');
      localStorage.setItem('iso_schema_version', '2');

      // Phase 3 persistent stores
      localStorage.setItem('iso_learning_state', JSON.stringify(APP.learningState));
      localStorage.setItem('iso_answer_attempts', JSON.stringify(APP.answerAttempts));
      localStorage.setItem('iso_personal_annotations', JSON.stringify(APP.personalAnnotations));
    } catch (err) {
      console.error('Error saving localStorage:', err);
    }
  }

  // ── Collapsible Sidebar ───────────────────────────────────────────
  function setupSidebarToggle() {
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        APP.sidebarCollapsed = !APP.sidebarCollapsed;
        applySidebarCollapsedState(APP.sidebarCollapsed);
        savePersistentStorage();
      });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }

  function applySidebarCollapsedState(collapsed) {
    const sidebar = document.getElementById('sidebar');
    const workspace = document.getElementById('workspace');
    if (sidebar) {
      if (collapsed) {
        sidebar.classList.add('collapsed');
      } else {
        sidebar.classList.remove('collapsed');
      }
    }
    if (workspace) {
      if (collapsed) {
        workspace.classList.add('sidebar-collapsed');
      } else {
        workspace.classList.remove('sidebar-collapsed');
      }
    }
  }

  // ── View & Subtab Routing (4 Áreas Maestras) ─────────────────────
  function setupNavigation() {
    // Main Sidebar Nav Links
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        AUDIO.playClick();
        const view = this.getAttribute('data-view');
        if (view) {
          switchView(view);
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('mobile-open');
        }
      });
    });

    // Subtabs buttons across views
    const subtabBtns = document.querySelectorAll('.subtab-btn[data-subtab]');
    subtabBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        AUDIO.playClick();
        const parent = this.getAttribute('data-parent');
        const subtab = this.getAttribute('data-subtab');
        if (parent && subtab) {
          switchSubtab(parent, subtab);
        }
      });
    });
  }

  function switchSubtab(parentKey, subtabKey) {
    // Update subtab buttons
    const subtabBtns = document.querySelectorAll(`.subtab-btn[data-parent="${parentKey}"]`);
    subtabBtns.forEach(function (btn) {
      if (btn.getAttribute('data-subtab') === subtabKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update subtab panels
    const parentPanel = document.getElementById('view-' + parentKey);
    if (parentPanel) {
      const panels = parentPanel.querySelectorAll('.subtab-panel');
      panels.forEach(function (panel) {
        if (panel.id === 'subtab-' + subtabKey) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    }

    // Subtab specific render hooks
    if (parentKey === 'study') {
      if (subtabKey === 'study-smart') renderSmartSessionConfig();
    } else if (parentKey === 'review') {
      if (subtabKey === 'review-spaced') renderSpacedRepetitionView();
      if (subtabKey === 'review-stack') renderMistakesView();
      if (subtabKey === 'review-errors') renderErrorsDiagnosis();
    } else if (parentKey === 'admin') {
      if (subtabKey === 'admin-bank') renderBankView();
      if (subtabKey === 'admin-history') renderHistoryView();
      if (subtabKey === 'admin-backup') renderStorageAuditInfo();
    }
  }

  function switchView(viewKey, subtabKey) {
    // If active quiz is running and user tries to navigate away, prompt confirmation
    if (APP.activeQuiz && APP.currentView === 'quiz' && viewKey !== 'quiz' && viewKey !== 'results') {
      if (!confirm('Hay un simulacro de examen en curso. ¿Deseas salir? El progreso se descartará.')) {
        return;
      }
      stopQuizTimer();
      APP.activeQuiz = null;
    }

    // Map legacy / shortcut view names to the 4 master areas
    const legacyMap = {
      official: { view: 'study', subtab: 'study-official' },
      exams: { view: 'study', subtab: 'study-exams' },
      topics: { view: 'study', subtab: 'study-topics' },
      smart: { view: 'study', subtab: 'study-smart' },
      spaced: { view: 'review', subtab: 'review-spaced' },
      mistakes: { view: 'review', subtab: 'review-stack' },
      bank: { view: 'admin', subtab: 'admin-bank' },
      history: { view: 'admin', subtab: 'admin-history' },
      ingest: { view: 'admin', subtab: 'admin-ingest' },
      backup: { view: 'admin', subtab: 'admin-backup' }
    };

    if (legacyMap[viewKey]) {
      if (!subtabKey) subtabKey = legacyMap[viewKey].subtab;
      viewKey = legacyMap[viewKey].view;
    }

    APP.currentView = viewKey;

    // Update active nav-link
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    navLinks.forEach(function (link) {
      if (link.getAttribute('data-view') === viewKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
      const titles = {
        dashboard: 'Panel de Rendimiento',
        study: 'Estudiar / Simulacros y Exámenes',
        review: 'Repasar / Repetición Espaciada y Diagnóstico',
        admin: 'Administrar / Banco y Configuración',
        quiz: 'Simulacro en Curso',
        results: 'Resultados del Examen'
      };
      breadcrumbCurrent.textContent = titles[viewKey] || viewKey;
    }

    // Toggle panels
    const panels = document.querySelectorAll('.view-panel');
    panels.forEach(function (panel) {
      if (panel.id === 'view-' + viewKey) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Activate appropriate subtab
    if (subtabKey) {
      switchSubtab(viewKey, subtabKey);
    } else {
      if (viewKey === 'study') switchSubtab('study', 'study-official');
      else if (viewKey === 'review') switchSubtab('review', 'review-spaced');
      else if (viewKey === 'admin') switchSubtab('admin', 'admin-bank');
    }

    // View-specific render hooks
    if (viewKey === 'dashboard') {
      renderAnalyticsDashboard();
    } else if (viewKey === 'study') {
      if (subtabKey === 'study-smart') renderSmartSessionConfig();
    } else if (viewKey === 'review') {
      renderSpacedRepetitionView();
    } else if (viewKey === 'admin') {
      renderBankView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Global Header Stats ───────────────────────────────────────────
  function updateGlobalHeaderStats() {
    const totalTests = APP.testHistory.length;
    let passCount = 0;
    APP.testHistory.forEach(function (t) {
      if (t.passed) passCount++;
    });
    const passRate = totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0;
    const mistakeCount = Object.keys(APP.mistakesBank).length;

    const statTestsEl = document.getElementById('hdr-stat-tests');
    const statPassEl = document.getElementById('hdr-stat-pass');
    const statMistakesEl = document.getElementById('hdr-stat-mistakes');
    const sidebarDoubtsCount = document.getElementById('sidebar-doubts-count');
    const mistakesTotalCount = document.getElementById('mistakes-total-count');

    if (statTestsEl) statTestsEl.textContent = totalTests;
    if (statPassEl) statPassEl.textContent = passRate + '%';
    if (statMistakesEl) statMistakesEl.textContent = mistakeCount;
    if (sidebarDoubtsCount) sidebarDoubtsCount.textContent = mistakeCount;
    if (mistakesTotalCount) mistakesTotalCount.textContent = mistakeCount;
  }

  // ── Analytics Dashboard (Home Screen) ─────────────────────────────
  function renderAnalyticsDashboard() {
    const totalTests = APP.testHistory.length;
    let totalScore = 0;
    let totalNet = 0;
    let passCount = 0;

    APP.testHistory.forEach(function (test) {
      totalScore += parseFloat(test.score) || 0;
      totalNet += parseFloat(test.net) || 0;
      if (test.passed) passCount++;
    });

    const avgScore = totalTests > 0 ? (totalScore / totalTests).toFixed(2) : '0.00';
    const passRate = totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0;
    const avgNet = totalTests > 0 ? (totalNet / totalTests).toFixed(1) : '0.0';

    // Count mastered questions (questions answered correctly without current mistakes)
    const mistakeIds = new Set(Object.keys(APP.mistakesBank));
    const testedIds = new Set();
    APP.testHistory.forEach(function (t) {
      if (t.questions) {
        t.questions.forEach(function (q) {
          testedIds.add(q.id);
        });
      }
    });
    let masteredCount = 0;
    testedIds.forEach(function (id) {
      if (!mistakeIds.has(id)) masteredCount++;
    });

    // Animate KPI cards
    const cardTests = document.getElementById('dash-total-tests');
    const cardPass = document.getElementById('dash-pass-rate');
    const cardScore = document.getElementById('dash-avg-score');
    const cardPending = document.getElementById('dash-stat-pending');
    const cardNet = document.getElementById('dash-total-net');
    const cardMastered = document.getElementById('dash-mastered');

    if (cardTests) animateNumberValue(cardTests, 0, totalTests, 750, 0);
    if (cardPass) animateNumberValue(cardPass, 0, passRate, 850, 0, '', '%');
    if (cardScore) animateNumberValue(cardScore, 0, Number(avgScore), 900, 2);
    if (cardPending) animateNumberValue(cardPending, 0, mistakeIds.size, 750, 0);
    if (cardNet) animateNumberValue(cardNet, 0, totalNet, 800, 0, totalNet >= 0 ? '+' : '');
    if (cardMastered) cardMastered.textContent = masteredCount + ' / ' + APP.questions.length;

    // Render Transparent Academic Readiness Indicator
    updateReadinessIndicator();

    // Render SVG Score Progression Chart
    renderProgressionChart();

    // Render Radar & Topic Health
    renderTopicHealth();

    // Render Recent History Table
    renderRecentHistoryTable();
  }

  // ── Indicador de Preparación Oficial UMU ──────────────────────────
  function updateReadinessIndicator() {
    const container = document.getElementById('dash-readiness-container');
    if (!container) return;

    const totalTests = APP.testHistory.length;
    let passCount = 0;
    APP.testHistory.forEach(t => {
      if (t.passed) passCount++;
    });
    const passRate = totalTests > 0 ? (passCount / totalTests) : 0;

    // Tested unique questions
    const testedIds = new Set();
    APP.testHistory.forEach(t => {
      if (t.questions) {
        t.questions.forEach(q => testedIds.add(q.id));
      }
    });
    const coverage = APP.questions.length > 0 ? (testedIds.size / APP.questions.length) : 0;

    // Pending doubts resolution
    const pendingDoubts = Object.keys(APP.mistakesBank).length;
    const doubtsResolution = (testedIds.size > 0) ? Math.max(0, 1 - (pendingDoubts / Math.max(testedIds.size, 1))) : 1;

    // Official 50Q simulations volume (Target: 5 complete official exams)
    const officialTests = APP.testHistory.filter(t => t.totalQ === 50).length;
    const simRatio = Math.min(1, officialTests / 5);

    // Weighted index: 25% simulations volume, 35% pass rate (corte 16 netos), 20% coverage, 20% doubts resolution
    const rawIndex = (simRatio * 0.25) + (passRate * 0.35) + (coverage * 0.20) + (doubtsResolution * 0.20);
    const scorePct = Math.round(rawIndex * 100);

    let statusText = 'NIVEL INICIAL';
    let statusColor = 'var(--err)';
    let statusBg = 'var(--err-bg)';
    let statusBorder = 'var(--err-border)';

    if (scorePct >= 85) {
      statusText = 'PREPARACIÓN EXCELENTE';
      statusColor = 'var(--accent)';
      statusBg = 'var(--accent-subtle)';
      statusBorder = 'var(--accent-border)';
    } else if (scorePct >= 65) {
      statusText = 'CANDIDATO APTO (CORTE SUPERADO)';
      statusColor = 'var(--ok)';
      statusBg = 'var(--ok-bg)';
      statusBorder = 'var(--ok-border)';
    } else if (scorePct >= 35) {
      statusText = 'EN PREPARACIÓN ACTIVA';
      statusColor = 'var(--warn)';
      statusBg = 'var(--warn-bg)';
      statusBorder = 'var(--warn-border)';
    }

    container.innerHTML = `
      <div class="readiness-card">
        <div class="readiness-header">
          <div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--text-pure); display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span>Indicador de Preparación</span>
              <span class="readiness-badge mono" style="background:${statusBg}; color:${statusColor}; border-color:${statusBorder};">${statusText}</span>
            </div>
            <p style="font-size:0.86rem; color:var(--text-muted); margin:4px 0 0 0;">
              Simulacros completados, tasa de aprobados, cobertura y resolución de dudas.
            </p>
          </div>
          <div class="mono" style="font-size:2rem; font-weight:800; color:${statusColor};">
            ${scorePct}%
          </div>
        </div>

        <div class="quiz-progress-track" style="margin-bottom:18px; height:8px; border-radius:4px; overflow:hidden;">
          <div class="quiz-progress-fill" style="width:${scorePct}%; background:${statusColor};"></div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px;">
          <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px;">
            <div class="mono" style="font-size:0.72rem; color:var(--text-dim); margin-bottom:2px;">SIMULACROS (50Q)</div>
            <div class="mono" style="font-size:1.05rem; font-weight:700; color:var(--text-pure);">${officialTests} / 5 objetivo</div>
            <div style="font-size:0.76rem; color:var(--text-muted); margin-top:2px;">${Math.round(simRatio * 100)}% consolidado</div>
          </div>

          <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px;">
            <div class="mono" style="font-size:0.72rem; color:var(--text-dim); margin-bottom:2px;">TASA APROBADOS (≥16)</div>
            <div class="mono" style="font-size:1.05rem; font-weight:700; color:${passRate >= 0.5 ? 'var(--ok)' : 'var(--err)'};">${Math.round(passRate * 100)}%</div>
            <div style="font-size:0.76rem; color:var(--text-muted); margin-top:2px;">${passCount} de ${totalTests} exámenes</div>
          </div>

          <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px;">
            <div class="mono" style="font-size:0.72rem; color:var(--text-dim); margin-bottom:2px;">COBERTURA BANCO</div>
            <div class="mono" style="font-size:1.05rem; font-weight:700; color:var(--text-pure);">${testedIds.size} / ${APP.questions.length}</div>
            <div style="font-size:0.76rem; color:var(--text-muted); margin-top:2px;">${Math.round(coverage * 100)}% del temario visto</div>
          </div>

          <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px;">
            <div class="mono" style="font-size:0.72rem; color:var(--text-dim); margin-bottom:2px;">PILA DE FALLOS</div>
            <div class="mono" style="font-size:1.05rem; font-weight:700; color:${pendingDoubts === 0 ? 'var(--ok)' : 'var(--err)'};">${pendingDoubts} pendientes</div>
            <div style="font-size:0.76rem; color:var(--text-muted); margin-top:2px;">${pendingDoubts === 0 ? 'Pila al día ✓' : 'Requiere aclaración'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // ── Centro de Errores: Diagnóstico Temático ───────────────────────
  function renderErrorsDiagnosis() {
    const container = document.getElementById('review-errors-diagnosis-container');
    if (!container) return;

    const mistakeIds = Object.keys(APP.mistakesBank);
    const mistakes = APP.questions.filter(q => mistakeIds.includes(q.id));

    if (mistakes.length === 0) {
      container.innerHTML = `
        <div class="readiness-card" style="text-align:center; padding:36px;">
          <div style="width:52px; height:52px; border-radius:50%; background:var(--ok-bg); border:1px solid var(--ok-border); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:var(--ok);">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-pure); margin-bottom:6px;">¡Sin errores pendientes!</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); max-width:440px; margin:0 auto 20px;">No tienes preguntas falladas en este momento. Completa más simulacros oficiales para que el diagnóstico analice tus patrones de error.</p>
          <button class="act-btn-pro primary" onclick="window.ISO_STUDIO.startOfficialQuiz()">Hacer Simulacro Oficial</button>
        </div>
      `;
      return;
    }

    const topicErrors = { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 };
    mistakes.forEach(q => {
      const t = q.t || 'T1';
      topicErrors[t] = (topicErrors[t] || 0) + 1;
    });

    let html = `
      <div class="readiness-card" style="padding:24px; margin-bottom:20px;">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-pure); margin-bottom:6px;">
          Distribución de Errores por Bloque Temático
        </h3>
        <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:20px;">
          Tienes ${mistakes.length} preguntas en tu pila de fallos. Resuelve las dudas de los temas prioritarios para asegurar el aprobado.
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:20px;">
    `;

    ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].forEach(topKey => {
      const count = topicErrors[topKey] || 0;
      const meta = APP.topicMeta[topKey] || { title: topKey };
      const pct = Math.round((count / mistakes.length) * 100);
      html += `
        <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span class="topic-tag mono" style="color:var(--${topKey}); font-weight:700;">${topKey}</span>
            <span class="mono" style="font-size:0.85rem; font-weight:800; color:${count > 0 ? 'var(--err)' : 'var(--text-dim)'};">${count} fallos</span>
          </div>
          <div style="font-size:0.82rem; color:var(--text-pure); margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${meta.title}</div>
          <div class="progress-rail"><div class="progress-fill" style="width:${pct}%; background:${count > 0 ? 'var(--err)' : 'var(--border)'};"></div></div>
        </div>
      `;
    });

    html += `
        </div>
        <div style="display:flex; justify-content:flex-end;">
          <button class="act-btn-pro primary" onclick="window.ISO_STUDIO.switchSubtab('review', 'review-stack')">
            Resolver Dudas en la Pila LIFO →
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // ── Curva de Evolución con Alto Contraste Adaptativo ───────────────
  function renderProgressionChart() {
    const container = document.getElementById('chart-container');
    if (!container) return;

    if (APP.testHistory.length === 0) {
      container.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; color:var(--text-dim);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="margin-bottom:12px; opacity:0.6;">
            <path d="M3 3v18h18" stroke-linecap="round"/>
            <path d="M7 16l4-5 4 3 6-8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div style="font-weight:700; color:var(--text); font-size:1rem; margin-bottom:4px;">No hay simulacros registrados todavía</div>
          <div style="font-size:0.84rem; max-width:440px; margin-bottom:16px;">Completa tu primer simulacro oficial de 50 preguntas para visualizar tu curva de aprendizaje y evolución de nota con respecto al aprobado (5.0).</div>
          <button class="act-btn-pro primary" id="btn-chart-first-test">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Comenzar Simulacro Oficial
          </button>
        </div>
      `;
      const btn = document.getElementById('btn-chart-first-test');
      if (btn) btn.addEventListener('click', startOfficialQuiz);
      return;
    }

    // Dynamic high-contrast tokens from current theme
    const comp = typeof window !== 'undefined' && window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
    const chartLine = comp ? (comp.getPropertyValue('--chart-line').trim() || '#60A5FA') : '#60A5FA';
    const chartGrid = comp ? (comp.getPropertyValue('--border').trim() || '#2D3748') : '#2D3748';
    const chartText = comp ? (comp.getPropertyValue('--text-dim').trim() || '#94A3B8') : '#94A3B8';
    const chartTextPure = comp ? (comp.getPropertyValue('--text-pure').trim() || '#FFFFFF') : '#FFFFFF';
    const chartCutoff = comp ? (comp.getPropertyValue('--err').trim() || '#EF4444') : '#EF4444';
    const chartSurface = comp ? (comp.getPropertyValue('--surface-card').trim() || '#151A24') : '#151A24';
    const chartOk = comp ? (comp.getPropertyValue('--ok').trim() || '#22C55E') : '#22C55E';

    // Prepare chronological data points (limit to last 15 tests)
    const historySlice = APP.testHistory.slice(-15);
    const scores = historySlice.map(t => Number(t.score));
    const n = scores.length;

    const width = 800;
    const height = 220;
    const padX = 48;
    const padY = 32;
    const plotW = width - padX * 2;
    const plotH = height - padY * 2;

    const getY = (val) => padY + plotH - (val / 10.0) * plotH;
    const getX = (idx) => n === 1 ? padX + plotW / 2 : padX + (idx / (n - 1)) * plotW;

    const yPass = getY(5.0);
    const points = scores.map((val, idx) => `${getX(idx).toFixed(1)},${getY(val).toFixed(1)}`).join(' ');

    const firstX = getX(0).toFixed(1);
    const lastX = getX(n - 1).toFixed(1);
    const bottomY = (padY + plotH).toFixed(1);
    const areaPoints = `${firstX},${bottomY} ${points} ${lastX},${bottomY}`;

    let svgHtml = `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%; overflow:visible;">
        <defs>
          <linearGradient id="chartFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${chartLine}" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="${chartLine}" stop-opacity="0.0"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Horizontal Grid Lines -->
        <line x1="${padX}" y1="${getY(0)}" x2="${width - padX}" y2="${getY(0)}" stroke="${chartGrid}" stroke-width="1"/>
        <text x="${padX - 10}" y="${getY(0) + 4}" fill="${chartText}" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">0.0</text>

        <line x1="${padX}" y1="${getY(2.5)}" x2="${width - padX}" y2="${getY(2.5)}" stroke="${chartGrid}" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${padX - 10}" y="${getY(2.5) + 4}" fill="${chartText}" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">2.5</text>

        <!-- PASS LINE AT 5.0 -->
        <line x1="${padX}" y1="${yPass}" x2="${width - padX}" y2="${yPass}" stroke="${chartCutoff}" stroke-width="1.8" stroke-dasharray="5,4"/>
        <text x="${padX - 10}" y="${yPass + 4}" fill="${chartCutoff}" font-size="11" font-weight="700" font-family="'IBM Plex Mono', monospace" text-anchor="end">5.0</text>
        <text x="${width - padX + 8}" y="${yPass + 4}" fill="${chartCutoff}" font-size="10" font-weight="700" font-family="'IBM Plex Mono', monospace">APROBADO (5.0)</text>

        <line x1="${padX}" y1="${getY(7.5)}" x2="${width - padX}" y2="${getY(7.5)}" stroke="${chartGrid}" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${padX - 10}" y="${getY(7.5) + 4}" fill="${chartText}" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">7.5</text>

        <line x1="${padX}" y1="${getY(10)}" x2="${width - padX}" y2="${getY(10)}" stroke="${chartGrid}" stroke-width="1"/>
        <text x="${padX - 10}" y="${getY(10) + 4}" fill="${chartText}" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">10.0</text>

        <!-- Area fill under curve -->
        <polygon points="${areaPoints}" fill="url(#chartFillGrad)"/>

        <!-- Score Polyline -->
        <polyline class="anim-chart-line" points="${points}" fill="none" stroke="${chartLine}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      `;

      // Data circles
      historySlice.forEach((t, idx) => {
        const cx = getX(idx);
        const cy = getY(t.score);
        const isPass = t.passed;
        const pointColor = isPass ? chartOk : chartCutoff;
        const dateStr = (t.date || '').split('T')[0] || `T${idx + 1}`;
        const delay = (0.2 + idx * 0.05).toFixed(2);

        svgHtml += `
          <g class="chart-point-group" style="cursor:pointer; animation-delay: ${delay}s;">
            <circle cx="${cx}" cy="${cy}" r="6.5" fill="${pointColor}" stroke="${chartSurface}" stroke-width="2.5"/>
            <circle cx="${cx}" cy="${cy}" r="11" fill="none" stroke="${pointColor}" stroke-opacity="0.35" stroke-width="2"/>
            <text x="${cx}" y="${cy - 12}" fill="${chartTextPure}" font-size="11" font-weight="800" font-family="'IBM Plex Mono', monospace" text-anchor="middle">${Number(t.score).toFixed(1)}</text>
            <text x="${cx}" y="${padY + plotH + 18}" fill="${chartText}" font-size="10" font-family="'IBM Plex Mono', monospace" text-anchor="middle">${dateStr.slice(5)}</text>
          </g>
        `;
      });

    svgHtml += `</svg>`;
    container.innerHTML = svgHtml;
  }

  function renderTopicHealth() {
    // Calculate accuracy and attempts per topic
    const topicStats = {
      T1: { total: 0, correct: 0, wrong: 0, net: 0 },
      T2: { total: 0, correct: 0, wrong: 0, net: 0 },
      T3: { total: 0, correct: 0, wrong: 0, net: 0 },
      T4: { total: 0, correct: 0, wrong: 0, net: 0 },
      T5: { total: 0, correct: 0, wrong: 0, net: 0 },
      T6: { total: 0, correct: 0, wrong: 0, net: 0 }
    };

    APP.testHistory.forEach(function (t) {
      if (t.questions && t.userAnswers) {
        t.questions.forEach(function (q, idx) {
          const userAns = t.userAnswers[idx];
          const top = q.t || 'T1';
          if (!topicStats[top]) topicStats[top] = { total: 0, correct: 0, wrong: 0, net: 0 };
          if (userAns !== undefined) {
            topicStats[top].total++;
            if (userAns === q.ans) {
              topicStats[top].correct++;
              topicStats[top].net += 1.0;
            } else {
              topicStats[top].wrong++;
              topicStats[top].net -= 1.0;
            }
          }
        });
      }
    });

    // Find the most vulnerable topic (lowest net ratio among topics with attempts, or lowest among T1-T4)
    let weakestTopic = null;
    let lowestNetRatio = Infinity;

    ['T1', 'T2', 'T3', 'T4'].forEach(function (topKey) {
      const st = topicStats[topKey];
      const ratio = st.total > 0 ? (st.net / st.total) : 0;
      if (ratio < lowestNetRatio) {
        lowestNetRatio = ratio;
        weakestTopic = topKey;
      }
    });

    // If no tests taken yet, default weakest to T2 (highest weight in UMU exam: 20 questions)
    if (!weakestTopic || APP.testHistory.length === 0) {
      weakestTopic = 'T2';
    }

    const overallBadge = document.getElementById('radar-overall-badge');
    if (overallBadge) {
      const topTitle = (APP.topicMeta[weakestTopic] || {}).title || weakestTopic;
      if (APP.testHistory.length === 0) {
        overallBadge.className = 'radar-badge-pro neutral';
        overallBadge.textContent = 'RECOMENDACIÓN: T2 PROCESOS (40% DEL EXAMEN)';
      } else if (lowestNetRatio <= 0.3) {
        overallBadge.className = 'radar-badge-pro critical';
        overallBadge.textContent = `ATENCIÓN PRIORITARIA: ${weakestTopic} (${topTitle})`;
      } else {
        overallBadge.className = 'radar-badge-pro good';
        overallBadge.textContent = `BUEN NIVEL GENERAL • REFUERZA ${weakestTopic}`;
      }
    }

    // Render topic cards in grid
    const gridContainer = document.getElementById('radar-topics-grid');
    if (!gridContainer) return;

    let gridHtml = '';
    ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].forEach(function (topKey) {
      const meta = APP.topicMeta[topKey] || { title: topKey, color: '#A8A8C0', officialExamShare: 0 };
      const st = topicStats[topKey];
      const answered = st.total;
      const net = st.net;
      const netPct = answered > 0 ? Math.max(0, Math.round((net / answered) * 100)) : 0;
      const isVulnerable = topKey === weakestTopic && APP.testHistory.length > 0;

      // Color coding progress bar
      let barColor = meta.color;
      if (answered > 0) {
        if (netPct < 40) barColor = 'var(--err)';
        else if (netPct < 65) barColor = 'var(--warn)';
        else barColor = 'var(--ok)';
      }

      gridHtml += `
        <div class="radar-topic-card ${isVulnerable ? 'is-vulnerable' : ''}" data-topic="${topKey}">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="topic-tag mono" style="background:rgba(255,255,255,0.08); color:${meta.color}; border:1px solid ${meta.color}40;">${topKey}</span>
            <span class="mono" style="font-size:0.8rem; font-weight:800; color:${answered > 0 ? barColor : 'var(--text-dim)'};">
              ${answered > 0 ? netPct + '% neto' : 'Sin datos'}
            </span>
          </div>
          <div style="font-size:0.92rem; font-weight:700; color:var(--text-pure); margin-top:2px;">
            ${meta.title}
          </div>
          <div class="progress-rail" style="margin-top:6px;">
            <div class="progress-fill" style="width:${netPct}%; background:${barColor};"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-dim); margin-top:6px;" class="mono">
            <span>Aciertos: ${st.correct} | Fallos: ${st.wrong}</span>
            <span>Neto: ${net >= 0 ? '+' : ''}${net}</span>
          </div>
          <div style="margin-top:10px; display:flex; justify-content:flex-end;">
            <button class="act-btn-pro" style="padding:4px 10px; font-size:0.76rem;" onclick="window.ISO_STUDIO.startTopicTest('${topKey}', 15)">
              Entrenar ${topKey}
            </button>
          </div>
        </div>
      `;
    });

    gridContainer.innerHTML = gridHtml;

    // Weak topic notice in radar footer
    const weakRecText = document.getElementById('radar-weak-text');
    if (weakRecText) {
      const topTitle = (APP.topicMeta[weakestTopic] || {}).title || weakestTopic;
      weakRecText.innerHTML = `<strong>Diagnóstico del Algoritmo:</strong> Según tus respuestas, tu área más vulnerable es <strong>${weakestTopic} (${topTitle})</strong>. Te recomendamos realizar un test focalizado antes de tu próximo simulacro oficial.`;
    }
    const btnTrainWeak = document.getElementById('btn-train-weakest');
    if (btnTrainWeak) {
      btnTrainWeak.onclick = function () {
        startTopicQuiz(weakestTopic, 15);
      };
    }
  }

  function renderRecentHistoryTable() {
    const listContainer = document.getElementById('dashboard-history-list');
    if (!listContainer) return;

    if (APP.testHistory.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:32px 16px; color:var(--text-dim); font-size:0.88rem;">
          Aún no se ha completado ningún examen. Los tests que realices quedarán registrados aquí con su desglose detallado de puntos y fecha.
        </div>
      `;
      return;
    }

    const recent = APP.testHistory.slice(-5).reverse();
    let html = '';

    recent.forEach(function (t, idx) {
      const dateFormatted = (t.date || '').replace('T', ' ').slice(0, 16);
      const isPass = t.passed;
      const statusClass = isPass ? 'color:var(--ok); border:1px solid var(--ok-border); background:var(--ok-bg);' : 'color:var(--err); border:1px solid var(--err-border); background:var(--err-bg);';
      const statusText = isPass ? 'APROBADO' : 'SUSPENSO';

      html += `
        <div class="history-item-row">
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div style="font-weight:800; font-size:0.96rem; color:var(--text-pure);">${escapeHtml(t.name || 'Simulacro')}</div>
            <div class="mono" style="font-size:0.76rem; color:var(--text-dim);">${dateFormatted} • ${t.totalQ} preguntas</div>
          </div>
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="text-align:right;">
              <div class="mono" style="font-size:1.15rem; font-weight:800; color:var(--text-pure);">${Number(t.score).toFixed(2)} / 10</div>
              <div class="mono" style="font-size:0.76rem; color:var(--text-dim);">${t.net >= 0 ? '+' : ''}${t.net} netos (+${t.correct} -${t.wrong})</div>
            </div>
            <span class="mono" style="padding:4px 10px; border-radius:4px; font-size:0.75rem; font-weight:800; ${statusClass}">
              ${statusText}
            </span>
            <button class="act-btn-pro" style="padding:6px 12px; font-size:0.78rem;" onclick="window.ISO_STUDIO.inspectPastTest('${t.id}')">
              Revisar
            </button>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;
  }

  // ── Quiz Engine ───────────────────────────────────────────────────
  function startOfficialQuiz() {
    if (!APP.questions || APP.questions.length === 0) {
      showToast('No hay preguntas en el banco de datos.', 'error');
      return;
    }

    // 50 questions proportional to UMU official distribution:
    // T1: 8, T2: 20, T3: 6, T4: 16
    const t1 = pickRandom(APP.questions.filter(q => q.t === 'T1'), 8);
    const t2 = pickRandom(APP.questions.filter(q => q.t === 'T2'), 20);
    const t3 = pickRandom(APP.questions.filter(q => q.t === 'T3'), 6);
    const t4 = pickRandom(APP.questions.filter(q => q.t === 'T4'), 16);

    let chosen = [...t1, ...t2, ...t3, ...t4];

    // If any topic had fewer questions, fill from remaining
    if (chosen.length < 50) {
      const chosenIds = new Set(chosen.map(q => q.id));
      const remaining = APP.questions.filter(q => !chosenIds.has(q.id));
      const fill = pickRandom(remaining, 50 - chosen.length);
      chosen = [...chosen, ...fill];
    }

    // Shuffle questions
    shuffleArray(chosen);

    setupQuizSession({
      name: 'Simulacro Oficial ISO (50 Preguntas)',
      questions: chosen,
      isOfficial50: true,
      timeLimitSec: 3600 // 60 minutes
    });
  }

  function startHistoricalExam(examSourceKeyword, displayName) {
    let matching = [];
    const key = (examSourceKeyword || '').toLowerCase();

    // Deterministic prefix filter
    if (key.includes('2023')) {
      matching = APP.questions.filter(q => q.id.startsWith('examen_noviembre_2023_'));
    } else if (key.includes('prueba') || key.includes('test_prueba')) {
      matching = APP.questions.filter(q => q.id.startsWith('test_prueba_nov_2022_'));
    } else if (key.includes('2022')) {
      matching = APP.questions.filter(q => q.id.startsWith('examen_noviembre_2022_'));
    } else if (key.includes('parcial') || key.includes('parcial1') || key.includes('parcial_i')) {
      matching = APP.questions.filter(q => q.id.startsWith('parcial_i_oficial_'));
    } else {
      matching = APP.questions.filter(q => (q.source || '').toLowerCase().includes(key));
    }

    if (matching.length === 0) {
      showToast(`No se encontraron preguntas para el examen: ${displayName}`, 'error');
      return;
    }

    const questions = [...matching];
    shuffleArray(questions);

    setupQuizSession({
      name: displayName,
      questions: questions,
      isOfficial50: questions.length === 50,
      timeLimitSec: Math.round(questions.length * 72) // 72 seconds per question (~60 min for 50Q)
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // FASE 5 — MÓDULO B: SESIÓN INTELIGENTE ADAPTATIVA (FIGMA PANTALLA 14)
  // ═══════════════════════════════════════════════════════════════════

  const SMART_CONFIG = {
    count: 20,
    preset: '20', // '10' | '20' | '30' | 'custom'
    mode: 'tutor', // 'tutor' (guía inmediata) | 'exam' (simulación con cronómetro)
    topicMode: 'all', // 'all' | 'custom'
    selectedTopics: new Set(['T1', 'T2', 'T3', 'T4', 'T5', 'T6'])
  };

  function getWeakestTopic(eligibleTopics = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']) {
    const topicStats = {};
    eligibleTopics.forEach(t => {
      topicStats[t] = { correct: 0, total: 0 };
    });

    if (APP.answerAttempts && APP.answerAttempts.length > 0) {
      APP.answerAttempts.forEach(att => {
        const q = APP.questions.find(x => x.id === att.questionId);
        if (q && topicStats[q.t]) {
          topicStats[q.t].total++;
          if (att.isCorrect) topicStats[q.t].correct++;
        }
      });
    }

    let weakest = eligibleTopics[0] || 'T2';
    let lowestRate = Infinity;
    let hasData = false;

    eligibleTopics.forEach(t => {
      if (topicStats[t].total > 0) {
        hasData = true;
        const rate = topicStats[t].correct / topicStats[t].total;
        if (rate < lowestRate) {
          lowestRate = rate;
          weakest = t;
        }
      }
    });

    if (!hasData) {
      // Default to T2 (40% weight in official exam)
      return eligibleTopics.includes('T2') ? 'T2' : (eligibleTopics[0] || 'T2');
    }
    return weakest;
  }

  function getSmartSessionTelemetry(count, selectedTopics) {
    const activeTopics = selectedTopics || SMART_CONFIG.selectedTopics;
    const eligible = APP.questions.filter(q => activeTopics.has(q.t));
    const now = new Date();

    const dueList = eligible.filter(q => {
      if (APP.mistakesBank[q.id]) return true;
      const st = APP.learningState[q.id];
      return st && st.nextReviewDate && new Date(st.nextReviewDate) <= now;
    });

    const activeMistakes = eligible.filter(q => Boolean(APP.mistakesBank[q.id]));
    const weakestTopic = getWeakestTopic(Array.from(activeTopics));
    const unpracticed = eligible.filter(q => {
      const st = APP.learningState[q.id];
      return !st || st.totalAttempts === 0;
    });

    const targetDue = Math.min(Math.ceil(count * 0.35), dueList.length);
    const targetWeak = Math.min(Math.ceil(count * 0.30), eligible.filter(q => q.t === weakestTopic).length);
    const targetNew = Math.min(Math.max(0, count - targetDue - targetWeak), unpracticed.length);

    return {
      totalEligible: eligible.length,
      dueCount: dueList.length,
      mistakesCount: activeMistakes.length,
      weakestTopic: weakestTopic,
      unpracticedCount: unpracticed.length,
      estimatedMinutes: Math.max(2, Math.round(count * 0.9)),
      previewDue: targetDue,
      previewWeak: targetWeak,
      previewNew: targetNew
    };
  }

  function generateSmartSessionQuestions({ count = 20, selectedTopics = null }) {
    if (APP.questions.length === 0) return [];

    const activeTopics = selectedTopics || SMART_CONFIG.selectedTopics;
    const eligible = APP.questions.filter(q => activeTopics.has(q.t));
    if (eligible.length === 0) return [];

    const targetCount = Math.min(count, eligible.length);
    const selected = [];
    const usedIds = new Set();
    const now = new Date();

    function addBatch(candidates, maxToAdd) {
      const shuffled = [...candidates];
      shuffleArray(shuffled);
      let added = 0;
      for (let i = 0; i < shuffled.length; i++) {
        if (added >= maxToAdd || selected.length >= targetCount) break;
        const q = shuffled[i];
        if (!usedIds.has(q.id)) {
          selected.push(q);
          usedIds.add(q.id);
          added++;
        }
      }
    }

    // 1. Repasos vencidos según curva de olvido SM-2 (hasta 35%)
    const dueCandidates = eligible.filter(q => {
      const st = APP.learningState[q.id];
      return st && st.nextReviewDate && new Date(st.nextReviewDate) <= now;
    });
    addBatch(dueCandidates, Math.ceil(targetCount * 0.35));

    // 2. Errores acumulados en la pila (hasta 25%, aplicando regla anti-fatiga)
    const mistakeCandidates = eligible.filter(q => Boolean(APP.mistakesBank[q.id]) && !usedIds.has(q.id));
    addBatch(mistakeCandidates, Math.ceil(targetCount * 0.25));

    // 3. Tema más débil según analítica histórica (hasta 30%)
    const weakestTopic = getWeakestTopic(Array.from(activeTopics));
    const weakCandidates = eligible.filter(q => q.t === weakestTopic && !usedIds.has(q.id));
    addBatch(weakCandidates, Math.ceil(targetCount * 0.30));

    // 4. Preguntas nuevas o poco practicadas para expandir cobertura (hasta 30%)
    const newCandidates = eligible.filter(q => {
      const st = APP.learningState[q.id];
      return (!st || st.totalAttempts === 0) && !usedIds.has(q.id);
    });
    addBatch(newCandidates, Math.ceil(targetCount * 0.30));

    // 5. Consolidación y mantenimiento (repaso equilibrado)
    const consolidatingCandidates = eligible.filter(q => !usedIds.has(q.id));
    addBatch(consolidatingCandidates, targetCount - selected.length);

    // 6. Relleno final si fuera necesario
    if (selected.length < targetCount) {
      addBatch(eligible.filter(q => !usedIds.has(q.id)), targetCount - selected.length);
    }

    shuffleArray(selected);
    return selected;
  }

  function startSmartSession(customCount = null, customOptions = {}) {
    if (APP.questions.length === 0) {
      showToast('No hay preguntas en el banco de datos.', 'error');
      return;
    }

    const count = customCount || customOptions.count || SMART_CONFIG.count || 20;
    const mode = customOptions.mode || SMART_CONFIG.mode || 'tutor';
    const topics = customOptions.selectedTopics || SMART_CONFIG.selectedTopics;

    const questions = generateSmartSessionQuestions({ count, selectedTopics: topics });
    if (questions.length === 0) {
      showToast('No se encontraron preguntas para los temas seleccionados.', 'error');
      return;
    }

    const isTutorMode = mode === 'tutor';
    const timeLimitSec = isTutorMode ? 0 : Math.round(questions.length * 72);

    setupQuizSession({
      name: `Sesión Inteligente (${questions.length}Q · ${isTutorMode ? 'Modo Tutor' : 'Modo Simulacro'})`,
      questions: questions,
      isOfficial50: false,
      timeLimitSec: timeLimitSec,
      isTutorMode: isTutorMode
    });
  }

  function renderSmartSessionConfig() {
    const container = document.getElementById('smart-session-config-container');
    if (!container) return;

    const telemetry = getSmartSessionTelemetry(SMART_CONFIG.count, SMART_CONFIG.selectedTopics);
    const estMinutes = Math.max(2, Math.round(SMART_CONFIG.count * (SMART_CONFIG.mode === 'tutor' ? 1.0 : 0.8)));

    const topicKeys = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    const topicLabels = {
      T1: 'T1: Intro SSOO (46Q)',
      T2: 'T2: Procesos (131Q · 40%)',
      T3: 'T3: Memoria (35Q)',
      T4: 'T4: E/S y Ficheros (103Q · 32%)',
      T5: 'T5: Seguridad (25Q)',
      T6: 'T6: Distribuidos (18Q)'
    };

    let topicsHtml = `
      <button class="smart-topic-chip ${SMART_CONFIG.topicMode === 'all' ? 'active' : ''}" id="chip-topic-all">
        ★ Todos los Temas (Automático)
      </button>
    `;

    topicKeys.forEach(tKey => {
      const isSelected = SMART_CONFIG.topicMode === 'custom' && SMART_CONFIG.selectedTopics.has(tKey);
      topicsHtml += `
        <button class="smart-topic-chip ${isSelected ? 'active' : ''}" data-topic="${tKey}">
          ${topicLabels[tKey] || tKey}
        </button>
      `;
    });

    container.innerHTML = `
      <div class="smart-config-wrap">
        <div class="smart-card">
          <!-- Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div>
              <h2 style="font-size:1.35rem; font-weight:800; color:var(--text-pure); margin-bottom:4px;">
                Sesión Inteligente Adaptativa
              </h2>
              <p style="font-size:0.9rem; color:var(--text-muted); margin:0;">
                El motor algorítmico equilibra repasos vencidos, tus temas más débiles y preguntas no exploradas para maximizar la retención.
              </p>
            </div>
            <span class="mono" style="font-size:0.75rem; font-weight:700; color:var(--accent); background:var(--accent-subtle); border:1px solid var(--accent-border); padding:4px 12px; border-radius:var(--radius-pill);">
              Algoritmo de Aprendizaje Activo
            </span>
          </div>

          <!-- Section 1: Modo de Aprendizaje -->
          <div style="margin-top:20px;">
            <div class="smart-section-label">
              <span>Modo de Aprendizaje:</span>
            </div>
            <div class="smart-mode-grid">
              <div class="smart-mode-card ${SMART_CONFIG.mode === 'tutor' ? 'active' : ''}" id="card-mode-tutor">
                <div class="smart-mode-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <span>Modo Tutor Guiado</span>
                </div>
                <div class="smart-mode-desc">
                  Retroalimentación y explicación inmediata tras cada pregunta. Ideal para asimilar conceptos teóricos y mnemotecnia.
                </div>
              </div>

              <div class="smart-mode-card ${SMART_CONFIG.mode === 'exam' ? 'active' : ''}" id="card-mode-exam">
                <div class="smart-mode-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Modo Simulacro Evaluativo</span>
                </div>
                <div class="smart-mode-desc">
                  Evaluación continua con cronómetro sin interrupciones. Informe de resultados, netos y corrección al entregar.
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Tamaño de la Sesión -->
          <div>
            <div class="smart-section-label">
              <span>Volumen de Preguntas:</span>
            </div>
            <div class="smart-presets-grid">
              <div class="smart-preset-btn ${SMART_CONFIG.preset === '10' ? 'active' : ''}" data-preset="10">
                <div class="smart-preset-num">10</div>
                <div class="smart-preset-tag">Rápida · ~8 min</div>
              </div>
              <div class="smart-preset-btn ${SMART_CONFIG.preset === '20' ? 'active' : ''}" data-preset="20">
                <div class="smart-preset-num">20</div>
                <div class="smart-preset-tag">Estándar · ~18 min</div>
              </div>
              <div class="smart-preset-btn ${SMART_CONFIG.preset === '30' ? 'active' : ''}" data-preset="30">
                <div class="smart-preset-num">30</div>
                <div class="smart-preset-tag">Extensa · ~28 min</div>
              </div>
              <div class="smart-preset-btn ${SMART_CONFIG.preset === 'custom' ? 'active' : ''}" data-preset="custom">
                <div class="smart-preset-num">${SMART_CONFIG.preset === 'custom' ? SMART_CONFIG.count : '...'}</div>
                <div class="smart-preset-tag">Personalizada</div>
              </div>
            </div>

            ${SMART_CONFIG.preset === 'custom' ? `
              <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius); padding:14px 20px; margin-bottom:18px; display:flex; align-items:center; gap:16px;">
                <span class="mono" style="font-size:0.85rem; font-weight:700; color:var(--text-pure); min-width:80px;">${SMART_CONFIG.count} preguntas</span>
                <input type="range" id="smart-slider-custom" min="5" max="50" step="5" value="${SMART_CONFIG.count}" style="flex:1; cursor:pointer;">
                <span class="mono" style="font-size:0.78rem; color:var(--text-dim);">~${Math.round(SMART_CONFIG.count * 0.9)} min</span>
              </div>
            ` : ''}
          </div>

          <!-- Section 3: Selección Temática -->
          <div>
            <div class="smart-section-label">
              <span>Alcance Temático:</span>
            </div>
            <div class="smart-topics-wrap" id="smart-topics-container">
              ${topicsHtml}
            </div>
          </div>

          <!-- Section 4: Telemetría Predictiva del Algoritmo -->
          <div>
            <div class="smart-section-label">
              <span>Composición Predictiva del Lote:</span>
            </div>
            <div class="smart-preview-grid">
              <div class="smart-preview-card">
                <div class="smart-preview-val" style="color:var(--accent);">~${telemetry.previewDue}Q</div>
                <div class="smart-preview-lbl">Repasos Vencidos SM-2</div>
              </div>
              <div class="smart-preview-card">
                <div class="smart-preview-val" style="color:var(--err);">~${telemetry.previewWeak}Q</div>
                <div class="smart-preview-lbl">Tema Más Débil ([${telemetry.weakestTopic}])</div>
              </div>
              <div class="smart-preview-card">
                <div class="smart-preview-val" style="color:var(--warn);">~${telemetry.previewNew}Q</div>
                <div class="smart-preview-lbl">Nuevas (Ampliación)</div>
              </div>
              <div class="smart-preview-card">
                <div class="smart-preview-val mono">~${estMinutes} min</div>
                <div class="smart-preview-lbl">Tiempo Estimado</div>
              </div>
            </div>
          </div>

          <!-- Primary CTA Button -->
          <div>
            <button class="act-btn-pro primary" id="btn-launch-smart-active" style="width:100%; padding:14px 28px; font-size:1.05rem; justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Iniciar Sesión Inteligente (${SMART_CONFIG.count} Preguntas · ${SMART_CONFIG.mode === 'tutor' ? 'Modo Tutor' : 'Modo Simulacro'})
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind event handlers
    const cardTutor = document.getElementById('card-mode-tutor');
    const cardExam = document.getElementById('card-mode-exam');
    if (cardTutor) cardTutor.onclick = () => {
      AUDIO.playClick();
      SMART_CONFIG.mode = 'tutor';
      renderSmartSessionConfig();
    };
    if (cardExam) cardExam.onclick = () => {
      AUDIO.playClick();
      SMART_CONFIG.mode = 'exam';
      renderSmartSessionConfig();
    };

    const presetBtns = container.querySelectorAll('.smart-preset-btn');
    presetBtns.forEach(btn => {
      btn.onclick = () => {
        AUDIO.playClick();
        const p = btn.getAttribute('data-preset');
        SMART_CONFIG.preset = p;
        if (p === '10') SMART_CONFIG.count = 10;
        else if (p === '20') SMART_CONFIG.count = 20;
        else if (p === '30') SMART_CONFIG.count = 30;
        else if (p === 'custom' && SMART_CONFIG.count < 5) SMART_CONFIG.count = 25;
        renderSmartSessionConfig();
      };
    });

    const slider = document.getElementById('smart-slider-custom');
    if (slider) {
      slider.oninput = function () {
        SMART_CONFIG.count = parseInt(this.value, 10);
        renderSmartSessionConfig();
      };
    }

    const chipAll = document.getElementById('chip-topic-all');
    if (chipAll) chipAll.onclick = () => {
      AUDIO.playClick();
      SMART_CONFIG.topicMode = 'all';
      SMART_CONFIG.selectedTopics = new Set(['T1', 'T2', 'T3', 'T4', 'T5', 'T6']);
      renderSmartSessionConfig();
    };

    const topicChips = container.querySelectorAll('.smart-topic-chip[data-topic]');
    topicChips.forEach(chip => {
      chip.onclick = () => {
        AUDIO.playClick();
        const t = chip.getAttribute('data-topic');
        if (SMART_CONFIG.topicMode === 'all') {
          SMART_CONFIG.topicMode = 'custom';
          SMART_CONFIG.selectedTopics = new Set([t]);
        } else {
          if (SMART_CONFIG.selectedTopics.has(t)) {
            SMART_CONFIG.selectedTopics.delete(t);
            if (SMART_CONFIG.selectedTopics.size === 0) {
              SMART_CONFIG.topicMode = 'all';
              SMART_CONFIG.selectedTopics = new Set(['T1', 'T2', 'T3', 'T4', 'T5', 'T6']);
            }
          } else {
            SMART_CONFIG.selectedTopics.add(t);
            if (SMART_CONFIG.selectedTopics.size === 6) {
              SMART_CONFIG.topicMode = 'all';
            }
          }
        }
        renderSmartSessionConfig();
      };
    });

    const launchBtn = document.getElementById('btn-launch-smart-active');
    if (launchBtn) {
      launchBtn.onclick = () => {
        AUDIO.playClick();
        startSmartSession();
      };
    }
  }

  function startTopicQuiz(topicKey, count) {
    const matching = APP.questions.filter(q => q.t === topicKey);
    if (matching.length === 0) {
      showToast(`No hay preguntas del tema ${topicKey}`, 'error');
      return;
    }

    const n = Math.min(count, matching.length);
    const chosen = pickRandom(matching, n);

    setupQuizSession({
      name: `Entrenamiento: ${APP.topicMeta[topicKey]?.title || topicKey} (${n}Q)`,
      questions: chosen,
      isOfficial50: false,
      timeLimitSec: n * 75
    });
  }

  function startMistakesQuiz() {
    const mistakeIds = Object.keys(APP.mistakesBank);
    if (mistakeIds.length === 0) {
      showToast('¡No tienes fallos pendientes en el banco de repaso!', 'info');
      return;
    }

    const idSet = new Set(mistakeIds);
    const matching = APP.questions.filter(q => idSet.has(q.id));
    if (matching.length === 0) {
      showToast('No se encontraron preguntas de fallos en el banco.', 'info');
      return;
    }

    const chosen = [...matching];
    shuffleArray(chosen);

    setupQuizSession({
      name: `Repaso Intensivo de Fallos (${chosen.length}Q)`,
      questions: chosen,
      isOfficial50: false,
      timeLimitSec: chosen.length * 75
    });
  }

  function setupQuizSession(config) {
    stopQuizTimer();

    APP.activeQuiz = {
      name: config.name,
      questions: config.questions,
      totalQ: config.questions.length,
      currentIndex: 0,
      userAnswers: {}, // { [index]: 0 or 1 }
      flags: {}, // { [index]: boolean }
      tutorRevealed: {}, // { [index]: boolean }
      isTutorMode: !!config.isTutorMode,
      isOfficial50: !!config.isOfficial50,
      timeLimitSec: config.timeLimitSec !== undefined ? config.timeLimitSec : 3600,
      remainingSec: config.timeLimitSec !== undefined ? config.timeLimitSec : 3600,
      startTime: Date.now()
    };

    renderQuizHUD();
    renderQuizNavigator();
    renderCurrentQuestion();
    updateExamProgressBar();

    if (!config.isTutorMode || config.timeLimitSec > 0) {
      startQuizTimer();
    } else {
      const timerEl = document.getElementById('quiz-timer');
      if (timerEl) {
        timerEl.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <span>Modo Tutor</span>
        `;
      }
    }

    switchView('quiz');
    showToast(`Comenzando: ${config.name}`, 'info');
  }

  // ── Exam Progress Bar & Streak System ─────────────────────────────
  function updateExamProgressBar() {
    const quiz = APP.activeQuiz;
    if (!quiz) return;

    const answeredCount = Object.keys(quiz.userAnswers).length;
    const total = quiz.totalQ;
    const pct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    const countEl = document.getElementById('quiz-progress-count');
    const pctEl = document.getElementById('quiz-progress-pct');
    const barEl = document.getElementById('quiz-progress-fill');
    const streakPill = document.getElementById('quiz-streak-pill');
    const streakCount = document.getElementById('quiz-streak-count');

    if (countEl) countEl.textContent = `${answeredCount} de ${total} preguntas`;
    if (pctEl) pctEl.textContent = `${pct}% completado`;
    if (barEl) barEl.style.width = `${pct}%`;

    // Calculate answered streak
    let streak = 0;
    for (let i = 0; i <= quiz.currentIndex; i++) {
      if (quiz.userAnswers[i] !== undefined) {
        streak++;
      } else {
        streak = 0;
      }
    }

    if (streakPill && streakCount) {
      if (streak >= 3) {
        streakPill.style.display = 'inline-flex';
        streakCount.textContent = streak;
      } else {
        streakPill.style.display = 'none';
      }
    }
  }

  // ── Quiz Timer ────────────────────────────────────────────────────
  function startQuizTimer() {
    const timerBadge = document.getElementById('quiz-timer');
    if (!timerBadge) return;

    updateTimerDisplay(timerBadge);

    APP.timerHandle = setInterval(function () {
      if (!APP.activeQuiz) {
        stopQuizTimer();
        return;
      }
      APP.activeQuiz.remainingSec--;
      updateTimerDisplay(timerBadge);

      if (APP.activeQuiz.remainingSec <= 0) {
        stopQuizTimer();
        showToast('¡Tiempo finalizado! Entregando examen...', 'error');
        finishQuiz();
      }
    }, 1000);
  }

  function stopQuizTimer() {
    if (APP.timerHandle) {
      clearInterval(APP.timerHandle);
      APP.timerHandle = null;
    }
  }

  function updateTimerDisplay(el) {
    if (!APP.activeQuiz) return;
    const s = Math.max(0, APP.activeQuiz.remainingSec);
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    el.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <span>${str}</span>
    `;

    if (s <= 300) { // under 5 minutes
      el.classList.add('urgent');
    } else {
      el.classList.remove('urgent');
    }
  }

  // ── Quiz Canvas Renderers ─────────────────────────────────────────
  function renderQuizHUD() {
    const q = APP.activeQuiz;
    if (!q) return;

    const titleEl = document.getElementById('quiz-hud-title');
    if (titleEl) {
      titleEl.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span>${escapeHtml(q.name)}</span>
      `;
    }
  }

  function renderQuizNavigator() {
    const navStrip = document.getElementById('quiz-navigator');
    if (!navStrip || !APP.activeQuiz) return;

    let html = '';
    const q = APP.activeQuiz;

    for (let i = 0; i < q.totalQ; i++) {
      const isCurrent = i === q.currentIndex;
      const isAnswered = q.userAnswers[i] !== undefined;
      const isFlagged = !!q.flags[i];

      let classes = ['nav-grid-pill', 'mono'];
      if (isCurrent) classes.push('current');
      if (isAnswered) classes.push('answered');
      if (isFlagged) classes.push('flagged');

      html += `<button class="${classes.join(' ')}" data-index="${i}" title="Pregunta ${i + 1}">${i + 1}</button>`;
    }

    navStrip.innerHTML = html;

    // Attach click listeners to pills
    const pills = navStrip.querySelectorAll('.nav-grid-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-index'), 10);
        goToQuestion(idx);
      });
    });
  }

  function renderCurrentQuestion() {
    const quiz = APP.activeQuiz;
    if (!quiz) return;

    const idx = quiz.currentIndex;
    const currentQ = quiz.questions[idx];
    if (!currentQ) return;

    // Update Counter badge
    const counterEl = document.getElementById('quiz-q-counter');
    if (counterEl) {
      counterEl.textContent = `PREGUNTA ${idx + 1} DE ${quiz.totalQ}`;
    }

    // Update Topic badge
    const topicBadge = document.getElementById('quiz-topic-badge');
    if (topicBadge) {
      const topKey = currentQ.t || 'T1';
      const meta = APP.topicMeta[topKey] || { color: '#8CB1F7', title: topKey };
      topicBadge.textContent = `[${topKey}] ${meta.title}`;
      topicBadge.style.color = meta.color;
      topicBadge.style.borderColor = `${meta.color}60`;
    }

    // Source badge
    const sourceBadge = document.getElementById('quiz-source-badge');
    if (sourceBadge) {
      sourceBadge.textContent = currentQ.source || 'Banco Oficial ISO';
    }

    // Stem text with smooth slide animation
    const stemEl = document.getElementById('quiz-stem-text');
    if (stemEl) {
      stemEl.textContent = currentQ.q;
      stemEl.classList.remove('q-anim-slide');
      void stemEl.offsetWidth;
      stemEl.classList.add('q-anim-slide');
    }

    // Options container with smooth slide animation
    const optionsContainer = document.getElementById('quiz-options-container');
    if (optionsContainer) {
      const isRevealedInTutor = quiz.isTutorMode && quiz.tutorRevealed && quiz.tutorRevealed[idx];
      const userSelected = quiz.userAnswers[idx];
      const isCorrect = userSelected === currentQ.ans;
      const opts = currentQ.opts || ['Verdadero', 'Falso'];
      let html = '';

      opts.forEach(function (optText, optIdx) {
        let tileClass = 'opt-tile';
        if (isRevealedInTutor) {
          tileClass += ' disabled';
          if (optIdx === currentQ.ans) {
            tileClass += ' is-tutor-correct';
          } else if (userSelected === optIdx) {
            tileClass += ' is-tutor-wrong';
          }
        } else if (userSelected === optIdx) {
          tileClass += ' selected';
        }

        const keyLetter = optIdx === 0 ? 'A' : 'B';
        const displayLetter = isRevealedInTutor && optIdx === currentQ.ans ? '✓' : (isRevealedInTutor && userSelected === optIdx && !isCorrect ? '✗' : keyLetter);

        html += `
          <div class="${tileClass}" data-opt-idx="${optIdx}" tabindex="0" role="button" aria-pressed="${userSelected === optIdx}">
            <div class="opt-key-badge mono">${displayLetter}</div>
            <div class="opt-body-text">${escapeHtml(optText)}</div>
          </div>
        `;
      });

      if (isRevealedInTutor) {
        html += `
          <div class="tutor-feedback-box ${isCorrect ? 'correct' : 'wrong'}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
              <div style="font-weight:800; font-size:1.05rem; color:${isCorrect ? 'var(--ok)' : 'var(--err)'}; display:flex; align-items:center; gap:6px;">
                <span>${isCorrect ? '✓ ¡Respuesta Correcta!' : '✗ Respuesta Incorrecta (-1.0 ptos)'}</span>
              </div>
              <span class="mono" style="font-size:0.75rem; color:var(--text-dim);">Registrado en Telemetría y SM-2</span>
            </div>
            ${currentQ.ex ? `<div style="font-size:0.96rem; color:var(--text-pure); line-height:1.55; margin-bottom:14px;"><strong>Explicación Oficial:</strong> ${escapeHtml(currentQ.ex)}</div>` : ''}
            <div style="display:flex; justify-content:flex-end; gap:10px;">
              ${idx < quiz.totalQ - 1 ? `
                <button class="act-btn-pro primary" id="btn-tutor-next" style="padding:10px 22px;">
                  Siguiente Pregunta →
                </button>
              ` : `
                <button class="act-btn-pro primary" id="btn-tutor-finish" style="padding:10px 22px;">
                  Finalizar y Ver Resultados
                </button>
              `}
            </div>
          </div>
        `;
      }

      optionsContainer.innerHTML = html;
      optionsContainer.classList.remove('q-anim-slide');
      void optionsContainer.offsetWidth;
      optionsContainer.classList.add('q-anim-slide');

      // Click listeners on option cards
      if (!isRevealedInTutor) {
        const tiles = optionsContainer.querySelectorAll('.opt-tile');
        tiles.forEach(function (tile) {
          tile.addEventListener('click', function () {
            const optIndex = parseInt(this.getAttribute('data-opt-idx'), 10);
            selectOption(optIndex);
          });
        });
      } else {
        const btnNextQ = optionsContainer.querySelector('#btn-tutor-next');
        if (btnNextQ) {
          btnNextQ.onclick = () => {
            goToQuestion(idx + 1);
          };
        }
        const btnFinishQ = optionsContainer.querySelector('#btn-tutor-finish');
        if (btnFinishQ) {
          btnFinishQ.onclick = () => {
            finishQuiz();
          };
        }
      }
    }

    // Update Previous / Next button states
    const btnPrev = document.getElementById('btn-quiz-prev');
    const btnNext = document.getElementById('btn-quiz-next');
    if (btnPrev) btnPrev.disabled = idx === 0;
    if (btnNext) btnNext.disabled = idx === quiz.totalQ - 1;

    // Update Flag button state
    const btnFlag = document.getElementById('btn-quiz-flag');
    if (btnFlag) {
      if (quiz.flags[idx]) {
        btnFlag.classList.add('active');
        btnFlag.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Marcada`;
      } else {
        btnFlag.classList.remove('active');
        btnFlag.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Marcar para Revisar`;
      }
    }

    // Update navigator pills active highlight
    updateNavigatorHighlights();
    updateExamProgressBar();
  }

  function updateNavigatorHighlights() {
    const navStrip = document.getElementById('quiz-navigator');
    if (!navStrip || !APP.activeQuiz) return;

    const quiz = APP.activeQuiz;
    const pills = navStrip.querySelectorAll('.nav-grid-pill');
    pills.forEach(function (pill, i) {
      const isCurrent = i === quiz.currentIndex;
      const isAnswered = quiz.userAnswers[i] !== undefined;
      const isFlagged = !!quiz.flags[i];

      pill.classList.toggle('current', isCurrent);
      pill.classList.toggle('answered', isAnswered);
      pill.classList.toggle('flagged', isFlagged);

      if (quiz.isTutorMode && quiz.tutorRevealed && quiz.tutorRevealed[i]) {
        const qItem = quiz.questions[i];
        const isCorr = quiz.userAnswers[i] === qItem.ans;
        pill.classList.toggle('answered-correct', isCorr);
        pill.classList.toggle('answered-wrong', !isCorr);
      }
    });
  }

  function goToQuestion(newIndex) {
    if (!APP.activeQuiz) return;
    if (newIndex >= 0 && newIndex < APP.activeQuiz.totalQ) {
      AUDIO.playWhoosh();
      APP.activeQuiz.currentIndex = newIndex;
      renderCurrentQuestion();
    }
  }

  function selectOption(optIndex) {
    if (!APP.activeQuiz) return;
    const idx = APP.activeQuiz.currentIndex;
    const currentQ = APP.activeQuiz.questions[idx];

    // Tutor Mode Handling
    if (APP.activeQuiz.isTutorMode) {
      if (APP.activeQuiz.tutorRevealed && APP.activeQuiz.tutorRevealed[idx]) {
        return; // Already revealed in tutor mode
      }

      APP.activeQuiz.userAnswers[idx] = optIndex;
      if (!APP.activeQuiz.tutorRevealed) APP.activeQuiz.tutorRevealed = {};
      APP.activeQuiz.tutorRevealed[idx] = true;

      const isCorrect = optIndex === currentQ.ans;
      if (isCorrect) {
        AUDIO.playSuccess();
      } else {
        AUDIO.playAlert();
      }

      LEARNING_ENGINE.recordAttempt({
        questionId: currentQ.id,
        isCorrect: isCorrect,
        userAnswer: optIndex,
        context: 'smart_tutor'
      });

      renderCurrentQuestion();
      return;
    }

    AUDIO.playSelect();

    // If already selected, clicking it again unselects it (leaves in blank)
    if (APP.activeQuiz.userAnswers[idx] === optIndex) {
      delete APP.activeQuiz.userAnswers[idx];
      showToast('Respuesta desmarcada (En blanco: 0 ptos)', 'info');
    } else {
      APP.activeQuiz.userAnswers[idx] = optIndex;
    }

    renderCurrentQuestion();
  }

  function clearCurrentAnswer() {
    if (!APP.activeQuiz) return;
    const idx = APP.activeQuiz.currentIndex;
    if (APP.activeQuiz.userAnswers[idx] !== undefined) {
      AUDIO.playClick();
      delete APP.activeQuiz.userAnswers[idx];
      renderCurrentQuestion();
      showToast('Respuesta desmarcada (En blanco: 0 ptos)', 'info');
    }
  }

  function toggleFlagCurrent() {
    if (!APP.activeQuiz) return;
    AUDIO.playClick();
    const idx = APP.activeQuiz.currentIndex;
    APP.activeQuiz.flags[idx] = !APP.activeQuiz.flags[idx];
    renderCurrentQuestion();
  }

  // ── Keyboard Shortcuts ────────────────────────────────────────────
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', function (e) {
      // Don't intercept if focus is inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      // Quiz mode keyboard handling
      if (APP.currentView === 'quiz' && APP.activeQuiz) {
        if (APP.activeQuiz.isTutorMode && APP.activeQuiz.tutorRevealed && APP.activeQuiz.tutorRevealed[APP.activeQuiz.currentIndex]) {
          if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (APP.activeQuiz.currentIndex < APP.activeQuiz.totalQ - 1) {
              goToQuestion(APP.activeQuiz.currentIndex + 1);
            } else {
              finishQuiz();
            }
            return;
          }
        }

        if (e.key === '1' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          selectOption(0);
        } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          selectOption(1);
        } else if (e.key === '0' || e.key === 'd' || e.key === 'D' || e.key === ' ') {
          e.preventDefault();
          clearCurrentAnswer();
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          toggleFlagCurrent();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToQuestion(APP.activeQuiz.currentIndex + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToQuestion(APP.activeQuiz.currentIndex - 1);
        }
        return;
      }

      // Spaced Review Player keyboard handling
      if (APP.currentView === 'review' && APP.activeReviewSession) {
        if (!APP.activeReviewSession.isRevealed) {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            revealSpacedReviewAnswer();
          }
        } else {
          if (e.key === '1') {
            e.preventDefault();
            rateSpacedQuestion('fail');
          } else if (e.key === '2') {
            e.preventDefault();
            rateSpacedQuestion('hard');
          } else if (e.key === '3') {
            e.preventDefault();
            rateSpacedQuestion('easy');
          }
        }
        return;
      }

      // Doubt Stack keyboard handling
      if (APP.currentView === 'review') {
        const doubtCard = document.getElementById('doubt-top-card');
        if (doubtCard) {
          if (e.key === 'Enter' || e.key === 'y' || e.key === 'Y' || e.key === 't' || e.key === 'T') {
            e.preventDefault();
            const btnTick = document.getElementById('btn-doubt-tick');
            if (btnTick) btnTick.click();
          } else if (e.key === 'n' || e.key === 'N' || e.key === 'e' || e.key === 'E') {
            e.preventDefault();
            const btnNo = document.getElementById('btn-doubt-no-explain');
            if (btnNo) btnNo.click();
          } else if (e.key === ' ') {
            e.preventDefault();
            const acc = document.getElementById('doubt-accordion');
            if (acc) acc.open = !acc.open;
          }
        }
      }
    });
  }

  // ── Finishing and Grading Quiz ────────────────────────────────────
  function finishQuiz() {
    if (!APP.activeQuiz) return;

    // Check how many unanswered
    const totalQ = APP.activeQuiz.totalQ;
    const answeredCount = Object.keys(APP.activeQuiz.userAnswers).length;
    const blankCount = totalQ - answeredCount;

    if (blankCount > 0 && APP.activeQuiz.remainingSec > 0) {
      const confirmed = confirm(
        `Tienes ${blankCount} preguntas en blanco (no contestadas). Recuerda que no restan puntos netos. ¿Deseas entregar el examen ahora?`
      );
      if (!confirmed) return;
    }

    stopQuizTimer();

    const quiz = APP.activeQuiz;
    const timeSpent = quiz.timeLimitSec - quiz.remainingSec;

    let correctCount = 0;
    let wrongCount = 0;

    const topicBreakdown = {};

    quiz.questions.forEach(function (q, idx) {
      const topKey = q.t || 'T1';
      if (!topicBreakdown[topKey]) {
        topicBreakdown[topKey] = { correct: 0, wrong: 0, blank: 0, total: 0 };
      }
      topicBreakdown[topKey].total++;

      const userAns = quiz.userAnswers[idx];
      const timePerQ = Math.round((timeSpent * 1000) / totalQ);

      if (userAns === undefined) {
        topicBreakdown[topKey].blank++;
      } else if (userAns === q.ans) {
        correctCount++;
        topicBreakdown[topKey].correct++;
        if (APP.mistakesBank[q.id]) {
          delete APP.mistakesBank[q.id];
        }
        LEARNING_ENGINE.recordAttempt({
          questionId: q.id,
          isCorrect: true,
          userAnswer: userAns,
          confidence: null,
          context: quiz.isOfficial50 ? 'official_exam' : 'quiz',
          timeSpentMs: timePerQ
        });
      } else {
        wrongCount++;
        topicBreakdown[topKey].wrong++;
        LEARNING_ENGINE.recordAttempt({
          questionId: q.id,
          isCorrect: false,
          userAnswer: userAns,
          confidence: null,
          context: quiz.isOfficial50 ? 'official_exam' : 'quiz',
          timeSpentMs: timePerQ
        });
      }
    });

    // UMU Official Grading Formula:
    // Net Points = Correct - Wrong (1 mal resta 1 bien!)
    const netPoints = correctCount - wrongCount;

    // Score on 0-10 scale
    let score = 0;
    let passed = false;

    if (quiz.isOfficial50 || totalQ === 50) {
      // Official UMU Cutoff: 16 net points = 5.0 (Aprobado)
      if (netPoints >= 16) {
        // Linear scaling from 16 net (5.0) to 50 net (10.0)
        score = 5.0 + ((netPoints - 16) / (50 - 16)) * 5.0;
        passed = true;
      } else if (netPoints > 0) {
        // Scaled below cutoff: 0 to 16 net maps to 0 to 4.99
        score = (netPoints / 16) * 5.0;
        passed = false;
      } else {
        score = 0.0;
        passed = false;
      }
    } else {
      // Standard negative marking for shorter tests: Net / Total * 10
      score = Math.max(0, (netPoints / totalQ) * 10);
      passed = score >= 5.0;
    }

    score = Math.min(10.0, Math.max(0, score));

    // Construct Result Record
    const resultRecord = {
      id: 'test_' + Date.now(),
      date: new Date().toISOString(),
      name: quiz.name,
      totalQ: totalQ,
      correct: correctCount,
      wrong: wrongCount,
      blank: totalQ - (correctCount + wrongCount),
      net: parseFloat(netPoints.toFixed(2)),
      score: parseFloat(score.toFixed(2)),
      passed: passed,
      timeSpentSec: timeSpent,
      questions: quiz.questions,
      userAnswers: quiz.userAnswers,
      topicStats: topicBreakdown
    };

    // Save history
    APP.testHistory.push(resultRecord);
    APP.lastResult = resultRecord;
    savePersistentStorage();
    updateGlobalHeaderStats();

    APP.activeQuiz = null;

    // Transition to results screen
    displayResultsScreen(resultRecord);
  }

  // ── Results Screen ────────────────────────────────────────────────
  function displayResultsScreen(result) {
    switchView('results');

    const scoreVal = Number(result.score);

    // Score display with count-up animation
    const scoreNumEl = document.getElementById('res-score-num');
    if (scoreNumEl) {
      animateScore(0, scoreVal, scoreNumEl);
    }

    // Circular Animated Gauge Ring
    const ringBar = document.getElementById('score-ring-bar');
    const maxCircumference = 427.26; // 2 * PI * 68
    if (ringBar) {
      ringBar.style.strokeDasharray = `${maxCircumference}`;
      ringBar.style.strokeDashoffset = `${maxCircumference}`;
      ringBar.classList.toggle('fail', !result.passed);
      setTimeout(() => {
        const targetOffset = maxCircumference - (Math.min(10, Math.max(0, scoreVal)) / 10.0) * maxCircumference;
        ringBar.style.strokeDashoffset = `${targetOffset}`;
      }, 100);
    }

    // Celebratory Ribbon Badge
    const celebBadge = document.getElementById('res-celeb-badge');
    if (celebBadge) {
      celebBadge.style.display = 'inline-flex';
      if (scoreVal >= 9.0) {
        celebBadge.className = 'results-celeb-badge pass';
        celebBadge.innerHTML = '🌟 SOBRESALIENTE — ¡DOMINIO TOTAL!';
      } else if (scoreVal >= 7.0) {
        celebBadge.className = 'results-celeb-badge pass';
        celebBadge.innerHTML = '✨ NOTABLE — ¡GRAN RESULTADO!';
      } else if (result.passed) {
        celebBadge.className = 'results-celeb-badge pass';
        celebBadge.innerHTML = '🎉 ¡ENHORABUENA! EXAMEN APROBADO';
      } else {
        celebBadge.className = 'results-celeb-badge fail';
        const needed = Math.max(0, 16 - result.net);
        celebBadge.innerHTML = `⚡ A ${needed} PUNTOS NETOS DE APROBAR`;
      }
    }

    // Celebration Confetti & Audio Feedback
    if (result.passed) {
      AUDIO.playFanfare();
      CONFETTI.launch();
    } else {
      AUDIO.playAlert();
    }

    // Status subtitle
    const statusSubEl = document.getElementById('res-status-sub');
    if (statusSubEl) {
      if (result.passed) {
        statusSubEl.innerHTML = `
          <span style="color:var(--ok); font-weight:800;">APROBADO</span> — Puntuación Neta: 
          <strong>${result.net}</strong> (≥ 16 netos para aprobar).
        `;
      } else {
        statusSubEl.innerHTML = `
          <span style="color:var(--err); font-weight:800;">SUSPENSO</span> — Puntuación Neta: 
          <strong>${result.net}</strong> (≥ 16 netos para aprobar).
        `;
      }
    }

    // Metric boxes
    const valCorrect = document.getElementById('res-val-correct');
    const valWrong = document.getElementById('res-val-wrong');
    const valBlank = document.getElementById('res-val-blank');
    const valNet = document.getElementById('res-val-net');
    const valTime = document.getElementById('res-val-time');

    if (valCorrect) valCorrect.textContent = `+${result.correct}`;
    if (valWrong) valWrong.textContent = `-${result.wrong}`;
    if (valBlank) valBlank.textContent = `${result.blank}`;
    if (valNet) valNet.textContent = `${result.net >= 0 ? '+' : ''}${result.net}`;
    if (valTime) {
      const mins = Math.floor(result.timeSpentSec / 60);
      const secs = result.timeSpentSec % 60;
      valTime.textContent = `${mins}m ${secs}s`;
    }

    // Setup review filters
    APP.activeReviewFilter = 'all';
    setupReviewFilterButtons(result);
    renderReviewList(result, 'all');
  }

  function animateScore(start, target, element) {
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * ease;
      element.textContent = current.toFixed(2);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toFixed(2);
      }
    }

    requestAnimationFrame(update);
  }

  function setupReviewFilterButtons(result) {
    const filterContainer = document.getElementById('res-filter-bar');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
      <button class="filter-btn-item active" data-filter="all">Todas (${result.totalQ})</button>
      <button class="filter-btn-item" data-filter="wrong">Solo Fallos (${result.wrong})</button>
      <button class="filter-btn-item" data-filter="correct">Aciertos (${result.correct})</button>
      <button class="filter-btn-item" data-filter="blank">En Blanco (${result.blank})</button>
    `;

    const btns = filterContainer.querySelectorAll('.filter-btn-item');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        APP.activeReviewFilter = filter;
        renderReviewList(result, filter);
      });
    });
  }

  function renderReviewList(result, filter) {
    const listContainer = document.getElementById('res-review-container');
    if (!listContainer) return;

    let html = '';

    result.questions.forEach(function (q, idx) {
      const userAns = result.userAnswers[idx];
      const isBlank = userAns === undefined;
      const isCorrect = !isBlank && userAns === q.ans;
      const isMistake = !isBlank && userAns !== q.ans;

      if (filter === 'wrong' && !isMistake) return;
      if (filter === 'correct' && !isCorrect) return;
      if (filter === 'blank' && !isBlank) return;

      let cardClass = 'review-item-card ';
      let statusBadge = '';

      if (isCorrect) {
        cardClass += 'is-correct';
        statusBadge = `<span class="mono" style="color:var(--ok); font-weight:800; font-size:0.75rem; background:var(--ok-bg); padding:3px 8px; border-radius:4px; border:1px solid var(--ok-border);">+1.0 ACIERTO</span>`;
      } else if (isMistake) {
        cardClass += 'is-mistake';
        statusBadge = `<span class="mono" style="color:var(--err); font-weight:800; font-size:0.75rem; background:var(--err-bg); padding:3px 8px; border-radius:4px; border:1px solid var(--err-border);">-1.0 FALLO</span>`;
      } else {
        cardClass += 'is-blank';
        statusBadge = `<span class="mono" style="color:var(--text-dim); font-weight:800; font-size:0.75rem; background:rgba(255,255,255,0.06); padding:3px 8px; border-radius:4px; border:1px solid var(--border);">0.0 EN BLANCO</span>`;
      }

      const topKey = q.t || 'T1';
      const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };

      html += `
        <div class="${cardClass}">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mono" style="font-weight:800; color:var(--text-dim); font-size:0.82rem;">#${idx + 1}</span>
              <span class="topic-tag mono" style="background:rgba(255,255,255,0.06); color:${meta.color}; border:1px solid ${meta.color}40;">${topKey}</span>
              <span class="mono" style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(q.source || '')}</span>
            </div>
            ${statusBadge}
          </div>

          <div style="font-size:1.05rem; font-weight:700; color:var(--text-pure); line-height:1.55; margin-bottom:16px;">
            ${escapeHtml(q.q)}
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
      `;

      const opts = q.opts || ['Verdadero', 'Falso'];
      opts.forEach(function (optText, optIdx) {
        const isOfficialCorrect = optIdx === q.ans;
        const isUserChoice = userAns === optIdx;

        let optStyle = 'background:var(--surface-raised); border:1px solid var(--border);';
        let marker = '';

        if (isOfficialCorrect) {
          optStyle = 'background:var(--ok-bg); border:1.5px solid var(--ok-border); color:var(--text-pure); font-weight:700;';
          marker = `<span class="mono" style="color:var(--ok); font-size:0.78rem; font-weight:800; margin-left:auto;">[CORRECTA OFICIAL]</span>`;
        } else if (isUserChoice && !isCorrect) {
          optStyle = 'background:var(--err-bg); border:1.5px solid var(--err-border); color:var(--text-pure); font-weight:700;';
          marker = `<span class="mono" style="color:var(--err); font-size:0.78rem; font-weight:800; margin-left:auto;">[TU RESPUESTA (FALLO)]</span>`;
        }

        html += `
          <div style="padding:10px 14px; border-radius:6px; display:flex; align-items:center; gap:12px; font-size:0.92rem; ${optStyle}">
            <span class="mono" style="font-weight:800; width:24px; height:24px; display:flex; align-items:center; justify-content:center; border-radius:4px; background:rgba(0,0,0,0.3);">${optIdx === 0 ? 'A' : 'B'}</span>
            <span style="flex:1;">${escapeHtml(optText)}</span>
            ${marker}
          </div>
        `;
      });

      html += `</div>`;

      if (q.ex) {
        html += `
          <div style="background:var(--surface-raised); border-left:3px solid var(--accent); padding:12px 16px; border-radius:4px; font-size:0.86rem; line-height:1.55; color:var(--text-muted);">
            <strong style="color:var(--accent); font-family:'IBM Plex Mono', monospace; font-size:0.78rem; text-transform:uppercase; display:block; margin-bottom:4px;">Explicación y Justificación:</strong>
            ${escapeHtml(q.ex)}
          </div>
        `;
      }

      html += `</div>`;
    });

    listContainer.innerHTML = html;
  }

  // ── Extended Pedagogical Explanation Generator ───────────────────
  function generateExtendedExplanation(q) {
    const topKey = q.t || 'T1';
    const ansIndex = typeof q.ans === 'number' ? q.ans : (typeof q.a === 'number' ? q.a : 0);
    const opts = Array.isArray(q.opts) && q.opts.length === 2 ? q.opts : ['Opción A', 'Opción B'];
    const correctOptText = opts[ansIndex] || opts[0] || 'Opción Correcta';
    const wrongOptText = opts[ansIndex === 0 ? 1 : 0] || opts[1] || 'Opción Incorrecta';
    const explanationText = q.ex || q.explanation || '';
    const qLower = (q.q + ' ' + explanationText).toLowerCase();

    let conceptTitle = 'Fundamento Teórico';
    let conceptDesc = '';
    let trapTitle = '¿Por qué la otra opción es la trampa del examen?';
    let trapDesc = '';
    let exampleTitle = 'Ejemplo Práctico en UNIX / Código C';
    let codeSnippet = '';
    let mnemonicRule = '';

    if (qLower.includes('fork') || qLower.includes('exec') || qLower.includes('hijo') || qLower.includes('padre')) {
      conceptTitle = 'Clonación de Procesos vs Reemplazo de Imagen';
      conceptDesc = 'En UNIX, la creación de procesos es un mecanismo en dos fases: <strong>fork()</strong> clona el proceso actual creando un duplicado casi exacto (con un nuevo PID), mientras que <strong>exec()</strong> (o sus variantes execl, execv) reemplaza el espacio de memoria del proceso por un programa completamente nuevo sin cambiar el PID.';
      trapTitle = 'La Confusión Típica: ¿Quién devuelve qué?';
      trapDesc = `La opción incorrecta ("${escapeHtml(wrongOptText)}") aprovecha que muchos estudiantes confunden el valor de retorno de fork(). Recuerda que fork() devuelve <strong>0 al proceso hijo</strong> y el <strong>PID del nuevo hijo al padre</strong> (o -1 si hay error). Si exec() tiene éxito, nunca devuelve nada porque su código fue sustituido.`;
      exampleTitle = 'Snippet Clásico en C (fork + wait)';
      codeSnippet = `pid_t pid = fork();
if (pid == 0) {
    // Proceso HIJO: fork() devuelve 0
    printf("Soy el HIJO (PID: %d). Ejecuto código nuevo con exec()...\n", getpid());
    execlp("/bin/ls", "ls", "-l", NULL);
} else if (pid > 0) {
    // Proceso PADRE: fork() devuelve el PID del hijo
    printf("Soy el PADRE (PID: %d), esperando a mi hijo (PID: %d)...\n", getpid(), pid);
    wait(NULL); // Espera síncrona
}`;
      mnemonicRule = 'FORK = Bifurcación (2 procesos idénticos). EXEC = Transformación (1 proceso que cambia de vestimenta).';
    } else if (qLower.includes('hilo') || qLower.includes('thread') || qLower.includes('ult') || qLower.includes('klt')) {
      conceptTitle = 'Hilos de Usuario (ULT) vs Hilos de Núcleo (KLT)';
      conceptDesc = 'Los hilos a nivel de usuario (User-Level Threads) son gestionados enteramente por una biblioteca en espacio de usuario sin que el kernel del SO sepa de su existencia. Los hilos a nivel de kernel (Kernel-Level Threads) son entidades gestionadas y planificadas por el propio SO.';
      trapTitle = 'El Bloqueo en E/S: La trampa de oro del examen';
      trapDesc = `La trampa habitual ("${escapeHtml(wrongOptText)}") ignora qué ve el kernel. En ULT, si un hilo realiza una llamada al sistema bloqueante (como read()), el kernel bloquea al PROCESO COMPLETO, porque para el SO solo hay 1 hilo. En KLT, si un hilo se bloquea, el SO puede continuar ejecutando otros hilos del mismo proceso.`;
      exampleTitle = 'Diferencia Práctica en Arquitectura';
      codeSnippet = `// ULT (Pthreads en modo usuario puro):
// Proceso A [ Hilo 1 (hace read() bloqueante) ] -> ¡TODO EL PROCESO A SE DETIENE!

// KLT (NPTL moderno en Linux):
// Kernel [ PCB Proceso A -> TCB Hilo 1 (bloqueado) | TCB Hilo 2 (EJECUTANDO EN CPU) ]`;
      mnemonicRule = 'ULT = El Kernel es ciego (1 bloqueo = todos bloqueados). KLT = El Kernel lo ve todo (concurrencia real).';
    } else if (qLower.includes('semáforo') || qLower.includes('semaforo') || qLower.includes('mutex') || qLower.includes('seccion critica') || qLower.includes('sección crítica')) {
      conceptTitle = 'Mecanismos de Sincronización y Exclusión Mutua';
      conceptDesc = 'Un semáforo es una variable entera atómica con dos operaciones indivisibles: wait() (o P), que decrementa el contador y bloquea si el valor resultante es menor que 0; y signal() (o V), que incrementa el contador y despierta a un proceso en espera.';
      trapTitle = 'El Orden de las Operaciones y el Bloqueo Mutuo (Deadlock)';
      trapDesc = `En preguntas de sincronización ("${escapeHtml(wrongOptText)}"), la trampa suele estar en el orden de las operaciones wait(). Un intercambio descuidado de semáforos puede provocar interbloqueo o permitir que dos procesos entren a la vez a la sección crítica violando la exclusión mutua.`;
      exampleTitle = 'Patrón de Exclusión Mutua con Semáforo Binario';
      codeSnippet = `sem_t mutex;
sem_init(&mutex, 0, 1); // Inicializado a 1

sem_wait(&mutex); // Entrar a Sección Crítica (decrementa a 0)
// --- SECCIÓN CRÍTICA (Acceso a variable compartida) ---
sem_post(&mutex); // Salir de Sección Crítica (incrementa a 1)`;
      mnemonicRule = 'Wait (P) = Prohibir/Pedir llave (resta). Signal (V) = Volver/Devolver llave (suma).';
    } else if (qLower.includes('memoria') || qLower.includes('página') || qLower.includes('pagina') || qLower.includes('tlb') || qLower.includes('segment')) {
      conceptTitle = 'Jerarquía de Memoria y Traducción de Direcciones';
      conceptDesc = 'La paginación divide el espacio lógico en páginas de tamaño fijo y la memoria física en marcos (frames). La traducción la realiza la MMU con ayuda de la TLB (Translation Lookaside Buffer). Si una página referenciada no está en RAM (bit de presencia = 0), la MMU genera una excepción hardware de Fallo de Página.';
      trapTitle = 'Fragmentación Interna vs Externa';
      trapDesc = `La opción incorrecta ("${escapeHtml(wrongOptText)}") suele intercambiar los tipos de fragmentación. La paginación sufre ÚNICAMENTE de fragmentación interna (en la última página de cada proceso). La segmentación sufre de fragmentación externa (huecos variables entre segmentos).`;
      exampleTitle = 'Estructura de la Dirección Lógica';
      codeSnippet = `// Dirección virtual de 32 bits con páginas de 4 KB (2^12 bytes):
// [ Número de Página Virtual: 20 bits ] [ Desplazamiento (Offset): 12 bits ]
// 1. Busca en TLB -> Si acierto, obtiene marco físico en 1 ciclo.
// 2. Si fallo en TLB -> Consulta tabla de páginas multinivel en RAM.
// 3. Si bit_validez == 0 -> TRAP: Fallo de Página (el SO carga desde disco swap).`;
      mnemonicRule = 'Página = Tamaño FIJO (Frag. INTERNA). Segmento = Tamaño VARIABLE (Frag. EXTERNA).';
    } else if (qLower.includes('inodo') || qLower.includes('fichero') || qLower.includes('archivo') || qLower.includes('directorio') || qLower.includes('descriptor') || qLower.includes('pipe') || qLower.includes('tubería')) {
      conceptTitle = 'Estructura de Ficheros UNIX y Descriptores';
      conceptDesc = 'En sistemas tipo UNIX, cada archivo está representado por un inodo único en disco. El inodo almacena todos los metadatos: permisos, propietario, tamaño, fechas de acceso/modificación y punteros a bloques de disco (directos, indirectos simples, dobles y triples).';
      trapTitle = '¿Dónde se guarda el nombre del archivo?';
      trapDesc = `Una trampa clásica de examen ("${escapeHtml(wrongOptText)}") afirma que el inodo guarda el nombre del fichero. ¡Falso! Los nombres de los ficheros se almacenan en los bloques de datos de los DIRECTORIOS, asociados a su número de inodo. Por eso varios nombres (hard links) pueden apuntar al mismo inodo.`;
      exampleTitle = 'Estructura de Descriptores y Inodos';
      codeSnippet = `int fd[2];
pipe(fd); // fd[0] = EXTREMO DE LECTURA (entrada)
          // fd[1] = EXTREMO DE ESCRITURA (salida)

// Inodo en UNIX:
// [ Permisos (rwxr-xr-x) ] [ UID/GID ] [ Tamaño: 4096 ]
// [ Punteros Directos: 0..11 ] [ Puntero Indirecto: 12 ]
// NOTA: ¡El nombre "mi_archivo.txt" NO está aquí, está en el directorio!`;
      mnemonicRule = 'El Inodo tiene toda la información del archivo... EXCEPTO su nombre (que está en el directorio).';
    } else if (qLower.includes('interrup') || qLower.includes('reloj') || qLower.includes('timer') || qLower.includes('modo') || qLower.includes('núcleo') || qLower.includes('nucleo') || qLower.includes('trap')) {
      conceptTitle = 'Mecanismos de Control de la CPU y Protección';
      conceptDesc = 'El SO recupera el control de la CPU ante eventos síncronos (llamadas al sistema intencionadas y traps por error como división por cero) y asíncronos (interrupciones hardware de periféricos o el reloj del sistema).';
      trapTitle = '¿Cómo evita el SO que un proceso acapare la CPU?';
      trapDesc = `La trampa común ("${escapeHtml(wrongOptText)}") sugiere que el modo usuario o la memoria impiden el acaparamiento. La única forma física de arrebatarle la CPU a un bucle infinito es mediante las interrupciones periódicas del temporizador hardware (timer), que fuerzan la ejecución del planificador del SO.`;
      exampleTitle = 'Ciclo de Interrupción del Temporizador';
      codeSnippet = `// Cada 10 ms (quantum de tiempo):
// 1. Reloj hardware envía señal INT a la CPU.
// 2. CPU guarda contador de programa (PC) y registros del proceso actual.
// 3. CPU salta a la Rutina de Tratamiento de la Interrupción (RTI) en el kernel.
// 4. El planificador (Scheduler) decide si desalojar el proceso actual.`;
      mnemonicRule = 'Solo el RELOJ HARDWARE puede despertar al SO si el proceso está atrapado en un while(1).';
    } else {
      conceptTitle = 'Análisis Conceptual';
      conceptDesc = `Esta cuestión evalúa la comprensión exacta de: <strong>${escapeHtml(explanationText || correctOptText)}</strong>. La opción [${ansIndex === 0 ? 'A' : 'B'}] es la única estrictamente consistente con el modelo teórico de sistemas operativos.`;
      trapTitle = 'Distinción Clave del Enunciado';
      trapDesc = `La opción contraria ("${escapeHtml(wrongOptText)}") contiene una premisa falsa o matiz engañoso frecuente en las preguntas tipo test de la asignatura.`;
      exampleTitle = 'Justificación Teórica';
      codeSnippet = `// Justificación oficial:
// ${escapeHtml(explanationText || correctOptText)}`;
      mnemonicRule = `Respuesta correcta: [${ansIndex === 0 ? 'A' : 'B'}] -> ${escapeHtml(correctOptText.slice(0, 90))}...`;
    }

    return {
      conceptTitle,
      conceptDesc,
      trapTitle,
      trapDesc,
      exampleTitle,
      codeSnippet,
      mnemonicRule
    };
  }

  // ── Pila de Dudas (Flashcard Stack Renderer) ──────────────────────
  function renderDoubtsStack() {
    const stackContainer = document.getElementById('doubts-stack-container');
    if (!stackContainer) return;

    const mistakeIds = Object.keys(APP.mistakesBank);
    const mistakes = APP.questions.filter(q => mistakeIds.includes(q.id));

    if (mistakes.length === 0) {
      stackContainer.innerHTML = `
        <div class="doubt-empty-card">
          <div style="width:68px; height:68px; border-radius:50%; background:rgba(52, 211, 153, 0.16); border:1.5px solid var(--ok); display:flex; align-items:center; justify-content:center; margin:0 auto 18px; color:var(--ok); box-shadow:0 0 24px rgba(52, 211, 153, 0.35);">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 style="font-size:1.45rem; font-weight:800; color:var(--text-pure); margin-bottom:8px;">
            ¡Pila de dudas vacía!
          </h2>
          <p style="font-size:1rem; color:var(--text-muted); max-width:480px; margin:0 auto 24px; line-height:1.6;">
            No tienes dudas pendientes. Cuando falles preguntas en los exámenes, aparecerán automáticamente en esta pila para resolverlas una a una.
          </p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="act-btn-pro primary" id="btn-load-sample-doubts">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Cargar 5 Preguntas a la Pila
            </button>
            <button class="act-btn-pro" onclick="window.ISO_STUDIO.startOfficialQuiz()">
              Hacer Simulacro Oficial (50Q)
            </button>
          </div>
        </div>
      `;

      const btnLoad = document.getElementById('btn-load-sample-doubts');
      if (btnLoad) {
        btnLoad.onclick = function () {
          AUDIO.playClick();
          const candidates = APP.questions.filter(q => ['T1', 'T2', 'T3', 'T4'].includes(q.t));
          const sample = pickRandom(candidates, 5);
          sample.forEach(q => {
            APP.mistakesBank[q.id] = 1;
          });
          savePersistentStorage();
          updateGlobalHeaderStats();
          APP.doubtsStackIndex = 0;
          renderMistakesView();
          showToast('Se han cargado 5 preguntas a la pila de dudas', 'info');
        };
      }
      return;
    }

    if (APP.doubtsStackIndex >= mistakes.length) {
      APP.doubtsStackIndex = Math.max(0, mistakes.length - 1);
    }
    const idx = APP.doubtsStackIndex;
    const currentQ = mistakes[idx];
    const topKey = currentQ.t || 'T1';
    const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };
    const failCount = APP.mistakesBank[currentQ.id] || 1;
    const testSource = currentQ.source || 'Simulacro Oficial';

    let html = `
      <!-- Header Banner -->
      <div class="doubts-deck-header">
        <div class="doubts-deck-status">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>Preguntas pendientes en la pila:</span>
          <span class="doubts-count-pill mono">${mistakes.length}</span>
        </div>
        <div class="mono" style="font-size:0.84rem; color:var(--text-dim);">
          Tarjeta ${idx + 1} de ${mistakes.length}
        </div>
      </div>

      <!-- 3D Stack Stage -->
      <div class="doubts-deck-stage">
        ${mistakes.length > 2 ? '<div class="doubt-stack-card-bg2"></div>' : ''}
        ${mistakes.length > 1 ? '<div class="doubt-stack-card-bg1"></div>' : ''}

        <!-- Top Active Card in Stack -->
        <div class="doubt-card-top revealing-in" id="doubt-top-card">

          <!-- Card Header line as requested: Pregunta [X]: Test N[Y]: -->
          <div class="doubt-card-meta-line">
            <div class="doubt-card-pretitle mono">
              Pregunta [${idx + 1}]: Test N[${escapeHtml(testSource)}]:
            </div>
            <div class="doubt-card-badges">
              <span class="topic-tag mono" style="background:rgba(255,255,255,0.06); color:${meta.color}; border:1px solid ${meta.color}40;">
                [${topKey}] ${meta.title}
              </span>
              <span class="mono" style="font-size:0.75rem; color:var(--err); background:var(--err-bg); padding:3px 8px; border-radius:4px; border:1px solid var(--err-border);">
                Fallada ${failCount} ${failCount === 1 ? 'vez' : 'veces'}
              </span>
            </div>
          </div>

          <!-- Question Stem -->
          <div class="doubt-card-stem">
            ${escapeHtml(currentQ.q)}
          </div>

          <!-- Options A and B -->
          <div class="doubt-card-options">
    `;

    const opts = currentQ.opts || ['Verdadero', 'Falso'];
    opts.forEach(function (optText, optIdx) {
      const isOfficialCorrect = optIdx === currentQ.ans;
      const keyLetter = optIdx === 0 ? 'A' : 'B';
      html += `
        <div class="doubt-opt-tile ${isOfficialCorrect ? 'is-correct-answer' : ''}">
          <div class="doubt-opt-badge mono">${keyLetter}</div>
          <div style="flex:1;">${escapeHtml(optText)}</div>
          ${isOfficialCorrect ? '<span class="doubt-opt-tag-correct mono">✓ CORRECTA OFICIAL</span>' : ''}
        </div>
      `;
    });

    html += `
          </div>

          <!-- Collapsible Official Explanation Accordion -->
          <details class="doubt-accordion" id="doubt-accordion">
            <summary class="doubt-accordion-header">
              <svg class="doubt-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              <span>Explicación Oficial (Desplegable)</span>
              <span class="mono" style="font-size:0.75rem; color:var(--text-dim); margin-left:auto;">[Espacio]</span>
            </summary>
            <div class="doubt-accordion-body">
              <strong style="color:var(--accent); font-family:'IBM Plex Mono', monospace; font-size:0.82rem; text-transform:uppercase; display:block; margin-bottom:6px;">
                Justificación Oficial:
              </strong>
              ${escapeHtml(currentQ.ex || 'Sin justificación registrada.')}
            </div>
          </details>

          <!-- Question Resolution Action Prompt -->
          <div class="doubt-action-box">
            <div class="doubt-action-question">
              ¿Has aclarado la duda?
            </div>
            <div class="doubt-action-buttons">
              <button class="doubt-btn-tick" id="btn-doubt-tick" title="Marcar duda como resuelta y borrarla de la pila (Atajo: Y o Enter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Duda Aclarada (Borrar)</span>
                <span class="mono" style="font-size:0.75rem; background:rgba(255,255,255,0.22); padding:2px 6px; border-radius:4px; margin-left:4px;">[Enter]</span>
              </button>
              <button class="doubt-btn-no" id="btn-doubt-no-explain" title="Ver explicación extendida con código y ejemplos (Atajo: N)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>Más Explicación & Ejemplos</span>
                <span class="mono" style="font-size:0.75rem; background:rgba(255,255,255,0.12); padding:2px 6px; border-radius:4px; margin-left:4px;">[N]</span>
              </button>
            </div>
          </div>

          <!-- Extended Deep Explanation Container (Revealed on 'No') -->
          <div class="doubt-extended-container" id="doubt-extended-container" style="display:none;"></div>

        </div>
      </div>
    `;

    stackContainer.innerHTML = html;

    // Attach listeners
    const cardEl = document.getElementById('doubt-top-card');
    const btnTick = document.getElementById('btn-doubt-tick');
    const btnNo = document.getElementById('btn-doubt-no-explain');
    const extContainer = document.getElementById('doubt-extended-container');
    const accordion = document.getElementById('doubt-accordion');

    if (accordion) {
      accordion.addEventListener('toggle', () => {
        AUDIO.playClick();
      });
    }

    function resolveAndPopDoubt() {
      AUDIO.playFanfare();
      if (cardEl) {
        cardEl.classList.add('swiping-out');
      }
      delete APP.mistakesBank[currentQ.id];
      LEARNING_ENGINE.recordAttempt({
        questionId: currentQ.id,
        isCorrect: true,
        userAnswer: currentQ.ans,
        confidence: 'high',
        context: 'doubt_stack'
      });
      savePersistentStorage();
      updateGlobalHeaderStats();
      showToast('✓ Pregunta eliminada de la pila. ¡Duda aclarada!', 'info', 2200);

      setTimeout(() => {
        renderDoubtsStack();
      }, 280);
    }

    if (btnTick) {
      btnTick.onclick = resolveAndPopDoubt;
    }

    if (btnNo) {
      btnNo.onclick = function () {
        AUDIO.playClick();
        LEARNING_ENGINE.recordAttempt({
          questionId: currentQ.id,
          isCorrect: false,
          userAnswer: null,
          confidence: 'low',
          context: 'doubt_stack_extended'
        });
        const ext = generateExtendedExplanation(currentQ);
        extContainer.innerHTML = `
          <div class="doubt-extended-badge mono">
            💡 EXPLICACIÓN EXTENDIDA Y CASOS PRÁCTICOS
          </div>

          <div class="doubt-block-item">
            <div class="doubt-block-title">
              🔍 1. ${escapeHtml(ext.conceptTitle)}
            </div>
            <div class="doubt-block-text">
              ${ext.conceptDesc}
            </div>
          </div>

          <div class="doubt-block-item">
            <div class="doubt-block-title" style="color:var(--err);">
              ⚠️ 2. ${escapeHtml(ext.trapTitle)}
            </div>
            <div class="doubt-block-text">
              ${ext.trapDesc}
            </div>
          </div>

          <div class="doubt-block-item">
            <div class="doubt-block-title" style="color:var(--ok);">
              💻 3. ${escapeHtml(ext.exampleTitle)}
            </div>
            <pre class="doubt-code-snippet"><code>${escapeHtml(ext.codeSnippet)}</code></pre>
          </div>

          <div class="doubt-block-item" style="border-left:3px solid var(--accent);">
            <div class="doubt-block-title">
              📌 4. Regla Mnemotécnica para el Examen Oficial
            </div>
            <div class="doubt-block-text" style="color:var(--text-pure); font-weight:700;">
              "${escapeHtml(ext.mnemonicRule)}"
            </div>
          </div>

          <div style="margin-top:22px; text-align:center;">
            <button class="doubt-btn-tick" id="btn-doubt-tick-extended" style="width:100%; justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"/></svg>
              <span>✓ ¡Ahora sí me ha quedado claro! (Borrar de la pila)</span>
            </button>
          </div>
        `;

        extContainer.style.display = 'block';
        extContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        const btnExtTick = document.getElementById('btn-doubt-tick-extended');
        if (btnExtTick) {
          btnExtTick.onclick = resolveAndPopDoubt;
        }
      };
    }
  }

  // ── Alternative List View for Doubts ──────────────────────────────
  function renderDoubtsList() {
    const listContainer = document.getElementById('mistakes-items-list');
    if (!listContainer) return;

    const mistakeIds = Object.keys(APP.mistakesBank);
    if (mistakeIds.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:48px 16px; color:var(--text-dim);">
          <div style="font-size:1.1rem; font-weight:800; color:var(--text-pure); margin-bottom:6px;">¡Excelente! Banco de fallos limpio</div>
          <div style="font-size:0.86rem; max-width:440px; margin:0 auto;">No tienes preguntas falladas pendientes de dominar.</div>
        </div>
      `;
      return;
    }

    const mistakes = APP.questions.filter(q => mistakeIds.includes(q.id));
    let html = '';

    mistakes.forEach(function (q, idx) {
      const topKey = q.t || 'T1';
      const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };
      const failCount = APP.mistakesBank[q.id] || 1;

      html += `
        <div class="review-item-card is-mistake" style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mono" style="font-size:0.8rem; font-weight:800; color:var(--text-dim);">#${idx + 1}</span>
              <span class="topic-tag mono" style="background:rgba(255,255,255,0.06); color:${meta.color}; border:1px solid ${meta.color}40;">${topKey}</span>
              <span class="mono" style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(q.source || '')}</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="mono" style="color:var(--err); font-size:0.75rem; font-weight:800; background:var(--err-bg); padding:3px 8px; border-radius:4px; border:1px solid var(--err-border);">
                Fallada ${failCount} ${failCount === 1 ? 'vez' : 'veces'}
              </span>
              <button class="act-btn-pro" style="padding:4px 10px; font-size:0.75rem; border-color:var(--ok); color:var(--ok);" onclick="window.ISO_STUDIO.deleteDoubt('${q.id}')">
                ✓ Aclarada
              </button>
            </div>
          </div>
          <div style="font-size:1.02rem; font-weight:700; color:var(--text-pure); line-height:1.55; margin-bottom:12px;">
            ${escapeHtml(q.q)}
          </div>
          <div style="background:var(--surface-raised); border-left:3px solid var(--ok); padding:10px 14px; border-radius:4px; font-size:0.88rem; color:var(--text-pure); margin-bottom:10px;">
            <strong>Respuesta Correcta:</strong> [${q.ans === 0 ? 'A' : 'B'}] ${escapeHtml(q.opts[q.ans])}
          </div>
          ${q.ex ? `<div style="font-size:0.84rem; color:var(--text-muted); line-height:1.5;">${escapeHtml(q.ex)}</div>` : ''}
        </div>
      `;
    });

    listContainer.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════════════════════
  // FASE 4 — MÓDULO A: REPETICIÓN ESPACIADA (SM-2) Y REPRODUCTOR
  // ═══════════════════════════════════════════════════════════════════

  function renderSpacedRepetitionView() {
    const container = document.getElementById('spaced-repetition-container');
    if (!container) return;

    if (APP.activeReviewSession) {
      renderSpacedReviewPlayer();
      return;
    }

    const dueList = LEARNING_ENGINE.getDueReviews();
    const counts = LEARNING_ENGINE.getStateCounts();
    const now = new Date();
    const overdueList = dueList.filter(q => {
      const st = APP.learningState[q.id];
      if (!st || !st.nextReviewDate) return false;
      return (now - new Date(st.nextReviewDate)) > 24 * 60 * 60 * 1000;
    });

    const pendingCount = dueList.length;
    const overdueCount = overdueList.length;
    const estMinutes = Math.max(2, Math.round(pendingCount * 0.75));

    container.innerHTML = `
      <div class="spaced-wrap">
        <!-- Top KPI Grid -->
        <div class="spaced-kpi-grid">
          <div class="spaced-kpi-card">
            <div class="spaced-kpi-num" style="color:var(--accent);">${pendingCount}</div>
            <div class="spaced-kpi-lbl">Repasos Pendientes</div>
          </div>
          <div class="spaced-kpi-card">
            <div class="spaced-kpi-num" style="color:${overdueCount > 0 ? 'var(--err)' : 'var(--text-dim)'};">${overdueCount}</div>
            <div class="spaced-kpi-lbl">Atrasados (&gt;24h)</div>
          </div>
          <div class="spaced-kpi-card">
            <div class="spaced-kpi-num" style="color:var(--warn);">${counts.new}</div>
            <div class="spaced-kpi-lbl">Preguntas Nuevas</div>
          </div>
          <div class="spaced-kpi-card">
            <div class="spaced-kpi-num" style="color:var(--ok);">${counts.mastered}</div>
            <div class="spaced-kpi-lbl">Dominadas</div>
          </div>
          <div class="spaced-kpi-card">
            <div class="spaced-kpi-num mono">~${estMinutes} min</div>
            <div class="spaced-kpi-lbl">Tiempo Estimado</div>
          </div>
        </div>

        <!-- Session Launcher Card -->
        <div class="spaced-session-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-pure); margin:0;">
              Sesión de Recuperación Activa
            </h3>
            <span class="mono" style="font-size:0.75rem; font-weight:700; color:var(--accent); background:var(--accent-subtle); border:1px solid var(--accent-border); padding:3px 10px; border-radius:var(--radius-pill);">
              Algoritmo SM-2
            </span>
          </div>

          <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:20px; line-height:1.55;">
            El sistema calcula automáticamente el intervalo ideal de repaso para cada pregunta según tu nivel de recuerdo y facilidad cognitiva.
          </p>

          <div style="margin-bottom:16px;">
            <div class="mono" style="font-size:0.76rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px;">
              Tamaño de la Sesión:
            </div>
            <div class="spaced-config-row" id="spaced-session-sizes">
              <button class="spaced-opt-pill active" data-size="10">10 preguntas</button>
              <button class="spaced-opt-pill" data-size="20">20 preguntas</button>
              <button class="spaced-opt-pill" data-size="all">Todas las pendientes (${pendingCount})</button>
              ${pendingCount === 0 ? `<button class="spaced-opt-pill" data-size="new10">Añadir 10 nuevas</button>` : ''}
            </div>
          </div>

          <div style="margin-bottom:24px;">
            <div class="mono" style="font-size:0.76rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px;">
              Filtrar por Tema (Opcional):
            </div>
            <select id="spaced-topic-select" class="code-input-area" style="max-width:320px; height:42px; padding:6px 12px; font-family:'IBM Plex Mono', monospace; font-size:0.84rem; border-radius:6px; cursor:pointer;">
              <option value="ALL">Todos los Temas (T1–T6)</option>
              <option value="T1">Tema 1: Intro SSOO</option>
              <option value="T2">Tema 2: Procesos y Concurrencia</option>
              <option value="T3">Tema 3: Gestión de Memoria</option>
              <option value="T4">Tema 4: E/S y Ficheros</option>
              <option value="T5">Tema 5: Seguridad</option>
              <option value="T6">Tema 6: Distribuidos</option>
            </select>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="act-btn-pro primary" id="btn-start-spaced-session" style="padding:13px 26px; font-size:1rem; flex:1; justify-content:center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ${pendingCount > 0 ? `Comenzar Repaso (${Math.min(10, pendingCount)} preguntas)` : 'Entrenar Preguntas Nuevas (10Q)'}
            </button>
          </div>
        </div>

        <!-- Reference: SM-2 Interval Rules -->
        <div class="spaced-hero-card" style="padding:24px;">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-pure); margin-bottom:14px;">
            Escala de Intervalos de Repetición
          </h4>
          <div class="spaced-schedule-grid">
            <div class="spaced-schedule-item">
              <span class="spaced-schedule-badge" style="background:var(--err-bg); color:var(--err); border:1px solid var(--err-border);">1. NO LA SABÍA (FALLO)</span>
              <div style="font-weight:700; color:var(--text-pure); margin-bottom:4px;">Intervalo: 10 minutos</div>
              <p style="font-size:0.82rem; color:var(--text-muted); margin:0; line-height:1.5;">Reinicia la racha de aciertos, reduce el factor de facilidad y vuelve a la fase de aprendizaje activo.</p>
            </div>
            <div class="spaced-schedule-item">
              <span class="spaced-schedule-badge" style="background:var(--warn-bg); color:var(--warn); border:1px solid var(--warn-border);">2. ME COSTÓ RECORDARLA</span>
              <div style="font-weight:700; color:var(--text-pure); margin-bottom:4px;">Intervalo: 1 a 3 días</div>
              <p style="font-size:0.82rem; color:var(--text-muted); margin:0; line-height:1.5;">Acierto con esfuerzo cognitivo. Mantiene el intervalo en consolidación sin saltos bruscos.</p>
            </div>
            <div class="spaced-schedule-item">
              <span class="spaced-schedule-badge" style="background:var(--ok-bg); color:var(--ok); border:1px solid var(--ok-border);">3. LA SABÍA CON SEGURIDAD</span>
              <div style="font-weight:700; color:var(--text-pure); margin-bottom:4px;">Intervalo: 7 a 14 días</div>
              <p style="font-size:0.82rem; color:var(--text-muted); margin:0; line-height:1.5;">Acierto firme e inmediato. Incrementa el factor de facilidad y promueve la pregunta a Dominada al alcanzar 14 días.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind size pills
    let chosenSize = pendingCount > 0 ? '10' : 'new10';
    const pills = container.querySelectorAll('.spaced-opt-pill');
    const startBtn = document.getElementById('btn-start-spaced-session');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        AUDIO.playClick();
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        chosenSize = pill.getAttribute('data-size');
        if (startBtn) {
          const label = chosenSize === 'all' ? `Todas (${pendingCount}Q)` : (chosenSize === 'new10' ? '10 Nuevas' : `${chosenSize}Q`);
          startBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Comenzar Repaso (${label})
          `;
        }
      });
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        AUDIO.playClick();
        const topicVal = document.getElementById('spaced-topic-select')?.value || 'ALL';
        let count = 10;
        let includeNew = false;
        if (chosenSize === 'all') count = pendingCount || 20;
        else if (chosenSize === '20') count = 20;
        else if (chosenSize === 'new10') { count = 10; includeNew = true; }
        else count = 10;

        startSpacedReviewSession({ count, topic: topicVal, includeNew });
      });
    }
  }

  function startSpacedReviewSession({ count = 10, topic = 'ALL', includeNew = false }) {
    let pool = LEARNING_ENGINE.getDueReviews();

    if (topic !== 'ALL') {
      pool = pool.filter(q => q.t === topic);
    }

    if (includeNew || pool.length === 0) {
      const newQuestions = APP.questions.filter(q => {
        if (topic !== 'ALL' && q.t !== topic) return false;
        const st = APP.learningState[q.id];
        return !st || st.totalAttempts === 0;
      });
      const additional = pickRandom(newQuestions, Math.max(count, 10));
      pool = [...pool, ...additional];
    }

    if (pool.length === 0) {
      const fallback = APP.questions.filter(q => topic === 'ALL' || q.t === topic);
      pool = pickRandom(fallback, Math.min(count, fallback.length));
    }

    const uniqueMap = new Map();
    pool.forEach(q => uniqueMap.set(q.id, q));
    let finalQuestions = Array.from(uniqueMap.values());
    if (finalQuestions.length > count && count > 0) {
      finalQuestions = pickRandom(finalQuestions, count);
    }

    if (finalQuestions.length === 0) {
      showToast('No hay preguntas disponibles para repasar.', 'info');
      return;
    }

    APP.activeReviewSession = {
      questions: finalQuestions,
      currentIndex: 0,
      results: [],
      isRevealed: false
    };

    renderSpacedReviewPlayer();
  }

  function renderSpacedReviewPlayer() {
    const container = document.getElementById('spaced-repetition-container');
    if (!container || !APP.activeReviewSession) return;

    const session = APP.activeReviewSession;
    if (session.currentIndex >= session.questions.length) {
      renderSpacedReviewSummary();
      return;
    }

    const q = session.questions[session.currentIndex];
    const topKey = q.t || 'T1';
    const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };
    const st = LEARNING_ENGINE.getState(q.id);
    const ann = LEARNING_ENGINE.getAnnotation(q.id);

    let intervalStr = 'Nuevo';
    if (st.intervalDays > 0) {
      if (st.intervalDays < 0.1) intervalStr = '10 minutos';
      else if (st.intervalDays === 1) intervalStr = '1 día';
      else intervalStr = `${Math.round(st.intervalDays)} días`;
    }

    let optionsHtml = '';
    (q.opts || []).forEach((opt, idx) => {
      let optClass = 'spaced-opt-tile';
      let icon = idx === 0 ? 'A' : 'B';

      if (session.isRevealed) {
        if (idx === q.ans) {
          optClass += ' is-correct';
          icon = '✓';
        } else {
          optClass += ' is-wrong';
        }
      }

      optionsHtml += `
        <div class="${optClass}">
          <span class="mono" style="width:32px; height:32px; border-radius:4px; display:inline-flex; align-items:center; justify-content:center; background:var(--surface-card); border:1px solid var(--border); font-size:0.9rem; font-weight:800; color:var(--text-pure); flex-shrink:0;">
            ${icon}
          </span>
          <span style="flex:1;">${escapeHtml(opt)}</span>
        </div>
      `;
    });

    let revealedSectionHtml = '';
    if (!session.isRevealed) {
      revealedSectionHtml = `
        <div class="spaced-reveal-box">
          <button class="act-btn-pro primary" id="btn-spaced-reveal" style="padding:14px 28px; font-size:1.05rem; justify-content:center; width:100%; max-width:360px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Mostrar Respuesta [Espacio]
          </button>
        </div>
      `;
    } else {
      revealedSectionHtml = `
        <div class="spaced-revealed-panel">
          ${q.ex ? `
            <div class="spaced-explanation-card">
              <div class="mono" style="font-size:0.75rem; font-weight:800; color:var(--accent); text-transform:uppercase; margin-bottom:4px;">
                Explicación Oficial:
              </div>
              <div>${escapeHtml(q.ex)}</div>
            </div>
          ` : ''}

          <div style="margin-bottom:20px;">
            <div class="mono" style="font-size:0.78rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px;">
              ¿Cómo has recordado esta pregunta?
            </div>
            <div class="spaced-confidence-grid">
              <button class="btn-confidence fail" id="btn-conf-fail">
                <div>[1] No la sabía</div>
                <div class="btn-confidence-hint">Repaso en 10 min</div>
              </button>
              <button class="btn-confidence hard" id="btn-conf-hard">
                <div>[2] Me costó recordarla</div>
                <div class="btn-confidence-hint">Repaso en 1 a 3 días</div>
              </button>
              <button class="btn-confidence easy" id="btn-conf-easy">
                <div>[3] La sabía con seguridad</div>
                <div class="btn-confidence-hint">Repaso en 7 a 14 días</div>
              </button>
            </div>
            <div class="mono" style="font-size:0.76rem; color:var(--text-dim); text-align:center;">
              Atajos de teclado: [1] No la sabía · [2] Me costó · [3] Con seguridad
            </div>
          </div>

          <!-- Personal Notes Box -->
          <div class="q-note-box" style="margin-top:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span class="mono" style="font-size:0.75rem; color:var(--text-dim); font-weight:700;">APUNTES O NOTA RÁPIDA:</span>
              <span class="mono" id="spaced-note-saved" style="font-size:0.72rem; color:var(--ok); display:none;">Guardado ✓</span>
            </div>
            <textarea class="q-note-textarea" placeholder="Escribe aquí algún recordatorio o truco para esta pregunta..." oninput="window.ISO_STUDIO.setAnnotationNotes('${q.id}', this.value)">${escapeHtml(ann.notes || '')}</textarea>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="spaced-player-wrap">
        <!-- Top HUD -->
        <div class="spaced-player-hud">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="mono" style="font-size:0.86rem; font-weight:800; color:var(--text-pure);">
              Pregunta ${session.currentIndex + 1} de ${session.questions.length}
            </span>
            <span class="topic-tag mono" style="background:var(--surface-raised); color:${meta.color}; border:1px solid var(--border);">
              ${topKey}
            </span>
            <span class="mono" style="font-size:0.78rem; color:var(--text-dim);">
              Intervalo actual: <strong>${intervalStr}</strong> · Facilidad: <strong>${Number(st.easeFactor).toFixed(1)}x</strong>
            </span>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <button class="favorite-star-btn ${ann.isFavorite ? 'active' : 'inactive'}" onclick="window.ISO_STUDIO.toggleFavorite('${q.id}')" title="Marcar como favorita">
              ${ann.isFavorite ? '★' : '☆'}
            </button>
            <button class="act-btn-pro" id="btn-exit-spaced-session" style="padding:6px 12px; font-size:0.8rem;">
              Salir de la Sesión
            </button>
          </div>
        </div>

        <!-- Question Card -->
        <div class="spaced-card-active">
          <div style="font-size:1.32rem; font-weight:700; color:var(--text-pure); line-height:1.55; margin-bottom:20px;">
            ${escapeHtml(q.q)}
          </div>

          <div class="spaced-player-options">
            ${optionsHtml}
          </div>

          ${revealedSectionHtml}
        </div>
      </div>
    `;

    // Bind event handlers
    const btnReveal = document.getElementById('btn-spaced-reveal');
    if (btnReveal) {
      btnReveal.addEventListener('click', () => {
        revealSpacedReviewAnswer();
      });
    }

    const btnFail = document.getElementById('btn-conf-fail');
    if (btnFail) btnFail.addEventListener('click', () => rateSpacedQuestion('fail'));

    const btnHard = document.getElementById('btn-conf-hard');
    if (btnHard) btnHard.addEventListener('click', () => rateSpacedQuestion('hard'));

    const btnEasy = document.getElementById('btn-conf-easy');
    if (btnEasy) btnEasy.addEventListener('click', () => rateSpacedQuestion('easy'));

    const btnExit = document.getElementById('btn-exit-spaced-session');
    if (btnExit) {
      btnExit.addEventListener('click', () => {
        AUDIO.playClick();
        if (confirm('¿Deseas salir de la sesión de repaso? El progreso de las preguntas ya respondidas se ha guardado.')) {
          exitSpacedReviewSession();
        }
      });
    }
  }

  function revealSpacedReviewAnswer() {
    if (!APP.activeReviewSession) return;
    AUDIO.playClick();
    APP.activeReviewSession.isRevealed = true;
    renderSpacedReviewPlayer();
  }

  function rateSpacedQuestion(rating) {
    if (!APP.activeReviewSession) return;
    const session = APP.activeReviewSession;
    const q = session.questions[session.currentIndex];
    if (!q) return;

    if (rating === 'fail') {
      AUDIO.playAlert();
    } else if (rating === 'hard') {
      AUDIO.playClick();
    } else {
      AUDIO.playSuccess();
    }

    const isCorrect = rating !== 'fail';
    const confidence = rating === 'easy' ? 'high' : (rating === 'hard' ? 'medium' : 'low');

    LEARNING_ENGINE.recordAttempt({
      questionId: q.id,
      isCorrect: isCorrect,
      confidence: confidence,
      context: 'spaced_review'
    });

    session.results.push({
      questionId: q.id,
      rating: rating,
      isCorrect: isCorrect
    });

    session.currentIndex++;
    session.isRevealed = false;

    if (session.currentIndex < session.questions.length) {
      renderSpacedReviewPlayer();
    } else {
      renderSpacedReviewSummary();
    }
  }

  function renderSpacedReviewSummary() {
    const container = document.getElementById('spaced-repetition-container');
    if (!container || !APP.activeReviewSession) return;

    const results = APP.activeReviewSession.results;
    const total = results.length;
    const easyCount = results.filter(r => r.rating === 'easy').length;
    const hardCount = results.filter(r => r.rating === 'hard').length;
    const failCount = results.filter(r => r.rating === 'fail').length;
    const retentionRate = total > 0 ? Math.round(((easyCount + hardCount) / total) * 100) : 0;

    if (retentionRate >= 80) {
      AUDIO.playFanfare();
      CONFETTI.launch();
    } else {
      AUDIO.playSuccess();
    }

    container.innerHTML = `
      <div class="spaced-wrap">
        <div class="spaced-summary-box">
          <div style="width:68px; height:68px; border-radius:50%; background:rgba(59, 130, 246, 0.16); border:1.5px solid var(--accent); display:flex; align-items:center; justify-content:center; margin:0 auto 18px; color:var(--accent);">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>

          <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-pure); margin-bottom:8px;">
            ¡Sesión de Repaso Completada!
          </h2>
          <p style="font-size:0.96rem; color:var(--text-muted); margin-bottom:24px;">
            Has repasado <strong>${total} preguntas</strong> con el algoritmo de repetición espaciada.
          </p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-bottom:28px;">
            <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius); padding:16px;">
              <div class="mono" style="font-size:1.6rem; font-weight:800; color:var(--accent);">${retentionRate}%</div>
              <div class="mono" style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Retención</div>
            </div>
            <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius); padding:16px;">
              <div class="mono" style="font-size:1.6rem; font-weight:800; color:var(--ok);">${easyCount}</div>
              <div class="mono" style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Con Seguridad</div>
            </div>
            <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius); padding:16px;">
              <div class="mono" style="font-size:1.6rem; font-weight:800; color:var(--warn);">${hardCount}</div>
              <div class="mono" style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Con Duda</div>
            </div>
            <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius); padding:16px;">
              <div class="mono" style="font-size:1.6rem; font-weight:800; color:var(--err);">${failCount}</div>
              <div class="mono" style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Para Reintentar</div>
            </div>
          </div>

          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="act-btn-pro primary" id="btn-summary-done" style="padding:12px 24px; font-size:0.95rem;">
              Volver al Panel de Repaso
            </button>
            <button class="act-btn-pro" id="btn-summary-restart" style="padding:12px 24px; font-size:0.95rem;">
              Iniciar Otra Sesión
            </button>
          </div>
        </div>
      </div>
    `;

    const btnDone = document.getElementById('btn-summary-done');
    if (btnDone) {
      btnDone.addEventListener('click', () => {
        AUDIO.playClick();
        exitSpacedReviewSession();
      });
    }

    const btnRestart = document.getElementById('btn-summary-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        AUDIO.playClick();
        exitSpacedReviewSession();
        startSpacedReviewSession({ count: 10 });
      });
    }
  }

  function exitSpacedReviewSession() {
    APP.activeReviewSession = null;
    renderSpacedRepetitionView();
  }

  // ── Main Controller for Mistakes / Doubts View ────────────────────
  function renderMistakesView() {
    updateGlobalHeaderStats();

    const stackContainer = document.getElementById('doubts-stack-container');
    const listContainer = document.getElementById('doubts-list-container');
    const txtMode = document.getElementById('txt-doubts-mode');

    if (APP.doubtsViewMode === 'stack') {
      if (stackContainer) stackContainer.style.display = 'block';
      if (listContainer) listContainer.style.display = 'none';
      if (txtMode) txtMode.textContent = 'Ver Lista Completa';
      renderDoubtsStack();
    } else {
      if (stackContainer) stackContainer.style.display = 'none';
      if (listContainer) listContainer.style.display = 'block';
      if (txtMode) txtMode.textContent = 'Ver Modo Pila (Flashcard)';
      renderDoubtsList();
    }
  }

  // ── Question Bank Auditor View ────────────────────────────────────
  function renderBankView() {
    const searchInput = document.getElementById('bank-search-input');
    const topicFilter = document.getElementById('bank-topic-filter');
    const statusFilter = document.getElementById('bank-status-filter');
    const container = document.getElementById('bank-questions-container');
    const countBadge = document.getElementById('bank-match-count');

    function applyFilter() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      const topic = topicFilter?.value || 'ALL';
      const status = statusFilter?.value || 'ALL';
      const now = new Date();

      const filtered = APP.questions.filter(function (q) {
        if (topic !== 'ALL' && q.t !== topic) return false;

        const st = LEARNING_ENGINE.getState(q.id);
        const ann = LEARNING_ENGINE.getAnnotation(q.id);
        const inMistakes = Boolean(APP.mistakesBank[q.id]);
        const isDue = (st.nextReviewDate && new Date(st.nextReviewDate) <= now) || inMistakes;

        if (status === 'FAVORITES' && !ann.isFavorite) return false;
        if (status === 'MISTAKES' && !inMistakes) return false;
        if (status === 'PENDING' && !isDue) return false;
        if (status === 'LEARNING' && (st.state !== 'learning' || isDue)) return false;
        if (status === 'CONSOLIDATING' && (st.state !== 'consolidating' || isDue)) return false;
        if (status === 'MASTERED' && (st.state !== 'mastered' || isDue)) return false;
        if (status === 'NEW' && (st.totalAttempts > 0 || inMistakes)) return false;

        if (!query) return true;
        const stemMatch = (q.q || '').toLowerCase().includes(query);
        const optsMatch = (q.opts || []).some(o => o.toLowerCase().includes(query));
        const exMatch = (q.ex || '').toLowerCase().includes(query);
        const notesMatch = (ann.notes || '').toLowerCase().includes(query);
        return stemMatch || optsMatch || exMatch || notesMatch;
      });

      if (countBadge) countBadge.textContent = `${filtered.length} de ${APP.questions.length}`;

      if (container) {
        if (filtered.length === 0) {
          container.innerHTML = `
            <div style="text-align:center; padding:48px 16px; color:var(--text-dim); font-size:0.9rem;">
              No se encontraron preguntas que coincidan con los criterios de búsqueda.
            </div>
          `;
          return;
        }

        // Limit rendering to first 80 for performance if list is long
        const slice = filtered.slice(0, 80);
        let html = '';

        slice.forEach(function (q, idx) {
          const topKey = q.t || 'T1';
          const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };
          const st = LEARNING_ENGINE.getState(q.id);
          const ann = LEARNING_ENGINE.getAnnotation(q.id);
          const inMistakes = Boolean(APP.mistakesBank[q.id]);
          const isDue = (st.nextReviewDate && new Date(st.nextReviewDate) <= now) || inMistakes;

          let badgeClass = 'new';
          let badgeLabel = '🌱 NUEVA';
          if (isDue) {
            badgeClass = 'pending';
            badgeLabel = '⏳ PENDIENTE';
          } else if (st.state === 'mastered') {
            badgeClass = 'mastered';
            badgeLabel = '🟢 DOMINADA';
          } else if (st.state === 'consolidating') {
            badgeClass = 'consolidating';
            badgeLabel = '🔵 CONSOLIDANDO';
          } else if (st.state === 'learning') {
            badgeClass = 'learning';
            badgeLabel = '🟡 APRENDIENDO';
          }

          html += `
            <div class="review-item-card" style="margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span class="mono" style="font-size:0.75rem; color:var(--text-dim); font-weight:700;">#${idx + 1}</span>
                  <span class="topic-tag mono" style="background:var(--surface-raised); color:${meta.color}; border:1px solid var(--border);">${topKey}</span>
                  <span class="mono" style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(q.source || '')}</span>
                  <span class="badge-learning ${badgeClass}">${badgeLabel}</span>
                  ${inMistakes ? `<span class="mono" style="font-size:0.72rem; color:var(--err); background:var(--err-bg); padding:2px 6px; border-radius:4px; border:1px solid var(--err-border);">Fallo x${APP.mistakesBank[q.id]}</span>` : ''}
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <button class="favorite-star-btn ${ann.isFavorite ? 'active' : 'inactive'}" onclick="window.ISO_STUDIO.toggleFavorite('${q.id}')" title="${ann.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
                    ${ann.isFavorite ? '★' : '☆'}
                  </button>
                </div>
              </div>
              <div style="font-size:1.15rem; font-weight:700; color:var(--text-pure); margin-bottom:12px; line-height:1.55;">
                ${escapeHtml(q.q)}
              </div>
              <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
                <div style="padding:10px 14px; border-radius:6px; font-size:0.96rem; ${q.ans === 0 ? 'border:1px solid var(--ok); background:var(--ok-bg); color:var(--text-pure); font-weight:700;' : 'background:var(--surface-raised); color:var(--text);'}">
                  <strong>[A]</strong> ${escapeHtml(q.opts[0])}
                </div>
                <div style="padding:10px 14px; border-radius:6px; font-size:0.96rem; ${q.ans === 1 ? 'border:1px solid var(--ok); background:var(--ok-bg); color:var(--text-pure); font-weight:700;' : 'background:var(--surface-raised); color:var(--text);'}">
                  <strong>[B]</strong> ${escapeHtml(q.opts[1])}
                </div>
              </div>
              ${q.ex ? `<div style="font-size:0.92rem; color:var(--text-pure); background:var(--surface-raised); padding:10px 14px; border-radius:6px; line-height:1.55; margin-bottom:12px; border:1px solid var(--border);"><strong>Explicación:</strong> ${escapeHtml(q.ex)}</div>` : ''}
              
              <div class="q-note-box">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <span class="mono" style="font-size:0.75rem; color:var(--text-dim); font-weight:700;">NOTA PERSONAL:</span>
                  <span class="mono" id="note-saved-${q.id}" style="font-size:0.72rem; color:var(--ok); display:none;">Guardado ✓</span>
                </div>
                <textarea class="q-note-textarea" placeholder="Escribe aquí tus apuntes, mnemotecnia o advertencias para esta pregunta..." oninput="window.ISO_STUDIO.setAnnotationNotes('${q.id}', this.value)">${escapeHtml(ann.notes || '')}</textarea>
              </div>
            </div>
          `;
        });

        if (filtered.length > 80) {
          html += `
            <div style="text-align:center; padding:16px; color:var(--text-dim); font-size:0.84rem;">
              Mostrando las primeras 80 coincidencias. Afina la búsqueda para filtrar más preguntas.
            </div>
          `;
        }

        container.innerHTML = html;
      }
    }

    if (searchInput) searchInput.oninput = debounce(applyFilter, 180);
    if (topicFilter) topicFilter.onchange = applyFilter;
    if (statusFilter) statusFilter.onchange = applyFilter;

    applyFilter();
  }

  // ── History View ──────────────────────────────────────────────────
  function renderHistoryView() {
    const container = document.getElementById('history-full-list');
    if (!container) return;

    if (APP.testHistory.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:48px 16px; color:var(--text-dim); font-size:0.9rem;">
          No hay histórico de exámenes completados.
        </div>
      `;
      return;
    }

    let html = '';
    const reversed = [...APP.testHistory].reverse();

    reversed.forEach(function (t) {
      const dateFormatted = (t.date || '').replace('T', ' ').slice(0, 16);
      const isPass = t.passed;
      const statusClass = isPass ? 'color:var(--ok); border:1px solid var(--ok-border); background:var(--ok-bg);' : 'color:var(--err); border:1px solid var(--err-border); background:var(--err-bg);';

      html += `
        <div class="history-item-row" style="margin-bottom:12px;">
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div style="font-weight:800; font-size:1.02rem; color:var(--text-pure);">${escapeHtml(t.name)}</div>
            <div class="mono" style="font-size:0.78rem; color:var(--text-dim);">
              Fecha: ${dateFormatted} • Preguntas: ${t.totalQ} • Tiempo: ${Math.floor(t.timeSpentSec / 60)}m ${t.timeSpentSec % 60}s
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="text-align:right;">
              <div class="mono" style="font-size:1.25rem; font-weight:800; color:var(--text-pure);">${Number(t.score).toFixed(2)} / 10</div>
              <div class="mono" style="font-size:0.78rem; color:var(--text-dim);">${t.net >= 0 ? '+' : ''}${t.net} netos (+${t.correct} -${t.wrong} 0:${t.blank})</div>
            </div>
            <span class="mono" style="padding:4px 10px; border-radius:4px; font-size:0.75rem; font-weight:800; ${statusClass}">
              ${isPass ? 'APROBADO' : 'SUSPENSO'}
            </span>
            <button class="act-btn-pro" style="padding:7px 14px; font-size:0.8rem;" onclick="window.ISO_STUDIO.inspectPastTest('${t.id}')">
              Ver Examen
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ── Actions & Button Bindings ─────────────────────────────────────
  function setupActions() {
    // Sound toggle
    const btnToggleSound = document.getElementById('btn-toggle-sound');
    if (btnToggleSound) {
      btnToggleSound.addEventListener('click', function () {
        AUDIO.toggleMute();
      });
    }

    // Dashboard Quick Actions
    const dashSmartBtn = document.getElementById('dash-btn-smart-session');
    if (dashSmartBtn) {
      dashSmartBtn.addEventListener('click', () => {
        AUDIO.playClick();
        startSmartSession(20);
      });
    }

    const dashMockBtn = document.getElementById('dash-btn-official-mock');
    if (dashMockBtn) {
      dashMockBtn.addEventListener('click', () => {
        AUDIO.playClick();
        startOfficialQuiz();
      });
    }

    // Smart session cards (10Q, 20Q, 30Q)
    const btnSmart10 = document.getElementById('btn-smart-10');
    if (btnSmart10) btnSmart10.onclick = () => { AUDIO.playClick(); startSmartSession(10); };

    const btnSmart20 = document.getElementById('btn-smart-20');
    if (btnSmart20) btnSmart20.onclick = () => { AUDIO.playClick(); startSmartSession(20); };

    const btnSmart30 = document.getElementById('btn-smart-30');
    if (btnSmart30) btnSmart30.onclick = () => { AUDIO.playClick(); startSmartSession(30); };

    // Primary header button
    const btnHdrSimulacro = document.getElementById('hdr-btn-start-mock');
    if (btnHdrSimulacro) btnHdrSimulacro.addEventListener('click', () => {
      AUDIO.playClick();
      startOfficialQuiz();
    });

    // Official view start button
    const btnOfficialStart = document.getElementById('btn-start-official-50');
    if (btnOfficialStart) btnOfficialStart.addEventListener('click', () => {
      AUDIO.playClick();
      startOfficialQuiz();
    });

    // Historical exam cards
    const btn2023 = document.getElementById('btn-launch-2023');
    if (btn2023) btn2023.onclick = () => {
      AUDIO.playClick();
      startHistoricalExam('2023', 'Examen Oficial Noviembre 2023');
    };

    const btn2022 = document.getElementById('btn-launch-2022');
    if (btn2022) btn2022.onclick = () => {
      AUDIO.playClick();
      startHistoricalExam('2022', 'Examen Oficial Noviembre 2022');
    };

    const btnParcial1 = document.getElementById('btn-launch-parcial1');
    if (btnParcial1) btnParcial1.onclick = () => {
      AUDIO.playClick();
      startHistoricalExam('Parcial I', 'Examen Parcial I Oficial');
    };

    const btnPrueba2022 = document.getElementById('btn-launch-prueba2022');
    if (btnPrueba2022) btnPrueba2022.onclick = () => {
      AUDIO.playClick();
      startHistoricalExam('Prueba Nov 2022', 'Prueba Evaluación Nov 2022');
    };

    // Mistakes view actions
    const btnLaunchMistakes = document.getElementById('btn-start-mistakes-quiz');
    if (btnLaunchMistakes) btnLaunchMistakes.addEventListener('click', () => {
      AUDIO.playClick();
      startMistakesQuiz();
    });

    const btnLaunchMistakesPanel = document.getElementById('btn-start-mistakes-quiz-panel');
    if (btnLaunchMistakesPanel) btnLaunchMistakesPanel.addEventListener('click', () => {
      AUDIO.playClick();
      startMistakesQuiz();
    });

    const btnClearMistakes = document.getElementById('btn-clear-mistakes-bank');
    if (btnClearMistakes) {
      btnClearMistakes.addEventListener('click', function () {
        if (confirm('¿Estás seguro de que deseas vaciar el banco de fallos?')) {
          APP.mistakesBank = {};
          savePersistentStorage();
          updateGlobalHeaderStats();
          renderMistakesView();
          showToast('Banco de fallos vaciado', 'info');
        }
      });
    }

    const btnToggleDoubts = document.getElementById('btn-toggle-doubts-mode');
    if (btnToggleDoubts) {
      btnToggleDoubts.addEventListener('click', function () {
        AUDIO.playClick();
        APP.doubtsViewMode = APP.doubtsViewMode === 'stack' ? 'list' : 'stack';
        renderMistakesView();
      });
    }

    // Quiz controls
    const btnPrev = document.getElementById('btn-quiz-prev');
    if (btnPrev) btnPrev.onclick = () => goToQuestion(APP.activeQuiz ? APP.activeQuiz.currentIndex - 1 : 0);

    const btnNext = document.getElementById('btn-quiz-next');
    if (btnNext) btnNext.onclick = () => goToQuestion(APP.activeQuiz ? APP.activeQuiz.currentIndex + 1 : 0);

    const btnUnselect = document.getElementById('btn-quiz-unselect');
    if (btnUnselect) btnUnselect.onclick = clearCurrentAnswer;

    const btnFlag = document.getElementById('btn-quiz-flag');
    if (btnFlag) btnFlag.onclick = toggleFlagCurrent;

    const btnFinish = document.getElementById('btn-quiz-finish');
    if (btnFinish) btnFinish.onclick = finishQuiz;

    // Results screen actions
    const btnRetake = document.getElementById('btn-results-retake');
    if (btnRetake) {
      btnRetake.onclick = function () {
        AUDIO.playClick();
        if (APP.lastResult) {
          const qs = [...APP.lastResult.questions];
          shuffleArray(qs);
          setupQuizSession({
            name: 'Reintento: ' + APP.lastResult.name,
            questions: qs,
            isOfficial50: APP.lastResult.isOfficial50,
            timeLimitSec: APP.lastResult.isOfficial50 ? 3600 : qs.length * 72
          });
        } else {
          startOfficialQuiz();
        }
      };
    }

    const btnPracticeMistakes = document.getElementById('btn-results-practice-mistakes');
    if (btnPracticeMistakes) {
      btnPracticeMistakes.onclick = function () {
        AUDIO.playClick();
        startMistakesQuiz();
      };
    }

    const btnBackAnalytics = document.getElementById('btn-results-to-analytics');
    if (btnBackAnalytics) {
      btnBackAnalytics.onclick = function () {
        AUDIO.playClick();
        switchView('dashboard');
      };
    }

    // Ingestion action
    const btnIngest = document.getElementById('btn-submit-ingest');
    if (btnIngest) {
      btnIngest.onclick = handleCustomIngest;
    }

    // Backup & Data management actions
    const btnExportBackup = document.getElementById('btn-export-backup');
    if (btnExportBackup) {
      btnExportBackup.onclick = function () {
        AUDIO.playClick();
        exportBackupData();
      };
    }

    const btnImportBackupFile = document.getElementById('btn-import-backup-file');
    const backupFileInput = document.getElementById('backup-file-input');
    if (btnImportBackupFile && backupFileInput) {
      btnImportBackupFile.onclick = function () {
        AUDIO.playClick();
        backupFileInput.click();
      };
      backupFileInput.onchange = function (e) {
        if (e.target.files && e.target.files[0]) {
          handleImportBackupFile(e.target.files[0]);
          e.target.value = '';
        }
      };
    }

    const btnResetData = document.getElementById('btn-reset-data');
    if (btnResetData) {
      btnResetData.onclick = function () {
        AUDIO.playClick();
        resetLocalData();
      };
    }

    const btnRunAudit = document.getElementById('btn-run-data-audit');
    if (btnRunAudit) {
      btnRunAudit.onclick = function () {
        runDataAudit();
      };
    }
  }

  function handleCustomIngest() {
    const textarea = document.getElementById('ingest-json-input');
    if (!textarea) return;

    const val = textarea.value.trim();
    if (!val) {
      showToast('Introduce JSON o datos para importar', 'error');
      return;
    }

    try {
      const parsed = JSON.parse(val);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      let added = 0;
      let customList = [];

      try {
        const raw = localStorage.getItem('iso_custom_questions');
        if (raw) customList = JSON.parse(raw);
        if (!Array.isArray(customList)) customList = [];
      } catch (e) { customList = []; }

      items.forEach(function (item) {
        if (item.q && item.opts && item.opts.length === 2 && (item.ans === 0 || item.ans === 1)) {
          const newQ = {
            id: 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            t: item.t || 'T1',
            q: item.q,
            opts: item.opts,
            ans: item.ans,
            ex: item.ex || '',
            source: item.source || 'Importación Personalizada'
          };
          APP.questions.push(newQ);
          customList.push(newQ);
          added++;
        }
      });

      if (added > 0) {
        try {
          localStorage.setItem('iso_custom_questions', JSON.stringify(customList));
        } catch (e) {
          console.error('Error saving custom questions to localStorage:', e);
        }
        showToast(`Se han añadido y guardado ${added} preguntas al banco de datos.`, 'info');
        textarea.value = '';
        const qCountEl = document.getElementById('sidebar-q-count');
        if (qCountEl) qCountEl.textContent = APP.questions.length;
      } else {
        showToast('El formato no coincide con el esquema requerido (q, opts[2], ans, t)', 'error');
      }
    } catch (err) {
      showToast('Error al parsear JSON: ' + err.message, 'error');
    }
  }

  // ── Copias de Seguridad y Respaldo ────────────────────────────────
  function exportBackupData() {
    let customList = [];
    try {
      const raw = localStorage.getItem('iso_custom_questions');
      if (raw) customList = JSON.parse(raw);
    } catch (e) {}

    const backupObj = {
      app: 'ISO STUDIO 2.0',
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      testHistory: APP.testHistory,
      mistakesBank: APP.mistakesBank,
      learningState: APP.learningState,
      answerAttempts: APP.answerAttempts,
      personalAnnotations: APP.personalAnnotations,
      customQuestions: customList
    };

    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iso_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Copia de seguridad descargada exitosamente', 'success');
  }

  function handleImportBackupFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data && (Array.isArray(data.testHistory) || typeof data.mistakesBank === 'object')) {
          if (Array.isArray(data.testHistory)) {
            APP.testHistory = data.testHistory;
          }
          if (data.mistakesBank && typeof data.mistakesBank === 'object') {
            APP.mistakesBank = data.mistakesBank;
          }
          if (data.learningState && typeof data.learningState === 'object') {
            APP.learningState = data.learningState;
          }
          if (Array.isArray(data.answerAttempts)) {
            APP.answerAttempts = data.answerAttempts;
          }
          if (data.personalAnnotations && typeof data.personalAnnotations === 'object') {
            APP.personalAnnotations = data.personalAnnotations;
          }
          if (Array.isArray(data.customQuestions) && data.customQuestions.length > 0) {
            localStorage.setItem('iso_custom_questions', JSON.stringify(data.customQuestions));
            loadQuestions();
          }
          savePersistentStorage();
          updateGlobalHeaderStats();
          renderAnalyticsDashboard();
          showToast('Datos y estado de aprendizaje restaurados correctamente', 'info');
        } else {
          showToast('El archivo no tiene el formato de copia de seguridad esperado', 'error');
        }
      } catch (err) {
        showToast('Error al procesar el archivo JSON: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  }

  function resetLocalData() {
    if (confirm('ADVERTENCIA: ¿Estás seguro de que deseas restablecer TODOS los datos? Se borrará el historial de exámenes, la pila de fallos y el estado de aprendizaje.')) {
      if (confirm('Por favor confirma por segunda vez para proceder con el borrado definitivo.')) {
        try {
          localStorage.removeItem('iso_test_history');
          localStorage.removeItem('iso_mistakes_bank');
          localStorage.removeItem('iso_custom_questions');
          localStorage.removeItem('iso_learning_state');
          localStorage.removeItem('iso_answer_attempts');
          localStorage.removeItem('iso_personal_annotations');
        } catch (e) {}
        APP.testHistory = [];
        APP.mistakesBank = {};
        APP.learningState = {};
        APP.answerAttempts = [];
        APP.personalAnnotations = {};
        loadQuestions();
        updateGlobalHeaderStats();
        renderAnalyticsDashboard();
        renderStorageAuditInfo();
        showToast('Datos locales restablecidos correctamente', 'info');
      }
    }
  }

  // ── Auditoría y Estado del Almacén (Fase 3) ────────────────────────
  function renderStorageAuditInfo() {
    const container = document.getElementById('vault-audit-summary');
    if (!container) return;

    const schemaVer = localStorage.getItem('iso_schema_version') || '1';
    const vaultRaw = localStorage.getItem('iso_backup_vault');
    const vaultExists = Boolean(vaultRaw);
    let vaultDate = 'No requerido';
    if (vaultExists) {
      try {
        const v = JSON.parse(vaultRaw);
        vaultDate = v.snapshotAt ? v.snapshotAt.replace('T', ' ').slice(0, 16) : 'Presente';
      } catch (e) {}
    }

    const cov = LEARNING_ENGINE.getCoverageStats();
    const counts = LEARNING_ENGINE.getStateCounts();
    const attemptsCount = APP.answerAttempts.length;

    container.innerHTML = `
      <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px;">
        <div class="mono" style="font-size:0.72rem; color:var(--text-dim);">ESQUEMA LOCAL</div>
        <div style="font-weight:800; font-size:1.1rem; color:var(--text-pure); margin-top:4px;">Versión ${schemaVer}</div>
        <div style="font-size:0.75rem; color:var(--ok);">Integridad activa</div>
      </div>
      <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px;">
        <div class="mono" style="font-size:0.72rem; color:var(--text-dim);">SAFETY VAULT</div>
        <div style="font-weight:800; font-size:1.1rem; color:var(--text-pure); margin-top:4px;">${vaultExists ? 'Respaldo Seguro' : 'Estado Limpio'}</div>
        <div style="font-size:0.75rem; color:var(--text-dim);">${vaultDate}</div>
      </div>
      <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px;">
        <div class="mono" style="font-size:0.72rem; color:var(--text-dim);">COBERTURA ESTUDIO</div>
        <div style="font-weight:800; font-size:1.1rem; color:var(--accent); margin-top:4px;">${cov.coveragePercent}% (${cov.practiced}/${cov.total})</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${counts.mastered} dominadas</div>
      </div>
      <div style="background:var(--surface-raised); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px;">
        <div class="mono" style="font-size:0.72rem; color:var(--text-dim);">LOG DE RESPUESTAS</div>
        <div style="font-weight:800; font-size:1.1rem; color:var(--text-pure); margin-top:4px;">${attemptsCount} registros</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${LEARNING_ENGINE.getRetentionRate()}% retención</div>
      </div>
    `;
  }

  function runDataAudit() {
    AUDIO.playClick();
    const result = LEARNING_ENGINE.auditDataIntegrity();
    savePersistentStorage();
    renderStorageAuditInfo();
    renderBankView();
    showToast(`✓ Auditoría completada: ${result.totalQuestions} preguntas íntegras, ${result.fixedStates} estados corregidos, ${result.prunedStateOrphans} huérfanos eliminados.`, 'info', 4000);
  }

  // ── Toast Notification System ─────────────────────────────────────
  function showToast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = '';
    let borderColor = 'var(--border-light)';

    if (type === 'error') {
      borderColor = 'var(--err)';
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--err)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      borderColor = 'var(--ok)';
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    }

    toast.style.borderColor = borderColor;
    toast.innerHTML = `
      ${iconSvg}
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(function () {
      toast.style.animation = 'toastOut 0.2s forwards';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  // ── Helpers ───────────────────────────────────────────────────────
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function pickRandom(arr, count) {
    const copy = [...arr];
    shuffleArray(copy);
    return copy.slice(0, count);
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ── Global Interface for inline event handlers ────────────────────
  window.ISO_STUDIO = {
    startOfficialQuiz: startOfficialQuiz,
    startHistoricalExam: startHistoricalExam,
    startTopicTest: startTopicQuiz,
    startSmartSession: startSmartSession,
    generateSmartSessionQuestions: generateSmartSessionQuestions,
    renderSmartSessionConfig: renderSmartSessionConfig,
    getSmartSessionTelemetry: getSmartSessionTelemetry,
    startMistakesQuiz: startMistakesQuiz,
    startSpacedReviewSession: startSpacedReviewSession,
    exitSpacedReviewSession: exitSpacedReviewSession,
    revealSpacedReviewAnswer: revealSpacedReviewAnswer,
    rateSpacedQuestion: rateSpacedQuestion,
    renderSpacedRepetitionView: renderSpacedRepetitionView,
    switchView: switchView,
    switchSubtab: switchSubtab,
    exportBackupData: exportBackupData,
    runDataAudit: runDataAudit,
    learning: LEARNING_ENGINE,
    deleteDoubt: function (id) {
      AUDIO.playFanfare();
      delete APP.mistakesBank[id];
      const q = APP.questions.find(x => x.id === id);
      if (q) {
        LEARNING_ENGINE.recordAttempt({
          questionId: id,
          isCorrect: true,
          userAnswer: q.ans,
          confidence: 'medium',
          context: 'doubt_stack'
        });
      }
      savePersistentStorage();
      updateGlobalHeaderStats();
      renderMistakesView();
      showToast('✓ Pregunta eliminada de la pila', 'info');
    },
    toggleFavorite: function (questionId) {
      const isFav = LEARNING_ENGINE.toggleFavorite(questionId);
      renderBankView();
      showToast(isFav ? '★ Añadida a favoritos' : '☆ Eliminada de favoritos', 'info');
      return isFav;
    },
    setAnnotationNotes: debounce(function (questionId, text) {
      LEARNING_ENGINE.setAnnotation(questionId, { notes: text });
      const indicator = document.getElementById('note-saved-' + questionId);
      if (indicator) {
        indicator.style.display = 'inline';
        setTimeout(() => {
          if (indicator) indicator.style.display = 'none';
        }, 1500);
      }
    }, 350),
    inspectPastTest: function (testId) {
      const found = APP.testHistory.find(t => t.id === testId);
      if (found) {
        displayResultsScreen(found);
      } else {
        showToast('No se encontró el examen especificado', 'error');
      }
    },
    selectOption: selectOption,
    goToQuestion: goToQuestion,
    finishQuiz: finishQuiz,
    getActiveQuiz: function () { return APP.activeQuiz; },
    getApp: function () { return APP; }
  };

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
