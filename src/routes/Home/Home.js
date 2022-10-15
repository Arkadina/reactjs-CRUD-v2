import React from "react";

import { useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userDisconnect } from "../../actions";

import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import CreateTable from "../../components/CreateTable/CreateTable";

import "./Home.css";

function Home(props) {
    var location = useLocation();

    function HomeContent() {
        switch (location.pathname) {
            case "/add":
                return <CreateTable />;
            default:
                return <Table />;
        }
    }

    return (
        <div className="home">
            <Header />
            <main className="home-main">
                <HomeContent />
            </main>
        </div>
    );
}

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ userDisconnect }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
