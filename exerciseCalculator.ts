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
    const { value: rating, description: ratingDescription } = ((): Rating => {
        if (average < target) return { value: 3, description: 'Could be better' };
        if (average === target) return { value: 2, description: 'Right on target' };
        return { value: 1, description: 'You crushed your goal' };
    })();

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

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));