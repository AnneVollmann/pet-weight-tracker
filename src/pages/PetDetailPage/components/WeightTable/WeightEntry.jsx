import { useState } from "react";
import {
    formatDateToString,
    formatDateForInput
} from "../../../../lib/dates/formatDate";
import { updateWeight } from "../../../../firebase/weights";
import { Timestamp } from "firebase/firestore";

export default function WeightEntry({ weight, activeEntry, clearActiveEntry, onEntryClick }) {
    const [editedEntry, setEditedEntry] = useState({
        weight: weight.weight,
        date: formatDateForInput(weight.date.toDate())
    });

    const isSelected = activeEntry.id === weight.id;
    const isEditing = isSelected && activeEntry.isEditing;

    async function handleSave() {
        await updateWeight(weight.id, {
            weight: Number(editedEntry.weight),
            date: Timestamp.fromDate(new Date(editedEntry.date))
        });
        clearActiveEntry();
    }

    return (
        <li
            key={weight.id}
            onClick={(e) => {
                onEntryClick(weight.id, weight.date.toDate())
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
                            value={editedEntry.date}
                            onChange={(e) =>
                                setEditedEntry(prev => ({
                                    ...prev,
                                    date: e.target.value
                                }))
                            }
                            onBlur={handleSave}
                        />)
                        : (<>
                            {formatDateToString(weight.date)}
                        </>)
                }
            </span>

            <span className="pet-weight">
                {
                    activeEntry.id === weight.id && activeEntry.isEditing === true
                        ? (<input
                            type="text"
                            className="form-control-plaintext"
                            value={editedEntry.weight}
                            onChange={(e) =>
                                setEditedEntry(prev => ({
                                    ...prev,
                                    weight: e.target.value
                                }))
                            }
                            onBlur={handleSave}
                        />)
                        : (<>
                            {weight.weight}
                        </>)
                }
                g
            </span>
        </li>
    )
}