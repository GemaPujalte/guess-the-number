"use strict";

//Párrafos donde insertaremos valores y que restableceremos una vez finalizado el juego.
const guesses = document.querySelector(".guesses"); //intentos
const lastResult = document.querySelector(".lastResults"); //Resultado
const lowOrhigh = document.querySelector(".lowOrHigh"); //alto o bajo
const form = document.querySelector("form");

const buttonElement = document.querySelector(".js-button");
const inputNumber = document.querySelector(".js-inputNumber");

let numberValue = parseInt(inputNumber.value); //valor del input donde escribo el numero

let count = 1;
let resetButton; //boton reinicio juego

//se genera el número aleatorio
let randomNumber;
function getRandomNumber(max) {
  randomNumber = Math.ceil(Math.random() * max);
  console.log(`El número aleatorio es ${randomNumber}`);
}
getRandomNumber(100); //esto va fuera de la funcion.

function checkGuess(event) {
  event.preventDefault();
  numberValue = Number(inputNumber.value); //método Number para asegurar que el valor que nos llega en un número.

  if (isNaN(numberValue)) {
    inputNumber.value = "";
    inputNumber.focus();
    lowOrhigh.textContent = "No es un número";
    lowOrhigh.style.color = "white";
    return;
  }

  // If si es el primer intento del jugador se añade la frase..
  if (count === 1) {
    guesses.textContent = "Intentos anteriores: ";
    guesses.style.color = "white";
  }
  guesses.textContent += (numberValue || inputNumber.value) + " "; //frase anterior + numero que introduce el usuario.

  if (numberValue === randomNumber) {
    // lastResult.classList.add("js-congratulationsResult");
    lastResult.textContent = "Felicidades, has acertado!!";
    lastResult.style.backgroundColor = "#88de88";
    lastResult.style.display = "inline-block";
    lastResult.style.borderRadius = "3px";

    // lastResult.style.transform = "translate(0, 10px)";
    // lastResult.style.transition = "transform 2s ease";
    lowOrhigh.textContent = "";

    setGameOver();
  } else if (count === 10) {
    lastResult.textContent = "Fin del juego!";
    setGameOver();
  } else {
    // lastResult.classList.remove("js-congratulationsResult");
    lastResult.textContent = "Incorrecto!";
    lastResult.style.backgroundColor = "red";
    if (numberValue < randomNumber) {
      lowOrhigh.textContent = "El número es muy bajo!";
      lowOrhigh.style.color = "white";
    } else if (numberValue > randomNumber) {
      lowOrhigh.textContent = "El número es muy alto!";
      lowOrhigh.style.color = "white";
    }
  }

  //Siguiente intento: incrementamos el contador, vaciamos campo de texto y enfocamos el cursor en el input.
  count++;
  inputNumber.value = "";
  inputNumber.focus();
}

//evento que  acciona el juego
buttonElement.addEventListener("click", checkGuess);

//Función que finaliza el juego
function setGameOver() {
  //deshabilitamos campo donde introducir el número y el botón de envío
  inputNumber.disabled = true;
  buttonElement.disabled = true;

  //creamos el boton para empezar a jugar de nuevo
  resetButton = document.createElement("button");
  resetButton.textContent = "INICIAR NUEVO JUEGO";
  resetButton.classList.add("js-resetButton");
  //añadimos el boton
  form.append(resetButton);
  //creamos el evento
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  //Volvemos a poner el contador en 1
  count = 1;

  // con un bucle, vaciamos el contenido de todos los parrafos
  const resetParas = document.querySelectorAll(".resultParagraphs p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  //eliminamos el boton que reinicia el juego
  resetButton.parentNode.removeChild(resetButton);

  //habilitamos campo donde introducir el número y el botón de envío
  inputNumber.disabled = false;
  buttonElement.disabled = false;

  //vaciamos campo de texto y enfocamos el cursor en el input
  inputNumber.value = "";
  inputNumber.focus();

  lastResult.style.backgroundColor = "white";

  //volvemos a generar el número aleatorio
  getRandomNumber(100);
}
