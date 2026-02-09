import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function WeightChart({ weights, averageWeightLastThreeMonth }) {
    const [selectedWeight, setSelectedWeight] = useState(null);

    if (!weights || weights.length === 0) return <br />;

    const sortedWeights = [...weights].sort(
        (a, b) => a.date.toDate() - b.date.toDate()
    );

    //x-axis
    const dateValues = sortedWeights.map(w => {
        const date = w.date.toDate();
        return date.toLocaleDateString("de-DE", {
            month: "short",
            year: "2-digit"
        });
    });

    //y-axis
    const weightValues = sortedWeights.map(w => w.weight);

    const colorMainDark = getComputedStyle(document.documentElement).getPropertyValue("--main-dark").trim();

    const colorWarning = getComputedStyle(document.documentElement).getPropertyValue("--warning").trim();

    const data = {
        labels: dateValues,
        datasets: [
            {
                label: "Gewicht in g",
                data: weightValues,
                borderColor: colorMainDark,
                backgroundColor: colorMainDark,
                fill: false,
                tension: 0.3
            }
        ]
    };

    const handleClick = (event, elements) => {
        if (!elements.length) return;

        setSelectedWeight(sortedWeights[elements[0].index]);
    };

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