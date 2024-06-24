import React from "react";
import Style from "./calculadora.module.css";
import { Container, Row } from "react-bootstrap";

function Calculadora() {
  return (
    <div>
      <Container className={Style.container}>
        <Row>
          <col xs="3"></col>
          <col xs="9"></col>
        </Row>
      </Container>
    </div>
  );
}

export default Calculadora;
