import WeightEntry from "./WeightEntry"

export default function WeightMonthSection({
    year,
    month,
    monthWeights,
    activeEntry,
    onEntryClick
}) {
    return (
        <div>
            <h3>
                {new Date(year, month).toLocaleDateString("de-DE", {
                    month: "long",
                })}
            </h3>

            <ul className="pet-weights-month">
                {monthWeights.map(weight => (
                    <WeightEntry
                        key={weight.id}
                        weight={weight}
                        activeEntry={activeEntry}
                        onEntryClick={onEntryClick}
                    />
                ))}
            </ul>
        </div>
    )
}