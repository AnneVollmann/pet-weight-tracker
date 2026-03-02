import { useState } from "react";
import Overlay from "../../components/ui/Overlay/Overlay";
import AddPetForm from "./AddPetForm/AddPetForm";
import { addPet } from "../../firebase/pets";
import { Modal } from "react-bootstrap";

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

            <Modal
                show={showAddPet}
                onHide={() => setShowAddPet(false)}
                centered
                backdrop="true"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p>Neues Tier hinzufügen</p>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddPetForm
                        onSubmit={(img, name) =>
                            handleAddPet(img, name)
                        }
                        onCancel={() => setShowAddPet(false)}
                    />
                </Modal.Body>
            </Modal>
        </section>
    );
}