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
    lastResult: null,
    timerHandle: null,
    activeReviewFilter: 'all',

    // Topic metadata
    topicMeta: {
      T1: { title: 'T1: Introducción a los SSOO', color: '#8CB1F7', officialExamShare: 8 },
      T2: { title: 'T2: Procesos y Concurrencia', color: '#B39DF2', officialExamShare: 20 },
      T3: { title: 'T3: Gestión de Memoria', color: '#52D195', officialExamShare: 6 },
      T4: { title: 'T4: E/S y Sistema de Ficheros', color: '#F5B054', officialExamShare: 16 },
      T5: { title: 'T5: Seguridad y Protección', color: '#E88AA7', officialExamShare: 0 },
      T6: { title: 'T6: Sistemas Distribuidos', color: '#A8A8C0', officialExamShare: 0 }
    }
  };

  // ── Initialization ────────────────────────────────────────────────
  function init() {
    loadQuestions();
    loadPersistentStorage();
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
    if (window.BASE_QUESTIONS && Array.isArray(window.BASE_QUESTIONS)) {
      APP.questions = window.BASE_QUESTIONS;
    } else {
      console.warn('BASE_QUESTIONS not found on window, fallback to empty array.');
      APP.questions = [];
    }
    const qCountEl = document.getElementById('sidebar-q-count');
    if (qCountEl) qCountEl.textContent = APP.questions.length;
  }

  function loadPersistentStorage() {
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
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
  }

  function savePersistentStorage() {
    try {
      localStorage.setItem('iso_test_history', JSON.stringify(APP.testHistory));
      localStorage.setItem('iso_mistakes_bank', JSON.stringify(APP.mistakesBank));
      localStorage.setItem('iso_sidebar_collapsed', APP.sidebarCollapsed ? 'true' : 'false');
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

  // ── View Routing ──────────────────────────────────────────────────
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const view = this.getAttribute('data-view');
        if (view) {
          switchView(view);
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('mobile-open');
        }
      });
    });
  }

  function switchView(viewKey) {
    // If active quiz is running and user tries to navigate away, prompt confirmation
    if (APP.activeQuiz && APP.currentView === 'quiz' && viewKey !== 'quiz' && viewKey !== 'results') {
      if (!confirm('Hay un simulacro de examen en curso. ¿Deseas salir? El progreso se descartará.')) {
        return;
      }
      stopQuizTimer();
      APP.activeQuiz = null;
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
        dashboard: 'Analítica de Rendimiento',
        official: 'Simulacro Oficial (50 Preguntas)',
        exams: 'Exámenes Históricos UMU',
        topics: 'Entrenador por Temas',
        mistakes: 'Banco y Repaso de Fallos',
        bank: 'Auditor de Preguntas (358)',
        history: 'Historial de Exámenes',
        ingest: 'Ingesta de Preguntas',
        quiz: 'Simulador de Examen',
        results: 'Informe de Resultados'
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

    // View-specific render hooks
    if (viewKey === 'dashboard') {
      renderAnalyticsDashboard();
    } else if (viewKey === 'mistakes') {
      renderMistakesView();
    } else if (viewKey === 'bank') {
      renderBankView();
    } else if (viewKey === 'history') {
      renderHistoryView();
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

    if (statTestsEl) statTestsEl.textContent = totalTests;
    if (statPassEl) statPassEl.textContent = passRate + '%';
    if (statMistakesEl) statMistakesEl.textContent = mistakeCount;
  }

  // ── Analytics Dashboard (Home Screen) ─────────────────────────────
  function renderAnalyticsDashboard() {
    const totalTests = APP.testHistory.length;
    let totalScore = 0;
    let totalNet = 0;
    let passCount = 0;

    APP.testHistory.forEach(function (test) {
      totalScore += test.score;
      totalNet += test.net;
      if (test.passed) passCount++;
    });

    const avgScore = totalTests > 0 ? (totalScore / totalTests).toFixed(2) : '0.00';
    const passRate = totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0;
    const avgNet = totalTests > 0 ? (totalNet / totalTests).toFixed(1) : '0.0';

    // Count mastered questions (questions answered correctly in tests without current mistakes)
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

    // Populate stat cards
    const cardTests = document.getElementById('dash-total-tests');
    const cardPass = document.getElementById('dash-pass-rate');
    const cardScore = document.getElementById('dash-avg-score');
    const cardNet = document.getElementById('dash-total-net');
    const cardMastered = document.getElementById('dash-mastered');

    if (cardTests) cardTests.textContent = totalTests;
    if (cardPass) cardPass.textContent = passRate + '%';
    if (cardScore) cardScore.textContent = avgScore;
    if (cardNet) cardNet.textContent = (totalNet >= 0 ? '+' : '') + totalNet;
    if (cardMastered) cardMastered.textContent = masteredCount + ' / ' + APP.questions.length;

    // Render SVG Score Progression Chart
    renderProgressionChart();

    // Render Radar & Topic Health
    renderTopicHealth();

    // Render Recent History Table
    renderRecentHistoryTable();
  }

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
          <div style="font-size:0.84rem; max-width:440px; margin-bottom:16px;">Completa tu primer simulacro oficial de 50 preguntas para visualizar tu curva de aprendizaje y evolución de nota con respecto al corte (5.0 / 16 netos).</div>
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

    // Y scale: 0 to 10.0
    const getY = (val) => padY + plotH - (val / 10.0) * plotH;
    const getX = (idx) => n === 1 ? padX + plotW / 2 : padX + (idx / (n - 1)) * plotW;

    // Pass line at 5.0
    const yPass = getY(5.0);

    // Build polyline points
    const points = scores.map((val, idx) => `${getX(idx).toFixed(1)},${getY(val).toFixed(1)}`).join(' ');

    // Build area polygon points
    const firstX = getX(0).toFixed(1);
    const lastX = getX(n - 1).toFixed(1);
    const bottomY = (padY + plotH).toFixed(1);
    const areaPoints = `${firstX},${bottomY} ${points} ${lastX},${bottomY}`;

    // Generate SVG HTML
    let svgHtml = `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%; overflow:visible;">
        <defs>
          <linearGradient id="chartFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F6E6EA" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#F6E6EA" stop-opacity="0.0"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Horizontal Grid Lines -->
        <line x1="${padX}" y1="${getY(0)}" x2="${width - padX}" y2="${getY(0)}" stroke="#2D2D44" stroke-width="1"/>
        <text x="${padX - 10}" y="${getY(0) + 4}" fill="#727292" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">0.0</text>

        <line x1="${padX}" y1="${getY(2.5)}" x2="${width - padX}" y2="${getY(2.5)}" stroke="#222234" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${padX - 10}" y="${getY(2.5) + 4}" fill="#727292" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">2.5</text>

        <!-- PASS LINE AT 5.0 -->
        <line x1="${padX}" y1="${yPass}" x2="${width - padX}" y2="${yPass}" stroke="#F26171" stroke-width="1.5" stroke-dasharray="5,4"/>
        <text x="${padX - 10}" y="${yPass + 4}" fill="#FFA5AE" font-size="11" font-weight="700" font-family="'IBM Plex Mono', monospace" text-anchor="end">5.0</text>
        <text x="${width - padX + 8}" y="${yPass + 4}" fill="#FFA5AE" font-size="10" font-weight="700" font-family="'IBM Plex Mono', monospace">CORTE 16 NETOS</text>

        <line x1="${padX}" y1="${getY(7.5)}" x2="${width - padX}" y2="${getY(7.5)}" stroke="#222234" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${padX - 10}" y="${getY(7.5) + 4}" fill="#727292" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">7.5</text>

        <line x1="${padX}" y1="${getY(10)}" x2="${width - padX}" y2="${getY(10)}" stroke="#2D2D44" stroke-width="1"/>
        <text x="${padX - 10}" y="${getY(10) + 4}" fill="#727292" font-size="11" font-family="'IBM Plex Mono', monospace" text-anchor="end">10.0</text>

        <!-- Area fill under curve -->
        <polygon points="${areaPoints}" fill="url(#chartFillGrad)"/>

        <!-- Score Polyline -->
        <polyline points="${points}" fill="none" stroke="#F6E6EA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
    `;

    // Data circles
    historySlice.forEach((t, idx) => {
      const cx = getX(idx);
      const cy = getY(t.score);
      const isPass = t.passed;
      const pointColor = isPass ? '#52D195' : '#F26171';
      const dateStr = (t.date || '').split('T')[0] || `T${idx + 1}`;

      svgHtml += `
        <g class="chart-point-group" style="cursor:pointer;">
          <circle cx="${cx}" cy="${cy}" r="6" fill="${pointColor}" stroke="#141420" stroke-width="2.5"/>
          <circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${pointColor}" stroke-opacity="0.3" stroke-width="2"/>
          <text x="${cx}" y="${cy - 12}" fill="#FFFFFF" font-size="11" font-weight="800" font-family="'IBM Plex Mono', monospace" text-anchor="middle">${Number(t.score).toFixed(1)}</text>
          <text x="${cx}" y="${padY + plotH + 18}" fill="#9D9097" font-size="10" font-family="'IBM Plex Mono', monospace" text-anchor="middle">${dateStr.slice(5)}</text>
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
    const matching = APP.questions.filter(q => (q.source || '').toLowerCase().includes(examSourceKeyword.toLowerCase()));
    if (matching.length === 0) {
      showToast(`No se encontraron preguntas para el examen: ${displayName}`, 'error');
      return;
    }

    // Sort by id / exam question number or shuffle
    const questions = [...matching];
    shuffleArray(questions);

    setupQuizSession({
      name: displayName,
      questions: questions,
      isOfficial50: questions.length === 50,
      timeLimitSec: Math.round(questions.length * 72) // 72 seconds per question (~60 min for 50Q)
    });
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
      isOfficial50: !!config.isOfficial50,
      timeLimitSec: config.timeLimitSec || 3600,
      remainingSec: config.timeLimitSec || 3600,
      startTime: Date.now()
    };

    renderQuizHUD();
    renderQuizNavigator();
    renderCurrentQuestion();
    startQuizTimer();

    switchView('quiz');
    showToast(`Comenzando: ${config.name}`, 'info');
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

    // Stem text
    const stemEl = document.getElementById('quiz-stem-text');
    if (stemEl) {
      stemEl.textContent = currentQ.q;
    }

    // Options container
    const optionsContainer = document.getElementById('quiz-options-container');
    if (optionsContainer) {
      const userSelected = quiz.userAnswers[idx];
      const opts = currentQ.opts || ['Verdadero', 'Falso'];
      let html = '';

      opts.forEach(function (optText, optIdx) {
        const isSelected = userSelected === optIdx;
        const keyLetter = optIdx === 0 ? 'A' : 'B';

        html += `
          <div class="opt-tile ${isSelected ? 'selected' : ''}" data-opt-idx="${optIdx}" tabindex="0" role="button" aria-pressed="${isSelected}">
            <div class="opt-key-badge mono">${keyLetter}</div>
            <div class="opt-body-text">${escapeHtml(optText)}</div>
          </div>
        `;
      });

      optionsContainer.innerHTML = html;

      // Click listeners on option cards
      const tiles = optionsContainer.querySelectorAll('.opt-tile');
      tiles.forEach(function (tile) {
        tile.addEventListener('click', function () {
          const optIndex = parseInt(this.getAttribute('data-opt-idx'), 10);
          selectOption(optIndex);
        });
      });
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
  }

  function updateNavigatorHighlights() {
    const navStrip = document.getElementById('quiz-navigator');
    if (!navStrip || !APP.activeQuiz) return;

    const pills = navStrip.querySelectorAll('.nav-grid-pill');
    pills.forEach(function (pill, i) {
      const isCurrent = i === APP.activeQuiz.currentIndex;
      const isAnswered = APP.activeQuiz.userAnswers[i] !== undefined;
      const isFlagged = !!APP.activeQuiz.flags[i];

      pill.classList.toggle('current', isCurrent);
      pill.classList.toggle('answered', isAnswered);
      pill.classList.toggle('flagged', isFlagged);
    });
  }

  function goToQuestion(newIndex) {
    if (!APP.activeQuiz) return;
    if (newIndex >= 0 && newIndex < APP.activeQuiz.totalQ) {
      APP.activeQuiz.currentIndex = newIndex;
      renderCurrentQuestion();
    }
  }

  function selectOption(optIndex) {
    if (!APP.activeQuiz) return;
    const idx = APP.activeQuiz.currentIndex;

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
      delete APP.activeQuiz.userAnswers[idx];
      renderCurrentQuestion();
      showToast('Respuesta desmarcada (En blanco: 0 ptos)', 'info');
    }
  }

  function toggleFlagCurrent() {
    if (!APP.activeQuiz) return;
    const idx = APP.activeQuiz.currentIndex;
    APP.activeQuiz.flags[idx] = !APP.activeQuiz.flags[idx];
    renderCurrentQuestion();
  }

  // ── Keyboard Shortcuts ────────────────────────────────────────────
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', function (e) {
      // Don't intercept if focus is inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }

      if (APP.currentView === 'quiz' && APP.activeQuiz) {
        if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          selectOption(0);
        } else if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          selectOption(1);
        } else if (e.key === 'd' || e.key === 'D' || e.key === ' ') {
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
        `Tienes ${blankCount} preguntas en blanco (no contestadas). En el examen de la UMU las preguntas en blanco NO restan, pero no suman. ¿Deseas entregar el examen ahora?`
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
      if (userAns === undefined) {
        topicBreakdown[topKey].blank++;
      } else if (userAns === q.ans) {
        correctCount++;
        topicBreakdown[topKey].correct++;
        // If question was previously failed, remove or decrement in mistakesBank
        if (APP.mistakesBank[q.id]) {
          delete APP.mistakesBank[q.id];
        }
      } else {
        wrongCount++;
        topicBreakdown[topKey].wrong++;
        // Add to mistakes bank
        APP.mistakesBank[q.id] = (APP.mistakesBank[q.id] || 0) + 1;
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
      net: netPoints,
      score: score.toFixed(2),
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

    // Score display with count-up animation
    const scoreNumEl = document.getElementById('res-score-num');
    if (scoreNumEl) {
      animateScore(0, Number(result.score), scoreNumEl);
    }

    // Status subtitle
    const statusSubEl = document.getElementById('res-status-sub');
    if (statusSubEl) {
      if (result.passed) {
        statusSubEl.innerHTML = `
          <span style="color:var(--ok); font-weight:800;">APROBADO</span> — Puntuación Neta: 
          <strong>${result.net} puntos</strong> (Corte oficial superado: ≥ 16 netos).
        `;
      } else {
        statusSubEl.innerHTML = `
          <span style="color:var(--err); font-weight:800;">SUSPENSO</span> — Puntuación Neta: 
          <strong>${result.net} puntos</strong> (Se requieren al menos 16 puntos netos para aprobar).
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
          optStyle = 'background:rgba(82, 209, 149, 0.12); border:1.5px solid var(--ok); color:#FFFFFF; font-weight:700;';
          marker = `<span class="mono" style="color:var(--ok); font-size:0.78rem; font-weight:800; margin-left:auto;">[CORRECTA OFICIAL]</span>`;
        } else if (isUserChoice && !isCorrect) {
          optStyle = 'background:rgba(242, 97, 113, 0.12); border:1.5px solid var(--err); color:#FFA5AE;';
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

  // ── Mistakes View ─────────────────────────────────────────────────
  function renderMistakesView() {
    const countBadge = document.getElementById('mistakes-total-count');
    const mistakeIds = Object.keys(APP.mistakesBank);

    if (countBadge) countBadge.textContent = mistakeIds.length;

    const listContainer = document.getElementById('mistakes-items-list');
    if (!listContainer) return;

    if (mistakeIds.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:48px 16px; color:var(--text-dim);">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="1.8" style="margin-bottom:12px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div style="font-size:1.1rem; font-weight:800; color:var(--text-pure); margin-bottom:6px;">¡Excelente! Banco de fallos limpio</div>
          <div style="font-size:0.86rem; max-width:440px; margin:0 auto;">No tienes preguntas falladas pendientes de dominar. Cuando cometas errores en simulacros, aparecerán aquí para que puedas repasarlas.</div>
        </div>
      `;
      return;
    }

    const idSet = new Set(mistakeIds);
    const mistakes = APP.questions.filter(q => idSet.has(q.id));

    let html = '';
    mistakes.forEach(function (q, idx) {
      const topKey = q.t || 'T1';
      const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };
      const failCount = APP.mistakesBank[q.id] || 1;

      html += `
        <div class="review-item-card is-mistake">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="topic-tag mono" style="background:rgba(255,255,255,0.06); color:${meta.color}; border:1px solid ${meta.color}40;">${topKey}</span>
              <span class="mono" style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(q.source || '')}</span>
            </div>
            <span class="mono" style="color:var(--err); font-size:0.75rem; font-weight:800; background:var(--err-bg); padding:3px 8px; border-radius:4px; border:1px solid var(--err-border);">
              Fallada ${failCount} ${failCount === 1 ? 'vez' : 'veces'}
            </span>
          </div>
          <div style="font-size:1.02rem; font-weight:700; color:var(--text-pure); line-height:1.55; margin-bottom:12px;">
            ${escapeHtml(q.q)}
          </div>
          <div style="background:var(--surface-raised); border-left:3px solid var(--ok); padding:10px 14px; border-radius:4px; font-size:0.88rem; color:#FFFFFF; margin-bottom:10px;">
            <strong>Respuesta Correcta:</strong> [${q.ans === 0 ? 'A' : 'B'}] ${escapeHtml(q.opts[q.ans])}
          </div>
          ${q.ex ? `<div style="font-size:0.84rem; color:var(--text-muted); line-height:1.5;">${escapeHtml(q.ex)}</div>` : ''}
        </div>
      `;
    });

    listContainer.innerHTML = html;
  }

  // ── Question Bank Auditor View ────────────────────────────────────
  function renderBankView() {
    const searchInput = document.getElementById('bank-search-input');
    const topicFilter = document.getElementById('bank-topic-filter');
    const container = document.getElementById('bank-questions-container');
    const countBadge = document.getElementById('bank-match-count');

    function applyFilter() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      const topic = topicFilter?.value || 'ALL';

      const filtered = APP.questions.filter(function (q) {
        if (topic !== 'ALL' && q.t !== topic) return false;
        if (!query) return true;
        const stemMatch = (q.q || '').toLowerCase().includes(query);
        const optsMatch = (q.opts || []).some(o => o.toLowerCase().includes(query));
        const exMatch = (q.ex || '').toLowerCase().includes(query);
        return stemMatch || optsMatch || exMatch;
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

        // Limit rendering to first 100 for performance if list is long
        const slice = filtered.slice(0, 80);
        let html = '';

        slice.forEach(function (q, idx) {
          const topKey = q.t || 'T1';
          const meta = APP.topicMeta[topKey] || { title: topKey, color: '#8CB1F7' };

          html += `
            <div class="review-item-card" style="margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="mono" style="font-size:0.75rem; color:var(--text-dim); font-weight:700;">#${idx + 1}</span>
                  <span class="topic-tag mono" style="background:rgba(255,255,255,0.06); color:${meta.color}; border:1px solid ${meta.color}40;">${topKey}</span>
                  <span class="mono" style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(q.source || '')}</span>
                </div>
              </div>
              <div style="font-size:1rem; font-weight:700; color:var(--text-pure); margin-bottom:12px; line-height:1.55;">
                ${escapeHtml(q.q)}
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
                <div style="padding:6px 12px; border-radius:4px; font-size:0.86rem; ${q.ans === 0 ? 'border:1px solid var(--ok); background:rgba(82,209,149,0.1); color:#FFFFFF; font-weight:700;' : 'background:var(--surface-raised); color:var(--text-muted);'}">
                  <strong>[A]</strong> ${escapeHtml(q.opts[0])}
                </div>
                <div style="padding:6px 12px; border-radius:4px; font-size:0.86rem; ${q.ans === 1 ? 'border:1px solid var(--ok); background:rgba(82,209,149,0.1); color:#FFFFFF; font-weight:700;' : 'background:var(--surface-raised); color:var(--text-muted);'}">
                  <strong>[B]</strong> ${escapeHtml(q.opts[1])}
                </div>
              </div>
              ${q.ex ? `<div style="font-size:0.82rem; color:var(--text-muted); background:var(--surface-raised); padding:8px 12px; border-radius:4px; line-height:1.45;"><strong>Explicación:</strong> ${escapeHtml(q.ex)}</div>` : ''}
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
    // Primary header button
    const btnHdrSimulacro = document.getElementById('hdr-btn-start-mock');
    if (btnHdrSimulacro) btnHdrSimulacro.addEventListener('click', startOfficialQuiz);

    // Official view start button
    const btnOfficialStart = document.getElementById('btn-start-official-50');
    if (btnOfficialStart) btnOfficialStart.addEventListener('click', startOfficialQuiz);

    // Historical exam cards
    const btn2023 = document.getElementById('btn-launch-2023');
    if (btn2023) btn2023.onclick = () => startHistoricalExam('2023', 'Examen Oficial Noviembre 2023 (UMU)');

    const btn2022 = document.getElementById('btn-launch-2022');
    if (btn2022) btn2022.onclick = () => startHistoricalExam('2022', 'Examen Oficial Noviembre 2022 (UMU)');

    const btnParcial1 = document.getElementById('btn-launch-parcial1');
    if (btnParcial1) btnParcial1.onclick = () => startHistoricalExam('Parcial I', 'Examen Parcial I Oficial (UMU)');

    const btnPrueba2022 = document.getElementById('btn-launch-prueba2022');
    if (btnPrueba2022) btnPrueba2022.onclick = () => startHistoricalExam('Prueba Nov 2022', 'Prueba Evaluación Nov 2022 (UMU)');

    // Mistakes view actions
    const btnLaunchMistakes = document.getElementById('btn-start-mistakes-quiz');
    if (btnLaunchMistakes) btnLaunchMistakes.addEventListener('click', startMistakesQuiz);

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
        startMistakesQuiz();
      };
    }

    const btnBackAnalytics = document.getElementById('btn-results-to-analytics');
    if (btnBackAnalytics) {
      btnBackAnalytics.onclick = function () {
        switchView('dashboard');
      };
    }

    // Ingestion action
    const btnIngest = document.getElementById('btn-submit-ingest');
    if (btnIngest) {
      btnIngest.onclick = handleCustomIngest;
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
          added++;
        }
      });

      if (added > 0) {
        showToast(`Se han añadido ${added} preguntas al banco de datos.`, 'info');
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
    startMistakesQuiz: startMistakesQuiz,
    switchView: switchView,
    inspectPastTest: function (testId) {
      const found = APP.testHistory.find(t => t.id === testId);
      if (found) {
        displayResultsScreen(found);
      } else {
        showToast('No se encontró el examen especificado', 'error');
      }
    }
  };

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
