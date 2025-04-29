/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; // ✅ Import Link
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Campus Careers</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Link href="/student" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/student'}>
                    Student Home
                  </Nav.Link>
                </Link>
                <Link href="/add" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/add'}>
                    Add Company
                  </Nav.Link>
                </Link>
                <Link href="/company" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/company'}>
                    List Company
                  </Nav.Link>
                </Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <>
                <Link href="/admin" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/admin'}>
                    Admin
                  </Nav.Link>
                </Link>
                <Link href="/add" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/add'}>
                    New Company
                  </Nav.Link>
                </Link>
              </>
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <Link href="/auth/signout" passHref legacyBehavior>
                  <NavDropdown.Item id="login-dropdown-sign-out">
                    <BoxArrowRight className="me-2" />
                    Sign Out
                  </NavDropdown.Item>
                </Link>
                <Link href="/auth/change-password" passHref legacyBehavior>
                  <NavDropdown.Item id="login-dropdown-change-password">
                    <Lock className="me-2" />
                    Change Password
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <Link href="/auth/signin" passHref legacyBehavior>
                  <NavDropdown.Item id="login-dropdown-sign-in">
                    <PersonFill className="me-2" />
                    Sign In
                  </NavDropdown.Item>
                </Link>
                <Link href="/auth/signup" passHref legacyBehavior>
                  <NavDropdown.Item id="login-dropdown-sign-up">
                    <PersonPlusFill className="me-2" />
                    Sign Up
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
