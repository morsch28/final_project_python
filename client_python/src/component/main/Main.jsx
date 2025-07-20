import AppRouters from "../../routes/AppRoutes";
import Layout from "../Layout";
import Home from "../../pages/Home";

function Main() {
  return (
    <main
      className={`d-flex flex-fill position-relative main-with-logo-padding custom-main justify-content-center`}
    >
      {/* <AppRouters /> */}
      <Home />
    </main>
  );
}

export default Main;
