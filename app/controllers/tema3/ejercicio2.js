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
		//Obtenemos manejador de fichero
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt
		//Si fichero existe lo leemos y volcamos contenido sobre etiqueta #fileContent
		//Si no existe mostramos un mensaje indicando que no existe el fichero
		var file,
		    text;

		file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "texto.txt");
		text = "No existe el fichero";

		if (file.exists()) {
			text = file.read().text;
		}

		$.fileContent.setText(text);
	}

	/**
	 * escribirFichero
	 * @description Callback boton escribir fichero, escribimos en fichero de texto
	 * contenido de textfield
	 * @param {Object} e
	 */
	function escribirFichero(e) {
		//Obtenemos manejador de fichero
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt
		//Solo escribimos si hay contenido en el área de texto #textArea
		//Si escritura exitosa mostramos mensaje de alerta indicando el éxito
		var text;

		text = $.textArea.getValue();

		if (text.length) {
			Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "texto.txt").write(text);
			Alloy.Globals.dialog("Alerta", "Fichero texto.txt guardado.");
		} else {
			Alloy.Globals.dialog("Alerta", "Text Area vacío. No guardamos el fichero");
		}
	}

})($.args || {}); 