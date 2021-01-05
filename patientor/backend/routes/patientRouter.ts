import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_, res) => {
    res.json(patientService.getNonSensitiveEntries());
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