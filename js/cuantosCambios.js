//------------------------------------------------------------------------------- VARIABLES GLOBALES
var respuestasCorrectas = 0;
var cantidadPreguntas 	= [ 1, 2, 3, 4, 5, 6, 7, 8 ];
var cantidad 			= 8;
var delay 				= 200;
//------------------------------------------------------------------------------- On loads
$(document).ready(function(){
	$( 'div#RespOK' ).hide();
	$( "#contenedorRespuesta" ).hide();
	$( '#contenedorPregunta' ).hide();
	$( '#finalExitoso' ).hide();
	$( 'header' ).hide();
	$('#fallaste').hide();
	$( '#muyBien' ).hide();
 });
//------------------------------------------------------------------------------- Seteos Iniciales
function init() {
	// Ocultar mensaje de exito
	$('#finalExitoso').hide();
	$( 'div#RespOK' ).fadeOut( delay );
	$( "#contenedorRespuesta" ).delay( delay ).fadeIn( delay );
	$( '#contenedorPregunta' ).delay( delay * 2 ).fadeIn( delay );
	// Reseteado del juego 
	respuestasCorrectas = 0;
	$( '#contenedorPregunta' ).html( '' );
	$( '#contenedorRespuesta' ).html( '' );
	// Creación preguntas
	cantidadPreguntas.sort( function() { return Math.random() - .5 } );
	Preguntas.crearPreguntas();
	Respuestas.creaRespuestas();
	$( "header" ).fadeIn( delay );
	$( '#incio' ).fadeOut( delay );
	$( '#fondo' ).fadeOut( delay );
}
//------------------------------------------------------------------------------- Creación de preguntas
var Preguntas = (function($) {
	function crearPreguntas() {
	  for ( var i=0; i<cantidad; i++ ) {
		$('<div>' + "<img src='img-cuantosCambios/img" + cantidadPreguntas[i] + ".png'>" + '</div>').data( 'numero', cantidadPreguntas[i] ).attr( 'id', 'card' + cantidadPreguntas[i] ).appendTo( '#contenedorPregunta' ).draggable( {
		  containment	: 'section',
		  stack			: '#contenedorPregunta div',
		  cursor		: 'move',
		  revert		: true
		} );
	  }
	}
	return {
		crearPreguntas : crearPreguntas
	}
})(jQuery);
//-------------------------------------------------------------------------------Creación de respuestas
var Respuestas = (function($) {
	function creaRespuestas() {
	  for ( var i=1; i<=cantidad; i++ ) {
		$("<div class='resp-" + i + "'>" + '</div>').data( 'numero', i ).appendTo( '#contenedorRespuesta' ).droppable( {
		  accept		: '#contenedorPregunta div',
		  hoverClass	: 'hovered',
		  drop			: DropDrag.handleCardDrop
		});
	  }
	}
	return {
		creaRespuestas : creaRespuestas
	}
})(jQuery);

//------------------------------------------------------------------------------- Drop and Drag
var DropDrag = (function($) {
	function handleCardDrop( event, ui ) {
	  var numeroRespuesta = $(this).data( 'numero' );
	  var numeroPregunta = ui.draggable.data( 'numero' );
	  // Si la tarjeta se redujo a la ranura correcta,
	  // modificar el color de la tarjeta, colocarla directamente
	  // encima de la ranura, y evitar que se arrastra otra vez.
	  if ( numeroRespuesta == numeroPregunta ) {
		ui.draggable.addClass( 'correct' );
		ui.draggable.draggable( 'disable' );
		$(this).droppable( 'disable' );
		ui.draggable.position( { 
			of: $(this), 
			my: 'left top', 
			at: 'left top' 
		} );
		ui.draggable.draggable( 
			'option', 
			'revert',
			 false 
		 );
		respuestasCorrectas++;
		$( '#muyBien' ).show().delay( delay * 2 ).fadeOut( delay );
	  } else {
		//alert( 'Hola' );
		$( '#fallaste' ).show();
		$( '#fallaste' ).delay( delay * 3 ).fadeOut( delay );
	
		}
	  // Si todas las cartas han sido colocadas correctamente, mostrar un mensaje 
	  // Y reiniciar las tarjetas para otra oportunidad
	  if ( respuestasCorrectas == cantidad ) {
		$('#finalExitoso').show();
		//alert('exitoso');
	  }
	}
	return {
		handleCardDrop : handleCardDrop
	}
})(jQuery);