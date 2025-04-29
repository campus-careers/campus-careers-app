'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar bg="dark" expand="lg" className="navbar-dark">
      <Container fluid>
        <Navbar.Brand as={Link} href="/">Campus Careers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex-nowrap">
            {currentUser && (
              <>
                <Nav.Link as={Link} href="/student" active={pathName === '/student'}>
                  Student Home
                </Nav.Link>
                <Nav.Link as={Link} href="/setup" active={pathName === '/setup'}>
                  Add Student Info
                </Nav.Link>
                <Nav.Link as={Link} href="/filter" active={pathName === '/filter'}>
                  Browse By Skill/Location
                </Nav.Link>
                <Nav.Link as={Link} href="/company" active={pathName === '/company'}>
                  List Companies
                </Nav.Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link as={Link} href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {session ? (
              <NavDropdown title={currentUser} id="login-dropdown" align="end">
                <NavDropdown.Item as={Link} href="/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login" id="login-dropdown" align="end">
                <NavDropdown.Item as={Link} href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign In
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
