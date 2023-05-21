import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"

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
import { getDatabase, ref, set, update, child, get, push } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const db = getDatabase();

const dbRef = ref(db);

export function InsertData(puntoNuevo,id) {
    set(ref(db, "puntos/"+ id),puntoNuevo)
    .then(()=>{
        //alert("Punto nuevo adicionado exitosamente!");
    })
    .catch((error)=>{
        alert(error);
    });
}

export function UpdateData(nuevaVersionPunto,id){
  
  if (nuevaVersionPunto.reg.length == 0){
    nuevaVersionPunto.reg = "_"
  }
  
  update(ref(db, "puntos/"+ id),nuevaVersionPunto)
  .then(()=>{
      alert("Data updated successfully");
  })
  .catch((error)=>{
      alert(error);
  });
}