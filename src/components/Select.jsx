/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}

      <select
        id={id}
        className={`px-4 py-2 bg-gray-400 ${className}`}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
