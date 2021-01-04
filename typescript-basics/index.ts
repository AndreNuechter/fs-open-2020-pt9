import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (height && weight && [height, weight].every(n => !Number.isNaN(+n))) {
        const bmi = calculateBmi(+height, +weight);
        res.json({
            height, weight, bmi
        });
    } else {
        res.status(400).json({ error: 'malformatted parameters' });
    }
});

type ExercisePostModel = {
    target: number;
    daily_exercises: Array<number>;
};

app.post('/exercises', (req, res) => {
    const { target, daily_exercises: hours } = req.body as ExercisePostModel;

    if (!(target && hours)) {
        res.status(400).json({ error: 'missing parameters' });
    } else if ([target, ...hours].some(n => Number.isNaN(+n))) {
        res.status(400).json({ error: 'malformatted parameters' });
    } else {
        res.json(calculateExercises(target, hours));
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});