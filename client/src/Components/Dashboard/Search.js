import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getNotes } from "../../actions/NoteActions";
import NoteResults from "./Results/NoteResults";

const Search = ({ noteData, getNotes, id }) => {
  const [notes, setNotes] = useState([]);
  const [results, setResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getNotes(id);
  }, [id]);

  useEffect(() => {
    setNotes(noteData);
  }, [noteData]);

  useEffect(() => {
    handleReults();
  }, [history.location.search]);

  let handleReults = () => {
    let search = history.location.search;
    if (!search.length) {
      setResults(noteData);
    } else {
      let length = search.length;
      let query = search.slice(2, length);
      let allNotes = notes.filter(note =>
        note.note_title.toLowerCase().includes(query)
      );
      setResults(allNotes);
    }
  };

  return <NoteResults results={results} />;
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
