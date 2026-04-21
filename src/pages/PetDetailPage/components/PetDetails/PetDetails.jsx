export default function PetDetails({ onSubmit, onCancel }) {
    function handleSubmit(e) {
        e.preventDefault();
        onCancel();
    }

    return (
        <section className="pet-details">
            <div className="row">
                <label htmlFor="birthday" className="col-sm-2 col-form-label">Geburtstag</label>
                <div className="col-sm-10">
                    <input type="text" disabled className="form-control-plaintext" id="birthday" value="ca. Januar 2020" />
                    <button type="button" className="btn btn-primary">E</button>
                </div>
            </div>

            <div className="row">
                <label htmlFor="moveDate" className="col-sm-2 col-form-label">Bei uns seit</label>
                <div className="col-sm-10">
                    <input type="text" disabled className="form-control-plaintext" id="moveDate" value="03.06.2023" />
                    <button type="button" className="btn btn-primary">E</button>
                </div>
            </div>

            <div className="row">
                <label htmlFor="conditions" className="col-sm-2 col-form-label">Erkrankungen</label>
                <div className="col-sm-10">
                    <p type="text" disabled className="form-control-plaintext" id="conditions">keine</p>
                    <button type="button" className="btn btn-primary">E</button>
                </div>
            </div>

            <div className="row">
                <label htmlFor="description" className="col-sm-2 col-form-label">Sonstiges</label>
                <div className="col-sm-10">
                    <p type="text" disabled className="form-control-plaintext" id="origin">aus der Ukraine, Schwester von Nadiya und Vika</p>
                    <button type="button" className="btn btn-primary">E</button>
                </div>
            </div>
        </section>
    );
}