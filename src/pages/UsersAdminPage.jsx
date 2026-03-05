import { useState, useEffect } from 'react'
import { Shield, Users, Search } from 'lucide-react'
import { subscribeToUsers, updateUserRole } from '../firebase'

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

  const getRoleBadge = (role) => {
    const found = ROLES.find(r => r.value === role)
    return found
      ? <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${found.color}`}>{found.label}</span>
      : <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{role || 'indefinido'}</span>
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-7 h-7 text-red-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Usuários</h1>
          <p className="text-sm text-gray-500">{users.length} usuário(s) cadastrado(s)</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuário</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role atual</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Alterar role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
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
              filtered.map(u => (
                <tr key={u.id || u.uid} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm flex-shrink-0">
                        {(u.displayName || u.name || u.email || '?')[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {u.displayName || u.name || '—'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getRoleBadge(u.role)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role || ''}
                      onChange={e => handleRoleChange(u.id || u.uid, e.target.value)}
                      disabled={saving[u.id || u.uid]}
                      className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {ROLES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {saving[u.id || u.uid] && (
                      <span className="text-gray-400">Salvando...</span>
                    )}
                    {feedback[u.id || u.uid] === 'ok' && (
                      <span className="text-green-600 font-medium">Salvo!</span>
                    )}
                    {feedback[u.id || u.uid] === 'erro' && (
                      <span className="text-red-600 font-medium">Erro</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        Alterações são salvas imediatamente e aplicadas no próximo login do usuário.
      </p>
    </div>
  )
}
