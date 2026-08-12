import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, desc, align = 'left', index = 0 }) => (
    <div className={`relative flex items-center justify-between md:justify-normal w-full mb-12 md:mb-16 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="hidden md:block md:w-[47%]" />
        <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.2 }}
            className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-accent border-[6px] border-primary transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(var(--accent),0.5)]"
        />
        <motion.div
            initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`w-full md:w-[47%] pl-12 md:pl-0 ${align === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}
        >
            <div className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-accent/40 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                <span className="text-accent font-bold text-xl mb-3 block group-hover:scale-105 transition-transform origin-left">{year}</span>
                <h3 className="text-gray-900 text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">{title}</h3>
                <p className="text-gray-600 text-base leading-relaxed font-medium">{desc}</p>
            </div>
        </motion.div>
    </div>
);

const About = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-primary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-left"
                    >
                        <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">About Us</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 mb-8 leading-tight">
                            Redefining <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">The Standard.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 leading-relaxed">
                            SARGIA Group is a diversified conglomerate committed to creating long-term value through strategic investments and operational excellence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-accent/40 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors duration-300">Vision &amp; Strategy</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                Operating across technology, arts, and consulting to build scalable enterprises that define the future.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-accent/40 shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 sm:translate-y-8 transition-all duration-500 group relative overflow-hidden z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-500 -z-10" />
                            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors duration-300">Our Ecosystem</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                Artemclava, Acspire, and ArtAxis represent our commitment to innovation and pushing boundaries.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Our Journey</h2>
                </div>

                <div className="relative">
                    {/* Vertical Line Animated */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-accent via-accent-hover to-transparent transform -translate-x-1/2 rounded-full"
                    />

                    <TimelineItem
                        year="2020"
                        title="The Foundation"
                        desc="SARGIA Group was established with a core vision to disrupt traditional consulting and tech markets."
                        align="left"
                        index={0}
                    />
                    <TimelineItem
                        year="2022"
                        title="Launch of Artemclava"
                        desc="Introduced our premier strategic consulting arm to serve high-growth enterprises."
                        align="right"
                        index={1}
                    />
                    <TimelineItem
                        year="2024"
                        title="Acspire & ArtAxis Ecosystem"
                        desc="Expanded our portfolio into scalable tech solutions and the global creative economy."
                        align="left"
                        index={2}
                    />
                    <TimelineItem
                        year="2028"
                        title="Global Expansion"
                        desc="Scaling operations across 15+ countries with over $2B in managed strategic assets."
                        align="right"
                        index={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
