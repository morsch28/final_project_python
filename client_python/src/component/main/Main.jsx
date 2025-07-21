import AppRouters from "../../routes/AppRoutes";

function Main() {
  return (
    <main
      className={`d-flex flex-fill position-relative main-with-logo-padding custom-main justify-content-center`}
    >
      <AppRouters />
    </main>
  );
}

export default Main;
