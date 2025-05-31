function Form({ dispatch, children }) {
  return (
    <form onSubmit={(e) => dispatch({ type: "formSubmit", e })}>
      {children}
    </form>
  );
}

export default Form;
