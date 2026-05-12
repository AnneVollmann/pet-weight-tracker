import { useState } from "react";
import WeightMonthSection from "./WeightMonthSection";

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

    function clearActiveEntry() {
        setActiveEntry({
            id: null,
            isEditing: false
        })
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
                                <WeightMonthSection
                                    key={month}
                                    year={year}
                                    month={month}
                                    monthWeights={monthWeights}
                                    activeEntry={activeEntry}
                                    clearActiveEntry={clearActiveEntry}
                                    onEntryClick={handleEntryClick}
                                />
                            ))}
                    </div>
                ))
            }
        </ul >
    );
}