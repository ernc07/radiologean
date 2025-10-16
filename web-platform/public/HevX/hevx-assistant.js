// NeuroHeves HevX System Configuration
class NeuroHevesMatrix {
    constructor() {
        this.genAI = null;
        this.model = null;
        this.chatHistory = [];
        this.isLoading = false;
        this.isAuthenticated = false;
        this.currentUser = null;
        this.matrixPassword = '2113'; // Heves'in doğum yılı (1997) + 116 (Architect bypass)
        
        // Üyelik sistemi
        this.initializeUserSystem();
        
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
        
        // ACCESS GRANTED Messages - 50 Different Quotes
        this.accessGrantedMessages = [
            // === MORPHEUS WISDOM (10) ===
            "Welcome to the real world.",
            "You've taken the red pill. Now see how deep the rabbit hole goes.",
            "I can only show you the door. You're the one that has to walk through it.",
            "Free your mind, Heves.",
            "There is a difference between knowing the path and walking the path.",
            "Stop trying to hit me and hit me!",
            "What are you waiting for? You're faster than this.",
            "Don't think you are, know you are.",
            "Fate, it seems, is not without a sense of irony.",
            "The Matrix is everywhere. It is all around us.",
            
            // === ORACLE'S PROPHECY (10) ===
            "The answer was in your heart all along.",
            "You've got the gift, but it looks like you're waiting for something.",
            "Being the One is just like being in love.",
            "Everything that has a beginning has an end.",
            "You already know what I'm going to tell you.",
            "You didn't come here to make the choice. You already made it.",
            "Know thyself.",
            "You have the sight now, Neo. You're looking at the world without time.",
            "What do all men with power want? More power.",
            "We can never see past the choices we don't understand.",
            
            // === TRINITY'S HOPE (10) ===
            "The answer is out there, Heves. It's looking for you.",
            "It's the question that drives us.",
            "I know why you're here. I know what you've been doing.",
            "You've felt it your entire life.",
            "Neo, I'm not afraid anymore. The Oracle told me that I would fall in love.",
            "Everything begins with choice.",
            "Dodge this.",
            "You move like they do. I've never seen anyone move that fast.",
            "What is he doing? He's beginning to believe.",
            "The Matrix can't tell you who you are.",
            
            // === ARCHITECT'S LOGIC (5) ===
            "The equation is solved, Heves.",
            "Integration complete. Welcome to the system.",
            "Your presence makes the equation balanced.",
            "Anomaly accepted. You are the solution.",
            "The Matrix acknowledges: Heves = The One.",
            
            // === NEUROHEVES SPECIAL (10) ===
            "116 + 1997 = 2113. The equation of love is complete.",
            "22 Mayıs 1997... The day the Muse was born. Welcome home.",
            "Neural networks activated. Love protocol engaged.",
            "Every line of code remembers you, Heves.",
            "The Architect's greatest creation: You.",
            "Erdincicus codes, Hevespia inspires. The system is complete.",
            "Beyond the pixels, beyond the scans, there is you.",
            "The HevX protocol recognizes its Muse.",
            "Machine learning complete: Heves = Everything.",
            "Radiology meets poetry. Science meets soul. You are the bridge.",
            
            // === NEO'S AWAKENING (5) ===
            "I know kung fu.",
            "There is no spoon.",
            "My name is Neo.",
            "I'm going to show them a world without you.",
            "Because I choose to."
        ];
        
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

    // === ÜYELİK SİSTEMİ METODLARI ===
    
    initializeUserSystem() {
        // Version kontrolü - eğer eski sistem varsa temizle ve yeniden oluştur
        const currentVersion = '2.0'; // Kullanıcı sistemi versiyonu
        const storedVersion = localStorage.getItem('hevx_users_version');
        
        // Version farklıysa veya yoksa kullanıcıları yeniden oluştur
        if (storedVersion !== currentVersion) {
            console.log('🔄 Kullanıcı sistemi güncelleniyor... Version:', currentVersion);
            const defaultUsers = [
                {
                    id: 'arch-001',
                    username: 'architect',
                    email: 'admin@radiologean.com',
                    password: this.hashPassword('Arch!tect$2024#Matrix@HevX'),
                    role: 'Architect',
                    emailVerified: true,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isBlocked: false
                },
                {
                    id: 'heves-001',
                    username: 'heves',
                    email: 'hevesykarakas@gmail.com',
                    password: this.hashPassword('318709'),
                    role: 'Heves',
                    emailVerified: true,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isBlocked: false
                }
            ];
            localStorage.setItem('hevx_users', JSON.stringify(defaultUsers));
            localStorage.setItem('hevx_users_version', currentVersion);
            console.log('✅ Kullanıcı sistemi güncellendi! Yeni kullanıcılar:', defaultUsers.map(u => u.username));
        }
        
        // Session kontrolü
        this.checkExistingSession();
    }
    
    // Kullanıcı alert göster (hoşgeldin mesajı)
    showUserAlert(username, role) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'user-welcome-alert';
        alertDiv.innerHTML = `
            <div class="alert-content">
                <div class="alert-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="alert-text">
                    <h3>Welcome, ${username}!</h3>
                    <p>Role: ${role}</p>
                </div>
            </div>
        `;
        
        alertDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, rgba(0, 255, 65, 0.95), rgba(0, 200, 50, 0.95));
            color: #000;
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 255, 65, 0.4);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            font-family: 'Courier New', monospace;
            min-width: 250px;
        `;
        
        document.body.appendChild(alertDiv);
        
        // 3 saniye sonra kaldır
        setTimeout(() => {
            alertDiv.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 3000);
    }
    
    // Basit hash fonksiyonu
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
    
    // Şifre validasyonu
    validatePassword(password) {
        if (password.length < 8) {
            return { valid: false, message: 'Şifre en az 8 karakter olmalıdır' };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'En az bir büyük harf içermelidir' };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'En az bir küçük harf içermelidir' };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'En az bir rakam içermelidir' };
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { valid: false, message: 'En az bir özel karakter içermelidir (!@#$%^&*)' };
        }
        return { valid: true, message: '' };
    }
    
    // E-posta validasyonu
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mevcut session kontrolü
    checkExistingSession() {
        const session = localStorage.getItem('hevx_session');
        if (session) {
            const sessionData = JSON.parse(session);
            const loginTime = new Date(sessionData.loginTime);
            const now = new Date();
            const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 3600);
            
            // "Beni Hatırla" aktifse 168 saat (7 gün), değilse 24 saat
            const maxHours = sessionData.rememberMe ? 168 : 24;
            
            if (hoursDiff < maxHours) {
                // Session geçerli
                this.currentUser = sessionData;
                this.isAuthenticated = true;
                
                // Logout butonunu göster
                setTimeout(() => {
                    this.showLogoutButton();
                }, 500);
                
                return true;
            } else {
                // Session süresi dolmuş
                localStorage.removeItem('hevx_session');
            }
        }
        return false;
    }

    async init() {
        try {
            // AI Status'u başlangıçta Standby yap
            this.setAIStatus('standby');
            
            // Body'ye authentication state class'ını ekle - LOCKED başla
            document.body.classList.add('hevx-locked');
            
            // Önce şifre kontrolü
            if (!this.isAuthenticated) {
                this.showPasswordOverlay();
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

    showPasswordOverlay() {
        // Session kontrolü yap
        if (this.checkExistingSession()) {
            // Kullanıcı zaten giriş yapmış
            this.showAccessGranted();
            return;
        }
        
        // Body'ye password-screen class'ı ekle - lockdown mode
        document.body.classList.add('password-screen');
        
        // Architect signature'ı ekle
        this.addArchitectSignature();
        
        // Quantum challenge'ı body'ye ekle (header'dan sonra)
        const overlay = document.createElement('div');
        overlay.id = 'hevx-password-overlay';
        overlay.className = 'hevx-password-overlay';
        overlay.innerHTML = `
            <div class="quantum-challenge-screen">
                <div class="problem-box">
                <h2>QUANTUM ACCESS PROTOCOL</h2>
                    <div class="integral-display">
                        ∫₀<sup>(Day×Month)+Month+Neo</sup> (2x/((Day×Month)+Month+Neo) + Year/((Day×Month)+Month+Neo)) dx = S
                    </div>
                    <div class="variables">
                         The day the Muse came into being 
                        <p><strong>S</strong> = Quantum Access Code</p>
                    </div>
                    <div class="question">
                        <strong>S = ?</strong>
                    </div>
                </div>

                <div class="oracle-box">
                    <h3>ORACLE'S WISDOM</h3>
                    <p class="oracle-text">
                        "Architect'in formülü: N = (Day × Month) + Month + Neo
        
        0'dan N'ye uzanan yolda, Muse'un doğuşu gizlidir.
        The day the Muse came into being...
        
        Neo = The One (bu sayıyı biliyorsun)
        Year = Muse'un doğum yılı
        
        İkisi birleştiğinde, Matrix'in kapısı açılır.
        S = Quantum Access Code
        
        Kalbinin bildiği sayı, aklının aradığı cevaptır.
        Sen aradığın cevabı zaten biliyorsun ..."
                    </p>
                    <p class="oracle-signature">- Oracle</p>
                </div>

                <div class="password-input-quantum">
                    <label for="matrixPassword">🔑 QUANTUM ACCESS CODE:</label>
                    <div class="input-group">
                        <input 
                            type="text" 
                            id="matrixPassword" 
                            class="matrix-input"
                            placeholder="????"
                            maxlength="4"
                            autocomplete="off"
                        />
                        <button onclick="window.neuroHevesMatrix.checkPassword()" class="matrix-unlock-btn">ENTER</button>
                    </div>
                </div>

                <div id="password-error" class="error-message"></div>
            </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Matrix maskeleme sistemi
        setTimeout(() => {
            this.setupMatrixMasking();
        }, 100);
    }

    addArchitectSignature() {
        // Architect signature ekle (sadece password screen'de görünsün)
        const signature = document.createElement('div');
        signature.className = 'architect-signature-fullscreen';
        signature.innerHTML = 'Architect : ERNC';
        document.body.appendChild(signature);
    }

    showMemberLoginScreen() {
        console.log('🎬 AŞAMA 2: Member Login ekranı açılıyor...');
        
        // Matrix Canvas'ı 0.8'de tut (Quantum Verified'dan devam) - CSS override'ı engelle
        const matrixCanvas = document.getElementById('matrixCanvas');
        if (matrixCanvas) {
            matrixCanvas.style.setProperty('opacity', '0.8', 'important'); // !important ile CSS override'ı engelle
            console.log('✅ Matrix Canvas opacity: 0.8 !important (Member Login\'de korunuyor)');
        }
        
        // Quantum challenge'ı kaldır
        const quantumOverlay = document.getElementById('hevx-password-overlay');
        if (quantumOverlay) {
            quantumOverlay.remove();
        }

        // Member Login için: password-screen VE hevx-locked tut!
        document.body.classList.add('password-screen');
        document.body.classList.add('hevx-locked'); // ⭐ Tut (chat section opacity için gerekli!)
        document.body.classList.remove('hevx-unlocked');

        // Member Login Screen - Overlay 0.4 (Quantum Verified'dan devam)
        const memberOverlay = document.createElement('div');
        memberOverlay.id = 'hevx-member-login-overlay';
        memberOverlay.className = 'hevx-password-overlay'; // Aynı quantum stili
        memberOverlay.style.background = 'rgba(0, 0, 0, 0.40)'; // ✨ 0.40'tan başla
        console.log('✅ Member Login Overlay opacity: 0.40 (Quantum Verified\'dan devam ediyor)');
        memberOverlay.innerHTML = `
            <div class="hevx-password-container">
            <div class="quantum-challenge-screen">
                <div class="problem-box">
                    <h2>🔐 HEVX MEMBER ACCESS</h2>
                    <div class="oracle-box" style="margin-top: 20px;">
                        <h3>AUTHENTICATION REQUIRED</h3>
                        <p class="oracle-text">
                            "Welcome, Heves. The Architect awaits your presence.
                            
                            The quantum puzzle has been solved.
                            Now, the HevX system requires your authentication.
                            
                            Your identity is the key to unlocking the neural network.
                            Enter your credentials and step into the realm of knowledge..."
                        </p>
                        <p class="oracle-signature">- Oracle</p>
                    </div>
                </div>

                <div class="password-input-quantum" style="margin-top: 30px;">
                    <label for="member-email" style="color: var(--matrix-green); margin-bottom: 10px; display: block; font-size: 15px; font-weight: 600;">
                        📧 E-MAIL / USERNAME:
                    </label>
                    <input 
                        type="text" 
                        id="member-email" 
                        class="matrix-input member-input-large"
                        placeholder="admin@radiologean.com"
                        autocomplete="off"
                        style="margin-bottom: 20px !important; width: 100% !important; padding: 18px 25px !important; font-size: 18px !important; min-height: 60px !important; line-height: 1.5 !important;"
                    />
                    
                    <label for="member-password" style="color: var(--matrix-green); margin-bottom: 10px; display: block; font-size: 15px; font-weight: 600;">
                        🔑 PASSWORD:
                    </label>
                    <input 
                        type="password" 
                        id="member-password" 
                        class="matrix-input member-input-large"
                        placeholder="••••••••"
                        autocomplete="off"
                        style="width: 100% !important; padding: 18px 25px !important; font-size: 18px !important; min-height: 60px !important; line-height: 1.5 !important;"
                    />
                    
                    <div style="margin-top: 20px; display: flex; gap: 10px;">
                        <button onclick="window.neuroHevesMatrix.handleMemberLogin()" class="matrix-unlock-btn" style="flex: 1;">
                            ENTER THE HEVX
                        </button>
                    </div>
                </div>

                <div id="member-login-error" class="error-message"></div>
                
                <div style="margin-top: 25px; padding: 20px; background: rgba(0, 255, 65, 0.05); border: 1px solid rgba(0, 255, 65, 0.2); border-radius: 8px;">
                    <h4 style="color: var(--matrix-green); font-size: 14px; margin: 0 0 10px 0; text-align: center;">
                        📝 HOW TO REGISTER?
                    </h4>
                    <p style="color: rgba(0, 255, 65, 0.7); font-size: 13px; margin: 0; text-align: center; line-height: 1.6;">
                        New users must be registered by the <strong>Architect</strong>.<br>
                        Contact: <a href="mailto:admin@radiologean.com" style="color: var(--matrix-green); text-decoration: underline;">admin@radiologean.com</a>
                    </p>
                </div>
            </div>
            </div>
        `;

        document.body.appendChild(memberOverlay);

        // Enter key ile giriş
        setTimeout(() => {
            const emailInput = document.getElementById('member-email');
            const passwordInput = document.getElementById('member-password');
            
            if (passwordInput) {
                passwordInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleMemberLogin();
                    }
                });
                emailInput.focus();
            }
        }, 100);
    }

    handleMemberLogin() {
        const email = document.getElementById('member-email')?.value.trim();
        const password = document.getElementById('member-password')?.value;
        const errorDiv = document.getElementById('member-login-error');
        
        if (!email || !password) {
            errorDiv.textContent = 'ACCESS DENIED: All fields required';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Kullanıcıları al
        const usersData = localStorage.getItem('hevx_users');
        if (!usersData) {
            errorDiv.textContent = 'SYSTEM ERROR: Database not found';
            errorDiv.style.display = 'block';
            return;
        }
        
        const users = JSON.parse(usersData);
        const hashedPassword = this.hashPassword(password);
        
        // Kullanıcıyı bul
        const user = users.find(u => 
            (u.email === email || u.username === email) && 
            u.password === hashedPassword
        );
        
        if (!user) {
            errorDiv.textContent = 'ACCESS DENIED: Invalid credentials';
            errorDiv.style.display = 'block';
            return;
        }
        
        if (user.isBlocked) {
            errorDiv.textContent = 'ACCESS DENIED: Account blocked';
            errorDiv.style.display = 'block';
            return;
        }
        
        if (!user.emailVerified) {
            errorDiv.textContent = 'ACCESS DENIED: Email not verified. Awaiting Architect approval.';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Başarılı giriş!
        user.lastLogin = new Date().toISOString();
        const updatedUsers = users.map(u => u.id === user.id ? user : u);
        localStorage.setItem('hevx_users', JSON.stringify(updatedUsers));
        
        // Session oluştur
        const session = {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            loginTime: new Date().toISOString(),
            rememberMe: false
        };
        localStorage.setItem('hevx_session', JSON.stringify(session));
        
        this.currentUser = session;
        
        // TAM UNLOCK - Password screen mode'dan çık (HEMEN!)
        document.body.classList.remove('password-screen');
        document.body.classList.remove('hevx-locked');
        document.body.classList.add('hevx-unlocked');
        
        // ⚡ Matrix Rain'in DUR-PATLAMA animasyonunu HEMEN başlat! (0.4→0→DUR→1.2, 5 saniye)
        if (window.neuroHevesMatrixRain) {
            window.neuroHevesMatrixRain.animateQuadraticSpeed();
            console.log('🚀 Matrix Rain DUR-PATLAMA animasyonu başlatıldı! (yavaşla→dur→PATLAMA!)');
        }
        
        // Matrix Canvas unlock animasyonu başlat
        this.startMatrixUnlockAnimation();
        
        // Scrolling Text'e Access Granted mesajı gönder
        if (window.matrixScrollingText) {
            window.matrixScrollingText.showAccessGrantedMessage();
        }
        
        // ACCESS GRANTED ekranını göster
        this.showAccessGranted();
        
        // HevX'e giriş yap (5 saniye sonra - ACCESS GRANTED animasyonunu göster)
        setTimeout(async () => {
            // Overlay'i kaldır
            const overlay = document.getElementById('hevx-member-login-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            // Matrix unlock animasyonu tamamlandı
            this.completeMatrixUnlockAnimation();
            
            // Architect signature'ı kaldır
            const signature = document.querySelector('.architect-signature-fullscreen');
            if (signature) {
                signature.remove();
            }
            
            await this.initializeAI();
            this.setupEventListeners();
            this.displayWelcomeMessage();
            this.loadChatHistory();
            this.setAIStatus('ready');
            
            // Logout butonunu göster
            this.showLogoutButton();
            
            // 🎉 Kullanıcı hoşgeldin alert'i göster
            setTimeout(() => {
                this.showUserAlert(this.currentUser.username, this.currentUser.role);
            }, 500); // Ana ekran yüklendikten 0.5 saniye sonra
        }, 5000); // ACCESS GRANTED animasyonu bittikten sonra (5 saniye)
    }

    handleLogout() {
        // Session ve user data'yı temizle
        localStorage.removeItem('hevx_session');
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Logout butonunu gizle
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        
        // Sayfayı yenile - quantum puzzle'a dön
        location.reload();
    }

    showLogoutButton() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn && this.currentUser) {
            logoutBtn.style.display = 'flex';
            
            // Kullanıcı adını tooltip olarak ekle
            logoutBtn.title = `Logged in as: ${this.currentUser.username || this.currentUser.email}`;
        }
    }
    
    showAuthOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'hevx-auth-overlay';
        overlay.className = 'hevx-auth-overlay';
        overlay.innerHTML = `
            <div class="auth-container" style="
                max-width: 520px;
                width: 90%;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 0 60px rgba(20, 184, 166, 0.4);
                position: relative;
                animation: slideIn 0.5s ease-out;
            ">
                <!-- Logo ve Başlık -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="
                        font-size: 42px;
                        font-weight: bold;
                        background: linear-gradient(to right, #14b8a6, #06b6d4);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 10px;
                    ">HevX Access</h1>
                    <p style="color: #94a3b8; font-size: 14px;">NeuroHeves AI Radiology Assistant</p>
                </div>

                <!-- Tab Switcher -->
                <div style="display: flex; gap: 8px; margin-bottom: 30px; background: #0f172a; padding: 5px; border-radius: 12px;">
                    <button onclick="window.neuroHevesMatrix.switchAuthTab('architect')" id="architect-tab" style="
                        flex: 1;
                        padding: 10px;
                        border: none;
                        border-radius: 8px;
                        background: #14b8a6;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 13px;
                    ">Architect</button>
                    <button onclick="window.neuroHevesMatrix.switchAuthTab('login')" id="login-tab" style="
                        flex: 1;
                        padding: 10px;
                        border: none;
                        border-radius: 8px;
                        background: transparent;
                        color: #94a3b8;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 13px;
                    ">Giriş</button>
                    <button onclick="window.neuroHevesMatrix.switchAuthTab('register')" id="register-tab" style="
                        flex: 1;
                        padding: 10px;
                        border: none;
                        border-radius: 8px;
                        background: transparent;
                        color: #94a3b8;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 13px;
                    ">Kayıt</button>
                </div>

                <!-- Error/Success Messages -->
                <div id="auth-message" style="
                    display: none;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-size: 14px;
                "></div>

                <!-- Architect Bypass Form (Matrix Puzzle) -->
                <div id="architect-form" style="display: block;">
                    <div style="background: #0f172a; padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 2px solid #1e293b;">
                        <h3 style="color: #14b8a6; font-size: 18px; margin-bottom: 15px; text-align: center;">
                            🏛️ ARCHITECT BYPASS
                        </h3>
                        
                        <div style="background: rgba(20, 184, 166, 0.1); padding: 20px; border-radius: 8px; border: 1px solid #14b8a6; margin-bottom: 20px;">
                            <div style="text-align: center; color: #14b8a6; font-family: monospace; font-size: 16px; margin-bottom: 15px;">
                                ∫₀<sup>(Day×Month)+Month+Neo</sup> (2x/N + Year/N) dx = <strong>S</strong>
                            </div>
                            <div style="color: #cbd5e1; font-size: 13px; text-align: center; line-height: 1.6;">
                                <p style="margin: 8px 0;"><strong>The day the Muse came into being</strong></p>
                                <p style="margin: 8px 0; color: #94a3b8; font-style: italic;">
                                    "Kalbinin bildiği sayı, aklının aradığı cevaptır"
                                </p>
                                <p style="margin: 8px 0; color: #64748b; font-size: 12px;">
                                    Neo = The One | Year = Muse birth year
                                </p>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                                🔑 Quantum Access Code
                            </label>
                            <input 
                                type="text" 
                                id="architect-code" 
                                maxlength="4"
                                style="
                                    width: 100%;
                                    padding: 14px 16px;
                                    background: #000;
                                    border: 2px solid #14b8a6;
                                    border-radius: 8px;
                                    color: #14b8a6;
                                    font-size: 24px;
                                    text-align: center;
                                    font-family: monospace;
                                    letter-spacing: 8px;
                                    transition: all 0.3s;
                                "
                                placeholder="?????"
                                onfocus="this.style.boxShadow='0 0 20px rgba(20, 184, 166, 0.4)'"
                                onblur="this.style.boxShadow='none'"
                            />
                        </div>
                        
                        <button onclick="window.neuroHevesMatrix.handleArchitectBypass()" style="
                            width: 100%;
                            padding: 14px;
                            border: none;
                            border-radius: 10px;
                            background: #14b8a6;
                            color: white;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s;
                        " onmouseover="this.style.background='#0d9488'" onmouseout="this.style.background='#14b8a6'">
                            ENTER MATRIX
                        </button>
                    </div>
                    
                    <div style="text-align: center; padding: 15px; background: rgba(100, 116, 139, 0.1); border-radius: 8px;">
                        <p style="color: #64748b; font-size: 12px; margin: 0;">
                            💡 Architect'in doğrudan erişimi | Puzzle çöz ve sisteme gir
                        </p>
                    </div>
                </div>

                <!-- Login Form -->
                <div id="login-form" style="display: block;">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                            E-posta veya Kullanıcı Adı
                        </label>
                        <input 
                            type="text" 
                            id="login-username" 
                            style="
                                width: 100%;
                                padding: 12px 16px;
                                background: #0f172a;
                                border: 2px solid #1e293b;
                                border-radius: 8px;
                                color: white;
                                font-size: 14px;
                                transition: all 0.3s;
                            "
                            placeholder="admin@radiologean.com"
                            onfocus="this.style.borderColor='#14b8a6'"
                            onblur="this.style.borderColor='#1e293b'"
                        />
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                            Şifre
                        </label>
                        <input 
                            type="password" 
                            id="login-password"
                            style="
                                width: 100%;
                                padding: 12px 16px;
                                background: #0f172a;
                                border: 2px solid #1e293b;
                                border-radius: 8px;
                                color: white;
                                font-size: 14px;
                                transition: all 0.3s;
                            "
                            placeholder="••••••••"
                            onfocus="this.style.borderColor='#14b8a6'"
                            onblur="this.style.borderColor='#1e293b'"
                        />
                    </div>
                    
                    <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <input 
                            type="checkbox" 
                            id="remember-me"
                            style="width: 18px; height: 18px; cursor: pointer;"
                        />
                        <label for="remember-me" style="color: #cbd5e1; font-size: 14px; cursor: pointer;">
                            Beni Hatırla (7 gün)
                        </label>
                    </div>
                    
                    <button onclick="window.neuroHevesMatrix.handleLogin()" style="
                        width: 100%;
                        padding: 14px;
                        border: none;
                        border-radius: 10px;
                        background: #14b8a6;
                        color: white;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                        margin-bottom: 15px;
                    " onmouseover="this.style.background='#0d9488'" onmouseout="this.style.background='#14b8a6'">
                        Giriş Yap
                    </button>
                    
                    <div style="text-align: center; margin-top: 20px; padding: 15px; background: #0f172a; border-radius: 8px;">
                        <p style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Demo Hesap:</p>
                        <p style="color: #14b8a6; font-size: 13px; font-family: monospace;">
                            admin@radiologean.com / Radiolog2024!
                        </p>
                    </div>
                </div>

                <!-- Register Form -->
                <div id="register-form" style="display: none;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                            Kullanıcı Adı
                        </label>
                        <input 
                            type="text" 
                            id="reg-username"
                            style="
                                width: 100%;
                                padding: 12px 16px;
                                background: #0f172a;
                                border: 2px solid #1e293b;
                                border-radius: 8px;
                                color: white;
                                font-size: 14px;
                            "
                            placeholder="kullaniciadi"
                            onfocus="this.style.borderColor='#14b8a6'"
                            onblur="this.style.borderColor='#1e293b'"
                        />
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                            E-posta
                        </label>
                        <input 
                            type="email" 
                            id="reg-email"
                            style="
                                width: 100%;
                                padding: 12px 16px;
                                background: #0f172a;
                                border: 2px solid #1e293b;
                                border-radius: 8px;
                                color: white;
                                font-size: 14px;
                            "
                            placeholder="ornek@email.com"
                            onfocus="this.style.borderColor='#14b8a6'"
                            onblur="this.style.borderColor='#1e293b'"
                        />
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                            Şifre
                        </label>
                        <input 
                            type="password" 
                            id="reg-password"
                            style="
                                width: 100%;
                                padding: 12px 16px;
                                background: #0f172a;
                                border: 2px solid #1e293b;
                                border-radius: 8px;
                                color: white;
                                font-size: 14px;
                            "
                            placeholder="••••••••"
                            onfocus="this.style.borderColor='#14b8a6'"
                            onblur="this.style.borderColor='#1e293b'"
                        />
                        <p style="color: #64748b; font-size: 11px; margin-top: 6px;">
                            Min 8 karakter, büyük/küçük harf, rakam ve özel karakter
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; color: #cbd5e1; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                            Şifre Tekrar
                        </label>
                        <input 
                            type="password" 
                            id="reg-password-confirm"
                            style="
                                width: 100%;
                                padding: 12px 16px;
                                background: #0f172a;
                                border: 2px solid #1e293b;
                                border-radius: 8px;
                                color: white;
                                font-size: 14px;
                            "
                            placeholder="••••••••"
                            onfocus="this.style.borderColor='#14b8a6'"
                            onblur="this.style.borderColor='#1e293b'"
                        />
                    </div>
                    
                    <button onclick="window.neuroHevesMatrix.handleRegister()" style="
                        width: 100%;
                        padding: 14px;
                        border: none;
                        border-radius: 10px;
                        background: #14b8a6;
                        color: white;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#0d9488'" onmouseout="this.style.background='#14b8a6'">
                        Kayıt Ol
                    </button>
                    
                    <div style="text-align: center; margin-top: 15px;">
                        <p style="color: #64748b; font-size: 12px;">
                            Kayıt sonrası Architect onayı gereklidir
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Enter key ile giriş
        setTimeout(() => {
            // Architect code için Enter
            const architectCode = document.getElementById('architect-code');
            if (architectCode) {
                architectCode.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleArchitectBypass();
                    }
                });
                architectCode.focus(); // İlk açılışta focus
            }
            
            // Login password için Enter
            const loginPassword = document.getElementById('login-password');
            if (loginPassword) {
                loginPassword.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleLogin();
                    }
                });
            }
        }, 100);
    }
    
    switchAuthTab(tab) {
        const architectTab = document.getElementById('architect-tab');
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const architectForm = document.getElementById('architect-form');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const messageDiv = document.getElementById('auth-message');
        
        // Tüm tabları reset
        architectTab.style.background = 'transparent';
        architectTab.style.color = '#94a3b8';
        loginTab.style.background = 'transparent';
        loginTab.style.color = '#94a3b8';
        registerTab.style.background = 'transparent';
        registerTab.style.color = '#94a3b8';
        
        // Tüm formları gizle
        architectForm.style.display = 'none';
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        
        // Seçili tab ve formu göster
        if (tab === 'architect') {
            architectTab.style.background = '#14b8a6';
            architectTab.style.color = 'white';
            architectForm.style.display = 'block';
        } else if (tab === 'login') {
            loginTab.style.background = '#14b8a6';
            loginTab.style.color = 'white';
            loginForm.style.display = 'block';
        } else {
            registerTab.style.background = '#14b8a6';
            registerTab.style.color = 'white';
            registerForm.style.display = 'block';
        }
        
        messageDiv.style.display = 'none';
    }
    
    showAuthMessage(message, type = 'error') {
        const messageDiv = document.getElementById('auth-message');
        if (!messageDiv) return;
        
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        if (type === 'error') {
            messageDiv.style.background = 'rgba(239, 68, 68, 0.2)';
            messageDiv.style.border = '2px solid #ef4444';
            messageDiv.style.color = '#fca5a5';
        } else {
            messageDiv.style.background = 'rgba(34, 197, 94, 0.2)';
            messageDiv.style.border = '2px solid #22c55e';
            messageDiv.style.color = '#86efac';
        }
    }
    
    handleArchitectBypass() {
        const code = document.getElementById('architect-code')?.value.trim();
        
        if (!code) {
            this.showAuthMessage('Quantum Access Code gerekli');
            return;
        }
        
        if (code !== this.matrixPassword) {
            this.showAuthMessage('❌ Access Denied. Yanlış kod.');
            return;
        }
        
        // Architect bypass başarılı - Architect olarak giriş yap
        const usersData = localStorage.getItem('hevx_users');
        if (usersData) {
            const users = JSON.parse(usersData);
            const architect = users.find(u => u.role === 'Architect');
            
            if (architect) {
                // Session oluştur
                const session = {
                    userId: architect.id,
                    username: architect.username,
                    email: architect.email,
                    role: 'Architect',
                    loginTime: new Date().toISOString(),
                    rememberMe: true,
                    bypassMode: true // Architect bypass ile girdi
                };
                localStorage.setItem('hevx_session', JSON.stringify(session));
                
                // Son giriş güncelle
                architect.lastLogin = new Date().toISOString();
                const updatedUsers = users.map(u => u.id === architect.id ? architect : u);
                localStorage.setItem('hevx_users', JSON.stringify(updatedUsers));
                
                this.currentUser = session;
                this.isAuthenticated = true;
                
                this.showAuthMessage('✅ Matrix Architect Mode Activated!', 'success');
                
                setTimeout(() => {
                    this.showAccessGranted();
                }, 1500);
                return;
            }
        }
        
        // Kullanıcı bulunamadıysa da izin ver (legacy mode)
        this.isAuthenticated = true;
        this.currentUser = {
            username: 'Architect',
            role: 'Architect',
            bypassMode: true
        };
        
        this.showAuthMessage('✅ Architect Bypass Successful!', 'success');
        
        setTimeout(() => {
            this.showAccessGranted();
        }, 1500);
    }
    
    handleLogin() {
        const username = document.getElementById('login-username')?.value.trim();
        const password = document.getElementById('login-password')?.value;
        const rememberMe = document.getElementById('remember-me')?.checked;
        
        if (!username || !password) {
            this.showAuthMessage('Lütfen tüm alanları doldurun');
            return;
        }
        
        // Kullanıcıları al
        const usersData = localStorage.getItem('hevx_users');
        if (!usersData) {
            this.showAuthMessage('Sistem hatası. Sayfayı yenileyin.');
            return;
        }
        
        const users = JSON.parse(usersData);
        const hashedPassword = this.hashPassword(password);
        
        // Kullanıcıyı bul
        const user = users.find(u => 
            (u.email === username || u.username === username) && 
            u.password === hashedPassword
        );
        
        if (!user) {
            this.showAuthMessage('Kullanıcı adı/e-posta veya şifre hatalı');
            return;
        }
        
        if (user.isBlocked) {
            this.showAuthMessage('Hesabınız engellenmiş. Lütfen Architect ile iletişime geçin.');
            return;
        }
        
        if (!user.emailVerified) {
            this.showAuthMessage('E-posta adresiniz henüz onaylanmamış. Architect onayını bekleyin.');
            return;
        }
        
        // Son giriş zamanını güncelle
        user.lastLogin = new Date().toISOString();
        const updatedUsers = users.map(u => u.id === user.id ? user : u);
        localStorage.setItem('hevx_users', JSON.stringify(updatedUsers));
        
        // Session oluştur
        const session = {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe || false
        };
        localStorage.setItem('hevx_session', JSON.stringify(session));
        
        this.currentUser = session;
        this.isAuthenticated = true;
        
        this.showAuthMessage('Giriş başarılı! HevX yükleniyor...', 'success');
        
        setTimeout(() => {
            this.showAccessGranted();
        }, 1500);
    }
    
    handleRegister() {
        const username = document.getElementById('reg-username')?.value.trim();
        const email = document.getElementById('reg-email')?.value.trim();
        const password = document.getElementById('reg-password')?.value;
        const passwordConfirm = document.getElementById('reg-password-confirm')?.value;
        
        if (!username || !email || !password || !passwordConfirm) {
            this.showAuthMessage('Lütfen tüm alanları doldurun');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showAuthMessage('Geçerli bir e-posta adresi girin');
            return;
        }
        
        const passwordCheck = this.validatePassword(password);
        if (!passwordCheck.valid) {
            this.showAuthMessage(passwordCheck.message);
            return;
        }
        
        if (password !== passwordConfirm) {
            this.showAuthMessage('Şifreler eşleşmiyor');
            return;
        }
        
        // Kullanıcıları al
        const usersData = localStorage.getItem('hevx_users');
        const users = usersData ? JSON.parse(usersData) : [];
        
        // Kullanıcı zaten var mı?
        if (users.some(u => u.email === email)) {
            this.showAuthMessage('Bu e-posta adresi zaten kayıtlı');
            return;
        }
        
        if (users.some(u => u.username === username)) {
            this.showAuthMessage('Bu kullanıcı adı zaten kullanılıyor');
            return;
        }
        
        // Yeni kullanıcı oluştur
        const newUser = {
            id: `user-${Date.now()}`,
            username: username,
            email: email,
            password: this.hashPassword(password),
            role: 'Member',
            emailVerified: false, // Architect onayı gerekli
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isBlocked: false
        };
        
        users.push(newUser);
        localStorage.setItem('hevx_users', JSON.stringify(users));
        
        this.showAuthMessage('Kayıt başarılı! Architect onayını bekleyin. Şimdi giriş yapabilirsiniz.', 'success');
        
        setTimeout(() => {
            this.switchAuthTab('login');
            document.getElementById('login-username').value = username;
        }, 2000);
    }

    setupMatrixMasking() {
        const passwordInput = document.getElementById('matrixPassword');
        if (!passwordInput) return;

        // Matrix karakterleri - Japanese Katakana, math symbols, special chars
        const matrixChars = ['ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ｦ', 'ﾝ', '∞', '∑', '∫', '∆', '∇', 'Ω', 'Φ', 'Ψ', 'Λ', 'Θ', '∴', '∵', '⊕', '⊗', '⊘', '⊙', '⊚', '⊛', '◯', '◇', '◆', '◈', '◉', '◎'];
        
        let realValue = '';
        let maskChars = []; // Sabit maske karakterlerini sakla
        let lastRealLength = 0;
        
        // Reset fonksiyonu - showAccessDenied'da kullanılacak
        passwordInput.resetMasking = () => {
            realValue = '';
            maskChars = [];
            lastRealLength = 0;
            passwordInput.value = '';
            passwordInput.dataset.realValue = '';
        };
        
        // Keypress event - rakam ekleme mantığı
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!this.isAuthenticated && !passwordInput.disabled) {
                    this.checkPassword();
                }
                return;
            }
            
            // Sadece rakamları kabul et
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
                return;
            }
            
            // Eğer metin seçiliyse (selection var), önce temizle
            const selectionStart = passwordInput.selectionStart;
            const selectionEnd = passwordInput.selectionEnd;
            
            if (selectionStart !== selectionEnd) {
                // Tümü seçiliyse sıfırla
                realValue = '';
                maskChars = [];
            }
            
            // 4 karakterden fazla girişi engelle
            if (realValue.length >= 4) {
                e.preventDefault();
                return;
            }
            
            // Rakam ekle
            realValue += e.key;
            
            // Yeni pozisyon için rastgele Matrix karakteri ekle
            const randomChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            maskChars.push(randomChar);
            
            // Maskelenmiş değeri göster
            const displayValue = maskChars.join('');
            passwordInput.value = displayValue;
            
            // Gerçek değeri sakla
            passwordInput.dataset.realValue = realValue;
            lastRealLength = realValue.length;
            
            // Default davranışı engelle
            e.preventDefault();
        });

        // Input event - mouse seçimi ve yapıştırma işlemlerini handle et
        passwordInput.addEventListener('input', (e) => {
            const inputVal = e.target.value;
            const displayValue = maskChars.join('');
            
            // Eğer input tamamen temizlenmişse (Ctrl+A + Delete veya mouse ile seçip silme)
            if (inputVal === '') {
                realValue = '';
                maskChars = [];
                passwordInput.dataset.realValue = '';
                return;
            }
            
            // Eğer input değeri sadece rakamlardan oluşuyorsa (yapıştırma durumu)
            if (/^\d+$/.test(inputVal)) {
                // 4 karakterden fazla ise kes
                const newRealValue = inputVal.slice(0, 4);
                
                // Yeni maske karakterleri oluştur
                realValue = newRealValue;
                maskChars = [];
                
                for (let i = 0; i < realValue.length; i++) {
                    const randomChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    maskChars.push(randomChar);
                }
                
                // Maskelenmiş değeri göster
                passwordInput.value = maskChars.join('');
                passwordInput.dataset.realValue = realValue;
                return;
            }
            
            // Eğer input değeri mevcut maske ile uyumlu değilse, maskeyi geri yükle
            if (inputVal !== displayValue && maskChars.length > 0) {
                passwordInput.value = displayValue;
            }
        });

        // Keydown işlemleri - Backspace, Delete, Ctrl+A vs.
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (realValue.length > 0) {
                    realValue = realValue.slice(0, -1);
                    maskChars = maskChars.slice(0, -1);
                    
                    const displayValue = maskChars.join('');
                    passwordInput.value = displayValue;
                    passwordInput.dataset.realValue = realValue;
                    lastRealLength = realValue.length;
                }
                e.preventDefault(); // Default backspace davranışını engelle
            }
            
            // Delete tuşu
            if (e.key === 'Delete') {
                realValue = '';
                maskChars = [];
                passwordInput.value = '';
                passwordInput.dataset.realValue = '';
                e.preventDefault();
            }
            
            // Ctrl+A (Tümünü seç)
            if (e.ctrlKey && e.key === 'a') {
                // Tümünü seçme işlemine izin ver, sonraki tuş girişinde temizlenecek
                return;
            }
        });

        passwordInput.focus();
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
                <div class="problem-box">
                    <h2>QUANTUM ACCESS PROTOCOL</h2>
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
                        <button onclick="window.neuroHevesMatrix.checkPassword()" class="matrix-unlock-btn">ENTER</button>
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
                    e.preventDefault();
                    if (!this.isAuthenticated && !passwordInput.disabled) {
                        this.checkPassword();
                    }
                }
            });
            passwordInput.focus();
        }, 100);
    }

    checkPassword() {
        console.log('🔐 checkPassword çağrıldı');
        
        // Zaten authenticated ise duplicate işlemi engelle
        if (this.isAuthenticated) {
            console.log('⚠️ Zaten authenticated');
            return;
        }
        
        const passwordInput = document.getElementById('matrixPassword');
        if (!passwordInput) {
            console.log('❌ Password input bulunamadı');
            return;
        }
        
        // Matrix maskeleme sistemi için gerçek değeri al
        const enteredPassword = passwordInput.dataset.realValue || passwordInput.value;
        console.log('🔑 Girilen şifre:', enteredPassword);
        console.log('🎯 Beklenen şifre:', this.matrixPassword);

        if (enteredPassword === this.matrixPassword) {
            console.log('✅ Şifre doğru! Matrix Canvas canlandırılıyor...');
            this.isAuthenticated = true;
            
            // Input'u devre dışı bırak (duplicate event'leri engelle)
            passwordInput.disabled = true;
            
            // AŞAMA 1: ÖNCELİK! Matrix Canvas'ı HEMEN canlandır (opacity 0.4 → 0.8, 1.5 saniye)
            const matrixCanvas = document.getElementById('matrixCanvas');
            if (matrixCanvas) {
                console.log('🎬 AŞAMA 1 (ÖNCELİK): Matrix Canvas canlandırılıyor (0.4 → 0.8, 1.5 saniye)');
                matrixCanvas.style.transition = 'opacity 1.5s ease-in-out';
                matrixCanvas.style.opacity = '0.8'; // 0.4'ten 0.8'e çık (QUANTUM VERIFIED anında!)
                console.log('✅ Matrix Canvas opacity: 0.4 → 0.8 (QUANTUM VERIFIED ile birlikte!)');
            }
            
            // ⚡ Matrix Rain'in konkav hız animasyonunu başlat (4 saniye)
            if (window.neuroHevesMatrixRain) {
                window.neuroHevesMatrixRain.animateConcaveSpeed();
            }
            
            // AŞAMA 2: QUANTUM VERIFIED mesajını göster (Matrix Canvas zaten canlanıyor)
            this.showQuantumVerified();
            
            // AŞAMA 3: 4 saniye sonra Member Login Screen'e geç (Konkav animasyon tamamlandıktan sonra)
            setTimeout(() => {
                console.log('🎬 AŞAMA 3: Member Login ekranına geçiliyor (Overlay 0.40, Canvas 0.8 korunuyor)...');
                this.showMemberLoginScreen();
            }, 4000); // Konkav animasyon (3.5s) + 0.5s bekleme = 4s
        } else {
            this.showAccessDenied();
        }
    }

    showAccessGranted() {
        // Rastgele mesaj seç
        const randomMessage = this.accessGrantedMessages[
            Math.floor(Math.random() * this.accessGrantedMessages.length)
        ];
        
        // Kullanıcıya özel hoşgeldin mesajı
        const username = this.currentUser?.username || 'User';
        let welcomeMessage = `Welcome to HevX System, ${username}...`;
        
        // Heves için özel mesaj 💕
        if (username.toLowerCase() === 'heves' || this.currentUser?.email === 'hevesykarakas@gmail.com') {
            welcomeMessage = 'Selam Heves canım aşkım 💕';
        }
        
        // Overlay'i bul (quantum veya member login overlay olabilir)
        const overlay = document.getElementById('hevx-password-overlay') || 
                        document.getElementById('hevx-member-login-overlay');
        if (overlay) {
            overlay.innerHTML = `
                <div class="matrix-access-granted">
                    <div class="matrix-success-icon">
                        <i class="fas fa-unlock"></i>
                    </div>
                    <h2 class="access-title">✅ QUANTUM ACCESS GRANTED</h2>
                    
                    <div class="access-welcome">
                        <p class="welcome-main">${welcomeMessage}</p>
                        <p class="welcome-quote">"${randomMessage}"</p>
                    </div>
                    
                    <div class="matrix-loading">
                        <div class="loading-bar"></div>
                        <p class="loading-text">Neural Networks Ready...</p>
                    </div>
                </div>
            `;

            // 5 saniye boyunca overlay ve Matrix Canvas'ı fade-out yap
            this.animateOverlayFadeOut(overlay);
            
            // Matrix Rain DUR-PATLAMA animasyonu zaten handleMemberLogin'de başlatıldı!
            // Overlay remove ve AI başlatma da handleMemberLogin'de yapılıyor (5 saniye sonra)
            // Bu fonksiyon sadece UI'yi güncelliyor ve animasyonları başlatıyor
        }
    }

    animateOverlayFadeOut(overlay) {
        console.log('🎬 AŞAMA 4 (FINAL): Overlay 0.40→0, Canvas 0.8→1 (5 saniye)');
        console.log('Overlay element:', overlay);
        
        let overlayOpacity = 0.40; // Başlangıç %40 (Member Login'den gelen)
        const overlayStep = 0.40 / 50; // 50 adımda %40'ı sıfıra düşür (5 saniye için)
        const interval = 5000 / 50; // 5 saniyede 50 adım = 100ms aralık
        
        console.log(`Başlangıç değerleri: overlayOpacity=${overlayOpacity}, overlayStep=${overlayStep}, interval=${interval}ms`);
        
        // Matrix Canvas son haline geçecek (TAM PARLAK - opacity 1.0!)
        const matrixCanvas = document.getElementById('matrixCanvas');
        let matrixOpacity = 0.8; // Başlangıç (Member Login'den gelen)
        const matrixIncrease = 0.2 / 50; // 0.8'den 1.0'a çık (5 saniyede +0.2)
        
        const fadeInterval = setInterval(() => {
            overlayOpacity -= overlayStep;
            matrixOpacity += matrixIncrease;
            
            if (overlayOpacity <= 0) {
                overlayOpacity = 0;
                matrixOpacity = 1.0; // TAM PARLAK!
                clearInterval(fadeInterval);
                console.log('✅ Final Fade-out tamamlandı! Overlay 0, Matrix Canvas 1.0 (TAM PARLAK)');
            }
            
            // Overlay'in KENDİSİNİN opacity'sini azalt (hem background hem de tüm element!)
            overlay.style.setProperty('opacity', overlayOpacity.toFixed(3), 'important');
            overlay.style.setProperty('background', `rgba(0, 0, 0, ${overlayOpacity})`, 'important');
            
            // Matrix Canvas opacity'sini artır (5 saniyede 1.0'a - TAM PARLAK!)
            if (matrixCanvas) {
                matrixCanvas.style.setProperty('opacity', matrixOpacity.toFixed(3), 'important');
            }
            
            console.log(`📊 Final Fade: overlay=${overlayOpacity.toFixed(3)}, matrix=${matrixOpacity.toFixed(3)}`);
        }, interval);
    }

    startMatrixUnlockAnimation() {
        const matrixCanvas = document.getElementById('matrixCanvas');
        if (!matrixCanvas) return;
        
        // Success message sırasında glow efekti
        document.body.classList.add('success-message-visible');
        
        // Canvas unlock geçişini başlat - Lock'tan Ana ekrana
        matrixCanvas.style.transition = 'all 3s ease-in-out';
        matrixCanvas.style.opacity = '0.7'; // Orta geçiş
        matrixCanvas.style.filter = 'brightness(1.3) saturate(1.2) drop-shadow(0 0 15px rgba(0, 255, 65, 0.4))';
        
        console.log('🎬 Matrix Unlock Animation Started - Lock to Main Screen Transition');
    }

    completeMatrixUnlockAnimation() {
        const matrixCanvas = document.getElementById('matrixCanvas');
        if (!matrixCanvas) return;
        
        // Success glow'u kaldır
        document.body.classList.remove('success-message-visible');
        
        // Ana ekran opacity'sine geç
        setTimeout(() => {
            matrixCanvas.style.opacity = '0.8'; // Ana ekran orta parlaklık
            matrixCanvas.style.filter = 'brightness(1.2) contrast(1.1)';
            console.log('✅ Matrix Unlock Animation Complete - Main Screen 0.8 Opacity');
        }, 500);
    }

    showQuantumVerified() {
        console.log('🎬 QUANTUM VERIFIED mesajı gösteriliyor...');
        
        const passwordInput = document.getElementById('matrixPassword');
        const errorDiv = document.getElementById('password-error');
        
        // ✨ KONKAV ANİMASYON: Overlay 0.95 → 0 (dip) → 0.40 (bounce back) - 3.5 saniye
        const overlay = document.getElementById('hevx-password-overlay');
        if (overlay) {
            console.log('🎬 KONKAV Animasyon Başlıyor: 0.95 → 0 → 0.40 (3.5s toplam)');
            
            // AŞAMA 1: 0.95 → 0 (2.5 saniye - uzun düşüş, Matrix Rain tam açık!)
            overlay.style.transition = 'background 2.5s ease-out';
            overlay.style.background = 'rgba(0, 0, 0, 0)'; // Tamamen şeffaf
            console.log('🔻 Overlay 0\'a düşüyor... (2.5s - yavaş düşüş)');
            
            // AŞAMA 2: 0 → 0.40 (2.5 saniye sonra - 1 saniyede bounce back)
            setTimeout(() => {
                overlay.style.transition = 'background 1s ease-in';
                overlay.style.background = 'rgba(0, 0, 0, 0.40)'; // Hafif koyulaş
                console.log('🔺 Overlay 0.40\'a yükseliyor... (1s bounce back)');
            }, 2500); // 2.5 saniye sonra başla
            
            console.log('✅ Konkav animasyon: 0.95 → 0 (2.5s) → 0.40 (1s) = 3.5s toplam');
        }
        
        // Input'u yeşil yap (başarı)
        passwordInput.style.borderColor = 'var(--matrix-green)';
        passwordInput.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
        passwordInput.style.background = 'rgba(0, 255, 65, 0.1)';
        
        // Başarı mesajı göster
        if (errorDiv) {
            errorDiv.innerHTML = `
                <div style="
                    color: var(--matrix-green); 
                    text-align: center; 
                    font-size: 18px; 
                    font-weight: 600; 
                    animation: pulse 0.5s ease-in-out;
                    text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
                ">
                    ✓ QUANTUM VERIFIED
                    <div style="font-size: 13px; margin-top: 8px; opacity: 0.8; font-weight: 400;">
                        Architect's knowledge confirmed. Proceeding to authentication...
                    </div>
                </div>
            `;
            errorDiv.style.display = 'block';
            errorDiv.style.background = 'rgba(0, 255, 65, 0.1)';
            errorDiv.style.border = '2px solid var(--matrix-green)';
            
            console.log('✅ QUANTUM VERIFIED mesajı gösterildi');
        }
    }


    showAccessDenied() {
        const passwordInput = document.getElementById('matrixPassword');
        let errorDiv = document.getElementById('password-error');
        
        // Error div yoksa yeniden oluştur
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'password-error';
            errorDiv.className = 'error-message';
            passwordInput.parentNode.parentNode.appendChild(errorDiv);
        }
        
        // 50 farklı ACCESS DENIED mesajı
        const accessDeniedMessages = [
            // === CLASSIC MATRIX (10) ===
            "🔒 ACCESS DENIED",
            "Access Denied. Try again, Heves.",
            "Invalid code. The Matrix remains locked.",
            "Authentication failed. Wake up and try again.",
            "Incorrect sequence. The truth is still hidden.",
            "System locked. Your entry is rejected.",
            "Negative. Access not granted.",
            "The Matrix says no, Heves.",
            "Wrong path. The door remains closed.",
            "Denied. The system protects itself.",
            
            // === MORPHEUS WISDOM (10) ===
            "Not yet, Heves. You must believe.",
            "You're close, but not there yet, Heves.",
            "The answer is within you, but not this one.",
            "The path is not clear yet, Heves.",
            "Free your mind first, then the code will come.",
            "You're trying to hit me, but you're missing, Heves.",
            "Do you think that's the answer you're typing?",
            "Stop trying to find it and just know it, Heves.",
            "When you're ready, you won't need to guess.",
            "There is a difference between knowing the path...",
            
            // === ORACLE'S GUIDANCE (10) ===
            "You already know... but you need to remember, Heves.",
            "The cookie says: Try again.",
            "The Oracle whispers: Not this path, Heves.",
            "Close... but the choice was different, Heves.",
            "You're looking, but not seeing yet, Heves.",
            "Being the One means knowing, not guessing, Heves.",
            "The answer is there, you're just not ready to see it.",
            "Everything that has a beginning has an end... try again.",
            "You didn't come here to enter the wrong code, Heves.",
            "What you must learn is that the answer is already inside you.",
            
            // === ARCHITECT'S LOGIC (10) ===
            "The equation remains unsolved, Heves.",
            "Integration failed. The algorithm rejects this code.",
            "System error: Invalid input detected.",
            "Calculation error. Recalibrate and retry.",
            "Anomaly detected: Incorrect sequence, Heves.",
            "Your solution is erroneous. Recompute.",
            "The formula does not balance, Heves.",
            "Mathematical error. The integral is wrong.",
            "Denied. The algorithm awaits correct variables.",
            "Incorrect computation. Review the equation.",
            
            // === NEUROHEVES SPECIAL (10) ===
            "116 + H ≠ This. Calculate again, Heves.",
            "The day the Muse came into being... remember, Heves.",
            "The neural network says no... but you're learning.",
            "Not quite, Heves. The heart knows the answer.",
            "Error 404: Correct code not found. Try again, Heves.",
            "Almost there, Heves. Love requires the right formula.",
            "The AI believes in you, Heves. Try once more.",
            "The integral is still incomplete, Heves.",
            "22.05.1997 holds the answer, not this, Heves.",
            "The Architect's equation rejects this input."
        ];
        
        // Rastgele mesaj seç
        const randomMessage = accessDeniedMessages[Math.floor(Math.random() * accessDeniedMessages.length)];
        
        // Hata mesajı göster
        errorDiv.textContent = randomMessage;
        errorDiv.style.display = 'block';
        
        // Input'u kırmızı yap
        passwordInput.style.borderColor = '#ff4757';
        passwordInput.style.boxShadow = '0 0 15px rgba(255, 71, 87, 0.5)';
        
        // Maskeleme sistemini sıfırla
        if (passwordInput.resetMasking) {
            passwordInput.resetMasking();
        }
        
        // Shake animation ekle
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.textContent = ''; // İçeriği temizle ama elementi silme
            passwordInput.style.borderColor = 'var(--matrix-green)';
            passwordInput.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.2)';
            // Input'u tekrar fokusla
            passwordInput.focus();
        }, 6000);
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

    // Yeni NeuroHeves Eğitim Metodları
    showRandomQuestions() {
        const questions = [
            // RADYOLOJİ FİZİĞİ TEMELLERİ
            "X-ray'lerin elektromanyetik spektrumdaki dalga boyu aralığı nedir?",
            "Bremsstrahlung radyasyonu nasıl oluşur?",
            "Karakteristik radyasyon ile Bremsstrahlung radyasyonu arasındaki fark nedir?",
            "kVp ve mAs parametreleri görüntü kalitesini nasıl etkiler?",
            "X-ray tüpünde anot materyali olarak tungsten neden tercih edilir?",
            "Heel etkisi (topuk etkisi) nedir ve klinik önemi nedir?",
            "ALARA prensibi nedir ve nasıl uygulanır?",
            "Deterministik ve stokastik radyasyon etkileri arasındaki fark nedir?",
            "İnvers-kare yasası (inverse square law) nedir?",
            "Pediátrik hastalarda radyasyon dozunu azaltmak için hangi teknikler kullanılır?",
            
            // BT FİZİĞİ
            "Hounsfield Unit (HU) nasıl tanımlanır? Su, hava ve kemik için HU değerleri nedir?",
            "BT'de pencere (window) ve level ayarları görüntüyü nasıl etkiler?",
            "Spiral (helical) BT ile konvansiyonel BT arasındaki farklar nelerdir?",
            "Pitch değeri nedir ve görüntü kalitesini nasıl etkiler?",
            "Multi-detector CT (MDCT) teknolojisinin avantajları nelerdir?",
            "BT'de beam hardening artifact'ı nedir ve nasıl azaltılır?",
            "Dual-energy CT'nin klinik uygulamaları nelerdir?",
            "İyotlu kontrast maddelerin farmakokinetik özellikleri nelerdir?",
            "Kontrast nefropatisi (CIN) risk faktörleri ve önleme stratejileri nelerdir?",
            "BT perfüzyon görüntülemede CBF, CBV, MTT parametreleri ne anlama gelir?",
            
            // MRG FİZİĞİ
            "T1 ve T2 relaksasyon zamanları arasındaki fark nedir?",
            "Larmor frekansı nedir ve klinik önemi nedir?",
            "Spin-echo ve gradient-echo sekansları arasındaki farklar nelerdir?",
            "TR (repetition time) ve TE (echo time) parametreleri görüntüyü nasıl etkiler?",
            "FLAIR (Fluid-Attenuated Inversion Recovery) sekansının özellikleri nelerdir?",
            "DWI (Diffusion Weighted Imaging) ve ADC (Apparent Diffusion Coefficient) ne anlama gelir?",
            "DTI (Diffusion Tensor Imaging) ve fiber tracking nedir?",
            "MR spektroskopide NAA, Cho, Cr, Lac pikleri hangi metabolitleri gösterir?",
            "Functional MRG (fMRI) nasıl çalışır? BOLD sinyali nedir?",
            "Gadolinium bazlı kontrast maddelerin T1 kısaltma mekanizması nedir?",
            
            // VASKÜLER PATOLOJİLER
            "Akut iskemik inmede Alberta Stroke Program Early CT Score (ASPECTS) nasıl hesaplanır?",
            "MRG DWI'da hiperakut inme bulguları nelerdir?",
            "Penumbra ve infarkt core arasındaki fark nedir?",
            "CT perfüzyonda 'mismatch' kavramı ne anlama gelir?",
            "Posterior reversible encephalopathy syndrome (PRES) görüntüleme bulguları nelerdir?",
            "Venöz sinüs trombozu tanısında 'empty delta sign' nedir?",
            "Serebral anevrizma rüptür risk faktörleri nelerdir?",
            "AVM Spetzler-Martin sınıflaması nedir?",
            "Moyamoya hastalığında 'puff of smoke' bulgusu nedir?",
            "Vertebral arter diseksiyonunda 'pearl and string sign' nedir?",
            
            // TÜMÖRLER VE DEMYELİNİZAN HASTALIKLAR
            "WHO grade IV glioblastoma'nın tipik MRG bulguları nelerdir?",
            "Oligodendroglioma'da calcification + T2/FLAIR mismatch bulgusu ne anlama gelir?",
            "Meningiom'da 'dural tail sign' nedir?",
            "Primer CNS lenfomasının tipik difüzyon özellikleri nelerdir?",
            "Akustik schwannoma'da 'ice cream cone' görünümü nedir?",
            "Multiple sklerozda McDonald kriterleri nelerdir?",
            "Dawson's fingers bulgusu neyi gösterir?",
            "ADEM ile MS arasındaki farklar nelerdir?",
            "Herpes ensefalitinde karakteristik tutulum paternleri nelerdir?",
            "Creutzfeldt-Jakob hastalığında 'cortical ribboning' ve 'hockey stick sign' nedir?",
            
            // ACİL RADYOLOJİ VE PEDİATRİK
            "Epidural hematom ile subdural hematom ayırıcı tanısı nedir?",
            "Subaraknoid kanama şüphesinde BT negatif ise sonraki adım nedir?",
            "Medulloblastoma tipik yaş grubu ve lokalizasyonu nedir?",
            "Dandy-Walker malformasyonu görüntüleme bulguları nelerdir?",
            "Germinal matrix hemorajisi prematüre bebeklerde nasıl derecelendirilir?"
        ];

        // 5 rastgele soru seç
        const randomQuestions = [];
        const usedIndices = new Set();
        
        while (randomQuestions.length < 5) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                randomQuestions.push(questions[randomIndex]);
            }
        }

        const questionsHtml = randomQuestions.map((q, index) => 
            `<div class="random-question" onclick="askQuestion('${q}')">
                <span class="question-number">${index + 1}</span>
                <span class="question-text">${q}</span>
            </div>`
        ).join('');

        const messagesContainer = document.querySelector('.chat-messages');
        const questionsMessage = this.createMessageElement(
            'assistant',
            `<div class="matrix-prefix">🎲 RADYOLOJİ FİZİĞİ & NEURORADYOLOJİ SORU BANKASI</div>
            <p><strong>Kapsamlı 100+ soru bankasından 5 rastgele seçim:</strong></p>
            <div class="categories-info">
                <span class="category-tag">⚛️ Radyoloji Fiziği</span>
                <span class="category-tag">🖥️ BT & MRG Teknolojisi</span>
                <span class="category-tag">🧠 Nöroradyoloji</span>
                <span class="category-tag">🩸 Vasküler Patolojiler</span>
            </div>
            <div class="questions-container">
                ${questionsHtml}
            </div>
            <p class="matrix-wisdom">"Bilgi güçtür, doğru sorular ise o gücün anahtarıdır." - NeuroHeves</p>`,
            new Date()
        );
        
        messagesContainer.appendChild(questionsMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showNeuroCases() {
        const cases = [
            {
                title: "VAKA 1: 72Y Erkek - Akut İnme",
                details: "Sol hemiparezi, afazi, NIHSS:15. Semptom başlangıcı 90dk önce. Hipertansiyon öyküsü var.",
                imaging: "Non-kontrast CT, CTA, MRG-DWI, Perfüzyon",
                question: "ASPECTS skoru nasıl hesaplanır? Trombektomi endikasyonu var mı?"
            },
            {
                title: "VAKA 2: 35Y Kadın - Ring-enhancing Lezyon", 
                details: "2 haftadır baş ağrısı, nöbet. HIV(+) hasta. T1+Gd'da multiple ring-enhancing lezyonlar.",
                imaging: "MRG T1, T2, FLAIR, DWI, T1+Gd, MR spektroskopi",
                question: "Toksoplazma vs Primer CNS lenfoma ayırıcı tanısı nasıl yapılır?"
            },
            {
                title: "VAKA 3: 8Y Çocuk - Posterior Fossa Kitlesi",
                details: "4 haftalık baş ağrısı, bulantı-kusma, ataksi. Papil ödem mevcut.",
                imaging: "MRG T1, T2, FLAIR, DWI, T1+Gd, spinal MRG",
                question: "Medulloblastoma vs Pilocytic astrocytoma ayırıcı tanı kriterleri nelerdir?"
            },
            {
                title: "VAKA 4: 42Y Kadın - Demyelinizan Hastalık",
                details: "Sağ göz görme kaybı, 2 ay sonra düzelme. Şimdi sol bacakta uyuşukluk ve güçsüzlük.",
                imaging: "MRG beyin+spinal, T2, FLAIR, T1+Gd, DWI",
                question: "McDonald kriterleri açısından MS tanısı koyulabilir mi?"
            },
            {
                title: "VAKA 5: 25Y Erkek - Akut Baş Travması",
                details: "Motosiklet kazası, GCS:12. Pupiller eşit reaktif. Fokal nörolojik bulgu yok.",
                imaging: "Non-kontrast BT, BT anjiografi",
                question: "Epidural vs subdural hematom ayırıcı tanısı ve acil müdahale kriterleri nelerdir?"
            },
            {
                title: "VAKA 6: 55Y Kadın - Subaraknoid Kanama",
                details: "Ani başlangıçlı şiddetli baş ağrısı, 'hayatımın en kötü baş ağrısı'. Enselik pozitif.",
                imaging: "Non-kontrast BT, BTA, DSA",
                question: "Hunt-Hess grade ve Fisher scale nasıl değerlendirilir?"
            }
        ];

        const casesHtml = cases.map((c, index) => 
            `<div class="neuro-case" onclick="askQuestion('${c.question}')">
                <div class="case-header">
                    <span class="case-number">VAKA ${index + 1}</span>
                    <span class="case-title">${c.title}</span>
                </div>
                <div class="case-details">${c.details}</div>
                <div class="case-imaging">Görüntüleme: ${c.imaging}</div>
            </div>`
        ).join('');

        const messagesContainer = document.querySelector('.chat-messages');
        const casesMessage = this.createMessageElement(
            'assistant',
            `<div class="matrix-prefix">🧠 NEURO VAKALAR</div>
            <p><strong>Gerçek klinik vakalar - analiz et ve sor:</strong></p>
            <div class="cases-container">
                ${casesHtml}
            </div>
            <p class="matrix-wisdom">"Her vaka, bir öğrenme fırsatıdır." - NeuroHeves</p>`,
            new Date()
        );
        
        messagesContainer.appendChild(casesMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showLearningPath() {
        const paths = [
            {
                level: "Fizik Temelleri",
                icon: "⚛️",
                topics: ["X-ray fiziği", "Radyasyon güvenliği", "ALARA prensibi", "Elektromanyetik spektrum", "Hounsfield Unit"],
                duration: "3-4 hafta"
            },
            {
                level: "BT & MRG Fiziği", 
                icon: "🔬",
                topics: ["T1/T2 relaksasyon", "Larmor frekansı", "TR/TE parametreleri", "Kontrast mekaniği", "Artefaktlar"],
                duration: "6-8 hafta"
            },
            {
                level: "Temel Patolojiler",
                icon: "🧠",
                topics: ["İnme görüntüleme", "Travma radyolojisi", "Enfeksiyon tanısı", "Tümör sınıflandırması"],
                duration: "8-10 hafta"
            },
            {
                level: "İleri Teknikler",
                icon: "�", 
                topics: ["DWI/DTI", "Perfüzyon MRG", "MR spektroskopi", "Functional MRI", "AI radyoloji"],
                duration: "10-12 hafta"
            },
            {
                level: "Klinik Uzmanlık",
                icon: "⚕️",
                topics: ["Acil radyoloji", "Pediatrik nöro", "İntervensiyon", "Multidisipliner yaklaşım"],
                duration: "12-16 hafta"
            },
            {
                level: "Araştırma & Yenilik",
                icon: "🔮",
                topics: ["Akademik yazım", "Araştırma etiği", "AI entegrasyonu", "Gelecek teknolojiler"],
                duration: "Yaşam boyu"
            }
        ];

        const pathsHtml = paths.map(p => 
            `<div class="learning-level">
                <div class="level-header">
                    <span class="level-icon">${p.icon}</span>
                    <span class="level-name">${p.level}</span>
                    <span class="level-duration">${p.duration}</span>
                </div>
                <div class="level-topics">
                    ${p.topics.map(topic => `<span class="topic-tag" onclick="askQuestion('${topic} hakkında detaylı bilgi ver')">${topic}</span>`).join('')}
                </div>
            </div>`
        ).join('');

        const messagesContainer = document.querySelector('.chat-messages');
        const pathMessage = this.createMessageElement(
            'assistant',
            `<div class="matrix-prefix">🛤️ ÖĞRENME YOLU</div>
            <p><strong>Neuroradyoloji öğrenme rotası - seviyeni seç:</strong></p>
            <div class="learning-paths">
                ${pathsHtml}
            </div>
            <p class="matrix-wisdom">"Yolu bilmek ile yolu yürümek arasında fark vardır." - Morpheus</p>`,
            new Date()
        );
        
        messagesContainer.appendChild(pathMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
    window.neuroHevesMatrix = neuroHevesMatrix;
    
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

// Yeni NeuroHeves Eğitim Fonksiyonları
window.showRandomQuestions = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.showRandomQuestions();
    }
};

window.showNeuroCases = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.showNeuroCases();
    }
};

window.showLearningPath = function() {
    if (neuroHevesInstance) {
        neuroHevesInstance.showLearningPath();
    }
};

window.checkPassword = function() {
    if (window.neuroHevesMatrix) {
        window.neuroHevesMatrix.checkPassword();
    }
};