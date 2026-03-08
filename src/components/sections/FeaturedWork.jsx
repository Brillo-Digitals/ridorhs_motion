import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import VideoCard from '../VideoCard';
import Modal from '../Modal';

const JSONBIN_URL = import.meta.env.VITE_JSONBIN_BIN_ID
    ? `https://api.jsonbin.io/v3/b/${import.meta.env.VITE_JSONBIN_BIN_ID}/latest`
    : null;

export default function FeaturedWork() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            if (!JSONBIN_URL) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(JSONBIN_URL, {
                    headers: {
                        'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Take the first 3 videos as featured
                    setFeaturedProjects((data.record?.videos || []).slice(0, 3));
                }
            } catch (err) {
                console.error("Error fetching featured work:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    if (isLoading) return null;
    if (featuredProjects.length === 0) return null;

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
