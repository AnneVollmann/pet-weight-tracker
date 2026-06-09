import { createContext, useContext, useEffect, useState } from "react";
import { getAllPets } from "../firebase/pets";

const PetsContext = createContext();

export function PetsProvider({ children }) {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPets() {
        setLoading(true);
        setError(null);

        try {
            const data = await getAllPets();
            setPets(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPets();
    }, []);

    return (
        <PetsContext.Provider
            value={{
                pets,
                loading,
                error,
                refreshPets: fetchPets
            }}
        >
            {children}
        </PetsContext.Provider>
    );
}

export function usePets() {
    return useContext(PetsContext);
}