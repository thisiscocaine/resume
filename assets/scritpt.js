(function() {
    'use strict';
    
    // Block all possible right-click actions
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);
    
    // Block text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Block drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Block all keyboard shortcuts aggressively
    document.addEventListener('keydown', function(e) {
        // Block Ctrl/CMD + any key combinations
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block individual special keys
        const blockedKeys = [
            'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
            'PrintScreen', 'ScrollLock', 'Pause', 'Insert', 'Delete', 'Home', 'End',
            'PageUp', 'PageDown'
        ];
        
        if (blockedKeys.includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Shift + any key combinations
        if (e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);
    
    // Advanced developer tools detection
    (function() {
        const devtools = {
            open: false,
            orientation: null
        };
        
        const threshold = 160;
        
        function emitEvent(isOpen) {
            if (isOpen !== devtools.open) {
                devtools.open = isOpen;
                if (isOpen) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }
            }
        }
        
        setInterval(() => {
            const width = window.outerWidth - window.innerWidth;
            const height = window.outerHeight - window.innerHeight;
            
            if (width > threshold || height > threshold) {
                emitEvent(true);
            }
        }, 500);
        
        // Console method protection
        const consoleMethods = ['log', 'warn', 'error', 'info', 'debug', 'table', 'dir'];
        consoleMethods.forEach(method => {
            const original = console[method];
            console[method] = function() {
                emitEvent(true);
                original.apply(console, arguments);
            };
        });
    })();
    
    // Block iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // Block print screen
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('').catch(() => {});
        }
    });
    
    // Anti-debugging techniques
    function debuggerProtection() {
        setInterval(function() {
            (function() {
                return false;
            }
            ['constructor']('debugger')
            ['call']());
        }, 5000);
    }
    
    debuggerProtection();
    
    // Block page saving
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'o', 'u', 'i', 'j'].includes(e.key.toLowerCase())) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    
    // Block view source via menu bar
    document.onmenu = function() {
        return false;
    };
    
    // Block console.clear attempts
    const originalClear = console.clear;
    console.clear = function() {
        setTimeout(() => {
            window.location.reload();
        }, 100);
        originalClear.apply(console, arguments);
    };
})();
