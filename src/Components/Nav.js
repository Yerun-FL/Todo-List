import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavbarTodo = () => {
  return (
    <div>
      <br />
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand>
            <h2 className="text-white">Todo List</h2>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarTodo;
