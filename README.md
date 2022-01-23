## Getting started

1. Clone the repository

        git clone https://github.com/Dwn96/forwardingcommsdemo.git
  
2. Install node modules:

        npm install  

3. Navigate to the server directory and start the server app via :

        npm run dev

3. Navigate to the client directory and start the client app via :

        npm run dev

# Introduction
This repo holds a client and server app which exchange encrypted payloads by making use of websockets and http POST to the server.
This client-server pair demonstrates practical use of asymmetric-key cryptography for secure end to end communication, port forwarding over TCP
and HTTP; and REST API development

## Server
The server application is a REST API that has been decoupled into the following layers:

  1. Routing
  2. Service
  3. Mock database

   #### Routing layer
   The routing layer exposes endpoints for each resource maintained by our application. This is the first point of contact for data sent over HTTP by the client 
   application. 
   Our server exposes POST and GET routes for resources: **users** and **transactions**

  #### Service layer
  This layer holds the business logic on how data received from the routing layer is handled. The logic for writing to and reading from our mock database
  resides in this layer.

  #### Database
  We maintain a mock in-memory database for each of our resources.

## Client
The client application is a simple Typescript app. This app is invloved in key-exchanges with the server application via websockets after which it sends encrypted payloads to the server application over HTTP

## Encryption

Communication between server and client apps is encrypted end-to-end via Asymmetric Encryption. We make use of [Crypto](https://nodejs.org/api/crypto.html)
to handle the following cryptographic functionalities:
  1. Client and server Key- pair generation
  2. Encryption using a public key
  3. Decrpytion using a private key

When a connection is established between the client and server apps, a key-exchange process is triggered which takes place in the following way:

![image](https://user-images.githubusercontent.com/45044744/150684620-c283c0a4-eb69-45fe-93cd-4ae7b18edc47.png)
    Source: https://www.okta.com/identity-101/asymmetric-encryption/

  1. The server sends client its public key *pub_key_S*
  2. The client sends to server its public key encrypted with the server's public key
        *c = E(pub_key_S, pub_key_C)*
  3. The server decrypts c with its private key *pub_key_C = D(pri_key_S, c)*
  
 At this point, the Client and Server can proceed to securely communicate for the ongoing session by encrypting using each others' public key and decrypting using  ones private key.

## Re-routing/forwarding communication
Communication between the client and server apps is handled in two ways:
  1. [The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
  2. [HTTP](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-http2-01)

 ### Websockets
In our implementation, we make use of websockets during key-exchange which occurs as soon as a connection is established between client and server apps. 
For this functionality, we make use of [Socket.io](https://socket.io/docs/v4/) - a library that enables bidirectional and event-based communication between the client and the server.

### HTTP
As soon as a connection has been established and the key-exchange is completed, we send encrypted payloads of dummy data over HTTP to our server application via
POST


