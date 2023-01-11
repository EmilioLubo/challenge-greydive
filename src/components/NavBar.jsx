import React from 'react'
import { Nav, Navbar, Container} from 'react-bootstrap'

export const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
          <Navbar.Brand className='fw-bold fs-2 fst-italic font-monospace' href="/">GreyDive</Navbar.Brand>
          <img src="/assets/icons8-globo.gif" alt="earth-gif" />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className='fw-bold fs-5 nav-link' href="/">Formulario</Nav.Link>
              <Nav.Link className='fw-bold fs-5 nav-link' href="/data">Datos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
