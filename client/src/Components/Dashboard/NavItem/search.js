import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Search = props => {
  let history = useHistory();

  let handleClick = () => {
    history.push("/dashboard/search/search");
  };

  let handleOnChange = e => {
    let path = history.location.pathname;
    // console.log(e.target.value);
    history.replace("/dashboard/search/search?=" + e.target.value);
  };

  return (
    <div className="app_search">
      <input
        onClick={() => {
          handleClick();
        }}
        onChange={e => {
          handleOnChange(e);
        }}
        type="search"
        placeholder="# Search"
      ></input>
    </div>
  );
};

export default Search;
