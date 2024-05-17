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

// Extrair o termo de pesquisa da URL
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');
const searchResultsContainer = document.getElementById('products');

// Exibir o termo de pesquisa na página
const searchTermHeader = document.createElement('h2');
searchTermHeader.textContent = `Resultados da Pesquisa para "${searchTerm}":`;
searchResultsContainer.parentNode.insertBefore(searchTermHeader, searchResultsContainer);

// Fazer a requisição para a API com o termo de pesquisa e filtrar pela categoria "Accessories - Eyewear"
const searchUrl = `https://diwserver.vps.webdock.cloud/products/search?query=${encodeURIComponent(searchTerm)}`;
fetch(searchUrl)
  .then(response => response.json())
  .then(data => {
    const searchResults = data;

    if (searchResults.length === 0) {
      // Exibir uma mensagem indicando que nenhum resultado foi encontrado
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'Nenhum resultado encontrado.';
      searchResultsContainer.parentNode.appendChild(noResultsMessage);
      return;
    }

    const filteredResults = searchResults.filter(result => result.category === 'Accessories - Eyewear');

    if (filteredResults.length === 0) {
      // Exibir uma mensagem indicando que nenhum resultado foi encontrado na categoria específica
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'Nenhum resultado encontrado na categoria Accessories - Eyewear.';
      searchResultsContainer.parentNode.appendChild(noResultsMessage);
      return;
    }

    filteredResults.forEach(result => {
        // Criar um card para exibir cada resultado da pesquisa
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4', 'product-card');
        productCard.innerHTML = `
          <div class="card" style="width: 100%;">
            <img src="${result.image}" class="card-img-top" alt="${result.title}">
            <div class="card-body text-center">
              <h5 class="card-title font-weight-bold">${result.title}</h5>
              <p class="card-text">Stock: ${generateRandomStock()}</p> <!-- Mostra a quantidade de estoque -->
              <p class="card-text">Quantity Sold: ${generateRandomQuantitySold()}</p> <!-- Mostra a quantidade vendida -->
              <p class="card-text">Price: $${result.price}</p>
              <p class="card-text">Rating: ${generateRandomRating()}</p>
              <a href="product-details.html?id=${result.id}" class="btn btn-primary see-details">See Details</a>
            </div>
          </div>
        `;
      
        searchResultsContainer.appendChild(productCard);
      });

    // Ajustar o tamanho do contêiner para exibir todos os resultados
    searchResultsContainer.style.height = 'auto';
  })
  .catch(error => {
    console.error('Ocorreu um erro na pesquisa:', error);
  });
   //barra de pesquisa
   const searchButton = document.getElementById('search-button');
   const searchInput = document.getElementById('search-input');
 
   searchButton.addEventListener('click', () => {
     const searchTerm = searchInput.value;
 
     // Redirecionar para a página de resultados da pesquisa com o termo de pesquisa como parâmetro
     window.location.href = `search-results.html?search=${encodeURIComponent(searchTerm)}`;
   });
