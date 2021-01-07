"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosisRouter_1 = __importDefault(require("./routes/diagnosisRouter"));
const patientRouter_1 = __importDefault(require("./routes/patientRouter"));
const app = express_1.default();
const PORT = 3001;
app.use(cors_1.default(), express_1.default.json());
app.use('/api/diagnoses', diagnosisRouter_1.default);
app.use('/api/patients', patientRouter_1.default);
app.get('/api/ping', (_, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
