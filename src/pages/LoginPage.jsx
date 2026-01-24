import { useState } from 'react'
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react'
import { loginWithEmail } from '../firebase'
import { APP_VERSION } from '../version'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await loginWithEmail(email, password)
      onLogin()
    } catch (err) {
      console.error('Erro no login:', err)
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Email ou senha inválidos')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Tente novamente mais tarde.')
      } else {
        setError('Erro ao fazer login. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-[35%] bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col justify-center px-8 sm:px-12 lg:px-12 py-12">
        <div className="max-w-md mx-auto w-full">
          {/* Logos OM30 e OrquestraIA */}
          <div className="flex items-center gap-4 mb-8">
            <img src="/DocSimplesReports/logo.png" alt="OM30" className="h-12 w-auto" />
            <div className="h-10 w-px bg-slate-600"></div>
            <img src="/DocSimplesReports/logo-orquestraia-transp.png" alt="OrquestraIA" className="h-12 w-auto" />
          </div>

          {/* Logo e Título */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              Test<span className="text-green-400">Wise</span>
            </h1>
            <p className="text-slate-400 text-lg">Plataforma completa de QA, Sprints e Gestão de Desenvolvimento</p>
          </div>

          {/* Título do Formulário */}
          <h2 className="text-2xl font-semibold text-white mb-8">Faça Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Seu e-mail"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Sua senha"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-700">
            <p className="text-center text-xs text-slate-500">
              TestWise v{APP_VERSION} • Powered by OM30
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito - Imagem de Fundo */}
      <div 
        className="hidden lg:block lg:w-[65%] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/DocSimplesReports/test-wise-image.png)'
        }}
      />
    </div>
  )
}
