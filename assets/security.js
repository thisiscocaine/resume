// Secure Auth Flow System (v5.1)
(function() {
    'use strict';

    // 1. ENVIRONMENT CHECKS
    const validateEnvironment = () => {
        const ALLOWED_DOMAINS = [
            'resume.aaryan.com.np',
            'login.aaryan.com.np'
        ];

        const currentDomain = window.location.hostname;
        if (!ALLOWED_DOMAINS.includes(currentDomain)) {
            window.location.replace('https://login.aaryan.com.np?err=invalid_domain');
            return false;
        }
        return true;
    };

    // 2. TOKEN VALIDATION (UPDATED)
    const validateAuthToken = () => {
        try {
            // Get token from session storage
            const authToken = sessionStorage.getItem('temp_auth');
            
            // Basic validation
            if (!authToken || !/^[a-f0-9]{64}$/.test(authToken)) {
                throw new Error("Invalid token");
            }

            // Clean up
            sessionStorage.removeItem('temp_auth');
            
            // Store for session
            localStorage.setItem('auth_token', authToken);
            sessionStorage.setItem('session_active', 'true');
            
            return true;
        } catch (e) {
            localStorage.removeItem('auth_token');
            sessionStorage.clear();
            window.location.replace('https://login.aaryan.com.np?err=auth_failed');
            return false;
        }
    };

    // 3. MAIN FLOW
    const init = () => {
        if (!validateEnvironment()) return;
        
        // Special handling for login redirects
        if (document.referrer.includes('login.aaryan.com.np')) {
            if (!validateAuthToken()) return;
        }
        
        // Regular session check
        if (!localStorage.getItem('auth_token')) {
            window.location.replace('https://login.aaryan.com.np');
            return;
        }

        document.getElementById('content').style.display = 'block';
    };

    document.addEventListener('DOMContentLoaded', init);
})();
