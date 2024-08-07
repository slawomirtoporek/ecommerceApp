import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCartItems } from "../../../redux/orderItemsRedux";
import styles from '../NavBar/NavBar.module.scss';

const NavBar = () => {

  const items = useSelector(getCartItems);

  return(
    <Navbar variant="dark" expand="lg" className={`d-flex justify-content-between my-4 rounded ${styles.navBar}`}>
      <Navbar.Brand href="/" className="mx-4">VinylStore</Navbar.Brand>
      <Nav className="d-flex flex-row mx-4">
        <Nav.Link as={NavLink} to="/" className="ms-2">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/cart"  className="ms-2">Cart</Nav.Link>
        {items.length > 0 && (
          <Nav.Link as={NavLink} to="/order" className="ms-2">Order</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;