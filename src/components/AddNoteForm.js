import React, { useState } from "react";
import { Form, FormGroup, Label, Input, TextArea } from "./ui/Forms";
import Button from "./ui/Button";
import InfoWrapper from "./ui/InfoWrapper";

const AddNoteForm = () => {
  const [state, setState] = useState({ title: "", note: "" });
  const [isSuccess, setIsSuccess] = useState(null);
  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };
  const handleNoteChange = (e) => {
    setState({ ...state, note: e.target.value });
  };
  const handleSubmit = (e) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/note`,
        options
      );
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    };
    fetchData();
    e.preventDefault();
  };
  const { title, note } = state;
  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Note</Label>
          <TextArea
            name="note"
            rows="12"
            value={note}
            onChange={handleNoteChange}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Add</Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default AddNoteForm;
