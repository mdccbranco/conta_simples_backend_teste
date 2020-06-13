# Instação
Para rodar a API é necessário clonar ou forkar e clonar o repositório, instalar os pacotes necessários através do comando

`npm install`

E rodar a aplicação através do comando

 `npm start`

Ao iniciar o sistema, dados de teste serão automaticamente inseridos no mongodb, para isso, é necessário verificar se o mongo está rodando e, assim que aparecer a informação de que os dados foram inseridos com sucesso, acessar os endpoints da API.

# Objetivo
Desenvolver uma aplicação que disponibiliza uma API REST onde retorna uma lista de transações de uma conta.

# Stack utilizada
* Node.js
* Express
* MongoDB

## Demais ferramentas
* JWT - Para gerenciar a autenticação.
* Dotenv - Para carregar as variáveis de ambiente
* Mongo-seeding - Para inserir no banco os necessários para o teste.

# Solução apresentada
Considerando a complexidade que está por trás do armazenamento de uma conta bancária (dados do usuário e do banco, por exemplo), optou-se por inserir manualmente alguns dados no banco e, a partir desses dados. Para obter as transações bancárias de uma conta, é necessário ter o id do dono da conta e da conta em questão. 

* Ao logar na API, o usuário receberá um token, que permitirá acesso as demais rotas e o seu id no banco de dados. Com esse id, é possível obter as contas que o usuário tem cadastradas. Ao escolher uma das contas, é possível buscar os dados das transações da conta. 

* Além de garantir que o usuário esteja logado no sistema para obter as informações de conta e das transações, a API só permite que o dono da conta tenha acesso as dados da mesma.

### Dados de teste
* Foram considerados 3 usuários, 2 bancos distintos e 4 contas distintas.
* Foram consideradas apenas 2 tipos de transações, pagamento e transferencia bancária. As tranferencias foram realizadas entre usuários distintos e do mesmo usuário entre bancos diferentes.

### Observações importantes
Como o foco é a lista de transações, a API não realiza o CRUD dessa operação, até porque, no contexto bancário, o CRUD é bastante restrito no sistema.

O foco da solução entregar a lista de transações com o máximo de dados possível (conta, banco e usuário) que recebeu ou que realizou a transferência, limitando o escopo já que os relacionamentos de dados bancários adquirem uma complexidade rapidamente.

# API

| Method | Endpoint | Response (200)     | Action |
| ------ | -------- | ------------------ | ------ |
| POST    | /login     | {token, userID} | Autentica um usuário, ao receber o username e uma senha |
| GET    | /auth | {username, _id, iat} | Verifica se o usuário está autenticado, de acordo com o token |
| GET    | /accounts/:userId     | [accounts]  |Retorna todas as contas daquele usuário registradas no banco de dados |
| GET   | /transactions/:userID/:accountId | [transactions]| Retorna as transações de uma conta|


Mais detalhes sobre a API, incluindo exemplos de respostas podem ser encontrados [clicando aqui](https://documenter.getpostman.com/view/2836152/Szzhdy96). 