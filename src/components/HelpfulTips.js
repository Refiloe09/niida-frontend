import React, { useState } from 'react';
import './HelpfulTips.css';

const tips = [
  "Did you know? You can save your progress at any time and come back later!",
  "Ensure all required fields are filled out to avoid submission errors.",
  "You can access your submission history anytime in the Recent Submissions section.",
  "Check our FAQ section if you have any questions about form submissions.",
];

const HelpfulTips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <div className="helpful-tips-container">
      <h2>Helpful Tips</h2>
      <div className="tip-card">
        <p>{tips[currentTip]}</p>
      </div>
      <div className="tip-controls">
        <button onClick={prevTip}>Previous</button>
        <button onClick={nextTip}>Next</button>
      </div>
    </div>
  );
};

export default HelpfulTips;
