import { useState } from 'react'
import { Code, Copy, Download, CheckCircle, FileText } from 'lucide-react'

export default function GherkinGeneratorPage({ documents }) {
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [gherkinOutput, setGherkinOutput] = useState('')
  const [playwrightOutput, setPlaywrightOutput] = useState('')
  const [copied, setCopied] = useState({ gherkin: false, playwright: false })

  const generateGherkin = (doc) => {
    setSelectedDoc(doc)
    
    let gherkin = `# language: pt\n\n`
    gherkin += `Funcionalidade: ${doc.feature}\n`
    if (doc.module) {
      gherkin += `  # Módulo: ${doc.module}\n`
    }
    gherkin += `  # Prioridade: ${doc.priority}\n`
    gherkin += `  # Tipo: ${doc.testType}\n\n`
    
    gherkin += `  Cenário: ${doc.title}\n`
    
    if (doc.preconditions) {
      const preconditions = doc.preconditions.split('\n').filter(p => p.trim())
      preconditions.forEach((pre, i) => {
        gherkin += `    ${i === 0 ? 'Dado' : 'E'} ${pre.trim()}\n`
      })
    }
    
    doc.steps.forEach((step, i) => {
      if (step.action) {
        const keyword = i === 0 && !doc.preconditions ? 'Dado' : 'Quando'
        gherkin += `    ${keyword} ${step.action}\n`
      }
      if (step.expectedResult) {
        gherkin += `    Então ${step.expectedResult}\n`
      }
    })
    
    setGherkinOutput(gherkin)
    
    // Generate Playwright
    let playwright = `import { test, expect } from '@playwright/test';\n\n`
    playwright += `test.describe('${doc.feature}', () => {\n`
    playwright += `  test('${doc.title}', async ({ page }) => {\n`
    
    // Add selectors as constants
    const validElements = doc.elements?.filter(el => el.name && el.selector) || []
    if (validElements.length > 0) {
      playwright += `    // Selectors\n`
      validElements.forEach(el => {
        const varName = el.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()
        playwright += `    const ${varName} = '${el.selector}';\n`
      })
      playwright += `\n`
    }
    
    // Add step comments and basic structure
    playwright += `    // Pré-condições\n`
    if (doc.preconditions) {
      playwright += `    // ${doc.preconditions.replace(/\n/g, '\n    // ')}\n`
    }
    playwright += `    await page.goto('URL_DA_APLICACAO');\n\n`
    
    doc.steps.forEach((step, i) => {
      playwright += `    // Passo ${i + 1}: ${step.action || 'N/A'}\n`
      
      // Try to generate code based on element type
      const relatedElement = validElements.find(el => 
        step.action?.toLowerCase().includes(el.name.toLowerCase())
      )
      
      if (relatedElement) {
        const varName = relatedElement.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()
        switch (relatedElement.type) {
          case 'button':
            playwright += `    await page.click(${varName});\n`
            break
          case 'input':
            playwright += `    await page.fill(${varName}, 'VALOR');\n`
            break
          case 'link':
            playwright += `    await page.click(${varName});\n`
            break
          case 'select':
            playwright += `    await page.selectOption(${varName}, 'VALOR');\n`
            break
          case 'checkbox':
          case 'radio':
            playwright += `    await page.check(${varName});\n`
            break
          case 'text':
            playwright += `    await expect(page.locator(${varName})).toBeVisible();\n`
            break
          default:
            playwright += `    await page.locator(${varName}).click();\n`
        }
      } else {
        playwright += `    // TODO: Implementar ação\n`
      }
      
      if (step.expectedResult) {
        playwright += `    // Esperado: ${step.expectedResult}\n`
        playwright += `    // await expect(page.locator('SELECTOR')).toHaveText('TEXTO');\n`
      }
      playwright += `\n`
    })
    
    playwright += `  });\n`
    playwright += `});\n`
    
    setPlaywrightOutput(playwright)
  }

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text)
    setCopied({ ...copied, [type]: true })
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000)
  }

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerador Gherkin & Playwright</h1>
        <p className="text-gray-600 mt-1">
          Selecione um documento de teste para gerar cenários Gherkin e código Playwright
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Documentos Disponíveis</h2>
            {documents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum documento disponível</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => generateGherkin(doc)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedDoc?.id === doc.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium text-gray-900 text-sm truncate">{doc.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{doc.feature}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`badge text-xs ${
                        doc.status === 'aprovado' ? 'badge-success' :
                        doc.status === 'reprovado' ? 'badge-error' : 'badge-warning'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gherkin Output */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-purple-600" />
                <h2 className="font-semibold text-gray-900">Cenário Gherkin</h2>
              </div>
              {gherkinOutput && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(gherkinOutput, 'gherkin')}
                    className="btn-secondary text-sm flex items-center space-x-1"
                  >
                    {copied.gherkin ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => downloadFile(gherkinOutput, `${selectedDoc?.feature || 'feature'}.feature`)}
                    className="btn-secondary text-sm flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
            {gherkinOutput ? (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{gherkinOutput}</code>
              </pre>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Selecione um documento para gerar o cenário Gherkin</p>
              </div>
            )}
          </div>

          {/* Playwright Output */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-gray-900">Código Playwright</h2>
              </div>
              {playwrightOutput && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(playwrightOutput, 'playwright')}
                    className="btn-secondary text-sm flex items-center space-x-1"
                  >
                    {copied.playwright ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => downloadFile(playwrightOutput, `${selectedDoc?.feature?.replace(/\s+/g, '-').toLowerCase() || 'test'}.spec.ts`)}
                    className="btn-secondary text-sm flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
            {playwrightOutput ? (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{playwrightOutput}</code>
              </pre>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Selecione um documento para gerar o código Playwright</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
