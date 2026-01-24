// Serviço de envio de emails via Firebase Cloud Functions

const FUNCTIONS_BASE_URL = 'https://us-central1-docsimplesreports.cloudfunctions.net'

/**
 * Envia email de notificação quando uma tarefa é atribuída
 * @param {Object} task - Dados da tarefa
 * @param {Object} assignee - Dados do responsável (id, name, email)
 * @param {string} assignedBy - Nome de quem atribuiu a tarefa
 */
export const sendTaskAssignmentEmail = async (task, assignee, assignedBy) => {
  try {
    if (!assignee?.email) {
      console.warn('Email do responsável não disponível')
      return { success: false, message: 'Email não disponível' }
    }

    const response = await fetch(`${FUNCTIONS_BASE_URL}/sendTaskAssignmentEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: {
          id: task.id,
          title: task.title,
          description: task.description,
          type: task.type,
          priority: task.priority,
          status: task.status
        },
        assignee: {
          id: assignee.id,
          name: assignee.name,
          email: assignee.email
        },
        assignedBy
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro ao enviar email:', errorData)
      return { success: false, message: errorData.error || 'Erro ao enviar email' }
    }

    const result = await response.json()
    return { success: true, message: 'Email enviado com sucesso' }
  } catch (error) {
    console.error('Erro no serviço de email:', error)
    return { success: false, message: error.message }
  }
}
