export default function DateSelector({ selectedDateOption, setSelectedDateOption }) {
    const today = new Date()
    
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
                    checked={selectedDateOption === "today"}
                    onChange={() => setSelectedDateOption("today")}
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
                    checked={selectedDateOption === "selectDate"}
                    onChange={() => setSelectedDateOption("selectDate")}
                />
                <label className="form-check-label" htmlFor="selectDate">
                    <p> Datum auswählen</p>
                    {/* <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        disabled={selectedDateOption !== "selectDate"}
                    /> */}
                    <input
                        type="date"
                        id="new-weight-date"
                        min="1900-01-01"
                        disabled={selectedDateOption !== "selectDate"}/>
                </label>
            </div>
        </div>
    );
}