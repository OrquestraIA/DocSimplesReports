import { useState, useEffect, useRef } from 'react'
import {
  XCircle, Bug, Lightbulb, FileText, User, Clock, Play,
  Edit2, Upload, Smile, ExternalLink, UserCheck, ArrowLeft
} from 'lucide-react'
import { useToast } from './Toast'
import MediaViewer from './MediaViewer'
import CommentsSection from './CommentsSection'
import UploadLoading from './UploadLoading'
import ReactionPicker, { ReactionDisplay } from './ReactionPicker'
import { renderTextWithMentions } from './MentionInput'

const TASK_TYPES = {
  'bug': { bg: 'bg-red-100', text: 'text-red-700', label: 'Bug', icon: Bug },
  'business_rule': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Regra de Negócio', icon: FileText },
  'improvement': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Melhoria', icon: Lightbulb }
}

const TASK_STATUS = {
  'pending': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Pendente' },
  'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Andamento' },
  'in_review': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Em Revisão' },
  'done': { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído' }
}

const PRIORITY_COLORS = {
  'low': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Baixa' },
  'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Média' },
  'high': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Alta' },
  'critical': { bg: 'bg-red-100', text: 'text-red-700', label: 'Crítica' }
}

export default function TaskViewModal({
  task,
  users,
  onClose,
  onEdit,
  onViewMedia,
  onAddComment,
  onToggleReaction,
  onRequestRetest,
  onUploadEvidence,
  onDeleteEvidence,
  currentUser,
  onAddNotification,
  onUpdateDocumentStatus,
  onUpdateTask,
  requirements = [],
  testDocuments = [],
  onUpdateRequirement
}) {
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [qaAction, setQaAction] = useState(null) // 'distribuir' | 'devolver' | null
  const [selectedDev, setSelectedDev] = useState('')
  const [devolveReason, setDevolveReason] = useState('')
  const [uploading, setUploading] = useState(false)
  const [localSourceComments, setLocalSourceComments] = useState(task.sourceData?.comments || [])
  const [localDocumentStatus, setLocalDocumentStatus] = useState(task.sourceData?.status || 'pendente')
  const [localDevEvidences, setLocalDevEvidences] = useState(task.devEvidences || [])
  const [localComments, setLocalComments] = useState(task.comments || [])
  const [isDragging, setIsDragging] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const [openReactionPicker, setOpenReactionPicker] = useState(null)
  const textareaRef = useRef(null)
  const toast = useToast()
  
  useEffect(() => {
    setLocalSourceComments(task.sourceData?.comments || [])
    setLocalDocumentStatus(task.sourceData?.status || 'pendente')
    setLocalDevEvidences(task.devEvidences || [])
    setLocalComments(task.comments || [])
  }, [task.sourceData?.comments, task.sourceData?.status, task.devEvidences, task.comments])
  
  // Handler para Ctrl+V (colar imagem)
  useEffect(() => {
    const handlePaste = async (e) => {
      if (!onUploadEvidence) return
      const items = e.clipboardData?.items
      if (!items) return
      
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          const file = item.getAsFile()
          if (file) {
            setUploading(true)
            try {
              const newEvidence = await onUploadEvidence(task.id, file)
              if (newEvidence) {
                setLocalDevEvidences(prev => [...prev, newEvidence])
              }
              toast.success('Evidência anexada com sucesso!')
            } catch (error) {
              console.error('Erro ao colar imagem:', error)
              toast.error('Erro ao colar imagem. Tente novamente.')
            } finally {
              setUploading(false)
            }
          }
          break
        }
      }
    }
    
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [task.id, onUploadEvidence, toast])
  
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  
  const assigneeUser = users.find(u => u.id === task.assignee)
  const screenshots = task.screenshots || task.sourceData?.screenshots || []
  
  // Buscar attachments em múltiplos locais (fallback para tarefas antigas)
  let attachments = task.attachments || task.sourceData?.evidences || []
  
  // Se ainda não encontrou, tentar extrair de failedSteps
  if (attachments.length === 0 && task.sourceData?.failedSteps) {
    const evidencesFromSteps = []
    task.sourceData.failedSteps.forEach((step, index) => {
      if (step.evidences && step.evidences.length > 0) {
        step.evidences.forEach(evidence => {
          evidencesFromSteps.push({
            ...evidence,
            stepIndex: index,
            stepAction: step.action
          })
        })
      }
    })
    attachments = evidencesFromSteps
  }
  
  const sourceData = task.sourceData || {}

  // Filtrar usuários para menções
  const filteredUsers = users.filter(u => 
    u.mentionName?.toLowerCase().includes(mentionFilter.toLowerCase()) ||
    u.name?.toLowerCase().includes(mentionFilter.toLowerCase()) ||
    u.email?.toLowerCase().includes(mentionFilter.toLowerCase())
  ).slice(0, 5)

  // Handler para mudança no textarea de comentário
  const handleCommentChange = (e) => {
    const text = e.target.value
    setNewComment(text)
    
    // Detectar @ para mostrar menções
    const lastAtIndex = text.lastIndexOf('@')
    if (lastAtIndex !== -1) {
      const textAfterAt = text.slice(lastAtIndex + 1)
      if (!textAfterAt.includes(' ')) {
        setMentionFilter(textAfterAt)
        setShowMentions(true)
      } else {
        setShowMentions(false)
      }
    } else {
      setShowMentions(false)
    }
  }

  // Inserir menção no texto
  const insertMention = (user) => {
    const lastAtIndex = newComment.lastIndexOf('@')
    const textBefore = newComment.slice(0, lastAtIndex)
    const mentionValue = user.mentionName || user.name?.replace(/\s+/g, '').toLowerCase() || user.email?.split('@')[0] || 'usuario'
    setNewComment(`${textBefore}@${mentionValue} `)
    setShowMentions(false)
    textareaRef.current?.focus()
  }

  // Handler para reações
  const handleReaction = async (commentIndex, reaction) => {
    if (!onToggleReaction || !currentUser) return
    try {
      await onToggleReaction(task.id, commentIndex, reaction, currentUser.id || currentUser.uid, currentUser.name || currentUser.email)
      // Atualizar estado local
      setLocalComments(prev => prev.map((c, idx) => {
        if (idx !== commentIndex) return c
        const reactions = c.reactions || []
        const existingIndex = reactions.findIndex(
          r => r.type === reaction.type && r.value === reaction.value && r.userId === (currentUser.id || currentUser.uid)
        )
        let newReactions
        if (existingIndex >= 0) {
          newReactions = reactions.filter((_, i) => i !== existingIndex)
        } else {
          newReactions = [...reactions, { 
            ...reaction, 
            userId: currentUser.id || currentUser.uid, 
            userName: currentUser.name || currentUser.email,
            createdAt: new Date().toISOString() 
          }]
        }
        return { ...c, reactions: newReactions }
      }))
    } catch (error) {
      console.error('Erro ao reagir:', error)
      toast.error('Erro ao adicionar reação.')
    }
    setOpenReactionPicker(null)
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || !onAddComment) return
    setSubmitting(true)
    try {
      const newCommentData = {
        id: `comment_${Date.now()}`,
        text: newComment.trim(),
        author: currentUser?.name || currentUser?.email || 'Dev',
        authorId: currentUser?.id || currentUser?.uid,
        createdAt: new Date().toISOString(),
        reactions: []
      }
      await onAddComment(task.id, newCommentData)
      setLocalComments(prev => [...prev, newCommentData])
      setNewComment('')
      toast.success('Comentário adicionado!')
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
      toast.error('Erro ao adicionar comentário. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUploadEvidence = async (e) => {
    const files = Array.from(e.target.files || []).filter(f => {
      const isImage = f.type.startsWith('image/')
      const isVideo = f.type.startsWith('video/') || 
        f.name.endsWith('.mp4') || f.name.endsWith('.webm') || 
        f.name.endsWith('.mov') || f.name.endsWith('.avi')
      return isImage || isVideo
    })
    if (files.length === 0 || !onUploadEvidence) {
      if (e.target.files?.length > 0) {
        toast.warning('Formato de arquivo não suportado. Use imagens ou vídeos.')
      }
      return
    }
    
    setUploading(true)
    try {
      const newEvidences = []
      for (const file of files) {
        const newEvidence = await onUploadEvidence(task.id, file)
        if (newEvidence) {
          newEvidences.push(newEvidence)
        }
      }
      if (newEvidences.length > 0) {
        setLocalDevEvidences(prev => [...prev, ...newEvidences])
      }
      toast.success(`${files.length} evidência(s) anexada(s) com sucesso!`)
    } catch (error) {
      console.error('Erro ao enviar evidência:', error)
      toast.error('Erro ao enviar evidência. Tente novamente.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDistribuirDev = async () => {
    if (!selectedDev || !onUpdateTask) return
    const dev = devUsers.find(u => u.id === selectedDev)
    setSubmitting(true)
    try {
      await onUpdateTask(task.id, { workspace: 'devs', assignee: selectedDev, status: 'pending' })
      if (onAddComment) {
        await onAddComment(task.id, {
          text: `QA distribuiu tarefa para ${dev?.name || dev?.email || 'Dev'}.`,
          type: 'distribuido_qa',
          author: currentUser?.name || currentUser?.email,
          authorId: currentUser?.id || currentUser?.uid,
          authorEmail: currentUser?.email || null,
          createdAt: new Date().toISOString()
        })
      }
      toast.success(`Tarefa distribuída para ${dev?.name || dev?.email}!`)
      onClose()
    } catch (error) {
      console.error('Erro ao distribuir tarefa:', error)
      toast.error('Erro ao distribuir tarefa. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDevolverOperacao = async () => {
    if (!devolveReason.trim() || !onUpdateTask) return
    setSubmitting(true)
    try {
      await onUpdateTask(task.id, { workspace: 'operacao', reviewStage: 'nao_pertinente', status: 'pending' })
      if (onAddComment) {
        await onAddComment(task.id, {
          text: `QA devolveu para Operação (não pertinente): ${devolveReason.trim()}`,
          type: 'devolvido_operacao',
          author: currentUser?.name || currentUser?.email,
          authorId: currentUser?.id || currentUser?.uid,
          authorEmail: currentUser?.email || null,
          createdAt: new Date().toISOString()
        })
      }
      toast.success('Tarefa devolvida para Operação.')
      onClose()
    } catch (error) {
      console.error('Erro ao devolver tarefa:', error)
      toast.error('Erro ao devolver tarefa. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRequestRetest = async () => {
    if (!onRequestRetest) return
    if (!window.confirm('Deseja solicitar reteste? O QA será notificado para validar a correção.')) return

    setSubmitting(true)
    try {
      await onRequestRetest(task)
      toast.success('Reteste solicitado com sucesso! O QA será notificado.')
      onClose()
    } catch (error) {
      console.error('Erro ao solicitar reteste:', error)
      toast.error('Erro ao solicitar reteste. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateStatus = async (newStatus, reviewStage = null) => {
    if (!onUpdateTask) return
    setSubmitting(true)
    try {
      const updates = { status: newStatus }
      if (reviewStage) updates.reviewStage = reviewStage
      else updates.reviewStage = null
      await onUpdateTask(task.id, updates)

      if (onAddNotification) {
        const author = currentUser?.name || currentUser?.email || 'Usuário'
        if (newStatus === 'in_review' && reviewStage === 'qa') {
          await onAddNotification({
            type: 'nova_tarefa',
            message: `${author} enviou para revisão do QA: "${task.title}"`,
            author,
            authorEmail: currentUser?.email || null,
            targetRole: 'qa'
          })
        } else if (newStatus === 'in_review' && reviewStage === 'operacao') {
          await onAddNotification({
            type: 'aprovado_reteste',
            message: `QA aprovou e enviou para Operação: "${task.title}"`,
            author,
            authorEmail: currentUser?.email || null,
            targetRole: 'operacao'
          })
        } else if (newStatus === 'done') {
          const assigneeUser = users.find(u => u.id === task.assignee)
          if (assigneeUser) {
            await onAddNotification({
              type: 'aprovado_reteste',
              message: `Tarefa aprovada por ${author}: "${task.title}"`,
              author,
              authorEmail: currentUser?.email || null,
              targetUserId: assigneeUser.id,
              targetEmail: assigneeUser.email
            })
          }
        } else if (newStatus === 'in_progress') {
          const assigneeUser = users.find(u => u.id === task.assignee)
          if (assigneeUser) {
            await onAddNotification({
              type: 'reprovado_reteste',
              message: `Tarefa reprovada por ${author}: "${task.title}"`,
              author,
              authorEmail: currentUser?.email || null,
              targetUserId: assigneeUser.id,
              targetEmail: assigneeUser.email
            })
          }
        }
      }
      toast.success(
        reviewStage === 'qa' ? 'Enviado para o QA!' :
        reviewStage === 'operacao' ? 'Aprovado pelo QA — enviado para Operação!' :
        newStatus === 'done' ? 'Tarefa aprovada e encerrada!' :
        'Tarefa reprovada — devolvida ao desenvolvedor!'
      )
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const role = currentUser?.role?.toLowerCase()
  const isStandaloneTask = !task.sourceType || task.sourceType !== 'test_document'
  const isDev = role === 'desenvolvedor' || role === 'admin'
  const isQA = role === 'qa' || role === 'admin'
  const isOp = role === 'operacao' || role === 'admin'
  const showSendToQA = isStandaloneTask && isDev &&
    task.workspace !== 'qa' &&
    (task.status === 'pending' || task.status === 'in_progress')
  const showQAActions = isStandaloneTask && isQA &&
    task.status === 'in_review' && task.reviewStage === 'qa'
  const showOpActions = isStandaloneTask && isOp &&
    task.status === 'in_review' && task.reviewStage === 'operacao'
  // Triagem QA: qualquer tarefa no workspace QA aguardando distribuição
  const showQATriageActions = isQA &&
    task.workspace === 'qa' &&
    task.status === 'pending'
  const devUsers = (users || []).filter(u => u.role === 'desenvolvedor')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
                <TypeIcon className={`w-6 h-6 ${typeStyle.text}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {task.taskCode && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 select-all">
                      {task.taskCode}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
                    {typeStyle.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                    {priorityStyle.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.label}
                  </span>
                  {task.reviewStage === 'para_correcao' && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      ⚠️ Para Correção
                    </span>
                  )}
                  {sourceData.jiraKey && (
                    <a 
                      href={sourceData.jiraUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {sourceData.jiraKey}
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          {task.description && (
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Descrição Completa</label>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg text-sm">
                {task.description}
              </div>
            </div>
          )}

          {/* Passos para Reproduzir */}
          {task.steps && (
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                📋 Passos para Reproduzir
              </label>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-sm border border-amber-200 dark:border-amber-800">
                {task.steps}
              </div>
            </div>
          )}

          {/* Resultado Esperado e Atual */}
          {(task.expectedResult || task.actualResult) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.expectedResult && (
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                    ✅ {task.type === 'bug' ? 'Resultado Esperado' : 'Comportamento Esperado'}
                  </label>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm border border-green-200 dark:border-green-800">
                    {task.expectedResult}
                  </div>
                </div>
              )}
              {task.actualResult && (
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                    ❌ {task.type === 'bug' ? 'Resultado Atual' : 'Comportamento Atual'}
                  </label>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800">
                    {task.actualResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Meta info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            {assigneeUser && (
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Responsável</label>
                <p className="text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{assigneeUser.displayName || assigneeUser.name || assigneeUser.email}</span>
                </p>
              </div>
            )}
            {task.createdBy && (
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Criado por</label>
                <p className="text-gray-900 dark:text-white text-sm truncate">{task.createdBy}</p>
              </div>
            )}
            {task.createdAt && (
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Criado em</label>
                <p className="text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
            {task.module && (
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Módulo</label>
                <p className="text-gray-900 dark:text-white text-sm truncate">{task.module}</p>
              </div>
            )}
          </div>

          {/* Screenshots/Evidences */}
          {screenshots.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                📸 Evidências ({screenshots.length})
              </label>
              <div className="flex flex-wrap gap-3">
                {screenshots.map((ss, index) => (
                  <button
                    key={index}
                    onClick={() => onViewMedia(screenshots.map(s => ({ 
                      url: s.url, 
                      type: s.type || (s.url?.includes('.mp4') || s.url?.includes('.webm') || s.url?.includes('.mov') ? 'video' : 'image'), 
                      name: s.name 
                    })), index)}
                    className="relative group cursor-pointer"
                  >
                    {ss.type === 'video' || ss.url?.includes('.mp4') || ss.url?.includes('.webm') ? (
                      <div className="relative w-24 h-24">
                        <video src={ss.url} className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-slate-600" />
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <span className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">Vídeo</span>
                      </div>
                    ) : (
                      <img 
                        src={ss.url} 
                        alt={ss.name || `Evidência ${index + 1}`} 
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-slate-600 hover:opacity-80 transition-opacity" 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Evidências de Falha do Teste */}
          {attachments.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <label className="text-xs font-medium text-red-700 dark:text-red-400 mb-2 block">
                ❌ Evidências da Falha no Teste ({attachments.length})
              </label>
              <div className="flex flex-wrap gap-3">
                {attachments.map((att, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => onViewMedia(attachments.map(a => ({ 
                        url: a.url, 
                        type: a.type || 'image', 
                        name: a.name || `Evidência ${index + 1}`
                      })), index)}
                      className="relative group cursor-pointer"
                    >
                      {att.type === 'video' || att.url?.includes('.mp4') || att.url?.includes('.webm') ? (
                        <div className="relative w-24 h-24">
                          <video src={att.url} className="w-24 h-24 object-cover rounded-lg border-2 border-red-300 dark:border-red-700" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <span className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">Vídeo</span>
                        </div>
                      ) : (
                        <img 
                          src={att.url} 
                          alt={att.name || `Evidência ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-red-300 dark:border-red-700 hover:opacity-80 transition-opacity" 
                        />
                      )}
                    </button>
                    {att.stepAction && (
                      <div className="absolute -bottom-6 left-0 right-0 text-xs text-red-600 dark:text-red-400 truncate text-center" title={att.stepAction}>
                        Passo {att.stepIndex + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seção de Comentários Completa */}
          {task.sourceType === 'test_document' && task.sourceId && (
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                💬 Interações e Comentários
              </label>
              <CommentsSection
                documentId={task.sourceId}
                comments={localSourceComments}
                status={localDocumentStatus}
                users={users}
                currentUser={currentUser}
                onAddNotification={onAddNotification}
                onUpdateStatus={async (newStatus) => {
                  if (onUpdateDocumentStatus) {
                    await onUpdateDocumentStatus(task.sourceId, newStatus)
                    setLocalDocumentStatus(newStatus)
                  }
                }}
                onUpdateRequirementStatus={async (newStatusHomolog) => {
                  const testDoc = testDocuments.find(d => d.id === task.sourceId)
                  if (testDoc?.requirement && onUpdateRequirement && requirements.length > 0) {
                    const relatedReq = requirements.find(r => r.id === testDoc.requirement)
                    if (relatedReq?.firebaseId) {
                      await onUpdateRequirement(relatedReq.firebaseId, { statusHomolog: newStatusHomolog })
                    }
                  }
                }}
                onCommentAdded={(comment) => {
                  setLocalSourceComments(prev => [...prev, comment])
                }}
                onCommentEdited={(commentId, updatedData) => {
                  setLocalSourceComments(prev => prev.map(c => 
                    c.id === commentId ? { ...c, ...updatedData } : c
                  ))
                }}
                onReactionToggled={(commentId, reaction, userId, userName) => {
                  setLocalSourceComments(prev => prev.map(c => {
                    if (c.id !== commentId) return c
                    const reactions = c.reactions || []
                    const existingIndex = reactions.findIndex(
                      r => r.type === reaction.type && r.value === reaction.value && r.userId === userId
                    )
                    let newReactions
                    if (existingIndex >= 0) {
                      newReactions = reactions.filter((_, idx) => idx !== existingIndex)
                    } else {
                      newReactions = [...reactions, { ...reaction, userId, userName, createdAt: new Date().toISOString() }]
                    }
                    return { ...c, reactions: newReactions }
                  }))
                }}
              />
            </div>
          )}

          {/* Comentários simples para tarefas sem documento de teste */}
          {(!task.sourceType || task.sourceType !== 'test_document') && (
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                💬 Comentários ({localComments.length})
              </label>
              
              {localComments.length > 0 && (
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {localComments.map((comment, index) => (
                    <div key={comment.id || index} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {renderTextWithMentions(comment.text, users)}
                      </div>
                      
                      {/* Reações */}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {comment.reactions?.length > 0 && (
                          <ReactionDisplay 
                            reactions={comment.reactions} 
                            currentUserId={currentUser?.id || currentUser?.uid}
                            onToggle={(reaction) => handleReaction(index, reaction)}
                          />
                        )}
                        
                        {/* Botão para adicionar reação */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenReactionPicker(openReactionPicker === index ? null : index)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="Adicionar reação"
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                          {openReactionPicker === index && (
                            <div className="absolute bottom-full left-0 mb-1 z-50">
                              <ReactionPicker 
                                onSelect={(reaction) => handleReaction(index, reaction)}
                                onClose={() => setOpenReactionPicker(null)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {onAddComment && task.status !== 'done' && (
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Adicionar comentário... Use @ para mencionar"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && !showMentions) {
                            e.preventDefault()
                            handleAddComment()
                          }
                        }}
                      />
                      
                      {/* Lista de menções */}
                      {showMentions && filteredUsers.length > 0 && (
                        <div className="absolute bottom-full left-0 mb-1 w-full bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
                          {filteredUsers.map(user => (
                            <button
                              key={user.id}
                              onClick={() => insertMention(user)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900 dark:text-white">{user.name || user.email}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || submitting}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed self-end"
                    >
                      {submitting ? '...' : 'Enviar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Evidências da Correção */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={async (e) => {
              e.preventDefault()
              setIsDragging(false)
              if (!onUploadEvidence) return
              const files = Array.from(e.dataTransfer.files).filter(f => {
                const isImage = f.type.startsWith('image/')
                const isVideo = f.type.startsWith('video/') || 
                  f.name.endsWith('.mp4') || f.name.endsWith('.webm') || 
                  f.name.endsWith('.mov') || f.name.endsWith('.avi')
                return isImage || isVideo
              })
              if (files.length === 0) {
                toast.warning('Formato de arquivo não suportado. Use imagens ou vídeos.')
                return
              }
              setUploading(true)
              try {
                const newEvidences = []
                for (const file of files) {
                  const newEvidence = await onUploadEvidence(task.id, file)
                  if (newEvidence) {
                    newEvidences.push(newEvidence)
                  }
                }
                if (newEvidences.length > 0) {
                  setLocalDevEvidences(prev => [...prev, ...newEvidences])
                }
                toast.success(`${files.length} evidência(s) anexada(s) com sucesso!`)
              } catch (error) {
                console.error('Erro ao enviar evidência:', error)
                toast.error('Erro ao enviar evidência. Tente novamente.')
              } finally {
                setUploading(false)
              }
            }}
            className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
              isDragging 
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50'
            }`}
          >
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
              🔧 Evidências da Correção ({localDevEvidences.length})
            </label>
            
            {localDevEvidences.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {localDevEvidences.map((ev, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => onViewMedia(localDevEvidences.map(e => ({ 
                        url: e.url, 
                        type: e.type || 'image', 
                        name: e.name 
                      })), index)}
                      className="cursor-pointer"
                    >
                      {ev.type === 'video' ? (
                        <div className="relative w-24 h-24">
                          <video src={ev.url} className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-slate-600" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={ev.url} 
                          alt={ev.name || `Evidência ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-slate-600 hover:opacity-80 transition-opacity" 
                        />
                      )}
                    </button>
                    {/* Botão de excluir */}
                    {onDeleteEvidence && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          if (!window.confirm('Deseja excluir esta evidência?')) return
                          try {
                            await onDeleteEvidence(task.id, index)
                            setLocalDevEvidences(prev => prev.filter((_, idx) => idx !== index))
                            toast.success('Evidência excluída com sucesso!')
                          } catch (error) {
                            console.error('Erro ao excluir evidência:', error)
                            toast.error('Erro ao excluir evidência.')
                          }
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        title="Excluir evidência"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Upload de evidência com drag-and-drop */}
            {onUploadEvidence && (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="file"
                  id="evidence-upload"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleUploadEvidence}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <UploadLoading message="Enviando evidência" />
                ) : (
                  <label
                    htmlFor="evidence-upload"
                    className="flex flex-col items-center gap-1 cursor-pointer text-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Arraste arquivos aqui ou <span className="text-blue-500 hover:underline">clique para selecionar</span>
                    </span>
                    <span className="text-xs text-gray-400">
                      Ctrl+V para colar print da área de transferência
                    </span>
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        {showQATriageActions && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/20 space-y-3">
            {qaAction === null && (
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm text-amber-700 dark:text-amber-400 font-medium self-center mr-2">Triagem QA:</span>
                <button onClick={() => setQaAction('distribuir')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <UserCheck className="w-4 h-4" /> Distribuir para Dev
                </button>
                <button onClick={() => setQaAction('devolver')} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Devolver para Operação
                </button>
              </div>
            )}
            {qaAction === 'distribuir' && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selecione o desenvolvedor responsável:</span>
                <div className="flex gap-2 flex-wrap">
                  <select value={selectedDev} onChange={e => setSelectedDev(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm text-gray-900 dark:text-white">
                    <option value="">Selecione um dev...</option>
                    {devUsers.map(u => <option key={u.id} value={u.id}>{u.name || u.email}</option>)}
                  </select>
                  <button onClick={handleDistribuirDev} disabled={!selectedDev || submitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm">{submitting ? 'Enviando...' : 'Confirmar'}</button>
                  <button onClick={() => setQaAction(null)} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 text-sm">Cancelar</button>
                </div>
              </div>
            )}
            {qaAction === 'devolver' && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Motivo da devolução (obrigatório):</span>
                <textarea value={devolveReason} onChange={e => setDevolveReason(e.target.value)} placeholder="Descreva por que esta tarefa não é pertinente..." className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm text-gray-900 dark:text-white resize-none" rows={2} />
                <div className="flex gap-2">
                  <button onClick={handleDevolverOperacao} disabled={!devolveReason.trim() || submitting} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 text-sm">{submitting ? 'Enviando...' : 'Confirmar Devolução'}</button>
                  <button onClick={() => setQaAction(null)} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 text-sm">Cancelar</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 flex justify-between items-center">
          <div className="flex gap-2">
            {onEdit && (
              <button onClick={onEdit} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
            )}
            {showSendToQA && (
              <button
                onClick={() => handleUpdateStatus('in_review', 'qa')}
                disabled={submitting}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                Enviar para QA
              </button>
            )}
            {showQAActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('in_review', 'operacao')}
                  disabled={submitting}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                >
                  Aprovar e Enviar para Operação
                </button>
                <button
                  onClick={() => handleUpdateStatus('in_progress', 'para_correcao')}
                  disabled={submitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reprovar (devolver ao Dev)
                </button>
              </>
            )}
            {showOpActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('done')}
                  disabled={submitting}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleUpdateStatus('in_progress')}
                  disabled={submitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reprovar
                </button>
              </>
            )}
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
