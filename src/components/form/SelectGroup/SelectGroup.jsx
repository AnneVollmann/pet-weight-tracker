export default function SelectGroup({group, newGroup, petGroups, onSetGroup, onSetNewGroup}) {
    return (
        <div className="form-pet-group mb-3">
            <label className="form-label">Gruppe</label>
            <select
                className="form-select"
                value={group}
                onChange={(e) => onSetGroup(e.target.value)}
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
                        onChange={(e) => onSetNewGroup(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}