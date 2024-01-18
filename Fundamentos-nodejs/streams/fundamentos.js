// Netflix e Spotify
import { Readable, Writable, Transform } from 'node:stream'
class OneToHundredStream extends Readable{
  index = 1
  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 100) {
        this.push(null)// buffer -> modelo para transicionar dados entre steams
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)// buffer
      }
    }, 1000)
  }
}
// new OneToHundredStream()
//   .pipe(process.stdout)

class MultiplyByTenStream extends Writable{
  _write(chuck, encoding, callback) {
    console.log(Number(chuck.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform{
  _transform(chuck, encoding, callback) {// chuck, recebe o buffer da stream de leitura
    const transformed = Number(chuck.toString()) * - 1
    callback(null,Buffer.from(String(transformed))) // o Primeiro paremetro do callback, é retorno erro
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())