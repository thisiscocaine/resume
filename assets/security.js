// Deep Secure Validation Script
    (function () {
      try {
        const granted = localStorage.getItem('access_granted');
        const hash = localStorage.getItem('access_hash');
        const expectedHash = btoa("ARYAN_SECURE_" + granted);

        // Deep validation
        if (granted !== "true" || hash !== expectedHash) {
          throw new Error("Invalid access");
        }

        // Anti-tamper: delay content if inspection is suspected
        Object.defineProperty(window, 'console', {
          get: function () {
            window.location.href = "https://login.aaryan.com.np";
            return {};
          }
        });

        document.addEventListener("DOMContentLoaded", function () {
          document.getElementById("content").style.display = "block";
        });

      } catch (e) {
        window.location.replace("https://login.aaryan.com.np");
      }
    })();
