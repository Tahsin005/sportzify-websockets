import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'RTSBE — real-time sports broadcast engine' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}/`);
});

