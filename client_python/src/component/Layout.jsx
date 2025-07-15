import Header from "./header/Header";
import Main from "./main/Main";
function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main />
    </div>
  );
}

export default Layout;
