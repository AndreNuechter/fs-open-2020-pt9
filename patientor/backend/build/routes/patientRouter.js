"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const router = express_1.default.Router();
router.get('/', (_, res) => {
    res.json(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService_1.default.getEntryById(id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient_1.default(req.body);
        res.send(patientService_1.default.addEntry(newPatient));
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
exports.default = router;
