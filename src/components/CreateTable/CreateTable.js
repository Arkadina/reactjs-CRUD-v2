import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTable.css";

import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateData } from "../../actions";

function CreateTable(props) {
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();

    const { crudData, id, updateData } = props;

    function handleOnSubmit(e) {
        e.preventDefault();
        setBooks();
    }

    function setBooks() {
        const userRef = firebase.firestore().collection("users").doc(id);
        let newArray = crudData;

        if (crudData[0] === "") {
            newArray[0] = {
                id: 1,
                book: book,
                author: author,
            };

            userRef.update({
                crudData: newArray,
            });
        } else {
            newArray = [
                ...newArray,
                {
                    id: newArray[newArray.length - 1].id + 1,
                    book: book,
                    author: author,
                },
            ];

            userRef.update({
                crudData: newArray,
            });
            updateData(newArray);
        }
        navigate("/");
    }

    return (
        <div className="table">
            <form className="table-form" onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    id="book-id"
                    placeholder="Livro"
                    onChange={(e) => {
                        setBook(e.target.value, book);
                    }}
                />
                <input
                    type="text"
                    id="book-author"
                    placeholder="Autor"
                    onChange={(e) => {
                        setAuthor(e.target.value, author);
                    }}
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}

const mapStateToProps = (store) => ({
    crudData: store.authReducer.crudData,
    id: store.authReducer.id,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ updateData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateTable);
