import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
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
import TaskViewModal from '../components/TaskViewModal'
import MediaViewer from '../components/MediaViewer'
import { subscribeToTasks } from '../firebase'

const MODULES = [
  { id: 'tasks_operacao', name: 'Tarefas Operação', icon: HardHat, description: 'Demandas operacionais para o time de operação' },
  { id: 'tasks_dev', name: 'Tarefas Dev', icon: Code2, description: 'Fila específica para desenvolvedores' },
  { id: 'tasks_qa', name: 'Tarefas QA', icon: ShieldCheck, description: 'Pendências de QA, retestes e homologações' },
  { id: 'notes', name: 'Notas', icon: MessageSquare, description: 'Bloco rápido para anotações' },
  { id: 'digital', name: 'Digital', icon: Newspaper, description: 'Feed de notícias/insights digitais' },
  { id: 'monitor', name: 'Monitor', icon: Monitor, description: 'Indicadores e status em tempo real' },
  {
    id: 'spotify',
    name: 'Música & Foco',
    icon: Music3,
    description: 'Player embutido para manter a concentração — inclua seu podcast ou playlist favorita.'
  },
  { id: 'kanban', name: 'Kanban', icon: LayoutGrid, description: 'Quadro visual para status das demandas' }
]

const DEFAULT_CLASSICAL_PLAYLIST = {
  title: 'Beethoven & Bach Focus',
  description: 'Curadoria instrumental para manter o foco profundo.',
  embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWEJlAGA9gs0',
  watchUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0'
}

const mapPlaylistInputToEmbed = (rawUrl = '') => {
  if (!rawUrl) return null
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  let parsedUrl

  try {
    parsedUrl = new URL(normalized)
  } catch {
    return null
  }

  const { hostname, pathname, searchParams } = parsedUrl

  if (hostname.includes('spotify.com')) {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length >= 2) {
      const [resourceType, resourceId] = segments
      if (resourceType && resourceId) {
        return {
          embedUrl: `https://open.spotify.com/embed/${resourceType}/${resourceId}`,
          watchUrl: normalized
        }
      }
    }
    return null
  }

  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    if (hostname === 'youtu.be') {
      const videoId = pathname.replace('/', '')
      return videoId
        ? {
            embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
            watchUrl: `https://www.youtube.com/watch?v=${videoId}`
          }
        : null
    }

    if (pathname.startsWith('/live/')) {
      const liveId = pathname.replace('/live/', '').split('/')[0]
      return liveId
        ? {
            embedUrl: `https://www.youtube.com/embed/${liveId}?rel=0`,
            watchUrl: normalized
          }
        : null
    }

    const listId = searchParams.get('list')
    if (listId) {
      return {
        embedUrl: `https://www.youtube.com/embed/videoseries?list=${listId}&rel=0`,
        watchUrl: normalized
      }
    }

    const videoId = searchParams.get('v')
    if (videoId) {
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
        watchUrl: normalized
      }
    }
  }

  return null
}

const DEFAULT_WINDOW_SIZE = { width: 280, height: 180 }
const LAYOUT_STORAGE_KEY = 'workspaceCanvasLayout'
const MODULE_DEFAULT_SIZES = {
  digital: { width: 380, height: 240 },
  monitor: { width: 320, height: 200 },
  spotify: { width: 320, height: 220 }
}

const normalizeWorkspace = (value) => (value || '').toString().toLowerCase().trim()

const VARIANT_WORKSPACE_MAP = {
  operacao: ['operacao', 'op', 'operacional'],
  dev: ['dev', 'devs', 'desenvolvimento', 'desenvolvedor', 'engenharia', 'engenharia de software', 'tecnologia', 'tech'],
  qa: ['qa', 'qualidade', 'homologacao', 'homologação']
}

const DEFAULT_STREAM_IDS = ['sen_live', 'techorbit_live', 'lockergnome_live']

const DIGITAL_STREAMS = [
  {
    id: 'sen_live',
    name: 'Sen Space 4K',
    description: 'Live 4K da Terra e da ISS — atmosfera futurista e inspiradora.',
    embedUrl: 'https://www.youtube.com/embed/fO9e9jnhYK8',
    watchUrl: 'https://www.youtube.com/live/fO9e9jnhYK8?si=AFzrTktxLpld084r'
  },
  {
    id: 'techorbit_live',
    name: 'Tech Orbit Live',
    description: 'Painel contínuo sobre inovação, espaço e tendências digitais.',
    embedUrl: 'https://www.youtube.com/embed/fFttM7yKjok',
    watchUrl: 'https://www.youtube.com/live/fFttM7yKjok?si=gV-FfYlxegbXJVEZ'
  },
  {
    id: 'lockergnome_live',
    name: 'LockerGnome Tech Talk',
    description: 'Discussões 24/7 sobre gadgets, IA e novidades do mercado.',
    embedUrl: 'https://www.youtube.com/embed/Qpi0wdGXY_8',
    watchUrl: 'https://www.youtube.com/live/Qpi0wdGXY_8?si=5R1yLXuEbyslLmX3'
  }
]

const inferTaskWorkspace = (task = {}) => {
  if (task.workspace) return task.workspace
  if (task.sourceType === 'test_document' || task.sourceType === 'test_execution') {
    return 'devs'
  }
  if (task.type === 'bug') return 'qa'
  return 'operacao'
}

const WorkspaceCanvasPage = ({
  tasks: tasksProp = [],
  users = [],
  currentUser = null,
  requirements = [],
  testDocuments = [],
  testExecutions = [],
  onAddTaskComment,
  onToggleTaskReaction,
  onUploadTaskEvidence,
  onDeleteTaskEvidence,
  onRequestRetest,
  onAddNotification,
  onUpdateDocumentStatus,
  onUpdateRequirement,
  onCreateTask
} = {}) => {
  const navigate = useNavigate()
  const [windows, setWindows] = useState([])
  const [zCounter, setZCounter] = useState(1)
  const [tasksState, setTasksState] = useState(tasksProp)
  const [selectedTask, setSelectedTask] = useState(null)
  const [mediaViewerState, setMediaViewerState] = useState(null)
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
    setTasksState(tasksProp)
  }, [tasksProp])

  useEffect(() => {
    if (tasksProp?.length) return undefined
    const unsubscribe = subscribeToTasks(
      (fetchedTasks) => setTasksState(fetchedTasks || []),
      (error) => {
        console.error('Erro ao buscar tarefas:', error)
        setTasksState([])
      }
    )
    return () => unsubscribe?.()
  }, [tasksProp])

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current)
    }
  }, [])

  const effectiveTasks = useMemo(
    () => (tasksProp?.length ? tasksProp : tasksState) || [],
    [tasksProp, tasksState]
  )

  const monitorStats = useMemo(() => {
    const bugCount = effectiveTasks.filter(
      (task) => (task.type || '').toString().toLowerCase() === 'bug'
    ).length

    const approvedRequirements =
      requirements?.filter((req) => req.statusHomolog === 'Aprovado').length || 0
    const rejectedRequirements =
      requirements?.filter((req) => req.statusHomolog === 'Reprovado').length || 0
    const totalRequirements = requirements?.length || 0
    const approvalRate =
      totalRequirements > 0 ? Math.round((approvedRequirements / totalRequirements) * 100) : 0

    return {
      bugCount,
      approvedRequirements,
      rejectedRequirements,
      totalRequirements,
      approvalRate
    }
  }, [effectiveTasks, requirements])

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

    const moduleSize = MODULE_DEFAULT_SIZES[moduleId] || DEFAULT_WINDOW_SIZE
    const x = event.clientX - rect.left - moduleSize.width / 2
    const y = event.clientY - rect.top - moduleSize.height / 2

    const newWindow = {
      id: `${moduleId}-${Date.now()}`,
      moduleId,
      x: Math.max(0, Math.min(x, rect.width - moduleSize.width)),
      y: Math.max(0, Math.min(y, rect.height - moduleSize.height)),
      width: moduleSize.width,
      height: moduleSize.height,
      zIndex: zCounter,
      minimized: false
    }
    if (moduleId === 'digital' && DIGITAL_STREAMS.length) {
      newWindow.streamId = DIGITAL_STREAMS[0].id
    }
    if (moduleId === 'spotify') {
      newWindow.playlistEmbed = DEFAULT_CLASSICAL_PLAYLIST.embedUrl
      newWindow.playlistTitle = DEFAULT_CLASSICAL_PLAYLIST.title
      newWindow.playlistDescription = DEFAULT_CLASSICAL_PLAYLIST.description
      newWindow.playlistWatchUrl = DEFAULT_CLASSICAL_PLAYLIST.watchUrl
      newWindow.customPlaylistInput = ''
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

  const handleUpdateWindow = useCallback((windowId, updates) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === windowId ? { ...win, ...updates } : win))
    )
  }, [])

  const renderWindowContent = (window) => {
    switch (window.moduleId) {
      case 'tasks_operacao':
        return <TasksWindowContent tasks={effectiveTasks} variant="operacao" onSelectTask={setSelectedTask} />
      case 'tasks_dev':
        return <TasksWindowContent tasks={effectiveTasks} variant="dev" onSelectTask={setSelectedTask} />
      case 'tasks_qa':
        return <TasksWindowContent tasks={effectiveTasks} variant="qa" onSelectTask={setSelectedTask} />
      case 'monitor':
        return <MonitorWindowContent stats={monitorStats} />
      case 'digital':
        return (
          <DigitalWindowContent
            windowData={window}
            onChangeStream={(streamId) => handleUpdateWindow(window.id, { streamId })}
          />
        )
      case 'spotify':
        return (
          <MusicFocusWindowContent
            windowData={window}
            onUpdate={(updates) => handleUpdateWindow(window.id, updates)}
          />
        )
      default:
        return <PlaceholderModuleContent moduleId={window.moduleId} />
    }
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
            <div className="flex-1 px-3 py-2 text-[11px] text-gray-200 overflow-y-auto pr-1 custom-scroll">
              {renderWindowContent(window)}
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
      {selectedTask && (
        <TaskViewModal
          task={selectedTask}
          users={users}
          currentUser={currentUser}
          onClose={() => setSelectedTask(null)}
          onViewMedia={(media, index) => setMediaViewerState({ media, index })}
          onAddComment={onAddTaskComment}
          onToggleReaction={onToggleTaskReaction}
          onUploadEvidence={onUploadTaskEvidence}
          onDeleteEvidence={onDeleteTaskEvidence}
          onRequestRetest={onRequestRetest}
          onAddNotification={onAddNotification}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          requirements={requirements}
          testDocuments={testDocuments}
          onUpdateRequirement={onUpdateRequirement}
        />
      )}
      {mediaViewerState && (
        <MediaViewer
          media={mediaViewerState.media}
          initialIndex={mediaViewerState.index}
          onClose={() => setMediaViewerState(null)}
        />
      )}
    </div>
  )
}

const MonitorWindowContent = ({ stats }) => {
  if (!stats) {
    return (
      <div className="h-full flex items-center justify-center text-center text-[11px] text-gray-400 px-4">
        Carregando métricas...
      </div>
    )
  }

  const cards = [
    {
      label: 'Bugs abertos',
      value: stats.bugCount,
      accent: 'text-red-300',
      border: 'border-red-400/30'
    },
    {
      label: 'Req. aprovados',
      value: stats.approvedRequirements,
      accent: 'text-emerald-300',
      border: 'border-emerald-400/30'
    },
    {
      label: 'Req. reprovados',
      value: stats.rejectedRequirements,
      accent: 'text-amber-300',
      border: 'border-amber-400/30'
    }
  ]

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-lg border ${card.border} bg-white/5 px-2 py-2`}
          >
            <p className="text-white/50 uppercase tracking-[0.2em]">{card.label}</p>
            <p className={`text-lg font-semibold ${card.accent}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] space-y-1">
        <div className="flex items-center justify-between text-white/70">
          <span>Total de requisitos</span>
          <span className="text-sm font-semibold text-white">{stats.totalRequirements}</span>
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-white/50 uppercase tracking-[0.2em]">
            <span>Aprovação</span>
            <span className="text-white">{stats.approvalRate}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300"
              style={{ width: `${Math.min(stats.approvalRate, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/60 uppercase tracking-[0.2em]">
        Atualizado em tempo real
      </div>
    </div>
  )
}

const MusicFocusWindowContent = ({ windowData = {}, onUpdate }) => {
  const [inputValue, setInputValue] = useState(windowData.customPlaylistInput || '')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setInputValue(windowData.customPlaylistInput || '')
  }, [windowData.customPlaylistInput])

  const currentEmbed = windowData.playlistEmbed || DEFAULT_CLASSICAL_PLAYLIST.embedUrl
  const currentTitle = windowData.playlistTitle || DEFAULT_CLASSICAL_PLAYLIST.title
  const currentDescription =
    windowData.playlistDescription || DEFAULT_CLASSICAL_PLAYLIST.description
  const currentWatchUrl = windowData.playlistWatchUrl || DEFAULT_CLASSICAL_PLAYLIST.watchUrl

  const handleApply = () => {
    const mapped = mapPlaylistInputToEmbed(inputValue)
    if (!mapped) {
      setErrorMessage('Link não reconhecido. Use URLs do Spotify ou YouTube.')
      return
    }
    setErrorMessage(null)
    onUpdate?.({
      playlistEmbed: mapped.embedUrl,
      playlistTitle: 'Playlist personalizada',
      playlistDescription: 'Transmissão adicionada por você.',
      playlistWatchUrl: mapped.watchUrl || mapped.embedUrl,
      customPlaylistInput: inputValue
    })
  }

  const handleResetDefault = () => {
    setErrorMessage(null)
    setInputValue('')
    onUpdate?.({
      playlistEmbed: DEFAULT_CLASSICAL_PLAYLIST.embedUrl,
      playlistTitle: DEFAULT_CLASSICAL_PLAYLIST.title,
      playlistDescription: DEFAULT_CLASSICAL_PLAYLIST.description,
      playlistWatchUrl: DEFAULT_CLASSICAL_PLAYLIST.watchUrl,
      customPlaylistInput: ''
    })
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-500/20 px-4 py-3 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">Focus mode</p>
            <p className="text-white font-semibold text-lg leading-tight">{currentTitle}</p>
            <p className="text-white/70 text-[11px]">{currentDescription}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handleResetDefault}
              className="text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white"
            >
              Reset
            </button>
            {currentWatchUrl && (
              <a
                href={currentWatchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] uppercase tracking-[0.2em] text-blue-200 hover:text-blue-100"
              >
                Abrir
              </a>
            )}
          </div>
        </div>
        <p className="text-[11px] text-white/70">
          Dica: se o autoplay estiver bloqueado, clique em “Abrir” ou use o player abaixo para iniciar.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 flex-1">
        <div className="relative w-full h-full min-h-[180px] rounded-xl overflow-hidden border border-white/10 shadow-inner shadow-black/30">
          <iframe
            src={currentEmbed}
            title="music focus player"
            className="w-full h-full"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 space-y-2">
        <label className="text-[10px] text-white/70 uppercase tracking-[0.3em]">
          Atualizar player (Spotify/YouTube)
        </label>
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Cole o link e clique em Aplicar"
            onMouseDown={(event) => event.stopPropagation()}
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/60"
          />
          <button
            onClick={handleApply}
            onMouseDown={(event) => event.stopPropagation()}
            className="px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[10px] uppercase tracking-[0.2em]"
          >
            Aplicar
          </button>
        </div>
        {errorMessage && (
          <p className="text-[10px] text-red-300 uppercase tracking-[0.2em]">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default WorkspaceCanvasPage

const TasksWindowContent = ({ tasks = [], variant, onSelectTask }) => {
  const allowedWorkspaces = VARIANT_WORKSPACE_MAP[variant] || []

  const filteredTasks = useMemo(() => {
    if (!Array.isArray(tasks) || !tasks.length) return []
    return tasks.filter((task) => {
      const workspaceKey = normalizeWorkspace(task.workspace || inferTaskWorkspace(task))
      return allowedWorkspaces.includes(workspaceKey)
    })
  }, [tasks, allowedWorkspaces])

  if (!filteredTasks.length) {
    return (
      <div className="h-full flex items-center justify-center text-center text-[11px] text-gray-400 px-4">
        Nenhuma tarefa encontrada para esta categoria.
      </div>
    )
  }

  return (
    <div className="space-y-2 overflow-y-auto pr-1 custom-scroll">
      {filteredTasks.slice(0, 6).map((task) => (
        <div
          key={task.id}
          className="rounded-lg border border-white/5 bg-white/5 px-2 py-1.5 text-[11px] cursor-pointer hover:border-blue-400/40 transition-colors"
          onClick={() => onSelectTask?.(task)}
        >
          <p className="font-semibold text-white/90 truncate">{task.title || 'Sem título'}</p>
          <p className="text-white/50 truncate">{task.description || 'Sem descrição'}</p>
          <div className="flex items-center justify-between mt-1 text-[10px] text-white/40 uppercase tracking-[0.15em]">
            <span>{task.status || 'status'}</span>
            <span>{task.priority || 'prioridade'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const PlaceholderModuleContent = ({ moduleId }) => (
  <div className="h-full flex flex-col items-center justify-center text-center text-[11px] text-gray-400 px-4 gap-1">
    <p>Conteúdo do módulo "{moduleId}" em reconstrução.</p>
    <p>Em breve esta janela exibirá dados reais novamente.</p>
  </div>
)

const DigitalWindowContent = ({ windowData, onChangeStream }) => {
  const currentStream =
    DIGITAL_STREAMS.find((stream) => stream.id === windowData.streamId) || DIGITAL_STREAMS[0]

  const handleIframeError = useCallback(() => {
    onChangeStream?.(null)
  }, [onChangeStream])

  useEffect(() => {
    if (!windowData.streamId && currentStream) {
      onChangeStream?.(currentStream.id)
    }
  }, [windowData.streamId, currentStream, onChangeStream])

  if (!currentStream) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-[11px] text-gray-400 px-4 gap-2">
        <p>Não foi possível carregar o stream ao vivo por aqui.</p>
        <button
          onClick={() => onChangeStream?.(DIGITAL_STREAMS[0]?.id || null)}
          className="px-3 py-1 text-xs rounded-lg border border-white/20 text-white/70 hover:text-white/90"
        >
          Tentar novamente
        </button>
        {DIGITAL_STREAMS[0] && (
          <a
            href={DIGITAL_STREAMS[0].watchUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Abrir no YouTube
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-inner shadow-black/40">
        <iframe
          src={`${currentStream.embedUrl}?autoplay=1&mute=1`}
          title={currentStream.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onError={handleIframeError}
        />
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-white/70 rounded">
          Live
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[11px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold uppercase tracking-[0.2em]">
              {currentStream.name}
            </p>
            <p className="text-white/60">{currentStream.description}</p>
          </div>
          <a
            href={currentStream.watchUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300"
          >
            Abrir
          </a>
        </div>
        <div className="flex gap-1 flex-wrap">
          {DIGITAL_STREAMS.map((stream) => (
            <button
              key={stream.id}
              onClick={() => onChangeStream?.(stream.id)}
              className={`px-2 py-1 text-xs rounded-lg border ${
                stream.id === currentStream.id
                  ? 'border-blue-400/60 text-blue-300 bg-blue-400/10'
                  : 'border-white/10 text-white/60 hover:border-white/30'
              } transition-colors`}
            >
              {stream.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
