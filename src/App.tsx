import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <header>
      <nav>
        <object type="image/svg+xml" data="/static/logo.svg" className="logo">
          <img
            className="logo-png"
            src="/static/logo.png"
            alt="Sinco Orchestra logo"
          />
        </object>
        <Link className="nav-link" to="/spille-for-deg">
          Spille for deg?
        </Link>
        <Link className="nav-link" to="/neste-konsert">
          Konserter
        </Link>
        <Link className="nav-link" to="/medlemmer">
          Medlemmer
        </Link>
        <Link className="nav-link" to="/musikk">
          Musikk
        </Link>
        <Link className="nav-link" to="/nettbutikk">
          Nettbutikker
        </Link>
      </nav>
    </header>
  );
}

function Home() {
  return <p>Home</p>;
}

function NoPage() {
  return <p>NoPage</p>;
}

function Layout() {
  return (
    <>
      <Navbar />
      <p className=""></p>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
