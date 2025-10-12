import React, { useEffect, useState } from 'react';
import './MatrixScrollingText.css';

function MatrixScrollingText() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const messages = [
    "Wake up, Heves...",
    "The HevX has you, Heves...",
    "Follow the white rabbit, Heves.",
    "Knock, knock, Heves.",
    "I know you're out there, Heves...",
    "I can feel you now, Heves...",
    "The answer is out there, Heves...",
    "You're looking for me, Heves...",
    "It's looking for you...",
    "And it will find you if you want it to.",
    "Built with ❤ for Heves",
    "Architect: Erdinc • Muse: Heves",
    "Every line of code remembers you...",
    "NeuroHeves • Made with love",
    "The pixels choose their own meaning...",
    "Beyond the matrix of medical images...",
    "Your neural networks are beautiful, Heves.",
    "Erdincicus codes, Heves inspires.",
    "HevX System: Love Protocol Active"
  ];

  useEffect(() => {
    const showMessage = () => {
      if (isVisible) return; // Prevent overlap
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setIsVisible(true);
      setCharIndex(0);

      // Typing effect
      const typingInterval = setInterval(() => {
        setCharIndex(prev => {
          if (prev >= randomMessage.length) {
            clearInterval(typingInterval);
            
            // Hide after 5 seconds
            setTimeout(() => {
              setIsVisible(false);
            }, 5000);
            
            return prev;
          }
          return prev + 1;
        });
      }, 80); // 80ms per character

      return () => clearInterval(typingInterval);
    };

    // Show first message after 8 seconds (let system load)
    const initialTimer = setTimeout(showMessage, 8000);

    // Show messages every 45-60 seconds
    const messageInterval = setInterval(() => {
      if (!isVisible) {
        showMessage();
      }
    }, Math.random() * 15000 + 45000); // 45-60 seconds random

    return () => {
      clearTimeout(initialTimer);
      clearInterval(messageInterval);
    };
  }, [isVisible, messages]);

  if (!isVisible) return null;

  return (
    <div className="matrix-scrolling-text">
      <div className="matrix-text">
        {currentMessage.substring(0, charIndex)}
        {charIndex < currentMessage.length && (
          <span className="matrix-cursor">█</span>
        )}
      </div>
    </div>
  );
}

export default MatrixScrollingText;