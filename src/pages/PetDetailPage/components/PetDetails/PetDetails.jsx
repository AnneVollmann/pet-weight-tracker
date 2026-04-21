import { useState } from "react";
import PetDetailRow from "./PetDetailsRow";

export default function PetDetails({ onSubmit, onCancel }) {
    function handleSubmit(e) {
        e.preventDefault();
        onCancel();
    }

    return (
        <section className="pet-details">
            <PetDetailRow
                id="birthday"
                label="Geburtstag"
                value="ca. Januar 2020"
            />

            <PetDetailRow
                id="moveDate"
                label="Bei uns seit"
                value="03.06.2023"
            />

            <PetDetailRow
                id="conditions"
                label="Erkrankungen"
                value="keine"
            />

            <PetDetailRow
                id="description"
                label="Sonstiges"
                value="aus der Ukraine, Schwester von Nadiya und Vika"
            />
        </section >
    );
}