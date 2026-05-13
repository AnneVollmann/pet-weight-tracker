import { useState } from "react";
import { animalCategories } from "../../../constants/animalCategories";

export default function AddPetForm({ onSubmit, onCancel }) {
    const [species, setSpecies] = useState("");
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(species, name, group);
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name*</label>
                <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Tierart*</label>
                <select
                    className="form-select"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                >
                    {animalCategories.map(species => (
                        <option key={species.id} value={species.id}>{species.label}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Gruppe</label>
                <input
                    className="form-control"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Abbrechen
                </button>
                <button type="submit" className="btn btn-primary">
                    Tier hinzufügen
                </button>
            </div>
        </form>
    );
}