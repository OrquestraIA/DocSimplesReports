// Serviço de integração com Jira via Firebase Cloud Functions
// As credenciais ficam seguras no servidor

// URL das Cloud Functions do Firebase
const FUNCTIONS_BASE_URL = 'https://us-central1-docsimplesreports.cloudfunctions.net'

/**
 * Cria uma issue no Jira baseada nos dados do teste
 * @param {Object} testData - Dados do teste registrado
 * @returns {Object} - Dados da issue criada (key, id, url)
 */
export const createJiraIssue = async (testData) => {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/createJiraIssue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro ao criar issue no Jira:', errorData)
      throw new Error(errorData.error || 'Erro ao criar issue no Jira')
    }

    const result = await response.json()
    
    return {
      key: result.key,
      id: result.id,
      url: result.url
    }
  } catch (error) {
    console.error('Erro na integração com Jira:', error)
    throw error
  }
}

/**
 * Adiciona um comentário a uma issue do Jira
 */
export const addJiraComment = async (issueKey, comment) => {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/addJiraComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ issueKey, comment })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro ao adicionar comentário no Jira:', errorData)
      throw new Error(`Erro ao adicionar comentário: ${JSON.stringify(errorData)}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao comentar no Jira:', error)
    throw error
  }
}
