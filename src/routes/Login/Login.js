import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Loading from "../../components/Loading/Loading";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleOnSubmit(e) {
        e.preventDefault();
        connectUser(email, password);
    }

    function connectUser() {
        setIsLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("Usuário logado.");
            })
            .catch((err) => {
                console.error("Err: " + err);
            });
    }

    if (isLoading) {
        return (
            <div className="register-form-container">
                <Loading />
            </div>
        );
    }

    return (
        <div className="register-form-container">
            <h1>Entrar</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    defaultValue=""
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    defaultValue=""
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <div className="link-div">
                    <p>
                        <Link to="/register" className="link-login">
                            Quero criar conta
                        </Link>
                    </p>
                </div>
                <div>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
