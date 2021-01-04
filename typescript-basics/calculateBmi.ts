type BMIClassification = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obesity (Class 1)' | 'Obesity (Class 2)' | 'Obesity (Class 3)';

export function calculateBmi(height: number, weight: number): BMIClassification {
    const result = weight / ((height * 0.01) ** 2);

    if (result < 18.5) return 'Underweight';
    if (result < 25) return 'Normal (healthy weight)';
    if (result < 30) return 'Overweight';
    if (result < 35) return 'Obesity (Class 1)';
    if (result < 40) return 'Obesity (Class 2)';

    return 'Obesity (Class 3)';
}

function parseArgsBmi(args: Array<string>) {
    if (args.length > 4) throw new Error('too many arguments');
    if (args.length < 4) throw new Error('too few arguments');

    const [height, weight] = args.slice(2).map(Number);

    if (Number.isNaN(height)) throw new Error('invalid height');
    if (Number.isNaN(weight)) throw new Error('invalid weight');

    return calculateBmi(height, weight);
}

try {
    console.log(parseArgsBmi(process.argv));
} catch (err) {
    console.warn('bmi: ', err);
}