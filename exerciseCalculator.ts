type RatingValue = 1 | 2 | 3;
type RatingDescription = 'Could be better' | 'Right on target' | 'You crushed your goal';

interface Rating {
    value: RatingValue;
    description: RatingDescription;
}

interface ExerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: RatingValue;
    ratingDescription: RatingDescription;
    target: number;
    average: number;
}

function calculateExercises(target: number, hours: Array<number>): ExerciseReport {
    const periodLength = hours.length;
    const trainingDays = hours.filter(Boolean).length;
    const average = hours.reduce((total: number, day: number) => total + day, 0) / periodLength;
    const { value: rating, description: ratingDescription } = calculateRating(target, average);

    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
}

function calculateRating(target: number, average: number): Rating {
    if (average < target) return { value: 3, description: 'Could be better' };
    if (average === target) return { value: 2, description: 'Right on target' };
    return { value: 1, description: 'You crushed your goal' };
}

function parseArgs(args: Array<string>) {
    if (args.length < 4) throw new Error('too few arguments');

    const [target, ...hours] = args.slice(2).map(Number);

    if (Number.isNaN(target)) throw new Error('invalid target');
    if (hours.some(day => Number.isNaN(day))) throw new Error('invalid day value');

    return calculateExercises(target, hours);
}

console.log(parseArgs(process.argv));