import React from "react"
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart /> Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </Badge>
                                )}
                            </Nav.Link>


                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                (<Nav.Link as={Link} to="/login">
                                    <FaUser /> Sign In
                                </Nav.Link>)
                            }

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id="adminmenu">
                                    <NavDropdown.Item as={Link} to="/admin/orderlist">
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/productlist">
                                        Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/userlist">
                                        Users
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header