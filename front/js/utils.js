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
  