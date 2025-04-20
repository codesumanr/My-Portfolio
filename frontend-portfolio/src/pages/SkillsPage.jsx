import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion'; // For animations
import Skills from '../components/Skills/Skills'; // Ensure path is correct
// Optional: If you have page-specific CSS
// import './SkillsPage.css';

const SkillsPage = () => {
  return (
    // Main page wrapper div
    <div className="skills-page section"> {/* Consistent class naming */}
      <Container className="py-5"> {/* Add standard padding */}
        {/* Single motion div for the main content animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start hidden and slightly down
          animate={{ opacity: 1, y: 0 }}  // Animate to visible and original position
          transition={{ duration: 0.6 }}   // Animation duration
        >
          {/* Page Title */}
          <h1 className="page-title text-center mb-4"> {/* Consistent class */}
            My Skills
          </h1>

          {/* Introductory Paragraph */}
          <p className="page-description text-center mb-5 mx-auto"> {/* Consistent class */}
            Here are the technologies and tools I specialize in. I continuously expand my skill set to stay current with industry trends.
          </p>

          {/* Render the Skills component */}
          {/* No limit prop is passed, so it will display all skills */}
          <Skills />

        </motion.div>
      </Container>
    </div>
  );
};

export default SkillsPage;