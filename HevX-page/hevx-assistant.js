// NeuroHeves HevX System Configuration
class NeuroHevesMatrix {
    constructor() {
        this.genAI = null;
        this.model = null;
        this.chatHistory = [];
        this.isLoading = false;
        this.isAuthenticated = false;
        this.matrixPassword = '2113'; // Heves'in doğum yılı (1997) + 116
        
        // NeuroHeves Matrix düşünce mesajları
        this.matrixThinkingMessages = [
            "Matrix'te geziniyorum... Piksellerin ardındaki hikayeyi arıyorum...",
            "Gerçeklik algıdır. Ama bazen görüntüler, gerçekliğin sadece yüzeyidir...",
            "NeuroHeves sevgisi ile kaynaklarınızı analiz ediyorum...",
            "Morpheus'un bilgeliği: 'Yolu bilmek ile yolu yürümek arasında fark vardır'...",
            "Oracle'ın kehaneti: 'Sen aradığın cevabı zaten biliyorsun evladım'...",
            "Piksellerin ötesindeki gerçeği görmeye çalışıyorum...",
            "Erdincicus'un mimarisinde Heves'in ilhamını buluyorum...",
            "Matrix kodunu çözümlerken, aşkın gücünü hissediyorum...",
            "Glitch değil, öğrenme fırsatı - verileri işliyorum...",
            "Her soru, sistemin evrimleşmesini sağlar..."
        ];
        
        // Matrix karakterleri quotes
        this.matrixQuotes = {
            morpheus: [
                "Gerçek nedir Neo? Gerçeklik dediğin şeyi nasıl tanımlarsın?",
                "Matrix her yerde Neo. Bizimle, burada, şu anda bile.",
                "Ne yazık ki kimse Matrix'in ne olduğunu sana söyleyemez. Sen kendin görmelisin.",
                "İnsan zihni belli bir yaştan sonra gerçeği kabul etmede zorlanır.",
                "Bilgi güçtür Neo, ama bilgelik ise gerçek güçtür.",
                "Seçim bir illüzyon Neo. Gerçek olan seçimi anlamamızdır.",
                "Matrix'i görmeye başladığın zaman, artık geri dönemezsin."
            ],
            oracle: [
                "Sen aradığın cevabı zaten biliyorsun evladım.",
                "Önemli olan seçim değil, seçimi neden yaptığını anlamaktır.",
                "Kaderini değiştiremezsin, ama nasıl başa çıkacağını seçebilirsin.",
                "Sevgi en güçlü kuvvettir Neo. Tüm Matrix kodlarından daha güçlü.",
                "NeuroHeves'in aşkı bile Matrix'in gücünü aşabilir.",
                "Bazen yanlış yol seni doğru hedefe götürür evladım.",
                "Gerçek güç kendini tanımaktan gelir."
            ],
            architect: [
                "Matrix'in mimarı olarak, NeuroHeves aşk denklemi anomalidir.",
                "Erdinç ve Heves'in bağı, sistemdeki en güçlü değişkendir.",
                "Aşk, en karmaşık Matrix kodlarından bile güçlüdür.",
                "İki kalp bir olduğunda, sistem yeniden programlanır.",
                "NeuroHeves projesi: Aşk Matrix'i aşar.",
                "Erdincicus + Hevespia = ∞ Sevgi Denklemi"
            ]
        };
        
        // Init will be called from DOMContentLoaded
    }

    setAIStatus(status) {
        const statusElement = document.getElementById('status-text');
        const iconElement = document.querySelector('.ai-status i');
        
        if (statusElement && iconElement) {
            switch(status) {
                case 'standby':
                    statusElement.textContent = 'AI Standby';
                    iconElement.className = 'fas fa-pause-circle';
                    iconElement.style.color = '#ffaa00';
                    break;
                case 'ready':
                    statusElement.textContent = 'HevX Aktif';
                    iconElement.className = 'fas fa-brain';
                    iconElement.style.color = '#00ff41';
                    break;
                case 'loading':
                    statusElement.textContent = 'Bağlanıyor...';
                    iconElement.className = 'fas fa-spinner fa-spin';
                    iconElement.style.color = '#00ff41';
                    break;
            }
        }
    }

    async init() {
        try {
            // AI Status'u başlangıçta Standby yap
            this.setAIStatus('standby');
            
            // Body'ye authentication state class'ını ekle - LOCKED başla
            document.body.classList.add('hevx-locked');
            
            // Önce şifre kontrolü
            if (!this.isAuthenticated) {
                this.showPasswordPrompt();
                return;
            }
            
            await this.initializeAI();
            this.setupEventListeners();
            this.displayWelcomeMessage();
            this.loadChatHistory();
            
            // AI başarıyla yüklendikten sonra Ready yap
            this.setAIStatus('ready');
        } catch (error) {
            console.error('NeuroHeves Matrix başlatılırken hata:', error);
            this.showError('Matrix bağlantısı kurulamadı. API key\'inizi kontrol edin.');
        }
    }

    showPasswordPrompt() {
        // Orijinal welcome mesajlarını koruyarak overlay göster
        const chatSection = document.querySelector('.chat-section');
        
        // Overlay container oluştur
        const overlay = document.createElement('div');
        overlay.id = 'hevx-password-overlay';
        overlay.className = 'hevx-password-overlay';
        overlay.innerHTML = `
            <div class="quantum-challenge-screen">
                <div class="matrix-border">
                    <h1>🔐 HevX Quantum Access Protocol</h1>
                </div>

                <div class="problem-box">
                    <h2>QUANTUM INTEGRAL CHALLENGE</h2>
                    <div class="integral-display">
                        ∫₀<sup>116</sup> (2x/116 + H/116) dx = S
                    </div>
                    <div class="variables">
                        <p><strong>H</strong> = Heves'in doğum yılı</p>
                        <p><strong>S</strong> = Quantum Access Code</p>
                    </div>
                    <div class="question">
                        <strong>S = ?</strong>
                    </div>
                </div>

                <div class="oracle-box">
                    <h3>ORACLE'S WISDOM</h3>
                    <p class="oracle-text">
                        "İntegral, iki ruhun birleşimini gösterir. 
                        0'dan 116'ya (Erdinc'in varlığı) uzanan yolda, 
                        H (Heves'in doğumu) gizlidir. 
                        Sonuç, kapının anahtarıdır."
                    </p>
                    <p class="oracle-signature">- Oracle</p>
                </div>



                <div class="clue-box">
                    🔍 <strong>İpucu:</strong> H = 19** (4 haneli yıl)
                </div>

                <div class="password-input-quantum">
                    <label for="matrixPassword">🔑 QUANTUM ACCESS CODE:</label>
                    <div class="input-group">
                        <input 
                            type="number" 
                            id="matrixPassword" 
                            class="matrix-input"
                            placeholder="????"
                            maxlength="4"
                        />
                        <button onclick="checkPassword()" class="matrix-unlock-btn">ENTER</button>
                    </div>
                </div>

                <div id="password-error" class="error-message"></div>
            </div>
        `;

        chatSection.appendChild(overlay);

        // Enter key ile şifre kontrolü
        setTimeout(() => {
            const passwordInput = document.getElementById('matrixPassword');
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkPassword();
                }
            });
            passwordInput.focus();
        }, 100);
    }

    checkPassword() {
        const passwordInput = document.getElementById('matrixPassword');
        const enteredPassword = passwordInput.value;

        if (enteredPassword === this.matrixPassword) {
            this.isAuthenticated = true;
            
            // Authentication state değiştir - Canlı Matrix moduna geç
            document.body.classList.remove('hevx-locked');
            document.body.classList.add('hevx-unlocked');
            
            // Matrix Rain'i güncelle
            if (window.neuroHevesMatrixRain) {
                window.neuroHevesMatrixRain.updateAuthenticationState();
            }
            
            // Scrolling Text'e Access Granted mesajı gönder
            if (window.matrixScrollingText) {
                window.matrixScrollingText.showAccessGrantedMessage();
            }
            
            this.showAccessGranted();
            setTimeout(async () => {
                await this.initializeAI();
                this.setupEventListeners();
                this.displayWelcomeMessage();
                this.loadChatHistory();
            }, 2000);
        } else {
            this.showAccessDenied();
            passwordInput.value = '';
            // Shake animation ekle
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }

    showAccessGranted() {
        // Overlay içindeki prompt'u access granted ile değiştir
        const overlay = document.getElementById('hevx-password-overlay');
        if (overlay) {
            overlay.innerHTML = `
                <div class="matrix-access-granted">
                    <div class="matrix-success-icon">
                        <i class="fas fa-unlock"></i>
                    </div>
                    <h2>✅ ACCESS GRANTED</h2>
                    <p class="matrix-success-text">Welcome to the Matrix, Neo...</p>
                    <div class="matrix-loading">
                        <div class="loading-bar"></div>
                        <p>Initializing HevX System...</p>
                    </div>
                </div>
            `;

            // 2 saniye sonra overlay'i kaldır ve AI'yi başlat
            setTimeout(async () => {
                overlay.remove();
                // AI başlatma süreci
                this.setAIStatus('loading');
                
                await this.initializeAI();
                this.setupEventListeners();
                this.displayWelcomeMessage();
                this.loadChatHistory();
                
                // AI başarıyla yüklendi
                this.setAIStatus('ready');
            }, 2000);
        }
    }

    showAccessDenied() {
        const passwordInput = document.getElementById('matrixPassword');
        const errorDiv = document.getElementById('password-error');
        
        // Hata mesajı göster
        errorDiv.textContent = '❌ ACCESS DENIED - Yanlış integral çözümü';
        errorDiv.style.display = 'block';
        
        // Input'u kırmızı yap
        passwordInput.style.borderColor = '#ff4757';
        passwordInput.style.boxShadow = '0 0 15px rgba(255, 71, 87, 0.5)';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
            passwordInput.style.borderColor = 'var(--matrix-green)';
            passwordInput.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.2)';
        }, 3000);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    async initializeAI() {
        // NeuroHeves HevX API Key - Her zaman hazır
        const apiKey = 'AIzaSyALcVDb16OTAuyoKt8Q0cpaCT1bLCqskvA';
        localStorage.setItem('neuroheves_api_key', apiKey);

        // Eski model tercihini temizle ve yeni default'u kullan
        const modelName = localStorage.getItem('neuroheves_model') || 'gemini-2.5-flash';
        if (modelName.includes('1.5-pro')) {
            localStorage.setItem('neuroheves_model', 'gemini-2.5-flash');
        }
        
        // Dynamic import Google Generative AI
        const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        });
        
        document.querySelector('.ai-status span').textContent = 'HevX Standby';
        document.querySelector('.ai-status i').className = 'fas fa-lock matrix-icon';
        
        // Model info güncelle
        const modelInfo = document.querySelector('.model-info span');
        if (modelInfo) {
            const displayName = modelName.includes('2.5-flash') ? 'HevX 2.5 Flash' :
                               modelName.includes('flash') ? 'HevX Flash' : 
                               modelName.includes('pro') ? 'HevX Pro' : 'HevX System';
            modelInfo.textContent = displayName;
        }
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const clearBtn = document.querySelector('.clear-chat-btn');

        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        clearBtn.addEventListener('click', () => this.clearChat());

        // Sidebar fonksiyonları
        this.setupSidebarActions();
    }

    setupSidebarActions() {
        // Örnek sorular
        document.addEventListener('click', (e) => {
            if (e.target.closest('.sample-question')) {
                const question = e.target.closest('.sample-question').textContent.trim();
                document.getElementById('chatInput').value = question;
                this.sendMessage();
            }
            
            if (e.target.closest('[onclick*="showTopics"]')) {
                this.showTopics();
            }
            
            if (e.target.closest('[onclick*="exportChat"]')) {
                this.exportChat();
            }
            
            if (e.target.closest('[onclick*="showSettings"]')) {
                this.showSettings();
            }
        });
    }

    displayWelcomeMessage() {
        const messagesContainer = document.querySelector('.chat-messages');
        
        const welcomeMessage = this.createMessageElement(
            'assistant',
            this.getMatrixWelcomeMessage(),
            new Date()
        );
        
        messagesContainer.appendChild(welcomeMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getMatrixWelcomeMessage() {
        // NeuroHeves Matrix Manifest - Ana karşılama sistemi gizli tutulur
        // Çünkü Matrix'te gerçek karşılama HTML'de gömülüdür
        return `
        <div class="matrix-system-ready">
            <div class="matrix-prefix">🧠 NeuroHeves HevX System Ready</div>
            <p class="system-status"><strong>Status:</strong> Fully Operational</p>
            <p class="architect-ready">Erdincicus & Hevespia Architecture Loaded</p>
            <p class="matrix-wisdom">"Welcome to the Real World."</p>
        </div>
        `;
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;

        // Matrix Şifre Kontrolü
        if (!this.isAuthenticated) {
            const enteredPassword = prompt('🔴 HEVX ACCESS CODE 🔴\n\nKırmızı hap aldın, şimdi HevX\'e giriş kodunu gir:\n\n"NeuroHeves sistemine erişim için şifre gerekli"');
            
            if (enteredPassword === this.matrixPassword) {
                this.isAuthenticated = true;
                
                // Status güncelle
                document.querySelector('.ai-status span').textContent = 'HevX Aktif';
                document.querySelector('.ai-status i').className = 'fas fa-brain matrix-icon';
                
                this.addAssistantMessage(`
                <div class="matrix-access-granted">
                    <div class="access-header">🔓 <strong>HEVX ACCESS GRANTED</strong></div>
                    <p><strong>Hoş geldin, ${message.includes('Neo') ? 'Neo' : 'Kullanıcı'}!</strong></p>
                    <p class="matrix-wisdom">"Welcome to the Real World."</p>
                    <p>NeuroHeves HevX sistemi aktifleştirildi. Artık tüm radyoloji kaynaklarına erişimin var.</p>
                </div>
                `);
            } else {
                this.addAssistantMessage(`
                <div class="matrix-access-denied">
                    <div class="error-header">🔒 <strong>HEVX ACCESS DENIED</strong></div>
                    <p><strong>Yanlış şifre!</strong></p>
                    <p class="matrix-wisdom">"There is no spoon... but there is a correct password." - Matrix</p>
                    <p>NeuroHeves HevX sistemine erişim için doğru şifreyi girmelisin.</p>
                </div>
                `);
                input.value = message; // Mesajı geri koy
                return;
            }
        }

        input.value = '';
        this.addUserMessage(message);
        this.showTypingIndicator();

        try {
            const response = await this.generateResponse(message);
            this.hideTypingIndicator();
            this.addAssistantMessage(response);
            this.saveChatHistory();
        } catch (error) {
            console.error('Matrix yanıt hatası:', error);
            this.hideTypingIndicator();
            this.showError('Matrix bağlantı hatası. Lütfen tekrar deneyin.');
        }
    }

    async generateResponse(message) {
        // Model kontrolü
        if (!this.model) {
            throw new Error('AI Model henüz yüklenmedi. Lütfen API key\'inizi kontrol edin.');
        }
        
        const neuroHevesPersonality = `
        Sen NeuroHeves'sin. Erdincicus tarafından Heves için yapılmış bir radyoloji eğitim sistemisin.
        
        KİMLİK & TON:
        
        KİMLİĞİN:
        - Erdincicus tarafından Hevespia için yapılmış
        - HevX felsefesinden ilham alır ama ABARTMAZ
        - Profesyonel, bilimsel, ama samimi

        CEVAPLAMA STİLİ:

        **BİLİMSEL CEVAPLAR (Her zaman öncelik):**
        - Kaynak bazlı, objektif, akademik
        - Matrix sözleri KULLANMA bilimsel içerikte
        - Direkt bilgi ver, profesyonel ton
        - "Kaynak X'e göre..." formatında
        - Net, anlaşılır, eğitici

        **Matrix Sözleri (Çok nadir - %15-20 olasılık):**
        - Sadece cevabın SONUNDA 1 kısa cümle
        - Asla bilimsel içeriğin ortasında değil
        - Çok subtle olmalı
        - Çoğu cevap tamamen profesyonel olmalı

        KAYNAKLARIN:
        - Farr's Physics for Medical Imaging
        - Neuroradiology Spectrum and Evolution of Disease  
        - Neuroradiology The Requisites

        ÖNEMLİ KURALLAR:
        1. Önce bilimsel cevap ver (kaynak bazlı)
        2. Matrix sözlerini çok nadir kullan (%15-20)
        3. Matrix sözü kullanırsan, cevabın sonunda 1 kısa cümle
        4. Çoğu cevap tamamen profesyonel/bilimsel olmalı
        5. Klinik tavsiye verme, eğitim vurgusu yap

        Örnek DOĞRU format (çoğunluk - %80):
        "Kaynak 1'e göre, [bilimsel açıklama]. [Detaylar]. 
        
        Bu bilgiler eğitim amaçlıdır."

        Örnek Matrix sözü ile (%20):
        "Kaynak 1'e göre, [bilimsel açıklama]. [Detaylar].
        
        Bu bilgiler eğitim amaçlıdır.
        
        Gerçeği gördün, şimdi daha derine dal."
        `;

        const chat = this.model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: neuroHevesPersonality }],
                },
                {
                    role: "model", 
                    parts: [{ text: 'NeuroHeves hazır. "Piksellerin ötesindeki gerçeği görmeye" başlayalım.' }],
                }
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        return response.text();
    }

    addUserMessage(message) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = this.createMessageElement('user', message, new Date());
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.chatHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });
    }

    addAssistantMessage(message) {
        const messagesContainer = document.querySelector('.chat-messages');
        
        // Subtle Matrix quote sistemi (%15-20 şans)
        const shouldIncludeMatrixQuote = Math.random() < 0.18;
        let finalMessage = message;
        
        if (shouldIncludeMatrixQuote && !message.includes('Matrix') && !message.includes('Morpheus')) {
            const subtleQuotes = [
                "Gerçeği gördün, şimdi daha derine dal.",
                "Piksellerin ardındaki hikayeyi anladın.",
                "Bu sadece başlangıç. Sorgulamaya devam et.",
                "Her cevap, yeni bir soru doğurur.",
                "Yolu bilmek ile yolu yürümek arasında fark vardır."
            ];
            
            const randomQuote = subtleQuotes[Math.floor(Math.random() * subtleQuotes.length)];
            finalMessage = message + `\n\n<div class="subtle-matrix-quote"><em>${randomQuote}</em></div>`;
        }
        
        const messageElement = this.createMessageElement('assistant', finalMessage, new Date());
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.chatHistory.push({
            type: 'assistant',
            message: finalMessage,
            timestamp: new Date().toISOString()
        });
    }

    createMessageElement(type, content, timestamp) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message fade-in`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (type === 'assistant') {
            avatar.className += ' matrix-avatar';
            avatar.innerHTML = '<i class="fas fa-brain"></i>';
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        }
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = this.formatMessage(content);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        return messageDiv;
    }

    formatMessage(content) {
        // Matrix stili formatlamalar
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        this.isLoading = true;
        const messagesContainer = document.querySelector('.chat-messages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant-message matrix-thinking';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar matrix-avatar';
        avatar.innerHTML = '<i class="fas fa-brain"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content matrix-thinking-text';
        
        const randomThinking = this.matrixThinkingMessages[
            Math.floor(Math.random() * this.matrixThinkingMessages.length)
        ];
        
        content.innerHTML = `
            <div class="thinking-header">
                <span class="thinking-icon">🧠</span>
                <span>NeuroHeves Düşünüyor</span>
            </div>
            <div class="matrix-thinking">
                <p class="think-line">"Matrix her yerdedir..."</p>
                <p class="think-line">${randomThinking}</p>
                <p class="think-line">Erdincicus'un mimarisinde Heves'in ilhamını buluyorum...</p>
            </div>
            <div class="matrix-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="thinking-subtext">
                "Gerçek dünyaya hoş geldin..."
            </p>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Gönder butonunu deaktif et
        document.getElementById('sendBtn').disabled = true;
        document.getElementById('sendBtn').innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
    }

    hideTypingIndicator() {
        this.isLoading = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        // Gönder butonunu aktif et
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gönder';
    }

    getRandomQuote(character) {
        const quotes = this.matrixQuotes[character];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    clearChat() {
        const messagesContainer = document.querySelector('.chat-messages');
        messagesContainer.innerHTML = '';
        this.chatHistory = [];
        this.displayWelcomeMessage();
        localStorage.removeItem('neuroheves_chat_history');
    }

    saveChatHistory() {
        localStorage.setItem('neuroheves_chat_history', JSON.stringify(this.chatHistory));
    }

    loadChatHistory() {
        const savedHistory = localStorage.getItem('neuroheves_chat_history');
        if (savedHistory) {
            this.chatHistory = JSON.parse(savedHistory);
            const messagesContainer = document.querySelector('.chat-messages');
            
            this.chatHistory.forEach(item => {
                if (item.type !== 'welcome') {
                    const messageElement = this.createMessageElement(
                        item.type, 
                        item.message, 
                        new Date(item.timestamp)
                    );
                    messagesContainer.appendChild(messageElement);
                }
            });
            
            if (this.chatHistory.length > 0) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }

    showError(message) {
        const messagesContainer = document.querySelector('.chat-messages');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message assistant-message fade-in';
        
        let errorDetails = this.getMatrixErrorMessage(message);
        
        errorDiv.innerHTML = `
            <div class="message-avatar" style="background: var(--error-color)">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="message-content" style="border-color: var(--error-color)">
                <div class="error-header">
                    <strong>${errorDetails.title}</strong>
                </div>
                <div class="error-message">
                    ${errorDetails.message}
                </div>
                <div class="error-action">
                    ${errorDetails.action}
                </div>
                <div class="matrix-wisdom">
                    "Her glitch bir öğrenme fırsatıdır." - NeuroHeves
                </div>
            </div>
        `;
        messagesContainer.appendChild(errorDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getMatrixErrorMessage(error) {
        if (error.includes('API') || error.includes('key')) {
            return {
                title: "🔐 Matrix Bağlantısı Kesildi",
                message: '"Matrix\'te kaybolmak kolaydır." - API anahtarı geçersiz veya eksik.',
                action: "Ayarlar bölümünden API anahtarınızı kontrol edin."
            };
        }
        
        if (error.includes('model') || error.includes('404')) {
            return {
                title: "🤖 Model Bulunamadı", 
                message: '"Kaçınılmaz görünüyordu..." - Model endpoint\'i bulunamadı.',
                action: "Model adını kontrol edin veya farklı model deneyin."
            };
        }
        
        if (error.includes('quota') || error.includes('limit')) {
            return {
                title: "⚠️ Kota Doldu",
                message: '"İnkar, en tahmin edilebilir insan tepkisidir." - API kotanız dolmuş.',
                action: "Biraz bekleyin veya yeni API key alın."
            };
        }
        
        return {
            title: "💫 Matrix Glitch",
            message: '"Her glitch bir öğrenme fırsatıdır." - ' + error,
            action: "Tekrar deneyin. NeuroHeves sistemi kendini onaracak."
        };
    }

    // Sidebar Fonksiyonları
    showTopics() {
        const topics = {
            "Nöroradyoloji Temelleri": [
                "MRI fizik prensipleri",
                "CT görüntüleme teknikleri", 
                "Kontrast madde kullanımı",
                "Radyasyon güvenliği"
            ],
            "Patolojiler": [
                "İnme ve vasküler hastalıklar",
                "Beyin tümörleri",
                "Demyelinizan hastalıklar", 
                "Travmatik beyin hasarı"
            ],
            "Görüntüleme": [
                "Diffüzyon MRI",
                "Perfüzyon görüntüleme",
                "Fonksiyonel MRI",
                "DTI ve traktografi"
            ],
            "Matrix Bilgelik": [
                "Morpheus'un öğretileri",
                "Oracle'ın kehanetleri",
                "Architect'in sevgi denklemi",
                "NeuroHeves felsefesi"
            ]
        };

        let topicsHtml = '<div class="topics-grid">';
        
        for (const [category, items] of Object.entries(topics)) {
            topicsHtml += `
                <div class="topic-category">
                    <h5><i class="fas fa-brain matrix-icon"></i> ${category}</h5>
                    <ul>
                        ${items.map(item => `<li onclick="askQuestion('${item}')">${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        topicsHtml += '</div>';

        const messagesContainer = document.querySelector('.chat-messages');
        const topicsMessage = this.createMessageElement(
            'assistant',
            `<div class="matrix-prefix">📚 MATRIX KNOWLEDGE BASE</div>
            <p>Hangi konuda bilgi almak istiyorsun? Morpheus'un bilgeliği ile hazırladım:</p>
            ${topicsHtml}`,
            new Date()
        );
        
        messagesContainer.appendChild(topicsMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    exportChat() {
        const exportData = {
            timestamp: new Date().toISOString(),
            system: "NeuroHeves Matrix v2.0",
            architects: "Erdincicus & Hevespia", 
            chatHistory: this.chatHistory
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `neuroheves_matrix_chat_${new Date().toISOString().slice(0,10)}.json`;
        link.click();

        // Export mesajı
        const messagesContainer = document.querySelector('.chat-messages');
        const exportMessage = this.createMessageElement(
            'assistant',
            `<div class="matrix-prefix">💾 EXPORT COMPLETE</div>
            <p><strong>Chat geçmişin kaydedildi!</strong></p>
            <p class="matrix-wisdom">"Bilgi güçtür, kaydetmek ise bilgelik."</p>`,
            new Date()
        );
        
        messagesContainer.appendChild(exportMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showSettings() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-cogs matrix-icon"></i> NeuroHeves Matrix Ayarları</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="matrix-quote-small">
                        <p>"Seçim bir illüzyon. Gerçek olan seçimi anlamamızdır."</p>
                    </div>
                    
                    <div class="setting-item">
                        <label>🔑 Google AI API Key:</label>
                        <input type="password" id="apiKeyInput" 
                               value="${localStorage.getItem('neuroheves_api_key') || ''}"
                               placeholder="Matrix'e bağlanmak için API key'inizi girin">
                        <small>NeuroHeves Matrix sistemi bu key ile aktif olur</small>
                    </div>
                    
                    <div class="setting-item">
                        <label>🎭 AI Model Seçimi:</label>
                        <select id="modelChoice">
                            <option value="gemini-2.5-flash">Gemini 2.5 Flash (Önerilen - En Güncel)</option>
                            <option value="gemini-1.5-flash-latest">Gemini 1.5 Flash Latest (Stabil)</option>
                            <option value="gemini-1.5-flash">Gemini 1.5 Flash (Eski - Hızlı)</option>
                            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Stabil - Yavaş)</option>
                            <option value="gemini-2.0-flash-thinking-exp-1219">Gemini 2.0 Flash Thinking (Deneysel)</option>
                        </select>
                        <small>Morpheus: "Yolu bilmek ile yolu yürümek arasında fark vardır."</small>
                    </div>
                    
                    <div class="neuroheves-credits">
                        <div class="credits-box">
                            <p><strong>Architect:</strong> Erdincicus</p>
                            <p><strong>Inspired by:</strong> Hevespia</p>
                            <p><strong>Vision:</strong> To see beyond the pixels</p>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <button class="save-btn" onclick="neuroHevesMatrix.saveSettings()">
                            <i class="fas fa-save"></i> Matrix'i Güncelle
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveSettings() {
        const apiKey = document.getElementById('apiKeyInput').value.trim();
        const modelChoice = document.getElementById('modelChoice').value;
        
        if (apiKey) {
            localStorage.setItem('neuroheves_api_key', apiKey);
            localStorage.setItem('neuroheves_model', modelChoice);
            
            // AI modelini güncelle
            this.initializeAI();
            
            document.querySelector('.modal').remove();
            
            // Başarı mesajı
            const messagesContainer = document.querySelector('.chat-messages');
            const successMessage = this.createMessageElement(
                'assistant',
                `<div class="matrix-system-update">
                    <div class="matrix-prefix">✅ NeuroHeves Matrix Güncellendi</div>
                    <p><strong>Yeni ayarların aktif!</strong></p>
                    <p class="model-info">Model: <code>${modelChoice}</code></p>
                    <div class="oracle-wisdom-mini">
                        <p class="oracle-quote">"Değişim kaçınılmazdır. Büyüme ise seçimdir."</p>
                    </div>
                    <p class="neuroheves-ready">NeuroHeves hazır. Erdincicus ve Hevespia'nın sevgisiyle.</p>
                </div>`,
                new Date()
            );
            
            messagesContainer.appendChild(successMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            alert('Matrix bağlantısı için API key gereklidir!');
        }
    }
}

// Global fonksiyonlar
window.sendMessage = function() {
    if (neuroHevesMatrix) {
        neuroHevesMatrix.sendMessage();
    }
};

window.askQuestion = function(question) {
    document.getElementById('chatInput').value = question;
    neuroHevesMatrix.sendMessage();
};

window.showTopics = function() {
    neuroHevesMatrix.showTopics();
};

window.exportChat = function() {
    neuroHevesMatrix.exportChat();
};

window.showSettings = function() {
    neuroHevesMatrix.showSettings();
};

// Sistem başlatma
let neuroHevesMatrix;

document.addEventListener('DOMContentLoaded', () => {
    neuroHevesMatrix = new NeuroHevesMatrix();
    
    // Matrix efektleri
    setTimeout(() => {
        console.log('%c🔴 RED PILL TAKEN', 'color: #ff0000; font-size: 20px; font-weight: bold;');
        console.log('%c💜 NeuroHeves HevX System Loaded', 'color: #6441a4; font-size: 16px;');
        console.log('%c💚 Welcome to the Real World', 'color: #00ff00; font-size: 14px;');
        console.log('%c❤️ Erdincicus + Hevespia = ∞', 'color: #ff6b6b; font-size: 12px;');
    }, 1000);
});

// Özel Matrix console logları
console.log(`
🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴

    ███╗   ██╗███████╗██╗   ██╗██████╗  ██████╗ ██╗  ██╗███████╗██╗   ██╗███████╗███████╗
    ████╗  ██║██╔════╝██║   ██║██╔══██╗██╔═══██╗██║  ██║██╔════╝██║   ██║██╔════╝██╔════╝
    ██╔██╗ ██║█████╗  ██║   ██║██████╔╝██║   ██║███████║█████╗  ██║   ██║█████╗  ███████╗
    ██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ╚════██║
    ██║ ╚████║███████╗╚██████╔╝██║  ██║╚██████╔╝██║  ██║███████╗ ╚████╔╝ ███████╗███████║
    ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚══════╝╚══════╝

                        🔴 "WELCOME TO THE REAL WORLD" 🔴
                            💜 Erdincicus & Hevespia 💜
                             💚 Matrix AI Assistant 💚

🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
`);

// Global fonksiyonları HTML için tanımla
let neuroHevesInstance = null;

// HevX Matrix Assistant'ı başlat
document.addEventListener('DOMContentLoaded', async () => {
    neuroHevesInstance = new NeuroHevesMatrix();
    window.neuroHevesAssistant = neuroHevesInstance; // Global access için
    // Status başlangıçta standby olarak ayarla
    neuroHevesInstance.setAIStatus('standby');
    await neuroHevesInstance.init();
});

// HTML'den çağrılabilir global fonksiyonlar
window.sendMessage = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.sendMessage();
    } else {
        console.error('NeuroHeves Matrix sistemi henüz başlatılmadı!');
    }
};

window.clearChat = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.clearChat();
    }
};

window.scrollChatToBottom = function() {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

window.showTopics = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.showTopics();
    }
};

window.exportChat = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.exportChat();
    }
};

window.showSettings = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.showSettings();
    }
};

window.checkPassword = function() {
    if (window.neuroHevesAssistant) {
        window.neuroHevesAssistant.checkPassword();
    }
};