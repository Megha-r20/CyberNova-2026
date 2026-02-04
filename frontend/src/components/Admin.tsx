import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Home, Download, Loader2, Lock, RefreshCw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function Admin() {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    // Login state - PASSWORD ONLY
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    // Delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleLogin = async () => {
        if (!password.trim()) {
            alert('Please enter a password');
            return;
        }

        setIsLoggingIn(true);
        try {
            // Hardcoded to 3002 to ensure we hit the new server
            const apiUrl = 'http://localhost:3002';
            const response = await fetch(`${apiUrl}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: password })
            });

            const result = await response.json();

            if (result.success) {
                setToken(result.token);
                setAuthorized(true);
                fetchData(result.token);
            } else {
                alert('❌ ' + (result.message || 'Invalid password'));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('❌ Network error. Is backend running?');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const fetchData = async (authToken?: string) => {
        setLoading(true);
        try {
            const apiUrl = 'http://localhost:3002';
            const response = await fetch(`${apiUrl}/api/admin/data`, {
                headers: {
                    'Authorization': `Bearer ${authToken || token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                setRegistrations(result.data.reverse()); // Show newest first
                setPage(1); // Reset to first page
            } else {
                if (response.status === 401) {
                    setAuthorized(false);
                    setToken(null);
                    alert('❌ Session expired. Please login again.');
                }
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAll = async () => {
        setIsDeleting(true);
        try {
            const apiUrl = 'http://localhost:3002';
            const response = await fetch(`${apiUrl}/api/admin/clear-all`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                setRegistrations([]);
                setShowDeleteConfirm(false);
                alert('✅ All registration data has been cleared successfully!');
            } else {
                alert('❌ Failed to clear data: ' + result.message);
            }
        } catch (error) {
            console.error('Failed to delete data', error);
            alert('❌ Error clearing data. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownload = async () => {
        try {
            const apiUrl = 'http://localhost:3002';
            const response = await fetch(`${apiUrl}/api/admin/download`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'cybernova_registrations.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert('❌ Download failed');
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('❌ Network error during download');
        }
    };

    // Pagination calculations
    const totalPages = Math.ceil(registrations.length / rowsPerPage);
    const paginatedData = registrations.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    if (!authorized) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="text-center mb-8">
                        <Lock className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                        <h1 className="text-4xl font-bold mb-2 text-cyan-400">ADMIN LOGIN</h1>
                        <p className="text-gray-400">CyberNova Series 2026</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-cyan-400">PASSWORD</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                className="w-full p-3 bg-gray-900 border border-cyan-500/30 rounded text-white focus:outline-none focus:border-cyan-400"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={isLoggingIn}
                            className="w-full py-3 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    LOGGING IN...
                                </>
                            ) : (
                                'LOGIN'
                            )}
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 border border-cyan-500/30 text-cyan-400 font-bold rounded hover:bg-cyan-900/20 transition-all"
                        >
                            BACK TO HOME
                        </button>
                    </div>


                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-cyan-400">
                                ADMIN DASHBOARD
                            </h1>
                            <p className="text-gray-400">CyberNova Series 2026 • Secure Admin Area</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setAuthorized(false);
                                    setToken(null);
                                    setPassword('');
                                }}
                                className="flex items-center gap-2 px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-900/20 transition-all rounded"
                            >
                                <Lock className="w-5 h-5" />
                                <span className="font-bold">LOGOUT</span>
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 transition-all rounded"
                            >
                                <Home className="w-5 h-5" />
                                <span className="font-bold">HOME</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-cyan-400">
                                REGISTRATIONS
                            </h1>
                            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-mono">
                                {registrations.length} TOTAL
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => fetchData()}
                                className="p-3 border border-cyan-500/30 rounded hover:bg-cyan-900/20 text-cyan-400 transition-all"
                                title="Refresh Data"
                            >
                                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            </button>

                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded"
                            >
                                <Download className="w-5 h-5" />
                                <span className="font-bold">DOWNLOAD EXCEL</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/50 border border-cyan-500/20 rounded-xl overflow-hidden"
                >
                    <table className="w-full">
                        <thead className="bg-cyan-500/10 border-b border-cyan-500/20">
                            <tr>
                                <th className="p-4 text-left text-cyan-400 font-bold">#</th>
                                <th className="p-4 text-left text-cyan-400 font-bold">NAME</th>
                                <th className="p-4 text-left text-cyan-400 font-bold">REG NO</th>
                                <th className="p-4 text-left text-cyan-400 font-bold">YEAR/SEC</th>
                                <th className="p-4 text-left text-cyan-400 font-bold">MOBILE</th>
                                <th className="p-4 text-left text-cyan-400 font-bold">EMAIL</th>
                                <th className="p-4 text-left text-cyan-400 font-bold">TIMESTAMP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-400" />
                                    </td>
                                </tr>
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No registrations found yet
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((row, index) => (
                                    <tr key={index} className="hover:bg-cyan-500/5 transition-colors">
                                        <td className="p-4 text-gray-500 font-mono text-sm">
                                            {(page - 1) * rowsPerPage + index + 1}
                                        </td>
                                        <td className="p-4 font-bold">{row.fullName}</td>
                                        <td className="p-4 font-mono text-sm text-cyan-300">{row.registrationNumber}</td>
                                        <td className="p-4 text-sm">{row.year} - {row.section}</td>
                                        <td className="p-4 text-sm font-mono">{row.mobile}</td>
                                        <td className="p-4 text-sm text-gray-400">{row.email}</td>
                                        <td className="p-4 text-xs text-gray-500 font-mono">
                                            {new Date(row.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between p-4 border-t border-cyan-500/20 bg-gray-900/30">
                            <div className="text-sm text-gray-400">
                                Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, registrations.length)} of {registrations.length} registrations
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className={`flex items-center gap-1 px-4 py-2 rounded transition-all ${page === 1
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20'
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    PREV
                                </button>

                                <span className="px-4 py-2 text-cyan-400 font-mono">
                                    Page {page} / {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className={`flex items-center gap-1 px-4 py-2 rounded transition-all ${page === totalPages
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20'
                                        }`}
                                >
                                    NEXT
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gray-900 border border-red-500/50 p-8 rounded-xl max-w-md w-full"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-red-500/20 rounded-full">
                                    <Trash2 className="w-6 h-6 text-red-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-red-400">DELETE ALL DATA</h2>
                            </div>

                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete <strong className="text-white">{registrations.length} registration(s)</strong>?
                                This action cannot be undone.
                            </p>

                            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded mb-6">
                                <p className="text-sm text-red-300">
                                    ⚠️ <strong>Warning:</strong> All registration data will be permanently deleted from the Excel file.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 bg-gray-700 text-white hover:bg-gray-600 transition-colors rounded font-bold disabled:opacity-50"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleDeleteAll}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 bg-red-500 text-white hover:bg-red-600 transition-colors rounded font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            DELETING...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-5 h-5" />
                                            DELETE ALL
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
