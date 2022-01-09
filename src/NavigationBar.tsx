import { useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ReturnToHome } from "./components/HomeButton"

const NavigationBar = () => {
    return <Navbar bg="light">
      <Navbar.Brand><ReturnToHome ButtonStyle="link"/></Navbar.Brand>
      <Nav.Link as={Link} to="/blog/start=0/end=5">BLOG! (with database integration!!!)</Nav.Link>
      <Nav.Link as={Link} to="/blog/editor">EDIT BLOG!</Nav.Link>
      <Navbar.Collapse>
          <NavDropdown title="Common Pools">
                <Nav.Link as={Link} to="/pool/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8">USDC/WETH</Nav.Link>
                <Nav.Link as={Link} to='/pool/0x83abecf7204d5afc1bea5df734f085f2535a9976'>PEOPLE/WETH</Nav.Link>
                <Nav.Link as={Link} to="/pool/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8">USDC Pool</Nav.Link>
            <NavDropdown.Divider />
                <Nav.Link as={Link} to="/pool/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8">USDC Pool</Nav.Link>
          </NavDropdown>
      </Navbar.Collapse>
  </Navbar>
}

export { NavigationBar }