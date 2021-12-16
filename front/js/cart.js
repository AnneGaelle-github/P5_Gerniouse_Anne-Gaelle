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
    let cart__item = document.querySelectorAll(".cart__item"); 

    for (let k = 0; k < cart__item.length; k++){ // Boucle for qui change la quantité du panier
        const inputChange = cart__item[k].querySelector(".itemQuantity");
        inputChange.addEventListener("change" , (event) => {
            event.preventDefault();

            // Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = inputChange.valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.idProduit === cart__item[k].getAttribute('data-id'))

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




//Instauration du formulaire avec les Regex

function getForm() {

    // Ajout des Regex

    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'); // Regex pour l'adresse email 
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); // Regex pour nom, prénom
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"); // Regex pour l'adresse


    // Ecouter la modification du prénom

    form.firstName.addEventListener('change', function() { // Ecouter si il y a un changement 
        validFirstName(this);
    });

    // Validation du prénom

    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling; // Attrape la balise HTML suivante (p)

        if (charRegExp.test(inputFirstName.value)) { // Si le prénom est valide
            firstNameErrorMsg.innerHTML = 'Prénom valide';
            return true;
        } else { // Si le prénom n'est pas valide
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };


    // Ecoute de la modification du nom

    form.lastName.addEventListener('change', function() { // Ecouter si il y a un changement
        validLastName(this);
    });

    // Validation du nom

    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling; // Attrape la balise HTML suivante (p)

        if (charRegExp.test(inputLastName.value)) { // Si le nom est valide
            lastNameErrorMsg.innerHTML = 'Nom valide';
            return true;
        } else { // Si le nom n'est pas valide
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };


    // Ecoute de la modification l'adresse

    form.address.addEventListener('change', function() { // Ecouter si il y a un changement
        validAddress(this);
    });

    // Validation de l'adresse

    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling; // Attrape la balise HTML suivante (p)

        if (addressRegExp.test(inputAddress.value)) { // Si l'adresse est valide
            addressErrorMsg.innerHTML = 'Adresse valide';
            return true;
        } else { // Si l'adresse n'est pas valide
            addressErrorMsg.innerHTML = 'Adresse non valide.';
            return false;
        }
    };


    // Ecoute de la modification du ville

    form.city.addEventListener('change', function() { // Ecouter si il y a un changement
        validCity(this);
    });

    // Validation de la ville

    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling; // Attrape la balise HTML suivante (p)

        if (charRegExp.test(inputCity.value)) { // Si le nom de ville est valide
            cityErrorMsg.innerHTML = 'Ville valide';
            return true;
        } else { // Si le nom de ville n'est pas valide
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };


    // Ecoute de la modification du email

    form.email.addEventListener('change', function() { // Ecouter si il y a un changement
        validEmail(this);
    });

    // Validation de l'email

    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling; // Attrape la balise HTML suivante (p)

        if (emailRegExp.test(inputEmail.value)) { // Si l'adresse email est valide
            emailErrorMsg.innerHTML = 'Adresse email valide';
            return true;
        } else { // Si l'adresse n'est pas valide
            emailErrorMsg.innerHTML = 'Adresse email non valide.';
            return false;
        }
    };


    // Soumission du formulaire

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validEmail(form.email) && form.city && form.address && form.lastName && form.firstName) { // Si les informations sont valides le formulaire peut être envoyé
            console.log('Formulaire correct')
            postForm();
        } else { // Sinon le formulaire ne pourra pas être envoyé et affichera : "Formulaire incorrect"
            console.log('Formulaire incorrect')
        }
    })
}
getForm();



// Post du formulaire
// Envoi des informations client au localstorage

function postForm() {
    
    // Récupération des coordonnées du formulaire client

    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    // Construction d'un array depuis le local storage

    let idProducts = [];
    for (let c = 0; c < produitLocalStorage.length; c ++) { // Boucle for qui rajoute les produits
        idProducts.push(produitLocalStorage[c].idProduit); // Envoi les produits dans le tableau
    }
    console.log(idProducts);

    const order = { // Objet contact du formulaire
        contact : {
            firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
            },
        products: idProducts,
    } 

    const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json', 
            "Content-Type": "application/json" 
        },
    };

    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        localStorage.clear(); // Vide le contenu du panier une fois la commande validé
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
    })
    .catch((err) => {
        alert ("Problème avec fetch : " + err.message);
    });
}