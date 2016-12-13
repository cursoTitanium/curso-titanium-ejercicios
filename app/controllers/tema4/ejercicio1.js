(function constructor(args) {
	"use strict";

	var modoEditor,
	    idEnEdicion,
	    db,
	    MODO_NUEVO,
	    MODO_EDICION;

	MODO_NUEVO = 1;
	MODO_EDICION = 2;

	modoEditor = null;
	idEnEdicion = null;

	//Al iniciar el controlador debemos instalar la base de datos
	db = Ti.Database.install("/db/peliculas", "peliculas");

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecer callback para el evento open la ventana $.win
		$.addListener($.win, "open", cargarDatos);
		$.addListener($.win, "close", limpiarControlador);

		//Establecer callback para el evento itemclick de la lista $.list
		$.addListener($.list, "itemclick", editarItem);

		//Establecer callback para el evento click de la etiqueta $.nuevaPelicula
		$.addListener($.nuevaPelicula, "click", nuevaPelicula);

		//Establecer callbacks botones formulario
		$.addListener($.guardar, "click", guardarPelicula);
		$.addListener($.eliminar, "click", borrarPelicula);
		$.addListener($.cancelar, "click", cerrarEditor);
	})();

	/**
	 * cargarDatos
	 * @description Cargar base de datos
	 * @param {Object} e
	 */
	function cargarDatos(e) {
		var resultSet;

		//Obtener todos los datos de la base de datos
		//Preparamos query, ejecutamos y obtenemos un ResultSet
		resultSet = db.execute("SELECT * FROM PELICULAS");

		//Llamar a mostrarDatos pasándole como parámetro un ResultSet
		mostrarDatos(resultSet);
	}

	/**
	 * mostrarDatos
	 * @description Muestra los datos de la DB en la lista
	 * @param {Object} resultSet Conjunto de registros
	 */
	function mostrarDatos(resultSet) {
		var items;

		items = [];

		//Iterar sobre los registros: while(resultSet.isValidRow())
		//Añadimos cada registro como item: items.push(prepararItem(registro))
		while (resultSet.isValidRow()) {
			items.push(prepararItem(resultSet));
			resultSet.next();
		}

		//Cerramos resultSet
		resultSet.close();

		//Mostramos elementos en la lista
		$.section.setItems(items);
	}

	/**
	 * prepararItem
	 * @description Prepara el objeto para un ListItem
	 * @param {Object} registro Objeto resultSet
	 */
	function prepararItem(registro) {

		var pelicula = {
			id : registro.fieldByName("id"),
			titulo : registro.fieldByName("titulo"),
			genero : registro.fieldByName("genero"),
			año : registro.fieldByName("año"),
			sinopsis : registro.fieldByName("sinopsis")
		};

		//Preparar objeto pelicula obteniendo la información
		//para cada item del registro

		return {
			properties : {
				width : Ti.UI.FILL,
				height : 48,
				title : pelicula.titulo,
				color : "black",
				accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
				pelicula : pelicula
			}
		};
	}

	/**
	 * actualizarLista
	 * @description Carga los datos
	 */
	function actualizarLista() {
		cargarDatos();
	}

	/**
	 * nuevaPelicula
	 * @description Abre el editor para añadir una nueva pelicula
	 * @param {Object} e
	 */
	function nuevaPelicula(e) {
		modoEditor = MODO_NUEVO;
		$.editor.show();
	}

	/**
	 * editarItem
	 * @description Callback de click en un item de la lista, llenamos el formulario
	 * @param {Object} e
	 */
	function editarItem(e) {
		//Obtener item de lista
		var pelicula = e.section.getItemAt(e.itemIndex).properties.pelicula;

		//Guardar ID en idEnEdicion
		idEnEdicion = pelicula.id;

		//Rellenar el formulario
		$.titulo.setValue(pelicula.titulo);
		$.genero.setValue(pelicula.genero);
		$.año.setValue(pelicula.año);
		$.sinopsis.setValue(pelicula.sinopsis);

		//Establecemos modo de edición y mostramos formulario
		modoEditor = MODO_EDICION;
		$.editor.show();
	}

	/**
	 * guardarPelicula
	 * @description Dependiendo del modo de edicion insertamos o actualizamos
	 * @param {Object} e
	 */
	function guardarPelicula(e) {

		if (modoEditor == MODO_NUEVO) {
			insertarPelicula();
		} else if (modoEditor == MODO_EDICION) {
			actualizarPelicula();
		}

		//Cerramos editor
		cerrarEditor();

		//Refrescamos lista
		actualizarLista();
	}

	/**
	 * insertarPelicula
	 * @description Insertamos registro en DB
	 */
	function insertarPelicula() {

		var query,
		    titulo,
		    genero,
		    año,
		    sinopsis;

		//Solo insertamos si todos los campos tienen valores
		if (esFormularioValido()) {

			//Obtenemos datos del formulario
			titulo = $.titulo.getValue();
			genero = $.genero.getValue();
			año = $.año.getValue();
			sinopsis = $.sinopsis.getValue();

			//Preparamos query
			query = "INSERT INTO PELICULAS (TITULO, GENERO, AÑO, SINOPSIS) VALUES (?, ?, ?, ?);";

			//Insertamos en la base de datos
			db.execute(query, titulo, genero, año, sinopsis);
		}
	}

	/**
	 * actualizarPelicula
	 * @description Actualizamos registro en DB
	 */
	function actualizarPelicula() {

		var query,
		    titulo,
		    genero,
		    año,
		    sinopsis;

		//Solo actualizamos si todos los campos tienen valores
		if (esFormularioValido()) {

			//Obtenemos datos del formulario
			titulo = $.titulo.getValue();
			genero = $.genero.getValue();
			año = $.año.getValue();
			sinopsis = $.sinopsis.getValue();

			//Preparamos query
			query = "UPDATE PELICULAS SET TITULO=?, GENERO=?, AÑO=?, SINOPSIS=? WHERE ID=?;";

			//Actualizamos la base de datos
			db.execute(query, titulo, genero, año, sinopsis, idEnEdicion);
		}
	}

	/**
	 * borrarPelicula
	 * @description Eliminamos registro de DB
	 */
	function borrarPelicula() {
		var query;

		if (modoEditor == MODO_EDICION) {
			//Preparamos query con idEnEdicion
			query = "DELETE FROM PELICULAS WHERE ID=?;";

			//Eliminamos registro
			db.execute(query, idEnEdicion);

			//Actualizamos la lista
			actualizarLista();

			cerrarEditor();
		}
	}

	/**
	 * cerrarEditor
	 * @description Cierra el editor y resetea valores
	 * @param {Object} e
	 */
	function cerrarEditor(e) {
		//Reset idEnEdicion y editor
		idEnEdicion = null;
		modoEditor = null;

		//Reset formulario
		$.titulo.setValue("");
		$.genero.setValue("");
		$.año.setValue("");
		$.sinopsis.setValue("");

		//Ocultamos editor
		$.editor.hide();
	}

	/**
	 * esFormularioValido
	 * @description Comprueba que todos los campos tengan contenido
	 * @return {Boolean}
	 */
	function esFormularioValido() {
		return ["titulo", "genero", "año", "sinopsis"].every(function(campo) {
			return $[campo].hasText();
		});
	}

	/**
	 * limpiarControlador
	 * @description Cerramos base de datos
	 * @param {Object} e
	 */
	function limpiarControlador(e) {
		db.close();
	}

})($.args || {}); 