import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (_, res) => {
    res.send('Saving a diagnosis!');
});

export default router;