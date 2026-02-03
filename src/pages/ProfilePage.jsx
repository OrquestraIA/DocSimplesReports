import { useState, useRef } from 'react'
import { 
  User, Camera, Save, Loader2, Mail, Phone, Building, 
  MapPin, Calendar, Shield, CheckCircle
} from 'lucide-react'
import { uploadScreenshot, updateUserProfile } from '../firebase'
import { useToast } from '../components/Toast'

export default function ProfilePage({ currentUser, onUpdateUser }) {
  const [name, setName] = useState(currentUser?.name || '')
  const [phone, setPhone] = useState(currentUser?.phone || '')
  const [department, setDepartment] = useState(currentUser?.department || '')
  const [location, setLocation] = useState(currentUser?.location || '')
  const [bio, setBio] = useState(currentUser?.bio || '')
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)
  const toast = useToast()

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida.')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB.')
      return
    }

    setUploading(true)
    try {
      const userId = currentUser?.uid || currentUser?.id
      const uploaded = await uploadScreenshot(file, `profile_${userId}`)
      setPhotoURL(uploaded.url)
      toast.success('Foto atualizada!')
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      toast.error('Erro ao fazer upload da foto.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const userId = currentUser?.uid || currentUser?.id
      const updatedData = {
        name: name.trim(),
        phone: phone.trim(),
        department: department.trim(),
        location: location.trim(),
        bio: bio.trim(),
        photoURL,
        updatedAt: new Date().toISOString()
      }

      await updateUserProfile(userId, updatedData)
      
      if (onUpdateUser) {
        onUpdateUser({ ...currentUser, ...updatedData })
      }

      setSaved(true)
      toast.success('Perfil atualizado com sucesso!')
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
      toast.error('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const getInitials = () => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    if (currentUser?.email) {
      return currentUser.email[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie suas informações pessoais</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header com foto */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              {photoURL ? (
                <img 
                  src={photoURL} 
                  alt={name || 'Perfil'} 
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-white">{getInitials()}</span>
                </div>
              )}
              
              {/* Botão de upload de foto */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                title="Alterar foto"
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5 text-blue-500" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="pt-20 px-8 pb-8">
          {/* Info do usuário */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{name || currentUser?.email}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{currentUser?.email}</span>
            </div>
            {(department || currentUser?.department || currentUser?.role) && (
              <div className="flex items-center gap-2 mt-1">
                <Shield className={`w-4 h-4 ${
                  (department || currentUser?.department || '').toLowerCase().includes('qa') 
                    ? 'text-purple-500' 
                    : (department || currentUser?.department || '').toLowerCase().includes('op')
                      ? 'text-green-500'
                      : 'text-blue-500'
                }`} />
                <span className={`text-sm font-medium ${
                  (department || currentUser?.department || '').toLowerCase().includes('qa') 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : (department || currentUser?.department || '').toLowerCase().includes('op')
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {department || currentUser?.department || currentUser?.role}
                </span>
              </div>
            )}
          </div>

          {/* Formulário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Departamento
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ex: Desenvolvimento, QA, Operação"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Localização
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: São Paulo, SP"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sobre mim
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Uma breve descrição sobre você..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Informações da conta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Membro desde: {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</span>
              </div>
              {currentUser?.lastLogin && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Último acesso: {new Date(currentUser.lastLogin).toLocaleString('pt-BR')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botão salvar */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                saved 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } disabled:opacity-50`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : saved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar alterações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
