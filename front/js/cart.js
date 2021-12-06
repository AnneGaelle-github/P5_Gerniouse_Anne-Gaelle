// Initialisation du local storage

let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); // Produits dans le localStorage
console.table(produitLocalStorage); // Tableau qui affiche les articles présent dans le localStorage de la console
const positionEmptyCart = document.querySelector("#cart__items"); // Panier vide


// Si le panier est vide

function getCart(){
    if (produitLocalStorage === null || produitLocalStorage == 0) { 
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart; // Si il n'y a pas de produits dans le panier alors "<p>Votre panier est vide</p>"
    } else {
    for (let produit in produitLocalStorage){ // Boucle for qui ajoute les produits dans le localStorage

        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
    
        // Insertion de l'élément "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
    
        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = produitLocalStorage[produit].imgProduit;
        productImg.alt = produitLocalStorage[produit].altImgProduit;
        
        // Insertion de l'élément "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";
    
        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insertion du titre h3
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = produitLocalStorage[produit].nomProduit;
    


        // Insertion de la couleur

        let productColor = document.createElement("p");
        /**
        * const colorPicked = document.querySelector("#colors");
        * productColor = colorPicked.value;
        */
        productTitle.appendChild(productColor);
        productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
        productColor.style.fontSize = "20px";
    

        
        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";
    
        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";
    
        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insertion de "Qté : "
        let productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";
    
        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = produitLocalStorage[produit].quantiteProduit;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
    
        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
    }
    }}
    getCart();



    // Le total du panier

function getTotals(){

        // Récupération du total des quantités
        let elemsQtt = document.getElementsByClassName('itemQuantity');
        let myLength = elemsQtt.length, // Total des articles présent dans le panier
        totalQtt = 0;
    
        for (let i = 0; i < myLength; ++i) { // Boucle for qui compte et rajoute les article dans le panier
            totalQtt += elemsQtt[i].valueAsNumber;
        }
    
        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQtt;
        console.log(totalQtt);
    

        // Récupération du prix total
        totalPrice = 0;
    
        for (let i = 0; i < myLength; ++i) { // Boucle for qui compte et rajoute le prix du panier 
            totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
        }
    
        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
        console.log(totalPrice);
    }
    getTotals();



    // Modification d'une quantité de produit

function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){ // Boucle for qui change la quantité du panier 
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            // Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            // Modification de la quantité
            resultFind.quantiteProduit = qttModifValue; 
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();

 
    // Suppression d'un produit
    
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){ // Boucle for qui supprime les articles qui sont cliqués dans le panier
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[j].idProduit;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

