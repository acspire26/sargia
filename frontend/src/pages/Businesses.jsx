import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getBusinesses } from '../services/api';
import { ArrowUpRight, Target, Cpu, Palette, Briefcase } from 'lucide-react';

const defaultBusinesses = [
    {
        id: 'artemclava',
        name: 'Artemclava',
        description: 'Our premier strategic consulting arm serving high-growth enterprises. Artemclava focuses on delivering transformative business strategies and operational excellence.',
        website_url: 'https://artemclava.in',
        logo_url: 'https://res.cloudinary.com/msfnuwdi/image/upload/v1786342081/ChatGPT_Image_Aug_10_2026_11_37_25_AM.png'
    },
    {
        id: 'acspire',
        name: 'Acspire',
        description: 'A cutting-edge technology solutions provider. Acspire builds scalable, high-performance software ecosystems designed to outpace market evolution.',
        website_url: 'https://acspire.in',
        logo_url: 'https://res.cloudinary.com/msfnuwdi/image/upload/v1786342221/acspire_1024x1024.png'
    },
    {
        id: 'artaxis',
        name: 'ArtAxis',
        description: 'Connecting the global creative economy. ArtAxis leverages technology to empower artists, creators, and platforms in the digital age.',
        website_url: 'https://artaxis.academy',
        logo_url: 'https://res.cloudinary.com/msfnuwdi/image/upload/v1786342212/art_axis_1024x1024.png'
    }
];

const getBusinessIcon = (nameOrId) => {
    const key = String(nameOrId).toLowerCase();
    switch (key) {
        case 'artemclava': return <Target size={32} className="transition-colors" />;
        case 'acspire': return <Cpu size={32} className="transition-colors" />;
        case 'artaxis': return <Palette size={32} className="transition-colors" />;
        default: return <Briefcase size={32} className="transition-colors" />;
    }
};

const Businesses = () => {
    const [businesses, setBusinesses] = useState(defaultBusinesses);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBusinesses().then(data => {
            if (data && data.results && data.results.length > 0) {
                setBusinesses(data.results);
            }
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-primary">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block py-1.5 px-4 rounded-full glass bg-black/5 text-xs font-bold tracking-widest text-accent mb-6 shadow-sm border border-black/5"
                    >
                        OUR BUSINESSES
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6"
                    >
                        Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Excellence.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
                    >
                        Explore our curated portfolio of industry-leading companies driving innovation and transforming the global landscape.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {businesses.map((business, index) => (
                        <motion.div
                            key={business.id}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -12, scale: 1.02 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 250, damping: 20 }}
                            className="group relative p-1 rounded-[2rem] overflow-hidden bg-white shadow-md hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] hover:-translate-y-2 transition-all duration-500 border border-slate-200 hover:border-accent/40 flex z-10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-transparent group-hover:from-accent/5 transition-colors duration-700 pointer-events-none -z-10" />

                            <div className="bg-white rounded-[1.8rem] p-8 w-full flex flex-col relative z-10 transition-colors duration-500">
                                <div className="mb-8">
                                    {business.logo_url ? (
                                        <img src={business.logo_url} alt={business.name} className="w-20 h-20 rounded-md object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 origin-center transition-all duration-500 bg-white border border-slate-100 p-1" />
                                    ) : (
                                        <div className="w-20 h-20 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:-rotate-3 transition-all duration-500">
                                            {getBusinessIcon(business.name)}
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight group-hover:text-accent transition-colors duration-300">{business.name}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium mb-8 flex-grow">
                                    {business.description}
                                </p>

                                {business.website_url ? (
                                    <div className="pt-6 border-t border-slate-100 mt-auto">
                                        <a
                                            href={business.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-accent transition-colors"
                                        >
                                            Visit Website
                                            <ArrowUpRight size={16} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="pt-6 border-t border-slate-100 mt-auto">
                                        <span className="text-sm text-gray-400 font-semibold">Coming Soon</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Businesses;
