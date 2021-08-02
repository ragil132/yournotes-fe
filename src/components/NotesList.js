/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredNotes, fetchNotes } from "../features/notes/notesSlice";
import SearchBar from "./ui/SearchBar";
import Container from "./ui/Container";
import { DropdownMenu, Toolbar } from "./ui/DropdownMenu";

const NotesListContainer = tw.div`grid grid-cols-1 md:grid-cols-3 gap-4 my-8`;
const Card = tw.div`text-left p-4 border rounded-md`;
const Title = tw.h4`text-lg font-semibold text-purple-900`;

const NotesList = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const notes = useSelector((state) => getFilteredNotes(state, keyword));
  const notesStatus = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);
  useEffect(() => {
    if (notesStatus === "idle") {
      dispatch(fetchNotes());
    }
  }, [notesStatus, dispatch]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  let content;
  if (notesStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (notesStatus === "succeeded") {
    content = notes.map((note) => (
      <Card key={note._id}>
        <Title>
          <Link to={`/edit/${note._id}`}>{note.title}</Link>
        </Title>
        <p>{note.note.slice(0, 101)}</p>
      </Card>
    ));
  } else if (notesStatus === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <Container>
      <Toolbar>
        <SearchBar placeholder="Search Notes..." onChange={handleChange} />
        <DropdownMenu />
      </Toolbar>
      <NotesListContainer>{content}</NotesListContainer>
    </Container>
  );
};

export default NotesList;
