import { useState } from "react";
import PetDetailRow from "./PetDetailsRow";

export default function PetDetails({ onSubmit, onCancel, pet }) {
    function handleSubmit(e) {
        e.preventDefault();
        onCancel();
    }

    const moveDateFormatted = pet.moveDate ?
        pet.moveDate.toDate().toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }) : ""

    return (
        <section className="pet-details">
            <PetDetailRow
                id="birthday"
                label="Geburtstag"
                value={pet.birthday || ""}
            />

            <PetDetailRow
                id="moveDate"
                label="Bei uns seit"
                value={moveDateFormatted}
            />

            <PetDetailRow
                id="conditions"
                label="Erkrankungen"
                value={pet.conditions || ""}
            />

            <PetDetailRow
                id="description"
                label="Sonstiges"
                value={pet.description || ""}
            />
        </section >
    );
}