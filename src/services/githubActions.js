// Serviço para integração com GitHub Actions
const GITHUB_API_BASE = 'https://api.github.com'
const REPO_OWNER = 'OrquestraIA'
const REPO_NAME = 'TestsDoc-Simples'
const WORKFLOW_FILE = 'playwright-custom-report-test.yml' // Nome do arquivo do workflow

/**
 * Dispara uma execução do workflow de testes Playwright
 * @param {string} token - GitHub Personal Access Token
 * @param {string} testPath - Caminho do teste (ex: tests/auth/login.spec.ts) ou vazio para todos
 * @param {string} environment - Ambiente (ex: homolog, prod)
 * @returns {Promise<Object>} Dados da execução disparada
 */
export async function triggerPlaywrightTests(token, testPath = '', environment = 'homolog') {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/dispatches`
  
  // Preparar inputs - só incluir spec se não estiver vazio
  const inputs = {}
  if (testPath && testPath.trim()) {
    inputs['spec'] = testPath.trim()  // O workflow usa 'spec', não 'test_path'
  }
  if (environment) {
    inputs['environment'] = environment
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main', // ou a branch que você usa
      inputs: inputs
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Erro ao disparar testes: ${error.message || response.statusText}`)
  }

  // A API retorna 204 No Content em sucesso
  return {
    success: true,
    triggeredAt: new Date().toISOString()
  }
}

/**
 * Lista as execuções recentes do workflow
 * @param {string} token - GitHub Personal Access Token
 * @param {number} perPage - Número de execuções para retornar
 * @returns {Promise<Array>} Lista de execuções
 */
export async function listWorkflowRuns(token, perPage = 10) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/runs?per_page=${perPage}`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar execuções: ${response.statusText}`)
  }

  const data = await response.json()
  return data.workflow_runs.map(run => ({
    id: run.id,
    runNumber: run.run_number,
    status: run.status, // queued, in_progress, completed
    conclusion: run.conclusion, // success, failure, cancelled, null
    createdAt: run.created_at,
    updatedAt: run.updated_at,
    htmlUrl: run.html_url,
    actor: run.actor?.login,
    headBranch: run.head_branch
  }))
}

/**
 * Obtém detalhes de uma execução específica
 * @param {string} token - GitHub Personal Access Token
 * @param {number} runId - ID da execução
 * @returns {Promise<Object>} Detalhes da execução
 */
export async function getWorkflowRun(token, runId) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs/${runId}`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar execução: ${response.statusText}`)
  }

  const run = await response.json()
  return {
    id: run.id,
    runNumber: run.run_number,
    status: run.status,
    conclusion: run.conclusion,
    createdAt: run.created_at,
    updatedAt: run.updated_at,
    htmlUrl: run.html_url,
    actor: run.actor?.login,
    headBranch: run.head_branch,
    runStartedAt: run.run_started_at
  }
}

/**
 * Obtém os artefatos de uma execução (pode incluir reports)
 * @param {string} token - GitHub Personal Access Token
 * @param {number} runId - ID da execução
 * @returns {Promise<Array>} Lista de artefatos
 */
export async function getWorkflowArtifacts(token, runId) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs/${runId}/artifacts`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar artefatos: ${response.statusText}`)
  }

  const data = await response.json()
  return data.artifacts.map(artifact => ({
    id: artifact.id,
    name: artifact.name,
    sizeInBytes: artifact.size_in_bytes,
    url: artifact.archive_download_url,
    expired: artifact.expired,
    createdAt: artifact.created_at
  }))
}

/**
 * Cancela uma execução em andamento
 * @param {string} token - GitHub Personal Access Token
 * @param {number} runId - ID da execução
 * @returns {Promise<Object>}
 */
export async function cancelWorkflowRun(token, runId) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs/${runId}/cancel`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao cancelar execução: ${response.statusText}`)
  }

  return { success: true }
}

/**
 * Gera a URL do report no GitHub Pages
 * @param {number} runNumber - Número da execução
 * @param {string} environment - Ambiente da execução (homolog, prod, dev)
 * @returns {string} URL do report
 */
export function getReportUrl(runNumber, environment = 'homolog') {
  // O GitHub Pages publica o relatório customizado na raiz
  // O workflow publica em: custom-report-{environment}
  return `https://${REPO_OWNER.toLowerCase()}.github.io/${REPO_NAME}/`
}

/**
 * Verifica se o report está disponível no GitHub Pages
 * @param {string} reportUrl - URL do report
 * @returns {Promise<boolean>}
 */
export async function checkReportAvailability(reportUrl) {
  try {
    const response = await fetch(reportUrl, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    return false
  }
}

/**
 * Lista os runners do repositório e seus status
 * @param {string} token - GitHub Personal Access Token
 * @returns {Promise<Array>} Lista de runners com status
 */
export async function listRunners(token) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/runners`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar runners: ${response.statusText}`)
  }

  const data = await response.json()
  return data.runners.map(runner => ({
    id: runner.id,
    name: runner.name,
    status: runner.status, // online, offline
    busy: runner.busy,
    labels: runner.labels.map(l => l.name),
    os: runner.os
  }))
}

/**
 * Verifica se há runners online disponíveis
 * @param {string} token - GitHub Personal Access Token
 * @returns {Promise<Object>} Status dos runners
 */
export async function checkRunnersAvailability(token) {
  try {
    const runners = await listRunners(token)
    const onlineRunners = runners.filter(r => r.status === 'online')
    const availableRunners = onlineRunners.filter(r => !r.busy)
    
    return {
      total: runners.length,
      online: onlineRunners.length,
      available: availableRunners.length,
      runners: runners,
      hasAvailable: availableRunners.length > 0
    }
  } catch (error) {
    console.error('Erro ao verificar runners:', error)
    return {
      total: 0,
      online: 0,
      available: 0,
      runners: [],
      hasAvailable: false,
      error: error.message
    }
  }
}

/**
 * Lista os jobs de uma execução
 * @param {string} token - GitHub Personal Access Token
 * @param {number} runId - ID da execução
 * @returns {Promise<Array>} Lista de jobs
 */
export async function getWorkflowJobs(token, runId) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs/${runId}/jobs`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar jobs: ${response.statusText}`)
  }

  const data = await response.json()
  return data.jobs.map(job => ({
    id: job.id,
    name: job.name,
    status: job.status,
    conclusion: job.conclusion,
    startedAt: job.started_at,
    completedAt: job.completed_at,
    steps: job.steps?.map(step => ({
      name: step.name,
      status: step.status,
      conclusion: step.conclusion,
      number: step.number,
      startedAt: step.started_at,
      completedAt: step.completed_at
    }))
  }))
}

/**
 * Busca os logs de um job específico
 * @param {string} token - GitHub Personal Access Token
 * @param {number} jobId - ID do job
 * @returns {Promise<string>} Logs em texto
 */
export async function getJobLogs(token, jobId) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/jobs/${jobId}/logs`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar logs: ${response.statusText}`)
  }

  return await response.text()
}
