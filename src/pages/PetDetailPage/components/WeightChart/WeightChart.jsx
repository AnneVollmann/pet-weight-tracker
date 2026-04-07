import { Line } from "react-chartjs-2";

export default function WeightChart({ sortedWeights, visibleWeights, weightTooLow, onSelectWeight }) {

    if (!sortedWeights || sortedWeights.length <= 1) return <br />;
    if (!visibleWeights || visibleWeights.length === 0) return <br />;

    // line color depending on weight

    const colorMainDark = getComputedStyle(document.documentElement)
        .getPropertyValue("--main-dark")
        .trim();
    const colorWarning = getComputedStyle(document.documentElement)
        .getPropertyValue("--warning")
        .trim();

    const lineColor = weightTooLow ? colorWarning : colorMainDark;

    // x-axis values

    const dateValues = visibleWeights.map(w => {
        const date = w.date.toDate();
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            // year: "2-digit"
        });
    });

    // y-axis values

    const visibleWeightsValues = visibleWeights.map(w => w.weight);

    // chart-data

    const data = {
        labels: dateValues,
        datasets: [
            {
                label: "Gewicht in g",
                data: visibleWeightsValues,
                borderColor: lineColor,
                backgroundColor: lineColor,
                fill: false,
                tension: 0.3
            }
        ]
    };

    // handle clicks on the chart

    const handleClick = (event, elements) => {
        if (!elements.length) return;
        let weightIndex = sortedWeights.length - visibleWeights.length + elements[0].index;

        onSelectWeight(sortedWeights[weightIndex]);
    };

    //y-axis configuration

    const allWeights = sortedWeights.map(w => w.weight);

    const rawMin = allWeights.length > 0 ? Math.min(...allWeights) : 0;
    const rawMax = allWeights.length > 0 ? Math.max(...allWeights) : 1000;

    const stepSize = rawMax - rawMin > 500 ? 100 : 50;

    const roundDownToNextStep = (value, step) => Math.floor(value / step) * step;
    const roundUpToNextStep = (value, step) => Math.ceil(value / step) * step;

    const minWeight = roundDownToNextStep(rawMin, stepSize) - (rawMin % stepSize === 0 ? stepSize : 0);
    const maxWeight = roundUpToNextStep(rawMax, stepSize) + (rawMax % stepSize === 0 ? stepSize : 0);

    // chart-options

    const options = {
        responsive: true,
        plugins: {},
        scales: {
            x: { title: { display: true, text: "Datum" } },
            y: {
                title: { display: true, text: "Gewicht (in Gramm)" },
                ticks: {
                    stepSize: stepSize
                },
                min: minWeight,
                max: maxWeight
            }
        },
        onClick: handleClick
    };

    return <section>
        <Line data={data} options={options} />
    </section>;
}