# Aulas Node CRUD com Prisma e MongoDB

Este repositório contém exemplos de código para criar uma API CRUD (Create, Read, Update, Delete) utilizando Node.js, o ORM Prisma e o banco de dados MongoDB.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

* **Node.js:** Versão 18 ou superior. Você pode verificar sua versão executando `node -v` no terminal. Caso não tenha, você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
* **npm** (Node Package Manager): Geralmente instalado com o Node.js. Verifique sua versão com `npm -v`.
* **MongoDB:** Uma instância do MongoDB rodando localmente ou um cluster MongoDB Atlas. Você pode instalá-lo localmente seguindo as instruções em [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/) ou criar um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2).

## Configuração do Projeto

1.  **Clone este repositório** (se você tiver o código em um repositório Git). Caso contrário, crie uma nova pasta para o projeto.

2.  **Navegue até a pasta do projeto** no seu terminal:
    ```bash
    cd seu-projeto
    ```

3.  **Inicialize um novo projeto Node.js** (se você começou com uma pasta vazia):
    ```bash
    npm init -y
    ```
    Isso criará um arquivo `package.json` com as configurações padrão.

4.  **Instale as dependências:** As dependências necessárias são `express` para criar o servidor web e `@prisma/client` e `prisma` para interagir com o banco de dados MongoDB.
    ```bash
    npm install express @prisma/client prisma
    ```

5.  **Configure o Prisma:**
    * Inicialize o Prisma no seu projeto:
        ```bash
        npx prisma init --datasource-provider mongodb
        ```
        Isso criará uma pasta `prisma` com um arquivo `schema.prisma` e um arquivo `.env`.
    * **Configure a conexão com o MongoDB:** Abra o arquivo `.env` e substitua a URL de exemplo pela sua URL de conexão do MongoDB. Por exemplo:
        ```env
        DATABASE_URL="mongodb+srv://<seu_usuario>:<sua_senha>@<seu_cluster>.mongodb.net/<seu_banco_de_dados>?retryWrites=true&w=majority"
        ```
        **Importante:** Substitua `<seu_usuario>`, `<sua_senha>`, `<seu_cluster>` e `<seu_banco_de_dados>` pelas suas informações de conexão.
    * **Defina o modelo de dados:** Abra o arquivo `prisma/schema.prisma` e defina o modelo para a sua entidade de usuário. Por exemplo:
        ```prisma
        generator client {
          provider = "prisma-client-js"
        }

        datasource db {
          provider = "mongodb"
          url      = env("DATABASE_URL")
        }

        model User {
          id    String  @id @default(auto()) @map("_id") @db.ObjectId
          name  String
          age   Int
          email String  @unique
        }
        ```
    * **Gere o cliente Prisma:** Execute o seguinte comando para gerar o cliente Prisma com base no seu schema:
        ```bash
        npx prisma generate
        ```
        Este comando criará a pasta `generated` com os arquivos necessários para interagir com o seu banco de dados.

## Estrutura de Arquivos

A estrutura básica do projeto é a seguinte:<br><br>
seu-projeto/<br>
├── node_modules/<br>
├── prisma/<br>
│   ├── schema.prisma<br>
│   └── .env<br>
├── generated/<br>
│   └── prisma/<br>
│       └── index.js<br>
├── server.js<br>
├── package.json<br>
├── package-lock.json<br>
└── README.md<br><br>

* `node_modules/`: Contém as dependências instaladas pelo npm.
* `prisma/`: Contém o schema do Prisma e o arquivo de configuração do banco de dados.
* `generated/prisma/`: Contém o cliente Prisma gerado.
* `server.js`: O arquivo principal da nossa aplicação Node.js que define as rotas da API.
* `package.json`: Arquivo de manifesto do npm, contendo informações sobre o projeto e suas dependências.
* `package-lock.json`: Contém informações detalhadas sobre as versões exatas das dependências utilizadas.
* `README.md`: Este arquivo, fornecendo informações sobre o projeto.

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento, utilize o script `dev` definido no `package.json`:

```bash
npm run dev
```

Este comando executará o arquivo server.js utilizando o Node.js com a flag --watch. Isso significa que o servidor será reiniciado automaticamente sempre que você salvar alterações no código.

O servidor estará disponível em http://localhost:3333.

## Endpoints da API
A API implementa as seguintes rotas CRUD para a entidade `User`:

1. **`GET /usuarios`:** Retorna uma lista de todos os usuários cadastrados no banco de dados.

* **Status de Resposta:** `200 OK`
* **Formato da Resposta:** JSON array contendo objetos de usuário.

2. **`POST /usuarios`:** Cria um novo usuário no banco de dados. Espera um corpo de requisição JSON com os campos `name`, `age` e `email`.

* **Corpo da Requisição (Exemplo):**
```
JSON

{
    "name": "João da Silva",
    "age": 30,
    "email": "joao.silva@example.com"
}
```
* **Status de Resposta:** `201 Created`
* **Formato da Resposta:** JSON contendo o objeto do usuário criado.

3. **`PUT /usuarios/:id`:** Atualiza um usuário existente com o ID especificado no parâmetro da rota. Espera um corpo de requisição JSON com os campos `name`, `age` e/ou `email` a serem atualizados.

* **Parâmetro da Rota:** `id` (o `_id` do usuário no MongoDB).
* **Corpo da Requisição (Exemplo):**
```
JSON

{
    "name": "João Silva Atualizado",
    "age": 31
}
```
* **Status de Resposta:** `201 OK`
* **Formato da Resposta:** JSON contendo o objeto do usuário atualizado.

4. **`DELETE /usuarios/:id`:** Deleta um usuário com o ID especificado no parâmetro da rota.

* **Parâmetro da Rota:** `id` (o `_id` do usuário no MongoDB).
* **Status de Resposta:** `200 OK`
* **Formato da Resposta:** JSON com a mensagem: `{"message": "Usuário deletado com sucesso!"}`.

## Outros Exemplos de Código (Comentados)
O arquivo `server.js` também contém exemplos comentados de outras abordagens, como:

* **Simulação de Banco de Dados em Memória:** Um exemplo simples de como criar e manipular dados em um array dentro da própria aplicação.
* **Exemplos Básicos de Rotas com Express:** Demonstrações de como definir rotas `GET` e `POST` básicas com Express.
* **Verbos HTTP e Códigos de Status:** Uma breve explicação dos principais verbos HTTP (GET, POST, PUT, PATCH, DELETE) e códigos de status HTTP (2xx, 4xx, 5xx).
* **Tipos de Parâmetros em Requisições:** Explicação sobre Query Params, Route Params e Body Params.<br><br>
Esses exemplos são fornecidos para fins de aprendizado e comparação com a implementação utilizando Prisma e MongoDB.

## Próximos Passos
* Explore o código em `server.js` para entender a implementação de cada rota utilizando o Prisma Client.
* Experimente fazer requisições para os diferentes endpoints da API utilizando ferramentas como curl, Postman ou Insomnia.
* Considere adicionar validação de dados para garantir a integridade das informações enviadas para a API.
* Implemente tratamento de erros mais robusto para lidar com diferentes cenários de falha.
* Aprofunde seus conhecimentos sobre o Prisma e o MongoDB consultando suas respectivas documentações.<br><br><br>
Este README fornece uma visão geral do projeto e como executá-lo. Esperamos que seja útil para seus estudos sobre a criação de APIs CRUD com Node.js, Prisma e MongoDB!
