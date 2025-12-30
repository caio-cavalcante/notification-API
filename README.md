# 📧 API de Notificações - IF-Talentos

Microsserviço em Node.js + TypeScript para enviar e-mails da plataforma IF-Talentos (como “Fale Conosco”, confirmação de cadastro, etc.).

---

## 🚀 O que faz

- Recebe dados do formulário (nome, e-mail, mensagem) e envia um e-mail para o suporte.
- Valida os dados antes de enviar (e-mail válido, mensagem não vazia).
- Pode ser usado também para confirmação de cadastro, recuperação de senha e notificações futuras.

---

## 🛠️ Tecnologias usadas

- Node.js + TypeScript
- Express (para criar a API)
- Zod (para validar os dados)
- Resend (para enviar e-mails)
- Docker (para rodar em container)
- Render (para hospedar a API)

---

## 📦 Como rodar localmente

1. Clone o repositório:

```
git clone https://github.com/caio-cavalcante/notification-API.git
cd notification-API
```

2. Instale as dependências:

```
npm install
```

3. Crie o arquivo `.env` a partir do exemplo:

Preencha com suas informações (chave do Resend, e-mail de suporte, etc.).

4. Inicie a API:

```
npm run dev
```

A API vai rodar em `http://localhost:3001`.

---

## 🐳 Como rodar com Docker

1. Construa a imagem:

```
docker build -t notifications-api .
```

2. Rode o container:

```
docker-compose up
```

A API ficará em `http://localhost:3000`.

---

## 🌐 Como testar

Envie um POST para `/api/contact` com JSON:

```
{
  "name": "Caio C.",
  "email": "caio@email.com",
  "message": "Gostaria de saber mais sobre vagas."
}
```

- Se tudo der certo: `200 OK` com mensagem de sucesso.
- Se tiver erro (e-mail inválido, etc.): `400 Bad Request` com a mensagem do erro.

---

## ☁️ Deploy no Render

1. Conecte o repositório no Render.
2. Configure:
   - Build: `npm run build`
   - Start: `npm start`
3. Adicione as variáveis de ambiente (`.env`) no painel do Render.
4. O serviço será acessado por uma URL como `https://if-talentos-notifications-api.onrender.com`.

---
## 📚 Motivação

> “No IF-Talentos, o envio de e-mails era feito direto no PHP e não funcionava direito.  
>  
> Então, criei uma API separada em Node.js com TypeScript para cuidar só dos e-mails.  
>  
> Ela valida os dados, envia o e-mail com Resend e roda em Docker no Render.  
>  
> Assim, resolvi o problema do ‘fale conosco’ e deixei meu portfólio mais moderno, mostrando que consigo trabalhar com microsserviços e boas práticas.”
