(function constructor(args) {
	"use strict";

	//Lista de usuarios disponible en
	//https://randomuser.me/api/?format=json&results=50
	
	var items = [],
	url = "https://randomuser.me/api/?format=json&results=50";

	//Preparamos la lista de ListItems

	//Rellenar la lista con los elementos de la userList

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		$.addListener($.win, "open", onOpen);
		//Añadimos evento click a la lista y su callback
		$.addListener($.list, "itemclick", clickEnLista);
	})();

	function onOpen(e){
		showLoader();
		setTimeout(getUserList, 5000);
		//getUserList();
	}

	function showLoader(){
		$.activityIndicator.show();
		$.loader.setHeight(Ti.UI.FILL);
	}

	function hideLoader(){
		$.activityIndicator.hide();
		$.loader.setHeight(0);		
	}

	function getUserList(){
		var httpClient = Ti.Network.createHTTPClient({
			timeout: 5000,
			onload: success,
			onerror: error
		});
		
		httpClient.open("GET", url);
		httpClient.send();
	}

	function success(e){
		
		var userList = JSON.parse(this.getResponseText()).results;
		
		$.section.setItems(userList.map(prepararItems));
		setTimeout(hideLoader, 5000);
	}

	function error(e){
		
	}

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

})($.args || {}); 