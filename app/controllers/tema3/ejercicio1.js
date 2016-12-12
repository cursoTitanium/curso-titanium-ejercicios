(function constructor(args) {
	"use strict";

	//Debemos establecer los valores almacenados en properties en las vistas correspondientes
	//#username
	//#password
	//#notifications
	prepararAjustes();

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecemos listeners a las filas
		$.addListener($.usernameRow, "click", onClickUsernameRow);
		$.addListener($.passwordRow, "click", onClickPasswordRow);

		//Establecemos listeners a los AlertDialogs
		$.addListener($.editUsername, "click", onEditUsername);
		$.addListener($.editPassword, "click", onEditPassword);

		//Establecemos listener al elemento Switch
		$.addListener($.notifications, "change", onChangeNotifications);
	})();

	function prepararAjustes() {
		var password = Ti.App.Properties.getString("password", "Introducir contraseña");

		if (password == "Introducir contraseña") {
			$.password.setText(password);
		} else {
			$.password.setText(password.replace(/./g, "*"));
		}

		$.username.setText(Ti.App.Properties.getString("username", "Introducir usuario"));
		$.notifications.setValue(Ti.App.Properties.getBool("notifications", false));
	}

	/**
	 * onClickUsernameRow
	 * @description Callback al hacer click sobre la fila de usuario
	 * @param {Object} e
	 */
	function onClickUsernameRow(e) {
		//Abrimos diálogo de cambio de usuario

		$.editUsername.show();
	}

	/**
	 * onClickPasswordRow
	 * @description Callback al hacer click sobre la fila de password
	 * @param {Object} e
	 */
	function onClickPasswordRow(e) {
		//Abrimos diálogo de cambio de password

		$.editPassword.show();
	}

	/**
	 * onEditUsername
	 * @description Callback al terminar el dialogo de usuario
	 * @param {Object} e
	 */
	function onEditUsername(e) {
		//Si pulsamos en Aceptar
		var username;

		if (e.index == 0) {
			//Recogemos el valor del TextField con ID usernameField
			//Lo almacemamos en properties
			//Actualizamos la etiqueta de la fila Usuario
			//Establecemos el valor del TextField a cadena vacía
			
			username = $.usernameField.getValue();
			
			if (username.length) {
				$.username.setText(username);
				$.usernameField.setValue("");
				Ti.App.Properties.setString("username", username);
			}
		}
	}

	/**
	 * onEditPassword
	 * @description Callback al terminar el dialogo de password
	 * @param {Object} e
	 */
	function onEditPassword(e) {
		var password;
		
		//Si pulsamos en Aceptar
		if (e.index == 0) {
			//Recogemos el valor del TextField con ID passwordField
			//Lo almacemamos en properties
			//Actualizamos la etiqueta de la fila password transformándola en asteriscos
			//Establecemos el valor del TextField a cadena vacía
			
			password = $.passwordField.getValue();
			
			if (password.length) {
				$.password.setText(password.replace(/./g, "*"));
				$.passwordField.setValue("");
				Ti.App.Properties.setString("password", password);
			}
		}
	}

	/**
	 * onChangeNotifications
	 * @description Callback cuando cambia de valor el componente switch
	 * @param {Object} e
	 */
	function onChangeNotifications(e) {
		//Recogemos el valor del Switch con ID notifications
		//Lo almacenamos en properties
		Ti.App.Properties.setBool("notifications", e.value);
	}

})($.args || {});
