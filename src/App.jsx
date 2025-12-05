import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";

import Navbar from './components/ui/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import PetDetailPage from './pages/PetDetailPage/PetDetailPage';
import WeightEntryPage from './pages/WeightEntryPage/WeightEntryPage';

function App() {
    useEffect(() => {
        console.log("Firebase DB:", db);

        getDocs(collection(db, "test")).then(() => {
            console.log("Firestore connected!");
        }).catch(err => {
            console.error("Firestore error:", err);
        });

    }, []);

    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/weightentry" element={<WeightEntryPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/pet/:id" element={<PetDetailPage />} />
                </Routes>
                <Navbar />
            </main>
        </Router>
    );
}

export default App;