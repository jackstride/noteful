import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = props => {
  let history = useHistory();

  let handleClick = () => {
    history.push("/dashboard/search/search");
  };

  let handleOnChange = e => {
    history.replace("/dashboard/search/search?=" + e.target.value);
  };

  return (
    <div className="app_search">
      <div className="search_container">
        <input
          onClick={() => {
            handleClick();
          }}
          onChange={e => {
            handleOnChange(e);
          }}
          type="search"
          placeholder="Search your notes.."
        ></input>
        <FontAwesomeIcon icon="search" size="1x" />
      </div>
    </div>
  );
};

export default Search;
