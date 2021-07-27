import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo_transparent.png";

const Container = styled.div`
  margin: 1rem;
  padding: 0.5rem;
`;

const Header = () => (
  <Container>
    <img src={logo} width="100px" alt="logo" />
    <h1>YourNotes App</h1>
  </Container>
);

export default Header;
