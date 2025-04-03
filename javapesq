/**
 * Script para funcionalidade de pesquisa no dossier digital
 */

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        // Adicionar evento de clique ao botão de pesquisa
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Adicionar evento de tecla Enter no campo de pesquisa
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Função para realizar a pesquisa
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm.length < 3) {
            alert('Por favor, insira pelo menos 3 caracteres para pesquisar.');
            return;
        }
        
        // Redirecionar para a página de resultados de pesquisa com o termo como parâmetro
        window.location.href = '/search-results.html?q=' + encodeURIComponent(searchTerm);
    }
    
    // Se estiver na página de resultados de pesquisa, carregar os resultados
    if (window.location.pathname.includes('search-results.html')) {
        loadSearchResults();
    }
    
    // Função para carregar e exibir os resultados da pesquisa
    function loadSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        
        if (!resultsContainer) return;
        
        // Obter o termo de pesquisa dos parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('q');
        
        if (!searchTerm) {
            resultsContainer.innerHTML = '<p>Nenhum termo de pesquisa fornecido.</p>';
            return;
        }
        
        // Atualizar o campo de pesquisa com o termo pesquisado
        if (searchInput) {
            searchInput.value = searchTerm;
        }
        
        // Exibir o termo de pesquisa na página
        const searchTermDisplay = document.getElementById('search-term');
        if (searchTermDisplay) {
            searchTermDisplay.textContent = searchTerm;
        }
        
        // Carregar o índice de pesquisa e realizar a busca
        fetch('/assets/js/search-index.json')
            .then(response => response.json())
            .then(searchIndex => {
                // Filtrar os resultados com base no termo de pesquisa
                const results = searchIndex.filter(item => {
                    const titleMatch = item.title.toLowerCase().includes(searchTerm);
                    const contentMatch = item.content.toLowerCase().includes(searchTerm);
                    return titleMatch || contentMatch;
                });
                
                displaySearchResults(results, searchTerm);
            })
            .catch(error => {
                console.error('Erro ao carregar o índice de pesquisa:', error);
                resultsContainer.innerHTML = '<p>Ocorreu um erro ao realizar a pesquisa. Por favor, tente novamente mais tarde.</p>';
            });
    }
    
    // Função para exibir os resultados da pesquisa
    function displaySearchResults(results, searchTerm) {
        const resultsContainer = document.getElementById('search-results');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum resultado encontrado para <strong>"' + searchTerm + '"</strong>.</p>';
            return;
        }
        
        let resultsHTML = '<p>Foram encontrados ' + results.length + ' resultados para <strong>"' + searchTerm + '"</strong>:</p>';
        resultsHTML += '<ul class="search-results-list">';
        
        results.forEach(result => {
            // Criar um snippet do conteúdo mostrando o contexto onde o termo aparece
            let snippet = '';
            const lowerContent = result.content.toLowerCase();
            const termIndex = lowerContent.indexOf(searchTerm.toLowerCase());
            
            if (termIndex !== -1) {
                // Pegar contexto de 50 caracteres antes e depois do termo
                const start = Math.max(0, termIndex - 50);
                const end = Math.min(result.content.length, termIndex + searchTerm.length + 50);
                snippet = result.content.substring(start, end);
                
                // Adicionar reticências se o snippet não começa ou termina no início/fim do conteúdo
                if (start > 0) snippet = '...' + snippet;
                if (end < result.content.length) snippet += '...';
                
                // Destacar o termo de pesquisa
                const regex = new RegExp('(' + searchTerm + ')', 'gi');
                snippet = snippet.replace(regex, '<mark>$1</mark>');
            }
            
            resultsHTML += `
                <li class="search-result-item">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p class="search-result-snippet">${snippet || 'Nenhum snippet disponível.'}</p>
                    <p class="search-result-url">${result.url}</p>
                </li>
            `;
        });
        
        resultsHTML += '</ul>';
        resultsContainer.innerHTML = resultsHTML;
    }
});
