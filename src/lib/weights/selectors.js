export function getSortedWeights(weights) {
    return [...weights].sort(
        (a, b) => a.date.toDate() - b.date.toDate()
    );
}

export function getWeightsInPeriod(sortedWeights, { startDate = null, endDate = null, limit = null } = {}) {
    if (!sortedWeights || sortedWeights.length === 0) return [];

    let filteredWeights = sortedWeights.filter(w => {
        const date = w.date.toDate();
        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
    })

    if (limit) {
        filteredWeights = filteredWeights.slice(-limit);
    }

    return filteredWeights;
}