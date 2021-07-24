'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

var pesanan = "";
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (data) => {
    if(data == "pija") {
       ws.send(pesanan);
    } else {
       console.log('data received \n %o',data);
          pesanan = data;
    }
 });
  ws.on('close', () => console.log('Client disconnected'));
});

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);