function PageHeader({ title, description }) {
  return (
    <div className="container mt-5 text-center d-flex gap-2 flex-column">
      <h1>{title}</h1>
      <p className="fs-5 text-nowrap">{description}</p>
    </div>
  );
}

export default PageHeader;
