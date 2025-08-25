function Form({ classname = "", action, children }) {
  return (
    <form className={classname} onSubmit={action}>
      {children}
    </form>
  );
}

export default Form;
