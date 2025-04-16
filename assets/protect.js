(function() {
    'use strict';
    
    // Block all possible right-click actions
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Right-click is disabled');
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
            alert('Keyboard shortcuts are disabled');
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
            alert('Function keys are disabled');
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
        const widthThreshold = window.innerWidth;
        const heightThreshold = window.innerHeight;
        
        function emitEvent(isOpen, orientation) {
            if (isOpen !== devtools.open || orientation !== devtools.orientation) {
                devtools.open = isOpen;
                devtools.orientation = orientation;
                
                if (isOpen) {
                    document.body.innerHTML = `
                        <div style="
                            position:fixed;
                            top:0;
                            left:0;
                            width:100%;
                            height:100%;
                            background:black;
                            color:red;
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            font-size:24px;
                            z-index:999999;
                        ">
                            Developer Tools Detected!<br>
                            This page will now reload.
                        </div>
                    `;
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        }
        
        setInterval(() => {
            const width = window.outerWidth - window.innerWidth;
            const height = window.outerHeight - window.innerHeight;
            
            if (width > threshold || height > threshold) {
                emitEvent(true, width > threshold ? 'vertical' : 'horizontal');
            } else {
                emitEvent(false, null);
            }
        }, 500);
        
        // Double protection by checking console methods
        const consoleMethods = ['log', 'warn', 'error', 'info', 'debug', 'table', 'dir'];
        consoleMethods.forEach(method => {
            const original = console[method];
            console[method] = function() {
                emitEvent(true, 'console');
                original.apply(console, arguments);
            };
        });
    })();
    
    // Block iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // Block print screen and clipboard access
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('').catch(() => {});
            alert('Screenshots are disabled');
        }
    });
    
    // Anti-debugging techniques
    function debuggerProtection() {
        function detectDevTool(allow) {
            if (isNaN(+allow)) {
                document.body.innerHTML = `
                    <div style="
                        position:fixed;
                        top:0;
                        left:0;
                        width:100%;
                        height:100%;
                        background:black;
                        color:red;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        font-size:24px;
                        z-index:999999;
                    ">
                        Debugger Detected!<br>
                        This page will now reload.
                    </div>
                `;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
        
        detectDevTool.toString = function() {
            detectDevTool();
        };
        
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
            alert('This action is disabled');
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
        document.body.innerHTML = `
            <div style="
                position:fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:black;
                color:red;
                display:flex;
                justify-content:center;
                align-items:center;
                font-size:24px;
                z-index:999999;
            ">
                Unauthorized console access detected!<br>
                This page will now reload.
            </div>
        `;
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        originalClear.apply(console, arguments);
    };
})();
