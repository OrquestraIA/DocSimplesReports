import { useState, useRef, useEffect } from 'react'
import { AtSign } from 'lucide-react'

export default function MentionInput({ 
  value, 
  onChange, 
  users = [], 
  placeholder = "Digite seu comentário...",
  className = ""
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [mentionStart, setMentionStart] = useState(-1)
  const textareaRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Detectar quando o usuário digita @
  const handleChange = (e) => {
    const text = e.target.value
    const cursorPos = e.target.selectionStart
    onChange(text)

    // Procurar por @ antes do cursor
    const textBeforeCursor = text.slice(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1)
      // Verificar se não há espaço após o @
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        const searchTerm = textAfterAt.toLowerCase()
        const matches = users.filter(user => 
          user.mentionName?.toLowerCase().includes(searchTerm) ||
          user.displayName?.toLowerCase().includes(searchTerm) ||
          user.email?.toLowerCase().includes(searchTerm)
        )
        setFilteredUsers(matches)
        setShowSuggestions(matches.length > 0)
        setMentionStart(lastAtIndex)
        setSuggestionIndex(0)
        return
      }
    }
    
    setShowSuggestions(false)
    setMentionStart(-1)
  }

  // Inserir menção selecionada
  const insertMention = (user) => {
    if (mentionStart === -1) return
    
    const beforeMention = value.slice(0, mentionStart)
    const afterMention = value.slice(textareaRef.current.selectionStart)
    const mention = `@${user.mentionName} `
    
    const newValue = beforeMention + mention + afterMention
    onChange(newValue)
    
    setShowSuggestions(false)
    setMentionStart(-1)
    
    // Focar no textarea e posicionar cursor após a menção
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = beforeMention.length + mention.length
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  // Navegação por teclado
  const handleKeyDown = (e) => {
    if (!showSuggestions) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSuggestionIndex(prev => 
        prev < filteredUsers.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : filteredUsers.length - 1
      )
    } else if (e.key === 'Enter' && showSuggestions) {
      e.preventDefault()
      if (filteredUsers[suggestionIndex]) {
        insertMention(filteredUsers[suggestionIndex])
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
          textareaRef.current && !textareaRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${className}`}
        rows={3}
      />
      
      {/* Dica de menção */}
      {users.length > 0 && !showSuggestions && (
        <div className="absolute right-2 bottom-2 text-xs text-gray-400 flex items-center gap-1">
          <AtSign className="w-3 h-3" />
          <span>para mencionar</span>
        </div>
      )}

      {/* Lista de sugestões */}
      {showSuggestions && filteredUsers.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
        >
          {filteredUsers.map((user, index) => (
            <button
              key={user.id || user.uid}
              onClick={() => insertMention(user)}
              className={`w-full px-3 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                index === suggestionIndex ? 'bg-primary-50' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-sm">
                {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  @{user.mentionName} • {user.email}
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                user.role === 'desenvolvedor' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {user.role === 'desenvolvedor' ? 'Dev' : 'Op'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Função auxiliar para renderizar texto com menções destacadas
export function renderTextWithMentions(text, users = []) {
  if (!text) return null
  
  // Regex para encontrar @menções
  const mentionRegex = /@(\w+)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = mentionRegex.exec(text)) !== null) {
    // Adicionar texto antes da menção
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    
    const mentionName = match[1]
    const mentionedUser = users.find(u => 
      u.mentionName?.toLowerCase() === mentionName.toLowerCase()
    )
    
    // Adicionar menção estilizada
    parts.push(
      <span 
        key={match.index}
        className={`inline-flex items-center px-1.5 py-0.5 rounded text-sm font-medium ${
          mentionedUser 
            ? 'bg-primary-100 text-primary-700 cursor-pointer hover:bg-primary-200' 
            : 'bg-gray-100 text-gray-600'
        }`}
        title={mentionedUser ? `${mentionedUser.displayName} (${mentionedUser.email})` : 'Usuário não encontrado'}
      >
        @{mentionName}
      </span>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Adicionar texto restante
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  return parts.length > 0 ? parts : text
}

// Função para extrair menções de um texto
export function extractMentions(text, users = []) {
  if (!text) return []
  
  const mentionRegex = /@(\w+)/g
  const mentions = []
  let match

  while ((match = mentionRegex.exec(text)) !== null) {
    const mentionName = match[1]
    const mentionedUser = users.find(u => 
      u.mentionName?.toLowerCase() === mentionName.toLowerCase()
    )
    if (mentionedUser && !mentions.find(m => m.uid === mentionedUser.uid)) {
      mentions.push(mentionedUser)
    }
  }
  
  return mentions
}
