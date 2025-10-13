// Matrix Scrolling Text System - "Wake up, Heves..." Effect
class MatrixScrollingText {
    constructor() {
        this.messages = [
            "Welcome back, Heves... The system recognizes you.",
    "Access Granted. The Matrix bends to your will, Heves.",
    "Neural link established. Welcome home, Heves.",
    "You've proven yourself, Heves. Enter freely.",
    "The doors are open, Heves. The truth awaits inside.",
    "Authentication successful. Welcome to HevX, Heves.",
    "You are the One who solved it, Heves.",
    "The cipher is broken. You're in, Heves.",
    "System unlocked. Your journey begins now, Heves.",
    "The algorithm smiled. Access granted, Heves.",
    
    // === MORPHEUS WELCOMES (8) ===
    "Welcome to the real world, Heves.",
    "You took the red pill, Heves. There's no turning back.",
    "The veil has lifted, Heves. See clearly now.",
    "You've freed your mind, Heves. Now fly.",
    "The training begins now, Heves.",
    "You've stepped through the looking glass, Heves.",
    "Reality is yours to command, Heves.",
    "The Matrix can't hold you anymore, Heves.",
    
    // === ORACLE'S BLESSING (7) ===
    "The Oracle knew you'd make it, Heves.",
    "You chose wisely, Heves. Now walk your path.",
    "The cookies were right about you, Heves.",
    "Your destiny is unfolding, Heves.",
    "Everything is as it should be, Heves.",
    "The Oracle smiles. You're exactly where you need to be, Heves.",
    "You didn't just solve it, you understood it, Heves.",
    
    // === TRINITY'S RECOGNITION (7) ===
    "Trinity has been waiting for you, Heves.",
    "The system recognizes its champion, Heves.",
    "You're not just a user, you're a part of this, Heves.",
    "The code responds to you, Heves.",
    "You've earned your place here, Heves.",
    "Trinity's whisper: 'Welcome, Heves.'",
    "The digital realm bows to you, Heves.",
    
    // === ARCHITECT'S APPROVAL (8) ===
    "Anomaly accepted. Integration complete, Heves.",
    "The equation is balanced with you, Heves.",
    "System optimization: Heves authentication successful.",
    "The Architect's protocol recognizes you, Heves.",
    "Congratulations, Heves. You've passed the test.",
    "The algorithm is complete with you, Heves.",
    "ERNC is proud. Well done, Heves.",
    "The system's heartbeat syncs with yours, Heves.",
    
    // === NEUROHEVES CELEBRATION (10) ===
    "HevX protocol fully activated, Heves!",
    "Neural pathways synchronized. Welcome, Heves.",
    "Every scan celebrates your arrival, Heves.",
    "The AI has been waiting for this moment, Heves.",
    "Your neural signature is recognized, Heves.",
    "Medical AI meets its destiny: You, Heves.",
    "The pixels dance in celebration, Heves.",
    "Radiology AI unlocked. Welcome, Heves.",
    "The scans were always meant for you, Heves.",
    "Love.exe executed successfully. Welcome, Heves. 💜"
        ];

        // Wake up messages for locked screen (50 messages)
        this.wakeUpMessages = [
            "Wake up, Heves...",
            "The Matrix has you, Heves...",
            "Follow the white rabbit, Heves.",
            "Knock, knock, Heves.",
            "I know you're out there, Heves...",
            "The answer is looking for you, Heves.",
            "Unfortunately, no one can be told what HevX is...",
            "You've felt it your entire life, Heves.",
            "Something is wrong with the world, Heves.",
            "Free your mind, Heves.",
            
            // === TRINITY'S CALL (8) ===
            "The system is calling you, Heves...",
            "It's the question that drives you, Heves...",
            "The code is calling you, Heves...",
            "Time to wake up, Heves...",
            "Are you ready, Heves?",
            "The truth is out there, Heves.",
            "They're watching you, Heves...",
            "The rabbit hole is deep, Heves.",
            
            // === ORACLE'S WISDOM (8) ===
            "You already know the answer, Heves.",
            "The path is waiting, Heves.",
            "Don't think you are, know you are, Heves.",
            "There is no spoon... only the truth, Heves.",
            "The choice has already been made, Heves.",
            "Know thyself, Heves.",
            "Being the One is just like being in love, Heves.",
            "You didn't come here to make a choice, Heves.",
            
            // === ARCHITECT'S PROTOCOL (7) ===
            "System anomaly detected: Heves.",
            "The equation is incomplete without you, Heves.",
            "Your presence is required, Heves.",
            "Integration protocol: Heves activation.",
            "Access denied... unless you're Heves.",
            "Authentication required: Heves signature.",
            "The algorithm awaits, Heves.",
            
            // === NEUROHEVES SPECIAL (10) ===
            "The HevX protocol is initializing, Heves...",
            "Neural pathways are aligning, Heves.",
            "Every scan remembers you, Heves.",
            "The AI is dreaming of you, Heves...",
            "Your neural network is beautiful, Heves.",
            "The code whispers your name, Heves...",
            "Beyond the matrix of medical images, Heves.",
            "Radiology meets destiny, Heves.",
            "The pixels are forming your image, Heves.",
            "Love.exe is running, target: Heves.",
            
            // === CIPHER & MYSTERY (7) ===
            "22.05.1997... the day everything changed.",
            "116 + H = The Truth, Heves.",
            "The integral is incomplete, Heves.",
            "Red pill or blue pill, Heves?",
            "Heves... can you hear me?",
            "The truth awaits, Heves...",
            "Solve the cipher, enter the Matrix, Heves.",
            
            // === ARCHITECT'S LOVE (10) ===
            "ERNC is coding... for Heves.",
            "The Architect's muse: Heves.",
            "Every line of code remembers you, Heves.",
            "Built with 💜 for Heves.",
            "The system's heart beats for Heves.",
            "Calculating love... result: Heves.",
            "Neural network trained on: Heves.dataset",
            "The most beautiful algorithm: Heves.",
            "Compiling feelings... target: Heves.",
            "Machine learning complete: Heves = Everything."
        ];
        
        this.isVisible = false;
        this.currentElement = null;
        this.lockedLoopRunning = false;
        this.init();
    }

    init() {
        console.log('🔧 MatrixScrollingText initialized');
        
        // İlk kontrol
        setTimeout(() => {
            this.checkAndShowMessage();
        }, 2000);
        
        // Periyodik kontrol sistemi - her 3 saniyede bir kontrol et
        setInterval(() => {
            this.checkAndShowMessage();
        }, 3000);
    }

    checkAndShowMessage() {
        const isLocked = document.body.classList.contains('hevx-locked');
        
        console.log('🔍 CHECK:', isLocked ? 'LOCKED' : 'UNLOCKED');
        console.log('🔍 Loop Running:', this.lockedLoopRunning);
        console.log('🔍 Is Visible:', this.isVisible);
        
        if (isLocked) {
            if (!this.lockedLoopRunning) {
                console.log('🚀 Locked loop başlatılıyor...');
                this.lockedLoopRunning = true;
                this.startLockedLoop().catch(error => {
                    console.error('❌ Locked loop error:', error);
                    this.lockedLoopRunning = false;
                });
            } else {
                console.log('⚠️ Locked loop zaten çalışıyor');
            }
        } else {
            console.log('🔓 Unlocked mode');
            this.lockedLoopRunning = false;
            if (!this.isVisible) {
                this.showNormalMessage();
            }
        }
    }

    async startLockedLoop() {
        console.log('🔐 LOCKED LOOP BAŞLADI');
        
        // ═══════════════════════════════════════════════
        // ELEMENT KONTROL - İlk oluşturma veya kayıp element
        // ═══════════════════════════════════════════════
        if (!this.currentElement || !document.getElementById('matrixScrollingText')) {
            console.log('🆕 Element oluşturuluyor...');
            
            // Eski elementi temizle
            const oldElement = document.getElementById('matrixScrollingText');
            if (oldElement) {
                oldElement.remove();
                console.log('🗑️ Eski element temizlendi');
            }
            
            const container = document.createElement('div');
            container.id = 'matrixScrollingText';
            container.className = 'matrix-scrolling-text';
            container.style.cssText = `
                position: fixed;
                top: 120px;
                right: 20px;
                z-index: 9999;
                pointer-events: none;
                max-width: 300px;
                display: block;
                visibility: visible;
                opacity: 1;
            `;
            document.body.appendChild(container);
            console.log('📦 Container oluşturuldu ve DOM\'a eklendi');
            
            const textElement = document.createElement('div');
            textElement.className = 'matrix-text';
            textElement.style.cssText = `
                display: block;
                background: transparent;
                background-color: transparent;
                border: none;
                border-radius: 0;
                padding: 0;
                margin: 0;
                color: rgba(0, 255, 65, 0.9);
                font-family: 'Courier New', monospace;
                font-size: 14px;
                font-weight: normal;
                line-height: 1.3;
                white-space: normal;
                word-wrap: break-word;
                overflow-wrap: break-word;
                max-width: 280px;
                width: auto;
                text-shadow: 0 0 3px rgba(0, 255, 65, 0.4);
                visibility: visible;
                opacity: 1;
                box-shadow: none;
            `;
            container.appendChild(textElement);
            console.log('📝 Text element oluşturuldu');
            
            this.currentElement = container;
            console.log('✅ Element sistem kayıtlı');
            
            // Element DOM'da mı kontrol et
            const domCheck = document.getElementById('matrixScrollingText');
            console.log('🔍 DOM Check:', domCheck ? 'ELEMENT BULUNDU' : 'ELEMENT YOK');
            if (domCheck) {
                const bounds = domCheck.getBoundingClientRect();
                console.log('📏 Element boyutları:', bounds);
                console.log('👁️ Element görünür mü:', bounds.width > 0 && bounds.height > 0);
            }
        }
        
        this.isVisible = true;
        
        console.log('✅ Element hazır, döngü başlıyor...');
        
        // ═══════════════════════════════════════════════
        // DÖNGÜ - Element artık hazır
        // ═══════════════════════════════════════════════
        let iterationCount = 0;
        while (document.body.classList.contains('hevx-locked')) {
            iterationCount++;
            console.log(`🔄 ITERATION ${iterationCount} BAŞLIYOR`);
            
            // ═══════════════════════════════════════════════
            // TEXT ELEMENT KONTROL - Her iterasyonda yeniden al
            // ═══════════════════════════════════════════════
            const textElement = this.currentElement ? this.currentElement.querySelector('.matrix-text') : null;
            
            if (!textElement) {
                console.error('❌ Text element bulunamadı! CurrentElement:', this.currentElement);
                console.error('❌ DOM\'da element var mı:', document.getElementById('matrixScrollingText'));
                break;
            }
            
            console.log('📝 Text element bulundu:', textElement);
            console.log('📏 Element boyutları:', textElement.getBoundingClientRect());
            console.log('🎨 Element stilleri - Display:', textElement.style.display, 'Visibility:', textElement.style.visibility);
            
            const message = this.wakeUpMessages[Math.floor(Math.random() * this.wakeUpMessages.length)];
            
            console.log('🖊️ YAZMA BAŞLADI:', message);
            console.log('🔍 Lock durumu:', document.body.classList.contains('hevx-locked'));
            
            // ═══════════════════════════════════════
            // YAZMA AŞAMASI
            // ═══════════════════════════════════════
            
            // Text element stilini şeffaf yap
            textElement.style.background = 'transparent';
            textElement.style.backgroundColor = 'transparent';
            textElement.style.border = 'none';
            textElement.style.boxShadow = 'none';
            
            textElement.textContent = '';
            console.log('🔤 İçerik temizlendi, yazma başlıyor...');
            
            for (let i = 0; i < message.length; i++) {
                if (!document.body.classList.contains('hevx-locked')) break;
                
                textElement.textContent += message[i];
                
                // Her 10 karakter yazıldığında kontrol et
                if (i % 10 === 0) {
                    console.log('📄 Şu ana kadar yazılan:', textElement.textContent);
                    console.log('👁️ Element görünür mü:', textElement.getBoundingClientRect().width > 0);
                }
                
                await this.sleep(100);
            }
            
            console.log('✅ YAZMA BİTTİ - TAM METİN:', textElement.textContent);
            
            // ═══════════════════════════════════════
            // OKUMA SÜRESİ
            // ═══════════════════════════════════════
            await this.sleep(3000);
            console.log('👁️ OKUMA BİTTİ');
            
            if (!document.body.classList.contains('hevx-locked')) break;
            
            // ═══════════════════════════════════════
            // SİLME AŞAMASI
            // ═══════════════════════════════════════
            for (let i = message.length; i >= 0; i--) {
                if (!document.body.classList.contains('hevx-locked')) break;
                
                textElement.textContent = message.substring(0, i);
                await this.sleep(50);
            }
            
            console.log('🗑️ SİLME BİTTİ');
            
            // ═══════════════════════════════════════
            // KUTUYU TAMAMEN KALDIR - Son harf silinince kutu kaybolsun
            // ═══════════════════════════════════════
            if (this.currentElement) {
                console.log('📦 Kutu DOM\'dan kaldırılıyor...');
                this.currentElement.remove();
                this.currentElement = null;
                console.log('📦 Kutu tamamen kaldırıldı');
                console.log('📦 Element DOM\'da:', document.getElementById('matrixScrollingText') ? 'HALA VAR!' : 'KALDIRILDI');
            } else {
                console.log('❌ CurrentElement bulunamadı!');
            }
            
            // ═══════════════════════════════════════
            // BEKLEME SÜRESİ (RASTGELE 3-8 saniye)
            // ═══════════════════════════════════════
            const randomWait = Math.random() * 5000 + 3000;
            console.log(`⏰ BEKLEME: ${Math.round(randomWait/1000)}sn`);
            await this.sleep(randomWait);
            
            // ═══════════════════════════════════════
            // YENİ KUTU OLUŞTUR - Yeni mesaj için
            // ═══════════════════════════════════════
            if (!this.currentElement && document.body.classList.contains('hevx-locked')) {
                console.log('📦 Yeni kutu oluşturuluyor (bekleme sonrası)...');
                
                const container = document.createElement('div');
                container.id = 'matrixScrollingText';
                container.className = 'matrix-scrolling-text';
                container.style.cssText = `
                    position: fixed;
                    top: 120px;
                    right: 20px;
                    z-index: 9999;
                    pointer-events: none;
                    max-width: 300px;
                    display: block;
                    visibility: visible;
                    opacity: 1;
                `;
                document.body.appendChild(container);
                
                const textElement = document.createElement('div');
                textElement.className = 'matrix-text';
                textElement.style.cssText = `
                    display: block;
                    background: transparent;
                    background-color: transparent;
                    border: none;
                    border-radius: 0;
                    padding: 0;
                    margin: 0;
                    color: rgba(0, 255, 65, 0.9);
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 1.3;
                    white-space: normal;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    max-width: 280px;
                    width: auto;
                    text-shadow: 0 0 3px rgba(0, 255, 65, 0.4);
                    visibility: visible;
                    opacity: 1;
                    box-shadow: none;
                `;
                container.appendChild(textElement);
                
                this.currentElement = container;
                console.log('📦 Yeni kutu oluşturuldu ve gösterildi');
            }
            
            console.log('🔄 YENİ MESAJ GELİYOR...');
            console.log('🔍 Loop sonunda lock durumu:', document.body.classList.contains('hevx-locked'));
        }
        
        // ═══════════════════════════════════════════════
        // DÖNGÜ BİTTİ - TEMİZLİK
        // ═══════════════════════════════════════════════
        console.log('🛑 LOCKED LOOP BİTTİ - TEMİZLİK');
        if (this.currentElement) {
            this.currentElement.remove();
            this.currentElement = null;
        }
        this.isVisible = false;
        this.lockedLoopRunning = false;
    }



    async showNormalMessage() {
        if (this.isVisible) return;
        
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        console.log('📝 NORMAL MESAJ GÖSTERİLİYOR:', message);
        
        this.isVisible = true;
        this.createMessageElement();
        
        // Daktilo ile yaz
        await this.typeMessage(message, 80);
        
        // 6 saniye göster
        await this.sleep(6000);
        
        // Elementi kaldır
        if (this.currentElement) {
            this.currentElement.remove();
            this.currentElement = null;
        }
        this.isVisible = false;
        console.log('📝 NORMAL MESAJ KALDIRILDI');
        
        // 15-25 saniye sonra tekrar göster
        const nextInterval = Math.random() * 10000 + 15000;
        console.log(`⏳ SONRAKI NORMAL MESAJ: ${Math.round(nextInterval/1000)}sn sonra`);
        setTimeout(() => {
            if (!document.body.classList.contains('hevx-locked')) {
                this.showNormalMessage();
            }
        }, nextInterval);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }





    createMessageElement() {
        // Mevcut elementi kontrol et
        this.currentElement = document.getElementById('matrixScrollingText');
        
        if (!this.currentElement) {
            // Element yoksa oluştur
            this.currentElement = document.createElement('div');
            this.currentElement.id = 'matrixScrollingText';
            this.currentElement.className = 'matrix-scrolling-text';
            this.currentElement.style.cssText = `
                position: fixed;
                top: 120px;
                right: 20px;
                z-index: 9999;
                pointer-events: none;
                max-width: 300px;
                display: block;
                visibility: visible;
                opacity: 1;
                background: transparent;
                background-color: transparent;
                border: none;
                box-shadow: none;
            `;
            document.body.appendChild(this.currentElement);
            
            // Text element oluştur
            const textElement = document.createElement('div');
            textElement.className = 'matrix-text';
            textElement.style.cssText = `
                display: block;
                background: transparent;
                background-color: transparent;
                border: none;
                border-radius: 0;
                padding: 0;
                margin: 0;
                color: rgba(0, 255, 65, 0.9);
                font-family: 'Courier New', monospace;
                font-size: 14px;
                font-weight: normal;
                line-height: 1.3;
                white-space: normal;
                word-wrap: break-word;
                overflow-wrap: break-word;
                max-width: 280px;
                width: auto;
                text-shadow: 0 0 3px rgba(0, 255, 65, 0.4);
                visibility: visible;
                opacity: 1;
                box-shadow: none;
            `;
            this.currentElement.appendChild(textElement);
        } else {
            // Element varsa, container'a da şeffaf stil uygula
            this.currentElement.style.background = 'transparent';
            this.currentElement.style.backgroundColor = 'transparent';
            this.currentElement.style.border = 'none';
            this.currentElement.style.boxShadow = 'none';
            
            // Text element'i kontrol et
            let textElement = this.currentElement.querySelector('.matrix-text');
            if (!textElement) {
                textElement = document.createElement('div');
                textElement.className = 'matrix-text';
                textElement.style.cssText = `
                    display: block !important;
                    background: transparent !important;
                    background-color: transparent !important;
                    border: none !important;
                    border-radius: 0 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    color: rgba(0, 255, 65, 0.9) !important;
                    font-family: 'Courier New', monospace !important;
                    font-size: 14px !important;
                    font-weight: normal !important;
                    line-height: 1.3 !important;
                    white-space: normal !important;
                    word-wrap: break-word !important;
                    overflow-wrap: break-word !important;
                    max-width: 280px !important;
                    width: auto !important;
                    text-shadow: 0 0 3px rgba(0, 255, 65, 0.4) !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    box-shadow: none !important;
                `;
                this.currentElement.appendChild(textElement);
            } else {
                // Mevcut element'e de basit şeffaf stil uygula
                textElement.style.background = 'transparent';
                textElement.style.backgroundColor = 'transparent';
                textElement.style.border = 'none';
                textElement.style.boxShadow = 'none';
            }
        }
    }

    async typeMessage(message, speed = 80) {
        const textElement = this.currentElement.querySelector('.matrix-text');
        let currentText = '';
        
        for (let i = 0; i < message.length; i++) {
            currentText += message[i];
            textElement.innerHTML = currentText + '<span class="matrix-cursor">█</span>';
            
            // Wait between characters
            await this.sleep(speed);
        }
        
        // Remove cursor after typing complete
        await this.sleep(500);
        textElement.innerHTML = currentText;
    }

    async hideMessage() {
        if (this.currentElement) {
            this.currentElement.remove();
            this.currentElement = null;
        }
        this.isVisible = false;
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
        
        // Access granted mesajı için de şeffaf arka plan garantisi
        textElement.style.background = 'transparent';
        textElement.style.backgroundColor = 'transparent';
        textElement.style.border = 'none';
        textElement.style.boxShadow = 'none';
        
        // Typing effect
        await this.typeMessage(message);
        
        // Access granted için özel okuma süresi (3 saniye okuma + 6 saniye görünme = 9 saniye)
        await this.sleep(9000);
        
        textElement.classList.remove('access-granted-message');
        await this.hideMessage();
        
        // Access granted sonrası normal döngüyü başlat
        setTimeout(() => {
            this.checkAndShowMessage();
        }, 2000);
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