export function getLineColor(visibleWeightsEqualSortedWeights, weightWarningShown) {
    const colorGray = getComputedStyle(document.documentElement)
        .getPropertyValue("--gray")
        .trim();
    const colorMainDark = getComputedStyle(document.documentElement)
        .getPropertyValue("--main-dark")
        .trim();
    const colorWarning = getComputedStyle(document.documentElement)
        .getPropertyValue("--warning")
        .trim();
    if (!visibleWeightsEqualSortedWeights) return colorGray;
    return weightWarningShown ? colorWarning : colorMainDark;
}

export function getFormattedDates(weights) {
    return weights.map(w => {
        const date = w.date.toDate();
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit"
        });
    });
}

export function getYAxisRange(weights) {
    const weightValues = weights.map(w => w.weight);
    const rawMin = weightValues.length > 0 ? Math.min(...weightValues) : 0;
    const rawMax = weightValues.length > 0 ? Math.max(...weightValues) : 1000;
    const stepSize = rawMax - rawMin > 500 ? 100 : 50;

    const roundDownToNextStep = (value, step) => Math.floor(value / step) * step;
    const roundUpToNextStep = (value, step) => Math.ceil(value / step) * step;

    return {
        min: roundDownToNextStep(rawMin),
        max: roundUpToNextStep(rawMax),
        stepSize
    };
}

export function getChartData(visibleWeights, lineColor) {
    return {
        labels: getFormattedDates(visibleWeights),
        datasets: [
            {
                label: "Gewicht in g",
                data: visibleWeights.map(w => w.weight),
                borderColor: lineColor,
                backgroundColor: lineColor,
                fill: false,
                tension: 0.3
            }
        ]
    };
}

export function handleChartClick(event, elements, visibleWeights, onSelectWeight) {
    if (!elements.length) return;
    const clickedWeight = visibleWeights[elements[0].index];
    onSelectWeight(clickedWeight);
}