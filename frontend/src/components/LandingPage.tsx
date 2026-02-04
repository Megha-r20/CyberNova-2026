import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Zap, Clock } from "lucide-react";



export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated Background Grid */}
            <div className="fixed inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Hero Section */}
            <section className="relative md:min-h-screen flex items-center justify-center px-4 py-16 md:py-20">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Top Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-cyan-500/50 bg-cyan-500/10 rounded-full"
                    >
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm tracking-wider text-cyan-400">IN-PERSON EVENT • LIMITED SLOTS</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-6"
                    >
                        <div className="text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-4"
                            style={{
                                fontWeight: 900,
                                textShadow: '0 0 40px rgba(0, 255, 255, 0.5)',
                                letterSpacing: '-0.05em'
                            }}>
                            CYBERNOVA
                        </div>
                        <div className="text-4xl md:text-6xl lg:text-7xl tracking-tight text-cyan-400"
                            style={{ fontWeight: 700 }}>
                            SERIES 2026
                        </div>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                    >
                        Where Cyber Security Meets Innovation
                    </motion.p>

                    {/* Date & Time Blocks */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
                    >
                        <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                            <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                            <div className="text-sm text-gray-400 mb-1">EVENT DATES</div>
                            <div className="text-xl tracking-tight">Feb 16 – Feb 19</div>
                        </div>
                        <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                            <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                            <div className="text-sm text-gray-400 mb-1">DAILY TIME</div>
                            <div className="text-xl tracking-tight">5:00 PM – 6:00 PM</div>
                        </div>
                        <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                            <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                            <div className="text-sm text-gray-400 mb-1">MODE</div>
                            <div className="text-xl tracking-tight">In-Person Event</div>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button
                            onClick={() => navigate('/event-details')}
                            className="px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 text-lg tracking-wide hover:bg-cyan-400 hover:text-black transition-all duration-300 w-full sm:w-auto"
                        >
                            EXPLORE EVENT
                        </button>
                        <button
                            onClick={() => navigate('/registration')}
                            className="px-8 py-4 bg-cyan-400 text-black text-lg tracking-wide hover:bg-cyan-300 transition-all duration-300 w-full sm:w-auto"
                            style={{ fontWeight: 700 }}
                        >
                            REGISTER NOW
                        </button>
                    </motion.div>

                    {/* Urgency Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-8 text-sm text-gray-400"
                    >
                        ⚡ Limited slots available • Free Registration
                    </motion.div>
                </div>
            </section>

            {/* Credibility Section */}
            <section className="relative py-12 md:py-20 px-4 border-t border-cyan-500/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl tracking-tight mb-4" style={{ fontWeight: 700 }}>
                            ORGANIZED BY
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="border border-cyan-500/30 bg-cyan-500/5 p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center group hover:bg-cyan-500/10 transition-all duration-300"
                        >
                            <img
                                src="/owasp-logo.png"
                                alt="OWASP Logo"
                                className="h-20 w-auto object-contain filter brightness-0 invert mb-6 group-hover:scale-110 transition-transform duration-300"
                            />
                            <h3 className="text-xl mb-1" style={{ fontWeight: 700 }}>OWASP</h3>
                            <p className="text-gray-400 text-sm">KARE Student Chapter</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="border border-cyan-500/30 bg-cyan-500/5 p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center group hover:bg-cyan-500/10 transition-all duration-300"
                        >
                            <img
                                src="/cybernerds-logo.png"
                                alt="CyberNerds Logo"
                                className="h-20 w-auto object-contain filter brightness-0 invert mb-6 group-hover:scale-110 transition-transform duration-300"
                            />
                            <h3 className="text-xl mb-1" style={{ fontWeight: 700 }}>CyberNerds</h3>
                            <p className="text-gray-400 text-sm">KARE Student Chapter</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative py-20 px-4 border-t border-cyan-500/20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl tracking-tight mb-6" style={{ fontWeight: 700 }}>
                            READY TO COMPETE?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Workshop + Team-Based Competitive Series
                        </p>
                        <button
                            onClick={() => navigate('/registration')}
                            className="px-12 py-5 bg-cyan-400 text-black text-xl tracking-wide hover:bg-cyan-300 transition-all duration-300"
                            style={{ fontWeight: 700 }}
                        >
                            SECURE YOUR SPOT
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
