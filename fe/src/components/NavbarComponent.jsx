import { Container, NavDropdown } from "react-bootstrap";
import Logo from "../assets/logo.png"
import "../styles/navbar.css" 

const NavbarComponent = () => {
  return (
    <header className="header">
      <Container>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">
            <img src={Logo}></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Beranda
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tentang Kami
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Layanan
                </a>
              </li>
              <NavDropdown title="Tim Kami" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Partner Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              Legal Consultant Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Lawyer Profile</NavDropdown.Item>
            </NavDropdown>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Artikel
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default NavbarComponent;