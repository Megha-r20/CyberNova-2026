
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Shield, BookOpen, ArrowRight, Home, Github, Terminal, Wrench } from 'lucide-react';

export default function EventDetails() {
    const navigate = useNavigate();

    const themes = [
        {
            icon: Github,
            title: 'GitHub',
            description: 'Learn version control fundamentals, repositories, branching, pull requests, and collaboration workflows using GitHub.'
        },
        {
            icon: Terminal,
            title: 'Linux',
            description: 'Understand Linux basics, essential commands, file systems, permissions, and terminal usage for developers and security professionals.'
        },
        {
            icon: Wrench,
            title: 'Cybersecurity Tools',
            description: 'Get hands-on exposure to commonly used cybersecurity tools for security analysis, testing, and basic threat assessment.'
        }
    ];

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
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span className="tracking-wide">HOME</span>
                        </motion.button>
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
                    <div className="max-w-7xl mx-auto">
                        {/* Page Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-5xl md:text-7xl tracking-tight mb-4" style={{ fontWeight: 900 }}>
                                EVENT DETAILS
                            </h1>
                            <p className="text-xl text-gray-400">Everything you need to know</p>
                        </motion.div>

                        {/* Info Cards Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                        >
                            <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                <Calendar className="w-10 h-10 text-cyan-400 mb-4" />
                                <div className="text-sm text-gray-400 mb-2">EVENT DATES</div>
                                <div className="text-2xl tracking-tight">February 16 – 19</div>
                                <div className="text-sm text-gray-500 mt-2">4 Days of Intensive Learning</div>
                            </div>

                            <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                <Clock className="w-10 h-10 text-cyan-400 mb-4" />
                                <div className="text-sm text-gray-400 mb-2">DAILY SCHEDULE</div>
                                <div className="text-2xl tracking-tight">5:00 PM – 6:00 PM</div>
                                <div className="text-sm text-gray-500 mt-2">1 Hour Daily Sessions</div>
                            </div>

                            <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                <MapPin className="w-10 h-10 text-cyan-400 mb-4" />
                                <div className="text-sm text-gray-400 mb-2">MODE</div>
                                <div className="text-2xl tracking-tight">In-Person</div>
                                <div className="text-sm text-gray-500 mt-2">On-Campus Experience</div>
                            </div>

                            <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                <Clock className="w-10 h-10 text-cyan-400 mb-4" />
                                <div className="text-sm text-gray-400 mb-2">Post-Session Daily Schedule</div>
                                <div className="text-2xl tracking-tight">8:00 PM – 9:00 PM</div>
                                <div className="text-sm text-gray-500 mt-2">Interactive 1-Hour Daily Quiz Sessions</div>
                            </div>
                        </motion.div>

                        {/* Venue Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl tracking-tight mb-8" style={{ fontWeight: 700 }}>
                                VENUE DETAILS
                            </h2>
                            <div className="border border-cyan-500/30 bg-cyan-500/5 p-8 backdrop-blur-sm w-full text-center">
                                <h3 className="text-2xl mb-4 text-cyan-400" style={{ fontWeight: 700 }}>
                                    IN-PERSON VENUE
                                </h3>
                                <p className="text-gray-300 mb-2 text-lg">Kalasalingam Academy of Research and Education</p>
                                <p className="text-gray-400">Anand Nagar, Krishnankoil</p>
                                <p className="text-gray-400">Srivilliputhur, Tamil Nadu 626126</p>

                                <div className="mt-8 pt-6 border-t border-cyan-500/20">
                                    <h4 className="text-lg text-cyan-400 mb-2" style={{ fontWeight: 700 }}>Exact Block / Hall Details</h4>
                                    <p className="text-gray-300">Will be announced later in the official WhatsApp group</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Themes Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl tracking-tight mb-8" style={{ fontWeight: 700 }}>
                                WORKSHOP THEMES
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {themes.map((theme, index) => (
                                    <motion.div
                                        key={theme.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                        className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm hover:bg-cyan-500/10 transition-colors"
                                    >
                                        <theme.icon className="w-10 h-10 text-cyan-400 mb-4" />
                                        <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
                                            {theme.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {theme.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Rules & Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl tracking-tight mb-8" style={{ fontWeight: 700 }}>
                                RULES & ELIGIBILITY
                            </h2>
                            <div className="border border-cyan-500/30 bg-cyan-500/5 p-8 backdrop-blur-sm">
                                <div className="space-y-4 text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>Open to all undergraduate students (1st, 2nd, 3rd, and 4th year)</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>This is an in-person workshop; participants must be present on campus</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>No registration fee – participation is completely free of cost</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>Individual participation (no team requirement)</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>Participants are encouraged to attend all workshop sessions</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>Valid college ID card is mandatory for entry</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>Basic interest in technology is sufficient (prior experience not required)</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        <p>Certificates will be provided upon successful participation</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Fee Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl tracking-tight mb-8" style={{ fontWeight: 700 }}>
                                WHAT'S INCLUDED
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                    <BookOpen className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>Workshop Materials</h3>
                                    <p className="text-gray-400 text-sm">Comprehensive guides and resources</p>
                                </div>
                                <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                    <Shield className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>Certification</h3>
                                    <p className="text-gray-400 text-sm">Official completion certificate</p>
                                </div>
                                <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm">
                                    <Users className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>Networking</h3>
                                    <p className="text-gray-400 text-sm">Access to community and mentors</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-center"
                        >
                            <button
                                onClick={() => navigate('/registration')}
                                className="px-12 py-5 bg-cyan-400 text-black text-xl tracking-wide hover:bg-cyan-300 transition-all duration-300 inline-flex items-center gap-3"
                                style={{ fontWeight: 700 }}
                            >
                                PROCEED TO REGISTRATION
                                <ArrowRight className="w-6 h-6" />
                            </button>
                            <p className="mt-6 text-gray-400 text-sm">
                                Registration closes when all slots are filled
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
