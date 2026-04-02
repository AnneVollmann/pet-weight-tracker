import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function WeightChart({ sortedWeights, weightTooLow }) {
    const [selectedWeight, setSelectedWeight] = useState(null);

    if (!sortedWeights || sortedWeights.length <= 1) return <br />;

    // visible weights

    const numberOfVisibleWeights = sortedWeights.length <= 8 ? sortedWeights.length : 8;
    const visibleWeights = sortedWeights.slice(- numberOfVisibleWeights);

    // line color depending on weight

    const colorMainDark = getComputedStyle(document.documentElement)
        .getPropertyValue("--main-dark")
        .trim();
    const colorWarning = getComputedStyle(document.documentElement)
        .getPropertyValue("--warning")
        .trim();

    const lineColor = weightTooLow ? colorWarning : colorMainDark;

    // x-axis

    const dateValues = visibleWeights.map(w => {
        const date = w.date.toDate();
        return date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            // year: "2-digit"
        });
    });

    // y-axis

    const weightValues = visibleWeights.map(w => w.weight);

    // chart-data

    const data = {
        labels: dateValues,
        datasets: [
            {
                label: "Gewicht in g",
                data: weightValues,
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
        let weightIndex = sortedWeights.length - numberOfVisibleWeights + elements[0].index;

        setSelectedWeight(sortedWeights[weightIndex]);
    };

    // chart-options

    const options = {
        responsive: true,
        plugins: {},
        scales: {
            x: { title: { display: true, text: "Datum" } },
            y: { title: { display: true, text: "Gewicht (in Gramm)" }, beginAtZero: false }
        },
        onClick: handleClick
    };

    return <section>
        <Line data={data} options={options} />
        <p>
            {selectedWeight === null ? (
                "\u00A0"
            ) : (
                <>
                    {selectedWeight.date.toDate().toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}:{" "}
                    {selectedWeight.weight} g
                </>
            )}
        </p>
    </section>;
}