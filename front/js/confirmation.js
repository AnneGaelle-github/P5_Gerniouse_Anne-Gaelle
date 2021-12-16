// Fonction qui donne le numéro du bon de commmande

function purchase_order() {
    const idNode = document.getElementById("orderId");
    idNode.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    //localStorage.clear(); // Le panier ce vide
}

purchase_order();
