import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import styles from '../NavBar/NavBar.module.scss'

const NavBar = () => {
  return(
    <Navbar bg="dark" variant="dark" expand="lg" className={`d-flex justify-content-between mt-4 mb-4 rounded ${styles.navBar}`}>
      <Navbar.Brand href="/" className="mx-4">VinylStore</Navbar.Brand>
      <Nav className="mx-4">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;