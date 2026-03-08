import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import VideoCard from '../VideoCard';
import Modal from '../Modal';

// JSONBin URL will be replaced by user's actual dot env value later
const JSONBIN_URL = import.meta.env.VITE_JSONBIN_BIN_ID
    ? `https://api.jsonbin.io/v3/b/${import.meta.env.VITE_JSONBIN_BIN_ID}/latest`
    : null;

// Initial fallback mock data until JSONBin is fully linked
const MOCK_VIDEOS = [
    {
        id: 101,
        title: "Cinematic Motion Intro",
        description: "A cinematic motion intro created in After Effects combining sleek text reveals with deep lens flares.",
        youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Motion Graphics",
        date: "2025"
    },
    {
        id: 102,
        title: "YouTube Explainer Edit",
        description: "Fast-paced documentary style editing for top creators, featuring map animations and dynamic transitions.",
        youtubeLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
        category: "YouTube Editing",
        date: "2024"
    },
    {
        id: 103,
        title: "Abstract Logo Sting",
        description: "3D abstract forms resolving into a clean corporate logo.",
        youtubeLink: "https://www.youtube.com/embed/2ZIpFytCSVc",
        category: "Animation",
        date: "2024"
    },
    {
        id: 104,
        title: "Gaming Highlights Montage",
        description: "High energy sync editing for gaming highlights with VFX overlays and custom SFX.",
        youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Video Editing",
        date: "2025"
    }
];

export default function PortfolioList() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchVideos = async () => {
            if (!JSONBIN_URL) {
                // Use Mock data if no API configured
                setTimeout(() => {
                    setVideos(MOCK_VIDEOS);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            try {
                const response = await fetch(JSONBIN_URL, {
                    headers: {
                        'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch videos');

                const data = await response.json();
                // Assuming JSONBin structure: { record: { videos: [...] } }
                const videoList = data.record?.videos || [];
                // Add fake IDs if missing for React keys
                const formattedVideos = videoList.map((v, i) => ({ ...v, id: v.id || `v-${i}` }));
                setVideos(formattedVideos);
            } catch (err) {
                console.error("Error fetching from JSONBin:", err);
                setError("Failed to load portfolio. Showing cached content.");
                setVideos(MOCK_VIDEOS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const categories = ['All', ...new Set(videos.map(v => v.category).filter(Boolean))];

    const filteredVideos = filter === 'All'
        ? videos
        : videos.filter(v => v.category === filter);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <section id="portfolio" className="py-24 bg-[var(--color-secondary)] relative border-t border-[var(--color-divider)]">
            {/* Decorative subtle grid */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN1Y1LjM3M0g1LjM3M3Y0OS4yNTRoNDkuMjU0ek01LjM3MyA1LjM3M2g0OS4yNTR2NDkuMjU0SDUuMzczVjUuMzczem0yNC42MjcgMjQuNjI3VjUuMzczSDI5Ljk5djk0LjEyN2g0Mi42MzZIMjkuOTl6bTAgMjQuNjI3aC0xLjEzNXYtNDkuMjU0aDEuMTM1djQ5LjI1NHptMjQuNjI3LTQ5LjI1NHYxLjEzM0g1LjM3M1Y1LjM3M2g0OS4yNTR6TTE3LjUgMjh2MmgtMTJ2LTJoMTJ6bTE3IDI0djJoLTEydS0yaDEyem0xNy0yNHYyaC0xMnYtMmgxMnoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <SectionHeader
                    title="Full Portfolio"
                    subtitle="Discover My Work"
                    centered={true}
                />

                {/* Filters */}
                {!isLoading && categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${filter === cat
                                        ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)] text-white shadow-[0_0_15px_rgba(122,92,255,0.4)]'
                                        : 'bg-transparent border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-secondary)] hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <motion.div
                            className="w-16 h-16 border-4 border-[var(--color-divider)] border-t-[var(--color-accent-primary)] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredVideos.map((video, index) => (
                                <motion.div
                                    key={video.id || index}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <VideoCard video={video} onClick={handleVideoClick} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
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
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-[var(--color-accent-primary)] text-sm font-semibold">
                                    {selectedVideo.category}
                                </div>
                                {selectedVideo.date && (
                                    <div className="text-[var(--color-text-secondary)] text-sm">
                                        {selectedVideo.date}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-4">
                                {selectedVideo.title}
                            </h2>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg whitespace-pre-line">
                                {selectedVideo.description}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}
