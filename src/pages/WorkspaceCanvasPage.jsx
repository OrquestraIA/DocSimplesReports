import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ClipboardList,
  MessageSquare,
  Newspaper,
  Monitor,
  LayoutGrid,
  BarChart3,
  HardHat,
  Code2,
  ShieldCheck,
  Music3
} from 'lucide-react'

const MODULES = [
  { id: 'tasks_operacao', name: 'Tarefas Operação', icon: HardHat, description: 'Demandas operacionais para o time de operação' },
  { id: 'tasks_dev', name: 'Tarefas Dev', icon: Code2, description: 'Fila específica para desenvolvedores' },
  { id: 'tasks_qa', name: 'Tarefas QA', icon: ShieldCheck, description: 'Pendências de QA, retestes e homologações' },
  { id: 'notes', name: 'Notas', icon: MessageSquare, description: 'Bloco rápido para anotações' },
  { id: 'digital', name: 'Digital', icon: Newspaper, description: 'Feed de notícias/insights digitais' },
  { id: 'monitor', name: 'Monitor', icon: Monitor, description: 'Indicadores e status em tempo real' },
  { id: 'spotify', name: 'Música & Foco', icon: Music3, description: 'Player embutido para manter a concentração' },
  { id: 'kanban', name: 'Kanban', icon: LayoutGrid, description: 'Quadro visual para status das demandas' }
]

const WorkspaceCanvasPage = () => {
  const navigate = useNavigate()
  const [windows] = useState([
    {
      id: 'placeholder-1',
      title: 'Janela de exemplo',
      description: 'Assim que reativarmos o canvas, suas janelas voltarão a aparecer aqui.',
      width: 260,
      height: 160,
      position: 'top-left'
    },
    {
      id: 'placeholder-2',
      title: 'Dados em tempo real',
      description: 'Indicadores, tarefas, notas e muito mais.',
      width: 240,
      height: 140,
      position: 'bottom-right'
    }
  ])

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-3 text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-blue-400">Workspace Canvas</p>
          <h1 className="text-3xl font-semibold">Reconstruindo sua área personalizada</h1>
          <p className="text-gray-400 max-w-3xl">
            Vamos reintroduzir o canvas parte por parte. Por enquanto, você já consegue visualizar os módulos disponíveis
            e o espaço reservado onde eles voltarão a ser posicionados em breve.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/70 to-gray-900/30 p-5 space-y-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Biblioteca</p>
              <h2 className="text-lg font-semibold">Módulos disponíveis</h2>
              <p className="text-sm text-gray-400">
                Estes serão os blocos que você poderá arrastar para o canvas personalizado.
              </p>
            </div>
            <div className="space-y-3">
              {MODULES.map((module) => {
                const Icon = module.icon
                return (
                  <div
                    key={module.id}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                  >
                    <div className="rounded-lg bg-white/10 p-2">
                      <Icon className="h-4 w-4 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{module.name}</p>
                      <p className="text-xs text-gray-400">{module.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-white/20 bg-gradient-to-b from-gray-900/60 to-gray-900/20 p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Área do canvas</p>
              <h2 className="text-lg font-semibold">Janela reservada</h2>
              <p className="text-sm text-gray-400">
                Esta visualização mostra apenas placeholders. A próxima etapa será permitir arrastar módulos reais e salvar
                o layout novamente.
              </p>
            </div>
            <div className="flex-1 rounded-xl border border-dashed border-white/10 bg-black/20 relative overflow-hidden">
              {windows.map((win) => (
                <div
                  key={win.id}
                  className={`absolute rounded-xl border border-white/10 bg-gray-900/90 p-4 shadow-lg shadow-black/40 text-left space-y-2 ${
                    win.position === 'top-left' ? 'top-6 left-6' : 'bottom-6 right-6'
                  }`}
                  style={{ width: win.width, height: win.height }}
                >
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{win.title}</span>
                    <span className="text-white/40">prévia</span>
                  </div>
                  <p className="text-sm text-gray-300">{win.description}</p>
                  <div className="flex gap-2 text-[11px] text-gray-500">
                    <span className="px-2 py-0.5 bg-white/5 rounded-full border border-white/5">drag</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded-full border border-white/5">resize</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded-full border border-white/5">save</span>
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 pointer-events-none border border-dashed border-white/5 rounded-2xl" />
            </div>
            <div className="text-sm text-gray-500">
              Última atualização: placeholders de janelas adicionados para preparar a reativação do canvas.
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="text-sm text-gray-400">Precisa continuar usando os relatórios tradicionais?</p>
          <button
            onClick={() => navigate('/espacos')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
          >
            Voltar para Workspaces
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceCanvasPage
