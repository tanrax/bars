//Variables
var iNumBarras = 5;
var iInterNewBar = 5;
var iContBarPuls = 0;
var iTiemCaidaBarr = 5000;
var iTiemMovCuadro = iTiemCaidaBarr;
var iTiemSubirBarr = 500;
var iTiemDesapaCuadro = 2000;
var $botonEmpezar = $('#botonEmpezar');
var sTextReinicio = 'Replay';
var iTiemDelayTutorial = 3000;
var aBarrasOrden = new Array();
var $titulo = $('#titulo');
var $barras = $('.barras');
var $cuadro = $('#cuadro');
var $barra1 = $('#barra1');
var $barra2 = $('#barra2');
var $barra3 = $('#barra3');
var $barra4 = $('#barra4');
var $barra5 = $('#barra5');
var $tutorial = $('#tutorial');
var mostrarTutorial = false;
var bEmpezada = false;
var bJugando = false;
var iNivel = 1;
var iToques = 0;
var iTiem = 0;
var $nivel = $('#nivel');
var $nivelNum = $('#nivel #numero');
var $toques = $('#toques');
var $toquesNum = $('#toques #numeros');
var $tiempo = $('#tiempo');
var $tiempoNum = $('#tiempo #segundos');
var $cartelNivel = $('#cartelNivel');
$cartelNivel.hide();
$nivel.hide();
$toques.hide();
$tiempo.hide();

/*  GESTION DE PARTIDA */

/**
 * Método que inicia la partida
 */
var iniciarPartida = function() {
	console.log('Iniciando');
	bEmpezada = true;
	generarNivel();
	//Quitar titulo y boton de inicio
	$titulo.fadeOut(iTiemDesapaCuadro);
	$botonEmpezar.fadeOut(iTiemDesapaCuadro, 'linear', function() {
		//Muestra el nivel
		$cartelNivel.fadeIn(iTiemDesapaCuadro).delay(iTiemDesapaCuadro).fadeOut(iTiemDesapaCuadro, function() {
		    //Mover barras
			$barra3.animate({
				height: iAltura
			}, iTiemCaidaBarr, 'linear');
				//Mostrar carteles de tiempo, toques y nivel
				$nivel.fadeIn(iTiemDesapaCuadro);
				$toques.fadeIn(iTiemDesapaCuadro);
				$tiempo.fadeIn(iTiemDesapaCuadro);
				//Mover cuadro
				moverCuadro();
				//Muestra tutorial
				setTimeout('mostrarTutorial()', iTiemDelayTutorial / 2);
				//Cambiar posición de botón
				$botonEmpezar.css('top', '90px');
				
	  			bJugando = true;
		});
	});
}

/**
 * Método que reinicia la partida
 */
var reiniciarPartida = function() {
	console.log('Reiniciando');
	generarNivel();
	//Quitar boton
	$botonEmpezar.fadeOut(iTiemDesapaCuadro, 'linear', function() {
		//Reinicia cuadro
		$cuadro.css('left', '-25%');
		$cuadro.fadeIn(1);
		//Mover cuadro
		moverCuadro();
		bJugando = true;
		//Reinicia barras
		$barras.css('height', '0');
		$barras.fadeIn(1);
	    //Mover barras
		$barra3.animate({
			height: iAltura
		}, iTiemCaidaBarr, 'linear');
  	});
}

/**
 * Método para terminar la partida
 */
var finPartida = function() {
	console.log('Fin partida');
	bJugando = false;
	$barras.stop();
	//Quitar barras
	$barras.fadeOut(iTiemDesapaCuadro);
	//Mostrar boton de reinicio
	$botonEmpezar.html(sTextReinicio);
	$botonEmpezar.fadeIn(iTiemDesapaCuadro);
	//Quitar cuadro
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
}

var generarNivel = function() {
	switch(iNivel) {
		case 1:
			iTiem = 20;
			iToques = 15;
			iInterNewBar = 5;
			break;
		case 2:
			iTiem = 30;
			iToques = 30;
			iInterNewBar = 4;
			break;
		case 3:
			iTiem = 30;
			iToques = 25;
			iInterNewBar = 4;
			break;
		case 4:
			iTiem = 40;
			iToques = 35;
			iInterNewBar = 2;
			break;
		case 5:
			iTiem = 30;
			iToques = 18;
			iInterNewBar = 4;
			break;
		default:
			iTiem = 30;
			iToques = 45 - iNivel;
			iTiemMovCuadro = iTiemCaidaBarr + (iNivel * 100);
			iInterNewBar = 1;
			break;
	}
	aBarrasOrden = new Array();
	iContBarPuls = 0;
	$tiempoNum.html(iTiem);
	$nivelNum.html(iNivel);
	$toquesNum.html(iToques);
	$cartelNivel.html($nivel.html());
}

var gestionarTiempo = function() {
	if(iTiem > 0 && bJugando) {
		iTiem--;
		$tiempoNum.html(iTiem);
	} else if(iTiem == 0 && bJugando) {
		cambiarNivel();
	}
}

setInterval('gestionarTiempo()', 1000);

var cambiarNivel = function() {
	iNivel++;
	console.log('Cambiando a nivel' + iNivel);
	bJugando = false;
	$barras.stop();
	//Quitar barras
	$barras.fadeOut(iTiemDesapaCuadro);
	//Quitar cuadro
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	$cuadro.stop();
	$cuadro.fadeOut(iTiemDesapaCuadro);
	//Mostrar cartel
	$nivelNum.html(iNivel);
	$cartelNivel.html($nivel.html());
	$cartelNivel.fadeIn(iTiemDesapaCuadro).delay(iTiemDesapaCuadro).fadeOut(iTiemDesapaCuadro, function() {
		//Empezar partida
		reiniciarPartida();
	});
}

/* GESTION DE BARRAS */

/**
 * Método que devuelve entre 1 y iLim
 * @return {Int}
 */
var numeroAlAzar = function(iniLim) {
	return Math.floor((Math.random() * iniLim) + 1);
}

/**
 * Método que mueve las barras según toca
 */
var moverOtrasBarras = function() {
	//Genera posiciones aleatorias
	if(aBarrasOrden.length < iNumBarras) {
		var iAzar = 0;
		var bMeter = true;
		aBarrasOrden.push(3);
		while(aBarrasOrden.length < iNumBarras) {
			iAzar = numeroAlAzar(iNumBarras);
			if(iAzar != 3 && aBarrasOrden.indexOf(iAzar) == -1) {
				aBarrasOrden.push(iAzar);
			}
		}
	}
	//Cuenta las veces que se pulsa
	iContBarPuls++;
	//Inicia nueva barra
	if((iContBarPuls % iInterNewBar) == 0
		&& iContBarPuls / iInterNewBar < aBarrasOrden.length) {
		var iPosSig = iContBarPuls / iInterNewBar;
		reiniciarBarra(eval('$barra' + aBarrasOrden[iPosSig]));
	}
}

/**
 * Método que gestiona el toque de la barra
 */
var gestionarBarra = function($inBarra) {
	if(iToques > 0) {
		reiniciarBarra($inBarra);
		iToques--;
		$toquesNum.html(iToques);
		if(mostrarTutorial) {
			ocultarTutorial();
		}
		moverOtrasBarras();
	} else {
		finPartida();
	}
	
}

/**
 * Método que reinicia la posición de la barra
 * @param  {JQuery} $inBarra
 */
var reiniciarBarra = function($inBarra) {
	$inBarra.stop();
	$inBarra.animate({
	  height: 0
	}, iTiemSubirBarr, 'linear', function() {
    	$inBarra.animate({
		  height: iAltura
		}, iTiemCaidaBarr, 'linear');
  	});
}

/* GESTION DE CUADRO */

/**
 * Método que mueve el cuadro
 */
var moverCuadro = function() {
	$cuadro.animate({
	  left: iAnchura
	}, iTiemMovCuadro, 'linear', function() {
		$cuadro.css('left', '-25%');
    	moverCuadro();
  	});
}

/* GESTION DE TUTORIAL */

/**
 * Método que muestra el tutorial
 */
var mostrarTutorial = function() {
	if(typeof(Storage) !== 'undefined') {
		if(localStorage.getItem('tutorial') == null) {
			localStorage.setItem('tutorial', '1');
			$barras.stop();
			$cuadro.stop();
			$tutorial.css('visibility', 'visible');
			$barra3.append('<div class="pulsar" id="pulsarTutorial"></div>');
			mostrarTutorial = true;
		}
	}
}

/**
 * Método que oculta el tutorial
 * @return {[type]} [description]
 */
var ocultarTutorial = function() {
	$tutorial.css('visibility', 'hidden');
	$barra3.html('');
	moverCuadro();
	mostrarTutorial = false;
}

/* COLISIONES */

/**
 * Método que comprueba el final del juego
 */
var comprobarFinJuego = function() {
	if((collision($barra1, $cuadro) 
		|| collision($barra2, $cuadro)
		|| collision($barra3, $cuadro)
		|| collision($barra4, $cuadro)
		|| collision($barra5, $cuadro))
		&& bJugando) {
		finPartida();
	}
}

setInterval('comprobarFinJuego()', 50);

/**
 * Método que comprueba si ha colisionado dos divs
 * @param  {JQuery} $div1
 * @param  {JQuery} $div2
 * @return {boolean}
 */
function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }