
//app.js
const express = require('express');
const app = express();
const uuid = require('uuid'); // Se você estiver usando uuid

app.use(express.json()); // Isso é crucial para que o Express entenda JSON no corpo das requisições

const users = []; //Array que simula o banco de dados

const checkUserId = (request, response, next) => {
  // Por enquanto, vamos deixar vazia para testar o POST
  next(); // Para que a requisição siga para a próxima rota
};

// ... (o restante do seu código, incluindo a rota POST) ...

// Inicializa o servidor na porta 3000 (ou outra que preferir)
app.listen(3000, () => {
  console.log('🚀 Server started on port 3000');
});

// Rota GET para obter todos os usuários
app.get('/users', (request, response) => {
});

/* TRATAMENTO DE ERROS (TRY CATCH) */

//Aplicação que adiciona novos usuários no banco de dados.
app.post('/users', async (request, response) => {
  try {
    const { name, age } = request.body; // Pega os dados do corpo da requisição.
    const user = { id: uuid.v4(), name, age }; //  Cria um novo usuário.
    if (age < 18) throw new Error('Age must be over 18 years old'); // Verifica se a idade é menor que 18 anos.

    users.push(user); // Adiciona o usuário no array de usuários.

    return response.status(201).json(user); // Retorna o usuário criado (Resposta de status: Retorna uma mensagem de sucesso).
  } catch (error) {
    return response.status(400).json({ error: err.message });
  } finally {
    console.log('Finalizou');
  }
});

app.put('/users/:id', checkUserId, (request, response) => {

});

app.delete('/users/:id', checkUserId, (request, response) => {

});