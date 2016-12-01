(function constructor(args) {
	"use strict";

	var items = [];

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Añadimos evento click a la lista y su callback
		$.addListener($.list, "itemclick", clickEnLista);
	})();

	/**
	 * clickEnLista
	 * @description Callback cuando se pulsa en un elmento de la lista
	 * @param {Object} e
	 */
	function clickEnLista(e) {
		//Implementar función que dado un click en un ListItem obtendremos
		//su información y la mostraremos en pantalla mediante un mensaje de alerta
		
		//Obtenemos los datos de la persona
		var nombrePersona = e.section.items[e.itemIndex].properties.data.name;
		
		//Mostramos mensaje
		Alloy.Globals.dialog("Click en persona", nombrePersona);
	}

	/**
	 * prepararItems
	 * @description Preparamos cada ListItem
	 * @param {Object} persona
	 */
	function prepararItems(persona) {
		var name = persona.name.title + " " + persona.name.first + " " + persona.name.last;
		return {
			properties : {
				//Creamos un objeto con datos que nos interesa recoger en el callback
				data:{
					name: name
				},
				accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			},
			foto : {
				image : persona.picture.thumbnail
			},
			nombre : {
				text : name
			},
			template : "user_template"
		};
	}

	//Lista de usuarios disponible en Alloy.Globals.userList;

	//Preparamos la lista de ListItems
	items = Alloy.Globals.userList.map(prepararItems);

	//Rellenar la lista con los elementos de la userList
	$.section.setItems(items);

})($.args || {}); 