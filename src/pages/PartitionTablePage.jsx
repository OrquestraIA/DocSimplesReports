import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X, Download, Table2 } from 'lucide-react'

export default function PartitionTablePage({ requirements, onAdd, onUpdate, onDelete }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    inputClasses: [{ class: '', validValues: '', invalidValues: '', representative: '' }],
    outputClasses: [{ class: '', expectedResult: '' }],
    boundaryValues: '',
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      inputClasses: [{ class: '', validValues: '', invalidValues: '', representative: '' }],
      outputClasses: [{ class: '', expectedResult: '' }],
      boundaryValues: '',
    })
  }

  const handleInputClassChange = (index, field, value) => {
    const newClasses = [...formData.inputClasses]
    newClasses[index][field] = value
    setFormData({ ...formData, inputClasses: newClasses })
  }

  const addInputClass = () => {
    setFormData({
      ...formData,
      inputClasses: [...formData.inputClasses, { class: '', validValues: '', invalidValues: '', representative: '' }]
    })
  }

  const removeInputClass = (index) => {
    if (formData.inputClasses.length > 1) {
      setFormData({
        ...formData,
        inputClasses: formData.inputClasses.filter((_, i) => i !== index)
      })
    }
  }

  const handleOutputClassChange = (index, field, value) => {
    const newClasses = [...formData.outputClasses]
    newClasses[index][field] = value
    setFormData({ ...formData, outputClasses: newClasses })
  }

  const addOutputClass = () => {
    setFormData({
      ...formData,
      outputClasses: [...formData.outputClasses, { class: '', expectedResult: '' }]
    })
  }

  const removeOutputClass = (index) => {
    if (formData.outputClasses.length > 1) {
      setFormData({
        ...formData,
        outputClasses: formData.outputClasses.filter((_, i) => i !== index)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      onUpdate(editingId, formData)
      setEditingId(null)
    } else {
      onAdd(formData)
    }
    resetForm()
    setIsAdding(false)
  }

  const startEdit = (req) => {
    setFormData({
      name: req.name,
      description: req.description,
      inputClasses: req.inputClasses || [{ class: '', validValues: '', invalidValues: '', representative: '' }],
      outputClasses: req.outputClasses || [{ class: '', expectedResult: '' }],
      boundaryValues: req.boundaryValues || '',
    })
    setEditingId(req.id)
    setIsAdding(true)
  }

  const cancelEdit = () => {
    resetForm()
    setEditingId(null)
    setIsAdding(false)
  }

  const exportToGherkin = (req) => {
    let gherkin = `# language: pt\n\n`
    gherkin += `# Requisito: ${req.name}\n`
    gherkin += `# ${req.description}\n\n`
    gherkin += `Funcionalidade: ${req.name}\n\n`
    
    // Generate scenarios from input classes
    req.inputClasses?.forEach((inputClass, i) => {
      if (inputClass.validValues) {
        gherkin += `  @valido\n`
        gherkin += `  Esquema do Cenário: ${req.name} - Valores válidos para ${inputClass.class}\n`
        gherkin += `    Dado que o usuário está na tela de ${req.name.toLowerCase()}\n`
        gherkin += `    Quando o usuário informa <valor> no campo "${inputClass.class}"\n`
        gherkin += `    Então o sistema deve aceitar o valor\n\n`
        gherkin += `    Exemplos:\n`
        gherkin += `      | valor |\n`
        inputClass.validValues.split(',').forEach(val => {
          gherkin += `      | ${val.trim()} |\n`
        })
        gherkin += `\n`
      }
      
      if (inputClass.invalidValues) {
        gherkin += `  @invalido\n`
        gherkin += `  Esquema do Cenário: ${req.name} - Valores inválidos para ${inputClass.class}\n`
        gherkin += `    Dado que o usuário está na tela de ${req.name.toLowerCase()}\n`
        gherkin += `    Quando o usuário informa <valor> no campo "${inputClass.class}"\n`
        gherkin += `    Então o sistema deve rejeitar o valor\n`
        gherkin += `    E exibir mensagem de erro apropriada\n\n`
        gherkin += `    Exemplos:\n`
        gherkin += `      | valor |\n`
        inputClass.invalidValues.split(',').forEach(val => {
          gherkin += `      | ${val.trim()} |\n`
        })
        gherkin += `\n`
      }
    })
    
    // Boundary values
    if (req.boundaryValues) {
      gherkin += `  @limite\n`
      gherkin += `  Cenário: ${req.name} - Teste de valores limite\n`
      gherkin += `    # Valores limite: ${req.boundaryValues}\n`
      gherkin += `    Dado que o usuário está na tela de ${req.name.toLowerCase()}\n`
      gherkin += `    Quando o usuário testa os valores limite\n`
      gherkin += `    Então o sistema deve comportar-se corretamente nos limites\n\n`
    }
    
    return gherkin
  }

  const downloadGherkin = (req) => {
    const content = exportToGherkin(req)
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${req.name.replace(/\s+/g, '-').toLowerCase()}.feature`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tabela de Partição de Equivalência</h1>
          <p className="text-gray-600 mt-1">
            Gerencie requisitos com classes de equivalência e valores limite
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Requisito</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Editar Requisito' : 'Novo Requisito'}
            </h2>
            <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Requisito *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Ex: Validação de CPF"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  placeholder="Descrição breve do requisito"
                />
              </div>
            </div>

            {/* Input Classes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Classes de Entrada (Partição)
                </label>
                <button
                  type="button"
                  onClick={addInputClass}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Adicionar Classe
                </button>
              </div>
              <div className="space-y-3">
                {formData.inputClasses.map((inputClass, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Classe {index + 1}</span>
                      {formData.inputClasses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInputClass(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Nome da Classe</label>
                        <input
                          type="text"
                          value={inputClass.class}
                          onChange={(e) => handleInputClassChange(index, 'class', e.target.value)}
                          className="input-field"
                          placeholder="Ex: Idade"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Valor Representativo</label>
                        <input
                          type="text"
                          value={inputClass.representative}
                          onChange={(e) => handleInputClassChange(index, 'representative', e.target.value)}
                          className="input-field"
                          placeholder="Ex: 25"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Valores Válidos (separados por vírgula)</label>
                        <input
                          type="text"
                          value={inputClass.validValues}
                          onChange={(e) => handleInputClassChange(index, 'validValues', e.target.value)}
                          className="input-field"
                          placeholder="Ex: 18, 25, 30, 65"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Valores Inválidos (separados por vírgula)</label>
                        <input
                          type="text"
                          value={inputClass.invalidValues}
                          onChange={(e) => handleInputClassChange(index, 'invalidValues', e.target.value)}
                          className="input-field"
                          placeholder="Ex: -1, 0, 150, abc"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Classes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Classes de Saída
                </label>
                <button
                  type="button"
                  onClick={addOutputClass}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Adicionar Saída
                </button>
              </div>
              <div className="space-y-3">
                {formData.outputClasses.map((outputClass, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={outputClass.class}
                      onChange={(e) => handleOutputClassChange(index, 'class', e.target.value)}
                      className="input-field flex-1"
                      placeholder="Classe de saída"
                    />
                    <input
                      type="text"
                      value={outputClass.expectedResult}
                      onChange={(e) => handleOutputClassChange(index, 'expectedResult', e.target.value)}
                      className="input-field flex-1"
                      placeholder="Resultado esperado"
                    />
                    {formData.outputClasses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOutputClass(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Boundary Values */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valores Limite (Boundary)
              </label>
              <textarea
                value={formData.boundaryValues}
                onChange={(e) => setFormData({ ...formData, boundaryValues: e.target.value })}
                className="textarea-field"
                rows="2"
                placeholder="Ex: Mínimo: 0, Máximo: 120, Logo abaixo: -1, Logo acima: 121"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3">
              <button type="button" onClick={cancelEdit} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Atualizar' : 'Salvar'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Requirements List */}
      {requirements.length === 0 && !isAdding ? (
        <div className="card text-center py-12">
          <Table2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum requisito cadastrado</h3>
          <p className="text-gray-600 mt-1">Adicione um requisito para criar tabelas de partição</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requirements.map((req) => (
            <div key={req.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{req.name}</h3>
                  {req.description && <p className="text-gray-600 text-sm mt-1">{req.description}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => downloadGherkin(req)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg"
                    title="Exportar Gherkin"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startEdit(req)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(req.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Input Classes Table */}
              {req.inputClasses && req.inputClasses.some(c => c.class) && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Classes de Entrada</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-gray-600 font-medium">Classe</th>
                          <th className="px-3 py-2 text-left text-gray-600 font-medium">Valores Válidos</th>
                          <th className="px-3 py-2 text-left text-gray-600 font-medium">Valores Inválidos</th>
                          <th className="px-3 py-2 text-left text-gray-600 font-medium">Representativo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {req.inputClasses.filter(c => c.class).map((c, i) => (
                          <tr key={i} className="border-t border-gray-200">
                            <td className="px-3 py-2 font-medium">{c.class}</td>
                            <td className="px-3 py-2 text-green-700">{c.validValues || '-'}</td>
                            <td className="px-3 py-2 text-red-700">{c.invalidValues || '-'}</td>
                            <td className="px-3 py-2">{c.representative || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Output Classes */}
              {req.outputClasses && req.outputClasses.some(c => c.class) && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Classes de Saída</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-gray-600 font-medium">Classe</th>
                          <th className="px-3 py-2 text-left text-gray-600 font-medium">Resultado Esperado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {req.outputClasses.filter(c => c.class).map((c, i) => (
                          <tr key={i} className="border-t border-gray-200">
                            <td className="px-3 py-2 font-medium">{c.class}</td>
                            <td className="px-3 py-2">{c.expectedResult || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Boundary Values */}
              {req.boundaryValues && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Valores Limite</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{req.boundaryValues}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
