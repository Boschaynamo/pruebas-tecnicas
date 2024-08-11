//1
import net from 'node:net'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null,{ time: process.hrtime(startTime), ip })
  })
  
  client.on('error', (err) => {
    callback(err)
    client.end()
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

//2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:
export function obtenerDatosPromise() {
    return new Promise(resolve =>{
        setTimeout(() => {
          resolve({ data: 'datos importantes' })
        }, 2000);
    })
  }

//3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código. Si ves algo innecesario, elimínalo. Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.

//Esta funcion lee el archivo 'input.txt' en formato 'utf8'. Luego de 1 segundo, si no hubo error en la lectura, escribe el texto en el archivo 'output.txt' completamente en mayusculas.

import fs from 'node:fs'
export function procesarArchivo(callback) {
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
      if (error) {
        console.error('Error leyendo archivo:', error.message);
        callback(error);
      }
  

        const textoProcesado = contenido.toUpperCase();
  
        fs.writeFile('output.txt', textoProcesado, error => {
          if (error) {
            console.error('Error guardando archivo:', error.message);
            callback(error);
          }
  
          console.log('Archivo procesado y guardado con éxito');
          callback(null);
        });
    });
  }

//4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:

// import fs from 'node:fs';
import fsp from 'node:fs/promises'
export async function leerArchivos() {
  console.time('leerArchivos')
  const [archivo1,archivo2,archivo3] = await Promise.all([
    fsp.readFile('archivo1.txt', 'utf8'),
    fsp.readFile('archivo2.txt', 'utf8'),
    fsp.readFile('archivo3.txt', 'utf8')
  ])
  // const archivo1 = await fs.readFileSync('archivo1.txt', 'utf8');
  // const archivo2 = await fs.readFileSync('archivo2.txt', 'utf8');
  // const archivo3 = await fs.readFileSync('archivo3.txt', 'utf8');
  console.timeEnd('leerArchivos')

  return `${archivo1} ${archivo2} ${archivo3}`
}

// 5 - Escribe una funcion delay que retorne una promesa que se resuelva después de n milisegundos. Por ejemplo:
export async function delay (time) {
  return new Promise((resolve,reject) =>{
    setTimeout(()=> resolve(true),time);
  })
}

// delay(3000).then(() => console.log('Hola mundo'));
// // o..
// await delay(3000)
// console.log('Hola mundo')

// const dotenv = require("./dotenv.js");
import dotenv from './dotenv.js'
dotenv.config()

console.log(process.env.PORT) // "8008"
console.log(process.env.TOKEN) // "123abc"
