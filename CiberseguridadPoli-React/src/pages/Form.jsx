function Form({ dispatch, children, navigate }) {
  return (
    <form onSubmit={(e) => dispatch({ type: "formSubmit", e, navigate })}>
      {children}
    </form>
  );
}

export default Form;
