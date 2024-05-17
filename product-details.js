
// FUNÇÃO PARA GERAR ESTRELAS ALEATORIA
function generateRandomRating() {
    const minRating = 1;
    const maxRating = 5;
    const rating = Math.floor(Math.random() * (maxRating - minRating + 1)) + minRating;
    let ratingStr = '';
    for (let i = 0; i < rating; i++) {
        ratingStr += '<span class="yellow-star">★</span>';
    }
    return ratingStr;
}



document.addEventListener('DOMContentLoaded', () => {
    const productDetailsContainer = document.getElementById('product-details-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const fetchProductDetails = (id) => {
        const apiUrl = `https://diwserver.vps.webdock.cloud/products/${id}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(product => {
                const productContainer = document.createElement('div');
                productContainer.classList.add('product-container');
                productContainer.innerHTML = `
      <img src="${product.image}" class="product-image" alt="${product.title}">
      <div class="product-details">
        <h5 class="product-title">${product.title}</h5>
        <p class="product-rating">Rating: ${generateRandomRating()}</p>
        <p class="product-price">Price: $${product.price}</p>
        <p class="product-warranty-provider">Warranty provided by Brand Owner / Manufacturer: ${product.warranty_provider}</p>
        <p class="product-description">Description: ${product.description}</p>
        <button class="btn btn-primary see-details" data-product-id="#">Purchase</button>
      </div>
    `;


                productDetailsContainer.appendChild(productContainer);
            })
            .catch(error => {
                console.error('Erro ao carregar os detalhes do produto:', error);
            });
    };

    fetchProductDetails(productId);
});
 //barra de pesquisa
 const searchButton = document.getElementById('search-button');
 const searchInput = document.getElementById('search-input');

 searchButton.addEventListener('click', () => {
   const searchTerm = searchInput.value;

   // Redirecionar para a página de resultados da pesquisa com o termo de pesquisa como parâmetro
   window.location.href = `search-results.html?search=${encodeURIComponent(searchTerm)}`;
 });