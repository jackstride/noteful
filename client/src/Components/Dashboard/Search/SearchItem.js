import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowResult = ({ data, folder }) => {
  let [folderName, setName] = useState([]);

  useEffect(() => {
    returnName();
  }, [data, folder]);

  let returnName = () => {
    let folderId = data.folder_id;
    let name = folder.filter(data => data._id === folderId);
    if (name) {
      name = name[0].folder_name.slice(0, 3);
    }
    setName(name);
  };

  return (
    <div className="result_holder">
      <Link to={`/dashboard/notes/${data._id}`}>
        <h5>{folderName}</h5>
        <h5>{data.note_title}</h5>
      </Link>
    </div>
  );
};

export default ShowResult;
