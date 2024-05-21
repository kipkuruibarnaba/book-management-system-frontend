import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


function Header(){
return(
<div>
<>
      <Navbar bg="info" data-bs-theme="info">
        <Container>
          <Navbar.Brand >BOOK SYSTEM</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" style={{ textDecoration: 'none' ,paddingLeft: 13 }}>Home</Link>
            <Link to="/add-book" style={{ textDecoration: 'none' ,paddingLeft: 13 }} >AddBook</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
</div>
);
}
export default Header;