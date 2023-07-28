import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const styleClass = `${props.isInvalid ? classes.invalid : ""} ${
    classes.input
  }`;
  return (
    <div className={styleClass}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
