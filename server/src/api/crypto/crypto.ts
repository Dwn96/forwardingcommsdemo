import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'
require('dotenv').config()
const utf8 = require('utf8');


const passphrase = process.env.PASSPHRASE
const generateKeyPair = async (): Promise<void> => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err: Error | null, publicKey: string, privateKey: string) => {
      if (err) throw err
      fs.writeFileSync('private.pem', privateKey)
      fs.writeFileSync('public.pem', publicKey)
    })
  }

export const encryptStringWithRsaPublicKey = (plainText:any) => {
    var publicKey = fs.readFileSync('./public.pem', "utf8");
    var buffer = Buffer.from(plainText);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

export const encryptWithClientPublicKey = (plainText:string) => {
  var buffer = Buffer.from(plainText);
  const publicKey = fs.readFileSync('./client-public.pem', 'utf8')
  var encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};
export const decryptStringWithRsaPrivateKey = (cipher:string) => {
    var privateKey = fs.readFileSync('./private.pem', "utf8");
    var buffer = Buffer.from(cipher, "base64");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

generateKeyPair().catch((error) => {
    console.log(error)
})

export const generateSymmetricKey = () => {
  return crypto.randomBytes(48).toString('hex');
}