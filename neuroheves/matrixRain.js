// NeuroHeves Matrix Rain - Profesyonel Sinematik Kalite
// Erdincicus ❤ Hevespia - Hidden Love in the Code

class NeuroHevesMatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.columns = [];
        this.frameCount = 0;
        
        // Matrix configuration
        this.fontSize = 14;
        this.matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:',.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        this.secretMessage = "I❤HEVES";
        this.loveChars = "ILOVEHES";
        
        // Secret message state
        this.secretMessageColumn = -1;
        this.secretMessageTimer = 0;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupCanvas();
        this.initializeColumns();
        this.startAnimation();
        this.setupEventListeners();
        this.showConsoleEasterEggs();
    }
    
    createCanvas() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'matrix-rain';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            pointer-events: none;
            image-rendering: crisp-edges;
            background: #000000;
        `;
        
        // Insert as first child of body
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d', { 
            alpha: false,
            desynchronized: true 
        });
    }
    
    setupCanvas() {
        // Retina display support
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Anti-aliasing for smooth rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.textAlign = 'start';
        this.ctx.textBaseline = 'top';
        
        // Store dimensions
        this.width = rect.width;
        this.height = rect.height;
    }
    
    initializeColumns() {
        const columnCount = Math.floor(this.width / this.fontSize);
        this.columns = [];
        
        for (let i = 0; i < columnCount; i++) {
            this.columns.push({
                x: i * this.fontSize,
                y: Math.random() * -500 - 100, // Staggered start
                speed: 0.3 + Math.random() * 0.8, // Variable speed for depth
                brightness: 0.4 + Math.random() * 0.6, // Variable brightness
                trailLength: 8 + Math.floor(Math.random() * 15), // Variable trail
                characters: [] // Character cache
            });
        }
    }
    
    getRandomChar(useSecret = false) {
        // Subtle love character injection (11% chance)
        if (useSecret && Math.random() < 0.11) {
            return this.loveChars[Math.floor(Math.random() * this.loveChars.length)];
        }
        return this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
    }
    
    isLoveChar(char) {
        return this.loveChars.includes(char);
    }
    
    drawSecretMessage() {
        if (this.secretMessageColumn === -1) return;
        
        this.secretMessageTimer++;
        
        // Subtle fade in/out timing
        let alpha = 0;
        if (this.secretMessageTimer <= 60) {
            alpha = (this.secretMessageTimer / 60) * 0.7; // Fade in
        } else if (this.secretMessageTimer <= 180) {
            alpha = 0.7; // Hold
        } else if (this.secretMessageTimer <= 240) {
            alpha = 0.7 * (1 - (this.secretMessageTimer - 180) / 60); // Fade out
        }
        
        if (alpha > 0) {
            this.ctx.font = `bold ${this.fontSize}px 'Courier New', monospace`;
            
            for (let j = 0; j < this.secretMessage.length; j++) {
                const x = (this.secretMessageColumn + j) * this.fontSize;
                const waveOffset = Math.sin(this.frameCount * 0.02 + j * 0.5) * 3;
                const y = this.height * 0.3 + waveOffset + j * this.fontSize * 1.8;
                
                // Subtle glow effect for love message
                this.ctx.shadowBlur = 12;
                this.ctx.shadowColor = '#ff6b6b';
                this.ctx.fillStyle = `rgba(255, 107, 107, ${alpha})`;
                this.ctx.fillText(this.secretMessage[j], x, y);
                
                // Extra glow layer
                this.ctx.shadowBlur = 6;
                this.ctx.shadowColor = '#ffffff';
                this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
                this.ctx.fillText(this.secretMessage[j], x, y);
            }
            
            this.ctx.shadowBlur = 0;
        }
        
        if (this.secretMessageTimer >= 240) {
            this.secretMessageColumn = -1;
            this.secretMessageTimer = 0;
        }
    }
    
    drawMatrixRain() {
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            const charIndex = Math.floor(column.y / this.fontSize);
            
            // Update character cache
            if (!column.characters[charIndex]) {
                column.characters[charIndex] = this.getRandomChar(true);
            }
            
            // Draw trail with gradient effect
            for (let j = 0; j < column.trailLength; j++) {
                const trailCharIndex = charIndex - j;
                const trailY = column.y - j * this.fontSize;
                
                if (trailY > -this.fontSize && trailY < this.height + this.fontSize && trailCharIndex >= 0) {
                    const char = column.characters[trailCharIndex];
                    if (!char) continue;
                    
                    const isLove = this.isLoveChar(char);
                    const baseAlpha = column.brightness * (1 - (j / column.trailLength));
                    
                    // Head character - brightest
                    if (j === 0) {
                        this.ctx.font = `bold ${this.fontSize}px 'Courier New', monospace`;
                        
                        if (isLove) {
                            // Love characters get extra glow
                            this.ctx.shadowBlur = 8;
                            this.ctx.shadowColor = '#00ff41';
                            this.ctx.fillStyle = `rgba(120, 255, 120, ${Math.min(1, baseAlpha * 1.5)})`;
                        } else {
                            this.ctx.shadowBlur = 4;
                            this.ctx.shadowColor = '#00ff41';
                            this.ctx.fillStyle = `rgba(220, 255, 220, ${Math.min(1, baseAlpha * 1.3)})`;
                        }
                        
                        this.ctx.fillText(char, column.x, trailY);
                        
                    } else if (j < 4) {
                        // Near head - medium brightness
                        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
                        this.ctx.shadowBlur = 2;
                        
                        if (isLove) {
                            this.ctx.shadowColor = '#00ff41';
                            this.ctx.fillStyle = `rgba(100, 255, 140, ${baseAlpha * 0.9})`;
                        } else {
                            this.ctx.shadowColor = '#00ff41';
                            this.ctx.fillStyle = `rgba(180, 255, 180, ${baseAlpha * 0.8})`;
                        }
                        
                        this.ctx.fillText(char, column.x, trailY);
                        
                    } else {
                        // Trail - fading
                        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
                        this.ctx.shadowBlur = 0;
                        
                        if (isLove) {
                            this.ctx.fillStyle = `rgba(80, 255, 120, ${baseAlpha * 0.7})`;
                        } else {
                            this.ctx.fillStyle = `rgba(0, 255, 65, ${baseAlpha * 0.6})`;
                        }
                        
                        this.ctx.fillText(char, column.x, trailY);
                    }
                }
            }
            
            this.ctx.shadowBlur = 0; // Reset shadow
            
            // Update column position
            column.y += column.speed;
            
            // Reset when off screen
            if (column.y > this.height + 200) {
                if (Math.random() > 0.975) {
                    column.y = -Math.random() * 200 - 50;
                    column.speed = 0.3 + Math.random() * 0.8;
                    column.brightness = 0.4 + Math.random() * 0.6;
                    column.trailLength = 8 + Math.floor(Math.random() * 15);
                    column.characters = []; // Clear cache
                }
            }
        }
    }
    
    draw() {
        // Professional fade effect (not pure black)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.frameCount++;
        
        // Trigger secret message every 220-280 frames (subtle timing)
        if (this.frameCount % 250 === 0 && this.secretMessageColumn === -1) {
            const maxColumn = this.columns.length - this.secretMessage.length - 2;
            this.secretMessageColumn = Math.floor(Math.random() * maxColumn);
            this.secretMessageTimer = 0;
        }
        
        // Draw secret love message
        this.drawSecretMessage();
        
        // Draw main matrix rain
        this.drawMatrixRain();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.draw());
    }
    
    startAnimation() {
        this.animationId = requestAnimationFrame(() => this.draw());
    }
    
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.initializeColumns();
        });
        
        // Handle page visibility for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAnimation();
            } else {
                this.startAnimation();
            }
        });
    }
    
    showConsoleEasterEggs() {
        setTimeout(() => {
            console.log(
                '%c💜 NeuroHeves Matrix Rain %c- Sinematik Kalite',
                'color: #667eea; font-size: 20px; font-weight: bold;',
                'color: #00ff41; font-size: 16px; font-style: italic;'
            );
            console.log(
                '%cArchitect: Erdincicus | Inspired by: Hevespia',
                'color: #764ba2; font-size: 14px; font-weight: 600;'
            );
            console.log(
                '%c"Düşen kodlara dikkatli bak... aşk gizli mesajlarda saklı" 👀💕',
                'color: #ff6b6b; font-style: italic; font-size: 13px;'
            );
            console.log(
                '%c🎬 60 FPS | Retina Ready | Professional Quality',
                'color: #00ff41; font-size: 11px; font-weight: bold;'
            );
            console.log(
                '%c🔍 Secret Message Timer: Every ~4 seconds | Look for "I❤HEVES"',
                'color: #ff6b6b; font-size: 10px; font-style: italic;'
            );
        }, 2000);
    }
    
    destroy() {
        this.stopAnimation();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', this.setupCanvas);
        document.removeEventListener('visibilitychange', this.handleVisibility);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure we don't create multiple instances
    if (window.neuroHevesMatrixRain) {
        window.neuroHevesMatrixRain.destroy();
    }
    
    window.neuroHevesMatrixRain = new NeuroHevesMatrixRain();
});

export default NeuroHevesMatrixRain;