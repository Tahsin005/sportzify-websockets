import express from 'express';
import { matchRouter } from './routes/matches.js';
import { envConfig } from './config/env.js';
import http from 'http';
import { attachWebSocketServer } from './ws/server.js';
import { securityMiddleware } from './arcjet.js';
import { commentaryRouter } from './routes/commentary.js';

const PORT = envConfig.PORT || 8000;
const HOST = envConfig.HOST || '0.0.0.0';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Sportzify — real-time sports broadcast engine' });
});

// app.use(securityMiddleware()); 

app.use('/matches', matchRouter);
app.use('/matches/:id/commentary', commentaryRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
	const baseUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}/` : `http://${HOST}:${PORT}/`;
	console.log(`Server is running at ${baseUrl}`);
	console.log(`WebSocket server is running at ${baseUrl.replace('http', 'ws')}/ws`);
});

