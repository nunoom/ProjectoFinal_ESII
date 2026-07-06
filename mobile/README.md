# 📱 Mobile App - Economia com História: Angola

Aplicação mobile completa com React Native e Expo.

## ✅ Telas Implementadas

### Autenticação
1. **Landing Page** ✅ - Hero, features, stats, tópicos
2. **Login** ✅ - Formulário completo com validação
3. **Register** ✅ - Formulário de registo completo

### App Principal (Bottom Tabs)
4. **Home (Dashboard)** ✅ - Stats, conteúdos recentes, quizzes, ranking
5. **Conteúdos** ✅ - Lista com pesquisa e filtros por categoria
6. **Quizzes** ✅ - Lista de quizzes com dificuldades
7. **Ranking** ✅ - Ranking completo com destaque do utilizador
8. **Perfil** ✅ - Perfil do utilizador com stats e menu

### Telas de Detalhe (Stack)
9. **Detalhe de Conteúdo** ✅ - Visualização completa de conteúdo com relacionados

## 🚀 Como Executar

```bash
cd mobile
npm install
npx expo start
```

Escaneie o QR code com o Expo Go no seu telemóvel.

## 📱 Navegação

```
Landing → Login/Register → Main App (Stack Navigator)
                              ├─ MainTabs (Bottom Tabs)
                              │   ├─ Home
                              │   ├─ Conteúdos
                              │   ├─ Quizzes
                              │   ├─ Ranking
                              │   └─ Perfil
                              └─ ContentDetail (Stack Screen)
```

## 🎨 Features

- ✅ 9 telas completas
- ✅ React Navigation (Stack + Bottom Tabs)
- ✅ Componentes reutilizáveis (Button, Card)
- ✅ Mock data completo
- ✅ Design Bordeaux (#8B0000)
- ✅ Gradientes e ícones
- ✅ Formulários com validação
- ✅ Pesquisa e filtros
- ✅ Layout responsivo
- ✅ Navegação profunda (deep linking)
- ✅ Partilha nativa
- ✅ Conteúdos relacionados

## 📊 Estrutura

```
src/
├── components/
│   ├── Button.tsx
│   └── Card.tsx
├── screens/
│   ├── LandingScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ContentsScreen.tsx
│   ├── ContentDetailScreen.tsx
│   ├── QuizzesScreen.tsx
│   ├── RankingScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/
│   ├── AuthNavigator.tsx
│   └── MainNavigator.tsx
├── data/mockData.ts
├── types/index.ts
└── constants/colors.ts
```

## 🎯 Próximos Passos

- [x] Tela de detalhe de conteúdo ✅
- [ ] Tela de fazer quiz
- [ ] Tela de resultado de quiz
- [ ] Integração com API
- [ ] AsyncStorage para offline
- [ ] Notificações push

---

**Status**: ✅ MVP Completo - 9 Telas Funcionais  
**SDK**: Expo 54  
**Data**: 1 de junho de 2026
