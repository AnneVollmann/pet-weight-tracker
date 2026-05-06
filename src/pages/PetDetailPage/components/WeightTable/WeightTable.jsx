import { useState } from "react";

export default function WeightTable({ groupedWeights, onSelectPeriodEndDate }) {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    function handleEntryClick(entryKey, entryDate) {
        if (selectedEntry == entryKey) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
            setSelectedEntry(entryKey);
            onSelectPeriodEndDate(entryDate)
        }
    }
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
                                            <li
                                                key={weight.id}
                                                onClick={(e) => {
                                                    handleEntryClick(weight.id, weight.date.toDate())
                                                }}
                                                className={
                                                    selectedEntry === weight.id
                                                        ? (isEditing == true ? "editing-entry" : "selected-entry")
                                                        : ""
                                                }>

                                                <span className="pet-date" >
                                                    {
                                                        selectedEntry === weight.id && isEditing === true
                                                            ? (<input
                                                                type="date"
                                                                className="form-control"
                                                                min="1900-01-01"
                                                                value={weight.date.toDate().toISOString().split("T")[0]}
                                                            />)
                                                            : (<>
                                                                {weight.date.toDate().toLocaleDateString("de-DE", {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                })}
                                                            </>)
                                                    }
                                                </span>

                                                <span className="pet-weight">
                                                    {
                                                        selectedEntry === weight.id && isEditing === true
                                                            ? (<input
                                                                type="text"
                                                                className="form-control-plaintext"
                                                                value={weight.weight}
                                                            />)
                                                            : (<>
                                                                {weight.weight}
                                                            </>)
                                                    }
                                                    g
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                ))
            }
        </ul >
    );
}