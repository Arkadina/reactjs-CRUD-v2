import React, { useState } from "react";
import Loading from "../Loading/Loading";

import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateData } from "../../actions";
import { NavLink } from "react-router-dom";
import "./Table.css";

function Table(props) {
    const [editTable, setEditTable] = useState(false);
    const [newBook, setNewBook] = useState(null);
    const [newAuthor, setNewAuthor] = useState(null);
    const [updateItem, setUpdateItem] = useState(null);

    const { crudData, id, updateData } = props;

    async function handleDeleteItem(deleteID) {
        let newArray = [];
        const userRef = firebase.firestore().collection("users").doc(id);
        crudData.map((item) => {
            if (item.id !== deleteID) {
                newArray.push(item);
            }
        });
        if (newArray.length === 0) {
            await userRef.update({
                crudData: [""],
            });
            updateData([""]);
        } else {
            await userRef.update({
                crudData: newArray,
            });
            updateData(newArray);
        }
    }

    function handleUpdateItem(doc) {
        setUpdateItem(doc);
        setEditTable(true);
    }

    function handleUpdateTable(e) {
        e.preventDefault();

        let newArray = crudData;
        const userRef = firebase.firestore().collection("users").doc(id);

        if (newBook === null && newAuthor === null) {
            setEditTable(false);
        } else {
            newArray.forEach((item, index) => {
                if (item.id === updateItem.id) {
                    newArray[index] = {
                        id: updateItem.id,
                        book: newBook ? newBook : updateItem.book,
                        author: newAuthor ? newAuthor : updateItem.author,
                    };
                }
            });

            userRef
                .update({
                    crudData: newArray,
                })
                .then(() => {
                    setEditTable(false);
                    updateData(newArray);
                });
        }
    }

    if (editTable) {
        console.log("Aqui");
        return (
            <div className="table">
                <div className="table">
                    <form className="table-form" onSubmit={handleUpdateTable}>
                        <input
                            type="text"
                            id="book-id"
                            placeholder="Livro"
                            defaultValue={updateItem.author}
                            onChange={(e) => {
                                setNewBook(e.target.value, newBook);
                            }}
                        />
                        <input
                            type="text"
                            id="book-author"
                            placeholder="Autor"
                            defaultValue={updateItem.author}
                            onChange={(e) => {
                                setNewAuthor(e.target.value, newAuthor);
                            }}
                        />
                        <button
                            type="submit"
                            style={{ backgroundColor: "#1C6758" }}
                        >
                            Editar
                        </button>
                    </form>
                </div>
            </div>
        );
    } else {
        if (crudData) {
            return (
                <div className="table">
                    {crudData[0] === "" ? (
                        <div className="table-no-data">
                            <h1>Nenhum livro foi adicionado ainda!</h1>
                            <p>
                                Crie
                                <NavLink className="navlink-table" to="/add">
                                    Aqui
                                </NavLink>
                            </p>
                        </div>
                    ) : (
                        <table className="books-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Livro</th>
                                    <th>Autor</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {crudData.map((doc, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{doc.id}</td>
                                            <td>{doc.book}</td>
                                            <td>{doc.author}</td>
                                            <td>
                                                <button
                                                    className="btn btn-editar"
                                                    onClick={() =>
                                                        handleUpdateItem(doc)
                                                    }
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-excluir"
                                                    onClick={() =>
                                                        handleDeleteItem(doc.id)
                                                    }
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

const mapStateToProps = (state) => ({
    id: state.authReducer.id,
    crudData: state.authReducer.crudData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateData,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
