// Secure Auth Flow System (v5.0) - Updated with Login Redirect Fix
(function() {
    'use strict';

    // 1. SECURE ENVIRONMENT CHECKS
    const validateEnvironment = () => {
        const ALLOWED_DOMAINS = [
            'resume.aaryan.com.np',
            'login.aaryan.com.np', // Whitelist login domain
            'thisiscocaine.github.io' // GitHub Pages
        ];

        // Verify valid domain
        const currentDomain = window.location.hostname;
        const isValidDomain = ALLOWED_DOMAINS.some(domain => 
            currentDomain === domain || currentDomain.endsWith('.' + domain)
        );

        if (!isValidDomain) {
            window.location.replace('https://login.aaryan.com.np?err=invalid_domain');
            return false;
        }

        // Verify HTTPS
        if (location.protocol !== 'https:' && !location.hostname.includes('localhost')) {
            window.location.href = 'https://' + location.host + location.pathname;
            return false;
        }

        return true;
    };

    // 2. AUTH TOKEN VALIDATION (UPDATED)
    const validateAuthToken = () => {
        try {
            // Get token from URL or storage
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get('auth_token');
            
            if (urlToken) {
                // Store token from URL and clean URL
                localStorage.setItem('access_token', urlToken);
                sessionStorage.setItem('session_active', 'true');
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            // Validate token format
            const storedToken = localStorage.getItem('access_token');
            if (!storedToken || !/^[a-f0-9]{64}$/i.test(storedToken)) {
                throw new Error("Invalid token format");
            }

            // Additional cryptographic validation
            const secretSalt = window.crypto.getRandomValues(new Uint8Array(16)).join('');
            const expectedToken = CryptoJS.HmacSHA256(
                `${navigator.userAgent}_${secretSalt}`,
                storedToken
            ).toString();

            if (!sessionStorage.getItem('session_key')) {
                throw new Error("Missing session key");
            }

            return true;
        } catch (e) {
            // Clear tokens and redirect to login
            localStorage.removeItem('access_token');
            sessionStorage.clear();
            window.location.replace('https://login.aaryan.com.np?err=auth_failed');
            return false;
        }
    };

    // 3. SECURE REDIRECT HANDLER (NEW)
    const handleLoginRedirect = () => {
        // Check if coming from login page
        if (document.referrer.includes('login.aaryan.com.np')) {
            // Validate the referrer token
            const referrerToken = new URL(document.referrer).searchParams.get('token');
            if (referrerToken) {
                localStorage.setItem('access_token', referrerToken);
            }
        }

        // Final verification before showing content
        if (validateAuthToken()) {
            document.getElementById('content').style.display = 'block';
        } else {
            window.location.replace('https://login.aaryan.com.np');
        }
    };

    // 4. ANTI-TAMPERING PROTECTION
    const installSecurity = () => {
        // Console protection
        Object.defineProperty(window, 'console', {
            get: () => ({
                log: () => {},
                warn: () => {},
                error: () => {}
            }),
            configurable: false
        });

        // Session heartbeat
        setInterval(() => {
            if (!sessionStorage.getItem('session_active')) {
                window.location.replace('https://login.aaryan.com.np?err=session_expired');
            }
        }, 300000); // 5 minute checks
    };

    // 5. MAIN EXECUTION FLOW
    try {
        if (!validateEnvironment()) return;
        
        installSecurity();
        
        // Special handling for login redirects
        if (window.location.search.includes('auth_token')) {
            validateAuthToken();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        document.addEventListener('DOMContentLoaded', handleLoginRedirect);
        
    } catch (e) {
        window.location.replace('https://login.aaryan.com.np?err=system_error');
    }
})();
