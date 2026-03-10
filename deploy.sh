#!/usr/bin/env bash
set -e

VITE_CONFIG="vite.config.js"
BASE_PROD="/DocSimplesReports/"
BASE_DEV="./"

restore() {
  echo ""
  echo "Revertendo base para desenvolvimento ('$BASE_DEV')..."
  sed -i "s|base: '$BASE_PROD'|base: '$BASE_DEV'|" "$VITE_CONFIG"
  echo "vite.config.js restaurado."
}

# Garante que o base seja revertido mesmo se algo falhar
trap restore EXIT

echo "=== Deploy TestWise → GitHub Pages ==="
echo ""

# 1. Ajusta o base para produção
echo "Ajustando base para produção ('$BASE_PROD')..."
sed -i "s|base: '$BASE_DEV'|base: '$BASE_PROD'|" "$VITE_CONFIG"

# Verifica se a substituição funcionou
if ! grep -q "base: '$BASE_PROD'" "$VITE_CONFIG"; then
  echo "ERRO: Não foi possível atualizar o base em $VITE_CONFIG"
  echo "Verifique se o arquivo contém: base: '$BASE_DEV'"
  exit 1
fi

echo "OK — base ajustado."
echo ""

# 2. Build
echo "Executando build..."
npm run build
echo "Build concluído."
echo ""

# 3. Deploy
echo "Enviando para gh-pages..."
npx gh-pages -d dist
echo ""
echo "=== Deploy finalizado! ==="
echo "URL: https://OrquestraIA.github.io/DocSimplesReports"
