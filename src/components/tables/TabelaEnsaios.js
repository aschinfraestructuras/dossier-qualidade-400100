import React from 'react';

const TabelaEnsaios = () => {
  // Dados dos ensaios com base no gráfico fornecido
  const dadosEnsaios = [
    { tipo: 'Betão', quantidade: 95, conformes: 94, naoConformes: 1, pendentes: 0 },
    { tipo: 'Densidades', quantidade: 58, conformes: 56, naoConformes: 2, pendentes: 0 },
    { tipo: 'Solos', quantidade: 32, conformes: 31, naoConformes: 0, pendentes: 1 },
    { tipo: 'Argamassas', quantidade: 62, conformes: 60, naoConformes: 2, pendentes: 0 },
    { tipo: 'Placas de Carga', quantidade: 28, conformes: 27, naoConformes: 1, pendentes: 0 },
    { tipo: 'Agregados', quantidade: 15, conformes: 15, naoConformes: 0, pendentes: 0 },
    { tipo: 'Soldadura (NDT)', quantidade: 22, conformes: 20, naoConformes: 1, pendentes: 1 },
    { tipo: 'Dielétrico (Xispómetro)', quantidade: 30, conformes: 29, naoConformes: 0, pendentes: 1 },
    { tipo: 'Provas de Pressão', quantidade: 12, conformes: 11, naoConformes: 0, pendentes: 1 },
    { tipo: 'Linhas de água/oleosas', quantidade: 40, conformes: 39, naoConformes: 1, pendentes: 0 },
    { tipo: 'Pintura', quantidade: 25, conformes: 24, naoConformes: 0, pendentes: 1 }
  ];

  // Calcular totais
  const totalQuantidade = dadosEnsaios.reduce((sum, item) => sum + item.quantidade, 0);
  const totalConformes = dadosEnsaios.reduce((sum, item) => sum + item.conformes, 0);
  const totalNaoConformes = dadosEnsaios.reduce((sum, item) => sum + item.naoConformes, 0);
  const totalPendentes = dadosEnsaios.reduce((sum, item) => sum + item.pendentes, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <i className="fas fa-vial mr-2"></i> Ensaios Realizados por Tipo
      </h2>

      <div className="mb-6 flex flex-wrap gap-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center flex-1 min-w-[150px]">
          <div className="text-4xl font-bold text-blue-600">{totalQuantidade}</div>
          <div className="text-gray-500 text-sm">Total de Ensaios</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center flex-1 min-w-[150px]">
          <div className="text-4xl font-bold text-green-600">{totalConformes}</div>
          <div className="text-gray-500 text-sm">Conformes</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center flex-1 min-w-[150px]">
          <div className="text-4xl font-bold text-red-600">{totalNaoConformes}</div>
          <div className="text-gray-500 text-sm">Não Conformes</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center flex-1 min-w-[150px]">
          <div className="text-4xl font-bold text-yellow-600">{totalPendentes}</div>
          <div className="text-gray-500 text-sm">Pendentes</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border border-gray-300 px-4 py-3 text-left">Tipo de Ensaio</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Quantidade</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Conformes</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Não Conformes</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Pendentes</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Representação Gráfica</th>
            </tr>
          </thead>
          <tbody>
            {dadosEnsaios.map((ensaio, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-3 font-medium">{ensaio.tipo}</td>
                <td className="border border-gray-300 px-4 py-3 text-center font-bold">{ensaio.quantidade}</td>
                <td className="border border-gray-300 px-4 py-3 text-center text-green-600">{ensaio.conformes}</td>
                <td className="border border-gray-300 px-4 py-3 text-center text-red-600">{ensaio.naoConformes}</td>
                <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">{ensaio.pendentes}</td>
                <td className="border border-gray-300 px-4 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 relative" 
                      style={{ width: `${ensaio.quantidade / 1.2}%`, maxWidth: '100%' }}
                    >
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 px-4 py-3">Totais</td>
              <td className="border border-gray-300 px-4 py-3 text-center">{totalQuantidade}</td>
              <td className="border border-gray-300 px-4 py-3 text-center text-green-600">{totalConformes}</td>
              <td className="border border-gray-300 px-4 py-3 text-center text-red-600">{totalNaoConformes}</td>
              <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">{totalPendentes}</td>
              <td className="border border-gray-300 px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-primary">Informações Adicionais</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><i className="fas fa-check-circle text-green-600 mr-2"></i> Taxa de conformidade global: <span className="font-semibold">{((totalConformes / totalQuantidade) * 100).toFixed(1)}%</span></li>
            <li><i className="fas fa-info-circle text-blue-600 mr-2"></i> Ensaios previstos para conclusão até 31/05/2025: <span className="font-semibold">45</span></li>
            <li><i className="fas fa-calendar text-primary mr-2"></i> Último lote de ensaios realizados em: <span className="font-semibold">03/04/2025</span></li>
            <li><i className="fas fa-chart-line text-purple-600 mr-2"></i> Tendência: <span className="font-semibold text-green-600">Melhoria contínua</span></li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-primary">Observações</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i> Melhorar monitorização dos ensaios de <span className="font-semibold">Soldadura NDT</span> para reduzir pendentes</li>
            <li><i className="fas fa-exclamation-circle text-red-600 mr-2"></i> Não conformidade em <span className="font-semibold">Argamassas</span> relacionada com tempos de cura inadequados</li>
            <li><i className="fas fa-clipboard-check text-green-600 mr-2"></i> Excelentes resultados nos ensaios de <span className="font-semibold">Betão</span> e <span className="font-semibold">Agregados</span></li>
            <li><i className="fas fa-flag text-primary mr-2"></i> Próxima auditoria interna aos processos de controlo: <span className="font-semibold">15/04/2025</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabelaEnsaios;
