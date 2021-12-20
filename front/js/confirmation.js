// Fonction qui donne le numéro du bon de commmande

function purchase_order() {
    const idNode = document.getElementById("orderId");
    if (idNode) { // Si idNode existe le code peut s'executer 
        idNode.innerText = localStorage.getItem("orderId");
        localStorage.clear(); // Le panier ce vide
    }
}

purchase_order();
