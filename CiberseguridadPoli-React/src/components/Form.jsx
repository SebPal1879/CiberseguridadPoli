function Form({ className = "", action, children }) {
  return (
    <form className={className} onSubmit={action}>
      {children}
    </form>
  );
}

export default Form;
