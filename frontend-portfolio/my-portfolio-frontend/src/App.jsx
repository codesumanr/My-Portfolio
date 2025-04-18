import React from 'react';
import {BrowserRouter as Router,Routes,Route,useLocation}  from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // For page transition animations

// Import Core Layout Components
import Header from './components/Header/Header'; // Adjust path if necessary
import Footer from './components/Footer/Footer'; // Adjust path if necessary

// Import Page Components
import Home from './pages/Home';               // Adjust path if necessary
import SkillsPage from './pages/SkillsPage';       // Adjust path if necessary
import ExperiencePage from './pages/ExperiencePage'; // Adjust path if necessary
import ProjectsPage from './pages/ProjectsPage';   // Adjust path if necessary
import ContactPage from './pages/ContactPage';     // Adjust path if necessary

// Import other pages as needed

// Import Global Styles
import './App.css'; // Contains global styles, layout structure, variables

// Wrapper component to handle AnimatePresence logic cleanly
function AnimatedRoutes() {
  const location = useLocation(); // Get current location
  return (
    // AnimatePresence enables exit animations when routes change
    // mode="wait" ensures the exiting page finishes animating out before the new one animates in
    <AnimatePresence mode="wait">
      {/* The key prop is essential for AnimatePresence to detect route changes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add other routes here */}
        {/* Optional: Catch-all route for 404 Not Found */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  return (
    // BrowserRouter provides routing context
    <Router>
      {/* This div matches the .app-container style in App.css */}
      <div className="app-container">
        {/* Render the fixed Header */}
        <Header />

        {/* This main element matches .main-content in App.css */}
        {/* It uses flex: 1 and padding-top to handle layout with fixed header */}
        <main className="main-content">
          <AnimatedRoutes /> {/* Render the animated routes */}
        </main>

        {/* Render the Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;