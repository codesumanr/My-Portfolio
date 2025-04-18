import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
// Use NavLink for automatic active class handling
import { NavLink } from 'react-router-dom';
// REMOVED: No longer importing fetchPortfolioInfo
// import { fetchPortfolioInfo } from '../../services/api';
import './Header.css';

const Header = () => {
  // State for portfolio info (with default) and scroll status
  // The default 'Portfolio' will now always be used unless changed here
  const [portfolioName, setPortfolioName] = useState('Portfolio'); // Default name
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to control navbar collapse

  // REMOVED: useEffect hook that called fetchPortfolioInfo
  /*
  // Fetch portfolio info (mainly for the name)
  useEffect(() => {
    const loadPortfolioInfo = async () => {
      try {
        const data = await fetchPortfolioInfo(); // This caused the 404
        if (data && data.name) {
          setPortfolioName(data.name);
        }
        // Add other info loading if needed
      } catch (error) {
        console.error('Error loading portfolio info for header:', error);
        // Keep default name on error
      }
    };
    loadPortfolioInfo();
  }, []);
  */

  // Handle scroll effect - This useEffect is fine and should remain
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50; // Pixels from top to trigger effect
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener

    // Initial check in case the page loads already scrolled
    handleScroll();

    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to close the navbar collapse on link click (mobile)
  const handleNavClose = () => setExpanded(false);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      // Add dynamic classes for scroll effect and custom styling
      className={`main-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      // Control expanded state for collapseOnSelect behavior
      expanded={expanded}
      onToggle={setExpanded} // Update state when toggler is clicked
    >
      <Container fluid="lg"> {/* Use fluid="lg" for better spacing control */}
        {/* Brand linked to home - will always show the default 'Portfolio' now */}
        <Navbar.Brand as={NavLink} to="/" onClick={handleNavClose}>
          {portfolioName}
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Collapsible Nav Links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Use ms-auto to push nav items to the right on large screens */}
          <Nav className="ms-auto align-items-center">
            {/* Use Nav.Link AS NavLink for React Router integration & active class */}
            <Nav.Link as={NavLink} to="/" end onClick={handleNavClose}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/skills" onClick={handleNavClose}>
              Skills
            </Nav.Link>
            <Nav.Link as={NavLink} to="/experience" onClick={handleNavClose}>
              Experience
            </Nav.Link>
            <Nav.Link as={NavLink} to="/projects" onClick={handleNavClose}>
              Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={handleNavClose}>
              Contact
            </Nav.Link>
            {/* Example of a button-like link */}
            {/* <Nav.Link as={NavLink} to="/resume" className="btn btn-outline-info btn-sm ms-lg-2 mt-2 mt-lg-0" onClick={handleNavClose}>
              Resume
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;