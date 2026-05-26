# Setup: Firebase + Render

## 1. Criar projeto no Firebase (gratis)

1. Acesse https://console.firebase.google.com
2. Clique em **Adicionar projeto**
3. De um nome (ex: `calendario-equipe`)
4. Desabilite Google Analytics (nao precisa)
5. Clique em **Criar projeto**

## 2. Ativar Firestore

1. No menu lateral, va em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Iniciar no modo de teste** (depois ajustamos as regras)
4. Selecione a localizacao mais proxima (ex: `southamerica-east1` para Sao Paulo)
5. Clique em **Ativar**

## 3. Pegar as credenciais do Firebase

1. No menu lateral, clique na engrenagem > **Configuracoes do projeto**
2. Role ate **Seus apps** e clique no icone `</>` (Web)
3. De um apelido ao app (ex: `calendario-web`)
4. **NAO marque** Firebase Hosting
5. Clique em **Registrar app**
6. Copie os valores do `firebaseConfig` que aparecerao

## 4. Colocar as credenciais no codigo

Abra `public/index.html` e substitua os valores placeholder:

```javascript
const firebaseConfig = {
  apiKey:            "SUA_API_KEY",           // <-- cole aqui
  authDomain:        "SEU_PROJETO.firebaseapp.com",
  projectId:         "SEU_PROJETO",           // <-- cole aqui
  storageBucket:     "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "123456789",             // <-- cole aqui
  appId:             "1:123456789:web:abcdef" // <-- cole aqui
};
```

## 5. Configurar regras de seguranca do Firestore

No Firebase Console:
1. Va em **Firestore Database** > aba **Regras**
2. Substitua o conteudo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /calendarData/{docId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Clique em **Publicar**

> **Nota:** Essas regras permitem leitura/escrita publica. Como o app ja tem
> controle admin/viewer via senha, isso e suficiente para um time pequeno.
> Se quiser mais seguranca no futuro, pode adicionar Firebase Authentication.

## 6. Deploy no Render

1. Crie um repositorio no GitHub com estes arquivos:
   ```
   public/
     index.html      (o calendar.html com Firebase configurado)
   render.yaml
   ```

2. Acesse https://render.com e faca login
3. Clique em **New** > **Static Site**
4. Conecte seu repositorio GitHub
5. O Render vai detectar o `render.yaml` automaticamente
6. Clique em **Create Static Site**

Pronto! Seu calendario estara online com dados persistentes no Firebase.

## Limites gratuitos do Firebase (Spark Plan)

| Recurso | Limite diario |
|---------|--------------|
| Leituras Firestore | 50.000/dia |
| Escritas Firestore | 20.000/dia |
| Delecoes Firestore | 20.000/dia |
| Armazenamento | 1 GiB total |

Para um time de 4 pessoas, esses limites sao mais que suficientes.

## Como funciona

- **Ao abrir o app**: carrega dados do Firestore (com fallback para cache local)
- **Ao salvar evento/status**: salva no Firestore E no cache local
- **Offline**: funciona com dados do cache local
- **Todos os dispositivos**: veem os mesmos dados em tempo real
