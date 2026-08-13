import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { submitEnquiry, getCompanyInfo } from '../services/api';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        getCompanyInfo().then(data => {
            if (data && data.results && data.results.length > 0) {
                setCompanyInfo(data.results[0]);
            }
        }).catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await submitEnquiry(formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-primary relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full filter blur-[120px] mix-blend-multiply pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block py-1.5 px-4 rounded-full glass bg-black/5 text-xs font-bold tracking-widest text-accent mb-6 border-accent/20 shadow-sm"
                    >
                        CONNECT
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6"
                    >
                        Let's build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Future.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
                    >
                        Partner with us to explore strategic opportunities, investments, and collaborations.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-8"
                    >
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 flex items-start gap-4 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 hover:border-accent/40 transition-all duration-500 group relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-extrabold mb-1 group-hover:text-accent transition-colors duration-300">Email Us</h4>
                                <a href={`mailto:${companyInfo?.email || 'sargia2313@gmail.com'}`} className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
                                    {companyInfo?.email || 'sargia2313@gmail.com'}
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 flex items-start gap-4 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 hover:border-accent/40 transition-all duration-500 group relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-extrabold mb-1 group-hover:text-accent transition-colors duration-300">Call Us</h4>
                                <a href={`tel:${(companyInfo?.phone || '6383283731, 8939774383').split(',')[0].trim()}`} className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
                                    {companyInfo?.phone || '6383283731, 8939774383'}
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 flex items-start gap-4 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 hover:border-accent/40 transition-all duration-500 group relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-extrabold mb-1 group-hover:text-accent transition-colors duration-300">Location</h4>
                                <p className="text-gray-600 text-sm leading-relaxed font-medium">{companyInfo?.address || 'Porur, Chennai, India'}</p>
                            </div>
                        </div>
                    </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2 bg-white p-10 md:p-12 rounded-3xl border border-slate-200 shadow-md hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 relative overflow-hidden group z-10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tl from-indigo-50/0 to-transparent group-hover:from-indigo-50/40 transition-colors duration-500 -z-10" />
                            {status === 'success' ? (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-accent/10 border border-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">✓</div>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Message Received</h3>
                                    <p className="text-gray-600 mb-10 font-medium">Thank you for reaching out. Our strategic team will review your inquiry and respond shortly.</p>
                                    <button onClick={() => setStatus('idle')} className="text-accent font-bold hover:text-accent-hover transition-colors">
                                        Send another message →
                                    </button>
                                </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input 
                                            type="text" name="name" required value={formData.name} onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-md bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:border-accent/40"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input 
                                            type="email" name="email" required value={formData.email} onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-md bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:border-accent/40"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                        <input 
                                            type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-md bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:border-accent/40"
                                            placeholder="+1 (800) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                        <input 
                                            type="text" name="subject" value={formData.subject} onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-md bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:border-accent/40"
                                            placeholder="Investment Inquiry"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea 
                                        name="message" required rows={5} value={formData.message} onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-md bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all text-gray-900 placeholder-gray-400 resize-none shadow-sm hover:border-accent/40"
                                        placeholder="Tell us about your strategic goals..."
                                    />
                                </div>
                                
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm font-bold">Failed to send message. Please try again later.</p>
                                )}
                                
                                <button 
                                    type="submit" 
                                    disabled={status === 'loading'}
                                    className="w-full md:w-auto px-8 py-4 rounded-md bg-accent text-white font-bold hover:bg-accent-hover transition-colors shadow-lg hover:shadow-[0_20px_50px_rgba(5,150,105,0.3)] hover:-translate-y-1"
                                >
                                    {status === 'loading' ? 'Transmitting...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
