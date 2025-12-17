# DocSimples Reports

Sistema de documentação de testes de homologação com geração automática de cenários Gherkin e código Playwright.

## Funcionalidades

### Para a Colaboradora (Testadora)
- **Registrar Teste de Homologação**: Formulário completo para documentar testes realizados
  - Informações básicas (título, feature, módulo, tipo, prioridade)
  - Pré-condições do teste
  - Passos do teste com ação, resultado esperado e resultado obtido
  - Elementos da interface (para geração de selectors Playwright)
  - Observações e evidências

### Para o Líder/Analista
- **Visualizar Documentos**: Lista todos os testes registrados com filtros e busca
- **Gerar Gherkin**: Converte automaticamente os testes para formato Gherkin (BDD)
- **Gerar Playwright**: Gera código base para testes automatizados com Playwright
- **Tabela de Partição**: Gerencia requisitos com classes de equivalência e valores limite
  - Classes de entrada (válidas e inválidas)
  - Classes de saída
  - Valores limite (boundary)
  - Exportação automática para Gherkin

## Tecnologias

- **React 18** - Framework frontend
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **React Router** - Navegação
- **Lucide React** - Ícones
- **LocalStorage** - Persistência de dados

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── App.jsx                    # Componente principal e rotas
├── main.jsx                   # Entry point
├── index.css                  # Estilos globais (Tailwind)
└── pages/
    ├── HomePage.jsx           # Dashboard inicial
    ├── TestRegistrationPage.jsx   # Registro de testes (colaboradora)
    ├── DocumentViewerPage.jsx     # Visualização de documentos
    ├── GherkinGeneratorPage.jsx   # Gerador de Gherkin + Playwright
    └── PartitionTablePage.jsx     # Tabela de partição de equivalência
```

## Fluxo de Uso

### 1. Colaboradora registra teste
1. Acessa "Registrar Teste"
2. Preenche informações do teste realizado
3. Adiciona passos com resultados esperados e obtidos
4. Registra elementos da interface interagidos (opcional, para Playwright)
5. Salva o documento

### 2. Líder gera documentação
1. Acessa "Documentos" para revisar testes
2. Acessa "Gerar Gherkin" para converter para formato BDD
3. Copia ou exporta o código Gherkin e Playwright gerados

### 3. Requisitos com Tabela de Partição
1. Acessa "Tabela Partição"
2. Cadastra requisito com classes de equivalência
3. Define valores válidos, inválidos e limites
4. Exporta cenários Gherkin automaticamente gerados

## Formato Gherkin Gerado

```gherkin
# language: pt

Funcionalidade: Autenticação

  Cenário: Validar login com credenciais válidas
    Dado que o usuário está na página de login
    Quando o usuário informa email válido
    E o usuário informa senha válida
    E clica no botão entrar
    Então o sistema deve redirecionar para o dashboard
```

## Código Playwright Gerado

```typescript
import { test, expect } from '@playwright/test';

test.describe('Autenticação', () => {
  test('Validar login com credenciais válidas', async ({ page }) => {
    const btn_login = '#btn-login';
    const input_email = '#email';
    
    await page.goto('URL_DA_APLICACAO');
    
    // Passo 1: Informar email
    await page.fill(input_email, 'VALOR');
    
    // Passo 2: Clicar no botão
    await page.click(btn_login);
  });
});
```

## Licença

MIT
