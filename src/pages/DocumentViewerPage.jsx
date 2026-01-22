import { useState } from 'react'
import { FileText, Trash2, Eye, Download, Search, Filter, CheckCircle2, XCircle, Clock, ChevronDown, MessageSquare, Send, RefreshCw, ThumbsUp, ThumbsDown, Image, X, Loader2, Edit3, Save, Plus, Smile } from 'lucide-react'
import { addCommentToTestDocument, uploadScreenshot, updateCommentInTestDocument, addNotification, toggleReactionOnComment } from '../firebase'
import ReactionPicker, { ReactionButton, ReactionDisplay } from '../components/ReactionPicker'
import MentionInput, { renderTextWithMentions, extractMentions } from '../components/MentionInput'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from 'docx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

export default function DocumentViewerPage({ documents, onUpdate, onDelete, users = [], currentUser = null }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [exportMenuOpen, setExportMenuOpen] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [commentType, setCommentType] = useState('resposta')
  const [sendingComment, setSendingComment] = useState(false)
  const [commentScreenshots, setCommentScreenshots] = useState([])
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [saving, setSaving] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')
  const [editingCommentScreenshots, setEditingCommentScreenshots] = useState([])
  const [savingComment, setSavingComment] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [openReactionPicker, setOpenReactionPicker] = useState(null)

  // Helper para detectar se é vídeo (por mediaType ou extensão do arquivo)
  const isVideo = (media) => {
    if (media.mediaType === 'video') return true
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
    const name = (media.name || media.url || '').toLowerCase()
    return videoExtensions.some(ext => name.includes(ext))
  }

  // Função para processar arquivos de mídia (imagens e vídeos) - usada por input, drag-drop e paste
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
      
      // Adicionar tipo de mídia ao arquivo
      const filesWithType = uploadedFiles.map((file, idx) => ({
        ...file,
        mediaType: mediaFiles[idx].type.startsWith('video/') ? 'video' : 'image'
      }))
      
      if (targetSetter) {
        targetSetter(prev => [...prev, ...filesWithType])
      } else {
        setCommentScreenshots(prev => [...prev, ...filesWithType])
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload do arquivo.')
    } finally {
      setUploadingScreenshot(false)
    }
  }

  // Handler para drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    await processMediaFiles(files)
  }

  // Handler para paste (Ctrl+V)
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items
    if (!items) return
    
    const mediaFiles = []
    for (const item of items) {
      if (item.type.startsWith('image/') || item.type.startsWith('video/')) {
        const file = item.getAsFile()
        if (file) mediaFiles.push(file)
      }
    }
    
    if (mediaFiles.length > 0) {
      e.preventDefault()
      await processMediaFiles(mediaFiles)
    }
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

  // Função para upload de mídia no comentário (via input file)
  const handleCommentScreenshot = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    await processMediaFiles(files)
  }

  const removeCommentScreenshot = (index) => {
    setCommentScreenshots(commentScreenshots.filter((_, i) => i !== index))
  }

  // Função para enviar comentário/interação
  const handleSendComment = async (type) => {
    if (!newComment.trim() && type === 'resposta' && commentScreenshots.length === 0) return
    
    setSendingComment(true)
    try {
      // Determinar autor baseado no tipo de ação
      const getAuthorByType = (actionType) => {
        switch (actionType) {
          case 'aprovado_reteste':
          case 'reprovado_reteste':
            return 'Operação'
          case 'resposta':
          case 'solicitar_reteste':
          default:
            return 'Desenvolvedor'
        }
      }

      const comment = {
        type: type, // 'resposta', 'solicitar_reteste', 'aprovado_reteste', 'reprovado_reteste'
        text: newComment.trim(),
        author: getAuthorByType(type),
        screenshots: commentScreenshots
      }
      
      await addCommentToTestDocument(selectedDoc.id, comment)
      
      // Criar notificação baseada no tipo de ação
      // Determinar para quem vai a notificação (perfil oposto ao autor)
      const getTargetRole = (actionType) => {
        switch (actionType) {
          case 'aprovado_reteste':
          case 'reprovado_reteste':
            // Operação aprovou/reprovou -> notificar Desenvolvedor
            return 'desenvolvedor'
          case 'resposta':
          case 'solicitar_reteste':
          default:
            // Desenvolvedor respondeu/solicitou -> notificar Operação
            return 'operacao'
        }
      }

      const notificationData = {
        testId: selectedDoc.id,
        testTitle: selectedDoc.title,
        type: type === 'resposta' ? 'comentario' : type,
        message: newComment.trim() || getNotificationMessage(type),
        author: comment.author,
        authorEmail: currentUser?.email || null,
        targetRole: getTargetRole(type)
      }
      await addNotification(notificationData)

      // Criar notificações para usuários mencionados
      const mentionedUsers = extractMentions(newComment, users)
      for (const mentionedUser of mentionedUsers) {
        await addNotification({
          testId: selectedDoc.id,
          testTitle: selectedDoc.title,
          type: 'mencao',
          message: `${comment.author} mencionou você: "${newComment.trim().substring(0, 100)}${newComment.length > 100 ? '...' : ''}"`,
          author: comment.author,
          authorEmail: currentUser?.email || null,
          targetUserId: mentionedUser.uid,
          targetEmail: mentionedUser.email
        })
      }
      
      // Se for aprovação após reteste, atualizar status do documento
      if (type === 'aprovado_reteste') {
        await onUpdate(selectedDoc.id, { status: 'aprovado' })
      }
      // Se for reprovação do reteste, voltar status para 'reprovado'
      if (type === 'reprovado_reteste') {
        await onUpdate(selectedDoc.id, { status: 'reprovado' })
      }
      // Se for solicitação de reteste, mudar status para 'em_reteste'
      if (type === 'solicitar_reteste') {
        await onUpdate(selectedDoc.id, { status: 'em_reteste' })
      }
      
      setNewComment('')
      setCommentScreenshots([])
      // Atualizar o documento selecionado com os novos comentários
      const updatedDoc = documents.find(d => d.id === selectedDoc.id)
      if (updatedDoc) {
        setSelectedDoc({...updatedDoc, comments: [...(updatedDoc.comments || []), comment]})
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
      alert('Erro ao enviar comentário. Tente novamente.')
    } finally {
      setSendingComment(false)
    }
  }

  // Função para formatar tipo de comentário
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
      case 'solicitar_reteste': return 'bg-orange-100 text-orange-700'
      case 'aprovado_reteste': return 'bg-green-100 text-green-700'
      case 'reprovado_reteste': return 'bg-red-100 text-red-700'
      case 'feedback': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Funções de edição de comentários
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

  const handleEditCommentScreenshot = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    await processMediaFiles(files, setEditingCommentScreenshots)
  }

  const removeEditingCommentScreenshot = (index) => {
    setEditingCommentScreenshots(editingCommentScreenshots.filter((_, i) => i !== index))
  }

  const saveEditComment = async () => {
    setSavingComment(true)
    try {
      await updateCommentInTestDocument(selectedDoc.id, editingCommentId, {
        text: editingCommentText,
        screenshots: editingCommentScreenshots
      })
      
      // Atualizar o documento selecionado localmente
      const updatedComments = (selectedDoc.comments || []).map(c => 
        c.id === editingCommentId 
          ? { ...c, text: editingCommentText, screenshots: editingCommentScreenshots }
          : c
      )
      setSelectedDoc({ ...selectedDoc, comments: updatedComments })
      
      cancelEditComment()
    } catch (error) {
      console.error('Erro ao salvar comentário:', error)
      alert('Erro ao salvar comentário.')
    } finally {
      setSavingComment(false)
    }
  }

  // Função para adicionar/remover reação em um comentário
  const handleReaction = async (commentId, reaction) => {
    if (!currentUser) return
    
    try {
      await toggleReactionOnComment(
        selectedDoc.id,
        commentId,
        reaction,
        currentUser.uid,
        currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário'
      )
      
      // Atualizar localmente
      const updatedComments = (selectedDoc.comments || []).map(c => {
        if (c.id !== commentId) return c
        
        const reactions = c.reactions || []
        const existingIdx = reactions.findIndex(
          r => r.type === reaction.type && r.value === reaction.value && r.userId === currentUser.uid
        )
        
        let newReactions
        if (existingIdx >= 0) {
          newReactions = reactions.filter((_, idx) => idx !== existingIdx)
        } else {
          newReactions = [...reactions, {
            ...reaction,
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário',
            createdAt: new Date().toISOString()
          }]
        }
        
        return { ...c, reactions: newReactions }
      })
      
      setSelectedDoc({ ...selectedDoc, comments: updatedComments })
    } catch (error) {
      console.error('Erro ao reagir:', error)
    }
    
    setOpenReactionPicker(null)
  }

  // Funções de edição
  const startEdit = () => {
    setEditData({
      title: selectedDoc.title,
      feature: selectedDoc.feature,
      module: selectedDoc.module || '',
      testType: selectedDoc.testType,
      priority: selectedDoc.priority,
      status: selectedDoc.status,
      tester: selectedDoc.tester,
      environment: selectedDoc.environment || '',
      preconditions: selectedDoc.preconditions || '',
      observations: selectedDoc.observations || '',
      steps: selectedDoc.steps || [{ action: '', expectedResult: '', actualResult: '', status: 'pendente' }]
    })
    setEditMode(true)
  }

  const cancelEdit = () => {
    setEditMode(false)
    setEditData(null)
  }

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleStepChange = (index, field, value) => {
    const newSteps = [...editData.steps]
    newSteps[index][field] = value
    setEditData({ ...editData, steps: newSteps })
  }

  const addStep = () => {
    setEditData({
      ...editData,
      steps: [...editData.steps, { action: '', expectedResult: '', actualResult: '', status: 'pendente' }]
    })
  }

  const removeStep = (index) => {
    if (editData.steps.length > 1) {
      const newSteps = editData.steps.filter((_, i) => i !== index)
      setEditData({ ...editData, steps: newSteps })
    }
  }

  const saveEdit = async () => {
    setSaving(true)
    try {
      await onUpdate(selectedDoc.id, editData)
      setSelectedDoc({ ...selectedDoc, ...editData })
      setEditMode(false)
      setEditData(null)
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar alterações.')
    } finally {
      setSaving(false)
    }
  }

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.feature.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    const matchesType = filterType === 'all' || doc.testType === filterType
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory
    return matchesSearch && matchesStatus && matchesType && matchesCategory
  })

  const exportAsTxt = (doc) => {
    const content = generateDocumentText(doc)
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setExportMenuOpen(null)
  }

  const exportAsMarkdown = (doc) => {
    const content = generateMarkdown(doc)
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setExportMenuOpen(null)
  }

  const generateMarkdown = (doc) => {
    let md = `# ${doc.title}\n\n`
    md += `## Informações Gerais\n\n`
    md += `| Campo | Valor |\n|-------|-------|\n`
    md += `| Feature | ${doc.feature} |\n`
    md += `| Módulo | ${doc.module || 'N/A'} |\n`
    md += `| Tipo | ${doc.testType} |\n`
    md += `| Prioridade | ${doc.priority} |\n`
    md += `| Status | **${doc.status.toUpperCase()}** |\n`
    md += `| Testador | ${doc.tester} |\n`
    md += `| Ambiente | ${doc.environment || 'N/A'} |\n`
    if (doc.errorType) {
      md += `| Tipo de Erro | ${doc.errorType === 'bug' ? 'Bug' : 'Regra de Negócio'} |\n`
    }
    md += `| Data | ${new Date(doc.createdAt).toLocaleString('pt-BR')} |\n\n`
    
    if (doc.requirement) {
      md += `## Requisito\n\n`
      md += `**Código:** ${doc.requirement}\n\n`
      if (doc.requirementDescription) {
        md += `**Descrição:** ${doc.requirementDescription}\n\n`
      }
    }

    if (doc.improvement) {
      md += `## Sugestão de Melhoria\n\n`
      md += `**Melhoria:** ${doc.improvement}\n\n`
      if (doc.improvementJustification) {
        md += `**Justificativa:** ${doc.improvementJustification}\n\n`
      }
    }

    if (doc.preconditions) {
      md += `## Pré-condições\n\n${doc.preconditions}\n\n`
    }
    
    md += `## Passos do Teste\n\n`
    doc.steps.forEach((step, i) => {
      md += `### Passo ${i + 1}\n\n`
      md += `- **Ação:** ${step.action}\n`
      md += `- **Esperado:** ${step.expectedResult}\n`
      md += `- **Obtido:** ${step.actualResult}\n`
      md += `- **Status:** ${step.status}\n\n`
    })
    
    if (doc.elements && doc.elements.length > 0 && doc.elements[0].name) {
      md += `## Elementos da Interface\n\n`
      md += `| Nome | Selector | Tipo |\n|------|----------|------|\n`
      doc.elements.forEach(el => {
        if (el.name) {
          md += `| ${el.name} | \`${el.selector}\` | ${el.type} |\n`
        }
      })
      md += `\n`
    }
    
    if (doc.screenshots && doc.screenshots.length > 0) {
      md += `## Screenshots / Evidências\n\n`
      doc.screenshots.forEach((screenshot, i) => {
        md += `![${screenshot.name}](${screenshot.url})\n\n`
      })
    }

    if (doc.observations) {
      md += `## Observações\n\n${doc.observations}\n\n`
    }
    
    return md
  }

  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Erro ao carregar imagem:', error)
      return null
    }
  }

  const fetchImageAsArrayBuffer = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return await blob.arrayBuffer()
    } catch (error) {
      console.error('Erro ao carregar imagem:', error)
      return null
    }
  }

  const exportAsDocx = async (doc) => {
    // Carregar logo
    let logoImageData = null
    try {
      logoImageData = await fetchImageAsArrayBuffer('/DocSimplesReports/logo.jpg')
    } catch (e) {
      console.log('Logo não encontrado para DOCX')
    }

    const children = []

    // Cabeçalho com logo e nome
    if (logoImageData) {
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: logoImageData,
              transformation: { width: 50, height: 50 },
              type: 'jpg'
            }),
          ],
          spacing: { after: 100 },
        })
      )
    }
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'DocSimples Reports', bold: true, size: 32, color: '2563EB' })
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Sistema de Documentação de Testes', size: 20, color: '666666' })
        ],
        spacing: { after: 400 },
      }),
      new Paragraph({
        text: doc.title,
        heading: HeadingLevel.TITLE,
      }),
      new Paragraph({
        text: `Feature: ${doc.feature} | Módulo: ${doc.module || 'N/A'}`,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Status: ${doc.status.toUpperCase()} | Tipo: ${doc.testType} | Prioridade: ${doc.priority}`,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Testador: ${doc.tester} | Ambiente: ${doc.environment || 'N/A'}`,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Data: ${new Date(doc.createdAt).toLocaleString('pt-BR')}`,
        spacing: { after: 200 },
      })
    )

    if (doc.errorType) {
      children.push(
        new Paragraph({
          text: `Tipo de Erro: ${doc.errorType === 'bug' ? 'Bug' : 'Regra de Negócio'}`,
          spacing: { after: 400 },
        })
      )
    }

    if (doc.requirement) {
      children.push(
        new Paragraph({ text: 'Requisito', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ children: [new TextRun({ text: 'Código: ', bold: true }), new TextRun(doc.requirement)] })
      )
      if (doc.requirementDescription) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: 'Descrição: ', bold: true }), new TextRun(doc.requirementDescription)], spacing: { after: 300 } })
        )
      }
    }

    if (doc.improvement) {
      children.push(
        new Paragraph({ text: 'Sugestão de Melhoria', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ children: [new TextRun({ text: 'Melhoria: ', bold: true }), new TextRun(doc.improvement)] })
      )
      if (doc.improvementJustification) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: 'Justificativa: ', bold: true }), new TextRun(doc.improvementJustification)], spacing: { after: 300 } })
        )
      }
    }

    if (doc.preconditions) {
      children.push(
        new Paragraph({ text: 'Pré-condições', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: doc.preconditions, spacing: { after: 300 } })
      )
    }

    children.push(new Paragraph({ text: 'Passos do Teste', heading: HeadingLevel.HEADING_1 }))
    
    doc.steps.forEach((step, i) => {
      children.push(
        new Paragraph({ text: `Passo ${i + 1}`, heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: 'Ação: ', bold: true }), new TextRun(step.action)] }),
        new Paragraph({ children: [new TextRun({ text: 'Esperado: ', bold: true }), new TextRun(step.expectedResult)] }),
        new Paragraph({ children: [new TextRun({ text: 'Obtido: ', bold: true }), new TextRun(step.actualResult)] }),
        new Paragraph({ children: [new TextRun({ text: 'Status: ', bold: true }), new TextRun(step.status)], spacing: { after: 200 } })
      )
    })

    if (doc.screenshots && doc.screenshots.length > 0) {
      children.push(new Paragraph({ text: 'Screenshots / Evidências', heading: HeadingLevel.HEADING_1 }))
      
      for (const screenshot of doc.screenshots) {
        try {
          const imageData = await fetchImageAsArrayBuffer(screenshot.url)
          if (imageData) {
            children.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageData,
                    transformation: { width: 400, height: 300 },
                    type: 'jpg'
                  })
                ],
                spacing: { after: 200 }
              }),
              new Paragraph({ text: screenshot.name, spacing: { after: 300 } })
            )
          }
        } catch (e) {
          children.push(new Paragraph({ text: `[Imagem: ${screenshot.name}] - ${screenshot.url}`, spacing: { after: 200 } }))
        }
      }
    }

    if (doc.observations) {
      children.push(
        new Paragraph({ text: 'Observações', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: doc.observations })
      )
    }

    const docx = new Document({
      sections: [{ children }]
    })

    const blob = await Packer.toBlob(docx)
    saveAs(blob, `teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.docx`)
    setExportMenuOpen(null)
  }

  const exportAsPdf = async (doc) => {
    const pdf = new jsPDF()
    let y = 20
    const lineHeight = 7
    const pageHeight = pdf.internal.pageSize.height
    const margin = 20

    // Cabeçalho com logo e nome
    try {
      const logoData = await fetchImageAsBase64('/DocSimplesReports/logo.jpg')
      if (logoData) {
        pdf.addImage(logoData, 'JPEG', margin, y, 15, 15)
      }
    } catch (e) {
      console.log('Logo não encontrado para PDF')
    }
    
    // Nome do sistema
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235) // Azul primário
    pdf.text('DocSimples Reports', margin + 20, y + 8)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(100, 100, 100)
    pdf.text('Sistema de Documentação de Testes', margin + 20, y + 14)
    
    // Linha separadora
    y += 22
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, y, 190, y)
    y += 10
    
    // Resetar cor do texto
    pdf.setTextColor(0, 0, 0)

    const addText = (text, isBold = false, fontSize = 12) => {
      if (y > pageHeight - 20) {
        pdf.addPage()
        y = 20
      }
      pdf.setFontSize(fontSize)
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
      const lines = pdf.splitTextToSize(text, 170)
      lines.forEach(line => {
        if (y > pageHeight - 20) {
          pdf.addPage()
          y = 20
        }
        pdf.text(line, margin, y)
        y += lineHeight
      })
    }

    addText(doc.title, true, 18)
    y += 5
    addText(`Feature: ${doc.feature} | Módulo: ${doc.module || 'N/A'}`)
    addText(`Status: ${doc.status.toUpperCase()} | Tipo: ${doc.testType} | Prioridade: ${doc.priority}`)
    addText(`Testador: ${doc.tester} | Ambiente: ${doc.environment || 'N/A'}`)
    addText(`Data: ${new Date(doc.createdAt).toLocaleString('pt-BR')}`)
    if (doc.errorType) {
      addText(`Tipo de Erro: ${doc.errorType === 'bug' ? 'Bug' : 'Regra de Negócio'}`)
    }
    y += 10

    if (doc.requirement) {
      addText('Requisito', true, 14)
      addText(`Código: ${doc.requirement}`)
      if (doc.requirementDescription) {
        addText(`Descrição: ${doc.requirementDescription}`)
      }
      y += 5
    }

    if (doc.improvement) {
      addText('Sugestão de Melhoria', true, 14)
      addText(`Melhoria: ${doc.improvement}`)
      if (doc.improvementJustification) {
        addText(`Justificativa: ${doc.improvementJustification}`)
      }
      y += 5
    }

    if (doc.preconditions) {
      addText('Pré-condições', true, 14)
      addText(doc.preconditions)
      y += 5
    }

    addText('Passos do Teste', true, 14)
    doc.steps.forEach((step, i) => {
      y += 3
      addText(`Passo ${i + 1}`, true)
      addText(`Ação: ${step.action}`)
      addText(`Esperado: ${step.expectedResult}`)
      addText(`Obtido: ${step.actualResult}`)
      addText(`Status: ${step.status}`)
    })

    if (doc.screenshots && doc.screenshots.length > 0) {
      y += 10
      addText('Screenshots / Evidências', true, 14)
      y += 5
      
      for (const screenshot of doc.screenshots) {
        try {
          const imgData = await fetchImageAsBase64(screenshot.url)
          if (imgData) {
            if (y > pageHeight - 80) {
              pdf.addPage()
              y = 20
            }
            pdf.addImage(imgData, 'JPEG', margin, y, 80, 60)
            y += 65
            addText(screenshot.name)
            y += 5
          }
        } catch (e) {
          addText(`[Imagem: ${screenshot.name}]`)
        }
      }
    }

    if (doc.observations) {
      y += 5
      addText('Observações', true, 14)
      addText(doc.observations)
    }

    pdf.save(`teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.pdf`)
    setExportMenuOpen(null)
  }

  const generateDocumentText = (doc) => {
    let text = `DOCUMENTO DE TESTE DE HOMOLOGAÇÃO\n`
    text += `${'='.repeat(50)}\n\n`
    text += `Título: ${doc.title}\n`
    text += `Feature: ${doc.feature}\n`
    text += `Módulo: ${doc.module || 'N/A'}\n`
    text += `Tipo: ${doc.testType}\n`
    text += `Prioridade: ${doc.priority}\n`
    text += `Status: ${doc.status.toUpperCase()}\n`
    text += `Testador: ${doc.tester}\n`
    text += `Ambiente: ${doc.environment || 'N/A'}\n`
    if (doc.errorType) {
      text += `Tipo de Erro: ${doc.errorType === 'bug' ? 'Bug' : 'Regra de Negócio'}\n`
    }
    text += `Data: ${new Date(doc.createdAt).toLocaleString('pt-BR')}\n\n`
    
    if (doc.requirement) {
      text += `REQUISITO:\n${'-'.repeat(30)}\n`
      text += `Código: ${doc.requirement}\n`
      if (doc.requirementDescription) {
        text += `Descrição: ${doc.requirementDescription}\n`
      }
      text += `\n`
    }

    if (doc.improvement) {
      text += `SUGESTÃO DE MELHORIA:\n${'-'.repeat(30)}\n`
      text += `Melhoria: ${doc.improvement}\n`
      if (doc.improvementJustification) {
        text += `Justificativa: ${doc.improvementJustification}\n`
      }
      text += `\n`
    }

    if (doc.preconditions) {
      text += `PRÉ-CONDIÇÕES:\n${'-'.repeat(30)}\n${doc.preconditions}\n\n`
    }
    
    text += `PASSOS DO TESTE:\n${'-'.repeat(30)}\n`
    doc.steps.forEach((step, i) => {
      text += `\nPasso ${i + 1}:\n`
      text += `  Ação: ${step.action}\n`
      text += `  Esperado: ${step.expectedResult}\n`
      text += `  Obtido: ${step.actualResult}\n`
      text += `  Status: ${step.status}\n`
    })
    
    if (doc.elements && doc.elements.length > 0 && doc.elements[0].name) {
      text += `\nELEMENTOS DA INTERFACE:\n${'-'.repeat(30)}\n`
      doc.elements.forEach(el => {
        if (el.name) {
          text += `  - ${el.name}: ${el.selector} (${el.type})\n`
        }
      })
    }
    
    if (doc.observations) {
      text += `\nOBSERVAÇÕES:\n${'-'.repeat(30)}\n${doc.observations}\n`
    }
    
    if (doc.evidences) {
      text += `\nEVIDÊNCIAS:\n${'-'.repeat(30)}\n${doc.evidences}\n`
    }
    
    return text
  }

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'reprovado':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'em_reteste':
        return <RefreshCw className="w-5 h-5 text-orange-500" />
      case 'melhoria':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos de Teste</h1>
          <p className="text-gray-600 mt-1">{documents.length} documento(s) registrado(s)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card overflow-visible">
        <div className="flex flex-col gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Buscar por título ou feature..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">Todos Status</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="reprovado">Reprovado</option>
              <option value="em_reteste">Em Reteste</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field"
            >
              <option value="all">Todos Tipos</option>
              <option value="funcional">Funcional</option>
              <option value="exploratorio">Exploratório</option>
              <option value="regressao">Regressão</option>
              <option value="integracao">Integração</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">Todas Categorias</option>
              <option value="regra_negocio">Regra de Negócio</option>
              <option value="bug">Bug</option>
              <option value="melhoria">Melhoria</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      {filteredDocs.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {documents.length === 0 ? 'Nenhum documento registrado' : 'Nenhum resultado encontrado'}
          </h3>
          <p className="text-gray-600 mt-1">
            {documents.length === 0 
              ? 'Registre um teste para começar' 
              : 'Tente ajustar os filtros de busca'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <StatusIcon status={doc.status} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-600">{doc.feature} {doc.module && `• ${doc.module}`}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`badge ${
                        doc.status === 'aprovado' ? 'badge-success' :
                        doc.status === 'reprovado' ? 'badge-error' :
                        doc.status === 'em_reteste' ? 'bg-orange-100 text-orange-700' :
                        doc.status === 'melhoria' ? 'bg-blue-100 text-blue-700' : 'badge-warning'
                      }`}>
                        {doc.status === 'em_reteste' ? 'Em Reteste' : doc.status}
                      </span>
                      <span className="badge badge-info">{doc.testType}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                    title="Visualizar"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setExportMenuOpen(exportMenuOpen === doc.id ? null : doc.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg flex items-center"
                      title="Exportar"
                    >
                      <Download className="w-4 h-4" />
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                    {exportMenuOpen === doc.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button onClick={() => exportAsTxt(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.txt</button>
                        <button onClick={() => exportAsMarkdown(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.md (Markdown)</button>
                        <button onClick={() => exportAsDocx(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.docx (Word)</button>
                        <button onClick={() => exportAsPdf(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.pdf</button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-hidden">
          <div className="h-full sm:p-4 sm:flex sm:items-center sm:justify-center sm:overflow-y-auto">
            <div className="bg-white sm:rounded-xl w-full sm:max-w-3xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex items-start justify-between gap-2 z-10">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                  {editMode ? 'Editar Documento' : selectedDoc.title}
                </h2>
                {selectedDoc.jiraKey && !editMode && (
                  <a 
                    href={selectedDoc.jiraUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                  >
                    🎫 {selectedDoc.jiraKey}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!editMode && (
                  <button
                    onClick={startEdit}
                    className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100"
                    title="Editar"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => { setSelectedDoc(null); setEditMode(false); setEditData(null); }}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modo de Edição */}
            {editMode && editData ? (
              <div className="p-6 space-y-6">
                {/* Informações Básicas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => handleEditChange('title', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature</label>
                    <input
                      type="text"
                      value={editData.feature}
                      onChange={(e) => handleEditChange('feature', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Módulo</label>
                    <input
                      type="text"
                      value={editData.module}
                      onChange={(e) => handleEditChange('module', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Testador</label>
                    <input
                      type="text"
                      value={editData.tester}
                      onChange={(e) => handleEditChange('tester', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Teste</label>
                    <select
                      value={editData.testType}
                      onChange={(e) => handleEditChange('testType', e.target.value)}
                      className="input-field"
                    >
                      <option value="funcional">Funcional</option>
                      <option value="exploratorio">Exploratório</option>
                      <option value="regressao">Regressão</option>
                      <option value="integracao">Integração</option>
                      <option value="usabilidade">Usabilidade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                    <select
                      value={editData.priority}
                      onChange={(e) => handleEditChange('priority', e.target.value)}
                      className="input-field"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                      <option value="critica">Crítica</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                      className="input-field"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="reprovado">Reprovado</option>
                      <option value="em_reteste">Em Reteste</option>
                      <option value="bloqueado">Bloqueado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ambiente</label>
                    <input
                      type="text"
                      value={editData.environment}
                      onChange={(e) => handleEditChange('environment', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Pré-condições */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pré-condições</label>
                  <textarea
                    value={editData.preconditions}
                    onChange={(e) => handleEditChange('preconditions', e.target.value)}
                    className="textarea-field"
                    rows="2"
                  />
                </div>

                {/* Passos do Teste */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Passos do Teste</label>
                    <button
                      type="button"
                      onClick={addStep}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Adicionar Passo
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editData.steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Passo {index + 1}</span>
                          {editData.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStep(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <input
                            type="text"
                            value={step.action}
                            onChange={(e) => handleStepChange(index, 'action', e.target.value)}
                            className="input-field text-sm"
                            placeholder="Ação"
                          />
                          <input
                            type="text"
                            value={step.expectedResult}
                            onChange={(e) => handleStepChange(index, 'expectedResult', e.target.value)}
                            className="input-field text-sm"
                            placeholder="Resultado Esperado"
                          />
                          <input
                            type="text"
                            value={step.actualResult}
                            onChange={(e) => handleStepChange(index, 'actualResult', e.target.value)}
                            className="input-field text-sm"
                            placeholder="Resultado Obtido"
                          />
                          <select
                            value={step.status}
                            onChange={(e) => handleStepChange(index, 'status', e.target.value)}
                            className="input-field text-sm"
                          >
                            <option value="pendente">Pendente</option>
                            <option value="passou">Passou</option>
                            <option value="falhou">Falhou</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <textarea
                    value={editData.observations}
                    onChange={(e) => handleEditChange('observations', e.target.value)}
                    className="textarea-field"
                    rows="3"
                  />
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={cancelEdit}
                    className="btn-secondary"
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveEdit}
                    className="btn-primary flex items-center gap-2"
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            ) : (
            <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs text-gray-500">Feature</p>
                  <p className="font-medium">{selectedDoc.feature}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Módulo</p>
                  <p className="font-medium">{selectedDoc.module || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tipo</p>
                  <p className="font-medium capitalize">{selectedDoc.testType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`badge ${
                    selectedDoc.status === 'aprovado' ? 'badge-success' :
                    selectedDoc.status === 'reprovado' ? 'badge-error' :
                    selectedDoc.status === 'em_reteste' ? 'bg-orange-100 text-orange-700' :
                    selectedDoc.status === 'melhoria' ? 'bg-blue-100 text-blue-700' : 'badge-warning'
                  }`}>
                    {selectedDoc.status === 'em_reteste' ? 'Em Reteste' : selectedDoc.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Testador</p>
                  <p className="font-medium">{selectedDoc.tester}</p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500">Ambiente</p>
                  <p className="font-medium break-all" title={selectedDoc.environment || 'N/A'}>{selectedDoc.environment || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Prioridade</p>
                  <p className="font-medium capitalize">{selectedDoc.priority}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Data</p>
                  <p className="font-medium">{new Date(selectedDoc.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                {selectedDoc.errorType && (
                  <div>
                    <p className="text-xs text-gray-500">Tipo de Erro</p>
                    <span className={`badge ${selectedDoc.errorType === 'bug' ? 'badge-error' : 'bg-purple-100 text-purple-700'}`}>
                      {selectedDoc.errorType === 'bug' ? 'Bug' : 'Regra de Negócio'}
                    </span>
                  </div>
                )}
              </div>

              {/* Requisito */}
              {selectedDoc.requirement && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requisito</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">{selectedDoc.requirement}</p>
                    {selectedDoc.requirementDescription && (
                      <p className="text-gray-600 mt-1 text-sm">{selectedDoc.requirementDescription}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Melhoria */}
              {selectedDoc.improvement && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sugestão de Melhoria</h3>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">{selectedDoc.improvement}</p>
                    {selectedDoc.improvementJustification && (
                      <p className="text-gray-600 mt-2 text-sm"><strong>Justificativa:</strong> {selectedDoc.improvementJustification}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Preconditions */}
              {selectedDoc.preconditions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pré-condições</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoc.preconditions}</p>
                </div>
              )}

              {/* Steps */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Passos do Teste</h3>
                <div className="space-y-3">
                  {selectedDoc.steps.map((step, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Passo {i + 1}</span>
                        <span className={`badge ${
                          step.status === 'passou' ? 'badge-success' :
                          step.status === 'falhou' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><strong>Ação:</strong> {step.action}</p>
                        <p><strong>Esperado:</strong> {step.expectedResult}</p>
                        <p><strong>Obtido:</strong> {step.actualResult}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elements */}
              {selectedDoc.elements && selectedDoc.elements.some(el => el.name) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Elementos da Interface</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="pb-2">Nome</th>
                          <th className="pb-2">Selector</th>
                          <th className="pb-2">Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoc.elements.filter(el => el.name).map((el, i) => (
                          <tr key={i}>
                            <td className="py-1">{el.name}</td>
                            <td className="py-1 font-mono text-xs">{el.selector}</td>
                            <td className="py-1">{el.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Screenshots e Vídeos */}
              {selectedDoc.screenshots && selectedDoc.screenshots.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Evidências (Imagens e Vídeos)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDoc.screenshots.map((media, i) => (
                      <div key={i}>
                        {isVideo(media) ? (
                          <div className="relative">
                            <video
                              src={media.url}
                              controls
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <a
                              href={media.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70"
                            >
                              ↗ Abrir
                            </a>
                            <p className="text-xs text-gray-500 mt-1 truncate">{media.name}</p>
                          </div>
                        ) : (
                          <a
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <img
                              src={media.url}
                              alt={media.name}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-1 truncate">{media.name}</p>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observations */}
              {selectedDoc.observations && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Observações</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoc.observations}</p>
                </div>
              )}

              {/* Seção de Interação - Comentários e Reteste */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-600" />
                  Interação / Feedback
                </h3>
                
                {/* Lista de comentários existentes */}
                {selectedDoc.comments && selectedDoc.comments.length > 0 && (
                  <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                    {selectedDoc.comments.map((comment, idx) => (
                      <div key={comment.id || idx} className="bg-gray-50 rounded-lg p-3">
                        {/* Modo de edição do comentário */}
                        {editingCommentId === comment.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                              className="textarea-field text-sm"
                              rows="3"
                              placeholder="Editar comentário..."
                            />
                            
                            {/* Upload de mídia na edição */}
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                id={`edit-comment-screenshot-${comment.id}`}
                                multiple
                                accept="image/*,video/*"
                                onChange={handleEditCommentScreenshot}
                                className="hidden"
                                disabled={uploadingScreenshot}
                              />
                              <label
                                htmlFor={`edit-comment-screenshot-${comment.id}`}
                                className="flex items-center gap-1 text-xs px-2 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                              >
                                {uploadingScreenshot ? <Loader2 className="w-3 h-3 animate-spin" /> : <Image className="w-3 h-3" />}
                                <span>Anexar imagem/vídeo</span>
                              </label>
                            </div>
                            
                            {/* Preview mídia em edição */}
                            {editingCommentScreenshots.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {editingCommentScreenshots.map((media, sIdx) => (
                                  <div key={sIdx} className="relative group">
                                    {isVideo(media) ? (
                                      <video
                                        src={media.url}
                                        className="h-14 w-auto object-cover rounded border border-gray-200"
                                        muted
                                      />
                                    ) : (
                                      <img
                                        src={media.url}
                                        alt={media.name}
                                        className="h-14 w-auto object-cover rounded border border-gray-200"
                                      />
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => removeEditingCommentScreenshot(sIdx)}
                                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"
                                    >
                                      <X className="w-2 h-2" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Botões de ação da edição */}
                            <div className="flex gap-2">
                              <button
                                onClick={saveEditComment}
                                disabled={savingComment}
                                className="flex items-center gap-1 text-xs px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
                              >
                                {savingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                Salvar
                              </button>
                              <button
                                onClick={cancelEditComment}
                                disabled={savingComment}
                                className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getCommentTypeColor(comment.type)}`}>
                                  {getCommentTypeLabel(comment.type)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => startEditComment(comment)}
                                  className="p-1 text-gray-400 hover:text-primary-600 rounded"
                                  title="Editar"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <span className="text-xs text-gray-500">
                                  {comment.createdAt ? new Date(comment.createdAt).toLocaleString('pt-BR') : ''}
                                </span>
                              </div>
                            </div>
                            {comment.text && (
                              <p className="text-sm text-gray-700">{renderTextWithMentions(comment.text, users)}</p>
                            )}
                            {/* Mídia do comentário (imagens e vídeos) */}
                            {comment.screenshots && comment.screenshots.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {comment.screenshots.map((media, sIdx) => (
                                  <div key={sIdx}>
                                    {isVideo(media) ? (
                                      <div className="relative">
                                        <video
                                          src={media.url}
                                          controls
                                          className="h-40 max-w-xs rounded border border-gray-200"
                                        />
                                        <a
                                          href={media.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70"
                                        >
                                          ↗ Abrir
                                        </a>
                                      </div>
                                    ) : (
                                      <a
                                        href={media.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <img
                                          src={media.url}
                                          alt={media.name}
                                          className="h-20 w-auto object-cover rounded border border-gray-200 hover:border-primary-500"
                                        />
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Reações do comentário */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="relative">
                                <button
                                  onClick={() => setOpenReactionPicker(openReactionPicker === comment.id ? null : comment.id)}
                                  className="p-1 text-gray-400 hover:text-primary-600 rounded hover:bg-gray-100 transition-colors"
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
                <div 
                  className="space-y-3"
                  onPaste={handlePaste}
                >
                  <MentionInput
                    value={newComment}
                    onChange={setNewComment}
                    users={users}
                    placeholder="Escreva uma resposta... Use @ para mencionar alguém"
                    className="textarea-field"
                  />
                  
                  {/* Zona de Drag-and-Drop para Screenshots */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
                      isDragging 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="file"
                      id="comment-screenshot"
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
                          <div className="text-sm text-gray-600">
                            <label
                              htmlFor="comment-screenshot"
                              className="text-primary-600 font-medium cursor-pointer hover:underline"
                            >
                              Clique para anexar
                            </label>
                            <span className="mx-1">ou arraste arquivos aqui</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Imagens e vídeos • Ctrl+V para colar da área de transferência
                          </p>
                        </>
                      )}
                    </div>
                    
                    {/* Preview das mídias anexadas */}
                    {commentScreenshots.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
                        {commentScreenshots.map((media, index) => (
                          <div key={index} className="relative group">
                            {isVideo(media) ? (
                              <a href={media.url} target="_blank" rel="noopener noreferrer" className="block relative">
                                <video
                                  src={media.url}
                                  className="h-16 w-auto object-cover rounded border border-gray-200 hover:border-primary-500"
                                  muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                                  <span className="text-white text-xs">▶</span>
                                </div>
                              </a>
                            ) : (
                              <a href={media.url} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={media.url}
                                  alt={media.name}
                                  className="h-16 w-auto object-cover rounded border border-gray-200 hover:border-primary-500"
                                />
                              </a>
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
                          {commentScreenshots.length} arquivo(s) anexado(s)
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Botões de ação - separados por contexto */}
                  <div className="flex flex-wrap gap-2">
                    {/* Botão de resposta sempre visível */}
                    <button
                      onClick={() => handleSendComment('resposta')}
                      disabled={sendingComment || (!newComment.trim() && commentScreenshots.length === 0)}
                      className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Resposta
                    </button>
                    
                    {/* Dev: Solicitar Reteste - só aparece quando NÃO está em reteste */}
                    {selectedDoc.status !== 'em_reteste' && (
                      <button
                        onClick={() => handleSendComment('solicitar_reteste')}
                        disabled={sendingComment}
                        className="flex items-center gap-2 text-sm px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Solicitar Reteste
                      </button>
                    )}
                    
                    {/* Operação: Aprovar/Reprovar - só aparece quando ESTÁ em reteste */}
                    {selectedDoc.status === 'em_reteste' && (
                      <>
                        <button
                          onClick={() => handleSendComment('aprovado_reteste')}
                          disabled={sendingComment}
                          className="flex items-center gap-2 text-sm px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Aprovar Reteste
                        </button>
                        <button
                          onClick={() => handleSendComment('reprovado_reteste')}
                          disabled={sendingComment}
                          className="flex items-center gap-2 text-sm px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
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
            </div>
            )}
            {!editMode && (
            <div className="bg-gray-50 border-t border-gray-200 p-3 sm:p-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="btn-primary w-full sm:w-auto"
              >
                Fechar
              </button>
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen(exportMenuOpen === 'modal' ? null : 'modal')}
                  className="btn-secondary flex items-center justify-center space-x-1 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {exportMenuOpen === 'modal' && (
                  <div className="absolute bottom-full left-0 sm:right-0 sm:left-auto mb-1 w-full sm:w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button onClick={() => exportAsTxt(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.txt</button>
                    <button onClick={() => exportAsMarkdown(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.md (Markdown)</button>
                    <button onClick={() => exportAsDocx(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.docx (Word)</button>
                    <button onClick={() => exportAsPdf(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.pdf</button>
                  </div>
                )}
              </div>
            </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
