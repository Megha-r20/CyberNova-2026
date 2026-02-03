import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Calendar, Clock, MapPin, Shield, Users } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-400">
            {/* Animated Grid Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #00FFFF 1px, transparent 1px), linear-gradient(to bottom, #00FFFF 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 mb-8 backdrop-blur-sm"
                    >
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-bold tracking-wider text-sm">HYBRID EVENT • LIMITED SLOTS</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center justify-center font-black tracking-tighter mb-4"
                    >
                        <span className="text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                            CYBERNOVA
                        </span>
                        <span className="text-4xl md:text-6xl lg:text-7xl text-cyan-400 mt-2 filter drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                            SERIES 2026
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-300 tracking-wide font-light mb-12 max-w-3xl"
                    >
                        Where Cyber Security Meets Innovation
                    </motion.p>

                    {/* Date/Time Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16"
                    >
                        {[
                            { icon: Calendar, title: "EVENT DATES", value: "Feb 16 – Feb 19" },
                            { icon: Clock, title: "DAILY TIME", value: "5:00 PM – 6:00 PM" },
                            { icon: MapPin, title: "MODE", value: "Hybrid Event" }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative p-6 border border-cyan-500/30 bg-cyan-900/5 backdrop-blur-sm hover:border-cyan-400/60 transition-colors duration-300">
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex flex-col items-center">
                                    <item.icon className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="text-cyan-400/80 text-sm font-bold tracking-widest mb-1">{item.title}</h3>
                                    <p className="text-xl font-bold text-white">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col md:flex-row gap-6 w-full md:w-auto mb-8"
                    >
                        <button
                            onClick={() => navigate('/event-details')}
                            className="px-8 py-4 text-cyan-400 border-2 border-cyan-400 font-bold text-lg tracking-wide hover:bg-cyan-400 hover:text-black transition-all duration-300 uppercase min-w-[200px]"
                        >
                            Explore Event
                        </button>
                        <button
                            onClick={() => navigate('/registration')}
                            className="px-8 py-4 bg-cyan-400 text-black font-black text-lg tracking-wide hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 uppercase min-w-[200px]"
                        >
                            Register Now
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex items-center gap-2 text-yellow-400/90 font-medium tracking-wide bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20"
                    >
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Limited slots available • Team of 5 required • ₹1750 per team</span>
                    </motion.div>

                </div>

                {/* Credibility Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-32 border-t border-cyan-500/20 pt-16"
                >
                    <h2 className="text-center text-cyan-500/50 text-sm font-bold tracking-[0.2em] mb-12">ORGANIZED BY</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex items-center gap-6 p-6 border border-cyan-500/20 bg-cyan-900/5">
                            <Shield className="w-12 h-12 text-cyan-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">OWASP & CyberNerds</h3>
                                <p className="text-gray-400">Student Chapter</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-6 border border-cyan-500/20 bg-cyan-900/5">
                            <Users className="w-12 h-12 text-cyan-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">KARE</h3>
                                <p className="text-gray-400">Kalasalingam Academy of Research and Education</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-32 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">READY TO COMPETE?</h2>
                    <p className="text-xl text-gray-400 mb-8">Workshop + Team-Based Competitive Series</p>
                    <button
                        onClick={() => navigate('/registration')}
                        className="px-10 py-5 bg-transparent border border-cyan-500/50 text-cyan-400 font-bold text-xl hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300"
                    >
                        SECURE YOUR SPOT
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default LandingPage;
