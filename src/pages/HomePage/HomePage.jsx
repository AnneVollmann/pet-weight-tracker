import "./HomePage.css";
import PetCard from "./PetCard/PetCard";
import AddWeightForm from "./AddWeightForm/AddWeightForm";
import { useState } from "react";
import { updatePetTimestamp } from "../../firebase/pets";
import { addWeight } from "../../firebase/weights";
import BasicModal from "../../components/ui/BasicModal/BasicModal";
import Toast from "../../components/ui/Toast/Toast";
import CategorySelector from "./CategorySelector/CategorySelector";
import { usePets } from "../../context/PetsContext";

export default function HomePage() {
    const { pets, loading, error, refreshPets } = usePets();
    const [selectedSpecies, setSelectedSpecies] = useState("all");
    const [showAddWeight, setShowAddWeight] = useState(false);
    const [showToastAddWeight, setShowToastAddWeight] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    if (loading) return <p>Lädt…</p>;

    if (error) return <p>Fehler beim Laden der Tiere.</p>;

    if (pets.length === 0) return <p>Noch keine Tiere vorhanden</p>;

    const visiblePets = [...pets]
        .filter((pet) => {
            switch(selectedSpecies) {
                case "all": return pet.archived !== true;
                case "archive": return pet.archived === true;
                default: return pet.archived !== true && pet.species === selectedSpecies;
            }
        })
        .sort(
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
            await refreshPets();
            setShowAddWeight(false);
            setShowToastAddWeight(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="page home-page">
            <header>
                <h1>Pet Weight Tracker</h1>

                <CategorySelector
                    selectedSpecies={selectedSpecies}
                    onSelectSpecies={setSelectedSpecies}
                />
            </header>

            <div className="content">
                <div className="pets-list">
                    {visiblePets.map((pet) => (
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
                    title={
                        selectedPet
                            ? `Gewicht für ${selectedPet.name}`
                            : "Gewicht hinzufügen"
                    }
                >
                    <AddWeightForm
                        onSubmit={(weight, date) =>
                            handleAddWeight(selectedPet, weight, date)
                        }
                        onCancel={() => setShowAddWeight(false)}
                    />
                </BasicModal>

                <Toast
                    show={showToastAddWeight}
                    message={
                        selectedPet
                            ? `Neues Gewicht für ${selectedPet.name} hinzugefügt!`
                            : "Neues Gewicht hinzugefügt!"
                    }
                    onClose={() => setShowToastAddWeight(false)}
                />
            </div>
        </section>
    );
}