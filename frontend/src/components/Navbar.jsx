import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Simple active section detection
            const sections = ['home', 'about', 'vision-mission', 'businesses', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -100 && rect.top <= window.innerHeight / 2;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '#home', id: 'home' },
        { name: 'About', path: '#about', id: 'about' },
        { name: 'Our Businesses', path: '#businesses', id: 'businesses' },
        { name: 'Contact', path: '#contact', id: 'contact' },
    ];

    const scrollToSection = (e, path) => {
        e.preventDefault();
        const element = document.querySelector(path);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                            <img src="https://res.cloudinary.com/msfnuwdi/image/upload/v1786340166/WhatsApp_Image_2026-08-10_at_11.05.15_AM.jpg" alt="SARGIA Logo" className="h-12 w-12 rounded-full object-cover" />
                            SARGIA
                        </a>
                    </div>
                    <div className="hidden md:flex space-x-1 border border-black/5 bg-black/5 backdrop-blur-md rounded-md px-2 py-1 shadow-sm">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => scrollToSection(e, link.path)}
                                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/80 rounded-md shadow-sm border border-gray-200/50"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            );
                        })}
                    </div>
                    <div className="hidden md:flex items-center">
                        <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="px-6 py-2.5 rounded-md bg-white text-gray-900 text-sm font-semibold hover:bg-gray-800 hover:text-white transition-colors shadow-md border border-gray-200">
                            Contact Us
                        </a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md bg-black/5 border border-black/10"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-white border-b border-black/5 shadow-md"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        onClick={(e) => scrollToSection(e, link.path)}
                                        className={`block px-4 py-3 rounded-md text-base font-semibold transition-colors ${isActive ? 'bg-black/5 text-gray-900' : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'}`}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
