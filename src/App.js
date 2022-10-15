import "./App.css";

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import NotFound from "./routes/NotFound/NotFound";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import firebase from "firebase";

import "./config/firebaseConfig";
import { userConnect, userDisconnect } from "./actions";

function App(props) {
    const { currentUser, userConnect } = props;

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("onAuthState");
                getUserData(user.uid);
            }
        });
    }

    async function getUserData(id) {
        const userRef = firebase.firestore().collection("users").doc(id);

        await userRef.get().then((doc) => {
            userConnect(doc.data(), id);
        });
    }

    return (
        <Router>
            <div className="App">
                {currentUser ? <UserRoutes /> : <AuthRoutes />}
            </div>
        </Router>
    );
}

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.authReducer.currentUser,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ userConnect, userDisconnect }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
