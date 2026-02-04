import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Loader2, Lock } from 'lucide-react';

/* =======================
   TYPES
======================= */
interface Registration {
  fullName: string;
  registrationNumber: string;
  email: string;
  year: string;
  section: string;
  mobile: string;
  whatsappJoined: string;
  timestamp: string;
}

/* =======================
   API BASE
======================= */
const API_BASE = import.meta.env.VITE_API_URL as string;

export default function Admin() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [authorized, setAuthorized] = useState(false);

  // Login
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /* =======================
     LOGIN
  ======================= */
  const handleLogin = async () => {
    if (!password.trim()) {
      alert('Please enter a password');
      return;
    }

    setIsLoggingIn(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid password');
      }

      setAuthorized(true);
      fetchData(result.token);
    } catch {
      alert('❌ Network error. Backend not reachable.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  /* =======================
     FETCH DATA
  ======================= */
  const fetchData = async (authToken: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/data`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setRegistrations(result.data.reverse());
      } else {
        setAuthorized(false);
      }
    } catch {
      alert('❌ Failed to fetch data');
    }
  };

  /* =======================
     LOGIN SCREEN
  ======================= */
  if (!authorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Lock className="w-16 h-16 mx-auto mb-4 text-cyan-400" />

          <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
            ADMIN LOGIN
          </h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full p-3 mb-4 bg-gray-900 border border-cyan-500/30 rounded"
            placeholder="Enter admin password"
          />

          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full py-3 bg-cyan-500 text-black font-bold rounded"
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                LOGGING IN…
              </span>
            ) : (
              'LOGIN'
            )}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-3 border border-cyan-500/30 text-cyan-400 rounded"
          >
            <Home className="inline mr-2 w-4 h-4" />
            BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  /* =======================
     DASHBOARD (MINIMAL)
  ======================= */
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-2">
        ADMIN DASHBOARD
      </h1>
      <p className="text-gray-400">
        Total registrations: {registrations.length}
      </p>
    </div>
  );
}
