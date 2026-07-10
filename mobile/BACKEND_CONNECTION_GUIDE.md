# 🔌 Guia de Conexão com Backend

**Data**: 1 de junho de 2026  
**Status**: ✅ Configurado

---

## 🐛 Problema

O app mobile não consegue conectar ao backend no Railway:
```
URL: https://projectofinalesii-production.up.railway.app
```

**Causa**: O app estava usando `localhost` por padrão.

---

## ✅ Solução Implementada

### 1. Arquivo `.env` Criado

Criei o arquivo `mobile/.env` com:

```env
EXPO_PUBLIC_API_URL=https://projectofinalesii-production.up.railway.app/api
```

### 2. Como Funciona

O arquivo `src/services/api.ts` já está configurado para usar a variável de ambiente:

```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 
  Platform.select({
    android: 'http://10.0.2.2:8080/api',
    default: 'http://localhost:8080/api',
  });
```

**Prioridade**:
1. Se `EXPO_PUBLIC_API_URL` existir → usa essa URL
2. Senão → usa localhost (ou 10.0.2.2 no Android)

---

## 🚀 Como Usar

### Passo 1: Parar o Expo

```bash
# Pressione Ctrl+C no terminal onde Expo está rodando
```

### Passo 2: Limpar Cache

```bash
cd mobile
npx expo start --clear
```

### Passo 3: Recarregar App

No dispositivo:
1. **Shake** o dispositivo
2. Toque em **"Reload"**

Ou:
- Pressione `r` no terminal do Expo

---

## 📱 Configurações por Ambiente

### Produção (Railway)

```env
# mobile/.env
EXPO_PUBLIC_API_URL=https://projectofinalesii-production.up.railway.app/api
```

---

### Desenvolvimento Local

```env
# mobile/.env
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

**Nota**: No emulador Android, use `http://10.0.2.2:8080/api`

---

### Dispositivo Físico (mesma rede WiFi)

```env
# mobile/.env
EXPO_PUBLIC_API_URL=http://192.168.1.x:8080/api
```

**Como descobrir o IP**:
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig | findstr IPv4
```

---

## 🧪 Testar Conexão

### 1. Verificar se Backend está Online

```bash
curl https://projectofinalesii-production.up.railway.app/api/health
```

**Resposta esperada**:
```json
{
  "status": "UP"
}
```

---

### 2. Testar Login no App

1. Abra o app
2. Vá para tela de Login
3. Tente fazer login com:
   - Email: qualquer email cadastrado
   - Senha: qualquer senha

**Se funcionar**:
- ✅ Conexão estabelecida!

**Se não funcionar**:
- Ver seção Troubleshooting abaixo

---

## 🐛 Troubleshooting

### Erro: "Network request failed"

**Possíveis causas**:
1. Backend offline
2. URL incorreta
3. CORS não configurado
4. Firewall bloqueando

**Soluções**:

#### 1. Verificar se Backend está Online
```bash
curl -I https://projectofinalesii-production.up.railway.app
```

#### 2. Verificar URL no .env
```bash
cat mobile/.env
```

Deve ser:
```
EXPO_PUBLIC_API_URL=https://projectofinalesii-production.up.railway.app/api
```

#### 3. Limpar cache e recarregar
```bash
# Parar Expo (Ctrl+C)
npx expo start --clear
# Recarregar app (shake → reload)
```

#### 4. Ver logs do Expo
No terminal do Expo, procure por:
```
[API] Connecting to: https://projectofinalesii-production.up.railway.app/api
```

---

### Erro: "CORS policy"

**Causa**: Backend bloqueando requisições do app mobile.

**Solução**: Configure CORS no backend Spring Boot.

Adicione no `application.yml` ou `WebSecurityConfig.java`:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(false);
            }
        };
    }
}
```

---

### Backend retorna 404

**Causa**: Endpoint não existe ou rota incorreta.

**Verificar**:
1. URL base tem `/api` no final?
2. Endpoint existe no backend?

**Testar manualmente**:
```bash
# Listar conteúdos
curl https://projectofinalesii-production.up.railway.app/api/contents

# Login
curl -X POST https://projectofinalesii-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

---

### Backend retorna 401 Unauthorized

**Causa**: Token JWT inválido ou expirado.

**Solução**:
1. Faça logout no app
2. Faça login novamente

No código, o token é armazenado em:
```typescript
let authToken: string | null = null;
```

Limpar com:
```typescript
logout(); // Remove token
```

---

## 🔧 Configuração Avançada

### Múltiplos Ambientes

Crie arquivos separados:

**`.env.development`**:
```env
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

**`.env.staging`**:
```env
EXPO_PUBLIC_API_URL=https://eha-staging.railway.app/api
```

**`.env.production`**:
```env
EXPO_PUBLIC_API_URL=https://projectofinalesii-production.up.railway.app/api
```

Usar com:
```bash
# Development
cp .env.development .env
npx expo start

# Production
cp .env.production .env
npx expo start
```

---

### Variáveis Dinâmicas

Para trocar ambiente sem reiniciar:

```typescript
// src/config/env.ts
export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api',
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
};

// Usar em api.ts
import { ENV } from '../config/env';
const API_URL = ENV.API_URL;
```

---

## 📊 Checklist

### Setup Inicial
- [x] Criar arquivo `.env`
- [x] Adicionar `EXPO_PUBLIC_API_URL`
- [ ] Parar Expo
- [ ] Iniciar com `--clear`
- [ ] Recarregar app

### Testes
- [ ] Verificar backend está online
- [ ] Testar login no app
- [ ] Testar carregar conteúdos
- [ ] Testar carregar quizzes
- [ ] Testar ver perfil

### Produção
- [ ] Configurar CORS no backend
- [ ] Testar em dispositivo físico
- [ ] Testar com internet lenta
- [ ] Testar timeout de requests
- [ ] Configurar error handling

---

## 🎯 Próximos Passos

### 1. Imediato (Você)
```bash
cd mobile
npx expo start --clear
```

### 2. No App
- Shake → Reload
- Testar login

### 3. Se Não Funcionar
- Ver logs do Expo
- Ver logs do backend no Railway
- Testar URL no browser
- Ver seção Troubleshooting

---

## 📱 Comandos Úteis

```bash
# Limpar cache e iniciar
npx expo start --clear

# Ver logs detalhados
npx expo start --clear --dev-client

# Iniciar em modo tunnel (se LAN não funcionar)
npx expo start --tunnel

# Ver variáveis de ambiente
echo $EXPO_PUBLIC_API_URL

# Verificar se .env existe
cat .env

# Testar backend
curl -I https://projectofinalesii-production.up.railway.app/api/health
```

---

## 🔍 Debug

### Ver Requisições no App

Adicione logs temporários em `api.ts`:

```typescript
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  console.log(`[API] ${init?.method || 'GET'} ${API_URL}${path}`);
  
  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  
  console.log(`[API] Response: ${response.status}`);
  
  // ... resto do código
}
```

Depois veja os logs no terminal do Expo.

---

## 📚 Recursos

- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Railway Docs](https://docs.railway.app/)
- [React Native Networking](https://reactnative.dev/docs/network)
- [CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## 🎉 Conclusão

**A configuração está pronta!**

Agora basta:
1. ✅ Parar Expo (Ctrl+C)
2. ✅ Iniciar com cache limpo: `npx expo start --clear`
3. ✅ Recarregar app (Shake → Reload)
4. ✅ Testar login/features

**O app deve conectar ao backend no Railway!** 🚀

---

**Desenvolvido por**: Kiro AI  
**Data**: 1 de junho de 2026  
**Status**: ✅ Configurado - Pronto para Conectar

