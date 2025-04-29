/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

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
      <Container fluid className="flex-nowrap overflow-auto">
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Campus Careers</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto justify-content-start flex-nowrap"
            style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}
          >
            {currentUser && (
              <>
                <Link href="/student" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/student'}>Student Home</Nav.Link>
                </Link>
                <Link href="/setup" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/setup'}>Add Student Info</Nav.Link>
                </Link>
                <Link href="/filter" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/filter'}>Browse By Skill/Location</Nav.Link>
                </Link>
                <Link href="/company" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/company'}>List Companies</Nav.Link>
                </Link>
                <Link href="/add" passHref legacyBehavior>
                  <Nav.Link active={pathName === '/add'}>Add Company</Nav.Link>
                </Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Link href="/admin" passHref legacyBehavior>
                <Nav.Link active={pathName === '/admin'}>Admin</Nav.Link>
              </Link>
            )}
          </Nav>

          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
              <NavDropdown.Item as="span" id="login-dropdown-sign-out">
                <Link href="/auth/signout" className="dropdown-item">
                  <BoxArrowRight className="me-2" />
{' '}
Sign Out
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as="span" id="login-dropdown-change-password">
                <Link href="/auth/change-password" className="dropdown-item">
                  <Lock className="me-2" />
{' '}
Change Password
                </Link>
              </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <Link href="/auth/signin" passHref legacyBehavior>
                  <NavDropdown.Item id="login-dropdown-sign-in">
                    <PersonFill className="me-2" />
{' '}
Sign In
                  </NavDropdown.Item>
                </Link>
                <Link href="/auth/signup" passHref legacyBehavior>
                  <NavDropdown.Item id="login-dropdown-sign-up">
                    <PersonPlusFill className="me-2" />
{' '}
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
