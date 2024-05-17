/* eslint-disable react/prop-types */
function Button({ children, type = "button", classname = "", ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-950 ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
