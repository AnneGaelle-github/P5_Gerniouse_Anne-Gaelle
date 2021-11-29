
const str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";


const colorPicked = document.querySelector("#colors"); // Couleur choisie 
const quantityPicked = document.querySelector("#quantity"); // Quantié choisie 

getArticle();



/**
 * Récupération des articles de l'API
 */
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json(); // Les articles sont transformés en format JSON 
        })
        .then(async function (resultatAPI) { // Ajout des articles de l'API dans le DOM
            article = await resultatAPI;
            console.table(article); // Création d'un tableau dans la console avec .table
            if (article) {
                displayArticleInDOM(article);
            }
        })
        .catch((error) => { // Si il y a une erreur, la console affichera : "Erreur de la requête API"
            console.log("Erreur de la requête API", error);
        })
}


/**
 * Affichage des articles dans le DOM
 * @param {object Article} article l'article à afficher
 */
function displayArticleInDOM(article) {

    // Insertion de l'image du canapé

    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;



    // Insertion des variations de couleurs avec une boucle for

    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article); // Les couleurs prévues pour chaque article sont ajoutées
}





//Gestion du panier

function addToCart(article) {

    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions : couleur non nulle et quantité entre 1 et 100

    btn_envoyerPanier.addEventListener("click", () => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

            //Recupération du choix de la couleur

            let choixCouleur = colorPicked.value;

            //Recupération du choix de la quantité

            let choixQuantite = quantityPicked.value;

            //Récupération des options de l'article à ajouter au panier

            let optionsProduit = {
                idProduit: idProduct,
                couleurProduit: choixCouleur,
                quantiteProduit: Number(choixQuantite),
                nomProduit: article.name,
                prixProduit: article.price,
                descriptionProduit: article.description,
                imgProduit: article.imageUrl,
                altImgProduit: article.altTxt
            };


            //Passage de la commande     


            //Initialisation du local storage

            let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); //Recupère les produits au format JSON

            //Fenêtre pop-up avec des conditions

            const popupConfirmation = () => {
                if (window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
                    Pour consulter votre panier, cliquez sur OK`)) { //Si il y a une quantiée et une couleur de choisi alors on peut consulter le pannier
                    window.location.href = "cart.html";
                }
            }

            //Importation dans le local storage

            //Si le panier comporte déjà au moins 1 article

            if (produitLocalStorage) {
                const resultFind = produitLocalStorage.find(
                    (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);

                //Si le produit commandé est déjà dans le panier
                if (resultFind) {
                    let newQuantite =
                        parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                    resultFind.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();

                    //Si le produit commandé n'est pas dans le panier
                } else {
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
                }

                //Si le panier est vide
            } else {
                produitLocalStorage = [];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                popupConfirmation();
            }
        }
    });
}

