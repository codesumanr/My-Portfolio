import React, { useState } from 'react'; // Removed useEffect
import { Container, Row, Col } from 'react-bootstrap'; // Removed Spinner and Alert
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
// REMOVED: No longer importing fetchPortfolioInfo
// import { fetchPortfolioInfo } from '../../services/api';
import './Contact.css';

const Contact = () => {
  // State for portfolio data - Initialized with static default values
  // ** Replace these defaults with your actual information! **
  const [portfolioInfo, setPortfolioInfo] = useState({
    email: 'sumankamboj@gmail.com', // Your actual Email
    location: 'Canada,Ontario', // Your actual Location
    githubUrl: 'https://github.com/codesumanr', // Your actual GitHub URL (or '#' if none)
    linkedinUrl: 'https://linkedin.com/in/suman-r-b60155260', // Your actual LinkedIn URL (or '#' if none)
  });

  // REMOVED: Loading and Error states are no longer needed for static data
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // REMOVED: useEffect hook that called fetchPortfolioInfo
  /*
  useEffect(() => {
    const loadPortfolioInfo = async () => {
      // setLoading(true);
      // setError(null);
      try {
        const data = await fetchPortfolioInfo(); // This caused the 404
        setPortfolioInfo({
          email: data.email || 'your.email@example.com',
          location: data.location || 'Your Location',
          githubUrl: data.githubUrl || '#',
          linkedinUrl: data.linkedinUrl || '#',
        });
      } catch (err) {
        console.error('Error loading portfolio info:', err);
        // setError('Failed to load contact information. Please try again later.');
      } finally {
        // setLoading(false);
      }
    };

    loadPortfolioInfo();
  }, []);
  */

  // REMOVED: Loading and Error state rendering logic
  /*
  if (loading) { ... }
  if (error) { ... }
  */

  // --- Render Content using static data from state ---
  return (
    <section className="contact-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <div className="contact-info">
                <h3>Contact Information</h3>
                <p>Feel free to reach out to me through any of these channels.</p>

                {/* Email Section - Uses static data */}
                {portfolioInfo.email && ( // Check if email exists in state
                  <div className="contact-item">
                    <div className="icon-container">
                      <a
                        href={`mailto:${portfolioInfo.email}`}
                        className="icon-link"
                        aria-label={`Send an email to ${portfolioInfo.email}`} // Accessibility
                      >
                        <FaEnvelope className="icon" />
                      </a>
                    </div>
                    <div className="contact-details">
                      <h4>Email</h4>
                      <p><a href={`mailto:${portfolioInfo.email}`}>{portfolioInfo.email}</a></p>
                    </div>
                  </div>
                )}

                {/* Location Section - Uses static data */}
                {portfolioInfo.location && ( // Check if location exists in state
                  <div className="contact-item">
                    <div className="icon-container">
                      <FaMapMarkerAlt className="icon" />
                    </div>
                    <div className="contact-details">
                      <h4>Location</h4>
                      <p>{portfolioInfo.location}</p>
                    </div>
                  </div>
                )}

                {/* Social Media Section - Uses static data */}
                {/* Only show section if at least one URL exists and isn't '#' */}
                {(portfolioInfo.githubUrl && portfolioInfo.githubUrl !== '#') || (portfolioInfo.linkedinUrl && portfolioInfo.linkedinUrl !== '#') ? (
                  <div className="social-media-links">
                    <h4>Connect with me</h4>
                    <div className="social-icons">
                      {/* Show GitHub only if URL exists and isn't '#' */}
                      {portfolioInfo.githubUrl && portfolioInfo.githubUrl !== '#' && (
                        <a
                          href={portfolioInfo.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="Visit my GitHub profile" // Accessibility
                        >
                          <FaGithub />
                        </a>
                      )}
                      {/* Show LinkedIn only if URL exists and isn't '#' */}
                      {portfolioInfo.linkedinUrl && portfolioInfo.linkedinUrl !== '#' && (
                        <a
                          href={portfolioInfo.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="Visit my LinkedIn profile" // Accessibility
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                ) : null} {/* End of social media section conditional render */}
              </div> {/* End of contact-info */}
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;