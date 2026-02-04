import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Loader2, ExternalLink, Lock } from 'lucide-react';

interface FormData {
    fullName: string;
    registrationNumber: string;
    email: string;
    year: string;
    section: string;
    mobile: string;
    whatsappJoined: string;
}

interface FormErrors {
    fullName?: string;
    registrationNumber?: string;
    email?: string;
    year?: string;
    section?: string;
    mobile?: string;
    whatsappJoined?: string;
}

const API_BASE = import.meta.env.VITE_API_URL as string;

export default function Registration() {
    const navigate = useNavigate();
    const [slotsLeft, setSlotsLeft] = useState<number | null>(null);
    const [isLoadingSlots, setIsLoadingSlots] = useState(true);

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        registrationNumber: '',
        email: '',
        year: '',
        section: '',
        mobile: '',
        whatsappJoined: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        const checkSlots = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/slots-left`);
                const data = await response.json();
                if (data.success) {
                    setSlotsLeft(data.slotsLeft);
                }
            } catch (error) {
                console.error("Failed to check slots", error);
            } finally {
                setIsLoadingSlots(false);
            }
        };

        checkSlots();
    }, []);

    // Validation functions
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 3) return 'Name must be at least 3 characters';
                return '';

            case 'registrationNumber':
                if (!value.trim()) return 'Registration number is required';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
                return '';

            case 'year':
                if (!value) return 'Year of study is required';
                return '';

            case 'section':
                if (!value.trim()) return 'Section is required';
                return '';

            case 'mobile':
                if (!value.trim()) return 'Mobile number is required';
                return '';

            case 'whatsappJoined':
                if (!value) return 'Please select an option';
                return '';

            default:
                return '';
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof FormData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (apiError) setApiError('');

        if (touched.has(name)) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => new Set(prev).add(name));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched(new Set(Object.keys(formData)));

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setApiError('');

        try {
            const response = await fetch(`${API_BASE}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error(data.message || 'This information is already registered');
                } else if (response.status === 400) {
                    throw new Error(data.message || 'Registration failed. Slots might be full or data is invalid.');
                } else {
                    throw new Error(data.message || 'Registration failed. Please try again.');
                }
            }

            navigate('/success', { state: { formData } });

        } catch (error) {
            setApiError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = Object.keys(formData).every(key =>
        formData[key as keyof FormData].trim() !== ''
    ) && Object.values(errors).every(error => !error);

    if (isLoadingSlots) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }

    if (slotsLeft === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Grid */}
                <div className="fixed inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center relative z-10"
                >
                    <div className="border border-red-500/30 bg-red-900/10 p-8 backdrop-blur-md rounded-lg">
                        <Lock className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold mb-4 text-white">REGISTRATION CLOSED</h1>
                        <p className="text-red-300 mb-8 text-lg">
                            All 100 slots for CyberNova Series 2026 have been filled.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-colors"
                        >
                            RETURN HOME
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

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
                    <div className="max-w-3xl mx-auto">
                        {/* Page Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl md:text-6xl tracking-tight mb-4" style={{ fontWeight: 900 }}>
                                REGISTRATION
                            </h1>
                            <p className="text-xl text-gray-400">Fill out all required fields to secure your spot</p>
                        </motion.div>

                        {/* API Error Alert */}
                        {apiError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 border border-red-500/50 bg-red-500/10 p-4 rounded flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="text-red-300">{apiError}</div>
                            </motion.div>
                        )}


                        {/* Registration Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm text-gray-400 mb-2">
                                    FULL NAME (AS PER SIS) *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border ${touched.has('fullName') && errors.fullName
                                        ? 'border-red-500/50'
                                        : 'border-cyan-500/30'
                                        } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                    placeholder="Enter your full name"
                                />
                                {touched.has('fullName') && errors.fullName && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Registration Number */}
                            <div>
                                <label htmlFor="registrationNumber" className="block text-sm text-gray-400 mb-2">
                                    REGISTRATION NUMBER *
                                </label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border ${touched.has('registrationNumber') && errors.registrationNumber
                                        ? 'border-red-500/50'
                                        : 'border-cyan-500/30'
                                        } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                    placeholder="Enter your registration number"
                                />
                                {touched.has('registrationNumber') && errors.registrationNumber && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.registrationNumber}
                                    </p>
                                )}
                            </div>

                            {/* College Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                                    COLLEGE EMAIL ID *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border ${touched.has('email') && errors.email
                                        ? 'border-red-500/50'
                                        : 'border-cyan-500/30'
                                        } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                    placeholder="your.name@college.edu"
                                />
                                {touched.has('email') && errors.email && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Year and Section Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Year of Study */}
                                <div>
                                    <label htmlFor="year" className="block text-sm text-gray-400 mb-2">
                                        YEAR OF STUDY *
                                    </label>
                                    <select
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-black border ${touched.has('year') && errors.year
                                            ? 'border-red-500/50'
                                            : 'border-cyan-500/30'
                                            } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                    >
                                        <option value="">Select year</option>
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="3rd">3rd Year</option>
                                        <option value="4th">4th Year</option>
                                    </select>
                                    {touched.has('year') && errors.year && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.year}
                                        </p>
                                    )}
                                </div>

                                {/* Section */}
                                <div>
                                    <label htmlFor="section" className="block text-sm text-gray-400 mb-2">
                                        SECTION *
                                    </label>
                                    <input
                                        type="text"
                                        id="section"
                                        name="section"
                                        value={formData.section}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-transparent border ${touched.has('section') && errors.section
                                            ? 'border-red-500/50'
                                            : 'border-cyan-500/30'
                                            } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                        placeholder="e.g., A, B, C"
                                    />
                                    {touched.has('section') && errors.section && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.section}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm text-gray-400 mb-2">
                                    MOBILE NUMBER *
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    maxLength={10}
                                    className={`w-full bg-transparent border ${touched.has('mobile') && errors.mobile
                                        ? 'border-red-500/50'
                                        : 'border-cyan-500/30'
                                        } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                    placeholder="10-digit mobile number"
                                />
                                {touched.has('mobile') && errors.mobile && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            {/* WhatsApp Group */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="whatsappJoined" className="block text-sm text-gray-400">
                                        WHATSAPP GROUP JOINED? *
                                    </label>
                                    <a
                                        href="https://chat.whatsapp.com/K32X11n8XrgIrdcSCKq3Cs?mode=gi_t"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 text-xs md:text-sm flex items-center gap-1 hover:text-cyan-300 transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                                        JOIN GROUP NOW
                                    </a>
                                </div>
                                <select
                                    id="whatsappJoined"
                                    name="whatsappJoined"
                                    value={formData.whatsappJoined}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-black border ${touched.has('whatsappJoined') && errors.whatsappJoined
                                        ? 'border-red-500/50'
                                        : 'border-cyan-500/30'
                                        } p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors`}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {touched.has('whatsappJoined') && errors.whatsappJoined && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.whatsappJoined}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`w-full py-5 text-xl tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${isFormValid && !isSubmitting
                                        ? 'bg-cyan-400 text-black hover:bg-cyan-300 cursor-pointer'
                                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        }`}
                                    style={{ fontWeight: 700 }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : (
                                        'SUBMIT REGISTRATION'
                                    )}
                                </button>
                                <p className="mt-4 text-center text-sm text-gray-500">
                                    All fields are required. Make sure to double-check your information.
                                </p>
                            </div>
                        </motion.form>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-12 border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm"
                        >
                            <h3 className="text-lg mb-3 text-cyan-400" style={{ fontWeight: 700 }}>
                                IMPORTANT NOTES
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>Ensure details match official college records</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>Free in-person workshop (no fee)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>Venue block details will be shared via WhatsApp group</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
