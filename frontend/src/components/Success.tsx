import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Home, MessageCircle, Download, User, GraduationCap } from 'lucide-react';

const Success = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const formData = state || {}; // Fallback for direct access

    if (!state) {
        // Ideally redirect home if no state, but for dev purposes or direct access show something or redirect
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="mb-4">No registration data found.</p>
                    <button onClick={() => navigate('/')} className="text-cyan-400 underline">Return Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-400 py-12 px-4">

            {/* Header */}
            <div className="flex justify-center mb-12">
                <span className="font-bold tracking-widest text-cyan-500/50 text-xl">CYBERNOVA</span>
            </div>

            <div className="max-w-3xl mx-auto text-center">

                {/* Success Animation */}
                <div className="relative mb-8 inline-block">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <CheckCircle className="w-24 h-24 text-cyan-400 relative z-10 bg-black rounded-full" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
                >
                    REGISTRATION SUCCESSFUL!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-400 mb-12"
                >
                    Your spot in CyberNova Series 2026 has been reserved
                </motion.p>

                {/* Submitted Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gray-900/40 border border-gray-800 p-8 rounded-lg mb-12 text-left"
                >
                    <h3 className="text-cyan-400 font-bold tracking-widest text-sm mb-6 uppercase border-b border-gray-800 pb-2">Your Submission</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-900/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Full Name</p>
                                <p className="text-lg font-semibold text-white">{formData.fullName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-900/20 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Year of Study</p>
                                <p className="text-lg font-semibold text-white">{formData.year}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-12"
                >
                    <h3 className="text-white font-bold text-center mb-8">WHAT'S NEXT?</h3>
                    <div className="space-y-6 text-left">
                        {[
                            { title: "Check Your Email", desc: `You will receive a confirmation email at ${formData.email} within 24 hours with payment instructions.` },
                            { title: "Join WhatsApp Group", desc: "The official WhatsApp group link will be shared via email for event updates." },
                            { title: "Download Event Guide", desc: "Access the comprehensive event guide with schedule, rules, and themes." }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-black text-sm">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{step.title}</h4>
                                    <p className="text-gray-400 text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Important Reminder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded mb-12 text-left"
                >
                    <h3 className="text-yellow-400 font-bold flex items-center gap-2 mb-4">
                        ⚠️ IMPORTANT REMINDER
                    </h3>
                    <ul className="space-y-2 text-sm text-yellow-100/80">
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            Complete team formation (5 members) within 48 hours
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            Registration fee payment deadline will be specified in the confirmation email
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            Attendance is mandatory for all 4 sessions (Feb 16-19, 5:00-6:00 PM)
                        </li>
                    </ul>
                </motion.div>

                <div className="space-y-4">
                    <button className="w-full py-4 border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-black transition-all">
                        <MessageCircle className="w-5 h-5" /> JOIN WHATSAPP GROUP
                    </button>
                    <button className="w-full py-4 border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-black transition-all">
                        <Download className="w-5 h-5" /> DOWNLOAD EVENT GUIDE
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-cyan-400 text-black font-black flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all"
                    >
                        <Home className="w-5 h-5" /> RETURN HOME
                    </button>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Questions or concerns?</p>
                    <a href="mailto:support@cybernova.edu" className="text-cyan-400 hover:underline">Contact us at support@cybernova.edu</a>
                </div>

            </div>
        </div>
    );
};

export default Success;
