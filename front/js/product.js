// Récupérer l'ID du canpé
/*
let str = "http://localhost:3000/api/products";
let url = new URL(str);
let name = url.searchParams.get("name");
console.log(name);

window.location.search


const str = window.location.href;
var url = new URL(str);
 id = url.searchParams.get("id");

let urlData = new URL("http://localhost:3000/api/product.html?id=107fb5b75607497b96722bda5b504926");
window.location.search;
*/

// Canapé numéro 1
const str = "http://localhost:3000/api/product.html?id=107fb5b75607497b96722bda5b504926";
let url = new URL(str);
 id = url.searchParams.get("id");
 console.log(id);



