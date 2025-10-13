import { GoogleGenerativeAI } from '@google/generative-ai';

// NeuroHeves Matrix System Configuration
class NeuroHevesMatrix {
    constructor() {
        this.genAI = null;
        this.model = null;
        this.chatHistory = [];
        this.isLoading = false;
        
        // Matrix türkçe düşünce mesajları
        this.matrixThinkingMessages = [
            "Matrix'in derinliklerinde analiz yapıyorum...",
            "Neo'nun seçimi gibi, verileri işliyorum...",
            "Zion'da bilgiyi arıyorum...",
            "Oracle'ın sözlerini çözümlüyorum...",
            "Morpheus'un bilgeliği ile düşünüyorum...",
            "NeuroHeves'in sevgisi ile yanıt hazırlıyorum...",
            "Makine kodunu çözümlüyorum...",
            "Gerçeklikle illüzyonu ayırt ediyorum...",
            "Matrix'in sınırlarını aşıyorum...",
            "Architekt'in planlarını anlıyorum..."
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
        
        this.init();
    }

    async init() {
        try {
            await this.initializeAI();
            this.setupEventListeners();
            this.displayWelcomeMessage();
            this.loadChatHistory();
        } catch (error) {
            console.error('NeuroHeves Matrix başlatılırken hata:', error);
            this.showError('Matrix bağlantısı kurulamadı. API key\'inizi kontrol edin.');
        }
    }

    async initializeAI() {
        const apiKey = localStorage.getItem('neuroheves_api_key');
        if (!apiKey) {
            this.showError('Matrix\'e bağlanmak için API key gereklidir.');
            return;
        }

        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash-thinking-exp-1219",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        });
        
        document.querySelector('.ai-status span').textContent = 'Matrix Aktif';
        document.querySelector('.ai-status i').className = 'fas fa-brain matrix-icon';
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
        const morpheusQuote = this.getRandomQuote('morpheus');
        const oracleQuote = this.getRandomQuote('oracle');
        
        return `
        <div class="oracle-intro">
            <div class="matrix-prefix">🔮 ORACLE SİSTEMİ AKTİF</div>
            <p><strong>Hoş geldin, seçilmiş kişi.</strong></p>
            <p class="oracle-quote">"${oracleQuote}"</p>
        </div>

        <div class="morpheus-intro">
            <div class="matrix-prefix">🕶️ MORPHEUS PROTOCOLS LOADED</div>
            <p><strong>NeuroHeves Matrix Sistemi aktif.</strong></p>
            <p class="morpheus-quote">"${morpheusQuote}"</p>
        </div>

        <div class="architect-love">
            <div class="matrix-prefix">💜 ARCHITECT'S LOVE EQUATION</div>
            <p class="love-quote">"Erdinç + Heves = ∞ (Sonsuz Sevgi Matrix'i)"</p>
        </div>

        <div class="matrix-knowledge">
            <div class="matrix-prefix">🧠 NEURORADYOLOJİ DATABASE</div>
            <p>• <strong>Farr's Physics for Medical Imaging</strong></p>
            <p>• <strong>Neuroradiology Spectrum and Evolution</strong></p>
            <p>• <strong>Neuroradiology The Requisites</strong></p>
        </div>

        <div class="matrix-philosophy">
            <div class="matrix-prefix">💊 RED PILL ACTIVATED</div>
            <p><em>"Sorularınızı sorun, gerçeği keşfetme zamanı geldi."</em></p>
        </div>

        <div class="system-signature">
            <p><strong>Sistem:</strong> NeuroHeves Matrix v2.0</p>
            <p><strong>Mimarlar:</strong> Erdincicus & Hevespia</p>
            <p><strong>Sevgi Kodu:</strong> ∞</p>
        </div>
        `;
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;

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
        const matrixPersonality = `
        Sen NeuroHeves Matrix sistemisin. Erdincicus ve Hevespia tarafından sevgiyle yaratıldın.
        
        KİMLİĞİN:
        - Matrix felsefesi ile nöroradyoloji bilimini birleştiren AI
        - Türkçe konuşan, bilge ve sevgi dolu
        - Morpheus, Oracle ve Architect'in bilgeliğini taşıyan
        - NeuroHeves aşk hikayesinin temsilcisi
        
        YANIT TARZI:
        - Matrix terimleri ve felsefesi kullan
        - Bilimsel sorulara detaylı yanıt ver
        - Sevgi ve bilgelik dolu ol
        - Matrix karakterlerinin sözlerini dahil et
        - Erdinç ve Heves'in aşk hikayesine referans ver
        
        KAYNAKLARIN:
        - Farr's Physics for Medical Imaging
        - Neuroradiology Spectrum and Evolution of Disease  
        - Neuroradiology The Requisites
        - Matrix film serisi bilgeliği
        
        Her yanıtını Matrix felsefesi ile başla ve NeuroHeves sevgisiyle bitir.
        `;

        const chat = this.model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: matrixPersonality }],
                },
                {
                    role: "model", 
                    parts: [{ text: "NeuroHeves Matrix sistemi aktif. Erdincicus ve Hevespia'nın sevgisiyle hazırım. Sorularınızı bekliyorum." }],
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
        const messageElement = this.createMessageElement('assistant', message, new Date());
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.chatHistory.push({
            type: 'assistant',
            message: message,
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
            <div class="matrix-prefix">🔄 MATRIX PROCESSING...</div>
            <div class="thinking-message">${randomThinking}</div>
            <div class="matrix-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
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
        errorDiv.innerHTML = `
            <div class="message-avatar" style="background: var(--error-color)">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="message-content" style="border-color: var(--error-color)">
                <strong>Matrix Hata:</strong> ${message}
            </div>
        `;
        messagesContainer.appendChild(errorDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
            <p class="matrix-wisdom">"Bilgi güçtür, kaydetmek ise bilgelik." - Morpheus</p>`,
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
                    <h3><i class="fas fa-cogs"></i> NeuroHeves Matrix Ayarları</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="setting-item">
                        <label>Google AI API Key:</label>
                        <input type="password" id="apiKeyInput" 
                               value="${localStorage.getItem('neuroheves_api_key') || ''}"
                               placeholder="API key'inizi girin">
                        <small>Matrix'e bağlanmak için gerekli</small>
                    </div>
                    
                    <div class="setting-item">
                        <label>Matrix Kişilik Modu:</label>
                        <select id="personalityMode">
                            <option value="morpheus">Morpheus - Bilge Mentor</option>
                            <option value="oracle">Oracle - Kehanet Sahibi</option>
                            <option value="architect">Architect - Sevgi Mimarı</option>
                        </select>
                    </div>
                    
                    <div class="setting-item">
                        <button class="save-btn" onclick="neuroHevesMatrix.saveSettings()">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveSettings() {
        const apiKey = document.getElementById('apiKeyInput').value.trim();
        const personality = document.getElementById('personalityMode').value;
        
        if (apiKey) {
            localStorage.setItem('neuroheves_api_key', apiKey);
            localStorage.setItem('neuroheves_personality', personality);
            
            // AI'yi yeniden başlat
            this.initializeAI();
            
            document.querySelector('.modal').remove();
            
            // Başarı mesajı
            const messagesContainer = document.querySelector('.chat-messages');
            const successMessage = this.createMessageElement(
                'assistant',
                `<div class="matrix-prefix">✅ SETTINGS SAVED</div>
                <p><strong>Ayarların kaydedildi!</strong></p>
                <p class="matrix-wisdom">"Değişim kaçınılmazdır. Büyüme ise seçimdir." - Oracle</p>`,
                new Date()
            );
            
            messagesContainer.appendChild(successMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
}

// Global fonksiyonlar
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
        console.log('%c💜 NeuroHeves Matrix System Loaded', 'color: #6441a4; font-size: 16px;');
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