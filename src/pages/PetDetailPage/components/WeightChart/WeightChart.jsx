import { Line } from "react-chartjs-2";
import { getChartData, getFormattedDates, getLineColor, getYAxisRange, handleChartClick } from "../../../../lib/weights/chart";

export default function WeightChart({ sortedWeights, visibleWeights, weightWarningShown, onSelectWeight }) {

    if (!sortedWeights || sortedWeights.length <= 1) return <br />;
    if (!visibleWeights || visibleWeights.length === 0) return <br />;

    // line color depending on weight
    const visibleWeightsEqualSortedWeights = sortedWeights[sortedWeights.length - 1] == visibleWeights[visibleWeights.length - 1];
    const lineColor = getLineColor(visibleWeightsEqualSortedWeights, weightWarningShown);

    // y-axis min, max and stepsize
    const yAxisConfiguration = getYAxisRange(sortedWeights);

    // chart-data
    const data = getChartData(visibleWeights, lineColor);

    // chart-options
    const options = {
        responsive: true,
        plugins: {},
        scales: {
            x: { title: { display: true, text: "Datum" } },
            y: {
                title: { display: true, text: "Gewicht (in Gramm)" },
                ticks: {
                    stepSize: yAxisConfiguration.stepSize
                },
                min: yAxisConfiguration.minWeight,
                max: yAxisConfiguration.maxWeight
            }
        },
        onClick: (event, elements) => handleChartClick(event, elements, visibleWeights, onSelectWeight)
    };

    return <section>
        <Line data={data} options={options} />
    </section>;
}