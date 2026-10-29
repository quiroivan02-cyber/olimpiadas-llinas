(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const categoryButtons = [...document.querySelectorAll('.category-option')];
  let selectedBank = null;
  let selectedCategory = null;
  let questions = [];
  let questionIndex = 0;
  let level = 1;
  let score = 0;
  let correctAnswers = 0;
  let levelScore = 0;
  let levelCorrect = 0;
  let levelTime = 0;
  let startedAt = 0;
  let questionStartedAt = 0;
  let timerId = null;
  let locked = false;

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const pad = (value) => String(value).padStart(2, '0');
    return hours ? `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}` : `${pad(minutes)}:${pad(remainingSeconds)}`;
  }

  function setLoading(isLoading) {
    categoryButtons.forEach((button) => { button.disabled = isLoading; });
    $('btnStart').disabled = isLoading || !selectedBank;
    $('categoryStatus').textContent = isLoading ? 'Preparando preguntas…' : '';
  }

  function selectCategory(button) {
    selectedBank = null;
    selectedCategory = { label: button.dataset.label, subject: document.body.dataset.subject };
    categoryButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    $('gradeLabel').textContent = `${selectedCategory.subject.toUpperCase()} · ${selectedCategory.label.toUpperCase()}`;
    setLoading(true);
    const script = document.createElement('script');
    script.src = button.dataset.bank;
    script.onload = () => {
      selectedBank = window.OLIMPIADA_BANK;
      window.OLIMPIADA_BANK = null;
      script.remove();
      setLoading(false);
    };
    script.onerror = () => {
      script.remove();
      $('categoryStatus').textContent = 'No se pudieron cargar las preguntas. Selecciona la categoría para reintentar.';
      categoryButtons.forEach((item) => { item.disabled = false; });
      $('btnStart').disabled = true;
    };
    document.body.appendChild(script);
  }

  function shuffle(options) {
    for (let index = options.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
    }
    return options;
  }

  function updateCounters() {
    const totalQuestions = questions.length;
    const totalLevels = totalQuestions / 10;
    $('levelCounter').textContent = `${level} / ${totalLevels}`;
    $('questionCounter').textContent = `${Math.min(questionIndex + 1, totalQuestions)} / ${totalQuestions}`;
    $('scoreCounter').textContent = score.toLocaleString('es-CO');
    $('timerCounter').textContent = formatTime(Date.now() - startedAt);
    $('progressBar').style.width = `${(questionIndex / totalQuestions) * 100}%`;
  }

  function startCompetition() {
    if (!selectedBank) return;
    questions = selectedBank;
    selectedBank = null;
    questionIndex = 0;
    level = 1;
    score = 0;
    correctAnswers = 0;
    levelScore = 0;
    levelCorrect = 0;
    levelTime = 0;
    startedAt = Date.now();
    $('participant').textContent = $('playerName').value.trim() ? `Participante: ${$('playerName').value.trim()}` : 'Participante';
    $('startScreen').hidden = true;
    $('resultScreen').hidden = true;
    $('gameScreen').hidden = false;
    timerId = window.setInterval(updateCounters, 1000);
    showQuestion();
  }

  function showQuestion() {
    locked = false;
    const question = questions[questionIndex];
    questionStartedAt = Date.now();
    updateCounters();
    $('questionLabel').textContent = `PREGUNTA ${questionIndex + 1} · ${selectedCategory.subject.toUpperCase()}`;
    $('questionText').textContent = question.text;
    $('feedback').textContent = '';
    const answers = shuffle(question.options.map((text, index) => ({ text, correct: index === question.answer })));
    const container = $('answers');
    container.replaceChildren();
    answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-option';
      const letter = document.createElement('span');
      letter.className = 'answer-letter';
      letter.textContent = 'ABCD'[index];
      button.append(letter, document.createTextNode(answer.text));
      button.addEventListener('click', () => answerQuestion(index, answers));
      container.appendChild(button);
    });
  }

  function answerQuestion(selectedIndex, answers) {
    if (locked) return;
    locked = true;
    const buttons = $('answers').querySelectorAll('button');
    buttons.forEach((button) => { button.disabled = true; });
    const elapsed = Date.now() - questionStartedAt;
    const elapsedSeconds = Math.floor(elapsed / 1000);
    levelTime += elapsed;
    if (answers[selectedIndex].correct) {
      const points = level * 10 + Math.max(0, 10 - Math.floor(elapsedSeconds / 3));
      score += points;
      levelScore += points;
      correctAnswers += 1;
      levelCorrect += 1;
      buttons[selectedIndex].classList.add('correct');
      $('feedback').textContent = `¡Correcto! +${points} puntos`;
    } else {
      buttons[selectedIndex].classList.add('incorrect');
      buttons[answers.findIndex((answer) => answer.correct)].classList.add('correct');
      $('feedback').textContent = 'Respuesta incorrecta. Continuamos con la próxima.';
    }
    questionIndex += 1;
    updateCounters();
    window.setTimeout(() => {
      if (questionIndex === questions.length) showResults(true);
      else if (questionIndex % 10 === 0) showResults(false);
      else showQuestion();
    }, 500);
  }

  function showResults(finalResult) {
    if (finalResult) {
      window.clearInterval(timerId);
      timerId = null;
    }
    $('gameScreen').hidden = true;
    $('resultScreen').hidden = false;
    $('resultLabel').textContent = finalResult ? 'COMPETENCIA COMPLETADA' : `RESULTADO DEL NIVEL ${level}`;
    $('resultTitle').textContent = finalResult ? `¡Terminaste las ${questions.length} preguntas!` : `Nivel ${level} completado`;
    $('resultSummary').textContent = $('playerName').value.trim() ? `Buen trabajo, ${$('playerName').value.trim()}.` : 'Buen trabajo. Aquí está tu resultado.';
    const rows = finalResult
      ? [['Puntaje final', score.toLocaleString('es-CO')], ['Aciertos', `${correctAnswers} / ${questions.length}`], ['Tiempo total', formatTime(Date.now() - startedAt)]]
      : [['Puntaje del nivel', levelScore.toLocaleString('es-CO')], ['Aciertos', `${levelCorrect} / 10`], ['Tiempo del nivel', formatTime(levelTime)]];
    const grid = $('resultGrid');
    grid.replaceChildren();
    rows.forEach(([label, value]) => {
      const cell = document.createElement('div');
      const caption = document.createElement('span');
      const result = document.createElement('strong');
      caption.textContent = label;
      result.textContent = value;
      cell.append(caption, result);
      grid.appendChild(cell);
    });
    $('continueButton').textContent = finalResult ? 'Elegir otra categoría' : 'Siguiente nivel';
    $('continueButton').onclick = () => {
      $('resultScreen').hidden = true;
      if (finalResult) {
        questions = [];
        selectedCategory = null;
        categoryButtons.forEach((button) => {
          button.classList.remove('selected');
          button.setAttribute('aria-pressed', 'false');
        });
        $('categoryStatus').textContent = '';
        $('gradeLabel').textContent = `${document.body.dataset.subject.toUpperCase()} · SELECCIONA EL GRADO`;
        $('btnStart').disabled = true;
        $('startScreen').hidden = false;
      } else {
        level += 1;
        levelScore = 0;
        levelCorrect = 0;
        levelTime = 0;
        $('gameScreen').hidden = false;
        showQuestion();
      }
    };
  }

  categoryButtons.forEach((button) => button.addEventListener('click', () => selectCategory(button)));
  $('btnStart').addEventListener('click', startCompetition);
  $('playerName').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !$('btnStart').disabled) startCompetition();
  });
})();
