import { useState } from 'react'
import { Send, RefreshCw, ThumbsUp, ThumbsDown, Image, X, Loader2, Edit3, Save, Smile, Trash2 } from 'lucide-react'
import { addCommentToTestDocument, uploadScreenshot, updateCommentInTestDocument, toggleReactionOnComment } from '../firebase'
import ReactionPicker, { ReactionDisplay } from './ReactionPicker'
import MentionInput, { renderTextWithMentions, extractMentions } from './MentionInput'

// Funções auxiliares
const getCommentTypeLabel = (type) => {
  switch(type) {
    case 'solicitar_reteste': return 'Solicitou Reteste'
    case 'aprovado_reteste': return 'Aprovou após Reteste'
    case 'reprovado_reteste': return 'Reprovou Reteste'
    case 'feedback': return 'Feedback'
    default: return 'Resposta'
  }
}

const getCommentTypeColor = (type) => {
  switch(type) {
    case 'solicitar_reteste': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    case 'aprovado_reteste': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'reprovado_reteste': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'feedback': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  }
}

const isVideo = (media) => {
  if (!media) return false
  if (media.type === 'video') return true
  const url = media.url || ''
  return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || url.includes('.avi')
}

export default function CommentsSection({
  documentId,
  comments = [],
  status,
  users = [],
  currentUser,
  onAddNotification,
  onUpdateStatus,
  onCommentAdded
}) {
  const [newComment, setNewComment] = useState('')
  const [commentScreenshots, setCommentScreenshots] = useState([])
  const [sendingComment, setSendingComment] = useState(false)
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')
  const [editingCommentScreenshots, setEditingCommentScreenshots] = useState([])
  const [savingComment, setSavingComment] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [openReactionPicker, setOpenReactionPicker] = useState(null)

  // Processar arquivos de mídia
  const processMediaFiles = async (files, targetSetter = null) => {
    const mediaFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    if (mediaFiles.length === 0) return
    
    setUploadingScreenshot(true)
    try {
      const tempId = `comment_${Date.now()}`
      const uploadPromises = mediaFiles.map(file => uploadScreenshot(file, tempId))
      const uploadedFiles = await Promise.all(uploadPromises)
      
      const filesWithType = uploadedFiles.map((file, index) => ({
        ...file,
        type: mediaFiles[index].type.startsWith('video/') ? 'video' : 'image'
      }))
      
      if (targetSetter) {
        targetSetter(prev => [...prev, ...filesWithType])
      } else {
        setCommentScreenshots(prev => [...prev, ...filesWithType])
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload do arquivo')
    } finally {
      setUploadingScreenshot(false)
    }
  }

  // Handlers de drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      await processMediaFiles(files)
    }
  }

  // Handler de paste (Ctrl+V)
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items
    if (!items) return
    
    const files = []
    for (const item of items) {
      if (item.type.startsWith('image/') || item.type.startsWith('video/')) {
        const file = item.getAsFile()
        if (file) files.push(file)
      }
    }
    
    if (files.length > 0) {
      e.preventDefault()
      await processMediaFiles(files)
    }
  }

  // Upload de screenshot via input
  const handleCommentScreenshot = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    await processMediaFiles(files)
    e.target.value = ''
  }

  const removeCommentScreenshot = (index) => {
    setCommentScreenshots(commentScreenshots.filter((_, i) => i !== index))
  }

  // Função para gerar mensagem padrão da notificação
  const getNotificationMessage = (type) => {
    switch (type) {
      case 'solicitar_reteste':
        return 'Desenvolvedor solicitou reteste'
      case 'aprovado_reteste':
        return 'Reteste aprovado pela Operação'
      case 'reprovado_reteste':
        return 'Reteste reprovado pela Operação'
      default:
        return 'Nova interação no teste'
    }
  }

  // Enviar comentário
  const handleSendComment = async (type) => {
    if (!newComment.trim() && type === 'resposta' && commentScreenshots.length === 0) return
    
    setSendingComment(true)
    try {
      const getAuthorByType = (actionType) => {
        switch (actionType) {
          case 'aprovado_reteste':
          case 'reprovado_reteste':
            return 'Operação'
          case 'resposta':
          case 'solicitar_reteste':
          default:
            return currentUser?.name || currentUser?.email || 'Desenvolvedor'
        }
      }

      const comment = {
        type: type,
        text: newComment.trim(),
        author: getAuthorByType(type),
        screenshots: commentScreenshots
      }
      
      await addCommentToTestDocument(documentId, comment)
      
      // Criar notificação
      const getTargetRole = (actionType) => {
        switch (actionType) {
          case 'aprovado_reteste':
          case 'reprovado_reteste':
            return 'desenvolvedor'
          case 'resposta':
          case 'solicitar_reteste':
          default:
            return 'operacao'
        }
      }

      if (onAddNotification) {
        const notificationData = {
          testId: documentId,
          type: type === 'resposta' ? 'comentario' : type,
          message: newComment.trim() || getNotificationMessage(type),
          author: comment.author,
          authorEmail: currentUser?.email || null,
          targetRole: getTargetRole(type)
        }
        await onAddNotification(notificationData)

        // Notificar usuários mencionados
        const mentionedUsers = extractMentions(newComment, users)
        for (const mentionedUser of mentionedUsers) {
          await onAddNotification({
            testId: documentId,
            type: 'mencao',
            message: `${comment.author} mencionou você: "${newComment.trim().substring(0, 100)}${newComment.length > 100 ? '...' : ''}"`,
            author: comment.author,
            authorEmail: currentUser?.email || null,
            targetUserId: mentionedUser.uid,
            targetEmail: mentionedUser.email
          })
        }
      }
      
      // Atualizar status do documento
      if (type === 'aprovado_reteste' && onUpdateStatus) {
        await onUpdateStatus('aprovado')
      }
      if (type === 'reprovado_reteste' && onUpdateStatus) {
        await onUpdateStatus('reprovado')
      }
      if (type === 'solicitar_reteste' && onUpdateStatus) {
        await onUpdateStatus('em_reteste')
      }
      
      setNewComment('')
      setCommentScreenshots([])
      
      if (onCommentAdded) {
        onCommentAdded(comment)
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
      alert('Erro ao enviar comentário. Tente novamente.')
    } finally {
      setSendingComment(false)
    }
  }

  // Editar comentário
  const startEditComment = (comment) => {
    setEditingCommentId(comment.id)
    setEditingCommentText(comment.text || '')
    setEditingCommentScreenshots(comment.screenshots || [])
  }

  const cancelEditComment = () => {
    setEditingCommentId(null)
    setEditingCommentText('')
    setEditingCommentScreenshots([])
  }

  const saveEditComment = async (commentId) => {
    setSavingComment(true)
    try {
      await updateCommentInTestDocument(documentId, commentId, {
        text: editingCommentText,
        screenshots: editingCommentScreenshots,
        editedAt: new Date().toISOString()
      })
      cancelEditComment()
    } catch (error) {
      console.error('Erro ao salvar comentário:', error)
      alert('Erro ao salvar comentário')
    } finally {
      setSavingComment(false)
    }
  }

  // Reações
  const handleReaction = async (commentId, reaction) => {
    try {
      await toggleReactionOnComment(documentId, commentId, reaction, currentUser?.uid)
      setOpenReactionPicker(null)
    } catch (error) {
      console.error('Erro ao reagir:', error)
    }
  }

  return (
    <div className="space-y-4">
      {/* Lista de Comentários */}
      {comments.length > 0 && (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {comments.map((comment, index) => (
            <div key={comment.id || index} className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{comment.author}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCommentTypeColor(comment.type)}`}>
                    {getCommentTypeLabel(comment.type)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleString('pt-BR') : ''}
                  </span>
                  {comment.editedAt && (
                    <span className="text-xs text-gray-400 italic">(editado)</span>
                  )}
                </div>
                {comment.author === (currentUser?.name || currentUser?.email) && !editingCommentId && (
                  <button
                    onClick={() => startEditComment(comment)}
                    className="p-1 text-gray-400 hover:text-primary-600 rounded"
                    title="Editar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {editingCommentId === comment.id ? (
                <div className="space-y-2">
                  <MentionInput
                    value={editingCommentText}
                    onChange={setEditingCommentText}
                    users={users}
                    placeholder="Editar comentário..."
                    className="textarea-field text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEditComment(comment.id)}
                      disabled={savingComment}
                      className="btn-primary text-xs py-1 px-3 flex items-center gap-1"
                    >
                      <Save className="w-3 h-3" />
                      {savingComment ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      onClick={cancelEditComment}
                      className="btn-secondary text-xs py-1 px-3"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {comment.text && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {renderTextWithMentions(comment.text, users)}
                    </p>
                  )}
                  
                  {/* Screenshots do comentário */}
                  {comment.screenshots?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {comment.screenshots.map((media, idx) => (
                        <div key={idx} className="relative">
                          {isVideo(media) ? (
                            <div className="relative">
                              <video
                                src={media.url}
                                className="h-20 w-auto object-cover rounded border border-gray-200 dark:border-gray-600"
                                muted
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                                <span className="text-white text-xs">▶</span>
                              </div>
                              <a
                                href={media.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70"
                              >
                                ↗
                              </a>
                            </div>
                          ) : (
                            <a href={media.url} target="_blank" rel="noopener noreferrer">
                              <img
                                src={media.url}
                                alt={media.name}
                                className="h-20 w-auto object-cover rounded border border-gray-200 dark:border-gray-600 hover:border-primary-500"
                              />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Reações */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="relative">
                      <button
                        onClick={() => setOpenReactionPicker(openReactionPicker === comment.id ? null : comment.id)}
                        className="p-1 text-gray-400 hover:text-primary-600 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                        title="Reagir"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                      {openReactionPicker === comment.id && (
                        <ReactionPicker
                          onSelect={(reaction) => handleReaction(comment.id, reaction)}
                          onClose={() => setOpenReactionPicker(null)}
                          position="bottom"
                        />
                      )}
                    </div>
                    <ReactionDisplay
                      reactions={comment.reactions}
                      currentUserId={currentUser?.uid}
                      onToggle={(reaction) => handleReaction(comment.id, reaction)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Área para novo comentário */}
      <div className="space-y-3" onPaste={handlePaste}>
        <MentionInput
          value={newComment}
          onChange={setNewComment}
          users={users}
          placeholder="Escreva uma resposta... Use @ para mencionar alguém"
          className="textarea-field"
        />
        
        {/* Zona de Drag-and-Drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
            isDragging 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            id="comment-screenshot-section"
            multiple
            accept="image/*,video/*"
            onChange={handleCommentScreenshot}
            className="hidden"
            disabled={uploadingScreenshot}
          />
          
          <div className="flex flex-col items-center gap-2 text-center">
            {uploadingScreenshot ? (
              <div className="flex items-center gap-2 text-primary-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">Enviando arquivo...</span>
              </div>
            ) : (
              <>
                <Image className={`w-8 h-8 ${isDragging ? 'text-primary-500' : 'text-gray-400'}`} />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="comment-screenshot-section"
                    className="text-primary-600 font-medium cursor-pointer hover:underline"
                  >
                    Clique para anexar
                  </label>
                  <span className="mx-1">ou arraste arquivos aqui</span>
                </div>
                <p className="text-xs text-gray-400">
                  Imagens e vídeos • Ctrl+V para colar
                </p>
              </>
            )}
          </div>
          
          {/* Preview das mídias anexadas */}
          {commentScreenshots.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              {commentScreenshots.map((media, index) => (
                <div key={index} className="relative group">
                  {isVideo(media) ? (
                    <div className="relative">
                      <video
                        src={media.url}
                        className="h-16 w-auto object-cover rounded border border-gray-200"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                        <span className="text-white text-xs">▶</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={media.url}
                      alt={media.name}
                      className="h-16 w-auto object-cover rounded border border-gray-200"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeCommentScreenshot(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <span className="self-center text-xs text-gray-500 ml-2">
                {commentScreenshots.length} arquivo(s)
              </span>
            </div>
          )}
        </div>
        
        {/* Botões de ação */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSendComment('resposta')}
            disabled={sendingComment || (!newComment.trim() && commentScreenshots.length === 0)}
            className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Enviar Resposta
          </button>
          
          {/* Dev: Solicitar Reteste */}
          {status !== 'em_reteste' && status !== 'aprovado' && (
            <button
              onClick={() => handleSendComment('solicitar_reteste')}
              disabled={sendingComment}
              className="flex items-center gap-2 text-sm px-4 py-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Solicitar Reteste
            </button>
          )}
          
          {/* Operação: Aprovar/Reprovar */}
          {status === 'em_reteste' && (
            <>
              <button
                onClick={() => handleSendComment('aprovado_reteste')}
                disabled={sendingComment}
                className="flex items-center gap-2 text-sm px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
              >
                <ThumbsUp className="w-4 h-4" />
                Aprovar Reteste
              </button>
              <button
                onClick={() => handleSendComment('reprovado_reteste')}
                disabled={sendingComment}
                className="flex items-center gap-2 text-sm px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
              >
                <ThumbsDown className="w-4 h-4" />
                Reprovar Reteste
              </button>
            </>
          )}
        </div>
        
        {sendingComment && (
          <p className="text-sm text-gray-500">Enviando...</p>
        )}
      </div>
    </div>
  )
}
