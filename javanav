/**
 * Script para navegação no dossier digital
 */

// Destacar item atual do menu
document.addEventListener('DOMContentLoaded', function() {
    // Obter o caminho atual
    const currentPath = window.location.pathname;
    
    // Encontrar todos os links do menu
    const menuLinks = document.querySelectorAll('.main-menu a');
    
    // Para cada link do menu, verificar se o href está contido no caminho atual
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) && href !== '#' && href !== 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Adicionar comportamento de expansão para submenus (se existirem)
    const expandableItems = document.querySelectorAll('.expandable');
    expandableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target === item || e.target === item.querySelector('span')) {
                e.preventDefault();
                this.classList.toggle('expanded');
                
                // Encontrar o submenu associado
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('submenu')) {
                    if (submenu.style.maxHeight) {
                        submenu.style.maxHeight = null;
                    } else {
                        submenu.style.maxHeight = submenu.scrollHeight + "px";
                    }
                }
            }
        });
    });
});

// Botão voltar ao topo
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const backToTopBtn = document.getElementById("back-to-top");
    
    if (backToTopBtn) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
}

// Quando o usuário clicar no botão, voltar
