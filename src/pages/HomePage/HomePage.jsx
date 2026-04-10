import "./HomePage.css"
import PetCard from "./PetCard/PetCard";
import AddWeightForm from "./AddWeightForm/AddWeightForm";
import { useEffect, useState } from "react";
import { getAllPets, updatePetTimestamp } from "../../firebase/pets";
import { addWeight } from "../../firebase/weights";
import BasicModal from "../../components/ui/BasicModal/BasicModal";
import Toast from "../../components/ui/Toast/Toast";
import CategorySelector from "./CategorySelector/CategorySelector";

export default function HomePage() {
    const [pets, setPets] = useState(null);
    const [showAddWeight, setShowAddWeight] = useState(false);
    const [showToastAddWeight, setShowToastAddWeight] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        async function fetchPets() {
            try {
                const petsData = await getAllPets();
                setPets(petsData);
            }
            catch (error) {
                setPets("error");
            }
        }
        fetchPets();
    }, []);

    if (pets === null) return <p>Lädt…</p>;

    if (pets === "error") return <p>Fehler beim Laden der Tiere.</p>;

    if (pets.length === 0) return <p>Noch keine Tiere vorhanden</p>;

    const sortedPets = [...pets].sort(
        (a, b) => b.lastUpdated.toDate() - a.lastUpdated.toDate()
    );

    function handleOpenAddWeight(pet) {
        setSelectedPet(pet);
        setShowAddWeight(true);
    }

    async function handleAddWeight(pet, weight, date) {
        try {
            await addWeight(pet.id, weight, date);
            await updatePetTimestamp(pet.id);
            setShowAddWeight(false);
            setShowToastAddWeight(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="page">
            <div className="logo-container">
                <img className="logo" src="./assets/img/logo.png" alt="logo" />
                <div>
                    <h1>
                        <p>Pet</p>
                        <p>Weight</p>
                        <p>Tracker</p>
                    </h1>
                </div>
            </div>

            <CategorySelector></CategorySelector>

            <div className='pets-list'>
                {sortedPets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        onAddWeight={handleOpenAddWeight}
                    />
                ))}
            </div>

            <BasicModal
                show={showAddWeight}
                onHide={() => setShowAddWeight(false)}
                title={selectedPet
                    ? `Gewicht für ${selectedPet.name}`
                    : "Gewicht hinzufügen"}
            >
                {<AddWeightForm
                    onSubmit={(weight, date) => handleAddWeight(selectedPet, weight, date)}
                    onCancel={() => setShowAddWeight(false)}
                />}
            </BasicModal>

            <Toast
                show={showToastAddWeight}
                message={selectedPet
                    ? `Neues Gewicht für ${selectedPet.name} hinzugefügt!`
                    : "Neues Gewicht hinzugefügt!"
                }
                onClose={() => setShowToastAddWeight(false)}
            />
        </section>
    );
}