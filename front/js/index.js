
/**
 * Obteneir les produits de l'api
 * @param {function} callback Le callback est exécuté quand les produits sont chargés
 */
function getProduct (url, callback) {
  // Récupération des données http avec GET

  const requete = new XMLHttpRequest() // Objet qui permet d'effectuer une requette http
  const methodeHttp = "GET"

  requete.open(methodeHttp, url) // Initialiser la requette avec open

  requete.send() // Envoyer la requette avec send

  requete.onreadystatechange = function(){ // Cette propriété va être appelé à chaque changement de l'état de la requête
    if(requete.readyState === 4) {// Si l'état de notre requette est égale à 4
      let products = JSON.parse(requete.responseText);
      callback(products) // la console affichera la reponce de la requette
    }
  }
  
}



// Afficher tous les produits

getProduct("http://localhost:3000/api/products", function(products) {
  console.log(products)
  // innerHTML & co 
  let elt = document.getElementById('items');
    elt = [
      // Canapé numéro 1
      elt.innerHTML += "<a href=./product.html?id=107fb5b75607497b96722bda5b504926><article><img src=http://localhost:3000/images/kanap01.jpeg alt=Photo d'un canapé bleu, deux places><h3 class=productName>Kanap Sinopé</h3><p class=productDescription>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></article></a>",
      // Canapé numéro 2
      elt.innerHTML += "<a href=./product.html?id=415b7cacb65d43b2b5c1ff70f3393ad1><article><img src=http://localhost:3000/images/kanap02.jpeg alt=Photo d'un canapé jaune et noir, quattre places><h3 class=productName>Kanap Cyllène</h3><p class=productDescription>Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.</p></article></a>",
      // Canapé numéro 3
      elt.innerHTML += "<a href=./product.html?id=055743915a544fde83cfdfc904935ee7><article><img src=http://localhost:3000/images/kanap03.jpeg alt=Photo d'un canapé d'angle, vert, trois places><h3 class=productName>Kanap Calycé</h3><p class=productDescription>Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.</p></article></a>",
      // Canapé numéro 4
      elt.innerHTML += "<a href=./product.html?id=a557292fe5814ea2b15c6ef4bd73ed83><article><img src=http://localhost:3000/images/kanap04.jpeg alt=Photo d'un canapé rose, une à deux place><h3 class=productName>Kanap Autonoé</h3><p class=productDescription>Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.</p></article></a>",
      // Canapé numéro 5
      elt.innerHTML += "<a href=./product.html?id=8906dfda133f4c20a9d0e34f18adcf06><article><img src=http://localhost:3000/images/kanap05.jpeg alt=Photo d'un canapé gris, trois places><h3 class=productName>Kanap Eurydomé</h3><p class=productDescription>Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.</p></article></a>",
      // Canapé numéro 6
      elt.innerHTML += "<a href=./product.html?id=77711f0e466b4ddf953f677d30b0efc9><article><img src=http://localhost:3000/images/kanap06.jpeg alt=Photo d'un canapé gris, deux places><h3 class=productName>Kanap Hélicé</h3><p class=productDescription>Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.</p></article></a>",
      // Canapé numéro 7
      elt.innerHTML += "<a href=./product.html?id=034707184e8e4eefb46400b5a3774b5f><article><img src=http://localhost:3000/images/kanap07.jpeg alt=Photo d'un canapé rouge, deux places><h3 class=productName>Kanap Thyoné</h3><p class=productDescription>EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.</p></article></a>",
      // Canapé numéro 8
      elt.innerHTML += "<a href=./product.html?id=a6ec5b49bd164d7fbe10f37b6363f9fb><article><img src=http://localhost:3000/images/kanap08.jpeg alt=Photo d'un canapé rose, trois places><h3 class=productName>Kanap orthosie</h3><p class=productDescription>Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.</p></article></a>",
  ]
  
  for (let i in elt) {
     console.log(elt[i]);
  }
});





// post content
/*
fetch("http://localhost:3000/api/products", {
  method: "POST",
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify("data")
})
.then(function(response) {
  console.log(response)
})
.catch(function(err) {
  console.error(err)
})
*/



/*
// Envoi des données http avec POST

let products = fetch("http://localhost:3000/api/products",{
  method: "POST",
  headers: {
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
},
  body: JSON.stringify(requete) // Transforme l'objet "requete" en format JSON
});

console.log(products)


// const IdProducts = document.getElementById(""); // Trouver un élément avec son ID

*/