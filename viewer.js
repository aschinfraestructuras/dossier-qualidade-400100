/**
 * PDF Viewer para Dossier Digital
 * Baseado em PDF.js
 */

// Variáveis de controle
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
let zoomLevel = 100;
let canvas = document.getElementById('pdf-canvas');
let ctx = canvas.getContext('2d');
let currentPdfPath = '';

// Configurações PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

/**
 * Carrega um documento PDF
 * @param {string} pdfPath - Caminho para o PDF
 */
function loadPdf(pdfPath) {
    // Guardar caminho do PDF atual
    currentPdfPath = pdfPath;

    // Obter título do PDF para exibição
    const pdfTitleMap = {
        'docs/capitulo-1/plano-qualidade.pdf': '1.1 – Plano da Qualidade',
        'docs/capitulo-1/plano-inspecao-ensaios.pdf': '1.2 – Plano de Inspeção e Ensaios',
        'docs/capitulo-1/certificados-calibracao.pdf': '1.3 – Certificados de Calibração',
        'docs/capitulo-1/certificados-materiais.pdf': '1.4 – Certificados de Materiais',
        'docs/capitulo-1/estudos-materiais.pdf': '1.5 – Estudos de Materiais',
        'docs/capitulo-1/nao-conformidades.pdf': '1.6 – Não Conformidades',
        'docs/capitulo-1/pontos-inspecao.pdf': '1.7 – Plano de Pontos de Inspeção',
        'docs/capitulo-1/punch-list.pdf': '1.8 – Punch List',
        'docs/capitulo-2/obra-civil.pdf': '2.1 – Obra Civil',
        'docs/capitulo-2/piping.pdf': '2.2 – Piping',
        'docs/capitulo-3/especificacoes-tecnicas.pdf': '3.1 – Especificações Técnicas',
        'docs/capitulo-3/planos-construtivos.pdf': '3.2 – Planos Construtivos',
        'docs/capitulo-3/planos-redmark.pdf': '3.3 – Planos Red Mark (Line)',
        'docs/capitulo-3/planos-asbuilt.pdf': '3.4 – Planos As-Built'
    };

    // Mostrar interface do PDF viewer
    showPdfViewer(pdfTitleMap[pdfPath] || 'Documento');

    // Fechar a sidebar em telas pequenas
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.remove('active');
    }

    // Resetar estado
    if (pdfDoc) {
        pdfDoc = null;
        pageNum = 1;
        scale = 1.5;
        zoomLevel = 100;
        document.getElementById('zoom-level').textContent = '100%';
    }
    
    // Mostrar loading
    document.getElementById('pdf-loading').classList.remove('hidden');
    
    // Carregar o PDF
    pdfjsLib.getDocument(pdfPath).promise
        .then(function(pdfDoc_) {
            // PDF carregado
            pdfDoc = pdfDoc_;
            
            // Atualizar contagem de páginas
            document.getElementById('page-count').textContent = pdfDoc.numPages;
            document.getElementById('page-num').textContent = pageNum;
            
            // Esconder loading
            document.getElementById('pdf-loading').classList.add('hidden');
            
            // Renderizar primeira página
            renderPage(pageNum);

            // Atualizar metadados do documento
            const today = new Date();
            const formattedDate = today.toLocaleDateString('pt-PT');
            document.getElementById('pdf-meta-date').textContent = 'Data: ' + formattedDate;
            document.getElementById('pdf-meta-revision').textContent = 'Revisão: Rev.002';
        })
        .catch(function(error) {
            console.error('Erro ao carregar o PDF:', error);
            document.getElementById('pdf-loading').classList.add('hidden');
            
            // Mostrar mensagem de erro
            const errorDiv = document.createElement('div');
            errorDiv.className = 'pdf-error';
            errorDiv.textContent = 'Não foi possível carregar o documento PDF. Por favor, tente novamente mais tarde.';
            document.getElementById('pdf-container').appendChild(errorDiv);

            // Atualizar elementos de navegação
            document.getElementById('page-count').textContent = '0';
            document.getElementById('page-num').textContent = '0';
        });
}

/**
 * Renderiza uma página do PDF
 * @param {number} num - Número da página
 */
function renderPage(num) {
    pageRendering = true;
    
    // Mostrar loading
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'page-loading';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Carregando página ${num}...</p>
    `;
    document.getElementById('pdf-container').appendChild(loadingIndicator);
    
    // Buscar a página
    pdfDoc.getPage(num).then(function(page) {
        // Ajustar escala para tamanho da tela
        const viewport = page.getViewport({ scale });
        
        // Ajustar canvas para dimensões da página
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Renderizar a página no canvas
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        // Aguardar a renderização
        renderTask.promise.then(function() {
            pageRendering = false;
            
            // Remover indicador de loading
            if (document.querySelector('.page-loading')) {
                document.querySelector('.page-loading').remove();
            }
            
            if (pageNumPending !== null) {
                // Nova renderização pendente
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    // Atualizar número da página atual
    document.getElementById('page-num').textContent = num;
}

/**
 * Fila de renderização para evitar concorrência
 * @param {number} num - Número da página
 */
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

/**
 * Ir para página anterior
 */
function prevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

/**
 * Ir para próxima página
 */
function nextPage() {
    if (!pdfDoc || pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

/**
 * Aumentar zoom
 */
function zoomIn() {
    if (zoomLevel >= 200) return;
    
    zoomLevel += 25;
    scale += 0.25;
    document.getElementById('zoom-level').textContent = zoomLevel + '%';
    queueRenderPage(pageNum);
}

/**
 * Diminuir zoom
 */
function zoomOut() {
    if (zoomLevel <= 50) return;
    
    zoomLevel -= 25;
    scale -= 0.25;
    document.getElementById('zoom-level').textContent = zoomLevel + '%';
    queueRenderPage(pageNum);
}

/**
 * Download do PDF atual
 */
function downloadCurrentPdf() {
    if (!currentPdfPath) return;
    
    const link = document.createElement('a');
    link.href = currentPdfPath;
    link.download = currentPdfPath.split('/').pop();
    link.click();
}

// Adicionar eventos aos botões de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Botão de página anterior
    const prevButton = document.getElementById('prev');
    if (prevButton) {
        prevButton.addEventListener('click', prevPage);
    }
    
    // Botão de próxima página
    const nextButton = document.getElementById('next');
    if (nextButton) {
        nextButton.addEventListener('click', nextPage);
    }
    
    // Botão de zoom in
    const zoomInButton = document.getElementById('zoom-in');
    if (zoomInButton) {
        zoomInButton.addEventListener('click', zoomIn);
    }
    
    // Botão de zoom out
    const zoomOutButton = document.getElementById('zoom-out');
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', zoomOut);
    }
});

// Suporte para navegação por teclado
document.addEventListener('keydown', function(e) {
    if (!pdfDoc) return;
    
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        // Página anterior
        prevPage();
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        // Próxima página
        nextPage();
    } else if (e.key === '+' || e.key === '=') {
        // Zoom in
        zoomIn();
    } else if (e.key === '-' || e.key === '_') {
        // Zoom out
        zoomOut();
    }
});

// Adaptar escala inicial ao tamanho da tela
function adjustInitialScale() {
    const viewerWidth = document.getElementById('pdf-container').clientWidth;
    if (viewerWidth < 768) {
        scale = 1.0;
        zoomLevel = 67;
        document.getElementById('zoom-level').textContent = '67%';
    } else if (viewerWidth < 1024) {
        scale = 1.25;
        zoomLevel = 83;
        document.getElementById('zoom-level').textContent = '83%';
    }
}

// Chamar ajuste de escala quando a janela for redimensionada
window.addEventListener('resize', function() {
    if (pdfDoc) {
        adjustInitialScale();
        queueRenderPage(pageNum);
    }
});
