import React, { useState } from 'react';
import TabelaEnsaios from './tables/TabelaEnsaios';

const DossierQualidade = () => {
  // Estado para controlar qual componente está ativo
  const [componenteAtivo, setComponenteAtivo] = useState('ensaios');

  // Função para renderizar o componente ativo
  const renderComponenteAtivo = () => {
    switch (componenteAtivo) {
      case 'dashboard':
        return <div className="p-6">Dashboard em desenvolvimento</div>;
      case 'ensaios':
        return <TabelaEnsaios />;
      case 'inspecoes':
        return <div className="p-6">Mapa de Inspeções em desenvolvimento</div>;
      case 'cronograma':
        return <div className="p-6">Cronograma em desenvolvimento</div>;
      default:
        return <TabelaEnsaios />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Dossier Final da Qualidade</h1>
              <p className="text-gray-500">Projeto Alba - REPSOL POLÍMEROS</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-dark"
                onClick={() => alert('Exportando dossier completo...')}
              >
                <i className="fas fa-download mr-2"></i>
                Exportar
              </button>
              <button 
                className="px-4 py-2 bg-white border border-primary text-primary rounded-md text-sm hover:bg-blue-50"
                onClick={() => alert('Imprimindo dossier...')}
              >
                <i className="fas fa-print mr-2"></i>
                Imprimir
              </button>
            </div>
          </div>

          {/* Indicadores de progresso */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow px-4 py-3 border-l-4 border-primary">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Progresso Global</div>
                  <div className="text-xl font-bold">85%</div>
                </div>
                <div className="text-primary text-3xl">
                  <i className="fas fa-tasks"></i>
                </div>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow px-4 py-3 border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Documentos Aprovados</div>
                  <div className="text-xl font-bold">145 / 178</div>
                </div>
                <div className="text-green-500 text-3xl">
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '82%'}}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow px-4 py-3 border-l-4 border-yellow-500">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Não Conformidades</div>
                  <div className="text-xl font-bold">8</div>
                </div>
                <div className="text-yellow-500 text-3xl">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs text-green-500">
                  <i className="fas fa-arrow-down mr-1"></i>
                  -12% vs mês anterior
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow px-4 py-3 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Taxa de Conformidade</div>
                  <div className="text-xl font-bold">97.3%</div>
                </div>
                <div className="text-blue-500 text-3xl">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs text-green-500">
                  <i className="fas fa-arrow-up mr-1"></i>
                  +2.8% vs mês anterior
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação por abas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm rounded-t-lg transition ${
              componenteAtivo === 'dashboard'
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setComponenteAtivo('dashboard')}
          >
            <i className="fas fa-tachometer-alt mr-2"></i>
            Dashboard
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm rounded-t-lg transition ${
              componenteAtivo === 'ensaios'
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setComponenteAtivo('ensaios')}
          >
            <i className="fas fa-vial mr-2"></i>
            Ensaios e Testes
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm rounded-t-lg transition ${
              componenteAtivo === 'inspecoes'
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setComponenteAtivo('inspecoes')}
          >
            <i className="fas fa-map-marked-alt mr-2"></i>
            Mapa de Inspeções
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm rounded-t-lg transition ${
              componenteAtivo === 'cronograma'
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setComponenteAtivo('cronograma')}
          >
            <i className="fas fa-calendar-check mr-2"></i>
            Cronograma
          </button>
        </div>

        {/* Conteúdo do componente ativo */}
        <div className="bg-white rounded-lg shadow-md">
          {renderComponenteAtivo()}
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 mt-6 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 ASCH INFRAESTRUCTURAS Y SERVICIOS S.A. - Todos os direitos reservados
            </div>
            <div className="text-sm text-gray-500">
              Última atualização: 04/04/2025 às 15:30
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DossierQualidade;
