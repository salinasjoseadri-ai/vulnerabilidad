// server_vulnerable.js
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 1) Servir el archivo HTML cuando el usuario accede a /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// 2) Socket.io (vulnerable: acepta cualquier conexión sin validar nada)
io.on('connection', (socket) => {
  console.log('Nuevo dispositivo conectado');

  // Escucha los datos enviados por el formulario
  socket.on('formData', (data) => {
    // Vulnerabilidad: se recibe y muestra directamente sin autenticación
    console.log('Datos recibidos desde el dispositivo:', data);
  });
});

// 3) Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor vulnerable escuchando en http://localhost:${PORT}`);
});
