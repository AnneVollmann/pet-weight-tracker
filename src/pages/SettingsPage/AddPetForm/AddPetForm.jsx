import { useState } from "react";
import { animalCategories } from "../../../constants/animalCategories";

export default function AddPetForm({ onSubmit, onCancel, petGroups }) {
    const [species, setSpecies] = useState("guinea-pig");
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");
    const [newGroup, setNewGroup] = useState("");

    function handleSubmit(e) {
        const finalGroup =
            group === "add-new-group"
                ? newGroup
                : group;
        e.preventDefault();
        onSubmit(species, name, finalGroup);
        onCancel();
    }

    return (
        <form className="add-pet-form" onSubmit={handleSubmit}>
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

            <div className="form-pet-group mb-3">
                <label className="form-label">GRUPPE</label>
                <select
                    className="form-select"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                    <option value="">Keine</option>

                    {petGroups.map((groupName) => (
                        <option key={groupName} value={groupName}>
                            {groupName}
                        </option>
                    ))}

                    <option value="add-new-group">
                        + Neue Gruppe hinzufügen
                    </option>
                </select>

                {group === "add-new-group" && (
                    <div className="add-new-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Neue Gruppe eingeben"
                            value={newGroup}
                            onChange={(e) => setNewGroup(e.target.value)}
                        />
                    </div>
                )}
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