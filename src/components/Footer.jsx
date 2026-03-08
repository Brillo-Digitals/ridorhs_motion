import { Link } from 'react-router-dom';
import { FiYoutube, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FiYoutube, href: '#', label: 'YouTube' },
        { icon: FiInstagram, href: '#', label: 'Instagram' },
        { icon: FiMail, href: 'mailto:hello@ridorhsmotion.com', label: 'Email' },
    ];

    return (
        <footer className="bg-[var(--color-secondary)] border-t border-[var(--color-divider)] pt-16 pb-8 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent opacity-30"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-[var(--color-accent-primary)] blur-[100px] rounded-full opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" onClick={scrollToTop} className="inline-block mb-6">
                            <div className="font-poppins font-bold text-2xl tracking-tight text-white flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-[0_0_15px_rgba(122,92,255,0.4)]">
                                    <span className="text-white text-sm">R</span>
                                </span>
                                Ridorhs<span className="text-[var(--color-accent-primary)]">Motion</span>
                            </div>
                        </Link>
                        <p className="text-[var(--color-text-secondary)] max-w-sm mb-8 leading-relaxed">
                            Premium creative motion design, video editing, and animation studio dedicated to bringing your visual ideas to life with cinematic polish.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[var(--color-divider)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/10 transition-colors"
                                        whileHover={{ y: -3 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-poppins font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Featured Work', 'Portfolio', 'Services', 'About'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`/#${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Studio */}
                    <div>
                        <h4 className="text-white font-poppins font-semibold mb-6">Studio</h4>
                        <ul className="space-y-4">
                            <li>
                                <span className="block text-[var(--color-text-secondary)] text-sm mb-1">Email</span>
                                <a href="mailto:contact@ridorhsmotion.com" className="text-white hover:text-[var(--color-accent-secondary)] transition-colors text-sm font-medium">
                                    contact@ridorhsmotion.com
                                </a>
                            </li>
                            <li>
                                <span className="block text-[var(--color-text-secondary)] text-sm mb-1">Location</span>
                                <span className="text-white text-sm">Based in Nigeria,<br />Available Worldwide</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--color-divider)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[var(--color-text-secondary)] text-sm">
                        &copy; {currentYear} Ridorhs Motion. All rights reserved. Developed by <a href="https://brillodigitals.vercel.app/">Brillo Digitals</a>
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/admin" className="text-[var(--color-text-secondary)] text-sm hover:text-white transition-colors">
                            Admin Login
                        </Link>
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[var(--color-divider)] flex items-center justify-center text-white hover:border-white transition-colors"
                            aria-label="Scroll to top"
                        >
                            <FiArrowUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
