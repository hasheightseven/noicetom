// api/sendMessage.js

import { createServer } from 'http';
import { Server } from 'socket.io';

// This function will be the serverless function that handles the Socket.io connection
export default async function handler(req, res) {
  // Handle only POST requests
  if (req.method === 'POST') {
    const { message, username } = req.body;

    if (!message || !username) {
      return res.status(400).json({ error: 'Message and username are required' });
    }

    // Create a new HTTP server and set up socket.io
    const server = createServer((req, res) => {
      res.writeHead(200);
      res.end('OK');
    });

    const io = new Server(server);

    // Set up WebSocket events
    io.on('connection', (socket) => {
      console.log('User connected');
      // When the backend receives a message, broadcast it to all connected users
      socket.emit('message', {
        sender: username,
        text: message,
      });
      console.log('Message sent:', message);
    });

    // Start the server to listen on a random port (Vercel does not expose ports)
    server.listen(0, () => {
      console.log('Server started, WebSocket listening...');
      // Simulate broadcasting the message
      io.emit('message', { sender: username, text: message });

      res.status(200).json({ success: true, message: 'Message sent successfully' });
    });

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
