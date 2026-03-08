import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from './Button';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Featured Work', href: '/#featured' },
        { name: 'Portfolio', href: '/#portfolio' },
        { name: 'Services', href: '/#services' },
        { name: 'About', href: '/#about' },
    ];

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false);

        // Smooth scroll if on home page
        if (isHome && href.startsWith('/#')) {
            const id = href.substring(2);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-lg border-b border-[var(--color-divider)] shadow-lg' : 'py-6 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="font-poppins font-bold text-2xl tracking-tight text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-[0_0_15px_rgba(122,92,255,0.4)]">
                                <span className="text-white text-sm">R</span>
                            </span>
                            Ridorhs<span className="text-[var(--color-accent-primary)]">Motion</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    {isHome ? (
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link.href);
                                            }}
                                            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors relative group"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors relative group"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <Button
                            href={isHome ? "#contact" : "/#contact"}
                            variant="outline"
                            className="px-5 py-2 text-sm"
                            onClick={(e) => {
                                if (isHome) {
                                    e.preventDefault();
                                    handleNavClick('/#contact');
                                }
                            }}
                        >
                            Contact Us
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex justify-center items-center"
                    >
                        <button
                            className="absolute top-6 right-6 text-white p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <FiX className="w-8 h-8" />
                        </button>
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {isHome ? (
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link.href);
                                            }}
                                            className="text-2xl font-poppins font-semibold text-white hover:text-[var(--color-accent-primary)] transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-poppins font-semibold text-white hover:text-[var(--color-accent-primary)] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="mt-4"
                            >
                                <Button
                                    href={isHome ? "#contact" : "/#contact"}
                                    variant="primary"
                                    onClick={(e) => {
                                        if (isHome) {
                                            e.preventDefault();
                                            handleNavClick('/#contact');
                                        }
                                    }}
                                >
                                    Contact Us
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
