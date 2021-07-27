/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import { Link } from "react-router-dom";
import EditNoteForm from "../components/EditNoteForm";
import PageLayout from "../layouts/PageLayout";
import Container from "../components/ui/Container";

const EditPage = () => (
  <PageLayout>
    <Container>
      <div>
        <h4>
          <Link to="/">Home</Link> / Edit{" "}
        </h4>
      </div>
      <h1>Edit Note</h1>
      <EditNoteForm />
    </Container>
  </PageLayout>
);

export default EditPage;
