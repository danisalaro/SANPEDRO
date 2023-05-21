export function cargarPuntos(map) {

  let arregloMarcadores = new Array();

  var puntos = JSON.parse(localStorage.getItem("puntos"));
  //Si hay marcadores guardados
  if (puntos) {
    //Recorrer marcadores guardados en local storage
    for (let i = 0; i < puntos.length; i++) {

      let nuevoMarcador = L.marker([puntos[i].lat, puntos[i].len], {
        title: puntos[i].title,
        alt: puntos[i].title,
        draggable: false,
      }).addTo(map);

      nuevoMarcador.bindTooltip(puntos[i].title, { direction: 'top' }).openTooltip();

      nuevoMarcador.on('click', function(e) {
        // Redirige a la interfaz correspondiente
        window.location.href = "registros.html?idLote=" + i;//Pendiente creación
      });

      //Coleccionar los marcadores creados y cargados desde el local storage
      arregloMarcadores.push(nuevoMarcador);
    }

    //Retornar el arreglo de marcadores
    return arregloMarcadores;

  }
}
