import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
// REMOVED: No longer importing fetchPortfolioInfo
// import { fetchPortfolioInfo } from '../../services/api';
import './Footer.css';

const Footer = () => {
  // Initialize state with default values. These will now always be used.
  const [portfolioInfo, setPortfolioInfo] = useState({
    name: 'Your Name', // Default Name
    summary: 'Passionate developer building modern web solutions.', // Default Summary
    email: 'sumankamboj1997@gmail.com', // Default Email
    location: 'Canada, Ontario', // Default Location
    githubUrl: 'github.com/codesumanr', // Default GitHub URL (use your actual link here if desired)
    linkedinUrl: 'https://linkedin.com/in/suman-r-b60155260', // Default LinkedIn URL (use your actual link here if desired)
  });
  // REMOVED: Loading state is no longer needed
  // const [loading, setLoading] = useState(true);

  // REMOVED: useEffect hook that called fetchPortfolioInfo
  /*
  useEffect(() => {
    const loadPortfolioInfo = async () => {
      // setLoading(true); // No longer needed
      try {
        const data = await fetchPortfolioInfo(); // This caused the 404
        // Update state only with fetched data, keeping defaults if API fields are missing
        setPortfolioInfo(prevInfo => ({
            ...prevInfo, // Keep existing defaults
            ...(data.name && { name: data.name }),
            ...(data.summary && { summary: data.summary }),
            ...(data.email && { email: data.email }),
            ...(data.location && { location: data.location }),
            ...(data.githubUrl && { githubUrl: data.githubUrl }),
            ...(data.linkedinUrl && { linkedinUrl: data.linkedinUrl }),
          }));
      } catch (error) {
        console.error('Error loading portfolio info for footer:', error);
        // Keep default info on error
      } finally {
        // setLoading(false); // No longer needed
      }
    };

    loadPortfolioInfo();
  }, []);
  */

  // Define URLs safely using the state (which now holds only defaults)
  const githubLink = portfolioInfo.githubUrl || '#';
  const linkedinLink = portfolioInfo.linkedinUrl || '#';
  const mailtoLink = `mailto:${portfolioInfo.email || ''}`;

  // **Recommendation:** Consider putting your actual GitHub/LinkedIn URLs directly
  // in the useState defaults above if they won't change.

  return (
    <footer className="footer bg-dark text-light pt-5 pb-4"> {/* Use text-light for better contrast on bg-dark */}
      <Container>
        {/* Main Footer Content Area */}
        <Row className="gy-4"> {/* gy-4 adds vertical gutter space between columns on wrap */}

          {/* Column 1: About Me */}
          <Col md={6} lg={4} className="footer-col">
            <h5 className="footer-heading">About Me</h5>
            <p className="footer-text">
              {/* Display summary from defaults */}
              {portfolioInfo.summary}
            </p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={6} lg={3} className="footer-col">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/experience">Experience</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {/* Add other relevant links */}
            </ul>
          </Col>

          {/* Column 3: Contact & Social */}
          <Col md={12} lg={5} className="footer-col"> {/* Takes full width on md, adjusts on lg */}
            <h5 className="footer-heading">Get In Touch</h5>
            <ul className="list-unstyled footer-contact">
              {portfolioInfo.email && (
                 <li className='mb-2'>
                  <FaEnvelope className="footer-icon" />
                  <a href={mailtoLink} className="footer-link-contact">
                    {portfolioInfo.email}
                  </a>
                </li>
              )}
             {portfolioInfo.location && (
               <li className='mb-2'>
                 <FaMapMarkerAlt className="footer-icon" />
                 <span className="footer-text">{portfolioInfo.location}</span>
               </li>
              )}
            </ul>
            {/* Social Media Icons */}
            <div className="social-links mt-3">
              {/* Consider putting your actual links in the default state */}
              {githubLink !== '#' && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon me-3" // Add margin-end for spacing
                  aria-label="Visit my GitHub profile" // Accessibility
                >
                  <FaGithub size="1.5em" /> {/* Slightly larger icons */}
                </a>
              )}
              {linkedinLink !== '#' && (
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Visit my LinkedIn profile" // Accessibility
                >
                  <FaLinkedin size="1.5em" /> {/* Slightly larger icons */}
                </a>
              )}
              {/* Add other social links here if needed */}
            </div>
          </Col>

        </Row>

        {/* Divider */}
        <hr className="footer-divider my-4" />

        {/* Copyright Section */}
        <Row>
          <Col className="text-center">
            <p className="copyright-text mb-0">
              © {new Date().getFullYear()} {portfolioInfo.suman}. All Rights Reserved.
              {/* Optional: Add a link to your repo or a design credit */}
              {/* <br />Designed by {portfolioInfo.name} */}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;