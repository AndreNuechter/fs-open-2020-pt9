import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

const app = express();
const PORT = 3001;

app.use(cors(), express.json());

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});