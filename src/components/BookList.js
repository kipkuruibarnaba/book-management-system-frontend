import React, { useState, useEffect } from "react";
import Loading from "./widgets/Loading";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import intervalReRenderData from "./Helpers/Helpers";
function BookList() {
  const baseUrl = "http://localhost:8000/";
  const [data, setData] = useState([]);
  const [domUpdateStatus, setDomUpdateStatus] = useState(0);

  // console.log(data);
  console.log("dom " + domUpdateStatus);
  console.log("dat " + data.length);

  useEffect(() => {
    if (domUpdateStatus === 0) {
      getData();
    }
    setInterval(() => getData(), intervalReRenderData());
  }, []);

  const config = {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  };

  async function getData() {
    try {
      const response = await axios.get(baseUrl + "books", config);
      // console.log(response);
      setData(response.data);
      setDomUpdateStatus(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  let no = 1;

  const handleDelete = async (bookId) => {
    // Confirmation before deletion
    const confirmDelete = window.confirm("Confirm book deletion?");

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          baseUrl + "books/" + bookId,
          config
        );
        console.log(response.data);
      
        // Update the data state to reflect the deleted book
        const updatedData = data.filter((item) => item._id !== bookId);
        setData(updatedData);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const renderOnLoadDom = () => {
    let no = 1;
    return (
      <div>
        <div className="container mt-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year Published</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{no++}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.genre}</td>
                  <td>{item.year_published}</td>
                  <td>
                    {/* <Link to ={"update/"+item.id }> */}
                    <Link
                      to={"update/" + item._id}
                      className="btn btn-info btn-sm m-2"
                    >
                      Edit
                    </Link>
                    {/* <button className='btn btn-danger btn-sm'>Delete</button> */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };
  return domUpdateStatus === 0 ? <Loading /> : renderOnLoadDom();
  // return (
  //   <div>
  //     <div className="container mt-2">
  //       <Table striped bordered hover>
  //         <thead>
  //           <tr>
  //             {/* <th>ID</th> */}
  //             <th>No.</th>
  //             <th>Title</th>
  //             <th>Author</th>
  //             <th>Genre</th>
  //             <th>Year Published</th>
  //             <th>Operation</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {
  //               data.map((item)=>
  //                   <tr key={item._id}>
  //                   <td>{no++}</td>
  //                   <td>{item.title}</td>
  //                   <td>{item.author}</td>
  //                   <td>{item.genre}</td>
  //                   <td>{(item.year_published)}</td>
  //                   <td>
  //                       {/* <Link to ={"update/"+item.id }> */}
  //                     <Link to ={"update/"+item._id } className='btn btn-info btn-sm m-2'>Edit</Link>
  //                     {/* <button className='btn btn-danger btn-sm'>Delete</button> */}
  //                     <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>

  //                   </td>
  //                 </tr>
  //               )
  //           }
  //         </tbody>
  //       </Table>
  //     </div>
  //   </div>
  // );
}

export default BookList;
