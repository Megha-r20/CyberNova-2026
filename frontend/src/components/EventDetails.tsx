import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Share2, ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, Shield, Eye, Code, AlertTriangle, Wrench, BookOpen } from 'lucide-react';

const EventDetails = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-400 pb-20">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 text-cyan-400 hover:bg-cyan-900/20 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="font-bold tracking-widest text-cyan-500/80">CYBERNOVA</div>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">EVENT DETAILS</h1>
                    <p className="text-xl text-gray-400">Everything you need to know</p>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {[
                        { icon: Calendar, title: "EVENT DATES", val: "February 16 – 19", sub: "4 Days of Intensive Learning" },
                        { icon: Clock, title: "DAILY SCHEDULE", val: "5:00 PM – 6:00 PM", sub: "1 Hour Daily Sessions" },
                        { icon: MapPin, title: "MODE", val: "Hybrid", sub: "In-Person + Online Access" },
                        { icon: Users, title: "TEAM SIZE", val: "Exactly 5", sub: "Members Required" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="bg-cyan-900/5 border border-cyan-500/20 p-6 hover:border-cyan-400/50 transition-colors duration-300"
                        >
                            <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-cyan-500/60 font-bold text-xs tracking-widest mb-2">{item.title}</h3>
                            <p className="text-lg font-bold text-white mb-1">{item.val}</p>
                            <p className="text-sm text-gray-400">{item.sub}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Venue Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-transparent"
                    >
                        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5" /> IN-PERSON VENUE
                        </h3>
                        <div className="space-y-2 text-gray-300">
                            <p className="font-semibold text-white">Kalasalingam Academy of Research and Education</p>
                            <p>Anand Nagar, Krishnankoil</p>
                            <p>Srivilliputhur, Tamil Nadu 626126</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-cyan-500/20 bg-gradient-to-bl from-cyan-900/10 to-transparent"
                    >
                        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                            <Share2 className="w-5 h-5" /> ONLINE ACCESS
                        </h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                                Live streaming available for all sessions
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                                Meeting links will be shared via email
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                                Interactive Q&A for online participants
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Workshop Themes */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">WORKSHOP THEMES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Shield, title: "Web App Security", desc: "Deep dive into OWASP Top 10 vulnerabilities and defense strategies" },
                            { icon: Eye, title: "Penetration Testing", desc: "Hands-on ethical hacking techniques and vulnerability assessment" },
                            { icon: Code, title: "Secure Coding", desc: "Learn to write bulletproof code that resists common attacks" },
                            { icon: AlertTriangle, title: "Security Awareness", desc: "Build a security-first mindset for the modern threat landscape" },
                            { icon: Wrench, title: "Open Source Tools", desc: "Master industry-standard tools for security testing and analysis" }
                        ].map((theme, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="p-6 bg-gray-900/50 border border-gray-800 hover:border-cyan-500/40 transition-all rounded-sm"
                            >
                                <theme.icon className="w-10 h-10 text-cyan-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{theme.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{theme.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Rules & Eligibility */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">RULES & ELIGIBILITY</h2>
                        <ul className="space-y-4">
                            {[
                                "Open to all undergraduate students (2nd, 3rd, and 4th year)",
                                "Teams must consist of exactly 5 members",
                                "Registration fee: ₹1,750 per team (non-refundable)",
                                "All team members must attend all 4 sessions",
                                "Valid college email ID required for registration",
                                "Basic knowledge of programming recommended but not mandatory"
                            ].map((rule, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">WHAT'S INCLUDED</h2>
                        <div className="space-y-4">
                            {[
                                { icon: BookOpen, title: "Workshop Materials", desc: "Comprehensive guides and resources" },
                                { icon: Shield, title: "Certification", desc: "Official completion certificate" },
                                { icon: Users, title: "Networking", desc: "Access to community and mentors" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border border-gray-800 bg-gray-900/30">
                                    <item.icon className="w-8 h-8 text-cyan-400" />
                                    <div>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/registration')}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black font-black text-xl hover:bg-cyan-300 transition-all"
                    >
                        PROCEED TO REGISTRATION
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-4 text-cyan-500/60 text-sm uppercase tracking-widest">Registration closes when all slots are filled</p>
                </div>

            </div>
        </div>
    );
};

export default EventDetails;
