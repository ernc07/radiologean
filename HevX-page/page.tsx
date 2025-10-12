'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './HevX.css';

// Matrix Rain Component
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas boyutlarını ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix karakterleri
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ÇĞıÖŞÜ日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      // Arka plan - şeffaflık efekti için
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize + fontSize/2, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

// Scrolling Text Component
const MatrixScrollingText: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const messages = [
    "Wake up, Heves...",
    "The Matrix has you...", 
    "Follow the white rabbit...",
    "Knock, knock, Heves...",
    "Welcome to the real world...",
    "There is no spoon...",
    "Free your mind...",
    "The desert of the real...",
    "What is the Matrix?",
    "Reality is an illusion...",
    "Take the red pill...",
    "Buckle your seatbelt Dorothy...",
    "We're going down the rabbit hole..."
  ];

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      const currentMessage = messages[messageIndex];
      
      if (!isDeleting) {
        setDisplayedText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentMessage.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        }
      } else {
        setDisplayedText(currentMessage.slice(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="matrix-text-container">
      <div className="matrix-text">
        {displayedText}
        <span className="cursor">|</span>
      </div>
    </div>
  );
};

// Main HevX Component
const HevXPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Authentication
  const handleAuth = () => {
    if (password === '2113') {
      setIsAuthenticated(true);
      setShowChat(true);
    } else {
      alert('Incorrect HevX access code. Try again.');
      setPassword('');
    }
  };

  // AI Response
  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const prompt = `Sen NeuroHeves'sin, Matrix evreninden bir neuroradyoloji uzmanısın. ${query}`;
      
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      setResponse(aiResponse);
    } catch (error) {
      console.error('AI Error:', error);
      setResponse('Connection error. The Matrix is experiencing difficulties...');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="hevx-container">
        <MatrixRain />
        <MatrixScrollingText />
        
        <div className="auth-container">
          <div className="matrix-logo">
            <h1>HevX</h1>
            <p>Enter the Matrix</p>
          </div>
          
          <div className="auth-form">
            <input
              type="password"
              placeholder="Access Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="matrix-input"
            />
            <button onClick={handleAuth} className="matrix-button">
              CONNECT
            </button>
          </div>
          
          <div className="matrix-hint">
            Hint: The year of Neo's awakening...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hevx-container authenticated">
      <MatrixRain />
      
      <div className="chat-interface">
        <div className="chat-header">
          <h2>🧠 NeuroHeves - AI Radiology Assistant</h2>
          <p>Welcome to the Matrix, Heves. How can I help with your radiology journey?</p>
        </div>
        
        <div className="query-container">
          <textarea
            placeholder="Ask me anything about neuroradiology..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="matrix-textarea"
            rows={3}
          />
          <button 
            onClick={handleQuery} 
            disabled={isLoading}
            className="matrix-button"
          >
            {isLoading ? 'PROCESSING...' : 'ANALYZE'}
          </button>
        </div>
        
        {response && (
          <div className="response-container">
            <div className="response-content">
              <pre>{response}</pre>
            </div>
          </div>
        )}
        
        <div className="footer-info">
          <p>🔬 Advanced AI powered by Gemini 2.0 Flash</p>
          <p>📚 Trained on comprehensive neuroradiology resources</p>
        </div>
      </div>
    </div>
  );
};

export default HevXPage;