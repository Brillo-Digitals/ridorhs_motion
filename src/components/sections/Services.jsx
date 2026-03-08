import { motion } from 'framer-motion';
import { FiVideo, FiMonitor, FiFilm, FiYoutube, FiLayout, FiTarget } from 'react-icons/fi';
import SectionHeader from '../SectionHeader';

const services = [
    {
        title: "Video Editing",
        description: "High-paced storytelling, multi-cam editing, and flawless rhythm designed to retain viewer attention.",
        icon: FiFilm,
        color: "from-[#FF416C] to-[#FF4B2B]"
    },
    {
        title: "Motion Graphics",
        description: "Custom 2D/3D animations, title sequences, infographics, and kinetic typography that establish brand presence.",
        icon: FiLayout,
        color: "from-[var(--color-accent-primary)] to-[#c55cff]"
    },
    {
        title: "Animation",
        description: "Bringing characters and abstract concepts to life through keyframed perfection and advanced physics.",
        icon: FiVideo,
        color: "from-[#00E5FF] to-[#0072FF]"
    },
    {
        title: "YouTube Editing",
        description: "Specialized editing for creators. Retention-focused cuts, SFX, and meme integration that boosts AVD.",
        icon: FiYoutube,
        color: "from-[#F51D2C] to-[#C9000E]"
    },
    {
        title: "Content Creation",
        description: "End-to-end ideation and production for TikTok, Reels, and Shorts designed for maximum viral potential.",
        icon: FiMonitor,
        color: "from-[#f12711] to-[#f5af19]"
    },
    {
        title: "Creative Coaching",
        description: "1-on-1 sessions teaching the secrets of pacing, advanced After Effects, and building a creative business.",
        icon: FiTarget,
        color: "from-[#00b09b] to-[#96c93d]"
    }
];

export default function Services() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        },
    };

    return (
        <section id="services" className="py-24 bg-[var(--color-primary)] relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionHeader
                    title="What I Do"
                    subtitle="Services"
                    centered={false}
                />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group p-8 rounded-2xl bg-[#131313] border border-[var(--color-divider)] hover:border-[var(--color-accent-primary)]/50 transition-colors duration-300 relative overflow-hidden"
                            >
                                {/* Hover Glow Background */}
                                <div className={`absolute -inset-2 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] blur-2xl transition-opacity duration-500`}></div>

                                {/* Icon Container */}
                                <div className="mb-6 relative">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-black border border-[var(--color-divider)] relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className="w-6 h-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70" />
                                        {/* Icon Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-40 blur-md rounded-xl transition-opacity duration-500 -z-10`}></div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-poppins font-semibold text-white mb-3 relative z-10">
                                    {service.title}
                                </h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm relative z-10">
                                    {service.description}
                                </p>

                                {/* Bottom decorative line */}
                                <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-500 ease-out`}></div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
