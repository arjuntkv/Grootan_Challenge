import React from "react";
import New from "./new";

const NewList = (props) => {
  return (
    <div>
      {Object.keys(props.main).map((key, index) => (
        <New
          key={index}
          name={key}
          value={props.main[key]}
          handleChange={props.handleChange}
          regex={props.regex}
        />
      ))}
    </div>
  );
};

export default NewList;
