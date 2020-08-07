import React from "react";
import Input from "./Input";

const InputList = (props) => {
  return (
    <div>
      {Object.keys(props.main).map((key, index) => (
        <Input
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

export default InputList;
