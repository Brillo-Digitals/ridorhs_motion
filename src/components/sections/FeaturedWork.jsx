import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import VideoCard from '../VideoCard';
import Modal from '../Modal';

const featuredProjects = [
    {
        id: 1,
        title: "Cyberpunk City Ad",
        description: "A highly stylized, 3D integrated commercial piece utilizing advanced compositing in After Effects and dynamic editing.",
        youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder, user will update via JSONBin
        category: "Commercial",
    },
    {
        id: 2,
        title: "Esports Tournament Intro",
        description: "Kinetic typography, glitch effects, and high-energy motion design created for a major gaming tournament.",
        youtubeLink: "https://www.youtube.com/embed/jNQXAC9IVRw", // Placeholder
        category: "Motion Graphics",
    },
    {
        id: 3,
        title: "Tech Product Launch",
        description: "Sleek and minimal 3D product visualization mixed with smooth 2D motion graphics and UI animation.",
        youtubeLink: "https://www.youtube.com/embed/2ZIpFytCSVc", // Placeholder
        category: "Product Promo",
    }
];

export default function FeaturedWork() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <section id="featured" className="py-24 bg-[var(--color-primary)] relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionHeader
                    title="Featured Work"
                    subtitle="Highlight Reel"
                    centered={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <VideoCard video={project} onClick={handleVideoClick} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)}>
                {selectedVideo && (
                    <div className="flex flex-col h-full bg-black">
                        <div className="relative aspect-video w-full">
                            <iframe
                                src={`${selectedVideo.youtubeLink}?autoplay=1&rel=0`}
                                title={selectedVideo.title}
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6 md:p-8 bg-[var(--color-secondary)]">
                            <div className="text-[var(--color-accent-primary)] text-sm font-semibold mb-2">
                                {selectedVideo.category}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-4">
                                {selectedVideo.title}
                            </h2>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
                                {selectedVideo.description}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}
