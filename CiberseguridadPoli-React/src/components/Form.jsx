function Form({ action, children }) {
  return <form onSubmit={action}>{children}</form>;
}

export default Form;
