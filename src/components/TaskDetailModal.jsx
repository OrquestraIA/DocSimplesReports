import { useState, useRef, useEffect } from 'react'
import { 
  X, 
  Send, 
  Image, 
  Video,
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight,
  Clock,
  User,
  Calendar,
  Tag,
  MessageSquare,
  Paperclip,
  Play,
  Pause,
  ChevronRight,
  Edit3,
  Save,
  Smile,
  ThumbsUp,
  ExternalLink,
  Flag,
  Trash2,
  AtSign
} from 'lucide-react'
import { uploadScreenshot } from '../firebase'

const WORKFLOW_ACTIONS = {
  devs: {
    corrigido: {
      label: 'Marcar como Corrigido',
      icon: CheckCircle2,
      color: 'green',
      nextSpace: 'qa',
      nextStatus: { statusQADev: 'Para_Teste_QA' },
      notification: 'Correção enviada para QA testar'
    },
    em_desenvolvimento: {
      label: 'Em Desenvolvimento',
      icon: Play,
      color: 'blue',
      nextStatus: { statusDev: 'PARCIAL' },
      notification: null
    }
  },
  qa: {
    aprovado: {
      label: 'Aprovar e Enviar para Operação',
      icon: CheckCircle2,
      color: 'green',
      nextSpace: 'operacao',
      nextStatus: { statusQADev: 'Aprovado', statusHomolog: 'Para_Teste_Homolog' },
      notification: 'QA aprovou - enviado para Operação'
    },
    reprovado: {
      label: 'Reprovar e Devolver para Dev',
      icon: AlertCircle,
      color: 'red',
      nextSpace: 'devs',
      nextStatus: { statusQADev: 'Reprovado', statusDev: 'NAO_IMPLEMENTADO' },
      notification: 'QA reprovou - devolvido para Dev'
    },
    em_teste: {
      label: 'Iniciar Teste',
      icon: Play,
      color: 'blue',
      nextStatus: { statusQADev: 'Em Teste' },
      notification: null
    }
  },
  operacao: {
    aprovado: {
      label: 'Aprovar Homologação',
      icon: CheckCircle2,
      color: 'green',
      nextStatus: { statusHomolog: 'Aprovado' },
      notification: 'Homologação aprovada!'
    },
    reprovado: {
      label: 'Reprovar e Devolver para QA',
      icon: AlertCircle,
      color: 'red',
      nextSpace: 'qa',
      nextStatus: { statusHomolog: 'Reprovado', statusQADev: 'Para_Reteste_QA' },
      notification: 'Operação reprovou - devolvido para QA'
    },
    em_teste: {
      label: 'Iniciar Teste',
      icon: Play,
      color: 'blue',
      nextStatus: { statusHomolog: 'Em Teste' },
      notification: null
    }
  }
}

const colorClasses = {
  green: 'bg-green-500 hover:bg-green-600 text-white',
  red: 'bg-red-500 hover:bg-red-600 text-white',
  orange: 'bg-orange-500 hover:bg-orange-600 text-white',
  blue: 'bg-blue-500 hover:bg-blue-600 text-white',
  gray: 'bg-gray-500 hover:bg-gray-600 text-white'
}

const isVideo = (media) => {
  if (!media) return false
  if (media.type === 'video') return true
  const url = media.url || ''
  return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || url.includes('.avi')
}

export default function TaskDetailModal({
  isOpen,
  onClose,
  requirement,
  workspace,
  users = [],
  currentUser,
  onUpdateRequirement,
  onAddNotification,
  sprints = [],
  onAssignToSprint
}) {
  const [activeTab, setActiveTab] = useState('details')
  const [newComment, setNewComment] = useState('')
  const [commentType, setCommentType] = useState('resposta')
  const [commentMedia, setCommentMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const [executingAction, setExecutingAction] = useState(null)
  const [openReactionPicker, setOpenReactionPicker] = useState(null)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  if (!isOpen || !requirement) return null

  // Filtrar usuários para menções
  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(mentionFilter.toLowerCase()) ||
    u.email?.toLowerCase().includes(mentionFilter.toLowerCase())
  ).slice(0, 5)

  // Detectar @ no texto
  const handleCommentChange = (e) => {
    const text = e.target.value
    setNewComment(text)
    
    const cursorPos = e.target.selectionStart
    const textBeforeCursor = text.slice(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1)
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        setMentionFilter(textAfterAt)
        setShowMentions(true)
        return
      }
    }
    setShowMentions(false)
    setMentionFilter('')
  }

  // Inserir menção
  const insertMention = (user) => {
    const cursorPos = textareaRef.current?.selectionStart || newComment.length
    const textBeforeCursor = newComment.slice(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const beforeAt = newComment.slice(0, lastAtIndex)
      const afterCursor = newComment.slice(cursorPos)
      const mentionName = user.name || user.email.split('@')[0]
      setNewComment(`${beforeAt}@${mentionName} ${afterCursor}`)
    }
    setShowMentions(false)
    setMentionFilter('')
    textareaRef.current?.focus()
  }

  const comments = requirement.comments || []
  const evidences = requirement.evidences || []
  const workspaceActions = WORKFLOW_ACTIONS[workspace] || {}

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    try {
      const tempId = `req_${requirement.firebaseId}_${Date.now()}`
      const uploadedFiles = []
      
      for (const file of files) {
        const isVideoFile = file.type.startsWith('video/')
        // Usar Firebase Storage para upload real
        const uploaded = await uploadScreenshot(file, tempId)
        uploadedFiles.push({
          url: uploaded.url,
          name: file.name,
          type: isVideoFile ? 'video' : 'image',
          uploadedAt: new Date().toISOString()
        })
      }
      setCommentMedia(prev => [...prev, ...uploadedFiles])
    } catch (error) {
      console.error('Erro no upload:', error)
      alert('Erro ao fazer upload do arquivo. Tente novamente.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeMedia = (index) => {
    setCommentMedia(prev => prev.filter((_, i) => i !== index))
  }

  const handleSendComment = async () => {
    if (!newComment.trim() && commentMedia.length === 0) return

    setSending(true)
    try {
      const comment = {
        id: `comment_${Date.now()}`,
        text: newComment,
        type: commentType,
        author: currentUser?.email || currentUser?.name || 'Usuário',
        authorId: currentUser?.uid || currentUser?.id,
        createdAt: new Date().toISOString(),
        media: commentMedia,
        reactions: {}
      }

      const existingComments = requirement.comments || []
      await onUpdateRequirement(requirement.firebaseId, {
        comments: [...existingComments, comment]
      })

      setNewComment('')
      setCommentMedia([])
      setCommentType('resposta')
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
    } finally {
      setSending(false)
    }
  }

  const handleWorkflowAction = async (actionKey) => {
    const action = workspaceActions[actionKey]
    if (!action) return

    setExecutingAction(actionKey)
    try {
      const updateData = { ...action.nextStatus }
      
      const historyEntry = {
        action: actionKey,
        from: workspace,
        to: action.nextSpace || workspace,
        by: currentUser?.email || 'Usuário',
        at: new Date().toISOString(),
        comment: `Ação: ${action.label}`
      }
      
      const existingHistory = requirement.workflowHistory || []
      updateData.workflowHistory = [...existingHistory, historyEntry]
      updateData.lastUpdatedBy = currentUser?.email
      updateData.lastUpdatedAt = new Date().toISOString()

      await onUpdateRequirement(requirement.firebaseId, updateData)

      if (action.notification && onAddNotification) {
        await onAddNotification({
          type: 'workflow',
          title: action.label,
          message: `${requirement.id}: ${action.notification}`,
          requirementId: requirement.firebaseId,
          read: false
        })
      }

      onClose()
    } catch (error) {
      console.error('Erro ao executar ação:', error)
    } finally {
      setExecutingAction(null)
    }
  }

  const handleReaction = async (commentId, emoji) => {
    try {
      const userId = currentUser?.uid || currentUser?.id || 'anonymous'
      const existingComments = [...(requirement.comments || [])]
      const commentIndex = existingComments.findIndex(c => c.id === commentId)
      
      if (commentIndex === -1) return

      const comment = { ...existingComments[commentIndex] }
      const reactions = { ...(comment.reactions || {}) }
      
      if (!reactions[emoji]) {
        reactions[emoji] = []
      }
      
      const userIndex = reactions[emoji].indexOf(userId)
      if (userIndex === -1) {
        reactions[emoji].push(userId)
      } else {
        reactions[emoji].splice(userIndex, 1)
        if (reactions[emoji].length === 0) {
          delete reactions[emoji]
        }
      }
      
      comment.reactions = reactions
      existingComments[commentIndex] = comment
      
      await onUpdateRequirement(requirement.firebaseId, { comments: existingComments })
      setOpenReactionPicker(null)
    } catch (error) {
      console.error('Erro ao adicionar reação:', error)
    }
  }

  const getStatusBadge = () => {
    const status = workspace === 'operacao' ? requirement.statusHomolog :
                   workspace === 'devs' ? requirement.statusDev :
                   requirement.statusQADev

    const statusColors = {
      'Aprovado': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'IMPLEMENTADO': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Reprovado': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'NAO_IMPLEMENTADO': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      'PARCIAL': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      'Em Teste': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Para_Teste_QA': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      'Para_Teste_Homolog': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      'Para_Reteste_QA': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'Para_Reteste_Homolog': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'Pendente': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Bloqueado': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
        {status || 'Não definido'}
      </span>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                {requirement.id}
              </span>
              {getStatusBadge()}
              {(requirement.obrigatorio === 'SIM' || requirement.obrigatorio === 'Sim') && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">
                  Obrigatório
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
              {requirement.descricao || 'Sem descrição'}
            </h2>
            {requirement.modulo && (
              <span className="inline-block mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                {requirement.modulo}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-slate-700 px-4">
          {[
            { id: 'details', label: 'Detalhes', icon: Tag },
            { id: 'comments', label: `Comentários (${comments.length})`, icon: MessageSquare },
            { id: 'evidences', label: `Evidências (${evidences.length})`, icon: Paperclip },
            { id: 'history', label: 'Histórico', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Responsável</div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-800 dark:text-white">{requirement.responsavel || '-'}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Módulo</div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-800 dark:text-white">{requirement.modulo || '-'}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Versão Dev</div>
                  <span className="text-sm text-gray-800 dark:text-white">{requirement.versaoDev || '-'}</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Versão Homolog</div>
                  <span className="text-sm text-gray-800 dark:text-white">{requirement.versaoHomolog || '-'}</span>
                </div>
              </div>

              {/* Observação */}
              {requirement.observacao && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium mb-1">Observação</div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">{requirement.observacao}</p>
                </div>
              )}

              {/* Status em todos os espaços */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status nos Espaços</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className={`rounded-lg p-3 border ${workspace === 'devs' ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-600'}`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Desenvolvimento</div>
                    <span className={`text-sm font-medium ${
                      requirement.statusDev === 'IMPLEMENTADO' ? 'text-green-600' :
                      requirement.statusDev === 'PARCIAL' ? 'text-orange-600' :
                      'text-gray-600 dark:text-gray-300'
                    }`}>
                      {requirement.statusDev || 'Não definido'}
                    </span>
                  </div>
                  <div className={`rounded-lg p-3 border ${workspace === 'qa' ? 'border-green-300 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-slate-600'}`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">QA</div>
                    <span className={`text-sm font-medium ${
                      requirement.statusQADev === 'Aprovado' ? 'text-green-600' :
                      requirement.statusQADev === 'Reprovado' ? 'text-red-600' :
                      'text-gray-600 dark:text-gray-300'
                    }`}>
                      {requirement.statusQADev || 'Não definido'}
                    </span>
                  </div>
                  <div className={`rounded-lg p-3 border ${workspace === 'operacao' ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-slate-600'}`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Operação</div>
                    <span className={`text-sm font-medium ${
                      requirement.statusHomolog === 'Aprovado' ? 'text-green-600' :
                      requirement.statusHomolog === 'Reprovado' ? 'text-red-600' :
                      'text-gray-600 dark:text-gray-300'
                    }`}>
                      {requirement.statusHomolog || 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              {/* Lista de comentários */}
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum comentário ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={comment.id || index} className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {(comment.author || 'U')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">{comment.author}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              {new Date(comment.createdAt).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        {comment.type && comment.type !== 'resposta' && (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            comment.type === 'solicitar_reteste' ? 'bg-orange-100 text-orange-700' :
                            comment.type === 'aprovado_reteste' ? 'bg-green-100 text-green-700' :
                            comment.type === 'reprovado_reteste' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {comment.type === 'solicitar_reteste' ? 'Reteste' :
                             comment.type === 'aprovado_reteste' ? 'Aprovado' :
                             comment.type === 'reprovado_reteste' ? 'Reprovado' :
                             comment.type}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {comment.text}
                      </p>

                      {/* Media */}
                      {comment.media && comment.media.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {comment.media.map((media, i) => (
                            <div key={i} className="relative">
                              {isVideo(media) ? (
                                <video
                                  src={media.url}
                                  className="w-32 h-24 object-cover rounded-lg"
                                  controls
                                />
                              ) : (
                                <img
                                  src={media.url}
                                  alt={media.name}
                                  className="w-32 h-24 object-cover rounded-lg cursor-pointer hover:opacity-90"
                                  onClick={() => window.open(media.url, '_blank')}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reactions */}
                      <div className="mt-3 flex items-center gap-2">
                        {comment.reactions && Object.entries(comment.reactions).map(([emoji, users]) => (
                          users.length > 0 && (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(comment.id, emoji)}
                              className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                                users.includes(currentUser?.uid || currentUser?.id)
                                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                  : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300'
                              }`}
                            >
                              <span>{emoji}</span>
                              <span>{users.length}</span>
                            </button>
                          )
                        ))}
                        <div className="relative">
                          <button
                            onClick={() => setOpenReactionPicker(openReactionPicker === comment.id ? null : comment.id)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400"
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                          {openReactionPicker === comment.id && (
                            <div className="absolute bottom-full left-0 mb-1 z-10">
                              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 p-2 flex gap-1">
                                {['👍', '👎', '❤️', '🎉', '😄', '🤔', '👀', '🚀'].map(emoji => (
                                  <button
                                    key={emoji}
                                    onClick={() => handleReaction(comment.id, emoji)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded text-lg"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Novo comentário */}
              <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <select
                    value={commentType}
                    onChange={(e) => setCommentType(e.target.value)}
                    className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                  >
                    <option value="resposta">Resposta</option>
                    <option value="feedback">Feedback</option>
                    <option value="solicitar_reteste">Solicitar Reteste</option>
                    <option value="aprovado_reteste">Aprovar Reteste</option>
                    <option value="reprovado_reteste">Reprovar Reteste</option>
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Digite seu comentário... Use @ para mencionar alguém"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Dropdown de menções */}
                  {showMentions && filteredUsers.length > 0 && (
                    <div className="absolute bottom-full left-0 mb-1 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 py-1 z-50 max-h-48 overflow-y-auto">
                      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-700">
                        Mencionar usuário
                      </div>
                      {filteredUsers.map(user => (
                        <button
                          key={user.id || user.email}
                          onClick={() => insertMention(user)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {(user.name || user.email)[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                              {user.name || user.email.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Media preview */}
                {commentMedia.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {commentMedia.map((media, index) => (
                      <div key={index} className="relative">
                        {isVideo(media) ? (
                          <video src={media.url} className="w-20 h-16 object-cover rounded" />
                        ) : (
                          <img src={media.url} alt="" className="w-20 h-16 object-cover rounded" />
                        )}
                        <button
                          onClick={() => removeMedia(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400"
                      title="Anexar imagem ou vídeo"
                    >
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Image className="w-5 h-5" />}
                    </button>
                  </div>
                  <button
                    onClick={handleSendComment}
                    disabled={sending || (!newComment.trim() && commentMedia.length === 0)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidences' && (
            <div>
              {evidences.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Paperclip className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma evidência anexada</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {evidences.map((evidence, index) => (
                    <div key={index} className="relative group">
                      {isVideo(evidence) ? (
                        <video
                          src={evidence.url}
                          className="w-full h-32 object-cover rounded-lg"
                          controls
                        />
                      ) : (
                        <img
                          src={evidence.url}
                          alt={evidence.name}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer"
                          onClick={() => window.open(evidence.url, '_blank')}
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg truncate">
                        {evidence.name || 'Evidência'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              {(!requirement.workflowHistory || requirement.workflowHistory.length === 0) ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum histórico de workflow</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requirement.workflowHistory.map((entry, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-gray-800 dark:text-white capitalize">{entry.from}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-800 dark:text-white capitalize">{entry.to}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{entry.comment}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <span>{entry.by}</span>
                          <span>•</span>
                          <span>{new Date(entry.at).toLocaleString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Workflow Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Última atualização: {requirement.lastUpdatedAt ? new Date(requirement.lastUpdatedAt).toLocaleString('pt-BR') : '-'}
              {requirement.lastUpdatedBy && ` por ${requirement.lastUpdatedBy}`}
            </div>
            <div className="flex items-center gap-2">
              {Object.entries(workspaceActions).map(([key, action]) => {
                const Icon = action.icon
                return (
                  <button
                    key={key}
                    onClick={() => handleWorkflowAction(key)}
                    disabled={executingAction !== null}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${colorClasses[action.color]} disabled:opacity-50`}
                  >
                    {executingAction === key ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    {action.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
