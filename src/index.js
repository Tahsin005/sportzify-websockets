import express from 'express';
import { matchRouter } from './routes/matches.js';
import { envConfig } from './config/env.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'RTSBE — real-time sports broadcast engine' });
});

app.use('/matches', matchRouter);

const port = envConfig.PORT || 8000;
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}/`);
});

