// GitHub Pages Ultra-Secure Validation System (v3.0)
(function() {
    'use strict';
    
    // 1. ENVIRONMENT VALIDATION (GitHub Pages Specific)
    const validateEnvironment = () => {
        // Verify we're running on GitHub Pages
        if (!window.location.hostname.endsWith('.github.io') && 
            !window.location.hostname.endsWith('aaryan.com.np')) {
            throw new Error("Invalid hosting environment");
        }
        
        // Verify no iframe embedding
        if (window.self !== window.top) {
            window.top.location.href = window.self.location.href;
            return false;
        }
        return true;
    };

    // 2. CRYPTOGRAPHIC ACCESS CONTROL
    const validateAccess = () => {
        try {
            // Dynamic key generation (changes daily)
            const dateKey = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const domainKey = window.location.hostname.split('').reverse().join('');
            const masterKey = btoa(`GHP_${domainKey}_${dateKey}`);
            
            // Multi-layer validation
            const sessionToken = sessionStorage.getItem('gh_session');
            const localToken = localStorage.getItem('gh_persistent');
            
            if (!sessionToken || !localToken) {
                throw new Error("Missing access tokens");
            }
            
            // Verify token structure
            const validSession = CryptoJS.HmacSHA256(sessionToken, masterKey).toString();
            const validLocal = CryptoJS.HmacSHA512(localToken, masterKey).toString();
            
            if (localToken !== validLocal || sessionToken !== validSession) {
                throw new Error("Invalid token verification");
            }
            
            return true;
        } catch (e) {
            // Nuclear response
            document.body.innerHTML = '';
            window.location.replace('https://login.aaryan.com.np?err=403');
            return false;
        }
    };

    // 3. ADVANCED ANTI-TAMPERING
    const installProtections = () => {
        // Console protection
        const consoleHandler = {
            get: function(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                window.location.href = 'https://security.aaryan.com.np/breach';
                return function() {};
            }
        };
        
        const secureConsole = new Proxy(console, consoleHandler);
        window.console = secureConsole;
        
        // Source code protection
        Object.defineProperty(document, 'scripts', {
            get: function() {
                window.location.replace('https://security.aaryan.com.np/source_attempt');
                return [];
            },
            configurable: false
        });
    };

    // 4. SESSION INITIALIZATION
    const initSecureSession = () => {
        if (!sessionStorage.getItem('gh_initialized')) {
            // Generate crypto-strong tokens
            const sessionToken = window.crypto.getRandomValues(new Uint32Array(4)).join('');
            const persistentToken = window.crypto.getRandomValues(new Uint32Array(8)).join('');
            
            // Store tokens
            sessionStorage.setItem('gh_session', sessionToken);
            localStorage.setItem('gh_persistent', persistentToken);
            sessionStorage.setItem('gh_initialized', 'true');
            
            // Set short expiration (8 hours)
            setTimeout(() => {
                sessionStorage.removeItem('gh_session');
                sessionStorage.removeItem('gh_initialized');
            }, 28800000);
        }
    };

    // 5. MAIN EXECUTION
    try {
        // Phase 1: Environment checks
        if (!validateEnvironment()) return;
        
        // Phase 2: Install protections
        installProtections();
        
        // Phase 3: Session management
        initSecureSession();
        
        // Phase 4: Access validation
        if (!validateAccess()) return;
        
        // Only show content after all checks pass
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('content').style.display = 'block';
        });
        
    } catch (e) {
        // Final security fallback
        document.body.innerHTML = '';
        window.location.replace('https://security.aaryan.com.np/fatal');
    }
})();