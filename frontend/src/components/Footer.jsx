const Footer = () => {
    const scrollToSection = (e, path) => {
        e.preventDefault();
        const element = document.querySelector(path);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-white text-gray-600 pt-24 pb-12 border-t border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2 mb-6">
                            <img src="https://res.cloudinary.com/msfnuwdi/image/upload/v1786340166/WhatsApp_Image_2026-08-10_at_11.05.15_AM.jpg" alt="SARGIA Logo" className="h-12 w-12 rounded-full object-cover" />
                            SARGIA
                        </a>
                        <p className="text-gray-600 mt-4 max-w-sm leading-relaxed">
                            A premier technology and investment group. We build, scale, and empower businesses that define the future of innovation.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6">Our Businesses</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#businesses" onClick={(e) => scrollToSection(e, '#businesses')} className="hover:text-accent transition-colors">Artemclava</a></li>
                            <li><a href="#businesses" onClick={(e) => scrollToSection(e, '#businesses')} className="hover:text-accent transition-colors">Acspire</a></li>
                            <li><a href="#businesses" onClick={(e) => scrollToSection(e, '#businesses')} className="hover:text-accent transition-colors">ArtAxis</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#vision-mission" onClick={(e) => scrollToSection(e, '#vision-mission')} className="hover:text-accent transition-colors">Vision &amp; Mission</a></li>
                            <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-accent transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="https://www.linkedin.com/in/shrinija-b-kunam-b76487260?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
                            <li><a href="https://www.instagram.com/talks_with_sargia?igsh=MXE2ejM4MHEzMnVxOQ==" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium">
                    <p>&copy; {new Date().getFullYear()} SARGIA Group. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-800 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-800 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
