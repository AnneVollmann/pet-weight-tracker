export default function WeightTable({ groupedWeights, onSelectPeriodEndDate }) {

    return (
        <ul className="pet-weights-overview">
            {Object.entries(groupedWeights)
                .sort(([a], [b]) => b - a)
                .map(([year, months]) => (
                    <div key={year}>
                        <h2>{year}</h2>

                        {Object.entries(months)
                            .sort(([a], [b]) => b - a)
                            .map(([month, monthWeights]) => (
                                <div key={month}>
                                    <h3>
                                        {new Date(year, month).toLocaleDateString("de-DE", {
                                            month: "long",
                                        })}
                                    </h3>

                                    <ul className="pet-weights-month">
                                        {monthWeights.map(weight => (
                                            <li key={weight.id} onClick={() => onSelectPeriodEndDate(weight.date.toDate())}>
                                                <span className="pet-date" >
                                                    {weight.date.toDate().toLocaleDateString("de-DE", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                                <span className="pet-weight">
                                                    {weight.weight} g
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                ))}
        </ul>
    );
}