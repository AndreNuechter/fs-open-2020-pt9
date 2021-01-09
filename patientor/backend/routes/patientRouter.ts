import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient: Patient | boolean = patientService.getEntryById(id);

    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        res.send(patientService.addPatient(toNewPatient(req.body)));
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});

router.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    try {
        res.send(patientService.addEntryToPatient(id, req.body));
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});

export default router;