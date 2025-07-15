function Input({ error, ...rest }) {
  const isEmpty = !rest.value;
  return (
    <div className="container d-flex flex-column">
      <input
        type="text"
        className={`form-control w-100 p-3 fs-5 ${isEmpty ? "is-invalid" : ""}`}
        {...rest}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default Input;
