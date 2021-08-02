import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Container from "../components/ui/Container";
import AddNoteForm from "../components/AddNoteForm";
import PageLayout from "../layouts/PageLayout";
import { HomeLink, Title } from "../components/ui/HomeLink";

const AddPage = () => (
  <PageLayout>
    <Container>
      <HomeLink>
        <Title>
          <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; <Link to="/">Back</Link>
        </Title>
      </HomeLink>
      <AddNoteForm />
    </Container>
  </PageLayout>
);

export default AddPage;
