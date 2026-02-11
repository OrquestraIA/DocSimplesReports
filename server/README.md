# TestWise AI API

Backend API para integração com inteligência artificial no TestWise/docSimplesReports.

## 🚀 Configuração Rápida

1. **Instalar dependências:**
   ```bash
   cd server
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Editar .env com sua chave da OpenAI
   ```

3. **Iniciar servidor:**
   ```bash
   npm start
   # ou para desenvolvimento:
   npm run dev
   ```

## 📡 Endpoints

### Gerar Casos de Teste
```
POST /api/ai/generate-test-cases
```

**Body:**
```json
{
  "requirements": ["Login com email e senha", "Recuperação de senha"],
  "module": "Autenticação"
}
```

### Analisar Evidências
```
POST /api/ai/analyze-evidence
```

**Body:**
```json
{
  "evidenceData": [
    {
      "id": "ev1",
      "type": "image",
      "description": "Erro na tela de login"
    }
  ]
}
```

### Sugerir Prioridades
```
POST /api/ai/suggest-priorities
```

**Body:**
```json
{
  "tasks": [
    {
      "id": "task1",
      "title": "Corrigir bug do login",
      "type": "bug"
    }
  ],
  "teamCapacity": 5
}
```

### Gerar Passos de Teste
```
POST /api/ai/generate-steps
```

**Body:**
```json
{
  "description": "Validar login do usuário com credenciais válidas"
}
```

## 🔧 Variáveis de Ambiente

- `OPENAI_API_KEY`: Chave da API da OpenAI (obrigatório)
- `PORT`: Porta do servidor (padrão: 3001)
- `NODE_ENV`: Ambiente (development/production)

## 🏥 Health Check

```
GET /api/health
```

## 📝 Notas

- O servidor usa GPT-4 para melhor qualidade nas respostas
- Rate limiting deve ser implementado em produção
- Logs detalhados no console para debugging
