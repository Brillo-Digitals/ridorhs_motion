import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';

export default function VideoCard({ video, onClick }) {
    // Extract thumbnail from YouTube URL if using standard embed
    // E.g. https://www.youtube.com/embed/VIDEO_ID
    const getThumbnail = (url) => {
        try {
            const match = url.match(/\/embed\/([^?]+)/);
            if (match && match[1]) {
                return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
            }
            return null;
        } catch {
            return null;
        }
    };

    const thumbnail = getThumbnail(video.youtubeLink);

    return (
        <motion.div
            className="group relative flex flex-col bg-[var(--color-secondary)] rounded-2xl overflow-hidden cursor-pointer border border-[var(--color-divider)] hover:border-[var(--color-accent-primary)] transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            onClick={() => onClick(video)}
        >
            {/* Thumbnail Container */}
            <div className="relative aspect-video overflow-hidden bg-black/50">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-500">No Target Thumbnail</span>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-[var(--color-accent-primary)]/90 flex items-center justify-center text-white pl-1 shadow-[0_0_30px_rgba(122,92,255,0.6)]"
                        whileHover={{ scale: 1.1 }}
                    >
                        <FiPlay className="w-6 h-6" />
                    </motion.div>
                </div>

                {/* Category Badge */}
                {video.category && (
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-[var(--color-text-secondary)]">
                        {video.category}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-poppins font-semibold text-white mb-2 group-hover:text-[var(--color-highlight)] transition-colors">
                    {video.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2 mt-auto">
                    {video.description}
                </p>
            </div>
        </motion.div>
    );
}
