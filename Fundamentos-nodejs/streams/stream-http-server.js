import http from 'node:http'
import { Transform } from 'node:stream'

// class InverseNumberStream extends Transform{
//   _transform(chuck, encoding, callback) {// chuck, recebe o buffer da stream de leitura
//     const transformed = Number(chuck.toString()) * - 1
//     console.log(transformed)
//     callback(null,Buffer.from(String(transformed))) // o Primeiro paremetro do callback, é retorno erro
//   }
// }

const server = http.createServer( async (req, res) => {
const buffers = []

  for await (const chuck of req) {
    buffers.push(chuck)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)
  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
})

server.listen(3234)