(function constructor(args) {
	"use strict";

	//Lista de usuarios disponible en Alloy.Globals.userList;
	var personas = Alloy.Globals.userList,
	    numeroPersonas = personas.length;

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Añadimos evento al botón generar y asignamos callback
		$.addListener($.generar, "click", generarPerfil);
	})();

	/**
	 * generarPerfil
	 * @description Elige un perfil al azar y lo muestra en pantalla
	 */
	function generarPerfil() {
		console.log("generarPerfil");
		
		//Implementar función que escoja un usuario al azar
		var persona = obtenerPersonaAleatoria();
		
		//Mostramos en pantalla su foto y su nombre
		$.foto.setImage(persona.picture.large);
		$.nombre.setText(persona.name.title + " " + persona.name.first + " " + persona.name.last);
	}

	/**
	 * obtenerPersonaAleatoria
	 * @description Obtenemos un indice aleatorio de la lista y devolvemos su contenido
	 * @return {Object} persona
	 */
	function obtenerPersonaAleatoria() {
		return personas[Math.floor(Math.random()*numeroPersonas)];
	}

})($.args || {});
