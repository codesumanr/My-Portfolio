import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion'; // For animations
import Projects from '../components/Projects/Projects'; // Ensure path is correct
// Optional: If you have page-specific CSS for layout/background
// import './ProjectPage.css';

const ProjectPage = () => {
  return (
    // Main page wrapper div
    <div className="project-page section"> {/* Use consistent class naming */}
      <Container className="py-5"> {/* Add standard padding */}
        {/* Single motion div for the main content animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start hidden and slightly down
          animate={{ opacity: 1, y: 0 }}  // Animate to visible and original position
          transition={{ duration: 0.6 }}   // Animation duration
        >
          {/* Page Title */}
          <h1 className="page-title text-center mb-4"> {/* Consistent class */}
            My Projects
          </h1>

          {/* Introductory Paragraph */}
          <p className="page-description text-center mb-5 mx-auto"> {/* Consistent class */}
            Here's a selection of projects I've worked on, showcasing my skills in development and problem-solving.
          </p>

          {/* Render the Projects component */}
          {/* No limit prop is passed, so it will display all projects */}
          <Projects />

        </motion.div>
      </Container>
    </div>
  );
};

export default ProjectPage;