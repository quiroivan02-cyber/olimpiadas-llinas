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
// BANCO DE PROBLEMAS (NIVEL 5)
// ==========================================
const bancoProblemas = [
    { q: "Ana tiene 5 lápices y recibe 3 más. ¿Cuántos lápices tiene?", a: 8 },
    { q: "Juan tenía 15 monedas y gastó 5. ¿Cuántas le quedan?", a: 10 },
    { q: "Hay 4 cajas con 6 naranjas cada una. ¿Cuántas naranjas hay?", a: 24 },
    { q: "Se reparten 24 galletas entre 6 niños por igual. ¿Cuántas recibe cada niño?", a: 4 },
    { q: "En un árbol hay 12 pájaros y vuelan 4. ¿Cuántos quedan?", a: 8 },
    { q: "Pedro compra 3 paquetes de cromos. Cada paquete tiene 5. ¿Cuántos tiene en total?", a: 15 },
    { q: "María tiene 20 canicas y las guarda en 4 bolsas por igual. ¿Cuántas hay por bolsa?", a: 5 },
    { q: "Un tren tiene 5 vagones. En cada vagón hay 10 personas. ¿Cuántas viajan en total?", a: 50 },
    { q: "En la nevera había 8 manzanas y mamá compró 6 más. ¿Cuántas hay ahora?", a: 14 },
    { q: "Tienes 30 minutos para jugar. Ya jugaste 15. ¿Cuántos te quedan?", a: 15 },
    { q: "En el salón hay 4 filas de 5 mesas. ¿Cuántas mesas hay?", a: 20 },
    { q: "Un pastel se cortó en 8 pedazos. Nos comimos 3. ¿Cuántos sobran?", a: 5 },
    { q: "Carlos ahorró 50 pesos y compró un juguete de 20. ¿Cuánto dinero le sobró?", a: 30 },
    { q: "Si repartes 16 cartas entre 4 jugadores, ¿cuántas le tocan a cada uno?", a: 4 },
    { q: "Una granja tiene 10 vacas, 5 cerdos y 3 caballos. ¿Cuántos animales son?", a: 18 },
    { q: "Luis leyó 12 páginas ayer y 8 hoy. ¿Cuántas páginas ha leído?", a: 20 },
    { q: "Una caja tiene 24 colores. Si se pierden 4, ¿cuántos colores quedan?", a: 20 },
    { q: "Cada helado cuesta 5 pesos. Si compro 3 helados, ¿cuánto pago?", a: 15 },
    { q: "Hay 36 rosas para hacer 6 ramos iguales. ¿Cuántas rosas lleva cada ramo?", a: 6 },
    { q: "Un álbum tiene 50 espacios. Si ya pegué 40 estampas, ¿cuántos faltan?", a: 10 },
    { q: "Mamá hizo 15 galletas y papá hizo 10. ¿Cuántas galletas hicieron juntos?", a: 25 },
    { q: "En el parque hay 7 niños jugando y llegan 6 más. ¿Cuántos niños hay?", a: 13 },
    { q: "Tengo 5 monedas de 2 pesos. ¿Cuánto dinero tengo en total?", a: 10 },
    { q: "El profesor trajo 30 dulces para 10 estudiantes. ¿Cuántos le tocan a cada uno?", a: 3 },
    { q: "Una araña tiene 8 patas. ¿Cuántas patas tienen 2 arañas?", a: 16 },
    { q: "En un estuche caben 12 colores. Tengo 7. ¿Cuántos me faltan para llenarlo?", a: 5 },
    { q: "Laura sembró 3 filas con 4 plantas cada una. ¿Cuántas plantas sembró?", a: 12 },
    { q: "Mi libro tiene 100 páginas. Voy en la 80. ¿Cuántas me faltan por leer?", a: 20 },
    { q: "Para hacer un jugo uso 3 naranjas. ¿Cuántas necesito para hacer 4 jugos?", a: 12 },
    { q: "Se acomodan 18 sillas en 3 filas iguales. ¿Cuántas sillas hay por fila?", a: 6 },
    { q: "En una fiesta hay 25 globos azules y 15 rojos. ¿Cuántos globos hay?", a: 40 },
    { q: "Tengo 45 pesos y encuentro 5 más. ¿Cuánto tengo ahora?", a: 50 },
    { q: "Compré un cuaderno de 12 pesos y pagué con 20. ¿Cuánto es mi vuelto?", a: 8 },
    { q: "Un paquete tiene 8 salchichas. Compro 2 paquetes. ¿Cuántas salchichas tengo?", a: 16 },
    { q: "Hay 40 libros para colocar en 4 repisas por igual. ¿Cuántos van en cada una?", a: 10 },
    { q: "Sofía pescó 9 peces y su hermano 6. ¿Cuántos pescaron en total?", a: 15 },
    { q: "En la pecera hay 14 peces. Si saco 3 para limpiarla, ¿cuántos quedan en el agua?", a: 11 },
    { q: "Una bicicleta tiene 2 ruedas. ¿Cuántas ruedas hay en 7 bicicletas?", a: 14 },
    { q: "Hay 27 cubos de hielo. Uso 9. ¿Cuántos quedan?", a: 18 },
    { q: "Repartí 15 manzanas en 3 canastas por igual. ¿Cuántas manzanas hay en una canasta?", a: 5 }
];

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
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ==========================================
// LÓGICA DEL JUEGO
// ==========================================

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

function generarOpcionesIncorrectas(respuestaCorrecta) {
    let opciones = new Set([respuestaCorrecta]);
    
    while(opciones.size < 4) {
        // Generar variaciones cercanas
        let variacion = aleatorio(-5, 5);
        if (variacion === 0) variacion = aleatorio(1, 10); // Asegurar que sea diferente
        
        let opcionMala = respuestaCorrecta + variacion;
        
        // Evitar números negativos si no es necesario o evitar 0 en multiplicaciones
        if (opcionMala < 0) opcionMala = respuestaCorrecta + aleatorio(1, 10);
        
        opciones.add(opcionMala);
    }
    
    return mezclarArreglo(Array.from(opciones));
}

function crearPreguntaNivel() {
    let num1, num2, respuestaCorrecta, texto;
    let operacion;

    switch (estado.nivelActual) {
        case 1: // Sumas y restas 0 - 20
            operacion = aleatorio(0, 1) === 0 ? '+' : '-';
            if (operacion === '+') {
                num1 = aleatorio(0, 20);
                num2 = aleatorio(0, 20 - num1);
                respuestaCorrecta = num1 + num2;
            } else {
                num1 = aleatorio(0, 20);
                num2 = aleatorio(0, num1); // Para que el resultado no sea negativo
                respuestaCorrecta = num1 - num2;
            }
            texto = `¿Cuánto es ${num1} ${operacion} ${num2}?`;
            break;
            
        case 2: // Sumas y restas 0 - 100
            operacion = aleatorio(0, 1) === 0 ? '+' : '-';
            if (operacion === '+') {
                num1 = aleatorio(10, 80);
                num2 = aleatorio(1, 100 - num1);
                respuestaCorrecta = num1 + num2;
            } else {
                num1 = aleatorio(20, 100);
                num2 = aleatorio(1, num1);
                respuestaCorrecta = num1 - num2;
            }
            texto = `¿Cuánto es ${num1} ${operacion} ${num2}?`;
            break;
            
        case 3: // Multiplicaciones 1 - 10
            num1 = aleatorio(1, 10);
            num2 = aleatorio(1, 10);
            respuestaCorrecta = num1 * num2;
            texto = `¿Cuánto es ${num1} x ${num2}?`;
            break;
            
        case 4: // Divisiones exactas
            num2 = aleatorio(1, 10); // Divisor
            respuestaCorrecta = aleatorio(1, 10); // Cociente
            num1 = num2 * respuestaCorrecta; // Dividendo
            texto = `¿Cuánto es ${num1} ÷ ${num2}?`;
            break;
            
        case 5: // Problemas matemáticos
            const problema = bancoProblemas[aleatorio(0, bancoProblemas.length - 1)];
            texto = problema.q;
            respuestaCorrecta = problema.a;
            break;
    }

    return {
        texto: texto,
        respuestaCorrecta: respuestaCorrecta,
        opciones: generarOpcionesIncorrectas(respuestaCorrecta)
    };
}

function mostrarSiguientePregunta() {
    estado.preguntaActiva = crearPreguntaNivel();
    
    textoPregunta.textContent = estado.preguntaActiva.texto;
    contenedorOpciones.innerHTML = '';
    
    estado.preguntaActiva.opciones.forEach((opcion, index) => {
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
    
    // Enfocar la primera opción para accesibilidad por teclado
    const primerBoton = contenedorOpciones.querySelector('.btn-opcion');
    if (primerBoton) primerBoton.focus();
}

function verificarRespuesta(botonSeleccionado, valorSeleccionado) {
    // Deshabilitar todos los botones para evitar múltiples clics
    const botones = contenedorOpciones.querySelectorAll('.btn-opcion');
    botones.forEach(b => {
        b.disabled = true;
        b.onclick = null;
        
        // Marcar la respuesta correcta visualmente
        if (parseInt(b.textContent) === estado.preguntaActiva.respuestaCorrecta) {
            b.classList.add('correcta');
        }
    });

    mensajeRetro.classList.remove('oculto', 'mensaje-exito', 'mensaje-error');

    if (valorSeleccionado === estado.preguntaActiva.respuestaCorrecta) {
        botonSeleccionado.classList.add('correcta');
        estado.correctasNivel++;
        estado.puntajeTotal++;
        
        const frasesExito = ["¡Muy bien!", "¡Correcto!", "¡Excelente!", "¡Sigue así!"];
        mensajeRetro.textContent = frasesExito[aleatorio(0, frasesExito.length - 1)];
        mensajeRetro.classList.add('mensaje-exito');
    } else {
        botonSeleccionado.classList.add('incorrecta');
        mensajeRetro.textContent = `Inténtalo en la siguiente. La respuesta correcta era: ${estado.preguntaActiva.respuestaCorrecta}`;
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
        mensajeMotivador.textContent = "¡Felicidades! Tienes los conocimientos para avanzar.";
        btnSiguienteNivel.classList.remove('oculto');
        btnRepetirNivel.classList.add('oculto');
        
        if (estado.nivelActual === estado.totalNiveles) {
            btnSiguienteNivel.textContent = "Ver Resultado Final 🏆";
        } else {
            btnSiguienteNivel.textContent = "Siguiente Nivel ➡️";
        }
    } else {
        tituloNivel.textContent = "¡Sigue practicando! 💪";
        mensajeMotivador.textContent = "Necesitas 7 aciertos para avanzar. ¡Tú puedes!";
        btnSiguienteNivel.classList.add('oculto');
        btnRepetirNivel.classList.remove('oculto');
    }
    
    cambiarPantalla('pantalla-nivel');
    
    // Foco inicial
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

// Soporte de teclado básico para accesibilidad general
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const elementoActivo = document.activeElement;
        if (elementoActivo.tagName === 'BUTTON' && elementoActivo.id !== 'btn-siguiente-pregunta') {
            // El click nativo ya dispara en buttons al presionar enter,
            // pero nos aseguramos que fluya bien.
        }
    }
});
