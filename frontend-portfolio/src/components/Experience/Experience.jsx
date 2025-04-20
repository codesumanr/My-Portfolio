import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { fetchExperiences } from '../../services/api'; // Assuming this fetches your experience data
import Loader from '../Loader/Loader'; // Assuming you have a Loader component
import './Experience.css'; // We'll need CSS for the timeline styling

const Experience = ({ limit }) => {
  // State for experience data, loading status, and potential errors
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperiences = async () => {
      setLoading(true); // Start loading
      setError(null);   // Reset error state
      try {
        // Fetch data using your API service function
        const result = await fetchExperiences();

        // **Crucially, check the structure returned by your API**
        // Assuming your API returns { success: true, data: [...] }
        if (result && result.success && Array.isArray(result.data)) {
          setExperiences(result.data);
        } else if (Array.isArray(result)) {
           // Fallback if the API *just* returns the array (less likely based on your description)
           console.warn("API returned an array directly, expected { success: true, data: [...] } structure.");
           setExperiences(result);
        } else {
          // Handle unexpected structure or failed request (if success: false)
          console.error('Unexpected data structure received:', result);
          setError('Failed to load experience data due to unexpected format.');
          setExperiences([]); // Ensure experiences is an array
        }
      } catch (err) {
        console.error('Error loading experiences:', err);
        setError('Failed to load experience data. Please try again later.');
        setExperiences([]); // Ensure experiences is an array even on error
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    loadExperiences();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Render Loading State ---
  if (loading) {
    // Use your Loader component or a simple placeholder
    return <Loader message="Loading experience..." />;
    // Or: return <div className="text-center p-5">Loading experience...</div>;
  }

  // --- Render Error State ---
  if (error) {
    // Display a user-friendly error message
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  // --- Render No Experiences State ---
  if (!experiences || experiences.length === 0) {
    return <div className="text-center p-5">No experience data available.</div>;
  }

  // Apply the limit if provided and if experiences is a valid array
  const displayedExperiences = (limit && typeof limit === 'number' && limit > 0)
    ? experiences.slice(0, limit)
    : experiences;

  // --- Animation Variants (Optional but clean) ---
  const itemVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50, // Slide from left or right
    }),
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2, // Stagger animation
        ease: "easeOut"
      }
    })
  };

  // --- Render Content ---
  return (
    // The outer div acts as the timeline container
    <div className="experience-timeline">
      {displayedExperiences.map((experience, index) => (
        <motion.div
          key={experience._id || index} // Use a unique ID from data if possible
          className="timeline-item"
          custom={index} // Pass index to variants for alternating/staggering
          initial="hidden"
          animate="visible" // Use whileInView="visible" viewport={{ once: true, amount: 0.3 }} for scroll triggering
          variants={itemVariants}
        >
          {/* The visual line/dot of the timeline */}
          <div className="timeline-marker"></div>

          {/* The content card for the experience */}
          <Card className="timeline-content shadow-sm">
            <Card.Body>
              {/* Header section for Title and Dates */}
              <div className="experience-header mb-2">
                <Card.Title as="h5" className="job-title mb-0">
                  {experience.title || 'Job Title Missing'}
                </Card.Title>
                <span className="job-period text-muted small">
                  {experience.startDate || 'Start Date'} - {experience.endDate || 'Present'}
                </span>
              </div>

              {/* Subtitle for Company and Location */}
              <Card.Subtitle className="mb-3 company-location">
                <span className="company-name fw-semibold">{experience.company || 'Company Name Missing'}</span>
                {experience.location && ` • ${experience.location}`}
              </Card.Subtitle>

              {/* Description */}
              {experience.description && (
                <Card.Text className="job-description">
                  {experience.description}
                </Card.Text>
              )}

              {/* Skills Section */}
              {Array.isArray(experience.skills) && experience.skills.length > 0 && (
                <div className="skills-used mt-3">
                  {experience.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      pill // Use pill shape for badges
                      bg="info" // Or choose another color like 'secondary', 'primary' etc.
                      className="skill-badge me-1 mb-1" // Add margin for spacing
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// --- PropTypes for Type Checking ---
Experience.propTypes = {
  limit: PropTypes.number, // limit is an optional number
};

export default Experience;