import React from "react";
import Form from "react-bootstrap/Form";
import { useState,useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';

function AddBookForm() {
    const baseUrl ="http://localhost:8000/";
    const navigateTo = useNavigate();
    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        year_published: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setBook({
            ...book,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
          
         try {
            console.log(book);
            const response = await axios.post(baseUrl + "books", book, {

            });
      
            if (response.status === 200 || response.status === 201) {
              alert("Book has been added successfully!");
              navigateTo('/');
            } else {
              console.error("Error adding book:", response);
              // Handle specific errors here (optional)
            }
          } catch (error) {
            console.error("Error adding book:", error);
            // Handle general errors here
          }
        }
       
    function handleCancel() {
        navigateTo('/')
    }
    return (
<div>
<div className="col-md-8 offset-sm-2 mt-2">

<div className="card">
        <div className="card-header">
        <h4>Add Book</h4>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Book Title</label>
                    <input type="text" onChange={handleChange} value={book.title} name="title" placeholder="Enter Book Title" className="form-control"  required/>
                </div>
                <div className="form-group mb-3">
                    <label>Book Author</label>
                    <input type="text" onChange={handleChange} value={book.author} name="author" placeholder="Enter Book Author" className="form-control" required/>
                </div>
                <div className="form-group mb-3">
                    <label>Book Genre</label>
                    <input type="text" onChange={handleChange} value={book.genre} name="genre" placeholder="Enter Book Genre" className="form-control"  required/>
                </div>
                <div className="form-group mb-3">
                    <label>Year of Publication</label>
                    <input type="date" name="year_published" onChange={handleChange} value={book.year_published}  className="form-control"  required/>
                </div>
                <div className="form-group mb-3">
                    <button type="submit" className="btn btn-success" style={{ marginRight: '16px' }}>Add Book</button>
                    <button onClick={handleCancel} className="btn btn-danger" style={{ marginRight: '16px' }}>Cancel</button>
                </div>
            </form>
        </div>
     </div>
</div>
</div>
      );
}
export default AddBookForm;
