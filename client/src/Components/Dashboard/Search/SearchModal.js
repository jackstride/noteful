import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import SearchItem from "./SearchItem";
const SearchModal = ({
  noteData,
  id,
  getNotes,
  query,
  getFolder,
  folder,
  close
}) => {
  let history = useHistory();
  let [results, setResults] = useState([]);
  let [notes, setNotes] = useState([]);
  let ref = useRef();

  useEffect(() => {
    getNotes(id);
    setResults(noteData);
    setNotes(noteData);
    getFolder(id);
  }, [id]);

  useEffect(() => {
    if (!query || !query.length) {
      setResults(noteData);
    } else {
      let allNotes = notes.filter(note =>
        note.note_title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(allNotes);
    }
  }, [query]);

  let handleClick = e => {
    if (ref.current.contains(e.target)) {
      return;
    } else {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="search_results_container">
      {results.map((notes, index) => (
        <SearchItem key={index} data={notes} folder={folder} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    noteData: state.note.noteData,
    id: state.auth.user._id,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  getNotes: id => dispatch(getNotes(id)),
  getFolder: id => dispatch(getFolder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
