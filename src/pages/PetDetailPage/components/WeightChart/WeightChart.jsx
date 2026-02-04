import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function WeightChart({ weights }) {
    const [selectedWeight, setSelectedWeight] = useState(null);

    if (!weights || weights.length === 0) return <br />;

    //x-axis
    const dateValues = weights.map(w => {
        const date = w.date.toDate();
        return date.toLocaleDateString("de-DE", {
            month: "short",
            year: "2-digit"
        });
    });

    //y-axis
    const weightValues = weights.map(w => w.weight);

    const data = {
        labels: dateValues,
        datasets: [
            {
                label: "Gewicht in g",
                data: weightValues,
                borderColor: "#4f75b3",
                fill: false,
                tension: 0.3
            }
        ]
    };

    const handleClick = (event, elements) => {
        if (!elements.length) return;

        setSelectedWeight(weights[elements[0].index]);
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