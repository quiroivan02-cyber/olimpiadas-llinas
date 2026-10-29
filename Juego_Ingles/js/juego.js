// ==========================================
// ESTADO DEL JUEGO
// ==========================================
const estado = {
    nombre: "Estudiante",
    nivelActual: 1,
    preguntaActual: 0,
    correctasNivel: 0,
    puntajeTotal: 0,
    nivelesCompletados: 0,
    preguntaActiva: null,
    totalNiveles: 5,
    preguntasPorNivel: 10
};

// ==========================================
// BANCO DE PREGUNTAS (INGLÉS BÁSICO)
// ==========================================
const bancoNiveles = {
    1: [ // Colores, Animales y Números (0-10)
        { q: "¿Cómo se dice 'Rojo' en inglés?", correct: "Red", wrong: ["Blue", "Green", "Yellow"] },
        { q: "¿Qué color es 'Yellow'?", correct: "Amarillo", wrong: ["Azul", "Blanco", "Negro"] },
        { q: "¿Cómo se dice 'Perro' en inglés?", correct: "Dog", wrong: ["Cat", "Bird", "Fish"] },
        { q: "¿Qué animal es 'Cat'?", correct: "Gato", wrong: ["Ratón", "Perro", "Vaca"] },
        { q: "¿Cómo se escribe el número 1 en inglés?", correct: "One", wrong: ["Two", "Three", "Four"] },
        { q: "¿Qué número es 'Five'?", correct: "Cinco", wrong: ["Tres", "Cuatro", "Seis"] },
        { q: "¿Cómo se dice 'Azul' en inglés?", correct: "Blue", wrong: ["Black", "White", "Purple"] },
        { q: "¿Qué animal es 'Bird'?", correct: "Pájaro", wrong: ["Pez", "Caballo", "Cerdo"] },
        { q: "¿Cómo se escribe el número 10 en inglés?", correct: "Ten", wrong: ["Nine", "Eight", "Seven"] },
        { q: "¿Qué color es 'Green'?", correct: "Verde", wrong: ["Rojo", "Gris", "Naranja"] }
    ],
    2: [ // Partes del cuerpo y Familia
        { q: "¿Cómo se dice 'Cabeza' en inglés?", correct: "Head", wrong: ["Hand", "Leg", "Arm"] },
        { q: "¿Qué parte del cuerpo es 'Hand'?", correct: "Mano", wrong: ["Pie", "Pierna", "Ojo"] },
        { q: "¿Cómo se dice 'Madre' en inglés?", correct: "Mother", wrong: ["Father", "Sister", "Brother"] },
        { q: "¿Qué familiar es 'Father'?", correct: "Padre", wrong: ["Abuelo", "Tío", "Primo"] },
        { q: "¿Cómo se dice 'Hermano' en inglés?", correct: "Brother", wrong: ["Sister", "Cousin", "Uncle"] },
        { q: "¿Qué significa 'Eyes'?", correct: "Ojos", wrong: ["Orejas", "Boca", "Nariz"] },
        { q: "¿Cómo se dice 'Pierna' en inglés?", correct: "Leg", wrong: ["Arm", "Foot", "Knee"] },
        { q: "¿Qué significa 'Grandmother'?", correct: "Abuela", wrong: ["Madre", "Tía", "Hermana"] },
        { q: "¿Cómo se dice 'Boca' en inglés?", correct: "Mouth", wrong: ["Nose", "Ear", "Eye"] },
        { q: "¿Qué familiar es 'Sister'?", correct: "Hermana", wrong: ["Prima", "Tía", "Abuela"] }
    ],
    3: [ // Saludos, Despedidas y Expresiones
        { q: "¿Cómo se dice 'Hola' de forma casual?", correct: "Hello / Hi", wrong: ["Goodbye", "Please", "Thanks"] },
        { q: "¿Qué significa 'Good morning'?", correct: "Buenos días", wrong: ["Buenas tardes", "Buenas noches", "Adiós"] },
        { q: "¿Cómo se dice 'Adiós'?", correct: "Goodbye", wrong: ["Welcome", "Sorry", "Please"] },
        { q: "¿Qué significa 'Thank you'?", correct: "Gracias", wrong: ["Por favor", "De nada", "Perdón"] },
        { q: "¿Cómo se dice 'Por favor'?", correct: "Please", wrong: ["Sorry", "Thanks", "Hello"] },
        { q: "¿Qué dices para desear 'Buenas noches' (al ir a dormir)?", correct: "Good night", wrong: ["Good evening", "Good morning", "Good afternoon"] },
        { q: "¿Qué significa 'How are you?'?", correct: "¿Cómo estás?", wrong: ["¿Cómo te llamas?", "¿Dónde vives?", "¿Qué hora es?"] },
        { q: "¿Cómo respondes 'Estoy bien'?", correct: "I am fine", wrong: ["I am bad", "I am tired", "I am sleeping"] },
        { q: "¿Qué significa 'Sorry'?", correct: "Lo siento", wrong: ["Gracias", "Por favor", "De nada"] },
        { q: "¿Cómo se dice 'Buenas tardes'?", correct: "Good afternoon", wrong: ["Good morning", "Good night", "Good day"] }
    ],
    4: [ // Verbo To Be y Pronombres
        { q: "¿Qué pronombre significa 'Yo'?", correct: "I", wrong: ["You", "He", "She"] },
        { q: "¿Cómo se dice 'Él es' o 'Él está'?", correct: "He is", wrong: ["She is", "It is", "We are"] },
        { q: "¿Qué pronombre usamos para 'Nosotros'?", correct: "We", wrong: ["They", "You", "He"] },
        { q: "Completa: '___ am a student' (Yo soy un estudiante)", correct: "I", wrong: ["You", "He", "They"] },
        { q: "¿Cómo se dice 'Ellos son' o 'Ellos están'?", correct: "They are", wrong: ["We are", "You are", "It is"] },
        { q: "Completa: 'She ___ my friend' (Ella es mi amiga)", correct: "is", wrong: ["are", "am", "be"] },
        { q: "¿Qué pronombre se usa para cosas o animales (Eso/Ello)?", correct: "It", wrong: ["He", "She", "They"] },
        { q: "Completa: 'You ___ very tall' (Tú eres muy alto)", correct: "are", wrong: ["is", "am", "be"] },
        { q: "¿Qué significa 'She is happy'?", correct: "Ella está feliz", wrong: ["Él está feliz", "Yo estoy feliz", "Nosotros estamos felices"] },
        { q: "¿Cómo se dice 'Nosotros somos niños'?", correct: "We are children", wrong: ["They are children", "You are children", "I am child"] }
    ],
    5: [ // Días, Meses, Frases comunes y Objetos del Salón
        { q: "¿Cómo se dice 'Lunes' en inglés?", correct: "Monday", wrong: ["Tuesday", "Sunday", "Friday"] },
        { q: "¿Qué día es 'Friday'?", correct: "Viernes", wrong: ["Jueves", "Sábado", "Domingo"] },
        { q: "¿Cómo se dice 'Enero'?", correct: "January", wrong: ["February", "June", "July"] },
        { q: "¿Qué significa 'Pencil'?", correct: "Lápiz", wrong: ["Borrador", "Regla", "Cuaderno"] },
        { q: "¿Cómo se dice 'Libro' en inglés?", correct: "Book", wrong: ["Pen", "Desk", "Chair"] },
        { q: "¿Qué objeto es 'Eraser'?", correct: "Borrador", wrong: ["Tijeras", "Pegamento", "Lápiz"] },
        { q: "¿Cómo se dice 'Silla' en inglés?", correct: "Chair", wrong: ["Table", "Window", "Door"] },
        { q: "¿Qué significa 'Open your book'?", correct: "Abre tu libro", wrong: ["Cierra tu libro", "Lee tu libro", "Escribe en tu libro"] },
        { q: "¿Cómo se dice 'Puerta' en inglés?", correct: "Door", wrong: ["Window", "Floor", "Wall"] },
        { q: "¿Qué significa 'What is your name?'?", correct: "¿Cómo te llamas?", wrong: ["¿Cuántos años tienes?", "¿Dónde vives?", "¿Qué estás haciendo?"] }
    ]
};

// ==========================================
// REFERENCIAS AL DOM
// ==========================================
const pantallas = document.querySelectorAll('.pantalla');
const inputNombre = document.getElementById('nombre-estudiante');
const btnComenzar = document.getElementById('btn-comenzar');

const textoNivel = document.getElementById('texto-nivel');
const textoPuntaje = document.getElementById('texto-puntaje');
const barraProgreso = document.getElementById('barra-progreso');
const textoPregunta = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const mensajeRetro = document.getElementById('mensaje-retroalimentacion');
const btnSiguientePre = document.getElementById('btn-siguiente-pregunta');

const tituloNivel = document.getElementById('titulo-nivel-completado');
const nivelCorrectas = document.getElementById('nivel-correctas');
const mensajeMotivador = document.getElementById('mensaje-motivador');
const btnRepetirNivel = document.getElementById('btn-repetir-nivel');
const btnSiguienteNivel = document.getElementById('btn-siguiente-nivel');

const finalNombre = document.getElementById('final-nombre-estudiante');
const finalPuntaje = document.getElementById('final-puntaje');
const finalNiveles = document.getElementById('final-niveles');
const finalFecha = document.getElementById('final-fecha');
const btnImprimir = document.getElementById('btn-imprimir');
const btnJugarNuevo = document.getElementById('btn-jugar-nuevo');

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
function cambiarPantalla(idPantalla) {
    pantallas.forEach(p => p.classList.remove('activa'));
    document.getElementById(idPantalla).classList.add('activa');
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mezclarArreglo(arr) {
    let copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// ==========================================
// LÓGICA DEL JUEGO
// ==========================================
let preguntasMezcladasNivel = [];

function iniciarJuego() {
    const nombre = inputNombre.value.trim();
    if (nombre !== "") {
        estado.nombre = nombre;
    }
    estado.nivelActual = 1;
    estado.puntajeTotal = 0;
    estado.nivelesCompletados = 0;
    
    iniciarNivel();
}

function iniciarNivel() {
    estado.preguntaActual = 0;
    estado.correctasNivel = 0;
    
    preguntasMezcladasNivel = mezclarArreglo(bancoNiveles[estado.nivelActual]);
    
    textoNivel.textContent = estado.nivelActual;
    actualizarMarcador();
    
    cambiarPantalla('pantalla-juego');
    mostrarSiguientePregunta();
}

function actualizarMarcador() {
    textoPuntaje.textContent = estado.correctasNivel;
    const progreso = (estado.preguntaActual / estado.preguntasPorNivel) * 100;
    barraProgreso.style.width = progreso + '%';
}

function mostrarSiguientePregunta() {
    const preguntaBase = preguntasMezcladasNivel[estado.preguntaActual];
    
    estado.preguntaActiva = {
        texto: preguntaBase.q,
        respuestaCorrecta: preguntaBase.correct,
        opciones: mezclarArreglo([preguntaBase.correct, ...preguntaBase.wrong])
    };
    
    textoPregunta.textContent = estado.preguntaActiva.texto;
    contenedorOpciones.innerHTML = '';
    
    estado.preguntaActiva.opciones.forEach((opcion) => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcion';
        btn.textContent = opcion;
        btn.tabIndex = 0;
        btn.onclick = () => verificarRespuesta(btn, opcion);
        
        btn.onkeydown = (e) => {
            if(e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                verificarRespuesta(btn, opcion);
            }
        };

        contenedorOpciones.appendChild(btn);
    });

    mensajeRetro.className = 'oculto';
    btnSiguientePre.classList.add('oculto');
    
    const primerBoton = contenedorOpciones.querySelector('.btn-opcion');
    if (primerBoton) primerBoton.focus();
}

function verificarRespuesta(botonSeleccionado, valorSeleccionado) {
    const botones = contenedorOpciones.querySelectorAll('.btn-opcion');
    botones.forEach(b => {
        b.disabled = true;
        b.onclick = null;
        if (b.textContent === estado.preguntaActiva.respuestaCorrecta) {
            b.classList.add('correcta');
        }
    });

    mensajeRetro.classList.remove('oculto', 'mensaje-exito', 'mensaje-error');

    if (valorSeleccionado === estado.preguntaActiva.respuestaCorrecta) {
        botonSeleccionado.classList.add('correcta');
        estado.correctasNivel++;
        estado.puntajeTotal++;
        
        const frasesExito = ["Good!", "Great!", "Excellent!", "Perfect!"];
        mensajeRetro.textContent = frasesExito[aleatorio(0, frasesExito.length - 1)];
        mensajeRetro.classList.add('mensaje-exito');
    } else {
        botonSeleccionado.classList.add('incorrecta');
        mensajeRetro.textContent = `Incorrecto. La respuesta era: ${estado.preguntaActiva.respuestaCorrecta}`;
        mensajeRetro.classList.add('mensaje-error');
    }

    estado.preguntaActual++;
    actualizarMarcador();

    btnSiguientePre.classList.remove('oculto');
    btnSiguientePre.focus();
}

function avanzar() {
    if (estado.preguntaActual < estado.preguntasPorNivel) {
        mostrarSiguientePregunta();
    } else {
        finalizarNivel();
    }
}

function finalizarNivel() {
    nivelCorrectas.textContent = estado.correctasNivel;
    
    if (estado.correctasNivel >= 7) {
        estado.nivelesCompletados++;
        tituloNivel.textContent = "¡Level Complete! 🌟";
        mensajeMotivador.textContent = "¡Muy bien! Estás aprendiendo mucho inglés.";
        btnSiguienteNivel.classList.remove('oculto');
        btnRepetirNivel.classList.add('oculto');
        
        if (estado.nivelActual === estado.totalNiveles) {
            btnSiguienteNivel.textContent = "See Final Result 🏆";
        } else {
            btnSiguienteNivel.textContent = "Next Level ➡️";
        }
    } else {
        tituloNivel.textContent = "¡Sigue practicando! 💪";
        mensajeMotivador.textContent = "Necesitas 7 aciertos. Don't give up! (¡No te rindas!)";
        btnSiguienteNivel.classList.add('oculto');
        btnRepetirNivel.classList.remove('oculto');
    }
    
    cambiarPantalla('pantalla-nivel');
    
    if (!btnSiguienteNivel.classList.contains('oculto')) {
        btnSiguienteNivel.focus();
    } else {
        btnRepetirNivel.focus();
    }
}

function siguienteNivel() {
    if (estado.nivelActual < estado.totalNiveles) {
        estado.nivelActual++;
        iniciarNivel();
    } else {
        mostrarPantallaFinal();
    }
}

function mostrarPantallaFinal() {
    finalNombre.textContent = estado.nombre;
    finalPuntaje.textContent = estado.puntajeTotal;
    finalNiveles.textContent = estado.nivelesCompletados;
    
    const hoy = new Date();
    finalFecha.textContent = hoy.toLocaleDateString('es-ES');
    
    cambiarPantalla('pantalla-final');
    btnJugarNuevo.focus();
}

// ==========================================
// EVENTOS
// ==========================================
btnComenzar.addEventListener('click', iniciarJuego);

inputNombre.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') iniciarJuego();
});

btnSiguientePre.addEventListener('click', avanzar);

btnRepetirNivel.addEventListener('click', iniciarNivel);
btnSiguienteNivel.addEventListener('click', siguienteNivel);

btnJugarNuevo.addEventListener('click', () => {
    inputNombre.value = '';
    cambiarPantalla('pantalla-inicio');
});

btnImprimir.addEventListener('click', () => {
    window.print();
});
