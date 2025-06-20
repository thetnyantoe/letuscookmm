import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToggleProvider from './pages/ToggleContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Move clientId to environment variable
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 
                '614659359489-0752n5dj1h4q03t0a2fcquvsacsjplle.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider 
      clientId={clientId}
      onScriptLoadError={() => console.error('Google OAuth script failed to load')}
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
    >
      <ToggleProvider>
        <App />
      </ToggleProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)