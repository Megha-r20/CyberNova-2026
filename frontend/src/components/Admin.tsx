import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Loader2, Lock, RefreshCw, Download, LogOut, ShieldCheck, Database, Search } from 'lucide-react';

/* =======================
   TYPES
======================= */
interface Registration {
  _id?: string;
  fullName: string;
  registrationNumber: string;
  email: string;
  year: string;
  section: string;
  mobile: string;
  whatsappJoined: boolean;
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
  const [token, setToken] = useState<string>('');

  // Login
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      console.log('Attempting login to:', `${API_BASE}/api/admin/login`);
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
      setToken(result.token);
      fetchData(result.token);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('❌ Network Error: Could not connect to server. Is the backend running?');
      } else {
        alert(`❌ Authentication failed: ${error.message}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  /* =======================
     FETCH DATA
  ======================= */
  const fetchData = async (authToken: string) => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/data`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setRegistrations(result.data);
      } else {
        setAuthorized(false);
      }
    } catch {
      alert('❌ Failed to fetch data');
    } finally {
      setIsRefreshing(false);
    }
  };

  /* =======================
     ACTIONS
  ======================= */
  const handleDownload = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}/api/admin/download`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cybernova_registrations.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch {
      alert('❌ Failed to download Excel');
    }
  };

  const handleClearData = async () => {
    if (!confirm('⚠️ WARNING: This will PERMANENTLY DELETE ALL registrations.\n\nAre you sure you want to proceed?')) return;

    const doubleCheck = prompt('To confirm deletion, type "DELETE" below:');
    if (doubleCheck !== 'DELETE') return;

    try {
      const response = await fetch(`${API_BASE}/api/admin/clear-all`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        alert('✅ Database Cleared');
        fetchData(token);
      } else {
        alert('❌ Failed to clear data');
      }
    } catch {
      alert('❌ Error connecting to server');
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg =>
    reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     BACKGROUND COMPONENT
  ======================= */
  const Background = () => (
    <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );

  /* =======================
     LOGIN SCREEN
  ======================= */
  if (!authorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
        <Background />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full relative z-10"
        >
          {/* Cyber Card */}
          <div className="border border-cyan-500/30 bg-black/80 backdrop-blur-xl p-8 rounded-none relative overflow-hidden group">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <Lock className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl tracking-tighter mb-2" style={{
                fontWeight: 900,
                textShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
              }}>
                ADMIN ACCESS
              </h1>
              <p className="text-cyan-400 text-sm tracking-widest uppercase font-bold">
                CyberNova Series 2026
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="relative w-full p-4 bg-black border border-cyan-500/30 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all duration-300 font-mono tracking-widest text-center"
                  placeholder="ENTER ACCESS CODE"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full py-4 bg-cyan-400 text-black font-bold tracking-widest text-lg hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AUTHENTICATING...
                  </span>
                ) : (
                  'LOGIN'
                )}
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full py-2 text-gray-500 hover:text-cyan-400 text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                HOME
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* =======================
     DASHBOARD
  ======================= */
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans relative">
      <Background />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-cyan-500/20 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 text-sm tracking-widest uppercase font-bold">Admin Console</span>
            </div>
            <h1 className="text-4xl md:text-6xl tracking-tighter" style={{
              fontWeight: 900,
              textShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
            }}>
              DASHBOARD
            </h1>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all uppercase tracking-wider text-sm font-bold flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> HOME
            </button>
            <button
              onClick={() => setAuthorized(false)}
              className="px-6 py-3 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-wider text-sm font-bold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Terminate
            </button>
          </div>
        </motion.div>

        {/* STATS & ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Total Count Card */}
          <div className="col-span-1 border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:scale-110 transition-transform duration-500">
              <Database className="w-12 h-12 text-cyan-500/20" />
            </div>
            <div className="text-gray-400 text-sm tracking-wider mb-1 uppercase">Total Registrations</div>
            <div className="text-5xl font-black text-white tracking-tighter" style={{ textShadow: '0 0 20px rgba(0,255,255,0.4)' }}>
              {registrations.length}
            </div>
          </div>

          {/* Search Bar */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-end gap-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, reg number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-cyan-500/30 pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <button
                onClick={() => fetchData(token)}
                disabled={isRefreshing}
                className="p-4 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleClearData}
                className="px-4 py-4 border border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold whitespace-nowrap"
                title="Clear All Data"
              >
                RESET DB
              </button>

              <button
                onClick={handleDownload}
                className="px-8 py-4 bg-cyan-400 text-black font-bold tracking-wide hover:bg-cyan-300 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center gap-2 whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                EXPORT DATA
              </button>
            </div>
          </div>
        </motion.div>

        {/* DATA TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border border-cyan-500/20 rounded-lg overflow-hidden bg-[#050505]"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cyan-500/10 bg-black/40">
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest w-16">#</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest">Name</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest">Reg No</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest">Year</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest">Mobile</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest">Email</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase text-xs tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {filteredRegistrations.map((reg, index) => (
                  <tr
                    key={index}
                    className="hover:bg-cyan-500/5 transition-colors group"
                  >
                    <td className="p-6 font-mono text-sm text-cyan-500/50 font-bold">{index + 1}</td>

                    {/* NAME */}
                    <td className="p-6">
                      <div className="font-bold text-white text-lg tracking-wide">
                        {reg.fullName}
                      </div>
                    </td>

                    {/* REG NO */}
                    <td className="p-6">
                      <div className="text-cyan-400 font-mono tracking-wider font-bold text-sm uppercase">
                        {reg.registrationNumber}
                      </div>
                    </td>

                    {/* YEAR */}
                    <td className="p-6">
                      <div className="text-gray-300 text-sm">
                        {reg.year} Year - {reg.section}
                      </div>
                    </td>

                    {/* MOBILE */}
                    <td className="p-6">
                      <div className="text-gray-300 font-mono text-sm">{reg.mobile}</div>
                    </td>

                    {/* EMAIL */}
                    <td className="p-6">
                      <div className="text-gray-400 text-sm truncate max-w-[200px]">{reg.email}</div>
                    </td>

                    {/* TIME */}
                    <td className="p-6 text-gray-600 text-xs font-mono whitespace-nowrap">
                      {new Date(reg.timestamp).toLocaleDateString()}, {new Date(reg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}

                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-500 italic">
                      No registrations found matching your database query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm font-mono pb-8">
          SECURE ADMIN CONSOLE • CYBERNOVA 2026
        </div>

      </div>
    </div>
  );
}

