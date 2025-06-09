import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // Importa v4 e renomeia para uuidv4

const app = express();
app.use(express.json());

const users = []; //Array que simula o banco de dados

const checkUserId = (request, response, next) => {
  // Por enquanto, vamos deixar vazia para testar o POST
  next(); // Para que a requisição siga para a próxima rota
};

app.get('/users', (request, response) => {
  // Se você quiser testar essa rota, ela deve retornar algo, por exemplo:
  return response.json(users);
});

/* TRATAMENTO DE ERROS (TRY CATCH) */

//Aplicação que adiciona novos usuários no banco de dados.
app.post('/users', async (request, response) => {
  try {
    const { name, age } = request.body; // Pega os dados do corpo da requisição.
    const user = { id: uuidv4(), name, age }; //  Cria um novo usuário.
    if (age < 18) throw new Error('Age must be over 18 years old'); // Verifica se a idade é menor que 18 anos.

    users.push(user); // Adiciona o usuário no array de usuários.

    return response.status(201).json(user); // Retorna o usuário criado (Resposta de status: Retorna uma mensagem de sucesso).
  } catch (error) {
    // Corrigindo para usar 'error' que é a variável do catch
    return response.status(400).json({ error: error.message });
  } finally {
    console.log('Finalizou');
  }
});

app.put('/users/:id', checkUserId, (request, response) => {
  // Implementação do PUT aqui
  return response.status(200).json({ message: 'PUT route' });
});

app.delete('/users/:id', checkUserId, (request, response) => {
  // Implementação do DELETE aqui
  return response.status(200).json({ message: 'DELETE route' });
});

app.listen(3000, () => {
  console.log('🚀 Server started on port 3000');
});