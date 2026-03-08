import { motion } from 'framer-motion';
import Button from '../Button';
import SectionHeader from '../SectionHeader';
import { FiArrowRight, FiVideo, FiFilm } from 'react-icons/fi';

import {
    SiDavinciresolve,
    SiBlender
} from 'react-icons/si';

const TOOL_COLORS = {
    Premiere: '#9999FF', // simplified Adobe purplish
    AfterEffects: '#9999FF',
    DaVinci: '#20A1B2',
    Blender: '#F5792A'
};

const tools = [
    { name: 'After Effects', icon: FiVideo, color: TOOL_COLORS.AfterEffects },
    { name: 'Premiere Pro', icon: FiFilm, color: TOOL_COLORS.Premiere },
    { name: 'DaVinci Resolve', icon: SiDavinciresolve, color: TOOL_COLORS.DaVinci },
    { name: 'Blender', icon: SiBlender, color: TOOL_COLORS.Blender }
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-[var(--color-secondary)] relative border-t border-[var(--color-divider)]">
            {/* Decorative subtle mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 order-2 lg:order-1">
                        <SectionHeader
                            title="The Mind Behind the Motion"
                            subtitle="About Ridwan"
                            centered={false}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="space-y-6 text-lg text-[var(--color-text-secondary)] leading-relaxed"
                        >
                            <p>
                                Hi, I'm <strong className="text-white">Ayodele Ridwan Eniola</strong>, the founder and lead creative at Ridorhs Motion. I specialize in transforming raw footage and abstract ideas into cinematic, high-retention visual stories.
                            </p>
                            <p>
                                From rapid-fire YouTube edits to complex 3D motion graphics and commercial typography sweeps, I bridge the gap between technical execution and pure creative flow. Every frame is intentional; every cut serves the narrative.
                            </p>
                            <p>
                                Beyond execution, I also offer creative coaching for aspiring editors and motion designers, breaking down the exact frameworks that top-tier creators use to dominate their niches.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mt-10"
                        >
                            <Button href="/#contact" icon={FiArrowRight}>
                                Let's Collaborate
                            </Button>
                        </motion.div>
                    </div>

                    {/* Visuals & Tools */}
                    <div className="flex-1 order-1 lg:order-2 w-full lg:w-auto flex flex-col items-center lg:items-end">
                        {/* Image Placeholder Frame */}
                        <motion.div
                            className="w-full max-w-md aspect-[4/5] bg-[#1a1a1a] rounded-3xl border border-[var(--color-divider)] overflow-hidden relative shadow-2xl"
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            {/* If you have a real image, place it here in an <img> tag. Generating placeholder visual: */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-secondary)]/10"></div>

                            <div className="absolute bottom-6 left-6 right-6">
                                {/* Glassmorphism card inside the image frame */}
                                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                                    <h4 className="text-white font-poppins font-semibold text-lg mb-4">My Arsenal</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {tools.map((tool, index) => {
                                            const Icon = tool.icon;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    title={tool.name}
                                                    className="flex items-center justify-center p-3 rounded-xl bg-black/50 border border-white/5 hover:border-white/20 transition-colors"
                                                    whileHover={{ y: -5, backgroundColor: `${tool.color} 15` }}
                                                >
                                                    <Icon className="w-6 h-6" style={{ color: tool.color }} />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
