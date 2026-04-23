import { useState } from "react";

export default function PetDetailRow({ label, value, id, onSubmit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentInput, setCurrentInput] = useState(value);

    function handleEdit() {
        setIsEditing(true);
        setCurrentInput(value);
    }

    function handleCancel() {
        setIsEditing(false);
        setCurrentInput(value);
    }

    function handleSubmit(){
        onSubmit(id, currentInput);
        setIsEditing(false);
    }

    return (
        <div className="row">
            <label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                {isEditing ? (
                    <>
                        <textarea
                            type="text"
                            className="form-control-plaintext"
                            id={id}
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn-submit btn"/>
                    </>
                ) : (
                    <>
                        <p
                            type="text"
                            className="form-control-plaintext"
                            id={id}>
                            {currentInput || value}
                        </p>
                        <button
                            onClick={handleEdit}
                            type="button"
                            className="btn-edit btn"/>
                    </>
                )}
            </div>
        </div >
    );
}