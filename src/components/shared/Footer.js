import React from "react";
import tw from "twin.macro";

const Container = tw.div`m-4 p-2`;

const Footer = () => (
  <Container>
    <p>
      Made with &#10084; by{" "}
      <a href="https://ragil132.github.io">Ragillio Aji</a> &copy; 2021
    </p>
  </Container>
);

export default Footer;
