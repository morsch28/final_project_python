function Input({ error,type="text", ...rest }) {
  const inputValue = rest?.value ?? "";
  const isEmpty = inputValue === "";
  return (
    <div className="container d-flex flex-column">
      <input
        type={type}
        className={`form-control w-100 p-3 fs-5 ${isEmpty ? "is-invalid" : ""}`}
        {...rest}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default Input;
