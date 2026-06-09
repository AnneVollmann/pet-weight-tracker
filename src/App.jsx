import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetsProvider } from "./context/PetsContext";
import Navbar from './components/ui/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import PetDetailPage from './pages/PetDetailPage/PetDetailPage';
import WeightEntryPage from './pages/WeightEntryPage/WeightEntryPage';

function App() {
    return (
        <PetsProvider>
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
        </PetsProvider>
    );
}

export default App;