// src/components/SmartsuppChat.jsx
import { useEffect } from 'react';

const SmartsuppChat = () => {
  useEffect(() => {
    console.log('SmartsuppChat component mounted'); // Debug

    // Prevent duplicate script injection
    if (document.getElementById('smartsupp-script')) {
      console.log('Script already exists, skipping');
      return;
    }

    // YOUR CORRECT KEY (note the last 4 digits: 8887, not 8888)
    const smartsuppKey = '4c60dd1f7ded53c0807cbb0e685bc474bf2a8887';

    // Set the key before loading the script (as per Smartsupp instructions)
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = smartsuppKey;

    // Create the script element exactly as Smartsupp provides
    const script = document.createElement('script');
    script.id = 'smartsupp-script';
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.src = 'https://www.smartsuppchat.com/loader.js?';

    // Ensure the smartsupp function is defined before the script loads
    if (!window.smartsupp) {
      window.smartsupp = function() {
        window.smartsupp._.push(arguments);
      };
      window.smartsupp._ = [];
    }

    // Optional: log success/error
    script.onload = () => {
      console.log('Smartsupp script loaded successfully');
      // After script loads, verify the widget is initialised
      if (window.smartsupp) {
        console.log('Smartsupp function exists');
      } else {
        console.error('Smartsupp function missing after load');
      }
    };
    script.onerror = (err) => {
      console.error('Failed to load Smartsupp script:', err);
    };

    document.body.appendChild(script);

    // Cleanup (optional, but keep for completeness)
    return () => {
      // We typically don't remove the script to keep chat persistent,
      // but you can uncomment if needed.
      // const existingScript = document.getElementById('smartsupp-script');
      // if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
};

export default SmartsuppChat;