# Redefine Password

Projeto backend em Node.js com TypeScript e Express para gerenciar o processo de redefinição de senha via e-mail.

## Tecnologias

- Node.js
- TypeScript
- Express
- JWT (JSON Web Token) para segurança dos tokens
- Nodemailer para envio de e-mails
- dotenv para variáveis de ambiente

## Funcionalidades

- Solicitação de redefinição de senha via endpoint que envia um e-mail com token seguro
- Validação do token JWT para permitir redefinição da senha
- Atualização da senha do usuário de forma segura
- Tratamento de erros e respostas claras nas APIs

## Estrutura

- /src/routes — definição das rotas
- /src/controllers — lógica de controle das rotas
- /src/services — regras de negócio (envio de e-mail, token, atualização)
- Arquivo .env para configurar credenciais e chaves secretas

## Como usar

1. Clone o repositório
2. Instale as dependências: npm install
3. Configure as variáveis de ambiente no arquivo .env
4. Rode o servidor em modo desenvolvimento: npm run dev
5. Utilize endpoints REST para solicitar e redefinir senha
