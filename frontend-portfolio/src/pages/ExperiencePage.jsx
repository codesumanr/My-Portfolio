import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion'; // For animations
import Experience from '../components/Experience/Experience'; // Ensure path is correct
// Optional: If you have specific page styles different from component styles
// import './ExperiencePage.css'; 

const ExperiencePage = () => {
  return (
    // Main page wrapper div with classes matching your structure
    <div className="experience-page section"> 
      <Container className="py-5"> {/* Added standard padding */}
        {/* Single motion div for content animation, matching the ContactPage sample */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Initial state (hidden, slightly below)
          animate={{ opacity: 1, y: 0 }}  // Animate to (visible, original position)
          transition={{ duration: 0.6 }}   // Animation duration
        >
          {/* Page Title */}
          <h1 className="page-title text-center mb-4"> {/* Consistent class name */}
            My Experience 
          </h1>

          {/* Introductory Paragraph */}
          <p className="page-description text-center mb-5 mx-auto"> {/* Consistent class name */}
            My professional journey has equipped me with valuable skills and knowledge in software development.
          </p>

          {/* Render the Experience timeline component */}
          {/* No limit prop passed, displays all experiences */}
          <Experience />

        </motion.div>
      </Container>
    </div>
  );
};

export default ExperiencePage;