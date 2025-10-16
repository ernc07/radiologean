/**
 * Radiologean Auth Manager
 * HevX.html ve tüm site için merkezi auth kontrol sistemi
 */

class RadiologeanAuth {
    constructor() {
        this.session = null;
        this.init();
    }

    // Auth sistemini başlat
    init() {
        this.loadSession();
        this.setupGlobalAccess();
    }

    // Session'ı yükle
    loadSession() {
        const sessionData = localStorage.getItem('radiologean_session');
        if (sessionData) {
            this.session = JSON.parse(sessionData);
            
            // Session geçerliliğini kontrol et
            if (!this.isSessionValid()) {
                this.logout();
            }
        }
    }

    // Session geçerli mi?
    isSessionValid() {
        if (!this.session) return false;
        
        const loginTime = new Date(this.session.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 3600);
        
        // "Beni Hatırla" aktifse 7 gün, değilse 24 saat
        const maxHours = this.session.rememberMe ? 168 : 24;
        
        return hoursDiff < maxHours;
    }

    // Kullanıcı giriş yapmış mı?
    isAuthenticated() {
        return this.session !== null && this.isSessionValid();
    }

    // Kullanıcı rolünü al
    getUserRole() {
        return this.session ? this.session.role : null;
    }

    // Kullanıcı bilgilerini al
    getUserInfo() {
        return this.session ? {
            username: this.session.username,
            email: this.session.email,
            role: this.session.role
        } : null;
    }

    // Belirli bir role sahip mi?
    hasRole(role) {
        return this.session && this.session.role === role;
    }

    // Architect mi?
    isArchitect() {
        return this.hasRole('Architect');
    }

    // Moderator mi?
    isModerator() {
        return this.hasRole('Moderator') || this.isArchitect();
    }

    // Çıkış yap
    logout() {
        localStorage.removeItem('radiologean_session');
        this.session = null;
        
        // Login sayfasına yönlendir
        window.location.href = '/auth';
    }

    // Global erişim kontrolü
    setupGlobalAccess() {
        // HevX için özel kontrol
        if (window.location.pathname.includes('HevX.html')) {
            this.checkHevXAccess();
        }
    }

    // HevX erişim kontrolü
    checkHevXAccess() {
        if (!this.isAuthenticated()) {
            // Kullanıcı giriş yapmamış, overlay göster
            this.showHevXLoginOverlay();
        } else {
            // Kullanıcı giriş yapmış, doğrudan erişim ver
            this.grantHevXAccess();
        }
    }

    // HevX login overlay'i göster
    showHevXLoginOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'radiologean-auth-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        overlay.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 0 40px rgba(20, 184, 166, 0.3);
                max-width: 400px;
                width: 90%;
                text-align: center;
            ">
                <h2 style="
                    font-size: 32px;
                    font-weight: bold;
                    background: linear-gradient(to right, #14b8a6, #06b6d4);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 20px;
                ">HevX Giriş Gerekli</h2>
                
                <p style="
                    color: #94a3b8;
                    margin-bottom: 30px;
                    font-size: 16px;
                ">
                    HevX sistemine erişim için Radiologean hesabınızla giriş yapmanız gerekmektedir.
                </p>

                <button onclick="window.location.href='/auth'" style="
                    background: #14b8a6;
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-right: 10px;
                ">Giriş Yap</button>

                <button onclick="window.location.href='/'" style="
                    background: #334155;
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                ">Ana Sayfa</button>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // HevX erişimi ver
    grantHevXAccess() {
        // Mevcut HevX password sistemini devre dışı bırak
        const passwordScreen = document.querySelector('.password-screen');
        if (passwordScreen) {
            passwordScreen.style.display = 'none';
        }

        // HevX'i authenticate olmuş olarak işaretle
        if (window.neuroHeves) {
            window.neuroHeves.isAuthenticated = true;
            window.neuroHeves.currentUser = this.getUserInfo();
        }

        // Kullanıcı bilgisini göster
        this.showUserInfo();
    }

    // Kullanıcı bilgisini göster
    showUserInfo() {
        const userInfo = this.getUserInfo();
        if (!userInfo) return;

        const userBadge = document.createElement('div');
        userBadge.id = 'radiologean-user-badge';
        userBadge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(20, 184, 166, 0.2);
            border: 1px solid #14b8a6;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #14b8a6;
            font-size: 14px;
            backdrop-filter: blur(10px);
        `;

        userBadge.innerHTML = `
            <span>👤 ${userInfo.username}</span>
            <span style="
                background: #14b8a6;
                color: white;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
            ">${userInfo.role}</span>
            <button onclick="radiologeanAuth.logout()" style="
                background: transparent;
                border: 1px solid #14b8a6;
                color: #14b8a6;
                padding: 4px 12px;
                border-radius: 12px;
                cursor: pointer;
                font-size: 12px;
            ">Çıkış</button>
        `;

        document.body.appendChild(userBadge);
    }
}

// Global instance oluştur
const radiologeanAuth = new RadiologeanAuth();

// Global olarak eriş
window.radiologeanAuth = radiologeanAuth;
