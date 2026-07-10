#!/bin/bash

# Script para configurar conexão com backend
# Data: 1 de junho de 2026

echo "🔌 Configurando conexão com backend..."
echo ""

# Verificar se .env existe
if [ -f ".env" ]; then
    echo "✅ Arquivo .env já existe"
    cat .env
else
    echo "📝 Criando arquivo .env..."
    cat > .env << EOF
# Backend API Configuration
EXPO_PUBLIC_API_URL=https://projectofinalesii-production.up.railway.app/api
EOF
    echo "✅ Arquivo .env criado"
fi

echo ""
echo "🧪 Testando conexão com backend..."
echo ""

# Testar se backend está online
if curl -s -o /dev/null -w "%{http_code}" "https://projectofinalesii-production.up.railway.app/api/health" | grep -q "200\|404"; then
    echo "✅ Backend está online!"
else
    echo "⚠️  Backend não respondeu (pode estar offline)"
fi

echo ""
echo "📋 Próximos passos:"
echo "1. Parar Expo (Ctrl+C se estiver rodando)"
echo "2. Executar: npx expo start --clear"
echo "3. No app, Shake → Reload"
echo ""
echo "✨ Pronto! O app deve conectar ao backend agora."
