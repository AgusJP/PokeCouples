//Declaración e Inicialización de variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let success = 0;
let time = 0;
let timer = false;

//Audios
let winSound = new Audio("./sounds/win.wav");
let failSound = new Audio("./sounds/fail.wav");
let coupleSound = new Audio("./sounds/couple.wav");

//Variable que almacena la referencia al intervalo (setInterval) para después poder limpiarlo
let setIntervalId = null;

//Elementos HTML acerca de las estadísticas del juego
let showMoves = document.getElementById("movements");
let showSuccess = document.getElementById("success");
let showTimer = document.getElementById("timeleft");

//Array con parejas de números (Cada número tendrá asociada una imagen)
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//Desordena el array anterior de manera aleatoria para mezclar las parejas
numbers = numbers.sort(() => Math.random() - 0.5);

//Función que sirve para aumentar el tiempo en 1segundo cada segundo.
//Se llama a esta función cuando el timer no se ha inicializado nunca.
const countTime = () => {
  setIntervalId = setInterval(() => {
    time++;
    showTimer.innerHTML = `Tiempo: ${time} segundos`;
  }, 1000);
};

/**
 * Función principal de la lógica del juego que se va a ejecutar al dar click a cada una de las celdas de la tabla
 * @param {El id de cada botón} cardId
 */
const uncover = (cardId) => {
  //Si no existe un timer se manda a llamar a la función countTime()
  if (timer === false) {
    countTime();
    timer = true;
  }

  uncoveredCards++;

  /*
  Primera carta destapada, se le asigna una imagen a través de su id
  y se desactiva temporalmente a la espera de que se destape la segunda carta
  */
  if (uncoveredCards == 1) {
    card1 = document.getElementById(cardId);
    firstResult = numbers[cardId];
    card1.innerHTML = `<img src="./assets/${firstResult}.png" alt="${firstResult}">`;
    //Deshabilitar el primer botón
    card1.disabled = true;
  } 
  /*
  Segunda carta destapada, se le asigna una imagen a través de su id,
  se desactiva temporalmente a la espera de que se destape la segunda carta
  y se aumentan el número de movimientos realizados
  */
  else if (uncoveredCards == 2) {
    card2 = document.getElementById(cardId);
    secondResult = numbers[cardId];
    card2.innerHTML = `<img src="./assets/${secondResult}.png" alt="${secondResult}">`;
    //Deshabilitar el segundo botón
    card2.disabled = true;

    movements++;
    showMoves.innerHTML = `Movimientos: ${movements}`;

    /*
    Si coinciden el mismo número, se vuelve a resetear el contador de cartas destapadas
    para poder generar otra nueva pareja, se aumenta al contador de parejas encontradas y se
    ejecuta el sonido de pareja encontrada
    */
    if (firstResult === secondResult) {
      uncoveredCards = 0;
      success++;
      showSuccess.innerHTML = `Aciertos: ${success}`;
      coupleSound.play();
    } 
    //En caso contrario se ejecuta el audio de fallo al encontrar la pareja
    else {
      failSound.play();
      //Mostrar momentaneamente los valores y volver a tapar
      setTimeout(() => {
        //Ocultar de nuevo los valores
        card1.innerHTML = " ";
        card2.innerHTML = " ";
        //Se vuelven a activar los botones seleccionados anteriormente
        card1.disabled = false;
        card2.disabled = false;
        //Poner el contador de los botones descubiertos a 0 para que se pueda volver a seleccionar de nuevo otra pareja
        uncoveredCards = 0;
      }, 500);
    }

    //Si los aciertos llegan a 8 finaliza el juego
    if (success === 8) {
      winSound.play();
      //Se limpia el intervalo y se para el tiempo.
      clearInterval(setIntervalId);
      //Se muestran los mensajes de éxito correspondientes
      showSuccess.innerHTML = `¡Felicidades has ganado!<br> Aciertos: ${success}`;
      showTimer.innerHTML = `¡Has tardado solo ${time} segundos en completar el juego!`;
    }
  }
};
