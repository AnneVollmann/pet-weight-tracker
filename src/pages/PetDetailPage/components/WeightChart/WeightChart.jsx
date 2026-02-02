import { Line } from "react-chartjs-2";

export default function WeightChart({ weights }) {
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

    const options = {
        responsive: true,
        plugins: { },
        scales: {
            x: { title: { display: true, text: "Datum" } },
            y: { title: { display: true, text: "Gewicht (in Gramm)" }, beginAtZero: false }
        }
    };

    return <Line data={data} options={options} />;
}