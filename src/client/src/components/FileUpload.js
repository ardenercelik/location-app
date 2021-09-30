import React, { Fragment, useEffect, useState } from "react";

const FileUpload = ({ onSubmit, file, setFile }) => {
  const [filename, setFilename] = useState("Choose File");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" id="customFile" onChange={onChange} />
          <label htmlFor="customFile">{filename}</label>
        </div>

        <input type="submit" value="Upload" />
      </form>
    </Fragment>
  );
};

export default FileUpload;
