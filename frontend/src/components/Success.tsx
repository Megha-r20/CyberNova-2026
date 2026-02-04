import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, MessageCircle, Home, User, GraduationCap, Hash, Mail, Layout, Phone } from 'lucide-react';
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

    const handleJoinWhatsApp = () => {
        window.open('https://chat.whatsapp.com/K32X11n8XrgIrdcSCKq3Cs?mode=gi_t', '_blank');
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Full Name</div>
                                        <div className="text-lg">{formData.fullName}</div>
                                    </div>
                                </div>
                                {/* Registration Number */}
                                <div className="flex items-start gap-3">
                                    <Hash className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Registration Number</div>
                                        <div className="text-lg">{formData.registrationNumber}</div>
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">College Email ID</div>
                                        <div className="text-lg break-all">{formData.email}</div>
                                    </div>
                                </div>
                                {/* Year */}
                                <div className="flex items-start gap-3">
                                    <GraduationCap className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Year of Study</div>
                                        <div className="text-lg">{formData.year} Year</div>
                                    </div>
                                </div>
                                {/* Section */}
                                <div className="flex items-start gap-3">
                                    <Layout className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Section</div>
                                        <div className="text-lg">{formData.section}</div>
                                    </div>
                                </div>
                                {/* Mobile */}
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Mobile Number</div>
                                        <div className="text-lg">{formData.mobile}</div>
                                    </div>
                                </div>
                                {/* WhatsApp */}
                                <div className="flex items-start gap-3">
                                    <MessageCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">WhatsApp Group Joined?</div>
                                        <div className="text-lg">{formData.whatsappJoined}</div>
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
                                            Join WhatsApp Group
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            The official WhatsApp group is the ONLY channel for updates. All venue details, schedules, and instructions will be shared here.
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
                                onClick={() => navigate('/')}
                                className="w-full px-8 py-4 bg-cyan-400 text-black text-lg tracking-wide hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-3"
                                style={{ fontWeight: 700 }}
                            >
                                <Home className="w-5 h-5" />
                                RETURN HOME
                            </button>
                        </motion.div>



                        {/* Important Reminder */}

                    </div>
                </div>
            </div>
        </div>
    );
}
