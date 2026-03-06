import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ROLES = [
  { value: 'desenvolvedor', label: 'Desenvolvedor', description: 'Desenvolvo e corrijo funcionalidades' },
  { value: 'operacao', label: 'Operação', description: 'Valido e homolgo as entregas' },
  { value: 'qa', label: 'QA', description: 'Testo, documento e garanto a qualidade' },
]

export default function ProfileSetupModal({ user, onComplete }) {
  const [name, setName] = useState(user?.name || user?.displayName || '')
  const [role, setRole] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!name.trim()) { setError('Informe seu nome.'); return }
    if (!role) { setError('Selecione sua função no time.'); return }
    setError('')
    setSaving(true)
    try {
      const uid = user?.uid || user?.id
      const userRef = doc(db, 'users', uid)
      const updates = {
        name: name.trim(),
        displayName: name.trim(),
        role,
        profileCompleted: true
      }
      await updateDoc(userRef, updates)
      onComplete(updates)
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
      setError('Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bem-vindo!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Antes de continuar, informe seu nome e sua função no time.
          </p>
        </div>

        <div className="space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Como prefere ser chamado(a)?"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Função */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sua função no time
            </label>
            <div className="space-y-2">
              {ROLES.map(r => (
                <label
                  key={r.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    role === r.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    checked={role === r.value}
                    onChange={() => setRole(r.value)}
                    className="mt-0.5 accent-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{r.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{r.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {saving ? 'Salvando...' : 'Salvar e Continuar'}
          </button>
        </div>
      </div>
    </div>
  )
}
