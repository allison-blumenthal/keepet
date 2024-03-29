/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import TransparentLogo from './logos/TransparentLogo';
import home from '../src/assets/images/home-icon.png';
import members from '../src/assets/images/member-icon.png';
import pets from '../src/assets/images/paw-icon.png';
import tasks from '../src/assets/images/task-icon.png';
import { useAuth } from '../utils/context/authContext';
import { getMemberByUID } from '../api/memberData';

export default function NavBar() {
  const [member, setMember] = useState({});
  const { user } = useAuth();

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, member]);

  return (
    <>
      {member ? (
        <>
          <Navbar fixed="top" className="nav-bg navbar-top">
            <Container>
              <Link passHref href="/">
                <Navbar.Brand>
                  <div className="logo">
                    <TransparentLogo />
                  </div>
                </Navbar.Brand>
              </Link>
              <Nav className="flex-grow-1 justify-content-evenly">
                <Nav.Link href={`/household/${member.householdId}`}>
                  <div className="nav-icon">
                    <Image src={home} alt="home icon" />
                  </div>
                </Nav.Link>
                <Nav.Link href="/members">
                  <div className="nav-icon">
                    <Image src={members} alt="member icon" />
                  </div>
                </Nav.Link>
                <Nav.Link href="/pets">
                  <div className="nav-icon">
                    <Image src={pets} alt="pet icon" />
                  </div>
                </Nav.Link>
                <Nav.Link href="/tasks">
                  <div className="nav-icon">
                    <Image src={tasks} alt="task icon" />
                  </div>
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      ) : (
        <Navbar fixed="top" className="navbar-top nav-bg">
          <Container>
            <Link passHref href="/">
              <Navbar.Brand>
                <div className="logo">
                  <TransparentLogo />
                </div>
              </Navbar.Brand>
            </Link>
          </Container>
        </Navbar>
      )}
    </>
  );
}
