# Guia Rápido: Desenvolvimento, Deploy e IA

## 1. Ambiente de Desenvolvimento
- `vite.config.js` deve permanecer com `base: './'` e porta `5173`. Isso garante que os assets (logos, rotas, etc.) funcionem em `http://localhost:5173`.
- Comandos:
  ```bash
  # Frontend
  npm run dev
  # Backend AI (porta 3001)
  cd server && npm run dev
  ```
- `.env` na raiz precisa expor a URL do backend para o Vite:
  ```env
  VITE_API_BASE_URL=http://localhost:3001/api
  ```

## 2. Alternar entre IA Real e Mock
- **Mock (sem consumir OpenAI):** em `src/pages/TestRegistrationPage.jsx` importe `../services/aiServiceMock`.
- **IA real:** troque o import para `../services/aiService`, reinicie o Vite e confirme que o backend está rodando.
- Se o backend real estiver habilitado, configure o modelo suportado (ex.: `gpt-5.2`) em `server/ai-api.js` e mantenha `OPENAI_API_KEY` válido em `server/.env`.

## 3. Resolver erros de quota
- Mensagem `429 insufficient_quota` significa que a conta OpenAI está sem créditos. Acesse o [API Dashboard](https://platform.openai.com/account/usage) → *Billing* → adicione saldo.
- Após o pagamento, reinicie `npm run dev` dentro de `server` e volte a usar o serviço real.

## 4. Processo de Deploy (GitHub Pages / gh-pages)
1. Ajuste o `vite.config.js` **temporariamente** para:
   ```js
   base: '/DocSimplesReports/'
   ```
2. Se o backend estiver hospedado em outro domínio, atualize `VITE_API_BASE_URL` para a URL pública antes do build.
3. Rode o build/deploy:
   ```bash
   npm run build     # gera dist
   npm run deploy    # envia para gh-pages
   ```
4. Após o deploy, **reverta** `base` para `'./'` para continuar desenvolvendo localmente.

## 5. Checklist rápido
- [ ] Backend rodando (porta 3001) com modelo disponível
- [ ] Frontend em `http://localhost:5173`
- [ ] `.env` com `VITE_API_BASE_URL`
- [ ] Decidir entre mock ou IA real antes de demonstrar
- [ ] Para deploy, ajustar `base` e a URL da API, depois reverter

Manter este arquivo atualizado sempre que o fluxo mudar ajuda a evitar reconfigurações manuais no futuro.
