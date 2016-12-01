(function constructor(args) {
	"use strict";

	var CAMPOS_REQUERIDOS = ["nombre", "email", "mensaje"],
	CAMPOS = ["nombre", "apellidos", "email", "telefono", "mensaje"];

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Añadimos evento al botón enviar y asignamos callback
		$.addListener($.enviar, "click", validarCamposRequeridos);

		//Añadimos evento al botón reset y asignamos callback
		$.addListener($.reset, "click", resetFormulario);
	})();

	/**
	 * validarCamposRequeridos
	 * @description Validamos campos requeridos
	 * @param {Object} e
	 */
	function validarCamposRequeridos(e) {
		//Implementar función de validación de campos requeridos
		//Nombre, email y mensaje
		var camposErroneos = hayCamposErroneos();

		resetCamposErroneos();

		//Hay campos erroneos
		if (camposErroneos.length) {
			//Marcamos campos erróneos
			camposErroneos.forEach(function(campo) {
				$[campo].setBorderColor(Alloy.CFG.rojo);
			});
		} else {
			//Validación correcta mensaje de alerta "Mensaje enviado."
			Alloy.Globals.dialog("Atención", "Mensaje enviado");
		}
	}

	/**
	 * hayCamposErroneos
	 * @description Comprueba que existan campos erróneos
	 * @return {Object} camposErroneos
	 */
	function hayCamposErroneos() {
		var camposRequeridos = CAMPOS_REQUERIDOS,
		    camposErroneos = [];

		resetCamposErroneos();

		camposRequeridos.forEach(function(campo) {
			//Si el campo de texto no contiene texto es erróneo
			if (!$[campo].value.length) {
				camposErroneos.push(campo);
			}
		});

		return camposErroneos;
	}

	/**
	 * resetCamposErroneos
	 * @description Resetea el borde de los campos
	 */
	function resetCamposErroneos() {
		["nombre", "email", "mensaje"].forEach(function(campo) {
			$[campo].setBorderColor(Alloy.CFG.gris);
		});
	}

	/**
	 * resetFormulario
	 * @description Vaciamos los campos del formulario
	 * @param {Object} e
	 */
	function resetFormulario(e) {

		var campos = CAMPOS;
		
		campos.forEach(function(campo){
			$[campo].setValue("");
		});
	}

})($.args || {});
