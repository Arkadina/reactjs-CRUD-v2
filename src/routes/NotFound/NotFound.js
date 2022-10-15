import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    let location = useLocation();
    return (
        <div className="notfound">
            <h1>Ops, está página não existe!</h1>
            <h2>
                Endereço: <span>{location.pathname}</span>
            </h2>
            <p>
                Voltar para <Link to="/">home</Link>
            </p>
        </div>
    );
}

export default NotFound;
