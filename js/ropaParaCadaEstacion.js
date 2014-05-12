//------------------------------------------------------------------------------- VARIABLES GLOBALES
var respuestasCorrectas = 0
var cantidadPreguntas 	= [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
var cantidad 			= 12
var delay 				= 200
//------------------------------------------------------------------------------- On loads
$(document).ready(function(){
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
		$("<div>" + "<img class='imagen-" + cantidadPreguntas[i] + "' src='img-ropaParaCadaEstacion/img" + cantidadPreguntas[i] + ".png'>" + '</div>').data( 'numero', cantidadPreguntas[i] ).attr( 'id', 'card' + cantidadPreguntas[i] ).appendTo( '#contenedorPregunta' ).draggable( {
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
		$("<div id='resp" + i + "'>" + '</div>').data( 'numero', i ).appendTo( '#contenedorRespuesta' ).droppable( {
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
		estacionesOk.prendaOk( numeroRespuesta );
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
	  }
	}
	return {
		handleCardDrop : handleCardDrop
	}
})(jQuery);

var estacionesOk = (function($) {
	
	function prendaOk( value ) {
		if( value == 6 ) {
			$( '#card6 img' ).attr("src", "img-ropaParaCadaEstacion/resp6.png");
		} else if( value == 4 ) {
			$( '#card4 img' ).attr("src", "img-ropaParaCadaEstacion/resp4.png");
		} else if( value == 2 ) {
			$( '#card2 img' ).attr("src", "img-ropaParaCadaEstacion/resp2.png");
		} else if( value == 8 ) {
			$( '#card8 img' ).attr("src", "img-ropaParaCadaEstacion/resp8.png");
		} else if( value == 7 ) {
			$( '#card7 img' ).attr("src", "img-ropaParaCadaEstacion/resp7.png");
			$( '.imagen-7' ).css({ 'z-index' : '999999999999999999999999999999999 !important' });
		} else if( value == 5 ) {
			$( '#card5 img' ).attr("src", "img-ropaParaCadaEstacion/resp5.png");
		} else if( value == 9 ) {
			$( '#card9 img' ).attr("src", "img-ropaParaCadaEstacion/resp9.png");
		} else if( value == 10 ) {
			$( '#card10 img' ).attr("src", "img-ropaParaCadaEstacion/resp10.png");
		} else if( value == 3 ) {
			$( '#card3 img' ).attr("src", "img-ropaParaCadaEstacion/resp3.png");
		} else if( value == 1 ) {
			$( '#card1 img' ).attr("src", "img-ropaParaCadaEstacion/resp1.png");
		} else if( value == 12 ) {
			$( '#card12 img' ).attr("src", "img-ropaParaCadaEstacion/resp12.png");
		} else if( value == 11 ) {
			$( '#card11 img' ).attr("src", "img-ropaParaCadaEstacion/resp11.png");
		}
	}
	return {
		prendaOk : prendaOk
	}
	
})(jQuery);