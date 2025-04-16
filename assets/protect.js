(function() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    // Disable keyboard shortcuts (Ctrl+U, Ctrl+Shift+I, F12, etc.)
    document.addEventListener('keydown', function(e) {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.ctrlKey && e.key === 'U') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            e.key === 'PrintScreen') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    
    // Prevent opening developer tools by checking for window size changes
    (function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        
        function checkDevTools() {
            if (window.innerWidth < width || window.innerHeight < height || 
                window.outerWidth < width || window.outerHeight < height) {
                // Developer tools might be open
                document.body.innerHTML = '<h1 style="color:red;text-align:center;">Developer Tools Detected!</h1>';
                window.location.reload();
            }
        }
        
        setInterval(checkDevTools, 1000);
    })();
    
    // Disable iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // Clear console on any console opening attempt
    var consoleOpen = false;
    setInterval(function() {
        if (!consoleOpen) {
            consoleOpen = true;
            console.clear();
            console.log('Access restricted');
            consoleOpen = false;
        }
    }, 1000);
    
    // Disable print screen
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('').catch(function() {});
            alert('Print Screen disabled');
        }
    });
    
    // Protection against common debuggers
    function debuggerProtection() {
        var start = new Date().getTime();
        debugger;
        var end = new Date().getTime();
        if (end - start > 100) {
            document.body.innerHTML = '<h1 style="color:red;text-align:center;">Debugger Detected!</h1>';
            window.location.reload();
        }
    }
    
    setInterval(debuggerProtection, 1000);
    
    // Disable saving page
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
            e.preventDefault();
            alert('Page saving disabled');
        }
    });
})();
