import { useState } from "react";
import Overlay from "../../components/ui/Overlay/Overlay";
import AddPetForm from "./AddPetForm/AddPetForm";
import { addPet } from "../../firebase/pets";

export default function SettingsPage() {
    const [showAddPet, setShowAddPet] = useState(false);

    async function handleAddPet(petData) {
        await addPet(petData);
        setShowAddPet(false);
    }

    return (
        <section>
            <h1>Einstellungen</h1>
            <button
                className="btn btn-primary"
                onClick={() => setShowAddPet(true)}
            >
                Tier hinzufügen
            </button>

            <Overlay
                show={showAddPet}
                onClose={() => setShowAddPet(false)}
                title="Neues Tier hinzufügen"
            >
                <AddPetForm
                    onSubmit={handleAddPet}
                    onCancel={() => setShowAddPet(false)}
                />
            </Overlay>
        </section>
    );
}