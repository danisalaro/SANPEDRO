//Métodos de la clase map que "hereda" de leaflet
import * as mapMethods from "./mapMethods.js";
import * as adminDB from "./adminDB.js";

//Evento para borrar puntos nuevos
const btnCancelarNuevosPuntos = document.getElementById("btn-cancelar-nuevos-puntos")
btnCancelarNuevosPuntos.addEventListener("click",(e) => {
  //Limpiado del mapa
  recargarPagina();
  //Limpiar localStorage de nuevos puntos
  localStorage.setItem("coleccionNuevosPuntosMapa", "[]");
  
})

//Evento de guardado de los puntos agregados
const btnGuardarNuevosPuntos = document.getElementById("btn-guardar-nuevos-puntos")
btnGuardarNuevosPuntos.addEventListener("click", (e) => {

  //Obtener colección de puntos nuevos del local storage  
  let coleccionNuevosPuntosMapa = JSON.parse(localStorage.getItem("coleccionNuevosPuntosMapa"));  

  if (confirm("¿Confirma el registro de los marcadores agregados al mapa?") && coleccionNuevosPuntosMapa.length > 0) {

    //Cargar base de datos de puntos en JSON para registrar los nuevos puntos
    let jsonPuntos = JSON.parse(localStorage.getItem("puntos"));

    //Por cada uno de los puntos nuevos, realizar una adición en la base de datos
    for (let i = 0; i < coleccionNuevosPuntosMapa.length; i++) {      
      //Crear los puntos en Firebase
      adminDB.InsertData(coleccionNuevosPuntosMapa[i],jsonPuntos.length + i)      
    }
    
    //Por cada uno de los puntos nuevos, realizar una adición en la base de datos
    for (let i = 0; i < coleccionNuevosPuntosMapa.length; i++) {
      //Actualizar contenedor local
      jsonPuntos.push(
        coleccionNuevosPuntosMapa[i]
      )
    }
    
    //Actualizar la base de datos en el local storage
    localStorage.setItem("puntos", JSON.stringify(jsonPuntos))

    //Limpiar los nuevos
    localStorage.setItem("coleccionNuevosPuntosMapa", "[]");

    //Recargar la página para que recargue el mapa con los puntos ahora registrados (color original de marcador)
    window.location.reload();


  } else {
    alert("No se realizó registro, no hay puntos nuevos.")
  }

});

/////////////////////////////////////////////////Cargar los puntos desde el local storage
let arregloMarcadores = mapMethods.cargarPuntos(map);

//Recargar página si no quiero guardar ningún cambio
function recargarPagina() {
  location.reload();
}