import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiYoutube, FiInstagram, FiSend } from 'react-icons/fi';
import Button from '../Button';
import SectionHeader from '../SectionHeader';

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementation for handling form (e.g., Formspree or generic mailto handler)
        alert("This would typically submit the form to a backend or service like Formspree.");
    };

    return (
        <section id="contact" className="py-24 bg-[var(--color-primary)] relative border-t border-[var(--color-divider)] overflow-hidden">

            {/* Dynamic Background Glows */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent-primary)]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent-secondary)]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <SectionHeader
                    title="Start Your Project"
                    subtitle="Get in Touch"
                    centered={true}
                />

                <div className="max-w-4xl mx-auto mt-16 bg-[#111111] border border-[var(--color-divider)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">

                    {/* Contact Info Panel */}
                    <div className="md:w-2/5 md:bg-gradient-to-br md:from-[var(--color-accent-primary)] md:to-[var(--color-highlight)] p-10 flex flex-col text-white relative">
                        <h3 className="text-2xl font-poppins font-bold mb-4 z-10">Contact Info</h3>
                        <p className="text-white/80 mb-10 z-10 text-sm leading-relaxed">
                            Ready to elevate your visual content? Fill out the form and let's craft something cinematically beautiful together.
                        </p>

                        <div className="space-y-6 flex-grow z-10">
                            <div className="flex items-center gap-4">
                                <FiMail className="w-6 h-6 text-[var(--color-accent-secondary)] md:text-white/80" />
                                <span className="text-sm">contact@ridorhsmotion.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <FiMapPin className="w-6 h-6 text-[var(--color-accent-secondary)] md:text-white/80" />
                                <span className="text-sm">Available Worldwide</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12 z-10">
                            <motion.a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                                whileHover={{ y: -3 }}
                                aria-label="YouTube"
                            >
                                <FiYoutube className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                                whileHover={{ y: -3 }}
                                aria-label="Instagram"
                            >
                                <FiInstagram className="w-5 h-5" />
                            </motion.a>
                        </div>

                        {/* Panel decorative elements */}
                        <div className="hidden md:block absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none"></div>
                    </div>

                    {/* Form Form */}
                    <div className="md:w-3/5 p-10 bg-[var(--color-secondary)]">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-transparent border-b border-[var(--color-divider)] py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full bg-transparent border-b border-[var(--color-divider)] py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full bg-transparent border-b border-[var(--color-divider)] py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2">Interested In</label>
                                <select
                                    id="service"
                                    className="w-full bg-transparent border-b border-[var(--color-divider)] py-2 text-white focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors [&>option]:bg-[#111]"
                                >
                                    <option value="video-editing">Video Editing</option>
                                    <option value="motion-graphics">Motion Graphics</option>
                                    <option value="animation">Animation</option>
                                    <option value="youtube-editing">YouTube Editing</option>
                                    <option value="coaching">Creative Coaching</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows="4"
                                    className="w-full bg-transparent border-b border-[var(--color-divider)] py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" variant="primary" icon={FiSend} className="w-full md:w-auto">
                                    Send Message
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
