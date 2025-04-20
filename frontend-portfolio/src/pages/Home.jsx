import React from 'react'; // Removed useState, useEffect
import { Container, Row, Col, Button } from 'react-bootstrap'; // Removed Alert
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// REMOVED: No longer importing fetchPortfolioInfo
// import { fetchPortfolioInfo } from '../services/api';
import Skills from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
// REMOVED: Loader is not needed if main info is static
// import Loader from '../components/Loader/Loader';
import defaultProfileImg from '../assets/profile.jpg'; // Keep the default placeholder image
import './Home.css'; // Styles for the Home page

const Home = () => {
  // REMOVED: State for portfolio data, loading, and errors is not needed
  // const [portfolioInfo, setPortfolioInfo] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // REMOVED: Data Fetching useEffect hook
  /*
  useEffect(() => {
    // ... (loadPortfolioInfo function removed) ...
  }, []);
  */

  // --- Animation Variants (Keep these) ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations
        delayChildren: 0.1,  // Delay before children start
      }
    }
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } } // Custom ease
  };

  // REMOVED: Loading and Error state rendering logic
  /*
  if (loading) { ... }
  if (error) { ... }
  */

  // --- Define Static Data Directly ---
  // ** Replace these placeholders with your actual information! **
  const name = 'Suman Rani'; // Replace with your name
  const title = 'Web Developer'; // Replace with your title
  const summary = 'Passionate developer creating amazing web experiences.'; // Replace with your summary
  const profileImageUrl = defaultProfileImg; // Use the imported default or provide a direct URL string

  // --- Render Main Content ---
  return (
    <div className="home-page">
      {/* === Hero Section === */}
      <section className="page-section hero-section d-flex align-items-center">
        <Container>
          <Row className="align-items-center gy-5"> {/* gy-5 for vertical gap on mobile */}
            {/* Hero Text Content */}
            <Col lg={7} className="hero-content order-lg-1 order-2">
              {/* Use animation directly */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.h1 variants={fadeInUp}>
                  Hello, I'm <span className="highlight-name">{name}</span>
                </motion.h1>
                <motion.h2 variants={fadeInUp} className="hero-title">{title}</motion.h2>
                <motion.p variants={fadeInUp} className="hero-description">
                  {summary}
                </motion.p>
                <motion.div variants={fadeInUp} className="hero-buttons mt-4">
                  <Button
                    as={Link}
                    to="/contact"
                    variant="primary"
                    size="lg"
                    className="me-3 mb-2 mb-md-0 hero-btn-primary"
                    aria-label="Contact Me"
                  >
                    Get In Touch
                  </Button>
                  <Button
                    as={Link}
                    to="/projects"
                    variant="outline-light" // Use outline-light for contrast on dark hero
                    size="lg"
                     className="mb-2 mb-md-0 hero-btn-secondary"
                    aria-label="View My Projects"
                  >
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
            {/* Hero Image */}
            <Col lg={5} className="hero-image-container order-lg-2 order-1 text-center">
              <motion.div variants={scaleIn} initial="hidden" animate="visible">
                <div className="hero-image-wrapper">
                  <img
                    src={profileImageUrl}
                    alt={`Profile of ${name}`}
                    className="img-fluid hero-profile-img"
                    onError={(e) => { e.target.onerror = null; e.target.src=defaultProfileImg }} // Fallback still useful
                  />
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === Skills Section Preview === */}
      <section className="page-section skills-section">
        <Container>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="section-title text-center">Core Skills</h2>
            <p className="section-subtitle text-center mb-5">Technologies and tools I work with regularly.</p>
            {/* Skills component likely fetches its own data - this is fine */}
            <Skills limit={6} />
            <div className="text-center mt-5 view-all-button-container">
              <Button as={Link} to="/skills" variant="outline-primary" size="lg" aria-label="View All Skills">
                See All Skills
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* === Experience Section Preview === */}
      <section className="page-section experience-section bg-light">
        <Container>
           <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
             <h2 className="section-title text-center">Professional Journey</h2>
             <p className="section-subtitle text-center mb-5">A brief look at my work history and key roles.</p>
             {/* Experience component likely fetches its own data - this is fine */}
            <Experience limit={2} />
            <div className="text-center mt-5 view-all-button-container">
              <Button as={Link} to="/experience" variant="outline-secondary" size="lg" aria-label="View Full Work Experience">
                View Full Experience
              </Button>
            </div>
           </motion.div>
        </Container>
      </section>

      {/* === Projects Section Preview === */}
      <section className="page-section projects-section">
        <Container>
           <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
             <h2 className="section-title text-center">Featured Projects</h2>
             <p className="section-subtitle text-center mb-5">Some examples of projects I've built or contributed to.</p>
             {/* Projects component likely fetches its own data - this is fine */}
            <Projects limit={3} />
            <div className="text-center mt-5 view-all-button-container">
              <Button as={Link} to="/projects" variant="outline-primary" size="lg" aria-label="View All Projects">
                Explore All Projects
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* === Call to Action Section === */}
      <section className="page-section cta-section text-white text-center">
        <Container>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="cta-title mb-3">Ready to build something amazing?</h2>
            <p className="cta-text mb-4 mx-auto">
              I'm currently available for freelance opportunities and exciting collaborations. <br/> Let's connect and discuss how I can help bring your ideas to life!
            </p>
            <Button
              as={Link}
              to="/contact"
              variant="light" // Light button on dark background
              size="lg"
              className="cta-button"
              aria-label="Contact Me About Work"
            >
              Let's Talk
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;