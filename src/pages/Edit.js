/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import EditNoteForm from "../components/EditNoteForm";
import PageLayout from "../layouts/PageLayout";
import Container from "../components/ui/Container";
import { HomeLink, Title } from "../components/ui/HomeLink";

const EditPage = () => (
  <PageLayout>
    <Container>
      <HomeLink>
        <Title>
          <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; <Link to="/">Back</Link>
        </Title>
      </HomeLink>
      <EditNoteForm />
    </Container>
  </PageLayout>
);

export default EditPage;
