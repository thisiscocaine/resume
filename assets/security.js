// Simple XOR-based decoding for session token
function decodeToken(encodedToken, key) {
    const decoded = atob(encodedToken); // Base64 decode
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

// Access control logic
(function () {
    const authToken = sessionStorage.getItem('authToken');
    const authTimestamp = sessionStorage.getItem('authTimestamp');
    const currentTime = Date.now();
    const tokenValidityPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
    const key = 'aaryanSecretKey'; // Must match the key used in login page

    // Check if token exists and is valid
    if (!authToken || !authTimestamp) {
        showAccessDenied();
        return;
    }

    // Check if token has expired
    if (currentTime - parseInt(authTimestamp) > tokenValidityPeriod) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authTimestamp');
        showAccessDenied();
        return;
    }

    // Decode and validate token format
    try {
        const decodedToken = decodeToken(authToken, key);
        const [timestamp, pin] = decodedToken.split(':');
        if (!timestamp || !pin || !/^\d{5}$/.test(pin) || parseInt(timestamp) !== parseInt(authTimestamp)) {
            showAccessDenied();
            return;
        }
    } catch (e) {
        console.error('Token validation failed:', e);
        showAccessDenied();
        return;
    }

    // If all checks pass, allow access (do nothing, let the page load)

    function showAccessDenied() {
        document.body.innerHTML = `
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a1a1a, #2b2b2b, #1a1a1a);
                    font-family: 'Playfair Display', serif;
                    color: #fff;
                    text-align: center;
                    margin: 0;
                }
                .access-denied {
                    background: rgba(20, 20, 30, 0.9);
                    padding: 3rem;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(20px);
                    border: 2px solid rgba(255, 215, 0, 0.3);
                }
                h2 {
                    color: #e0115f;
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }
                button {
                    padding: 0.9rem 2rem;
                    border: none;
                    border-radius: 35px;
                    background: linear-gradient(45deg, #e0115f, #ffd700);
                    color: #fff;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    box-shadow: 0 5px 25px rgba(224, 17, 95, 0.6);
                }
                button:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.8);
                    background: linear-gradient(45deg, #ffd700, #e0115f);
                }
            </style>
            <div class="access-denied">
                <h2>Access Denied</h2>
                <p>Please login to access this page.</p>
                <button onclick="window.location.href='https://aaryan.com.np/'">Login</button>
            </div>
        `;
    }
})();
