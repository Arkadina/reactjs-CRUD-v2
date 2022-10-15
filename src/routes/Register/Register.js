import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

import firebase from "firebase";
import Loading from "../../components/Loading/Loading";

function Register(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            registerUser(email, password);
        }
    }

    function registerUser() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                let currentUser = user.user;
                console.log("Usuário registrado com sucesso.");
                setIsLoading(true);
                const userRef = firebase
                    .firestore()
                    .collection("users")
                    .doc(currentUser.uid);

                userRef.set({
                    email: currentUser.email,
                    emailVerified: currentUser.emailVerified,
                    crudData: [""],
                });

                setTimeout(() => {
                    navigate("/");
                }, 1000);
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
            <h1>Criar Conta</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    defaultValue=""
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    defaultValue=""
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    defaultValue=""
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>

                <div className="link-div">
                    <p>
                        <Link to="/" className="link-login">
                            Já tenho conta
                        </Link>
                    </p>
                </div>

                <div>
                    <button type="submit">Criar conta</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
