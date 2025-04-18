import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, ProgressBar, Badge, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { fetchSkills } from '../../services/api'; // Correct path?
import Loader from '../Loader/Loader'; // Correct path?
import './Skills.css'; // Correct path?

// --- Helper Functions (Using skill.level) ---
const getProficiencyPercentage = (level = '') => {
  switch (level?.toLowerCase()) { // Add optional chaining ?. for safety
    case 'beginner': return 30;
    case 'intermediate': return 60;
    case 'advanced': return 85;
    case 'expert': return 95;
    default: return 50;
  }
};

const getVariant = (level = '') => {
  switch (level?.toLowerCase()) { // Add optional chaining ?. for safety
    case 'beginner': return 'info';
    case 'intermediate': return 'primary';
    case 'advanced': return 'warning';
    case 'expert': return 'danger';
    default: return 'secondary';
  }
};

const Skills = ({ limit }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      setError(null);
      console.log("Skills.jsx: useEffect triggered. Calling fetchSkills...");
      try {
        // Fetch the data object { success: true, skills: [...] }
        const result = await fetchSkills();

        // Log the exact result received from api.js
        console.log("Skills.jsx: Received result from fetchSkills:", result);
        console.log("Skills.jsx: Received result (Stringified):", JSON.stringify(result, null, 2));

        // Check if the result has the expected structure
        if (result && result.success && Array.isArray(result.skills)) {
          console.log("Skills.jsx: Successfully found skills array. Setting state.");
          setSkills(result.skills); // Set state with the skills array
        } else {
          // Log a warning if the structure is not as expected
          console.warn("Skills.jsx: Result structure incorrect or missing skills array. Setting empty skills.", result);
          setSkills([]); // Fallback to empty array
          // Optional: Set an error message if the structure is wrong but no error was thrown
          // setError("Received invalid data format for skills.");
        }

      } catch (err) {
        // Catch errors thrown by fetchSkills (network, server error, etc.)
        console.error('Skills.jsx: Error caught during skill loading:', err);
        setError(err.message || 'Failed to load skills data. Please try again later.');
        setSkills([]); // Ensure array is empty on error
      } finally {
        setLoading(false);
        console.log("Skills.jsx: Loading finished.");
      }
    };

    loadSkills();
  }, []); // Empty dependency array ensures this runs once on mount

  // --- Render Loading State ---
  if (loading) {
    return <Loader message="Loading skills..." />;
  }

  // --- Render Error State ---
  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  // --- Render No Skills State (if fetch succeeded but skills array was empty or invalid) ---
   if (!skills || skills.length === 0) {
    // Check if there was an error first; if not, then it's genuinely empty data
    if (!error) {
        return <Alert variant="info" className="text-center">No skills data available.</Alert>;
    }
    // If there was an error, the error Alert above will render.
    return null;
   }

  // Apply limit if provided
  const displayedSkills = (limit && typeof limit === 'number' && limit > 0)
    ? skills.slice(0, limit)
    : skills;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <div className="skills-container py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {displayedSkills.map((skill, index) => (
          // Ensure skill._id is present and unique, fallback carefully
          <Col key={skill._id || `skill-${index}`}>
            <motion.div
              className="h-100"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="skill-card h-100 shadow-sm">
                <Card.Body>
                  <div className="skill-header mb-3">
                    <Card.Title className="skill-name mb-0 flex-grow-1">
                      {/* Use skill.name directly */}
                      {skill.name || 'Unnamed Skill'}
                    </Card.Title>
                    {/* Optional: Add years of experience if that field exists */}
                    {/* {skill.years !== undefined && ( ... )} */}
                  </div>

                  <div className="skill-progress">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="proficiency-label">Proficiency:</span>
                      {/* Use skill.level correctly */}
                      <span className={`proficiency-level proficiency-${(skill.level || '').toLowerCase()}`}>
                        {skill.level || 'N/A'}
                      </span>
                    </div>
                    <ProgressBar
                      // Use skill.level correctly
                      now={getProficiencyPercentage(skill.level)}
                      variant={getVariant(skill.level)}
                      className="skill-progress-bar"
                    />
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

Skills.propTypes = {
  limit: PropTypes.number,
};

export default Skills;