import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Notes from "./Notes/Notes";

import { getNotes } from "../../actions/NoteActions";

const Search = ({ noteData, getNotes, id }) => {
  const [notes, setNotes] = useState([]);
  const [results, setResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getNotes(id);
  }, []);

  useEffect(() => {
    setNotes(noteData);
  }, [noteData]);

  useEffect(() => {
    handleReults();
  }, [history.location.search]);

  let handleReults = () => {
    let search = history.location.search;
    let length = search.length;
    let query = search.slice(2, length);
    let allNotes = notes.filter(note => note.note_title.includes(query));
    setResults(allNotes);
  };

  return (
    <div>
      <Notes results={results} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    noteData: state.note.noteData,
    id: state.auth.user._id
  };
};

const mapDispatchToProps = dispatch => ({
  getNotes: id => dispatch(getNotes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
