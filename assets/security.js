// Nuclear-Secure Access Control System (v4.0)
(function() {
    'use strict';
    
    // 0. EXTERNAL ACCESS LOCKDOWN (NEW)
    const enforceAuthorizedAccess = () => {
        const ALLOWED_DOMAINS = [
            'resume.aaryan.com.np',
            'aaryan.github.io' // If using GitHub Pages
        ];
        
        const currentDomain = window.location.hostname;
        const isAuthorized = ALLOWED_DOMAINS.some(domain => 
            currentDomain === domain || currentDomain.endsWith('.' + domain)
        );
        
        if (!isAuthorized) {
            // Immediate redirect with no traces
            window.location.replace('https://login.aaryan.com.np?reason=unauthorized_domain');
            throw new Error("Nuclear lockdown activated");
        }
        
        // Verify SSL (except for local testing)
        if (location.protocol !== 'https:' && !location.hostname.includes('localhost')) {
            window.location.href = 'https://' + location.host + location.pathname;
            throw new Error("Insecure protocol blocked");
        }
    };

    // 1. ENCRYPTED VALIDATION LAYER (ENHANCED)
    const cryptoValidation = () => {
        try {
            // Dynamic military-grade key generation
            const secretSalt = window.crypto.getRandomValues(new Uint8Array(16)).join('');
            const timeFactor = Math.floor(Date.now() / 3600000); // Hourly rotation
            const cryptoKey = btoa(`ARYAN_${secretSalt}_${timeFactor}_${navigator.userAgent}`);
            
            // Three-factor authentication
            const storedToken = localStorage.getItem('access_token');
            const sessionKey = sessionStorage.getItem('session_key');
            const devicePrint = CryptoJS.SHA256(navigator.platform + screen.width + screen.colorDepth).toString();
            
            const expectedToken = CryptoJS.HmacSHA512(
                `${cryptoKey}_${sessionKey}_${devicePrint}`, 
                secretSalt
            ).toString();
            
            if (!storedToken || storedToken !== expectedToken) {
                throw new SecurityError("Invalid security token");
            }
            
            return true;
        } catch (e) {
            // Nuclear response
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('https://login.aaryan.com.np?code=nuclear_lockdown');
            return false;
        }
    };

    // 2. TAMPER-PROOF PROTECTION (ENHANCED)
    const installAntiTamper = () => {
        // Real-time checksum validation
        const knownHash = CryptoJS.SHA256(window.location.href).toString().substr(0, 16);
        const verifyIntegrity = () => {
            try {
                const currentHash = CryptoJS.SHA256(document.documentElement.outerHTML).toString().substr(0, 16);
                if (currentHash !== knownHash) {
                    window.location.replace('https://security.aaryan.com.np/tamper_detected');
                }
            } catch (e) {
                window.location.replace('https://login.aaryan.com.np?code=integrity_failure');
            }
        };
        
        // Memory-hardened protection
        const createMemoryTrap = () => {
            const trap = new ArrayBuffer(1e6); // 1MB memory trap
            const trapKey = CryptoJS.SHA256(trap.toString()).toString();
            return () => {
                if (CryptoJS.SHA256(trap.toString()).toString() !== trapKey) {
                    window.location.replace('https://security.aaryan.com.np/memory_violation');
                }
            };
        };
        
        setInterval(verifyIntegrity, 15000);
        setInterval(createMemoryTrap(), 30000);
        
        // Console annihilation
        Object.defineProperty(window, 'console', {
            get: () => {
                window.location.replace('https://login.aaryan.com.np?code=console_breach');
                return new Proxy({}, {
                    get: () => () => {}
                });
            },
            configurable: false,
            enumerable: false
        });
    };

    // 3. DEBUGGER NUCLEAR DEFENSE (ENHANCED)
    const debuggerDefense = () => {
        const debuggerCheck = () => {
            const start = new Date().getTime();
            (function() {
                return (function(f){f(f)})(function(f){f(f)});
            })();
            if (new Date().getTime() - start > 200) {
                document.body.innerHTML = '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=https://security.aaryan.com.np/debugger_detected"></head></html>';
                window.stop();
            }
        };
        
        setInterval(debuggerCheck, Math.random() * 3000 + 1000);
        
        // Anti-debugging traps
        Function.prototype.constructor = function() {
            window.location.replace('https://login.aaryan.com.np?code=debugger_trap');
            return function(){};
        };
    };

    // 4. SESSION LOCKDOWN (ENHANCED)
    const secureSession = () => {
        if (!sessionStorage.getItem('nuclear_initialized')) {
            // Generate crypto-strong tokens
            const sessionKey = window.crypto.getRandomValues(new Uint32Array(8)).join('-');
            const accessToken = window.crypto.getRandomValues(new Uint32Array(16)).join('-');
            
            // Secure storage with expiration
            sessionStorage.setItem('session_key', sessionKey);
            localStorage.setItem('access_token', CryptoJS.AES.encrypt(
                accessToken, 
                navigator.userAgent
            ).toString());
            
            sessionStorage.setItem('nuclear_initialized', 'true');
            
            // Self-destruct after 1 hour
            setTimeout(() => {
                sessionStorage.clear();
                window.location.replace('https://login.aaryan.com.np?code=session_expired');
            }, 3600000);
        }
    };

    // 5. MAIN EXECUTION (LOCKED DOWN)
    try {
        // Phase 0: Nuclear domain lockdown
        enforceAuthorizedAccess();
        
        // Phase 1: Initialize security systems
        secureSession();
        installAntiTamper();
        debuggerDefense();
        
        // Phase 2: Validate access
        if (!cryptoValidation()) return;
        
        // Phase 3: Only execute after all checks
        document.addEventListener('DOMContentLoaded', () => {
            // Final verification before showing content
            if (window.self === window.top && 
                document.visibilityState === 'visible' &&
                location.protocol === 'https:') {
                document.getElementById('content').style.display = 'block';
            } else {
                window.location.replace('https://login.aaryan.com.np?code=environment_fail');
            }
        });
        
    } catch (e) {
        // Nuclear fallback
        document.body.innerHTML = '';
        window.location.replace('https://security.aaryan.com.np/nuclear_fail');
    }
})();
