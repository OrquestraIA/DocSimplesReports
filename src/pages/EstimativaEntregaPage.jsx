import { useState, useMemo } from 'react'
import { Calculator, Calendar, Target, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

export default function EstimativaEntregaPage({ requirements = [] }) {
  const [dataEntrega, setDataEntrega] = useState('')
  const [diasTrabalhados, setDiasTrabalhados] = useState(5) // dias por semana
  
  // Calcular estatísticas dos requisitos
  const stats = useMemo(() => {
    const obrigatorios = requirements.filter(r => 
      r.obrigatorio === 'SIM' || r.obrigatorio === 'Sim' || r.obrigatorio === 'sim'
    )
    const naoObrigatorios = requirements.filter(r => 
      r.obrigatorio !== 'SIM' && r.obrigatorio !== 'Sim' && r.obrigatorio !== 'sim'
    )
    
    // Aprovados em Status Homolog
    const obrigatoriosAprovados = obrigatorios.filter(r => r.statusHomolog === 'Aprovado').length
    const naoObrigatoriosAprovados = naoObrigatorios.filter(r => r.statusHomolog === 'Aprovado').length
    
    // Meta: 100% obrigatórios + 85% não obrigatórios
    const metaNaoObrigatorios = Math.ceil(naoObrigatorios.length * 0.85)
    
    // Faltam aprovar
    const faltamObrigatorios = obrigatorios.length - obrigatoriosAprovados
    const faltamNaoObrigatorios = Math.max(0, metaNaoObrigatorios - naoObrigatoriosAprovados)
    const totalFaltam = faltamObrigatorios + faltamNaoObrigatorios
    
    return {
      totalObrigatorios: obrigatorios.length,
      totalNaoObrigatorios: naoObrigatorios.length,
      obrigatoriosAprovados,
      naoObrigatoriosAprovados,
      metaNaoObrigatorios,
      faltamObrigatorios,
      faltamNaoObrigatorios,
      totalFaltam,
      percentualObrigatorios: obrigatorios.length > 0 
        ? ((obrigatoriosAprovados / obrigatorios.length) * 100).toFixed(1) 
        : 0,
      percentualNaoObrigatorios: naoObrigatorios.length > 0 
        ? ((naoObrigatoriosAprovados / naoObrigatorios.length) * 100).toFixed(1) 
        : 0,
      percentualMetaNaoObrig: metaNaoObrigatorios > 0 
        ? ((naoObrigatoriosAprovados / metaNaoObrigatorios) * 100).toFixed(1) 
        : 0
    }
  }, [requirements])

  // Calcular estimativas baseadas na data de entrega
  const estimativas = useMemo(() => {
    if (!dataEntrega || stats.totalFaltam === 0) return null
    
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const entrega = new Date(dataEntrega + 'T00:00:00')
    
    // Calcular dias úteis até a entrega
    let diasUteis = 0
    let dataAtual = new Date(hoje)
    
    while (dataAtual < entrega) {
      const diaSemana = dataAtual.getDay()
      // Considerar apenas dias úteis (seg-sex ou conforme configurado)
      if (diasTrabalhados === 7 || (diaSemana !== 0 && diaSemana !== 6)) {
        diasUteis++
      }
      dataAtual.setDate(dataAtual.getDate() + 1)
    }
    
    if (diasUteis <= 0) return null
    
    // Requisitos por dia necessários para entregar na data selecionada
    const reqPorDiaBase = stats.totalFaltam / diasUteis
    
    // Estimativas baseadas em produtividade
    // Otimista: +25% produtividade = faz MAIS por dia = termina ANTES
    // Pessimista: -30% produtividade = faz MENOS por dia = termina DEPOIS
    
    const produtividadeOtimista = reqPorDiaBase * 1.25 // Faz 25% a mais por dia
    const produtividadePessimista = reqPorDiaBase * 0.7 // Faz 30% a menos por dia
    
    const otimista = {
      reqPorDia: produtividadeOtimista,
      diasNecessarios: Math.ceil(stats.totalFaltam / produtividadeOtimista),
      dataEstimada: calcularDataEntrega(hoje, Math.ceil(stats.totalFaltam / produtividadeOtimista), diasTrabalhados)
    }
    
    const realista = {
      reqPorDia: reqPorDiaBase,
      diasNecessarios: diasUteis,
      dataEstimada: entrega
    }
    
    const pessimista = {
      reqPorDia: produtividadePessimista,
      diasNecessarios: Math.ceil(stats.totalFaltam / produtividadePessimista),
      dataEstimada: calcularDataEntrega(hoje, Math.ceil(stats.totalFaltam / produtividadePessimista), diasTrabalhados)
    }
    
    return {
      diasUteis,
      otimista,
      realista,
      pessimista
    }
  }, [dataEntrega, stats, diasTrabalhados])

  // Função auxiliar para calcular data de entrega
  function calcularDataEntrega(dataInicio, diasNecessarios, diasPorSemana) {
    const data = new Date(dataInicio)
    let diasContados = 0
    
    while (diasContados < diasNecessarios) {
      data.setDate(data.getDate() + 1)
      const diaSemana = data.getDay()
      if (diasPorSemana === 7 || (diaSemana !== 0 && diaSemana !== 6)) {
        diasContados++
      }
    }
    
    return data
  }

  // Formatar data para exibição
  const formatarData = (data) => {
    if (!data) return '-'
    return data.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-7 h-7 text-indigo-600" />
            Estimativa de Entrega
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Calcule quantos requisitos por dia precisam ser aprovados para entregar no prazo
          </p>
        </div>
      </div>

      {requirements.length === 0 ? (
        <div className="card text-center py-16">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum requisito importado</h3>
          <p className="text-gray-600">
            Importe os requisitos na página de Requisitos para calcular as estimativas.
          </p>
        </div>
      ) : (
        <>
          {/* Cards de Status Atual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700">
                    {stats.obrigatoriosAprovados}/{stats.totalObrigatorios}
                  </p>
                  <p className="text-xs text-red-600">Obrigatórios Aprovados</p>
                  <p className="text-xs text-red-500 font-medium">{stats.percentualObrigatorios}%</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    {stats.naoObrigatoriosAprovados}/{stats.metaNaoObrigatorios}
                  </p>
                  <p className="text-xs text-blue-600">Não Obrig. (Meta 85%)</p>
                  <p className="text-xs text-blue-500 font-medium">{stats.percentualMetaNaoObrig}%</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700">{stats.faltamObrigatorios}</p>
                  <p className="text-xs text-yellow-600">Obrigatórios Faltam</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">{stats.totalFaltam}</p>
                  <p className="text-xs text-purple-600">Total a Aprovar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuração */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Configurar Prazo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data de Entrega Desejada
                </label>
                <input
                  type="date"
                  value={dataEntrega}
                  onChange={(e) => setDataEntrega(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dias de Trabalho por Semana
                </label>
                <select
                  value={diasTrabalhados}
                  onChange={(e) => setDiasTrabalhados(Number(e.target.value))}
                  className="input-field"
                >
                  <option value={5}>5 dias (Seg-Sex)</option>
                  <option value={6}>6 dias (Seg-Sáb)</option>
                  <option value={7}>7 dias (Todos)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estimativas */}
          {estimativas && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Otimista */}
              <div className="card border-2 border-green-200 bg-green-50/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-green-800 text-lg">🚀 Otimista</h3>
                  <p className="text-xs text-green-600 mb-4">Se você aprovar +25% por dia</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-3xl font-bold text-green-700">
                        {estimativas.otimista.reqPorDia.toFixed(1)}
                      </p>
                      <p className="text-xs text-green-600">aprovações/dia</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xl font-bold text-green-700">
                        {estimativas.otimista.diasNecessarios} dias
                      </p>
                      <p className="text-xs text-green-600">para concluir</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm font-bold text-green-700">
                        {formatarData(estimativas.otimista.dataEstimada)}
                      </p>
                      <p className="text-xs text-green-600">data estimada</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Realista */}
              <div className="card border-2 border-blue-200 bg-blue-50/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-800 text-lg">📊 Realista</h3>
                  <p className="text-xs text-blue-600 mb-4">Ritmo necessário para a data</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-3xl font-bold text-blue-700">
                        {estimativas.realista.reqPorDia.toFixed(1)}
                      </p>
                      <p className="text-xs text-blue-600">aprovações/dia</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xl font-bold text-blue-700">
                        {estimativas.realista.diasNecessarios} dias
                      </p>
                      <p className="text-xs text-blue-600">para concluir</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm font-bold text-blue-700">
                        {formatarData(estimativas.realista.dataEstimada)}
                      </p>
                      <p className="text-xs text-blue-600">data estimada</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pessimista */}
              <div className="card border-2 border-orange-200 bg-orange-50/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full mb-3">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-orange-800 text-lg">⚠️ Pessimista</h3>
                  <p className="text-xs text-orange-600 mb-4">Se você aprovar -30% por dia</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-3xl font-bold text-orange-700">
                        {estimativas.pessimista.reqPorDia.toFixed(1)}
                      </p>
                      <p className="text-xs text-orange-600">aprovações/dia</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xl font-bold text-orange-700">
                        {estimativas.pessimista.diasNecessarios} dias
                      </p>
                      <p className="text-xs text-orange-600">para concluir</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm font-bold text-orange-700">
                        {formatarData(estimativas.pessimista.dataEstimada)}
                      </p>
                      <p className="text-xs text-orange-600">data estimada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumo da Meta */}
          <div className="card bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 border-slate-700">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              Resumo da Meta de Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card Obrigatórios */}
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-semibold text-sm">Obrigatórios</span>
                </div>
                <p className="text-white text-lg font-bold">{stats.totalObrigatorios} requisitos</p>
                <p className="text-red-300 text-xs">100% necessários</p>
                <div className="mt-2 pt-2 border-t border-red-500/30">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">✓ {stats.obrigatoriosAprovados}</span>
                    <span className="text-red-400">✗ {stats.faltamObrigatorios} faltam</span>
                  </div>
                </div>
              </div>
              
              {/* Card Não Obrigatórios */}
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-semibold text-sm">Não Obrigatórios</span>
                </div>
                <p className="text-white text-lg font-bold">{stats.totalNaoObrigatorios} requisitos</p>
                <p className="text-blue-300 text-xs">Meta: 85% = {stats.metaNaoObrigatorios}</p>
                <div className="mt-2 pt-2 border-t border-blue-500/30">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">✓ {stats.naoObrigatoriosAprovados}</span>
                    <span className="text-blue-400">✗ {stats.faltamNaoObrigatorios} faltam</span>
                  </div>
                </div>
              </div>
              
              {/* Card Total */}
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 flex flex-col justify-center items-center">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">Total a Aprovar</span>
                </div>
                <p className="text-white text-4xl font-bold">{stats.totalFaltam}</p>
                <p className="text-purple-300 text-xs mt-1">requisitos restantes</p>
              </div>
            </div>
          </div>

          {/* Barras de Progresso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Progresso Obrigatórios */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Progresso - Obrigatórios
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Aprovados</span>
                  <span className="font-bold text-red-600">{stats.obrigatoriosAprovados} de {stats.totalObrigatorios}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${Math.min(100, (stats.obrigatoriosAprovados / stats.totalObrigatorios) * 100)}%` }}
                  >
                    {stats.percentualObrigatorios > 10 && (
                      <span className="text-xs text-white font-bold">{stats.percentualObrigatorios}%</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Meta: 100% ({stats.faltamObrigatorios} restantes)
                </p>
              </div>
            </div>

            {/* Progresso Não Obrigatórios */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Progresso - Não Obrigatórios (Meta 85%)
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Aprovados</span>
                  <span className="font-bold text-blue-600">{stats.naoObrigatoriosAprovados} de {stats.metaNaoObrigatorios}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${Math.min(100, (stats.naoObrigatoriosAprovados / stats.metaNaoObrigatorios) * 100)}%` }}
                  >
                    {stats.percentualMetaNaoObrig > 10 && (
                      <span className="text-xs text-white font-bold">{stats.percentualMetaNaoObrig}%</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Meta: 85% de {stats.totalNaoObrigatorios} = {stats.metaNaoObrigatorios} ({stats.faltamNaoObrigatorios} restantes)
                </p>
              </div>
            </div>
          </div>

          {/* Dicas e Alertas */}
          {estimativas && (
            <div className="card border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/20">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                💡 Dicas para Atingir a Meta
              </h3>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>
                    Para entregar no prazo <strong>realista</strong>, você precisa aprovar em média <strong>{estimativas.realista.reqPorDia.toFixed(1)} requisitos por dia</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>
                    Foque primeiro nos <strong className="text-red-600">{stats.faltamObrigatorios} obrigatórios</strong> restantes - eles são críticos para a entrega.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>
                    Você tem <strong>{estimativas.diasUteis} dias úteis</strong> até a data de entrega selecionada.
                  </span>
                </li>
                {estimativas.realista.reqPorDia > 15 && (
                  <li className="flex items-start gap-2 text-red-600 font-medium">
                    <span>⚠️</span>
                    <span>
                      Atenção: A meta de {estimativas.realista.reqPorDia.toFixed(1)} req/dia é alta. Considere estender o prazo ou aumentar a equipe.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Metas Semanais */}
          {estimativas && estimativas.diasUteis > 7 && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                📅 Metas Semanais (Cenário Realista)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Semana</th>
                      <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">Meta</th>
                      <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">Acumulado</th>
                      <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">Restante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.min(8, Math.ceil(estimativas.diasUteis / 5)) }, (_, i) => {
                      const diasNaSemana = Math.min(5, estimativas.diasUteis - (i * 5))
                      const metaSemana = Math.round(estimativas.realista.reqPorDia * diasNaSemana)
                      const acumulado = Math.min(stats.totalFaltam, Math.round(estimativas.realista.reqPorDia * Math.min((i + 1) * 5, estimativas.diasUteis)))
                      const restante = stats.totalFaltam - acumulado
                      return (
                        <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">Semana {i + 1}</td>
                          <td className="py-2 px-3 text-center text-blue-600 font-bold">{metaSemana}</td>
                          <td className="py-2 px-3 text-center text-green-600">{acumulado}</td>
                          <td className="py-2 px-3 text-center text-orange-600">{Math.max(0, restante)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!dataEntrega && (
            <div className="card bg-yellow-50 border-yellow-200 text-center py-8">
              <Calendar className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <p className="text-yellow-800 font-medium">
                Selecione uma data de entrega para ver as estimativas
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
