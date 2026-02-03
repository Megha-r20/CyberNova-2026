import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, MessageCircle, Home, User, GraduationCap } from 'lucide-react';
import { useEffect } from 'react';

export default function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state?.formData;

    // Redirect to home if no form data (direct access to success page)
    useEffect(() => {
        if (!formData) {
            navigate('/');
        }
    }, [formData, navigate]);

    if (!formData) {
        return null;
    }

    const handleDownloadGuide = () => {
        // Mock download - In production, this would download an actual PDF
        alert('Event guide download will be available after payment confirmation');
    };

    const handleJoinWhatsApp = () => {
        window.open('https://chat.whatsapp.com/YOUR_INVITE_CODE', '_blank');
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Grid */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="relative">
                {/* Header */}
                <header className="border-b border-cyan-500/20 px-4 py-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl tracking-wider text-cyan-400"
                            style={{ fontWeight: 700 }}
                        >
                            CYBERNOVA
                        </motion.div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="px-4 py-20">
                    <div className="max-w-3xl mx-auto">
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, type: 'spring' }}
                            className="flex justify-center mb-8"
                        >
                            <div className="relative">
                                <CheckCircle className="w-24 h-24 text-cyan-400" />
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 border-4 border-cyan-400 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Success Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl md:text-6xl tracking-tight mb-4" style={{ fontWeight: 900 }}>
                                REGISTRATION SUCCESSFUL!
                            </h1>
                            <p className="text-xl text-gray-400">
                                Your spot in CyberNova Series 2026 has been reserved
                            </p>
                        </motion.div>

                        {/* Submitted Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="border border-cyan-500/30 bg-cyan-500/5 p-8 backdrop-blur-sm mb-8"
                        >
                            <h2 className="text-2xl mb-6 text-cyan-400" style={{ fontWeight: 700 }}>
                                YOUR SUBMISSION
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Full Name</div>
                                        <div className="text-lg">{formData.fullName}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <GraduationCap className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Year of Study</div>
                                        <div className="text-lg">{formData.year} Year</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Next Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="border border-cyan-500/30 bg-cyan-500/5 p-8 backdrop-blur-sm mb-8"
                        >
                            <h2 className="text-2xl mb-6 text-cyan-400" style={{ fontWeight: 700 }}>
                                WHAT'S NEXT?
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center flex-shrink-0"
                                        style={{ fontWeight: 700 }}>
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>
                                            Check Your Email
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            You will receive a confirmation email at <span className="text-cyan-400">{formData.email}</span> within 24 hours with payment instructions and further details.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center flex-shrink-0"
                                        style={{ fontWeight: 700 }}>
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>
                                            Join WhatsApp Group
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            The official WhatsApp group link will be shared via email for event updates, announcements, and coordination.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center flex-shrink-0"
                                        style={{ fontWeight: 700 }}>
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>
                                            Download Event Guide
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Access the comprehensive event guide with schedule, rules, themes, and preparation materials.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="space-y-4"
                        >
                            <button
                                onClick={handleJoinWhatsApp}
                                className="w-full px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 text-lg tracking-wide hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <MessageCircle className="w-5 h-5" />
                                JOIN WHATSAPP GROUP
                            </button>

                            <button
                                onClick={handleDownloadGuide}
                                className="w-full px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 text-lg tracking-wide hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <Download className="w-5 h-5" />
                                DOWNLOAD EVENT GUIDE
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full px-8 py-4 bg-cyan-400 text-black text-lg tracking-wide hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-3"
                                style={{ fontWeight: 700 }}
                            >
                                <Home className="w-5 h-5" />
                                RETURN HOME
                            </button>
                        </motion.div>

                        {/* Support Contact */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-12 text-center"
                        >
                            <p className="text-sm text-gray-500 mb-2">
                                Questions or concerns?
                            </p>
                            <p className="text-sm text-gray-400">
                                Contact us at <a href="mailto:support@cybernova.edu" className="text-cyan-400 hover:text-cyan-300">support@cybernova.edu</a>
                            </p>
                        </motion.div>

                        {/* Important Reminder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-8 border border-yellow-500/30 bg-yellow-500/5 p-6 backdrop-blur-sm"
                        >
                            <h3 className="text-lg mb-3 text-yellow-400" style={{ fontWeight: 700 }}>
                                ⚠️ IMPORTANT REMINDER
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>Complete team formation (5 members) within 48 hours</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>Registration fee payment deadline will be specified in the confirmation email</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>Attendance is mandatory for all 4 sessions (Feb 16-19, 5:00-6:00 PM)</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
