import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiPlus, FiSave, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import Button from '../components/Button';

// The pre-calculated SHA-256 hash for the admin password
const ADMIN_HASH = 'fee91a974d4f9a7d3a6c613b821c02650a51bd210ca3ebcc64b732525143a5cc';

const JSONBIN_URL = import.meta.env.VITE_JSONBIN_BIN_ID
    ? `https://api.jsonbin.io/v3/b/${import.meta.env.VITE_JSONBIN_BIN_ID}`
    : null;

// Utility to hash string using Web Crypto API
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Dashboard state
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // New Video Form
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        youtubeLink: '',
        category: 'Video Editing',
        date: new Date().getFullYear().toString()
    });

    // Check session storage on mount
    useEffect(() => {
        const auth = sessionStorage.getItem('ridorhs_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchVideos();
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const hash = await sha256(password);
            if (hash === ADMIN_HASH) {
                setIsAuthenticated(true);
                sessionStorage.setItem('ridorhs_admin_auth', 'true');
                fetchVideos();
            } else {
                setLoginError('Incorrect password');
            }
        } catch (err) {
            setLoginError('Authentication error');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('ridorhs_admin_auth');
        setIsAuthenticated(false);
        setPassword('');
        setVideos([]);
    };

    const fetchVideos = async () => {
        if (!JSONBIN_URL) {
            setStatusMsg({ type: 'warning', text: 'JSONBin is not configured. Add env variables to connect.' });
            return;
        }

        setIsLoading(true);
        setStatusMsg({ type: '', text: '' });

        try {
            const response = await fetch(`${JSONBIN_URL}/latest`, {
                headers: {
                    'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
                }
            });

            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setVideos(data.record?.videos || []);
        } catch (err) {
            console.error(err);
            setStatusMsg({ type: 'error', text: 'Error fetching videos from JSONBin.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();

        if (!JSONBIN_URL) {
            setStatusMsg({ type: 'error', text: 'Cannot add video: JSONBin is not configured.' });
            return;
        }

        setIsLoading(true);
        setStatusMsg({ type: '', text: '' });

        // Generate basic unique ID based on timestamp
        const newVideo = {
            ...formData,
            id: `v-${Date.now()}`
        };

        const updatedVideos = [newVideo, ...videos];

        try {
            const response = await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
                },
                body: JSON.stringify({ videos: updatedVideos })
            });

            if (!response.ok) throw new Error('Failed to update JSONBin');

            setVideos(updatedVideos);
            setStatusMsg({ type: 'success', text: 'Video added successfully!' });

            // Reset form
            setFormData({
                title: '',
                description: '',
                youtubeLink: '',
                category: 'Video Editing',
                date: new Date().getFullYear().toString()
            });

        } catch (err) {
            console.error(err);
            setStatusMsg({ type: 'error', text: 'Failed to save video to database.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (idToRemove) => {
        if (!confirm('Are you sure you want to delete this video?')) return;

        setIsLoading(true);
        const updatedVideos = videos.filter(v => v.id !== idToRemove);

        try {
            const response = await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
                },
                body: JSON.stringify({ videos: updatedVideos })
            });

            if (!response.ok) throw new Error('Failed to update JSONBin');

            setVideos(updatedVideos);
            setStatusMsg({ type: 'success', text: 'Video removed successfully.' });
        } catch (err) {
            setStatusMsg({ type: 'error', text: 'Failed to delete video.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center p-6 pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#111111] border border-[var(--color-divider)] rounded-3xl p-8 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-poppins font-bold text-white mb-2">Admin Portal</h1>
                        <p className="text-[var(--color-text-secondary)] text-sm">Sign in to manage portfolio.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                                placeholder="Enter admin password"
                                autoFocus
                                required
                            />
                        </div>

                        <AnimatePresence>
                            {loginError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-400 text-sm flex items-center gap-2"
                                >
                                    <FiAlertCircle /> {loginError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button type="submit" className="w-full">
                            Authenticate
                        </Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-poppins font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-[var(--color-text-secondary)]">Manage your portfolio videos</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:text-white hover:border-white transition-colors"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>

                <AnimatePresence>
                    {statusMsg.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${statusMsg.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                                statusMsg.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-200' :
                                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
                                }`}
                        >
                            {statusMsg.type === 'success' ? <FiCheckCircle className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
                            {statusMsg.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Add Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#111111] border border-[var(--color-divider)] rounded-3xl p-6 md:p-8 sticky top-32">
                            <h2 className="text-xl font-poppins font-bold text-white mb-6 flex items-center gap-2">
                                <FiPlus className="text-[var(--color-accent-primary)]" /> Add New Video
                            </h2>

                            <form onSubmit={handleAddVideo} className="space-y-5">
                                <div>
                                    <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
                                        className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none" placeholder="e.g. Cyberpunk Promo" />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Youtube Embed Link</label>
                                    <input type="url" name="youtubeLink" value={formData.youtubeLink} onChange={handleInputChange} required
                                        className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none" placeholder="https://www.youtube.com/embed/..." />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange}
                                            className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-3 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none">
                                            <option>Video Editing</option>
                                            <option>Motion Graphics</option>
                                            <option>Animation</option>
                                            <option>Commercial</option>
                                            <option>YouTube Editing</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Year</label>
                                        <input type="text" name="date" value={formData.date} onChange={handleInputChange} required
                                            className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3"
                                        className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none resize-none" placeholder="Brief details..."></textarea>
                                </div>

                                <Button type="submit" disabled={isLoading} icon={FiSave} className="w-full mt-4">
                                    {isLoading ? 'Saving...' : 'Save Video'}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Video List */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111111] border border-[var(--color-divider)] rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-[var(--color-divider)] flex justify-between items-center bg-[#151515]">
                                <h2 className="text-xl font-poppins font-bold text-white">Current Portfolio</h2>
                                <span className="text-xs bg-[var(--color-divider)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full">
                                    {videos.length} videos
                                </span>
                            </div>

                            <div className="p-6">
                                {isLoading && videos.length === 0 ? (
                                    <div className="animate-pulse space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-20 bg-[var(--color-divider)] rounded-xl w-full"></div>
                                        ))}
                                    </div>
                                ) : videos.length === 0 ? (
                                    <div className="text-center py-12 text-[var(--color-text-secondary)] border-2 border-dashed border-[var(--color-divider)] rounded-2xl">
                                        <p>No videos found. Start by adding one!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                        <AnimatePresence>
                                            {videos.map(video => (
                                                <motion.div
                                                    key={video.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="flex gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-[var(--color-divider)] hover:border-[var(--color-accent-secondary)]/50 transition-colors group"
                                                >
                                                    <div className="w-32 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 relative">
                                                        {/* Cheap way to get thumbnail */}
                                                        <img
                                                            src={video.youtubeLink.includes('/embed/') ? `https://img.youtube.com/vi/${video.youtubeLink.split('/embed/')[1].split('?')[0]}/hqdefault.jpg` : ''}
                                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                            alt=""
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h3 className="text-white font-medium truncate">{video.title}</h3>
                                                        <div className="flex gap-2 mt-1 mb-2">
                                                            <span className="text-xs text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 px-2 rounded-full whitespace-nowrap">{video.category}</span>
                                                            <span className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">{video.date}</span>
                                                        </div>
                                                        <p className="text-xs text-[var(--color-text-secondary)] truncate">{video.description}</p>
                                                    </div>
                                                    <div className="flex items-center pl-2">
                                                        <button
                                                            onClick={() => handleDelete(video.id)}
                                                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                                                            title="Delete Video"
                                                        >
                                                            <FiX className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
