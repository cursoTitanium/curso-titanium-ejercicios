(function constructor(args) {
	"use strict";

	var BOTONES_MENU = ["inicio", "fotos", "mensajes", "perfil"];

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Añadimos eventos de click a los elementos del menú y su callback
		var botones = BOTONES_MENU;

		botones.forEach(function(boton) {
			$.addListener($[boton], "click", clickEnMenu);
		});
	})();

	/**
	 * clickEnMenu
	 * @description Callback cuando se pulsa en un item de menu
	 * @param {Object} e
	 */
	function clickEnMenu(e) {
		//Implementar función que asigna una clase activa al menú pulsado
		//Y deja el resto como inactivas
		var resetItems,
		    label;

		switch(e.source.id) {
		case "inicio":
			$.addClass($.inicio, "menuItemActivo");
			resetItems = ["fotos", "mensajes", "perfil"];
			label = "Inicio";
			break;
		case "fotos":
			$.addClass($.fotos, "menuItemActivo");
			resetItems = ["inicio", "mensajes", "perfil"];
			label = "Fotos";
			break;
		case "mensajes":
			$.addClass($.mensajes, "menuItemActivo");
			resetItems = ["inicio", "fotos", "perfil"];
			label = "Mensajes";
			break;
		case "perfil":
			$.addClass($.perfil, "menuItemActivo");
			resetItems = ["inicio", "fotos", "mensajes"];
			label = "Perfil";
			break;
		default:
			break;
		}

		if (resetItems) {
			resetItems.forEach(function(item) {
				$.resetClass($[item], item);
			});
		}

		//Añadir contenido a vista contenedor.
		if (label) {
			//Si ya hay una vista en el contenedor
			//debemos eliminarla antes para añadir la nueva
			$.container.removeAllChildren();
			$.container.add(Ti.UI.createLabel({
				text : label,
				color : Alloy.CFG.negro,
				font: {
					fontSize: 18,
					fontWeight: "bold"
				}
			}));
		}
	}

})($.args || {});
