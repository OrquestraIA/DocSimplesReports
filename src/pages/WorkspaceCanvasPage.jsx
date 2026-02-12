import React, { useState, useRef, useEffect } from 'react'
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
  Music3,
  Minus,
  Square,
  X
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

const DEFAULT_WINDOW_SIZE = { width: 280, height: 180 }
const LAYOUT_STORAGE_KEY = 'workspaceCanvasLayout'

const WorkspaceCanvasPage = () => {
  const navigate = useNavigate()
  const [windows, setWindows] = useState([])
  const [zCounter, setZCounter] = useState(1)
  const canvasRef = useRef(null)
  const statusTimerRef = useRef(null)
  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setWindows(parsed)
        const maxZ = parsed.reduce((max, win) => Math.max(max, win.zIndex || 1), 1)
        setZCounter(maxZ + 1)
      }
    } catch (error) {
      console.error('Erro ao carregar layout salvo:', error)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current)
    }
  }, [])

  const showStatus = (message) => {
    setStatusMessage(message)
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current)
    statusTimerRef.current = setTimeout(() => setStatusMessage(null), 2500)
  }

  const handleDragStart = (event, moduleId) => {
    event.dataTransfer.setData('moduleId', moduleId)
  }

  const handleSaveLayout = () => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(windows))
    showStatus('Layout salvo com sucesso.')
  }

  const handleResetLayout = () => {
    setWindows([])
    localStorage.removeItem(LAYOUT_STORAGE_KEY)
    showStatus('Layout resetado e removido do armazenamento.')
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const moduleId = event.dataTransfer.getData('moduleId')
    if (!moduleId) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = event.clientX - rect.left - DEFAULT_WINDOW_SIZE.width / 2
    const y = event.clientY - rect.top - DEFAULT_WINDOW_SIZE.height / 2

    const newWindow = {
      id: `${moduleId}-${Date.now()}`,
      moduleId,
      x: Math.max(0, Math.min(x, rect.width - DEFAULT_WINDOW_SIZE.width)),
      y: Math.max(0, Math.min(y, rect.height - DEFAULT_WINDOW_SIZE.height)),
      width: DEFAULT_WINDOW_SIZE.width,
      height: DEFAULT_WINDOW_SIZE.height,
      zIndex: zCounter,
      minimized: false
    }

    setWindows((prev) => [...prev, newWindow])
    setZCounter((prev) => prev + 1)
  }

  const handleBringToFront = (windowId) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === windowId
          ? { ...win, zIndex: zCounter + 1 }
          : win
      )
    )
    setZCounter((prev) => prev + 1)
  }

  const handleWindowMouseDown = (event, windowId) => {
    event.preventDefault()
    handleBringToFront(windowId)

    const rect = canvasRef.current?.getBoundingClientRect()
    const targetWindow = windows.find((win) => win.id === windowId)
    if (!rect || !targetWindow) return

    const startOffsetX = event.clientX - rect.left - targetWindow.x
    const startOffsetY = event.clientY - rect.top - targetWindow.y

    const onMouseMove = (moveEvent) => {
      const currentRect = canvasRef.current?.getBoundingClientRect()
      if (!currentRect) return

      const newX = Math.max(
        0,
        Math.min(
          moveEvent.clientX - currentRect.left - startOffsetX,
          currentRect.width - targetWindow.width
        )
      )
      const newY = Math.max(
        0,
        Math.min(
          moveEvent.clientY - currentRect.top - startOffsetY,
          currentRect.height - targetWindow.height
        )
      )

      setWindows((prev) =>
        prev.map((win) =>
          win.id === windowId ? { ...win, x: newX, y: newY } : win
        )
      )
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleCloseWindow = (windowId) => {
    setWindows((prev) => prev.filter((win) => win.id !== windowId))
  }

  const handleToggleMinimize = (windowId) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === windowId ? { ...win, minimized: !win.minimized } : win
      )
    )
  }

  const handleResizeMouseDown = (event, windowId) => {
    event.preventDefault()
    event.stopPropagation()
    handleBringToFront(windowId)

    const rect = canvasRef.current?.getBoundingClientRect()
    const targetWindow = windows.find((win) => win.id === windowId)
    if (!rect || !targetWindow || targetWindow.minimized) return

    const startWidth = targetWindow.width
    const startHeight = targetWindow.height
    const startX = event.clientX
    const startY = event.clientY

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      const maxWidth = rect.width - targetWindow.x
      const maxHeight = rect.height - targetWindow.y

      const newWidth = Math.max(200, Math.min(startWidth + deltaX, maxWidth))
      const newHeight = Math.max(140, Math.min(startHeight + deltaY, maxHeight))

      setWindows((prev) =>
        prev.map((win) =>
          win.id === windowId ? { ...win, width: newWidth, height: newHeight } : win
        )
      )
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const renderWindow = (window) => {
    const module = MODULES.find((mod) => mod.id === window.moduleId)
    return (
      <div
        key={window.id}
        style={{
          left: `${window.x}px`,
          top: `${window.y}px`,
          width: `${window.width}px`,
          height: `${window.height}px`,
          zIndex: window.zIndex || 1
        }}
        className="absolute"
        onMouseDown={(event) => handleWindowMouseDown(event, window.id)}
      >
        <div className="h-full rounded-xl border border-white/10 bg-gray-900/90 shadow-xl shadow-black/40 flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 text-xs text-white/80">
            <span className="uppercase tracking-[0.2em]">{module?.name || 'Módulo'}</span>
            <div className="flex items-center gap-1 text-white/60">
              <button
                className="p-1 hover:bg-white/10 rounded transition-colors"
                onClick={(event) => {
                  event.stopPropagation()
                  handleToggleMinimize(window.id)
                }}
                title={window.minimized ? 'Restaurar' : 'Minimizar'}
              >
                {window.minimized ? <Square className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              </button>
              <button
                className="p-1 hover:bg-white/10 rounded transition-colors text-red-400 hover:text-red-300"
                onClick={(event) => {
                  event.stopPropagation()
                  handleCloseWindow(window.id)
                }}
                title="Fechar"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          {!window.minimized && (
            <div className="flex-1 px-3 py-2 text-[11px] text-gray-400">
              Conteúdo em reconstrução. Em breve voltaremos a renderizar os dados deste módulo aqui.
            </div>
          )}
          {!window.minimized && (
            <div
              className="h-3 bg-white/5 flex items-center justify-end px-2 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-se-resize"
              onMouseDown={(event) => handleResizeMouseDown(event, window.id)}
            >
              resize
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-white w-full">
      <div className="mx-auto px-6 py-12 space-y-10 max-w-7xl w-full">
        <header className="space-y-3 text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-blue-400">Workspace Canvas</p>
          <h1 className="text-3xl font-semibold">Reconstruindo sua área personalizada</h1>
          <p className="text-gray-400 max-w-3xl">
            Vamos reintroduzir o canvas parte por parte. Por enquanto, você já consegue visualizar os módulos disponíveis
            e o espaço reservado onde eles voltarão a ser posicionados em breve.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
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
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2 cursor-grab active:cursor-grabbing select-none"
                    draggable
                    onDragStart={(event) => handleDragStart(event, module.id)}
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

          <div className="rounded-2xl border border-dashed border-white/20 bg-gradient-to-b from-gray-900/60 to-gray-900/20 p-6 flex flex-col gap-4 min-h-[70vh]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Área do canvas</p>
              <h2 className="text-lg font-semibold">Dropzone ativa</h2>
              <p className="text-sm text-gray-400">
                Agora você já pode arrastar um módulo da biblioteca para cá e veremos uma janela simples sendo criada.
              </p>
            </div>
            <div
              ref={canvasRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="flex-1 rounded-xl border border-dashed border-white/10 bg-black/20 relative overflow-hidden w-full"
            >
              {windows.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-sm text-gray-500 gap-2 pointer-events-none">
                  <p>Arraste um módulo da biblioteca e solte aqui para criar a primeira janela.</p>
                  <p className="text-xs text-gray-600">Ainda sem persistência: perfeito para testar o canvas.</p>
                </div>
              ) : (
                windows.map(renderWindow)
              )}
              <div className="absolute inset-0 pointer-events-none border border-dashed border-white/5 rounded-2xl" />
            </div>
            <div className="text-sm text-gray-500">
              Última atualização: dropzone reativada com criação básica de janelas + salvamento manual.
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSaveLayout}
                className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Salvar layout
              </button>
              <button
                onClick={handleResetLayout}
                className="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-200"
              >
                Resetar
              </button>
            </div>
            {statusMessage && (
              <p className="text-xs text-blue-300 mt-1">{statusMessage}</p>
            )}
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
