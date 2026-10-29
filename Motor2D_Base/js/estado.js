// ==========================================
// ESTADO Y DATOS Puros (Domain)
// ==========================================

const ESTADO_JUGANDO = 1;
const ESTADO_PREGUNTA = 2;

// CARGAR SPRITE DEL ROBOT
const robotSprite = new Image();
robotSprite.src = 'img/robot.svg';
let spriteListo = false;
robotSprite.onload = () => {
    spriteListo = true;
};

const estado = {
    nivelActual: 1,
    maxNiveles: 50,
    faseActual: ESTADO_JUGANDO,
    preguntaActiva: {
        casillaFila: 0,
        casillaCol: 0,
        respuestaCorrecta: 0
    },

    teclas: { arriba: false, abajo: false, izquierda: false, derecha: false },
    
    mapa: {
        tamanoTile: 0, columnas: 0, filas: 0, matriz: []
    },
    jugador: {
        inicioX: 0, inicioY: 0, x: 0, y: 0, ancho: 0, alto: 0, velocidad: 0,
        sprite: robotSprite,
        get spriteCargado() { return spriteListo; }
    },
    motor: { fps: 0 }
};

// ==========================================
// CONTROLES (Input)
// ==========================================
window.addEventListener('keydown', (e) => {
    if (estado.faseActual !== ESTADO_JUGANDO) return;
    if (e.key === 'ArrowUp' || e.key === 'w') estado.teclas.arriba = true;
    if (e.key === 'ArrowDown' || e.key === 's') estado.teclas.abajo = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') estado.teclas.izquierda = true;
    if (e.key === 'ArrowRight' || e.key === 'd') estado.teclas.derecha = true;
});

window.addEventListener('keyup', (e) => {
    if (estado.faseActual !== ESTADO_JUGANDO) {
        estado.teclas.arriba = false; estado.teclas.abajo = false;
        estado.teclas.izquierda = false; estado.teclas.derecha = false;
        return;
    }
    if (e.key === 'ArrowUp' || e.key === 'w') estado.teclas.arriba = false;
    if (e.key === 'ArrowDown' || e.key === 's') estado.teclas.abajo = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') estado.teclas.izquierda = false;
    if (e.key === 'ArrowRight' || e.key === 'd') estado.teclas.derecha = false;
});
