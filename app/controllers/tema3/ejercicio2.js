(function constructor(args) {
	"use strict";

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecemos eventos sobre los botones
		$.addListener($.readFile, "click", leerFichero);
		$.addListener($.writeFile, "click", escribirFichero);
	})();

	/**
	 * leerFichero
	 * @description Callback boton leer fichero, leemos fichero de texto
	 * @param {Object} e
	 */
	function leerFichero(e) {

		var file,
		    text;

		//Obtenemos manejador de fichero
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt
		file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "miFichero.txt");

		//Si no existe mostramos un mensaje indicando que no existe el fichero
		text = "No existe el fichero";

		//Si fichero existe lo leemos y volcamos contenido sobre etiqueta #fileContent
		if (file.exists()) {
			text = file.read().text;
		}

		//Establecemos con tenido de fichero en Label
		$.fileContent.setText(text);
	}

	/**
	 * escribirFichero
	 * @description Callback boton escribir fichero, escribimos en fichero de texto
	 * contenido de textfield
	 * @param {Object} e
	 */
	function escribirFichero(e) {

		var text;

		text = $.textArea.getValue();

		//Solo escribimos si hay contenido en el área de texto #textArea
		if (text.length) {
			//Obtenemos manejador de fichero
			//Utilizamos directorio privado de aplicación
			//Nombre de fichero: miFichero.txt
			Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "miFichero.txt").write(text);
			
			//Si escritura exitosa mostramos mensaje de alerta indicando el éxito
			Alloy.Globals.dialog("Alerta", "Fichero texto.txt guardado.");
		} else {
			Alloy.Globals.dialog("Alerta", "Text Area vacío. No guardamos el fichero");
		}
	}

})($.args || {});