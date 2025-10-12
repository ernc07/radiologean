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
        // İlk mesajı göster
        setTimeout(() => {
            this.showMessage();
        }, 2000);

        // Authentication state'e göre interval ayarla
        setInterval(() => {
            if (!this.isVisible) {
                this.showMessage();
            }
        }, this.getRandomInterval());
    }

    getRandomInterval() {
        // Authentication state kontrolü
        const isLocked = document.body.classList.contains('hevx-locked');
        
        if (isLocked) {
            // Locked: Daha sık Wake Up mesajı (8-15 saniye)
            return Math.random() * 7000 + 8000;
        } else {
            // Unlocked: Normal interval (15-25 saniye)
            return Math.random() * 10000 + 15000;
        }
    }

    async showMessage() {
        if (this.isVisible) return;

        // Authentication state'e göre mesaj seç
        const isLocked = document.body.classList.contains('hevx-locked');
        let selectedMessage;
        
        if (isLocked) {
            // Locked state: Sadece wake up mesajları
            const wakeUpMessages = [
                "Wake up, Heves...",
                "The system is calling you, Heves...",
                "Are you ready, Heves?",
                "Time to wake up...",
                "Heves... can you hear me?",
                "The truth awaits, Heves..."
            ];
            selectedMessage = wakeUpMessages[Math.floor(Math.random() * wakeUpMessages.length)];
        } else {
            // Unlocked state: Tüm mesajlar
            selectedMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
        }
        
        this.isVisible = true;
        this.createMessageElement();
        
        // Typing effect
        await this.typeMessage(selectedMessage);
        
        // Metin yazıldıktan sonra okuma süresi + authentication state'e göre görünme süresi
        const readingTime = 2000; // 2 saniye okuma süresi
        const visibilityDuration = isLocked ? 5000 : 6000; // Daha uzun süre
        const totalDuration = readingTime + visibilityDuration;
        
        setTimeout(() => {
            this.hideMessage();
        }, totalDuration);
    }

    createMessageElement() {
        // Use existing container or create new one
        this.currentElement = document.getElementById('matrixScrollingText') || document.createElement('div');
        
        if (!document.getElementById('matrixScrollingText')) {
            this.currentElement.id = 'matrixScrollingText';
            this.currentElement.className = 'matrix-scrolling-text';
            document.body.appendChild(this.currentElement);
        }
        
        // Clear existing content and create text element
        this.currentElement.innerHTML = '';
        const textElement = document.createElement('div');
        textElement.className = 'matrix-text';
        
        this.currentElement.appendChild(textElement);
    }

    async typeMessage(message) {
        const textElement = this.currentElement.querySelector('.matrix-text');
        const isLocked = document.body.classList.contains('hevx-locked');
        
        // Authentication state'e göre typing hızı
        const typingSpeed = isLocked ? 100 : 80; // Locked'da biraz daha yavaş
        
        let currentText = '';
        
        for (let i = 0; i < message.length; i++) {
            currentText += message[i];
            textElement.innerHTML = currentText + '<span class="matrix-cursor">█</span>';
            
            // Wait between characters
            await new Promise(resolve => setTimeout(resolve, typingSpeed));
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
    
    // Access Granted özel mesajı
    async showAccessGrantedMessage() {
        // Mevcut mesajı gizle
        if (this.isVisible) {
            this.hideMessage();
            await new Promise(resolve => setTimeout(resolve, 1200));
        }
        
        const accessMessages = [
            "🔓 ACCESS GRANTED",
            "\"Welcome to the real world.\" - Morpheus",
            "\"There is no spoon.\" - Spoon Boy",
            "\"Free your mind.\" - Morpheus",
            "\"The One has awakened.\" - Oracle",
            "\"Follow the white rabbit.\" - Trinity",
            "\"Red pill taken successfully.\" - System",
            "\"You're faster than this.\" - Morpheus",
            "\"Believe it or not, you're not in Kansas anymore.\"",
            "\"Welcome back, Neo.\" - Morpheus"
        ];
        
        // Rastgele access message seç
        const message = accessMessages[Math.floor(Math.random() * accessMessages.length)];
        
        this.isVisible = true;
        this.createMessageElement();
        
        // Access granted için özel CSS class ekle
        const textElement = this.currentElement.querySelector('.matrix-text');
        textElement.classList.add('access-granted-message');
        
        // Typing effect
        await this.typeMessage(message);
        
        // Access granted için özel okuma süresi (3 saniye okuma + 6 saniye görünme)
        const accessReadingTime = 3000; // 3 saniye okuma süresi
        const accessVisibilityDuration = 6000; // 6 saniye görünme
        const totalAccessDuration = accessReadingTime + accessVisibilityDuration;
        
        setTimeout(() => {
            textElement.classList.remove('access-granted-message');
            this.hideMessage();
        }, totalAccessDuration);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Matrix rain to load first
    setTimeout(() => {
        window.matrixScrollingText = new MatrixScrollingText();
        
        console.log('%c🟢 Matrix Scrolling Text Loaded', 'color: #00ff41; font-size: 14px;');
        console.log('%c💚 "Wake up, Heves..." - System Ready', 'color: #00ff41; font-size: 12px;');
    }, 2000);
});