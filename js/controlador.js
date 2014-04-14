/* Quita delay de smartphones al hacer click */
window.addEventListener('load', function () {
	FastClick.attach(document.body);
}, false);

$('.barras').click(function() {
	$barra = $(this);
	if(bJugando) gestionarBarra($barra);
});

$('#botonEmpezar').click(function() {
	if(!bEmpezada) {
		iniciarPartida();
	} else {
		reiniciarPartida();
	}
});