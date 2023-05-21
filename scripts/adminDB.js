import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"
import * as mapMethods from "./mapMethods.js";

const firebaseConfig = {

  apiKey: "AIzaSyBgFAUI3rSK-wc8ZBBQ-rlvj74SdwNdFG8",
  authDomain: "tesis-51b9b.firebaseapp.com",
  databaseURL: "https://tesis-51b9b-default-rtdb.firebaseio.com",
  projectId: "tesis-51b9b",
  storageBucket: "tesis-51b9b.appspot.com",
  messagingSenderId: "649832981446",
  appId: "1:649832981446:web:968967053d838fb09c08c7",
  measurementId: "G-2Q33T0ZXF8"

};
const app = initializeApp(firebaseConfig)
import { getDatabase, ref, set, child, get, push } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const db = getDatabase();

//Preparar arreglo para acumular los puntos que son creados por interfaz
var coleccionNuevosPuntosMapa = new Array();
localStorage.setItem("coleccionNuevosPuntosMapa", "[]");

function LoadDB() {

  const dbRef = ref(db);

  get(child(dbRef, `puntos`)).then((snapshot) => {
    if (snapshot.exists()) {
      localStorage.setItem("puntos", JSON.stringify(snapshot.val()));
    } else {
      console.log("No data available");
    }
  }).then(() => {

    //Inicializar contador para titular los lotes según la cantidad de lotes registrados 
    //tanto por local storage como por interfaz
    let bdPuntos = JSON.parse(localStorage.getItem("puntos"));
    let contadorLotes = bdPuntos.length;

    //Agregar el evento de click en el mapa para creación de puntos
    map.addEventListener("click", function(e) {

      // Obtener la posición de clic
      let latlng = e.latlng;

      //Salida de diagnóstico en consola del punto seleccionado
      console.log('Latitud: ' + latlng.lat + ', Longitud: ' + latlng.lng);

      // Agregar un marcador en la posición de clic y almacenar su referencia en caso de que se requiera una manipulación posterior
      let referenciaMarcador = L.marker(latlng).addTo(map);
      referenciaMarcador._icon.classList.add("estiloMarcador");//Color diferente para los puntos nuevos

      //Acumular los marcadores nuevos en objetos con los atributos requeridos para llevarlos al localstorage
      let infoMarcadorNuevo = {
        "title": "LOTE " + (contadorLotes + 1),
        "lat": latlng.lat,
        "len": latlng.lng,
        //"reg": []
        "reg": "_"
      }
      coleccionNuevosPuntosMapa.push(infoMarcadorNuevo);
      localStorage.setItem("coleccionNuevosPuntosMapa", JSON.stringify(coleccionNuevosPuntosMapa));

      //Actualizar el contador para los siguientes lotes
      contadorLotes += 1;

      //Salida de diagnóstico de los puntos pendientes en interfaz
      console.log(coleccionNuevosPuntosMapa)

    })

    mapMethods.cargarPuntos(map);
  }).catch((error) => {
    console.error(error);
  });
}

export function InsertData(puntoNuevo, id) {
  set(ref(db, "puntos/" + id), puntoNuevo)
    .then(() => {
      //alert("Punto nuevo adicionado exitosamente!");
    })
    .catch((error) => {
      alert(error);
    });
}

export function UpdateData(nuevaVersionPunto, id) {
  update(ref(db, "puntos/" + id), nuevaVersionPunto)
    .then(() => {
      alert("Data updated successfully");
    })
    .catch((error) => {
      alert(error);
    });
}

//Cargar la información desde la base de datos de Firebase a localStorage y al mapa
LoadDB();