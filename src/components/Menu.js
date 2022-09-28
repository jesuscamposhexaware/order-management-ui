import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Menu = ({
  user,
  setUser,
  cart,
  setCart
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);

  const doLogout = () => {
    setUser(null);
    navigate('/login');
  }

  const dropCart = () => {
    setCart([]);
  }

  const onCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" >
        <Link className="navbar-brand" to="/">
          <h3>H</h3>
        </Link>
        <NavbarText>Hexaware</NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/orders">Orders</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/products">Products</Link>
            </NavItem>

            {!!user ?
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  {user.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.name + " " + user.lastName}</DropdownItem>
                  <DropdownItem>My Orders</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={doLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> : null
            }
            {!!user ?
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  <i className="fa badge-custom fa-lg" value={cart.length} onClick={onCheckout}>&#xf290;</i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Your cart</DropdownItem>
                  <Button color="danger" onClick={dropCart}>Drop cart</Button>
                </DropdownMenu>
              </UncontrolledDropdown> : null
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;