import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors(), express.json());

app.get('/api/ping', (_, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});