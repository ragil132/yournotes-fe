import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  min-height: 10vh;
`;

const Footer = () => (
  <Container>
    <p>
      Made with &#10084; by{" "}
      <a href="https://ragil132.github.io">Ragillio Aji</a> &copy; 2021
    </p>
  </Container>
);

export default Footer;
