import {
    formatDateToString,
    formatDateForInput
} from "../../../../lib/dates/formatDate";

export default function WeightEntry({
    weight,
    activeEntry,
    onEntryClick
}) {
    const isSelected = activeEntry.id === weight.id;
    const isEditing = isSelected && activeEntry.isEditing;

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
                            defaultValue={formatDateForInput(weight.date.toDate())}
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
                            defaultValue={weight.weight}
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