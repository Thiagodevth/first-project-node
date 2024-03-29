
/*
       - Query Params => meusite.com/users?name=thiago&age=28  / FILTROS
       - ROUTE Params => /users/2  / BUSCAR, DELETAR OU ATUALIZAR ALGO ESPÉCIFICO
       - ROUTE => app.get('/users/:id'(request, response) => {})
       - ROUTE :id vai esperar um valor dinamico
       - Request BODY => { "name":"thiago", "age":}

       - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados

       = GET          => Buscar informações no back-end
       = POST         => Criar informações no back-end
       = PUT / PATCH  => Alterar / Atualizar informações no back-end
       = DELETE       => Deletar informaçõs no back-end

       = Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

*/
// iportar o framework => express
import express from 'express'; // para o express ser usado escreve-se desta forma
import { v4 } from 'uuid';
import cors from 'cors';

const app = express();
app.use(express.json()); // aqui estou avisando que toda aplicação usa (JSON)
app.use(cors()); // habilitando o front-end

const port = process.env.PORT || 3001;

const users = [];

const checkUserId = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex(user => user.id === id)
     if (index < 0) {
    return response.status(404).json({ error: 'user not found' })
     }

     request.userIndex = index
     request.userId = id

     next();
}

// criando uma rota / endereço da rota
app.get('/users', (request, response) => { //nome da rota('/users', (1ºrequest, 2ºresponse)) 1ºparametro=>request 2ºparametro=>response
  /* ao invez disso
  const name = request.query.name
 const age = request.query.age
  */
  return response.json(users)
  //const { name, age } = request.query// PADRÃO => Destruring assignment

  // ao invez disso ->  return response.json({name: name, age: age}) os nomes são iguais então o javaScript vai reconhecer
  //  return response.json({name, age})// json funciona com {}()
})

app.post('/users', (request, response) => {
  const { name, age } = request.body;
  const user = { id: v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
})

app.put('/users/:id', checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.userIndex;
  const id = request.userId;

  const updatedUser = { id, name, age };

  users[index] = updatedUser;

  return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
  const index = request.userIndex;

  users.splice(index, 1);

  return response.status(204).json();
});


//app.listen(3001)   // avisar qual porta a aplicação va ta rodando porta(3001)
app.listen(port, () => {
   console.log(`🚀🚀 server started on post ${port} 😉`);
   }) // -> esta function é o segundo parametro