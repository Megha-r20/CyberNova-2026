import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2, CheckCircle, Home } from 'lucide-react';

const Registration = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const [formData, setFormData] = useState({
        fullName: '',
        registrationNumber: '',
        email: '',
        year: '2nd Year',
        section: '',
        mobile: '',
        whatsappJoined: 'No'
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const validators = {
        fullName: (val: string) => val.length >= 3 ? '' : 'Name must be at least 3 characters',
        registrationNumber: (val: string) => /^[a-zA-Z0-9]+$/.test(val) ? '' : 'Alphanumeric characters only',
        email: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) && (val.includes('.edu') || val.includes('college'))
            ? '' : 'Must be a valid .edu or college email',
        section: (val: string) => val.length > 0 ? '' : 'Section is required',
        mobile: (val: string) => /^[6-9]\d{9}$/.test(val) ? '' : 'Invalid mobile number (10 digits starting with 6-9)',
        year: () => '',
        whatsappJoined: () => ''
    };

    const validateField = (name: string, value: string) => {
        const validator = validators[name as keyof typeof validators];
        if (validator) {
            return validator(value);
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const isFormValid = () => {
        // Check all fields have values (except those with defaults/selects that always have values)
        // And no errors
        const requiredFields = ['fullName', 'registrationNumber', 'email', 'section', 'mobile'];
        const hasEmptyFields = requiredFields.some(field => !formData[field as keyof typeof formData]);

        // Also run validation on all fields to be sure
        const hasValidationErrors = Object.keys(formData).some(key => validateField(key, formData[key as keyof typeof formData]));

        return !hasEmptyFields && !hasValidationErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return;

        setIsSubmitting(true);
        setApiError(null);

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            navigate('/success', { state: formData });
        } catch (err: any) {
            setApiError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                        <Home className="w-6 h-6" />
                    </button>
                    <div className="font-bold tracking-widest text-cyan-500/80">CYBERNOVA</div>
                    <div className="w-10" />
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-2">REGISTRATION</h1>
                    <p className="text-gray-400">Fill out all required fields to secure your spot</p>
                </motion.div>

                {apiError && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded mb-8 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{apiError}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Full Name (As per SIS) *</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-transparent border ${errors.fullName && touched.fullName ? 'border-red-500/50' : 'border-cyan-500/30'} rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700`}
                                placeholder="Ex: John Doe"
                            />
                            {touched.fullName && errors.fullName && (
                                <div className="absolute right-4 top-4 text-red-500">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {touched.fullName && errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Registration Number */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Registration Number *</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-transparent border ${errors.registrationNumber && touched.registrationNumber ? 'border-red-500/50' : 'border-cyan-500/30'} rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700 uppercase`}
                                placeholder="Ex: 9920005051"
                            />
                            {touched.registrationNumber && errors.registrationNumber && (
                                <div className="absolute right-4 top-4 text-red-500">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {touched.registrationNumber && errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
                    </div>

                    {/* College Email */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">College Email ID *</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-transparent border ${errors.email && touched.email ? 'border-red-500/50' : 'border-cyan-500/30'} rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700`}
                                placeholder="your.name@college.edu"
                            />
                            {touched.email && errors.email && (
                                <div className="absolute right-4 top-4 text-red-500">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Year */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Year of Study *</label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full bg-black border border-cyan-500/30 rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
                            >
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>

                        {/* Section */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Section *</label>
                            <input
                                type="text"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-transparent border ${errors.section && touched.section ? 'border-red-500/50' : 'border-cyan-500/30'} rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700 uppercase`}
                                placeholder="e.g., A"
                            />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Mobile Number *</label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={10}
                                className={`w-full bg-transparent border ${errors.mobile && touched.mobile ? 'border-red-500/50' : 'border-cyan-500/30'} rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700`}
                                placeholder="9876543210"
                            />
                            {touched.mobile && errors.mobile && (
                                <div className="absolute right-4 top-4 text-red-500">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {touched.mobile && errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">WhatsApp Group Joined? *</label>
                        <select
                            name="whatsappJoined"
                            value={formData.whatsappJoined}
                            onChange={handleChange}
                            className="w-full bg-black border border-cyan-500/30 rounded p-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className={`w-full py-5 text-xl font-bold flex items-center justify-center gap-2 transition-all ${!isFormValid() || isSubmitting
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                            }`}
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

                    <p className="text-center text-gray-500 text-sm">All fields are required. Make sure to double-check your information.</p>

                </form>

                {/* Info Box */}
                <div className="mt-12 p-6 border border-cyan-500/20 bg-cyan-900/5 rounded">
                    <h3 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider">Important Notes</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            Ensure all information matches your official college records
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            You will receive a confirmation email within 24 hours
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            Registration fee: ₹1,750 per team (payment details will be shared via email)
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Registration;
