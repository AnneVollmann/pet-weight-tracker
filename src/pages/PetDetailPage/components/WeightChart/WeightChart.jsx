import { Line } from "react-chartjs-2";

export default function WeightChart({ weights }) {
    if (!weights || weights.length === 0) return <p>Noch keine Daten</p>;

    const labels = weights.map(w =>
        w.date.toDate().toLocaleDateString("de-DE", { month: "short", year: "numeric" })
    );

    const data = {
        labels,
        datasets: [
            {
                label: "Gewicht in g",
                data: weights.map(w => w.weight),
                borderColor: "#4f75b3",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
                tension: 0.3
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: { mode: "index", intersect: false }
        },
        scales: {
            x: { title: { display: true, text: "Datum" } },
            y: { title: { display: true, text: "Gewicht (in Gramm)" }, beginAtZero: false }
        }
    };
    return <Line data={data} options={options} />;
}