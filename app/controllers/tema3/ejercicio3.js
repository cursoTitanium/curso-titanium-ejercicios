(function constructor(args) {
	"use strict";

	//Lista de usuarios disponible en
	//https://randomuser.me/api/?format=json&results=50
	
	var items = [],
	url = "https://randomuser.me/api/?format=json&results=50";

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		$.addListener($.win, "open", onOpen);
		//Añadimos evento click a la lista y su callback
		$.addListener($.list, "itemclick", clickEnLista);
	})();

	/**
	 * onOpen
	 * @description Callback evento open
	 * @param {Object} e
	 */
	function onOpen(e){
		showLoader();
		setTimeout(getUserList, 3000);
	}

	/**
	 * showLoader
	 * @description Muestra un loader
	 */
	function showLoader(){
		$.activityIndicator.show();
		$.loader.setHeight(Ti.UI.FILL);
	}

	/**
	 * hideLoader
	 * @description Oculta loader
	 */
	function hideLoader(){
		$.activityIndicator.hide();
		$.loader.setHeight(0);		
	}

	/**
	 * getUserList
	 * @description GET a lista de usuarios
	 */
	function getUserList(){
		//Creamos httpClient
		var httpClient = Ti.Network.createHTTPClient({
			timeout: 5000,
			onload: success,
			onerror: error
		});
		
		//Abrimos conexión
		httpClient.open("GET", url);
		
		//Solicitamos datos
		httpClient.send();
	}

	/**
	 * success
	 * @description Callback exito httpClient
	 * @param {Object} e
	 */
	function success(e){
		
		var userList = JSON.parse(this.getResponseText()).results;
		
		$.section.setItems(userList.map(prepararItems));
		setTimeout(hideLoader, 5000);
	}

	/**
	 * success
	 * @description Callback error httpClient
	 * @param {Object} e
	 */
	function error(e){
		alert(JSON.stringify(e.error));
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