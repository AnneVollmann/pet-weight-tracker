import { useState } from "react";
import { formatDateForInput } from "../../../../lib/dates/formatDate";
import { formatDateToString } from "../../../../lib/dates/formatDate";

export default function WeightTable({ groupedWeights, onSelectPeriodEndDate }) {
    const [activeEntry, setActiveEntry] = useState({
        id: null,
        isEditing: false
    });

    function handleEntryClick(entryId, entryDate) {
        if (activeEntry.id === entryId) {
            setActiveEntry({
                id: entryId,
                isEditing: true
            });
        } else {
            setActiveEntry({
                id: entryId,
                isEditing: false
            });
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
                                                    activeEntry.id === weight.id
                                                        ? (activeEntry.isEditing == true ? "editing-entry" : "selected-entry")
                                                        : ""
                                                }>

                                                <span className="pet-date" >
                                                    {
                                                        activeEntry.id === weight.id && activeEntry.isEditing === true
                                                            ? (<input
                                                                type="date"
                                                                className="form-control"
                                                                min="1900-01-01"
                                                                defaultValue={formatDateForInput(weight.date.toDate())}
                                                            />)
                                                            : (<>
                                                                { formatDateToString(weight.date)}
                                                            </>)
                                                    }
                                                </span>

                                                <span className="pet-weight">
                                                    {
                                                        activeEntry.id === weight.id && activeEntry.isEditing === true
                                                            ? (<input
                                                                type="text"
                                                                className="form-control-plaintext"
                                                                defaultValue={weight.weight}
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