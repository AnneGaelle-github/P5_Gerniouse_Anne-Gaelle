
/**
 * Afficher tous les produits
 */
getProduct("http://localhost:3000/api/products", function(products) {
  console.log(products)
  console.log(products[0]);
  console.log(products[0]._id);

  // innerHTML & co 
  let elt = document.getElementById('items');
  
  for (let i = 0; i < products.length; i++) {
    elt.innerHTML += `
    <a href=./product.html?id=${products[i]._id}>
      <article>
        <img src="${products[i].imageUrl}" alt='${products[i].altTxt}'>
        <h3 class=productName>${products[i].name}</h3>
        <p class=productDescription>${products[i].description}</p></article>
    </a>
    `;
  }
});
