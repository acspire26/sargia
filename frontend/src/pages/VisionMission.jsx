import { motion } from 'framer-motion';
import { Target, Compass, Award } from 'lucide-react';

const VisionMission = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block py-1.5 px-4 rounded-full glass bg-black/5 text-xs font-bold tracking-widest text-accent mb-6 shadow-sm border border-black/5"
                    >
                        OUR PURPOSE
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6"
                    >
                        Vision &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Mission.</span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                        className="bg-white p-12 rounded-[2rem] border border-slate-200 relative overflow-hidden group shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:border-accent/40 transition-all duration-500 z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                        <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full filter blur-[80px] group-hover:bg-accent/10 transition-all duration-700 group-hover:scale-150 origin-center -z-10" />
                        <div className="w-16 h-16 bg-slate-50 text-accent rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-slate-100 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:-rotate-3 transition-all duration-500 shadow-sm">
                            <Compass size={32} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 relative z-10 tracking-tight group-hover:text-accent transition-colors duration-300">Our Vision</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium relative z-10">
                            To be a globally recognized conglomerate that inspires innovation, builds enduring businesses, and creates sustainable value for all stakeholders across the technology and investment landscapes.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                        className="bg-white p-12 rounded-[2rem] border border-slate-200 relative overflow-hidden group shadow-md hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500 z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-transparent group-hover:from-blue-500/5 transition-colors duration-500 -z-10" />
                        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700 group-hover:scale-150 origin-center -z-10" />
                        <div className="w-16 h-16 bg-slate-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-slate-100 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-sm">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 relative z-10 tracking-tight group-hover:text-blue-500 transition-colors duration-300">Our Mission</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium relative z-10">
                            To foster a culture of excellence and strategic growth by investing in transformative ideas, empowering visionary leaders, and delivering premium solutions across our expansive portfolio.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.1)] rounded-[2rem] p-12 md:p-16 text-center border border-slate-200 relative overflow-hidden transition-all duration-500 z-10 group"
                >
                    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] group-hover:bg-accent/10 transition-colors duration-700 -z-10" />
                    <div className="w-16 h-16 bg-slate-50 text-accent rounded-2xl flex items-center justify-center mb-8 mx-auto relative z-10 border border-slate-100 shadow-sm">
                        <Award size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 tracking-tight relative z-10">Core Values</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-left md:text-center mt-8">
                        <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)] hover:border-accent/40 transition-all duration-500 group/item relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-transparent group-hover/item:from-accent/5 transition-colors duration-500 -z-10" />
                            <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover/item:text-accent transition-colors duration-300">Integrity</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">Upholding the highest standards of ethics and transparency in everything we do, building trust across all partnerships.</p>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)] hover:border-accent/40 transition-all duration-500 group/item relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-transparent group-hover/item:from-accent/5 transition-colors duration-500 -z-10" />
                            <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover/item:text-accent transition-colors duration-300">Innovation</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">Continuously seeking new ways to create value, disrupt traditional models, and leverage emerging technologies.</p>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)] hover:border-accent/40 transition-all duration-500 group/item relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-transparent group-hover/item:from-accent/5 transition-colors duration-500 -z-10" />
                            <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover/item:text-accent transition-colors duration-300">Excellence</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">A relentless pursuit of perfection and uncompromising quality across all products, services, and operations.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VisionMission;
