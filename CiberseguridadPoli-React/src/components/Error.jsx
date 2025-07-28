function Error({ customErrorMessage }) {
  return (
    <div>
      <div>{customErrorMessage ? customErrorMessage : "Algo salió mal"}</div>
    </div>
  );
}

export default Error;
