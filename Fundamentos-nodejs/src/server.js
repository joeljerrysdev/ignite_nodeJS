/// -HTTP
//    -Método HTTP
//    -URL

//GET, POST , PUT, PATCH, DELETE

//GET => Buscar um recurso do back-end
//POST => Criar um recurso no back-end
//PUT => Atualizar um recurso no back-end
//PATCH => Atualizar uma informação especifica de um recurso no back end
//DELETE => Deletar um recurso do back-end
//Cabeçalho (Requisição, Resposta) => metadados
//HTTP Status Code
import http from 'node:http'
const users = []
let contador = 0;

const server = http.createServer(async (req, res) => {

  const { method, url } = req
  const buffers = []

  //Garante que o restante do codigo só vai ser executado quando carregar todos os dados.
  for await (const chuck of req) {
    buffers.push(chuck)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch  {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')// cabeçalho 
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
    contador++
    users.push({
      id: contador,
      name: name,
      email:email
    })
    return res.writeHead(201).end()
  }
  return res.writeHead(404).end("Not Found")
})

server.listen(3233)
