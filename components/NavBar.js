/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from './Logo';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <>
      <div className="navbar-top">
        <Link passHref href="/">
          <Navbar.Brand>
            <div className="logo">
              <Logo />
            </div>
          </Navbar.Brand>
        </Link>
        <Button className="logout-btn" variant="danger" onClick={signOut}>Log Out</Button>
      </div>

      <Navbar bg="light" variant="light" fixed="bottom">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/members">Members</Nav.Link>
            <Nav.Link href="/pets">Pets</Nav.Link>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
