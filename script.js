// ==================
// ELEMENTOS
// ==================
const intro = document.getElementById('intro');
const escena = document.getElementById('escena');
const final = document.getElementById('final');

const btnInicio = document.getElementById('btnInicio');
const btnPlay = document.getElementById('play');
const btnSiguiente = document.getElementById('siguiente');

const texto = document.getElementById('texto');
const pista = document.getElementById('pista');
const audio = document.getElementById('audio');
const vinilo = document.getElementById('vinilo');

const barraFondo = document.querySelector('.barra-fondo');
const barraProgreso = document.getElementById('barraProgreso');


// MODAL CARTA
const modalCarta = document.getElementById('modalCarta');
const cartaTitulo = document.getElementById('cartaTitulo');
const cartaMensaje = document.getElementById('cartaMensaje');
const cartaFotos = document.getElementById('cartaFotos');
const cerrarCarta = document.getElementById('cerrarCarta');

// ==================
// CONFIG AUDIO MÓVIL
// ==================
audio.setAttribute('playsinline', '');
audio.setAttribute('webkit-playsinline', '');
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const porcentaje = (audio.currentTime / audio.duration) * 100;
  barraProgreso.style.width = porcentaje + '%';
});

barraFondo.addEventListener('click', (e) => {
  const rect = barraFondo.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const porcentaje = clickX / rect.width;
  audio.currentTime = porcentaje * audio.duration;
});

document.querySelector('.barra-audio').style.display = 'none';
document.querySelector('.barra-audio').style.display = 'block';


// ==================
// DATOS
// ==================
let indice = 0;

const escenas = [
  {
    texto: "A veces no se dice todo de una sola vez.\nPor eso quise dejar esto aquí.",
    pista: "Te amo.",
    audio: "audios/audio1-intencion.mp3",
    carta: {
      titulo: "#1",
      mensaje: "Querida Princesita. 👑.\n\nCada dia que paso contigo me doy cuenta de lo afortunado que soy, de que todas mis oraciones en la noche se hicieron realidad y Dios me trajo a la mujer que pedia con todo mi corazon.\n\nPor eso y mucho mas, he creado esta pagina para ti, para mi princesa pechocha 💖",
      fotos: [
        "imagenes/recuerdos/audio1-1.jpg",
      ]
    }
  },
  {
    texto: "Mi princesita hermosa,\nhay personas que llegan sin hacer ruido y se quedan.",
    pista: "No todas las cosas importantes hacen ruido pero hacen la diferencia.",
    audio: "audios/audio2-ella.mp3",
        carta: {
      titulo: "#2",
      mensaje: " Como te dije, gracias por aparecer en mi vida, Dios supo cuando y como colocarte en mi vida para darme cuenta que yo podia ser amado y eso creeme que nunca lo voy a olvidar y por eso es que te aprecio tanto tanto tanto 💞 " ,
      fotos: [
        "imagenes/recuerdos/audio3-1.png",
      ]
    }
  },
    {
    texto: "Y fueron felices por siempre",
    pista: "A nuestra manera pero vamos a tener nuestra historia.",
    audio: "audios/audio3-nosotros.mp3",
        carta: {
      titulo: "#3",
      mensaje: " Desde que llegaste, me he sentido tan feliz, todas nuestras aventuras, charlas, etc han sido algo magnifico para mi, nunca pense que me podria sentir tan vivo con solo un abrazo y eso es lo que me haces sentir tu, vivo, pq siento como la sangre recorre por mi cuerpo, mi corazon se agita, comienzo a ponerme nervioso y mis manos me sudan cada vez que te veo a lo puro niño chiquito, cosas como esas son las que causas en mi princesita y nunca voy a dejar de sentir eso, aun asi estemos en la distancia 💖💞. " ,
      fotos: [
        "imagenes/recuerdos/audio2-1.jpg",
      ]
    }
  }
];

// ==================
// INICIO
// ==================
btnInicio.addEventListener('click', () => {
  intro.classList.remove('activa');
  escena.classList.add('activa');

  vinilo.volume = 0.15;
  vinilo.play().catch(() => {});

  indice = 0;
  cargarEscena();
});

// ==================
// CARGAR ESCENA
// ==================
function cargarEscena() {
  const actual = escenas[indice];

  texto.innerText = actual.texto;
  pista.innerText = actual.pista;

  audio.src = actual.audio;
  audio.load();
  audio.pause();

  // 🔁 REACTIVAR PLAY EN CADA ESCENA NUEVA
  btnPlay.style.display = "inline-block";
  btnPlay.disabled = false;
  btnPlay.innerText = '▶ Reproducir';

  btnSiguiente.disabled = true;
  btnSiguiente.style.opacity = "0.4";
}

// ==================
// PLAY / PAUSE
// ==================
btnPlay.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      btnPlay.innerText = '⏸ Pausar';
    }).catch(() => {});
  } else {
    audio.pause();
    btnPlay.innerText = '▶ Reproducir';
  }
});

// ==================
// CUANDO TERMINA EL AUDIO
// ==================
audio.addEventListener('ended', () => {
  btnPlay.innerText = '▶ Reproducir';
  btnPlay.disabled = true;

  const actual = escenas[indice];

  if (actual.carta) {
    mostrarCarta(actual.carta);
  } else {
    btnSiguiente.disabled = false;
    btnSiguiente.style.opacity = "1";
  }
});

// ==================
// MOSTRAR CARTA
// ==================
function mostrarCarta(carta) {
  cartaTitulo.innerText = carta.titulo;
  cartaMensaje.innerText = carta.mensaje;

  cartaFotos.innerHTML = "";

  carta.fotos.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;

    // ⏱️ delay para que aparezcan una por una
    img.style.animationDelay = `${index * 0.4}s`;

    cartaFotos.appendChild(img);
  });

  btnPlay.style.display = "none";
  modalCarta.classList.remove('oculto');


  // 🔒 OCULTAR CONTROLES
  btnPlay.style.display = "none";
  btnSiguiente.disabled = true;
  btnSiguiente.style.opacity = "0.4";

  modalCarta.classList.remove('oculto');
}


// ==================
// CERRAR CARTA
// ==================
cerrarCarta.addEventListener('click', () => {
  modalCarta.classList.add('oculto');

  btnPlay.disabled = false;
  btnSiguiente.disabled = false;

  btnSiguiente.style.opacity = "1";
});

// ==================
// SIGUIENTE
// ==================
btnSiguiente.addEventListener('click', () => {
  audio.pause();

  if (indice < escenas.length - 1) {
    indice++;
    cargarEscena();
  } else {
    escena.classList.remove('activa');
    final.classList.add('activa');
    vinilo.pause();
  }
});
