/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full ">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        className={`inline-block mb-1 pl-1 text-black ${className}`}
        type={type}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
