import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function WeightChart({ sortedWeights, weightTooLow }) {
    const [selectedWeight, setSelectedWeight] = useState(null);

    if (!sortedWeights || sortedWeights.length <= 1) return <br />;

    // line color depending on weight

    const colorMainDark = getComputedStyle(document.documentElement)
        .getPropertyValue("--main-dark")
        .trim();
    const colorWarning = getComputedStyle(document.documentElement)
        .getPropertyValue("--warning")
        .trim();

    const lineColor = weightTooLow? colorWarning : colorMainDark;

    // x-axis

    const dateValues = sortedWeights.map(w => {
        const date = w.date.toDate();
        return date.toLocaleDateString("de-DE", {
            month: "short",
            year: "2-digit"
        });
    });

    // y-axis

    const weightValues = sortedWeights.map(w => w.weight);

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

        setSelectedWeight(sortedWeights[elements[0].index]);
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