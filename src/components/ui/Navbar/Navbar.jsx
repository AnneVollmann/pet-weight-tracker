import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/"><button type="button" className="btn btn-home" /></Link>
                <Link to="/weightentry"><button type="button" className="btn btn-new-entry" /></Link>
                <Link to="/settings"><button type="button" className="btn btn-settings" /></Link>
            </div>
        </nav>
    );
}