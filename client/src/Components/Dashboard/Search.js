import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Notes from "./Notes/Notes";

const Search = ({ notes }) => {
  const [results, setResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let search = history.location.search;
    let length = search.length;
    let query = search.slice(2, length);
    console.log(query);
    let getNotes = notes.filter(note => note.note_title.includes(query));
    setResults(getNotes);
  }, [history.location.search]);

  return (
    <div>
      <Notes noteData={results} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.note.noteData
  };
};

export default connect(mapStateToProps)(Search);
