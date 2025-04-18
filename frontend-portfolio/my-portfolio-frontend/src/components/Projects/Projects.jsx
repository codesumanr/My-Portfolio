import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { fetchProjects } from '../../services/api'; // Assuming fetches { success: true, data: [...] } or just [...]
import Loader from '../Loader/Loader'; // Your Loader component
import './Projects.css';

// Placeholder image URL - replace with your actual placeholder
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/600x400.png/eee/ccc?text=Project+Image';

const Projects = ({ limit }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchProjects();
        console.log("Fetched project data:", result);

        // Handle different possible API response structures
        let projectData = [];
        if (result && result.success && Array.isArray(result.data)) {
          projectData = result.data; // Structure: { success: true, data: [...] }
        } else if (Array.isArray(result)) {
          projectData = result; // Structure: [...]
        } else if (result && Array.isArray(result.projects)) {
            projectData = result.projects; // Structure from sample: { projects: [...] }
        } else {
          console.warn('Unexpected project data structure received:', result);
          // Keep projectData as empty array
        }
        setProjects(projectData);

      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please check the connection or try again later.');
        setProjects([]); // Ensure projects is an array on error
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []); // Empty dependency array runs once on mount

  // --- Render Loading State ---
  if (loading) {
    return <Loader message="Loading projects..." />;
  }

  // --- Render Error State ---
  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  // --- Render No Projects State ---
  if (!projects || projects.length === 0) {
    return <Alert variant="info" className="text-center">No projects to display at the moment.</Alert>;
  }

  // Apply limit if provided and valid
  const displayedProjects = (limit && typeof limit === 'number' && limit > 0)
    ? projects.slice(0, limit)
    : projects;

  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    // Use Row component for grid layout with gutter spacing (e.g., g-4)
    <Row xs={1} md={2} lg={3} className="g-4 project-grid">
      {displayedProjects.map((project) => (
        // Wrap Col in motion.div for animation control
        <Col key={project._id || project.name}> {/* Use unique ID or name as key */}
          <motion.div
            className="h-100" // Ensure motion div takes full height for card h-100 to work
            variants={cardVariants}
            initial="hidden"
            whileInView="visible" // Trigger animation when in viewport
            viewport={{ once: true, amount: 0.2 }} // Animate once, when 20% is visible
          >
            <Card className="project-card h-100 shadow-sm">
              {/* Project Image */}
              <Card.Img
                variant="top"
                src={project.imageUrl || PLACEHOLDER_IMAGE}
                alt={`${project.name || 'Project'} screenshot`}
                className="project-card-img"
                onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMAGE }} // Fallback if image fails
              />

              {/* Card Body: Title, Description, Tech Stack */}
              <Card.Body className="d-flex flex-column"> {/* Flex column to push footer down */}
                <Card.Title className="project-title">{project.name || 'Project Title'}</Card.Title>
                <Card.Text className="project-description flex-grow-1">
                  {project.description || 'No description available.'}
                </Card.Text>

                {/* Tech Stack Badges */}
                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                  <div className="tech-stack mt-auto pt-2"> {/* mt-auto pushes tech to bottom */}
                    {project.techStack.map((tech, idx) => (
                      <Badge
                        key={idx}
                        pill // Use pill shape
                        bg="secondary" // Use a neutral background or custom class
                        className="tech-badge me-1 mb-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card.Body>

              {/* Card Footer: Links */}
              {(project.githubUrl || project.projectUrl) && ( // Only show footer if links exist
                <Card.Footer className="project-links bg-light">
                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline-dark" // Subtle GitHub button
                      size="sm"
                      className="me-2 project-button"
                      aria-label={`View source code for ${project.name || 'project'} on GitHub`}
                    >
                      <FaGithub className="btn-icon" /> GitHub
                    </Button>
                  )}
                  {project.projectUrl && (
                    <Button
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary" // Primary action button
                      size="sm"
                      className="project-button"
                      aria-label={`View live demo for ${project.name || 'project'}`}
                    >
                      <FaExternalLinkAlt className="btn-icon" /> Live Demo
                    </Button>
                  )}
                </Card.Footer>
              )}
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

// Prop type validation
Projects.propTypes = {
  limit: PropTypes.number,
};

export default Projects;