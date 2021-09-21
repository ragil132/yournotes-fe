import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NotesList from "../components/NotesList";
import Container from "../components/ui/Container";
import PageLayout from "../layouts/PageLayout";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <PageLayout>
          <Container>
            <NotesList />
          </Container>
        </PageLayout>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default HomePage;
