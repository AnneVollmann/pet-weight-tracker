import { useState } from "react";
import PetDetailRow from "./PetDetailsRow";
import { updatePetProperty } from "../../../../firebase/pets";

export default function PetDetails({ onSubmit, onCancel, pet }) {
    function handleSubmit(id, currentInput) {
        updatePetProperty(pet.id, id, currentInput);
    }

    return (
        <section className="pet-details">
            <PetDetailRow
                id="birthday"
                label="Geburtstag"
                value={pet.birthday || ""}
                onSubmit={(id, currentInput) => handleSubmit(id, currentInput)}
            />

            <PetDetailRow
                id="moveDate"
                label="Bei uns seit"
                value={pet.moveDate || ""}
                onSubmit={(id, currentInput) => handleSubmit(id, currentInput)}
            />

            <PetDetailRow
                id="conditions"
                label="Erkrankungen"
                value={pet.conditions || ""}
                onSubmit={(id, currentInput) => handleSubmit(id, currentInput)}
            />

            <PetDetailRow
                id="description"
                label="Sonstiges"
                value={pet.description || ""}
                onSubmit={(id, currentInput) => handleSubmit(id, currentInput)}
            />
        </section >
    );
}