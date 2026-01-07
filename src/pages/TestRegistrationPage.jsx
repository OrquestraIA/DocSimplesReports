import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Plus, Trash2, AlertCircle, CheckCircle, Upload, Image, X, Loader2 } from 'lucide-react'
import { uploadScreenshot } from '../firebase'

export default function TestRegistrationPage({ onSave }) {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [screenshots, setScreenshots] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    requirement: '',
    requirementDescription: '',
    feature: '',
    module: '',
    testType: 'funcional',
    priority: 'media',
    status: 'pendente',
    tester: '',
    environment: '',
    errorType: '',
    improvement: '',
    improvementJustification: '',
    preconditions: '',
    steps: [{ action: '', expectedResult: '', actualResult: '', status: 'pendente' }],
    observations: '',
    evidences: '',
    elements: [{ name: '', selector: '', type: 'button' }],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps]
    newSteps[index][field] = value
    setFormData({ ...formData, steps: newSteps })
  }

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { action: '', expectedResult: '', actualResult: '', status: 'pendente' }]
    })
  }

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index)
      setFormData({ ...formData, steps: newSteps })
    }
  }

  const handleElementChange = (index, field, value) => {
    const newElements = [...formData.elements]
    newElements[index][field] = value
    setFormData({ ...formData, elements: newElements })
  }

  const addElement = () => {
    setFormData({
      ...formData,
      elements: [...formData.elements, { name: '', selector: '', type: 'button' }]
    })
  }

  const removeElement = (index) => {
    if (formData.elements.length > 1) {
      const newElements = formData.elements.filter((_, i) => i !== index)
      setFormData({ ...formData, elements: newElements })
    }
  }

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    setUploading(true)
    setUploadError(null)
    
    try {
      const tempId = Date.now().toString()
      const uploadPromises = files.map(file => uploadScreenshot(file, tempId))
      const uploadedFiles = await Promise.all(uploadPromises)
      setScreenshots([...screenshots, ...uploadedFiles])
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      setUploadError('Erro ao fazer upload das imagens. Verifique se o Firebase Storage está configurado.')
    } finally {
      setUploading(false)
    }
  }

  const removeScreenshot = (index) => {
    setScreenshots(screenshots.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataWithScreenshots = {
      ...formData,
      screenshots: screenshots
    }
    onSave(dataWithScreenshots)
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/documentos')
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Teste Registrado!</h2>
        <p className="text-gray-600 mt-2">Redirecionando para documentos...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Registrar Teste de Homologação</h1>
        <p className="text-gray-600 mt-1">Preencha os dados do teste realizado</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título do Teste *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Validar login com credenciais válidas"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requisito
              </label>
              <input
                type="text"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: REQ-001"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do Requisito
              </label>
              <textarea
                name="requirementDescription"
                value={formData.requirementDescription}
                onChange={handleChange}
                className="textarea-field"
                rows="2"
                placeholder="Descreva o requisito em detalhes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature/Funcionalidade *
              </label>
              <input
                type="text"
                name="feature"
                value={formData.feature}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Autenticação"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Módulo
              </label>
              <input
                type="text"
                name="module"
                value={formData.module}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Usuários"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Testador *
              </label>
              <input
                type="text"
                name="tester"
                value={formData.tester}
                onChange={handleChange}
                className="input-field"
                placeholder="Nome do testador"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Teste
              </label>
              <select
                name="testType"
                value={formData.testType}
                onChange={handleChange}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input-field"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="pendente">Pendente</option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="bloqueado">Bloqueado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ambiente
              </label>
              <input
                type="text"
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Homologação, Staging"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Erro
              </label>
              <select
                name="errorType"
                value={formData.errorType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Selecione...</option>
                <option value="bug">Bug</option>
                <option value="regra_negocio">Regra de Negócio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Melhoria */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sugestão de Melhoria</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Melhoria</label>
              <input
                type="text"
                name="improvement"
                value={formData.improvement}
                onChange={handleChange}
                className="input-field"
                placeholder="Descreva a melhoria sugerida..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Justificativa da Melhoria</label>
              <textarea
                name="improvementJustification"
                value={formData.improvementJustification}
                onChange={handleChange}
                className="textarea-field"
                rows="3"
                placeholder="Justifique por que essa melhoria é importante..."
              />
            </div>
          </div>
        </div>

        {/* Pré-condições */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pré-condições</h2>
          <textarea
            name="preconditions"
            value={formData.preconditions}
            onChange={handleChange}
            className="textarea-field"
            rows="3"
            placeholder="Descreva as pré-condições necessárias para executar o teste..."
          />
        </div>

        {/* Passos do Teste */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Passos do Teste</h2>
            <button
              type="button"
              onClick={addStep}
              className="btn-secondary flex items-center space-x-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Passo</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Passo {index + 1}</span>
                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Ação</label>
                    <input
                      type="text"
                      value={step.action}
                      onChange={(e) => handleStepChange(index, 'action', e.target.value)}
                      className="input-field"
                      placeholder="Descreva a ação executada"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Resultado Esperado</label>
                    <input
                      type="text"
                      value={step.expectedResult}
                      onChange={(e) => handleStepChange(index, 'expectedResult', e.target.value)}
                      className="input-field"
                      placeholder="O que deveria acontecer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Resultado Obtido</label>
                    <input
                      type="text"
                      value={step.actualResult}
                      onChange={(e) => handleStepChange(index, 'actualResult', e.target.value)}
                      className="input-field"
                      placeholder="O que realmente aconteceu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Status do Passo</label>
                    <select
                      value={step.status}
                      onChange={(e) => handleStepChange(index, 'status', e.target.value)}
                      className="input-field"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="passou">Passou</option>
                      <option value="falhou">Falhou</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elementos da UI (para Playwright) */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Elementos da Interface</h2>
              <p className="text-sm text-gray-500">Registre os elementos interagidos para geração de selectors Playwright</p>
            </div>
            <button
              type="button"
              onClick={addElement}
              className="btn-secondary flex items-center space-x-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Elemento</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.elements.map((element, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={element.name}
                  onChange={(e) => handleElementChange(index, 'name', e.target.value)}
                  className="input-field flex-1"
                  placeholder="Nome do elemento (ex: Botão Login)"
                />
                <input
                  type="text"
                  value={element.selector}
                  onChange={(e) => handleElementChange(index, 'selector', e.target.value)}
                  className="input-field flex-1 font-mono text-sm"
                  placeholder="Selector (ex: #btn-login, .submit-btn)"
                />
                <select
                  value={element.type}
                  onChange={(e) => handleElementChange(index, 'type', e.target.value)}
                  className="input-field w-32"
                >
                  <option value="button">Botão</option>
                  <option value="input">Input</option>
                  <option value="link">Link</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="text">Texto</option>
                  <option value="other">Outro</option>
                </select>
                {formData.elements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeElement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots/Prints */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Screenshots / Prints</h2>
              <p className="text-sm text-gray-500">Adicione prints de erros ou evidências do teste</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
              <input
                type="file"
                id="screenshot-upload"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
              <label 
                htmlFor="screenshot-upload" 
                className="cursor-pointer flex flex-col items-center"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-2" />
                    <span className="text-sm text-gray-600">Fazendo upload...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Clique para selecionar imagens</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</span>
                  </>
                )}
              </label>
            </div>
            
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
            )}
            
            {/* Preview das imagens */}
            {screenshots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={screenshot.url} 
                      alt={screenshot.name}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{screenshot.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Observações e Evidências */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Observações</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="textarea-field"
                rows="3"
                placeholder="Observações adicionais sobre o teste..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Salvar Teste</span>
          </button>
        </div>
      </form>
    </div>
  )
}
