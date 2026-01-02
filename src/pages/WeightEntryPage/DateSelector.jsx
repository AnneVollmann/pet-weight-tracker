import { useState } from "react";

export default function DateSelector({ setSelectedDateOption }) {
    const [dateSelectionMode, setDateSelectionMode] = useState("today");    //"today" | "selectDate"

    return (
        <div>
            <h2>Datum</h2>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="date"
                    id="today"
                    value="today"
                    checked={dateSelectionMode === "today"}
                    onChange={() => {
                        setDateSelectionMode("today");
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        setSelectedDateOption(today);
                    }}
                />
                <label className="form-check-label" htmlFor="today">
                    Heute
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="date"
                    id="selectDate"
                    value="selectDate"
                    checked={dateSelectionMode === "selectDate"}
                    onChange={() => {
                        setDateSelectionMode("selectDate");
                    }}
                />
                <label className="form-check-label" htmlFor="selectDate">
                    <p> Datum auswählen</p>
                    <input
                        type="date"
                        id="newWeightDate"
                        min="1900-01-01"
                        disabled={dateSelectionMode !== "selectDate"}
                        onChange={(e) => {
                            setDateSelectionMode("selectDate");
                            const [year, month, day] = e.target.value.split("-");
                            setSelectedDateOption(new Date(year, month - 1, day));
                        }}
                    />
                </label>
            </div>
        </div>
    );
}