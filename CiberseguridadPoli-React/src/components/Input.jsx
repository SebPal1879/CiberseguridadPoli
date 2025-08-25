function Input({
  type = "text",
  id = "",
  className = "",
  placeholder = "",
  value = "",
  changeEvent = null,
  disabled = false,
  toggle = "",
  title = "",
  defaultValue = "",
  readOnly = false,
}) {
  return (
    <input
      type={type}
      id={id}
      className={className}
      placeholder={placeholder}
      value={value || defaultValue}
      onChange={changeEvent}
      data-bs-toggle={toggle}
      disabled={disabled}
      title={title}
      readOnly={readOnly}
    />
  );
}

export default Input;
