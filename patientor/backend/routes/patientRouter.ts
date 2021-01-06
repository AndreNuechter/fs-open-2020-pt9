import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient: NonSensitivePatient | boolean = patientService.getEntryById(id);

    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        res.send(patientService.addEntry(newPatient));
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});

export default router;