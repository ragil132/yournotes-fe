import React from "react";
import { Link } from "react-router-dom";
import NotesList from "../components/NotesList";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import PageLayout from "../layouts/PageLayout";

const HomePage = () => (
  <PageLayout>
    <Container>
      <Link to="/add">
        <Button>Add New Note</Button>
      </Link>
      <h1>All Notes</h1>
      <NotesList />
    </Container>
  </PageLayout>
);

export default HomePage;
