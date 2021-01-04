import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_, res) => {
    res.json(diagnosisService.getEntries());
});

router.post('/', (_, res) => {
    res.send('Saving a diagnosis!');
});

export default router;