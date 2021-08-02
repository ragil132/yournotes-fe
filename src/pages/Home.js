import React from "react";
import NotesList from "../components/NotesList";
import Container from "../components/ui/Container";
import PageLayout from "../layouts/PageLayout";

const HomePage = () => (
  <PageLayout>
    <Container>
      <NotesList />
    </Container>
  </PageLayout>
);

export default HomePage;
