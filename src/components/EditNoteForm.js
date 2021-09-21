/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  updateExistingNote,
  deleteNote,
  statusReset,
} from "../features/notes/notesSlice";
import { Form, FormGroup, FormButtonGroup, Input, TextArea } from "./ui/Forms";
import Button from "./ui/Button";
import InfoWrapper from "./ui/InfoWrapper";

require("dotenv").config();

const EditNoteForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [currentNote, setCurrentNote] = useState({ title: "", note: "" });

  useEffect(() => {
    const noteId = location.pathname.replace('/edit/', '');
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('user'));
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${noteId}`, requestOptions);
      const data = await response.json();
      setCurrentNote(data);
    }

    fetchData();
  }, []);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleTitleChange = (e) => {
    setCurrentNote({ ...currentNote, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setCurrentNote({ ...currentNote, note: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actionResult = await dispatch(updateExistingNote(currentNote));
      const result = unwrapResult(actionResult);
      if (result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Terjadi kesalahan: ", err);
      setIsSuccess(false);
    } finally {
      dispatch(statusReset());
    }
  };

  const handleDeleteNote = async (e) => {
    e.preventDefault();

    try {
      const actionResult = await dispatch(deleteNote(currentNote));
      const result = unwrapResult(actionResult);
      if (result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Terjadi kesalahan: ", err);
      setIsSuccess(false);
    } finally {
      dispatch(statusReset());
      history.push("/");
    }
  };

  const { title, note } = currentNote;

  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <TextArea
            name="note"
            rows="12"
            value={note}
            onChange={handleNoteChange}
          />
        </FormGroup>
        <FormButtonGroup>
          <Button type="submit">
            <FontAwesomeIcon icon={faSave} /> &nbsp; Save
          </Button>
          <Button danger onClick={handleDeleteNote}>
            <FontAwesomeIcon icon={faTrashAlt} /> &nbsp; Delete
          </Button>
        </FormButtonGroup>
      </Form>
    </>
  );
};

export default EditNoteForm;
