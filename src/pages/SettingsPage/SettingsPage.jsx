import { useState } from "react";
import AddPetForm from "./AddPetForm/AddPetForm";
import { addPet } from "../../firebase/pets";
import BasicModal from "../../components/ui/BasicModal/BasicModal";
import Toast from "../../components/ui/Toast/Toast";

export default function SettingsPage() {
    const [showAddPet, setShowAddPet] = useState(false);
    const [showToastAddPet, setShowToastAddPet] = useState(false);

    async function handleAddPet(species, name, group) {
        try {
            await addPet(species, name, group);
            setShowAddPet(false);
            setShowToastAddPet(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="page">
            <div className="content">
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
                        onSubmit={(species, name, group) =>
                            handleAddPet(species, name, group)
                        }
                        onCancel={() => setShowAddPet(false)}
                    />}
                </BasicModal>
                <Toast
                    show={showToastAddPet}
                    message={"Neues Tier erfolgreich hinzugefügt!"}
                    onClose={() => setShowToastAddPet(false)}
                />
            </div>
        </section>
    );
}