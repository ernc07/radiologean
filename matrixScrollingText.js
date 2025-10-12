// Matrix Scrolling Text System - "Wake up, Heves..." Effect
class MatrixScrollingText {
    constructor() {
        this.messages = [
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
            "HevX System: Love Protocol Active",
            "Radiology meets poetry in your honor...",
            "Each scan tells a story for you...",
            "Matrix rain falls, Heves rises."
        ];
        
        this.isVisible = false;
        this.currentElement = null;
        this.init();
    }

    init() {
        // Wait for page load then start
        setTimeout(() => {
            this.showMessage();
        }, 8000); // First message after 8 seconds

        // Show messages every 45-60 seconds
        setInterval(() => {
            if (!this.isVisible) {
                this.showMessage();
            }
        }, this.getRandomInterval());
    }

    getRandomInterval() {
        return Math.random() * 15000 + 45000; // 45-60 seconds
    }

    async showMessage() {
        if (this.isVisible) return;

        const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
        
        this.isVisible = true;
        this.createMessageElement();
        
        // Typing effect
        await this.typeMessage(randomMessage);
        
        // Keep visible for 5 seconds
        setTimeout(() => {
            this.hideMessage();
        }, 5000);
    }

    createMessageElement() {
        // Remove existing element if any
        if (this.currentElement) {
            this.currentElement.remove();
        }

        // Create container
        this.currentElement = document.createElement('div');
        this.currentElement.className = 'matrix-scrolling-text';
        
        // Create text element
        const textElement = document.createElement('div');
        textElement.className = 'matrix-text';
        
        this.currentElement.appendChild(textElement);
        document.body.appendChild(this.currentElement);
    }

    async typeMessage(message) {
        const textElement = this.currentElement.querySelector('.matrix-text');
        let currentText = '';
        
        for (let i = 0; i < message.length; i++) {
            currentText += message[i];
            textElement.innerHTML = currentText + '<span class="matrix-cursor">█</span>';
            
            // Wait between characters
            await new Promise(resolve => setTimeout(resolve, 80));
        }
        
        // Remove cursor after typing complete
        setTimeout(() => {
            textElement.innerHTML = currentText;
        }, 500);
    }

    hideMessage() {
        if (this.currentElement) {
            this.currentElement.style.animation = 'matrixFadeOut 1s ease-out forwards';
            
            setTimeout(() => {
                if (this.currentElement) {
                    this.currentElement.remove();
                    this.currentElement = null;
                }
                this.isVisible = false;
            }, 1000);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Matrix rain to load first
    setTimeout(() => {
        new MatrixScrollingText();
        
        console.log('%c🟢 Matrix Scrolling Text Loaded', 'color: #00ff41; font-size: 14px;');
        console.log('%c💚 "Wake up, Heves..." - System Ready', 'color: #00ff41; font-size: 12px;');
    }, 2000);
});

export default MatrixScrollingText;