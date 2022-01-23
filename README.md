# Problem 2: Re-routing/forwarding communication
This repo holds a client and server app which exchange encrypted payloads my making use of websockets and http POST to the server

## Getting started

1. Clone the repository

        git clone https://github.com/Dwn96/forwardingcommsdemo.git
  
2. Install node modules:

        npm install  

3. Navigate to the server directory and start the server app via :

        npm run dev

3. Navigate to the client directory and start the client app via :

        npm run dev


## Encryption

Communication between server and client apps is encrypted end-to-end via Asymmetric Encryption. We make use of [Crypto](https://nodejs.org/api/crypto.html)
to handle the following cryptographic functionalities:
  1. Client and server Key- pair generation
  2. Encryption using a public key
  3. Decrpytion using a private key

When a connection is established between the client and server apps, a key-exchange process is triggered which takes place in the following way:

  1. The server sends client its public key *pub_key_S*
  2. The client sends to server its public key encrypted with the server's public key
        *c = E(pub_key_S, pub_key_C)*
  3. The server decrypts c with its private key *pub_key_C = D(pri_key_S, c)*
  
 At this point, the Client and Server can proceed to securely communicate for the ongoing session by encrypting using each others' public key and decrypting using  ones private key.

## Re-routing/forwarding communication
Communication between the client and server apps is handled in two ways:
  1. [The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
  2. [HTTP](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-http2-01)

 ###Websockets
In our implementation, we make use of websockets during key-exchange which occurs as soon as a connection is established between client and server apps. 
For this functionality, we make use of [Socket.io](https://socket.io/docs/v4/) - a library that enables bidirectional and event-based communication between the client and the server.

###HTTP
As soon as a connection has been established and the key-exchange is completed, we send encrypted payloads of dummy data over HTTP to our server application via
POST

## Server


