import { useState } from "react";
import { addWeight } from "../../../firebase/weights";

export default function AddWeightForm({ onSubmit, onCancel }) {
    const [date, setDate] = useState(new Date());
    const [weight, setWeight] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(weight, date);
        onCancel();
    }

    return (
        <form className="homepage-add-weight-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-check-label" htmlFor="selectDate">Datum</label>
                <input
                    type="date"
                    id="newWeightDate"
                    min="1900-01-01"
                    className="form-control"
                    onChange={e => {
                        const [year, month, day] = e.target.value.split("-");
                        setDate(new Date(year, month - 1, day));
                    }}
                />
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="selectWeight">Gewicht (in Gramm)</label>
                <input
                    type="number"
                    id="newWeightWeight"
                    pattern="\d*"
                    min="1"
                    max="999999"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                    onChange={e =>
                        setWeight(e.target.value)
                    }
                />
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Abbrechen
                </button>
                <button type="submit" className="btn btn-primary">
                    Gewicht hinzufügen
                </button>
            </div>
        </form>
    );
}