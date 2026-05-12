import { getWeightsInPeriod } from "./selectors";

//get the date of the earliest or latest weight in an array of sortedWeights
export function getDate(sortedWeights, position) {
    if (!sortedWeights.length) return null;

    if (position === "earliest") return sortedWeights[0].date.toDate();
    if (position === "latest") return sortedWeights[sortedWeights.length - 1].date.toDate();
}

export function getAverageWeightValue(weights) {
    return weights.length === 0
        ? null
        : Math.round(
            weights.reduce((sum, w) => Number(sum) + Number(w.weight), 0) /
            weights.length
        );
}

export function getLatestWeightValue(sortedWeights) {
    if (!sortedWeights.length) return null;

    return sortedWeights.length > 0
        ? sortedWeights[sortedWeights.length - 1].weight
        : null;
}

export function isWeightValueBelowAverage(weightValue, averageWeightValue) {
    return weightValue !== null &&
        averageWeightValue !== null &&
        weightValue < averageWeightValue;
}

export function getWeightWarning(sortedWeights) {
    if (sortedWeights.length === 0) return false;

    const latestDate = getDate(sortedWeights, "latest");
    const latestWeightValue = getLatestWeightValue(sortedWeights);
    const currentPeriodWeights = getWeightsInPeriod(sortedWeights, {
        endDate: latestDate,
        limit: 8
    });
    const currentAverageWeightValue = getAverageWeightValue(currentPeriodWeights);

    return isWeightValueBelowAverage(latestWeightValue, currentAverageWeightValue);
}