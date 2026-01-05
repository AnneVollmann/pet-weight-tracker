import { useState } from "react";

export default function AddPetForm({ onSubmit, onCancel }) {
    const [img, setImg] = useState(1);
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(img, name);
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">img</label>
                <select
                    className="form-select"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                >
                    {[1, 2, 3].map(n => (
                        <option key={n} value={Number(n)}>{n}</option>
                    ))}
                </select>
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