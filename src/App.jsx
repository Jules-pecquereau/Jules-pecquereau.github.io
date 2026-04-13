import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Background3D from './components/Background3D';
import AccessibilityWidget from './components/AccessibilityWidget';
import { useState } from 'react';

function App() {
  const [stopAnimation, setStopAnimation] = useState(false);

  return (
    <Router>
      <Background3D stopAnimation={stopAnimation} />
      <AccessibilityWidget stopAnimation={stopAnimation} setStopAnimation={setStopAnimation} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projet/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
