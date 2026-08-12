import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCompanyInfo } from '../services/api';

const StatCard = ({ number, label, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className="glass p-8 rounded-3xl text-center relative overflow-hidden group bg-white"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight text-glow">{number}</h3>
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest">{label}</p>
    </motion.div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, scale: 1.03 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 300 }}
        className="p-8 rounded-3xl group bg-white border border-slate-200 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:border-accent/40 transition-all duration-500 relative overflow-hidden z-10"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:rotate-3 transition-all duration-500">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm font-medium">{desc}</p>
    </motion.div>
);

const Home = () => {
    const [companyInfo, setCompanyInfo] = useState(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    useEffect(() => {
        getCompanyInfo().then(data => {
            if (data && data.results && data.results.length > 0) {
                setCompanyInfo(data.results[0]);
            }
        }).catch(console.error);
    }, []);

    const scrollToSection = (e, path) => {
        e.preventDefault();
        const element = document.querySelector(path);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-primary min-h-screen">
            {/* Hero Section with Mesh Gradient */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden mesh-bg pt-32 pb-20">
                {/* Floating Elements */}
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-[10%] w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-[100px]"
                />
                <motion.div 
                    animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-[10%] w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-[100px]"
                />

                <motion.div 
                    style={{ y: y1, opacity: opacityHero }}
                    className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-md glass bg-black/5 text-xs font-bold tracking-widest text-accent mb-8 border-accent/20 shadow-sm relative">
                            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></span>
                            SHAPING THE FUTURE
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 mb-8 leading-[1.05]">
                            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Beyond</span><br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Boundaries.</span>
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16 font-medium leading-relaxed"
                    >
                        {companyInfo?.about_text || 'SARGIA Group is a premier holding company driving excellence across technology, arts, and strategic consulting to build scalable enterprises that define the future.'}
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
                    >
                        <a href="#businesses" onClick={(e) => scrollToSection(e, '#businesses')} className="group relative px-10 py-5 rounded-md bg-accent text-white font-bold overflow-hidden transition-transform hover:scale-105 shadow-xl w-full sm:w-auto text-center text-lg">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Explore Portfolio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="px-10 py-5 rounded-md text-gray-900 font-bold flex items-center justify-center gap-2 glass-hover bg-white shadow-sm border border-black/5 w-full sm:w-auto text-center text-lg">
                            Partner With Us
                        </a>
                    </motion.div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={20} className="text-accent" />
                    </motion.div>
                </motion.div>
            </section>



            {/* Why Choose Us */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Strategic <span className="text-accent">Advantage</span></h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">We don't just invest in companies; we build ecosystems that empower sustained, exponential growth.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard 
                            icon={Globe}
                            title="Global Ecosystem"
                            desc="Leveraging an interconnected network of businesses to scale solutions globally."
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={Zap}
                            title="Accelerated Innovation"
                            desc="Deploying cutting-edge technology and frameworks to outpace market evolution."
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={ShieldCheck}
                            title="Uncompromising Quality"
                            desc="Maintaining the highest standards of operational excellence and security across all verticals."
                            delay={0.3}
                        />
                        <FeatureCard 
                            icon={TrendingUp}
                            title="Sustainable Growth"
                            desc="Focusing on long-term value creation rather than short-term gains."
                            delay={0.4}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="md:col-span-2 p-8 md:p-12 rounded-3xl bg-white border border-slate-200 relative overflow-hidden shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:border-accent/40 transition-all duration-500 group z-10"
                        >
                             <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full filter blur-[80px] group-hover:bg-accent/10 transition-all duration-700 group-hover:scale-150 origin-center -z-10" />
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/0 group-hover:to-accent/5 transition-colors duration-500 -z-10" />
                             <h3 className="text-3xl font-bold text-gray-900 mb-4 relative z-10 tracking-tight group-hover:text-accent transition-colors duration-300">Ready to scale?</h3>
                             <p className="text-gray-600 mb-8 max-w-md relative z-10 font-medium text-lg">Join our ecosystem of industry-leading companies and visionary founders.</p>
                             <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="inline-flex items-center gap-2 text-accent font-bold hover:text-accent-hover transition-colors relative z-10 group/btn bg-accent/5 px-6 py-3 rounded-md hover:bg-accent/10 border border-accent/10">
                                 Start a conversation <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                             </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
