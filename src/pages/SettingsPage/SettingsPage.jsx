import { useState } from "react";
import AddPetForm from "./AddPetForm/AddPetForm";
import { addPet } from "../../firebase/pets";
import BasicModal from "../../components/ui/BasicModal/BasicModal";

export default function SettingsPage() {
    const [showAddPet, setShowAddPet] = useState(false);

    async function handleAddPet(img, name) {
        await addPet(img, name);
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
            <BasicModal
                show={showAddPet}
                onHide={() => setShowAddPet(false)}
                title={"Neues Tier hinzufügen"}
            >
                {<AddPetForm
                    onSubmit={(img, name) =>
                        handleAddPet(img, name)
                    }
                    onCancel={() => setShowAddPet(false)}
                />}
            </BasicModal>
        </section>
    );
}