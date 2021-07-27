import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import AddNoteForm from "../components/AddNoteForm";
import PageLayout from "../layouts/PageLayout";

const AddPage = () => (
  <PageLayout>
    <Container>
      <div>
        <h4>
          <Link to="/">Home</Link> / Add
        </h4>
      </div>
      <h2>Add New Note</h2>
      <AddNoteForm />
    </Container>
  </PageLayout>
);

export default AddPage;
