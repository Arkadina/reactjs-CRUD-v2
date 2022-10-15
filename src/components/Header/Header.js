import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import firebase from "firebase";

import "./Header.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loading from "../Loading/Loading";
import { userDisconnect } from "../../actions";

function Header(props) {
    const { email, userDisconnect } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSignOut = () => {
        firebase.auth().signOut();
        userDisconnect();
        navigate("/");
    };

    return (
        <div className="header">
            <div className="header-right-side">
                <h1>Logo</h1>
            </div>
            <div className="header-middle-side">
                <ul>
                    <li>
                        <NavLink
                            className="navlink-header"
                            to="/"
                            style={() => {
                                return {
                                    fontWeight:
                                        pathname === "/" ? "600" : "400",
                                };
                            }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/add"
                            className="navlink-header"
                            style={() => {
                                return {
                                    fontWeight:
                                        pathname === "/add" ? "600" : "400",
                                };
                            }}
                        >
                            Adicionar livro
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="header-left-side">
                {
                    <p>
                        Olá,
                        {email ? <strong> {email} (:</strong> : <Loading />}
                    </p>
                }
                <button onClick={handleSignOut}>
                    <a>Sair</a>
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => ({
    email: store.authReducer.email,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            userDisconnect,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
