function Input({
  type = "text",
  id = "",
  className = "",
  placeholder = "",
  value = "",
  changeEvent = "",
  disabled = false,
  toggle = "",
  title = "",
}) {
  return (
    <input
      type={type}
      id={id}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={changeEvent}
      data-bs-toggle={toggle}
      disabled={disabled}
      title={title}
    />
  );
}

export default Input;
