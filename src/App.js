import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container fluid>
        <Home />
      </Container>
    </React.Fragment>
  );
}

export default App;
