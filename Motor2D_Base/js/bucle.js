// ==========================================
// MOTOR PRINCIPAL (Game Loop y Generación Procedural)
// ==========================================

const canvas = document.getElementById('pantallaJuego');
const ctx = canvas.getContext('2d');
const fpsContador = document.getElementById('fpsContador');

const panelPregunta = document.getElementById('panelPregunta');
const textoPregunta = document.getElementById('textoPregunta');
const inputRespuesta = document.getElementById('inputRespuesta');
const btnResponder = document.getElementById('btnResponder');
const mensajeError = document.getElementById('mensajeError');

let tiempoAnterior = 0;
let fotogramas = 0;
let acumuladorTiempo = 0;

// ==========================================
// DIBUJADO PROCEDURAL DEL ROBOT (Cero Fallos)
// Si Firefox bloquea archivos externos, el robot se dibuja con matemáticas puras
// ==========================================
function dibujarRobotEnCanvas(ctx, x, y, w, h) {
    // 1. Cabeza
    ctx.fillStyle = '#455a64';
    ctx.fillRect(x + w*0.2, y + h*0.2, w*0.6, h*0.35);
    ctx.strokeStyle = '#263238';
    ctx.lineWidth = Math.max(1, w*0.04);
    ctx.strokeRect(x + w*0.2, y + h*0.2, w*0.6, h*0.35);

    // 2. Antena
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(x + w*0.5, y + h*0.2);
    ctx.lineTo(x + w*0.5, y + h*0.06);
    ctx.stroke();
    
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(x + w*0.5, y + h*0.06, Math.max(2, w*0.06), 0, Math.PI*2);
    ctx.fill();

    // 3. Visor oscuro y Ojos brillantes
    ctx.fillStyle = '#1a237e';
    ctx.fillRect(x + w*0.28, y + h*0.28, w*0.44, h*0.16);
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(x + w*0.38, y + h*0.36, Math.max(1.5, w*0.05), 0, Math.PI*2);
    ctx.arc(x + w*0.62, y + h*0.36, Math.max(1.5, w*0.05), 0, Math.PI*2);
    ctx.fill();

    // 4. Cuerpo
    ctx.fillStyle = '#37474f';
    ctx.fillRect(x + w*0.18, y + h*0.58, w*0.64, h*0.28);
    ctx.strokeStyle = '#212121';
    ctx.strokeRect(x + w*0.18, y + h*0.58, w*0.64, h*0.28);

    // 5. Símbolo matemático (+)
    ctx.strokeStyle = '#76ff03';
    ctx.lineWidth = Math.max(1, w*0.05);
    ctx.beginPath();
    ctx.moveTo(x + w*0.5, y + h*0.64);
    ctx.lineTo(x + w*0.5, y + h*0.80);
    ctx.moveTo(x + w*0.4, y + h*0.72);
    ctx.lineTo(x + w*0.6, y + h*0.72);
    ctx.stroke();

    // 6. Orugas/Ruedas
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + w*0.16, y + h*0.88, w*0.68, h*0.12);
}

// ==========================================
// FÁBRICA DE MATEMÁTICAS (Math Factory)
// ==========================================
function generarProblema(nivel) {
    let num1, num2, x, c, b;

    if (nivel <= 10) {
        switch(nivel) {
            case 1: num1 = Math.floor(Math.random()*10)+1; num2 = Math.floor(Math.random()*10)+1; return { texto: `Niv.${nivel}: ¿${num1} + ${num2}?`, respuesta: num1+num2 };
            case 2: num1 = Math.floor(Math.random()*20)+10; num2 = Math.floor(Math.random()*10)+1; return { texto: `Niv.${nivel}: ¿${num1} - ${num2}?`, respuesta: num1-num2 };
            case 3: num1 = Math.floor(Math.random()*8)+2; num2 = Math.floor(Math.random()*8)+2; return { texto: `Niv.${nivel}: ¿${num1} x ${num2}?`, respuesta: num1*num2 };
            case 4: num2 = Math.floor(Math.random()*10)+1; num1 = num2 * (Math.floor(Math.random()*10)+1); return { texto: `Niv.${nivel}: ¿${num1} ÷ ${num2}?`, respuesta: num1/num2 };
            case 5: num1 = Math.floor(Math.random()*20)-10; num2 = Math.floor(Math.random()*20)-10; return { texto: `Niv.${nivel}: ¿${num1} + (${num2})?`, respuesta: num1+num2 };
            case 6: num1 = Math.floor(Math.random()*20)-10; num2 = Math.floor(Math.random()*20)-10; return { texto: `Niv.${nivel}: ¿${num1} - (${num2})?`, respuesta: num1-num2 };
            case 7: num1 = Math.floor(Math.random()*15)+5; num2 = Math.floor(Math.random()*15)+5; return { texto: `Niv.${nivel}: ¿${num1} x ${num2}?`, respuesta: num1*num2 };
            case 8: num1 = Math.floor(Math.random()*15)+1; x = Math.floor(Math.random()*20)+1; num2 = num1 + x; return { texto: `Niv.${nivel}: Si X + ${num1} = ${num2}, ¿X?`, respuesta: x };
            case 9: num1 = Math.floor(Math.random()*10)+2; x = Math.floor(Math.random()*12)+1; num2 = num1 * x; return { texto: `Niv.${nivel}: Si ${num1}X = ${num2}, ¿X?`, respuesta: x };
            case 10: let bBase = Math.floor(Math.random()*5)+2; let aBase = Math.floor(Math.random()*5)+1; let m = Math.floor(Math.random()*4)+2; return { texto: `Niv.${nivel}: Si ${aBase}/${bBase} = X/${bBase*m}, ¿X?`, respuesta: aBase*m };
        }
    } 
    else if (nivel <= 20) {
        x = Math.floor(Math.random() * 12) + 2; 
        num1 = Math.floor(Math.random() * 8) + 2; 
        num2 = Math.floor(Math.random() * 20) + 1; 
        let resultado = (num1 * x) + num2; 
        return { texto: `Niv.${nivel}: Si ${num1}X + ${num2} = ${resultado}. ¿Cuánto vale X?`, respuesta: x };
    } 
    else if (nivel <= 30) {
        x = Math.floor(Math.random() * (nivel - 15)) + 3; 
        c = x * x;
        return { texto: `Niv.${nivel}: Si X² - ${c} = 0 (y X es positivo). ¿X?`, respuesta: x };
    }
    else if (nivel <= 40) {
        x = Math.floor(Math.random() * 15) + 2; 
        b = 2 * x; 
        c = x * x; 
        return { texto: `Niv.${nivel}: Factoriza X² - ${b}X + ${c} = 0. ¿Cuánto vale X?`, respuesta: x };
    }
    else {
        x = Math.floor(Math.random() * 15) + 3;
        let y = Math.floor(Math.random() * 10) + 1;
        let eq1 = (2 * x) + y;
        let eq2 = x - y;
        return { texto: `Niv.${nivel}: Si 2X+Y=${eq1} y X-Y=${eq2}. ¿Cuánto vale X?`, respuesta: x };
    }
}

// ==========================================
// GENERADOR PROCEDURAL DE LABERINTOS
// ==========================================
function generarLaberinto(columnas, filas) {
    const matriz = Array(filas).fill().map(() => Array(columnas).fill(1));
    const stack = [];
    let currR = 1, currC = 1;
    matriz[currR][currC] = 0;
    stack.push([currR, currC]);

    while (stack.length > 0) {
        let [r, c] = stack[stack.length - 1];
        let vecinos = [];
        const dirs = [[-2,0], [2,0], [0,-2], [0,2]];
        
        for (let [dr, dc] of dirs) {
            let nr = r + dr, nc = c + dc;
            if (nr > 0 && nr < filas-1 && nc > 0 && nc < columnas-1 && matriz[nr][nc] === 1) {
                vecinos.push([dr, dc]);
            }
        }

        if (vecinos.length > 0) {
            let [dr, dc] = vecinos[Math.floor(Math.random() * vecinos.length)];
            matriz[r + dr/2][c + dc/2] = 0;
            matriz[r + dr][c + dc] = 0;
            stack.push([r + dr, c + dc]);
        } else {
            stack.pop();
        }
    }
    
    matriz[filas-2][columnas-2] = 3; // Salida
    
    let numPreguntas = Math.min(2 + Math.floor(estado.nivelActual/2), 6);
    let pPuestas = 0;
    while(pPuestas < numPreguntas) {
        let r = Math.floor(Math.random() * (filas-2)) + 1;
        let c = Math.floor(Math.random() * (columnas-2)) + 1;
        if (matriz[r][c] === 0 && !(r===1 && c===1) && !(r===filas-2 && c===columnas-2)) {
            matriz[r][c] = 2;
            pPuestas++;
        }
    }
    return matriz;
}

// ==========================================
// GESTOR DE NIVELES (Level Manager)
// ==========================================
function cargarNivel(nivel) {
    if (nivel > estado.maxNiveles) {
        alert("¡Felicidades! Has completado el Nivel 50 y dominado el álgebra.");
        nivel = 1;
        estado.nivelActual = 1;
    }
    
    let nivelEscala = Math.min(nivel, 11); 
    const colBase = 15; const filaBase = 11;
    const incremento = (nivelEscala - 1) * 4;
    
    estado.mapa.columnas = colBase + incremento;
    estado.mapa.filas = filaBase + incremento;
    
    const tamano = Math.floor(Math.min(800 / estado.mapa.columnas, 600 / estado.mapa.filas));
    estado.mapa.tamanoTile = tamano;
    
    canvas.width = estado.mapa.columnas * tamano;
    canvas.height = estado.mapa.filas * tamano;

    estado.mapa.matriz = generarLaberinto(estado.mapa.columnas, estado.mapa.filas);
    
    estado.jugador.ancho = tamano * 0.75; 
    estado.jugador.alto = tamano * 0.75;
    estado.jugador.inicioX = (1 * tamano) + (tamano - estado.jugador.ancho)/2;
    estado.jugador.inicioY = (1 * tamano) + (tamano - estado.jugador.alto)/2;
    estado.jugador.x = estado.jugador.inicioX;
    estado.jugador.y = estado.jugador.inicioY;
    
    estado.jugador.velocidad = tamano * 5; 
    
    const tituloFondo = document.querySelector('.ui-panel');
    tituloFondo.innerHTML = `NIVEL ${nivel} | FPS: <span id="fpsContador">0</span> | WASD para moverte`;
}

// ==========================================
// LÓGICA DE JUEGO E INTERACCIONES
// ==========================================
function lanzarPreguntaMatematica(fila, col) {
    estado.faseActual = ESTADO_PREGUNTA;
    estado.preguntaActiva.casillaFila = fila;
    estado.preguntaActiva.casillaCol = col;

    const problema = generarProblema(estado.nivelActual);
    estado.preguntaActiva.respuestaCorrecta = problema.respuesta;
    textoPregunta.textContent = problema.texto;
    
    panelPregunta.style.display = 'block';
    mensajeError.style.display = 'none';
    inputRespuesta.value = '';
    setTimeout(() => inputRespuesta.focus(), 50); 
}

function procesarRespuesta() {
    const respuestaUsuario = parseFloat(inputRespuesta.value);
    
    if (respuestaUsuario === estado.preguntaActiva.respuestaCorrecta) {
        estado.mapa.matriz[estado.preguntaActiva.casillaFila][estado.preguntaActiva.casillaCol] = 0;
        panelPregunta.style.display = 'none';
        estado.faseActual = ESTADO_JUGANDO;
    } else {
        mensajeError.textContent = "¡Casi! Inténtalo de nuevo.";
        mensajeError.style.display = 'block';
        setTimeout(() => {
            panelPregunta.style.display = 'none';
            estado.faseActual = ESTADO_JUGANDO;
        }, 1200);
    }
}

btnResponder.addEventListener('click', procesarRespuesta);
inputRespuesta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') procesarRespuesta();
});

function hayColision(x, y, ancho, alto) {
    const tam = estado.mapa.tamanoTile;
    const colIzq = Math.floor(x / tam);
    const colDer = Math.floor((x + ancho - 0.1) / tam);
    const filaArr = Math.floor(y / tam);
    const filaAba = Math.floor((y + alto - 0.1) / tam);

    const esquinas = [
        {f: filaArr, c: colIzq}, {f: filaArr, c: colDer},
        {f: filaAba, c: colIzq}, {f: filaAba, c: colDer}
    ];

    for (let eq of esquinas) {
        const valorCasilla = estado.mapa.matriz[eq.f][eq.c];
        if (valorCasilla === 1) return true; 
        if (valorCasilla === 2 && estado.faseActual === ESTADO_JUGANDO) { 
            lanzarPreguntaMatematica(eq.f, eq.c);
            return true;
        }
        if (valorCasilla === 3 && estado.faseActual === ESTADO_JUGANDO) { 
            estado.nivelActual++;
            cargarNivel(estado.nivelActual);
            return true; 
        }
    }
    return false;
}

function actualizar(dt) {
    if (estado.faseActual !== ESTADO_JUGANDO) return;
    const j = estado.jugador;
    let nuevaX = j.x; let nuevaY = j.y;
    if (estado.teclas.arriba) nuevaY -= j.velocidad * dt;
    if (estado.teclas.abajo) nuevaY += j.velocidad * dt;
    if (estado.teclas.izquierda) nuevaX -= j.velocidad * dt;
    if (estado.teclas.derecha) nuevaX += j.velocidad * dt;

    if (!hayColision(nuevaX, j.y, j.ancho, j.alto)) j.x = nuevaX;
    if (!hayColision(j.x, nuevaY, j.ancho, j.alto)) j.y = nuevaY;
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tam = estado.mapa.tamanoTile;
    
    // 1. Dibujar Laberinto
    for (let fila = 0; fila < estado.mapa.filas; fila++) {
        for (let col = 0; col < estado.mapa.columnas; col++) {
            const valor = estado.mapa.matriz[fila][col];
            if (valor === 1) { 
                ctx.fillStyle = '#555';
                ctx.fillRect(col * tam, fila * tam, tam, tam);
                ctx.strokeStyle = '#222';
                ctx.lineWidth = 1;
                ctx.strokeRect(col * tam, fila * tam, tam, tam);
            } 
            else if (valor === 2) { 
                ctx.fillStyle = '#ffaa00';
                ctx.fillRect(col * tam, fila * tam, tam, tam);
                ctx.fillStyle = '#000';
                ctx.font = `bold ${tam*0.6}px sans-serif`;
                ctx.fillText('?', col * tam + (tam*0.3), fila * tam + (tam*0.7));
            }
            else if (valor === 3) { 
                ctx.fillStyle = '#0088ff'; 
                ctx.fillRect(col * tam, fila * tam, tam, tam);
                ctx.fillStyle = '#fff';
                ctx.font = `bold ${tam*0.4}px sans-serif`;
                ctx.fillText('EXIT', col * tam + (tam*0.1), fila * tam + (tam*0.6));
            }
        }
    }
    
    // 2. DIBUJAR JUGADOR (ROBOT)
    // Usamos el dibujado vectorial directo en Canvas. 
    // Esto es 100% inmune a errores de lectura o restricciones de archivos locales de Firefox.
    dibujarRobotEnCanvas(ctx, estado.jugador.x, estado.jugador.y, estado.jugador.ancho, estado.jugador.alto);
}

function cicloPrincipal(tiempoActualMilisegundos) {
    const tiempoActualSegundos = tiempoActualMilisegundos / 1000;
    const dt = tiempoActualSegundos - tiempoAnterior;
    tiempoAnterior = tiempoActualSegundos;

    fotogramas++; acumuladorTiempo += dt;
    if (acumuladorTiempo >= 1) {
        estado.motor.fps = fotogramas;
        const fpsObj = document.getElementById('fpsContador');
        if(fpsObj) fpsObj.textContent = estado.motor.fps;
        fotogramas = 0; acumuladorTiempo = 0;
    }

    actualizar(dt);
    dibujar();
    requestAnimationFrame(cicloPrincipal);
}

cargarNivel(estado.nivelActual);

requestAnimationFrame((tiempoActualMilisegundos) => {
    tiempoAnterior = tiempoActualMilisegundos / 1000;
    cicloPrincipal(tiempoActualMilisegundos);
});
