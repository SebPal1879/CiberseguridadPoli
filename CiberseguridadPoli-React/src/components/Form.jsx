function Form({ className = "", action, children }) {
  return (
    <form className={className} onSubmit={action} style={{ width: "100%" }}>
      {children}
    </form>
  );
}

export default Form;
