import React from "react";
import Form from "react-bootstrap/Form";
import { useState,useEffect } from 'react';
import { Link, useNavigate,useParams  } from 'react-router-dom';
import axios from 'axios';

function EditBookForm(props) {
    const { id } = useParams();
    const baseUrl ="http://localhost:8000/";
    
    const config = {
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*" 
        }
      };

    useEffect(()=>{
        async function getData() {
            try {
              const response = await axios.get("http://localhost:8000/books/"+id ,config);
              console.log(response)
              setBook(response.data); 
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          getData()
      },[])

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
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.put(`${baseUrl}books/${id}`, book, config);
    
          if (response.status === 200 || response.status === 201) {
            alert("Book has been updated successfully!");
            navigateTo('/');
          } else {
            console.error("Error updating book:", response);
          }
        } catch (error) {
          console.error("Error updating book:", error);
          // Handle general errors here
        }
      };
    function handleCancel() {
        navigateTo('/')
    }
    return (
<div>
<div className="col-md-8 offset-sm-2 mt-2">

<div className="card">
        <div className="card-header">
        <h4>Edit Book</h4>
        </div>
        <div className="card-body">
            <form >
                <div className="form-group mb-3">
                    <label>Book Title</label>
                    <input type="text" onChange={handleChange} Value={book.title} name="title" placeholder="Enter Book Title" className="form-control"  required/>
                </div>
                <div className="form-group mb-3">
                    <label>Book Author</label>
                    <input type="text" onChange={handleChange} Value={book.author} name="author" placeholder="Enter Book Author" className="form-control" required/>
                </div>
                <div className="form-group mb-3">
                    <label>Book Genre</label>
                    <input type="text" onChange={handleChange} Value={book.genre} name="genre" placeholder="Enter Book Genre" className="form-control"  required/>
                </div>
                <div className="form-group mb-3">
                    <label>Year of Publication</label>
                    <input  type="date" name="year_published" onChange={handleChange} Value={book.year_published}  className="form-control" required />
                </div>
                <div className="form-group mb-3">
                    <button type="submit" className="btn btn-success" onClick={handleSubmit} style={{ marginRight: '16px' }}>Update</button>
                    <button onClick={handleCancel} className="btn btn-danger" style={{ marginRight: '16px' }}>Cancel</button>
                </div>
            </form>
        </div>
     </div>
</div>
</div>
      );
}
export default EditBookForm;
