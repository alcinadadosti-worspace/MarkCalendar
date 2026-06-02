# Setup Push Notifications com OneSignal (100% gratis, sem cartao)

Tempo total: ~10 minutos. Tudo pelo navegador, nada para instalar.

## Passo 1: Criar conta no OneSignal

1. Acesse https://onesignal.com/
2. Clique em **Sign Up Free**
3. Cadastre com seu email (gratis, sem cartao)
4. Confirme o email

## Passo 2: Criar app web push

1. Apos logar, clique em **New App/Website**
2. Da um nome: `Calendario da Equipe`
3. Escolha **Web** como plataforma
4. Clique **Next: Configure Your Platform**
5. Selecione **Typical Site** (Custom Code)
6. Em **Site Setup**:
   - Site Name: `Calendario da Equipe`
   - Site URL: `https://markcalendar.onrender.com`
   - Auto Resubscribe: **ON**
   - Default Icon URL: `https://markcalendar.onrender.com/logo.png`
7. Clique **Save**
8. Vai abrir uma tela com codigos — **NAO precisa copiar nada daqui ainda**, so feche
9. Voltando ao dashboard, clique em **Settings** > **Keys & IDs**

## Passo 3: Copiar as credenciais

Na tela de Keys & IDs:
- **OneSignal App ID** — copie esse valor
- **REST API Key** — copie esse valor tambem (clique no olho para ver)

## Passo 4: Colar no codigo (via GitHub)

1. Acesse https://github.com/alcinadadosti-worspace/MarkCalendar
2. Abra o arquivo `public/index.html`
3. Clique no lapis para editar
4. Pressione **Ctrl+F** e procure por `COLE_SEU_APP_ID_AQUI`
5. Substitua pelo OneSignal App ID
6. Logo abaixo, substitua `COLE_SUA_REST_API_KEY_AQUI` pela REST API Key
7. Role ate o fim, escreva "OneSignal config" e clique **Commit changes**

Faca o mesmo no arquivo `calendar.html`.

## Passo 5: Subir o Service Worker do OneSignal

O OneSignal precisa de um arquivo especial no servidor. Vamos baixar e colocar:

1. No GitHub, va em **public/**
2. Clique em **Add file** > **Create new file**
3. Nome do arquivo: `OneSignalSDKWorker.js`
4. Conteudo:
```
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
```
5. Commit changes
6. Espere ~1 minuto para o Render fazer redeploy

## Passo 6: Testar

1. Abra https://markcalendar.onrender.com
2. Faca login (qualquer PIN)
3. O navegador vai pedir permissao para notificacoes — **Permitir**
4. Abra outro navegador (anonima ou outro PC)
5. Entre com outro colaborador
6. **Feche o primeiro navegador completamente**
7. Mande uma mensagem do segundo para o primeiro
8. A notificacao deve aparecer no Windows/Mac/celular mesmo com o navegador fechado

## No celular

**Android:**
1. Abra o app no Chrome
2. Toque nos 3 pontos > **Adicionar a tela inicial**
3. Abra pelo icone na tela inicial
4. Faca login e autorize notificacoes
5. Push funciona mesmo com app fechado

**iPhone (iOS 16.4+):**
1. Abra no Safari
2. Toque em compartilhar > **Adicionar a tela inicial**
3. Abra pelo icone na tela inicial (importante!)
4. Faca login e autorize
5. Push funciona mesmo com app fechado

## Tipos de notificacao que serao enviadas

- 💬 Mensagem direta (quando alguem te manda mensagem)
- ⭐ Elogio recebido (quando alguem te elogia)
- @ Mencao em comentario (quando te marcam com @)
- 📅 Convite de reuniao
- 🔄 Pedido de substituicao
- 📋 Nova tarefa atribuida (quando admin cria evento pra voce)

## Custos

**R$ 0,00/mes** — sempre. OneSignal e gratis para ate 10.000 usuarios web push. Voces sao 5.

## Problemas comuns

**"Notificacoes nao chegam":**
- Verifique se autorizou (Configuracoes do navegador > Site > Notificacoes)
- iOS: SO funciona se instalou como PWA na tela inicial
- Veja o painel do OneSignal > **Audience** > **All Users** se voce aparece la

**"REST API Key invalida":**
- Confirme que copiou a REST API Key, NAO a User Auth Key
- Sem espacos extras antes/depois

**"OneSignal nao inicializa":**
- Abra DevTools (F12) > Console
- Procure por erros do OneSignal
- Verifique se o OneSignalSDKWorker.js foi criado em public/
