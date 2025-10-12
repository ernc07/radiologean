#!/bin/bash
# NeuroHeves Deployment Script for RadiolegeaN

echo "🚀 Deploying NeuroHeves to radiologean.com/neuroheves/"

# Create deployment directory
mkdir -p neuroheves-deploy

# Copy core files
cp index.html neuroheves-deploy/
cp style.css neuroheves-deploy/
cp app.js neuroheves-deploy/
cp matrixRain.js neuroheves-deploy/
cp matrixScrollingText.js neuroheves-deploy/
cp package.json neuroheves-deploy/

# Copy sources directory
cp -r sources/ neuroheves-deploy/

# Create .htaccess for proper routing
cat > neuroheves-deploy/.htaccess << 'EOF'
# NeuroHeves .htaccess Configuration

# Enable HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 week"
</IfModule>

# GZIP Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
EOF

echo "✅ Deployment package created in 'neuroheves-deploy/' directory"
echo "📤 Ready to upload to radiologean.com/neuroheves/"
echo ""
echo "🔧 Upload Instructions:"
echo "1. Upload all files in 'neuroheves-deploy/' to your web server"
echo "2. Place in: /public_html/neuroheves/"  
echo "3. Set permissions: chmod 755 for folders, chmod 644 for files"
echo "4. Test: https://radiologean.com/neuroheves/"
echo ""
echo "🎯 Features enabled:"
echo "  - Matrix Rain Background ✅"
echo "  - Wake up, Heves Messages ✅" 
echo "  - HevX Access Code (2113) ✅"
echo "  - Gemini 2.5 Flash AI ✅"
echo "  - 68 PDF Resources ✅"
echo "  - Mobile Responsive ✅"
echo ""
echo "💚 NeuroHeves x RadiolegeaN deployment ready!"