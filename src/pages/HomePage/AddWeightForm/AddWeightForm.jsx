import { useState } from "react";
import { addWeight } from "../../../firebase/weights";

export default function AddWeightForm({ id, petName, onCancel }) {
    const [date, setDate] = useState(1);
    const [weight, setWeight] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // addWeight(petId, weight, date);
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-check-label" htmlFor="selectDate">
                    <p> Datum </p>
                    <input
                        type="date"
                        id="newWeightDate"
                        min="1900-01-01"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="form-label">Gewicht</label>
                    <input
                        type="number"
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