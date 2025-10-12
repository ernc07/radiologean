# HevX - Matrix Neuroradiology Assistant
## RadiologeaN Integration Package

### 📋 Overview
HevX, RadiologeaN sitesine entegre edilecek Matrix temalı AI neuroradyoloji asistanıdır. `/HevX` sayfasında çalışacak şekilde tasarlanmıştır.

### 🎯 Features
- ✅ Matrix Rain arka plan efekti
- ✅ "Wake up, Heves..." scrolling text
- ✅ HevX authentication system (Code: 2113)
- ✅ Google Gemini 2.0 Flash AI integration
- ✅ Responsive design
- ✅ Demo mode (API olmadan çalışır)

### 📁 Package Contents
```
HevX-page/
├── HevX.html              # Standalone HTML version
├── HevX.css               # Matrix themed styles
├── page.tsx               # Next.js component version
├── hevx-assistant.js      # Core AI system
└── README.md              # This file
```

### 🚀 RadiologeaN Integration

#### Option 1: Next.js Route (Recommended)
1. **Create HevX route in Next.js app:**
   ```
   web-platform/src/app/HevX/
   ├── page.tsx           # Copy from HevX-page/page.tsx
   └── globals.css        # Add HevX styles
   ```

2. **Add to main navigation:**
   ```tsx
   // In main layout or navigation component
   <Link href="/HevX" className="nav-link">
     🧠 AI Assistant
   </Link>
   ```

#### Option 2: Static HTML Integration
1. **Place HTML file:**
   ```
   web-platform/public/HevX.html
   ```

2. **Link from main site:**
   ```html
   <a href="/HevX.html">🧠 HevX AI Assistant</a>
   ```

### 🔑 API Configuration
```javascript
// In your Next.js config or environment
const GEMINI_API_KEY = "your-gemini-api-key";

// Pass to HevX component
<HevXPage apiKey={GEMINI_API_KEY} />
```

### 🎮 Usage
1. **Authentication:** User enters code `2113`
2. **AI Chat:** Ask neuroradiology questions
3. **Matrix Theme:** Full Matrix experience

### 🔧 Customization
- **API Key:** Set `NEXT_PUBLIC_GEMINI_API_KEY` environment variable
- **Theme:** Modify CSS colors and effects
- **Messages:** Update scrolling text messages
- **Access Code:** Change from `2113` to custom code

### 📱 Responsive Support
- Desktop: Full Matrix experience
- Mobile: Optimized for smaller screens
- Tablet: Balanced layout

### 🛠 Development
```bash
# For Next.js development
npm run dev

# For static testing
# Open HevX.html in browser
```

### 🔒 Security
- HevX access code protection
- API key environment variable storage
- Client-side validation

### 📊 Performance
- Canvas-based Matrix rain (60 FPS)
- Optimized for production
- Lazy loading support

### 🎯 Integration Checklist
- [ ] Copy HevX files to RadiologeaN project
- [ ] Set up API key environment variable
- [ ] Add navigation link to main site
- [ ] Test authentication flow
- [ ] Verify AI responses
- [ ] Test on mobile devices
- [ ] Deploy to radiologean.com/HevX

### 🌐 Live URL
After integration: `https://radiologean.com/HevX`

### 🎬 Matrix References
- Access code: 2113 (Year of Neo's awakening)
- Scrolling messages: Matrix movie quotes
- Green matrix rain effect
- "Wake up, Heves" theme

### 🆘 Support
For integration support or customization:
- Check console for error messages
- Verify API key configuration
- Test in different browsers
- Ensure HTTPS for production

---
*"Welcome to the real world of neuroradiology, Heves."*