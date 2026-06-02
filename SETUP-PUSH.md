# Setup Push Notifications - 100% pelo Navegador

Todos os passos sao feitos no navegador, sem precisar instalar nada.
Tempo total: ~20 minutos.

## Passo 1: Ativar Blaze Plan (gratis para uso pequeno)

1. Va em https://console.firebase.google.com
2. Faca login com **alcinadadosti@gmail.com**
3. Selecione o projeto **calendario-equipe**
4. No canto inferior esquerdo da tela, voce vera **Spark** — clique
5. Clique em **Modify plan** ou **Mudar plano**
6. Selecione **Blaze (pay as you go)**
7. Adicione um cartao de credito (politica do Google, NAO vai cobrar)
8. Apos ativar, va em **Settings** > **Usage and billing** > **Details & settings**
9. Clique em **Modify plan** > **Set budget alert**
10. Coloque **R$ 5,00** como alerta (protecao extra)

## Passo 2: Gerar VAPID Key

1. Ainda no Firebase Console, clique na **engrenagem** no topo (ao lado de "Project Overview")
2. Va em **Project settings**
3. Clique na aba **Cloud Messaging**
4. Role ate **Web configuration**
5. Em **Web Push certificates**, clique em **Generate key pair**
6. Aparece uma chave longa tipo `BHd_xWv1...` — **copie ela inteira**

## Passo 3: Colar a VAPID Key no codigo (pelo GitHub)

1. Acesse https://github.com/alcinadadosti-worspace/MarkCalendar
2. Clique no arquivo **public/index.html**
3. Clique no icone do **lapis** (canto superior direito) para editar
4. Pressione **Ctrl+F** e procure por `COLE_AQUI_SUA_VAPID_KEY`
5. Substitua pelo valor copiado do Passo 2
6. Role ate o fim, escreva uma mensagem tipo "VAPID key" e clique **Commit changes**
7. **Repita os mesmos passos** no arquivo `calendar.html`

O Render vai fazer o deploy automatico em ~1 minuto.

## Passo 4: Atualizar Firestore Rules

1. Firebase Console > **Firestore Database**
2. Aba **Rules** (Regras)
3. Substitua todo o conteudo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /calendarData/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /authSetupDone/{docId} {
      allow read, write: if true;
    }
    match /pinMap/{docId} {
      allow read, write: if true;
    }
    match /fcmTokens/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Clique **Publish** (Publicar)

## Passo 5: Abrir o Cloud Shell (terminal no navegador)

1. Acesse https://console.cloud.google.com
2. Faca login com **alcinadadosti@gmail.com**
3. Selecione o projeto **calendario-equipe** no topo
4. No canto superior direito da pagina, clique no icone **>_** (Activate Cloud Shell)
5. Espera abrir uma janela de terminal na parte inferior (demora ~30 segundos na primeira vez)
6. Clique em **Continue** se aparecer alguma autorizacao

## Passo 6: Baixar o projeto no Cloud Shell

No terminal do Cloud Shell, cole estes comandos um de cada vez:

```
git clone https://github.com/alcinadadosti-worspace/MarkCalendar.git
cd MarkCalendar
ls
```

Voce deve ver as pastas `functions`, `public`, etc.

## Passo 7: Deploy da Cloud Function

Ainda no Cloud Shell:

```
cd functions
npm install
cd ..
firebase use calendario-equipe-34d15
firebase deploy --only functions
```

O `npm install` demora uns 2 minutos. O `firebase deploy` demora mais 2-3 minutos.

Quando terminar voce vera:
```
✔ Deploy complete!
Function URL (onCalendarChange): https://...
```

## Passo 8: Testar

1. Abra o app no Render: https://markcalendar.onrender.com
2. Faca login com qualquer PIN
3. O navegador vai pedir permissao para notificacoes — clique **Permitir**
4. Em outro navegador (aba anonima ou outro PC), entre com PIN diferente
5. Mande uma mensagem para a primeira conta
6. **Mesmo se voce fechar a primeira aba**, a notificacao vai aparecer

## Custos

Para o time de 5 pessoas:
- FCM: **R$ 0,00** (gratis sempre)
- Cloud Functions: **R$ 0,00** (~3.000/mes, limite 2 milhoes)
- Firestore: ja gratis no plano atual

## Problemas comuns

**"Permission denied" no deploy:**
Roda no Cloud Shell:
```
firebase logout
firebase login --no-localhost
```
Cole o codigo que aparece no navegador.

**Notificacoes nao chegam:**
- Veja Functions > Logs no Firebase Console
- iOS: precisa instalar como PWA e ter iOS 16.4+
- Verifique se autorizou notificacoes nas Configuracoes do navegador

**Cloud Shell desconecta:**
- Reabra e rode `cd MarkCalendar` para voltar ao projeto
