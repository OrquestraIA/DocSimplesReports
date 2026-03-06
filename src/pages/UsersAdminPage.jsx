import { useState, useEffect } from 'react'
import { Shield, Users, Search, RotateCcw, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'
import { subscribeToUsers, updateUserRole, resetUserProfile, deduplicateUsers } from '../firebase'

const ROLES = [
  { value: 'desenvolvedor', label: 'Desenvolvedor', color: 'bg-blue-100 text-blue-700' },
  { value: 'operacao', label: 'Operação', color: 'bg-green-100 text-green-700' },
  { value: 'qa', label: 'QA', color: 'bg-purple-100 text-purple-700' },
  { value: 'admin', label: 'Admin', color: 'bg-red-100 text-red-700' },
]

export default function UsersAdminPage({ currentUser }) {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState({})
  const [feedback, setFeedback] = useState({})
  const [deduping, setDeduping] = useState(false)
  const [dedupResult, setDedupResult] = useState(null)

  useEffect(() => {
    const unsub = subscribeToUsers(setUsers)
    return () => unsub()
  }, [])

  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Shield className="w-12 h-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Acesso restrito</h2>
        <p className="text-gray-500">Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  // Detectar duplicatas (mesmo email, IDs diferentes)
  const emailCount = {}
  users.forEach(u => {
    const e = u.email?.toLowerCase()
    if (e) emailCount[e] = (emailCount[e] || 0) + 1
  })
  const duplicateEmails = new Set(Object.keys(emailCount).filter(e => emailCount[e] > 1))
  const hasDuplicates = duplicateEmails.size > 0

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleRoleChange = async (uid, newRole) => {
    setSaving(prev => ({ ...prev, [uid]: true }))
    setFeedback(prev => ({ ...prev, [uid]: null }))
    try {
      await updateUserRole(uid, newRole)
      setFeedback(prev => ({ ...prev, [uid]: 'ok' }))
    } catch (err) {
      console.error('Erro ao atualizar role:', err)
      setFeedback(prev => ({ ...prev, [uid]: 'erro' }))
    } finally {
      setSaving(prev => ({ ...prev, [uid]: false }))
      setTimeout(() => setFeedback(prev => ({ ...prev, [uid]: null })), 2000)
    }
  }

  const handleResetProfile = async (uid, userName) => {
    if (!window.confirm(`Resetar o perfil de "${userName}"?\n\nEle será obrigado a escolher novamente sua função no próximo login.`)) return
    setSaving(prev => ({ ...prev, [`reset_${uid}`]: true }))
    setFeedback(prev => ({ ...prev, [uid]: null }))
    try {
      await resetUserProfile(uid)
      setFeedback(prev => ({ ...prev, [uid]: 'reset' }))
    } catch (err) {
      console.error('Erro ao resetar perfil:', err)
      setFeedback(prev => ({ ...prev, [uid]: 'erro' }))
    } finally {
      setSaving(prev => ({ ...prev, [`reset_${uid}`]: false }))
      setTimeout(() => setFeedback(prev => ({ ...prev, [uid]: null })), 3000)
    }
  }

  const handleDedup = async () => {
    if (!window.confirm(`Remover ${duplicateEmails.size} duplicata(s)?\n\nOs documentos antigos (com ID aleatório) serão apagados. Os dados do documento correto (ID = UID do usuário) serão mantidos.`)) return
    setDeduping(true)
    setDedupResult(null)
    try {
      const deleted = await deduplicateUsers()
      setDedupResult({ ok: true, deleted })
    } catch (err) {
      console.error('Erro ao deduplicar:', err)
      setDedupResult({ ok: false })
    } finally {
      setDeduping(false)
      setTimeout(() => setDedupResult(null), 5000)
    }
  }

  const getRoleBadge = (role) => {
    const found = ROLES.find(r => r.value === role)
    return found
      ? <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${found.color}`}>{found.label}</span>
      : <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 italic">não definido</span>
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-7 h-7 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Usuários</h1>
            <p className="text-sm text-gray-500">{users.length} usuário(s) cadastrado(s)</p>
          </div>
        </div>

        {hasDuplicates && (
          <button
            onClick={handleDedup}
            disabled={deduping}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {deduping ? 'Limpando...' : `Remover duplicatas (${duplicateEmails.size})`}
          </button>
        )}
        {dedupResult?.ok && (
          <span className="text-sm text-green-600 font-medium">
            {dedupResult.deleted} duplicata(s) removida(s)!
          </span>
        )}
        {dedupResult?.ok === false && (
          <span className="text-sm text-red-600 font-medium">Erro ao remover duplicatas.</span>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuário</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Perfil</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Alterar role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-gray-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Nenhum usuário encontrado</p>
                </td>
              </tr>
            ) : (
              filtered.map(u => {
                const uid = u.id || u.uid
                const userName = u.displayName || u.name || u.email
                const isDuplicate = duplicateEmails.has(u.email?.toLowerCase())
                return (
                  <tr key={uid} className={`hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${isDuplicate ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                    {/* Usuário */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm flex-shrink-0">
                          {(userName || '?')[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{userName}</p>
                            {isDuplicate && <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded font-medium flex-shrink-0">duplicado</span>}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Perfil */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getRoleBadge(u.role)}
                        {u.profileCompleted
                          ? <CheckCircle className="w-3.5 h-3.5 text-green-500" title="Perfil completo" />
                          : <AlertCircle className="w-3.5 h-3.5 text-amber-400" title="Perfil pendente" />
                        }
                      </div>
                    </td>

                    {/* Alterar role */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={u.role || ''}
                          onChange={e => handleRoleChange(uid, e.target.value)}
                          disabled={saving[uid]}
                          className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          <option value="">— selecione —</option>
                          {ROLES.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                        {saving[uid] && <span className="text-xs text-gray-400">Salvando...</span>}
                        {feedback[uid] === 'ok' && <span className="text-xs text-green-600 font-medium">Salvo!</span>}
                        {feedback[uid] === 'reset' && <span className="text-xs text-amber-600 font-medium">Perfil resetado!</span>}
                        {feedback[uid] === 'erro' && <span className="text-xs text-red-600 font-medium">Erro</span>}
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleResetProfile(uid, userName)}
                        disabled={saving[`reset_${uid}`]}
                        title="Forçar o usuário a reescolher sua função no próximo login"
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-50 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Resetar perfil
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        "Resetar perfil" força o usuário a escolher sua função novamente no próximo login.
      </p>
    </div>
  )
}
