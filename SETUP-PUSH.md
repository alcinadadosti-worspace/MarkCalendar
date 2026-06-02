# Setup Push Notifications (FCM)

Voce vai precisar de ~15 minutos para configurar. Siga em ordem:

## 1. Ativar Blaze Plan (gratis para uso pequeno)

1. Acesse https://console.firebase.google.com
2. Selecione o projeto `calendario-equipe-34d15`
3. No canto inferior esquerdo, clique em **Spark** (plano atual)
4. Clique em **Modify plan** > **Blaze (pay as you go)**
5. Adicione um cartao de credito (obrigatorio pela politica do Google)
6. **IMPORTANTE**: Configure um alerta de orcamento:
   - Va em **Settings** > **Usage and billing** > **Details & settings**
   - Clique em **Modify plan** > **Set budget alert**
   - Coloque **R$ 5,00** como limite (na pratica nunca vai chegar la)

## 2. Gerar VAPID Key (chave publica para push)

1. No Firebase Console, va em **Project settings** (engrenagem no topo)
2. Aba **Cloud Messaging**
3. Role ate **Web configuration**
4. Em **Web Push certificates**, clique em **Generate key pair**
5. **Copie a chave gerada** (algo como `BHd...`)

## 3. Colocar a VAPID Key no codigo

Abra `public/index.html` e procure por:
```javascript
const VAPID_KEY = 'COLE_AQUI_SUA_VAPID_KEY';
```

Substitua `COLE_AQUI_SUA_VAPID_KEY` pela chave que voce copiou.

Faca o mesmo em `calendar.html`.

## 4. Atualizar regras do Firestore

No Firebase Console > Firestore Database > Regras, substitua por:

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

## 5. Instalar Firebase CLI (para deploy da Cloud Function)

No seu computador, abra o terminal/PowerShell e rode:

```
npm install -g firebase-tools
firebase login
```

Faca login com a mesma conta Google do projeto.

## 6. Deploy da Cloud Function

Na pasta do projeto:

```
cd C:\Users\carlo\OneDrive\Documentos\CalendarioMarketing
firebase use calendario-equipe-34d15
cd functions
npm install
cd ..
firebase deploy --only functions
```

Vai demorar uns 2-3 minutos na primeira vez. Quando terminar, voce vera algo como:
```
✔ functions[onCalendarChange] Successful create operation.
```

## 7. Pronto! Teste

1. Abra o app, faca login
2. O navegador vai pedir permissao para notificacoes — clique **Permitir**
3. Em outro navegador (ou aba anonima), entre como outro colaborador
4. Mande uma mensagem
5. A notificacao deve aparecer mesmo se o primeiro navegador estiver fechado

## Custos

Para o time de 5 pessoas:
- **FCM**: gratis (sempre)
- **Cloud Functions**: ~3.000 invocacoes/mes (gratis ate 2 milhoes)
- **Firestore**: ja usavam, dentro do gratis

Estimativa: **R$ 0,00/mes**

## Resolucao de problemas

**Notificacoes nao aparecem:**
- Verifique se autorizou no navegador (Configuracoes > Site > Notificacoes)
- iOS: precisa instalar o PWA na tela inicial e ter iOS 16.4+
- Veja o console do navegador (F12) por erros

**Erro de permissao no deploy:**
- Confirme que voce e Owner do projeto Firebase
- Tente `firebase login --reauth`

**Cloud Function nao dispara:**
- Verifique em Functions > Logs no Firebase Console
- Confirme que as regras do Firestore foram publicadas
