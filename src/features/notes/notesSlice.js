/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));

require("dotenv").config();

const initialState = { data: [], status: "idle", error: null };

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`, requestOptions);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw Error(response.statusText);

});

export const addNewNote = createAsyncThunk(
  "notes/AddNewNote",
  async (initialNotes) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(initialNotes)
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/note`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      const noteAdded = { ...initialNotes, _id: data._id };
      return noteAdded;
    }
    throw Error(response.statusText);

  }
);

export const updateExistingNote = createAsyncThunk(
  "notes/updateNote",
  async (currentNote) => {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(currentNote),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/note/${currentNote._id}`,
      requestOptions
    );
    if (response.ok) {
      return currentNote;
    }
    throw Error(response.statusText);
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (currentNote) => {
    const requestOptions = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/note/${currentNote._id}`,
      requestOptions
    );
    if (response.ok) {
      return currentNote;
    }
  }
);

export const getFilteredNotes = (state, keyword) => {
  if (keyword) {
    const isKeywordExist = (array, string) =>
      array.toLowerCase().includes(string);

    return state.notes.data.filter(
      (note) =>
        isKeywordExist(note.note, keyword) ||
        isKeywordExist(note.title, keyword)
    );
  }
  return state.notes.data;
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    statusReset(state, action) {
      state.status = "idle";
    },
    updateSort(state, action) {
      if (action.payload === "oldest") {
        state.data = state.data.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      } else if (action.payload === "newest") {
        state.data = state.data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [fetchNotes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewNote.pending]: (state, action) => {
      state.status = "loading";
    },
    [addNewNote.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data.push(action.payload);
    },
    [addNewNote.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateExistingNote.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateExistingNote.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const { _id, title, note } = action.payload;
      const existingNote = state.data.find((note) => note._id === _id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.note = note;
      }
    },
    [updateExistingNote.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteNote.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteNote.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const { _id } = action.payload;
      const updatedNotes = state.data.filter((note) => note._id === _id);
      state.data = updatedNotes;
    },
    [deleteNote.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const getAllNotes = (state) => state.notes.data;

export const getNoteById = (state, noteId) =>
  state.notes.data.find((note) => note.id === noteId);

export const { statusReset, updateSort } = notesSlice.actions;

export default notesSlice.reducer;
