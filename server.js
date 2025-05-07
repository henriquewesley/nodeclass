//Usando o MongoDB e o Prisma para criar uma API
//Enviando dados para o banco de dados

import express from 'express';
import { PrismaClient } from './generated/prisma/index.js'; //Importando o PrismaClient do arquivo gerado pelo Prisma

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

app.get('/usuarios', async (request, response) => {
  const users = await prisma.user.findMany()//Busca todos os usuários no banco de dados
  response.status(200).json(users); //Retorna a lista de usuários no formato json na rota get
})

app.post('/usuarios', async (request, response) => { //criando função assíncrona com o async
  const user = await prisma.user.create({ //O await faz com que a função seja executada esperando uma resposta do banco de dados para seguir com o código
    data: {
      name: request.body.name,
      age: request.body.age,
      email: request.body.email
    }
  })

  response.status(201).json(user);//Uma boa prática é retornar o status 201 quando um recurso é criado
});

app.put('/usuarios/:id', async (request, response) => {
  const user = await prisma.user.update({
    where: {
      id: request.params.id
    },
    data: {
      name: request.body.name,
      age: request.body.age,
      email: request.body.email
    }
  })
  response.status(201).json(user);
})

app.delete('/usuarios/:id', async (request, response) => {
  const user = await prisma.user.delete({
    where: {
      id: request.params.id
    }
  })
  response.status(200).json({ message: 'Usuário deletado com sucesso!' });
})

app.listen(3333, () => {
});

/*
Simulação de banco de dados:
- Criar usuário por get e post

import express from 'express';

const app = express();
app.use(express.json());

const users = [];

app.get('/usuarios', (request, response) => {
  response.status(200).json(users); //Retorna a lista de usuários no formato json na rota get
})

app.post('/usuarios', (request, response) => {
  users.push(request.body); //Adiciona os dados dentro do array quando inseridos na rota post

  response.status(201).json({ message: 'Usuário criado com sucesso!' });//Resposta de status: Retorna uma mensagem de sucesso
});

app.listen(3333, () => {
});

 
MongoDB
henriquewesley
6Slu6HX8DfdBIgvi

/* const express = require('express'); - Jeito antigo de importar o express

//Novo jeito de importar o express
import express from 'express';

const app = express();
app.use(express.json());

app.get('/usuarios/:id', (request, response) => {
  response.send('Hello node developer!');

});

app.post('/usuarios', (request, response) => {
  response.send('Olá desenvolvedor node!');
  console.log(request);
});

app.listen(3333, () => {
});

Verbos HTTP ou HTTP Métodos
GET - Buscar uma informação dentro do servidor
POST - Criar uma informação no servidor
PUT - Alterar uma informação no servidor
PATCH - Alterar uma informação específica
DELETE - Deletar uma informação no servidor

REQUEST
Query Params(GET): Consultar, Filtrar ou paginar dados.
Route Params(GET/PUT/DELETE): Buscar, deletar ou editar algo específico. Identificar qual recurso eu quero atualizar ou deletar.
Body Params(POST/PUT): Criar ou alterar recursos

Códigos HTTPS
2xx: Confirmar que a requisição funcionou
200: OK
201: Created
204: No content

4xx: Erro no cliente (Front-end)
400: Bad Request
401: Unauthorized
403: Forbidden (Proibido)
404: Not Found (Não encontrado)

5xx: Erro no servidor (Back-end)
500: Internal Server Error
501: Not Implemented (Não implementado)
502: Bad Gateway
*/


