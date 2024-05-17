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

// Função para gerar um número aleatório para a quantidade de estoque
function generateRandomStock() {
  const minStock = 0;
  const maxStock = 100;
  return Math.floor(Math.random() * (maxStock - minStock + 1)) + minStock;
}
//FUNÇÃO QUANTIDADE VENDIDO
function generateRandomQuantitySold() {
  const minQuantity = 0;
  const maxQuantity = 1000;
  return Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity;
}



const formCategoria = document.getElementById('formCategoria');
const categorySelect = document.getElementById('category');
const maxPriceInput = document.getElementById('max-price');
const colorSelect = document.getElementById('color');
const brandSelect = document.getElementById('brand');
const productsContainer = document.getElementById('products');

formCategoria.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar o comportamento padrão de envio do formulário
  applyCategoryFilter();
});

function applyCategoryFilter() {
  const selectedCategory = categorySelect.value;
  const maxPrice = maxPriceInput.value || 0;
  const color = colorSelect.value;
  const brand = brandSelect.value;

  const encodedCategory = encodeURIComponent(selectedCategory);
  const encodedMaxPrice = encodeURIComponent(maxPrice);
  const encodedColor = encodeURIComponent(color);
  const encodedBrand = encodeURIComponent(brand);

  const filteredUrl = `https://diwserver.vps.webdock.cloud/products/category/${encodedCategory}?max_price=${encodedMaxPrice}&color=${encodedColor}&brand=${encodedBrand}`;

  productsContainer.innerHTML = '';
  fetchProducts(filteredUrl, productsContainer);
}

const categoryUrl = 'https://diwserver.vps.webdock.cloud/products/category/Accessories%20-%20Eyewear';


const fetchProducts = (url, container) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const products = data.products;

      if (products.length === 0) {
        // Exibir uma mensagem indicando que nenhum produto foi encontrado
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'Nenhum produto encontrado.';
        container.appendChild(noResultsMessage);
        return;
      }

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4', 'product-card');
        productCard.innerHTML = `
        <div class="card" style="width: 100%;">
  <img src="${product.image}" class="card-img-top" alt="${product.title}">
  <div class="card-body text-center">
    <h5 class="card-title font-weight-bold">${product.title}</h5>
    <p class="card-text">Stock: ${generateRandomStock()}</p> <!-- Mostra a quantidade de estoque -->
    <p class="card-text">Quantity Sold: ${generateRandomQuantitySold()}</p> <!-- Mostra a quantidade vendida -->
    <p class="card-text">Price: $${product.price}</p>
    <p class="card-text">Rating: ${generateRandomRating()}</p>
    <a href="#" class="btn btn-primary see-details" data-product-id="${product.id}">See Details</a>
  </div>
</div>
      
        `;
        productsContainer.appendChild(productCard);
      });

      // Verificar se há mais páginas para mostrar
      const currentPage = data.current_page;
      const totalPages = data.total_pages;
      if (currentPage < totalPages && currentPage < 2) {
        const nextPageUrl = `${url}?page=${currentPage + 1}`;
        fetchProducts(nextPageUrl, container);
      }


      // Lidar com o evento de clique no botão "See Details"
      const seeDetailsButtons = document.querySelectorAll('.see-details');
      seeDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          event.preventDefault(); // Evitar o comportamento padrão de redirecionamento
          const productId = button.dataset.productId;
          window.location.href = `product-details.html?id=${productId}`;
        });
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os produtos:', error);
    });
};

fetchProducts(categoryUrl);

fetch('https://diwserver.vps.webdock.cloud/products/categories')
  .then(res => res.json())
  .then(categories => {
    const selectElement = document.getElementById('category');

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.log('Ocorreu um erro ao obter as categorias:', error);
  });
  //barra de pesquisa
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;

    // Redirecionar para a página de resultados da pesquisa com o termo de pesquisa como parâmetro
    window.location.href = `search-results.html?search=${encodeURIComponent(searchTerm)}`;
  });
