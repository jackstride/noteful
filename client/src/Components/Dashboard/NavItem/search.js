import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchModal from "../Search/SearchModal";
const Search = props => {
  let [search, setSearch] = useState(false);
  let [query, setQuery] = useState();

  let handleClick = e => {
    e.preventDefault();
    setSearch(true);
  };

  let closeModal = () => {
    setSearch(false);
  };

  return (
    <div className="app_search">
      <div className="search_container">
        <input
          name="query"
          onClick={e => {
            handleClick(e);
          }}
          onChange={e => {
            setQuery(e.target.value);
          }}
          type="search"
          autoComplete="off"
          placeholder="Search your notes.."
        ></input>
        <FontAwesomeIcon icon="search" size="1x" />
      </div>
      {search ? (
        <SearchModal
          close={() => {
            closeModal();
          }}
          query={query}
        />
      ) : null}
    </div>
  );
};

export default Search;
