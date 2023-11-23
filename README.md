# Escribo API Challenge
Bem-vindo ao projeto <strong>escribo_api_challange</strong> - uma aplicação em Node.js desenvolvida para demonstrar conhecimentos nas seguintes tecnologias: 
* Express
* MongoDB - mongoose
* jsonwebtoken
* bcrypt.

## Visão Geral
O objetivo desta API é oferecer funcionalidades básicas para cadastro, validação e autenticação de usuários, utilizando práticas seguras como persistência de dados em nuvem no MongoDB Atlas, gerenciamento de dependências com o NPM, senhas criptografadas com hash, e autenticação por Bearer token.

### Funcionalidades
1. Cadastro de Usuário: Endpoint para criar um novo usuário, exigindo informações como nome, e-mail, senha e telefones.

2. Autenticação de Usuário: Endpoint para autenticar um usuário existente, gerando um token de acesso seguro (Bearer token).

3. Obtenção de Informações do Usuário Autenticado: Endpoint protegido que requer um token válido para fornecer informações sobre o usuário autenticado.

### Acesso à API
O projeto está hospedado no serviço Render e pode ser acessado através do link: https://escribo-api-challenge.onrender.com/.

## Configuração
Caso queira testar, use certifique-se de ter o Node.js e o NPM instalados localmente. Para instalar as dependências do projeto, execute o seguinte comando:
```
npm install
```
### Configuração do Banco de Dados
A aplicação utiliza o MongoDB Atlas para persistência de dados. Configure suas credenciais no arquivo .env em sua pasta raiz de projeto. 

Deixarei um usuário e senha de teste para uso se necessário no exemplo abaixo:
```
DB_USER='api_test'
DB_PASS='BdjjdJFW0LCjs6T0'
JWT_SECRET='LK23WQE98FSYDI98ABVNVS8N9D0PIHA9YASIFAS98AB4OJUHT93G8'
```

## Execução
Após configurar as dependências e o banco de dados, inicie o servidor com o seguinte comando:
```
npm run start
```
O servidor estará disponível em http://localhost:3333.


## Testes
Para executar os testes dos endpoits, pode-se usar o Postman, Insomnia ou qualquer outra aplicação de sua preferência. 
Abaixo segue o link de algumas collections que podem ser importadas no Postman para os testes:
https://drive.google.com/file/d/1y0BqMC3G-pn0EOWhOAXdtQw04bFLjFYK/view?usp=sharing

## Contribuições
Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões de melhoria, por favor, abra uma issue.

Aproveite para explorar a API! 😊