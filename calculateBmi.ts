type BMIClassification = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obesity (Class 1)' | 'Obesity (Class 2)' | 'Obesity (Class 3)';

function calculateBmi(height: number, weight: number): BMIClassification {
    const result = weight / ((height * 0.01) ** 2);

    if (result < 18.5) return 'Underweight';
    if (result < 25) return 'Normal (healthy weight)';
    if (result < 30) return 'Overweight';
    if (result < 35) return 'Obesity (Class 1)';
    if (result < 40) return 'Obesity (Class 2)';

    return 'Obesity (Class 3)';
}

console.log(calculateBmi(180, 74));