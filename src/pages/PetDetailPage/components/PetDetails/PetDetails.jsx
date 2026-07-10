import "./PetDetails.css"
import { useState } from "react";
import PetDetailRow from "./PetDetailsRow";
import { updatePetProperty } from "../../../../firebase/pets";
import BasicModal from "../../../../components/ui/BasicModal/BasicModal";
import { useNavigate } from "react-router-dom";

export default function PetDetails({ onSubmit, onCancel, pet, onUpdatePet }) {
    const [showConfirmArchiving, setShowConfirmArchiving] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(id, currentInput) {
        await updatePetProperty(pet.id, id, currentInput);
        onUpdatePet((prev) => ({
            ...prev,
            [id]: currentInput
        }));
    }

    async function archivePet() {
        await updatePetProperty(pet.id, "archived", true);
        navigate("/");
    }

    return (
        <section className="pet-details">
            <PetDetailRow
                id="group"
                label="Gruppe"
                value={pet.group || ""}
                onSubmit={(id, currentInput) => handleSubmit(id, currentInput)}
            />

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

            <button onClick={archivePet}>Archivieren</button>
        </section >
    );
}