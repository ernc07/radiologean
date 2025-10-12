import { useEffect, useRef, useCallback } from 'react';

function MatrixRain() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const columnsRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    });
    
    // Retina display support for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    
    const setupCanvas = () => {
      rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Anti-aliasing for smooth text
      ctx.imageSmoothingEnabled = true;
      ctx.textAlign = 'start';
      ctx.textBaseline = 'top';
    };
    
    setupCanvas();
    
    // Configuration for cinematic quality
    const fontSize = 14;
    const columns = Math.floor(rect.width / fontSize);
    
    // Matrix character set with Japanese katakana for authenticity
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:',.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const secretMessage = "I❤HEVES";
    const loveChars = "ILOVEHES";
    
    // Column states for depth and variation
    const drops = new Array(columns);
    const speeds = new Array(columns);
    const brightnesses = new Array(columns);
    const trailLengths = new Array(columns);
    const characters = new Array(columns).fill(null).map(() => []);
    
    // Initialize columns with staggered start
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -200 - 50; // Staggered start
      speeds[i] = 0.3 + Math.random() * 0.8; // Variable speed for depth
      brightnesses[i] = 0.4 + Math.random() * 0.6; // Variable brightness
      trailLengths[i] = 8 + Math.floor(Math.random() * 15); // Variable trail length
      characters[i] = [];
    }
    
    // Secret message state
    let frameCount = 0;
    let secretMessageColumn = -1;
    let secretMessageProgress = 0;
    let secretMessageTimer = 0;
    
    function getRandomChar(useSecret = false) {
      // Subtle love character injection (10-12% chance)
      if (useSecret && Math.random() < 0.11) {
        return loveChars[Math.floor(Math.random() * loveChars.length)];
      }
      return matrixChars[Math.floor(Math.random() * matrixChars.length)];
    }
    
    function isLoveChar(char) {
      return loveChars.includes(char);
    }
    
    function draw() {
      // Professional fade effect (not pure black for better depth)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      frameCount++;
      
      // Trigger secret message every 180-220 frames (subtle timing)
      if (frameCount % 200 === 0 && secretMessageColumn === -1) {
        secretMessageColumn = Math.floor(Math.random() * (columns - secretMessage.length));
        secretMessageProgress = 0;
        secretMessageTimer = 0;
      }
      
      // Render secret message (VERY SUBTLE)
      if (secretMessageColumn !== -1) {
        secretMessageTimer++;
        
        // Fade in (50 frames), hold (100 frames), fade out (50 frames)
        let alpha = 0;
        if (secretMessageTimer <= 50) {
          alpha = (secretMessageTimer / 50) * 0.8; // Fade in
        } else if (secretMessageTimer <= 150) {
          alpha = 0.8; // Hold
        } else if (secretMessageTimer <= 200) {
          alpha = 0.8 * (1 - (secretMessageTimer - 150) / 50); // Fade out
        }
        
        if (alpha > 0) {
          ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
          
          for (let j = 0; j < secretMessage.length; j++) {
            const x = (secretMessageColumn + j) * fontSize;
            const y = (Math.sin(frameCount * 0.01 + j) * 2 + rect.height * 0.3) + j * fontSize * 1.5;
            
            // Subtle glow effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ff6b6b';
            ctx.fillStyle = `rgba(255, 107, 107, ${alpha})`;
            ctx.fillText(secretMessage[j], x, y);
          }
          
          ctx.shadowBlur = 0;
        }
        
        if (secretMessageTimer >= 200) {
          secretMessageColumn = -1;
          secretMessageTimer = 0;
        }
      }
      
      // Main matrix rain rendering
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const currentY = drops[i] * fontSize;
        
        // Update character array for this column
        const charIndex = Math.floor(drops[i]);
        if (!characters[i][charIndex]) {
          characters[i][charIndex] = getRandomChar(true);
        }
        
        // Draw trail effect with gradient
        const trailLength = trailLengths[i];
        
        for (let j = 0; j < trailLength; j++) {
          const trailCharIndex = charIndex - j;
          const trailY = (drops[i] - j) * fontSize;
          
          if (trailY > -fontSize && trailY < rect.height + fontSize && trailCharIndex >= 0) {
            const char = characters[i][trailCharIndex];
            if (!char) continue;
            
            const isLove = isLoveChar(char);
            const baseAlpha = brightnesses[i] * (1 - (j / trailLength));
            
            // Different rendering for head vs trail
            if (j === 0) {
              // Head - brightest with glow
              ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
              
              if (isLove) {
                // Love characters get subtle extra glow
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#00ff41';
                ctx.fillStyle = `rgba(100, 255, 100, ${Math.min(1, baseAlpha * 1.4)})`;
              } else {
                ctx.shadowBlur = 3;
                ctx.shadowColor = '#00ff41';
                ctx.fillStyle = `rgba(200, 255, 200, ${Math.min(1, baseAlpha * 1.2)})`;
              }
              
              ctx.fillText(char, x, trailY);
            } else if (j < 3) {
              // Near head - medium brightness
              ctx.font = `${fontSize}px 'Courier New', monospace`;
              ctx.shadowBlur = 1;
              
              if (isLove) {
                ctx.fillStyle = `rgba(80, 255, 120, ${baseAlpha * 0.9})`;
              } else {
                ctx.fillStyle = `rgba(150, 255, 150, ${baseAlpha * 0.8})`;
              }
              
              ctx.fillText(char, x, trailY);
            } else {
              // Trail - fading
              ctx.font = `${fontSize}px 'Courier New', monospace`;
              ctx.shadowBlur = 0;
              
              if (isLove) {
                ctx.fillStyle = `rgba(60, 255, 100, ${baseAlpha * 0.6})`;
              } else {
                ctx.fillStyle = `rgba(0, 255, 65, ${baseAlpha * 0.5})`;
              }
              
              ctx.fillText(char, x, trailY);
            }
          }
        }
        
        ctx.shadowBlur = 0; // Reset shadow
        
        // Update drop position
        drops[i] += speeds[i];
        
        // Reset when off screen with random delay
        if (drops[i] * fontSize > rect.height + 100) {
          if (Math.random() > 0.98) {
            drops[i] = -Math.random() * 100 - 20;
            speeds[i] = 0.3 + Math.random() * 0.8;
            brightnesses[i] = 0.4 + Math.random() * 0.6;
            trailLengths[i] = 8 + Math.floor(Math.random() * 15);
            characters[i] = []; // Clear character cache
          }
        }
      }
      
      // Continue animation
      animationRef.current = requestAnimationFrame(draw);
    }
    
    // Start the animation
    animationRef.current = requestAnimationFrame(draw);
    
    // Handle window resize
    const handleResize = () => {
      setupCanvas();
      
      // Recalculate columns
      const newColumns = Math.floor(rect.width / fontSize);
      
      if (newColumns !== columns) {
        // Reinitialize if column count changed
        location.reload(); // Simple approach for resize
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Professional console easter eggs
    console.log(
      '%c💜 NeuroHeves Matrix Rain %c- Cinematic Quality',
      'color: #667eea; font-size: 18px; font-weight: bold;',
      'color: #00ff41; font-size: 14px; font-style: italic;'
    );
    console.log(
      '%cArchitect: Erdincicus | Inspired by: Hevespia',
      'color: #764ba2; font-size: 13px; font-weight: 600;'
    );
    console.log(
      '%c"Look closely at the falling code... love is hidden within" 👀💕',
      'color: #ff6b6b; font-style: italic; font-size: 12px;'
    );
    console.log(
      '%cRendering at ' + Math.round(dpr * 100) / 100 + 'x pixel density',
      'color: #00ff41; font-size: 10px;'
    );
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="matrix-rain" />;
}

export default MatrixRain;