function Error({ customErrorMessage }) {
  return (
    <div>{customErrorMessage ? customErrorMessage : "Algo salió mal"}</div>
  );
}

export default Error;
