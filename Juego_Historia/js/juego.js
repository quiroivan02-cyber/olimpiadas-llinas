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
// BANCO DE PREGUNTAS (HISTORIA COLOMBIANA)
// ==========================================
const bancoNiveles = {
    1: [ // Geografía y Símbolos
        { q: "¿Cuál es la capital de Colombia?", correct: "Bogotá", wrong: ["Medellín", "Cali", "Cartagena"] },
        { q: "¿Qué colores tiene la bandera de Colombia?", correct: "Amarillo, Azul y Rojo", wrong: ["Blanco, Azul y Rojo", "Verde, Blanco y Rojo", "Amarillo, Verde y Rojo"] },
        { q: "¿Cuál es el ave nacional de Colombia?", correct: "El Cóndor de los Andes", wrong: ["El Águila Arpía", "El Colibrí", "El Tucán"] },
        { q: "¿Cuál es la flor nacional de Colombia?", correct: "La Orquídea", wrong: ["La Rosa", "El Girasol", "La Margarita"] },
        { q: "¿Qué océano baña la costa oeste de Colombia?", correct: "Océano Pacífico", wrong: ["Océano Atlántico", "Océano Índico", "Mar Caribe"] },
        { q: "¿Cuál es el árbol nacional de Colombia?", correct: "La Palma de Cera", wrong: ["El Roble", "El Guayacán", "El Cedro"] },
        { q: "¿Cuántos departamentos tiene Colombia?", correct: "32 departamentos", wrong: ["24 departamentos", "50 departamentos", "30 departamentos"] },
        { q: "¿Qué cordillera atraviesa Colombia?", correct: "La Cordillera de los Andes", wrong: ["Los Alpes", "El Himalaya", "Las Montañas Rocosas"] },
        { q: "¿Con qué país no limita Colombia?", correct: "Bolivia", wrong: ["Ecuador", "Perú", "Brasil"] },
        { q: "¿Qué mar baña la costa norte de Colombia?", correct: "Mar Caribe (Atlántico)", wrong: ["Mar Mediterráneo", "Mar Rojo", "Océano Pacífico"] }
    ],
    2: [ // Época Precolombina
        { q: "¿Qué famosa leyenda indígena habla de una ciudad de oro?", correct: "La leyenda de El Dorado", wrong: ["La leyenda de la Llorona", "La leyenda de la Patasola", "La leyenda del Jinete sin cabeza"] },
        { q: "¿Cuál de estas culturas indígenas es colombiana?", correct: "Muiscas", wrong: ["Aztecas", "Incas", "Mayas"] },
        { q: "¿En qué región habitaron principalmente los Tayronas?", correct: "Sierra Nevada de Santa Marta", wrong: ["Llanos Orientales", "Selva Amazónica", "Desierto de la Guajira"] },
        { q: "¿Qué material trabajaban maravillosamente las culturas precolombinas?", correct: "El oro", wrong: ["El hierro", "El acero", "El aluminio"] },
        { q: "¿Cómo se llama el famoso museo en Bogotá que guarda piezas indígenas?", correct: "Museo del Oro", wrong: ["Museo Botero", "Museo Nacional", "Museo de la Independencia"] },
        { q: "¿Qué alimento era la base de la dieta indígena en Colombia?", correct: "El maíz", wrong: ["El trigo", "El arroz", "La cebada"] },
        { q: "¿A quién adoraban los Muiscas como el dios del sol?", correct: "Súa", wrong: ["Chía", "Bachué", "Bochica"] },
        { q: "¿Qué cultura construyó la 'Ciudad Perdida'?", correct: "Tayronas", wrong: ["Muiscas", "Quimbayas", "Calimas"] },
        { q: "¿Dónde está ubicado el Parque Arqueológico de San Agustín?", correct: "Huila", wrong: ["Cundinamarca", "Boyacá", "Magdalena"] },
        { q: "¿Qué cacique muisca era bañado en polvo de oro según la leyenda?", correct: "El Zipa", wrong: ["El Zaque", "El Chamán", "El Cacique Nutibara"] }
    ],
    3: [ // Conquista y Colonia
        { q: "¿En qué año se dice que Cristóbal Colón 'descubrió' América?", correct: "1492", wrong: ["1500", "1810", "1402"] },
        { q: "¿Quién fundó Bogotá?", correct: "Gonzalo Jiménez de Quesada", wrong: ["Simón Bolívar", "Cristóbal Colón", "Sebastián de Belalcázar"] },
        { q: "¿Qué nombre le dieron los españoles a Colombia durante la colonia?", correct: "Nueva Granada", wrong: ["Gran Colombia", "Nueva España", "Tierra Firme"] },
        { q: "¿Cuál es una de las ciudades más antiguas fundadas en Colombia (1525)?", correct: "Santa Marta", wrong: ["Bogotá", "Medellín", "Bucaramanga"] },
        { q: "¿Quién fundó Cartagena de Indias?", correct: "Pedro de Heredia", wrong: ["Gonzalo Jiménez de Quesada", "Francisco Pizarro", "Hernán Cortés"] },
        { q: "¿Qué fortificación famosa se construyó en Cartagena para defensa?", correct: "Castillo de San Felipe", wrong: ["El Morro", "La Fortaleza del Sol", "Torre de Londres"] },
        { q: "¿Cómo se llamaba la máxima autoridad española en América durante la colonia?", correct: "El Virrey", wrong: ["El Presidente", "El Emperador", "El Alcalde"] },
        { q: "¿Qué institución española controlaba el comercio?", correct: "La Casa de Contratación", wrong: ["La Encomienda", "La Mita", "El Resguardo"] },
        { q: "¿Quién fue la heroína indígena conocida en Cartagena?", correct: "La India Catalina", wrong: ["Pocahontas", "Malinche", "Gaitana"] },
        { q: "¿En qué lugar de la Nueva Granada se daba más la minería de oro?", correct: "Antioquia y Chocó", wrong: ["Bogotá", "La Guajira", "Los Llanos Orientales"] }
    ],
    4: [ // Independencia
        { q: "¿En qué fecha se celebra el Grito de Independencia de Colombia?", correct: "20 de julio de 1810", wrong: ["7 de agosto de 1819", "12 de octubre de 1492", "11 de noviembre de 1811"] },
        { q: "¿Qué objeto fue la excusa para el Grito de Independencia?", correct: "El florero de Llorente", wrong: ["Una espada española", "Una bandera criolla", "Un caballo blanco"] },
        { q: "¿Quién es conocido como 'El Libertador'?", correct: "Simón Bolívar", wrong: ["Francisco de Paula Santander", "Antonio Nariño", "Camilo Torres"] },
        { q: "¿Qué batalla selló la independencia definitiva de Colombia?", correct: "Batalla de Boyacá", wrong: ["Batalla de Carabobo", "Batalla de Pichincha", "Batalla de Ayacucho"] },
        { q: "¿En qué fecha ocurrió la Batalla de Boyacá?", correct: "7 de agosto de 1819", wrong: ["20 de julio de 1810", "11 de noviembre de 1811", "25 de julio de 1819"] },
        { q: "¿Quién tradujo los Derechos del Hombre y del Ciudadano?", correct: "Antonio Nariño", wrong: ["Simón Bolívar", "Camilo Torres", "Francisco José de Caldas"] },
        { q: "¿Cómo se llamó la heroína fusilada por ayudar a los patriotas?", correct: "Policarpa Salavarrieta (La Pola)", wrong: ["Manuelita Sáenz", "Antonia Santos", "Mercedes Abrego"] },
        { q: "¿Quién fue conocido como 'El Hombre de las Leyes'?", correct: "Francisco de Paula Santander", wrong: ["Simón Bolívar", "Antonio Nariño", "José María Córdova"] },
        { q: "¿Cómo se llamó la gran nación que soñó Bolívar?", correct: "La Gran Colombia", wrong: ["Los Estados Unidos de Suramérica", "La Nueva Granada", "La Federación de los Andes"] },
        { q: "¿Qué puente fue clave en la Batalla de Boyacá?", correct: "Puente de Boyacá", wrong: ["Puente Pumarejo", "Puente de Occidente", "Puente de la Máquina"] }
    ],
    5: [ // Siglo XIX, XX y Cultura General
        { q: "¿Qué premio Nobel de literatura ganó un colombiano?", correct: "Gabriel García Márquez", wrong: ["Pablo Neruda", "Jorge Luis Borges", "Octavio Paz"] },
        { q: "¿Cuál es el libro más famoso de Gabriel García Márquez?", correct: "Cien años de soledad", wrong: ["Don Quijote de la Mancha", "El Aleph", "Rayuela"] },
        { q: "¿Qué conflicto civil ocurrió a finales del siglo XIX y principios del XX?", correct: "La Guerra de los Mil Días", wrong: ["La Guerra de los Cien Años", "La Guerra de Secesión", "La Primera Guerra Mundial"] },
        { q: "¿Qué gran río atraviesa Colombia de sur a norte?", correct: "Río Magdalena", wrong: ["Río Amazonas", "Río Orinoco", "Río Cauca"] },
        { q: "¿Qué producto agrícola colombiano es mundialmente famoso?", correct: "El Café", wrong: ["El Trigo", "La Manzana", "La Uva"] },
        { q: "¿Quién fue el científico colombiano que lideró la Expedición Botánica?", correct: "José Celestino Mutis", wrong: ["Albert Einstein", "Isaac Newton", "Francisco José de Caldas"] },
        { q: "¿Cómo se llama el ritmo musical tradicional del Caribe colombiano?", correct: "La Cumbia", wrong: ["El Tango", "La Ranchera", "El Flamenco"] },
        { q: "¿Qué país se separó de Colombia en 1903?", correct: "Panamá", wrong: ["Ecuador", "Venezuela", "Perú"] },
        { q: "¿Cuál es la moneda oficial de Colombia?", correct: "El Peso colombiano", wrong: ["El Dólar", "El Euro", "El Sol"] },
        { q: "¿Qué instrumento es esencial en el Vallenato?", correct: "El Acordeón", wrong: ["El Violín", "El Piano", "La Flauta"] }
    ]
};

// ==========================================
// REFERENCIAS AL DOM
// ==========================================
const pantallas = document.querySelectorAll('.pantalla');
const inputNombre = document.getElementById('nombre-estudiante');
const btnComenzar = document.getElementById('btn-comenzar');

// Pantalla Juego
const textoNivel = document.getElementById('texto-nivel');
const textoPuntaje = document.getElementById('texto-puntaje');
const barraProgreso = document.getElementById('barra-progreso');
const textoPregunta = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const mensajeRetro = document.getElementById('mensaje-retroalimentacion');
const btnSiguientePre = document.getElementById('btn-siguiente-pregunta');

// Pantalla Nivel
const tituloNivel = document.getElementById('titulo-nivel-completado');
const nivelCorrectas = document.getElementById('nivel-correctas');
const mensajeMotivador = document.getElementById('mensaje-motivador');
const btnRepetirNivel = document.getElementById('btn-repetir-nivel');
const btnSiguienteNivel = document.getElementById('btn-siguiente-nivel');

// Pantalla Final
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
    
    // Preparar las preguntas del nivel actual
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
    // Tomar la pregunta correspondiente al índice actual
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
        
        // Soporte teclado
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
        
        const frasesExito = ["¡Muy bien!", "¡Correcto!", "¡Excelente memoria!"];
        mensajeRetro.textContent = frasesExito[aleatorio(0, frasesExito.length - 1)];
        mensajeRetro.classList.add('mensaje-exito');
    } else {
        botonSeleccionado.classList.add('incorrecta');
        mensajeRetro.textContent = `Respuesta incorrecta. La correcta era: ${estado.preguntaActiva.respuestaCorrecta}`;
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
        tituloNivel.textContent = "¡Nivel Superado! 🌟";
        mensajeMotivador.textContent = "¡Felicidades! Conoces muy bien nuestra historia.";
        btnSiguienteNivel.classList.remove('oculto');
        btnRepetirNivel.classList.add('oculto');
        
        if (estado.nivelActual === estado.totalNiveles) {
            btnSiguienteNivel.textContent = "Ver Resultado Final 🏆";
        } else {
            btnSiguienteNivel.textContent = "Siguiente Nivel ➡️";
        }
    } else {
        tituloNivel.textContent = "¡Sigue repasando! 💪";
        mensajeMotivador.textContent = "Necesitas 7 aciertos para avanzar. ¡La historia es fascinante, inténtalo de nuevo!";
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
