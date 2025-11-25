import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/"><button type="button" className="btn-nav btn-home btn" /></Link>
                <Link to="/weightentry"><button type="button" className="btn-nav btn-new-entry btn" /></Link>
                <Link to="/settings"><button type="button" className="btn-nav btn-settings btn" /></Link>
            </div>
        </nav>
    );
}