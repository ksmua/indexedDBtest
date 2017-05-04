window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// НЕ ИСПОЛЬЗУЙТЕ "var indexedDB = ..." вне функции.
// также могут отличаться и window.IDB* objects: Transaction, KeyRange и тд
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
}

var userData = [
  { userID: "44444", name: "Vasia" },
  { userID: "55555", name: "Vova" }
];
const dbName = "ContactsDB";

var request = indexedDB.open(dbName, 1);

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  if ( !db.objectStoreNames.contains("Contacts") ){
    var store = db.createObjectStore("Contacts", { keyPath: "userID" });
  }
}

request.onsuccess = function(event){
  console.log("Success opened DB");
  db = event.target.result;
  showData();
}

request.onerror = function(event) {
  console.log("Error on open DB");
  console.log(event);
}


//=============================
//Adding data to the database
//=============================
function addContacts(){
  // db = event.target.result;
  var transaction = db.transaction(["Contacts"], "readwrite");
  var store = transaction.objectStore("Contacts");
  for (var i in userData) {
    console.log("try to add userData");
    var request = store.add(userData[i]);
    
    //onsuccess
    request.onsuccess = function(event){
      console.log("userAdded", userData[i]);
    }
    
    //onerror
    request.onerror = function(event){
      console.log("error");
      //console.log(event);
      //console.log(event.target.error.name);
    }
  
  }
}

function showData(){
  console.log("onsuccess - showData");
}

addContacts();


// //===============================
// //Removing data from the database
// //===============================
// var request = db.transaction(["Contacts"], "readwrite")
//                 .objectStore("Contacts")
//                 .delete("44444");
// request.onsuccess = function(event) {
//   console.log(" It's remove! ");
// };