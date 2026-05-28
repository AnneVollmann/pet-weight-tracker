import { useState } from "react";
import { animalCategories } from "../../../constants/animalCategories";
import SelectGroup from "../../../components/form/SelectGroup/SelectGroup";

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

            <SelectGroup
                group={group}
                newGroup={newGroup}
                petGroups={petGroups}
                onSetGroup={(groupName) => setGroup(groupName)}
                onSetNewGroup={(groupName) => setNewGroup(groupName)}
            />

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