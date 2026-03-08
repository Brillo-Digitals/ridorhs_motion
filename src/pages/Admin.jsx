import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiPlus, FiSave, FiAlertCircle, FiCheckCircle, FiX, FiEdit2, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import Button from '../components/Button';

// The pre-calculated SHA-256 hash for the admin password "Ridwan@2006"
const ADMIN_HASH = 'fee91a974d4f9a7d3a6c61303c8ce751c1d5d25bd39c1b821c02650a51bd210c';

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

const EMPTY_FORM = {
    title: '',
    description: '',
    youtubeLink: '',
    category: 'Video Editing',
    date: new Date().getFullYear().toString()
};

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ video, onClose, onSave, isSaving }) {
    const [formData, setFormData] = useState({ ...video });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="w-full max-w-lg bg-[#111111] border border-[var(--color-divider)] rounded-3xl p-8 shadow-2xl relative"
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-poppins font-bold text-white flex items-center gap-2">
                            <FiEdit2 className="text-[var(--color-accent-primary)]" />
                            Edit Video
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[var(--color-text-secondary)] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Title</label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleChange} required
                                className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">YouTube Embed Link</label>
                            <input
                                type="url" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} required
                                className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none transition-colors"
                                placeholder="https://www.youtube.com/embed/..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Category</label>
                                <select
                                    name="category" value={formData.category} onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-3 py-2.5 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none"
                                >
                                    <option>Video Editing</option>
                                    <option>Motion Graphics</option>
                                    <option>Animation</option>
                                    <option>Commercial</option>
                                    <option>YouTube Editing</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Year</label>
                                <input
                                    type="text" name="date" value={formData.date} onChange={handleChange} required
                                    className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-2">Description</label>
                            <textarea
                                name="description" value={formData.description} onChange={handleChange} required rows="3"
                                className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none resize-none transition-colors"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button" onClick={onClose}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:text-white hover:border-white transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit" disabled={isSaving}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-accent-primary)] text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                            >
                                <FiSave className="w-4 h-4" />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({ video, onClose, onConfirm, isDeleting }) {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="w-full max-w-sm bg-[#111111] border border-red-500/20 rounded-3xl p-8 shadow-2xl text-center"
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <FiTrash2 className="text-red-400 w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-poppins font-bold text-white mb-2">Delete Video?</h2>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                        "<span className="text-white font-medium">{video.title}</span>" will be permanently removed from your portfolio.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:text-white hover:border-white transition-colors text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm} disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-400 transition-colors disabled:opacity-60"
                        >
                            <FiTrash2 className="w-4 h-4" />
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────
export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Dashboard state
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // Modals
    const [editingVideo, setEditingVideo] = useState(null);
    const [deletingVideo, setDeletingVideo] = useState(null);

    // New Video Form
    const [formData, setFormData] = useState({ ...EMPTY_FORM });

    useEffect(() => {
        const auth = sessionStorage.getItem('ridorhs_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchVideos();
        }
    }, []);

    const showStatus = (type, text) => {
        setStatusMsg({ type, text });
        setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    };

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
                setLoginError('Incorrect password. Please try again.');
            }
        } catch {
            setLoginError('Authentication error. Please try again.');
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
            showStatus('warning', 'JSONBin is not configured. Add env variables to connect.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${JSONBIN_URL}/latest`, {
                headers: { 'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || '' }
            });
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setVideos(data.record?.videos || []);
        } catch {
            showStatus('error', 'Error fetching videos from JSONBin.');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Helpers to write back to JSONBin ──────────────────────────────────────
    const pushToJSONBin = async (updatedVideos) => {
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
            },
            body: JSON.stringify({ videos: updatedVideos })
        });
        if (!response.ok) throw new Error('Failed to save');
        return updatedVideos;
    };

    // ── Add ───────────────────────────────────────────────────────────────────
    const handleAddVideo = async (e) => {
        e.preventDefault();
        if (!JSONBIN_URL) { showStatus('error', 'JSONBin is not configured.'); return; }
        setIsSaving(true);
        const newVideo = { ...formData, id: `v-${Date.now()}` };
        try {
            const updated = await pushToJSONBin([newVideo, ...videos]);
            setVideos(updated);
            setFormData({ ...EMPTY_FORM });
            showStatus('success', `"${newVideo.title}" added successfully!`);
        } catch {
            showStatus('error', 'Failed to save video to database.');
        } finally {
            setIsSaving(false);
        }
    };

    // ── Update / Edit ─────────────────────────────────────────────────────────
    const handleUpdateVideo = async (updatedVideo) => {
        setIsSaving(true);
        try {
            const updated = await pushToJSONBin(
                videos.map(v => v.id === updatedVideo.id ? updatedVideo : v)
            );
            setVideos(updated);
            setEditingVideo(null);
            showStatus('success', `"${updatedVideo.title}" updated successfully!`);
        } catch {
            showStatus('error', 'Failed to update video.');
        } finally {
            setIsSaving(false);
        }
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDeleteVideo = async () => {
        if (!deletingVideo) return;
        setIsSaving(true);
        try {
            const updated = await pushToJSONBin(videos.filter(v => v.id !== deletingVideo.id));
            setVideos(updated);
            showStatus('success', `"${deletingVideo.title}" removed.`);
            setDeletingVideo(null);
        } catch {
            showStatus('error', 'Failed to delete video.');
        } finally {
            setIsSaving(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    //  LOGIN SCREEN
    // ─────────────────────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center p-6 pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#111111] border border-[var(--color-divider)] rounded-3xl p-8 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(122,92,255,0.4)]">
                            <span className="text-white text-xl font-bold font-poppins">R</span>
                        </div>
                        <h1 className="text-2xl font-poppins font-bold text-white mb-2">Admin Portal</h1>
                        <p className="text-[var(--color-text-secondary)] text-sm">Sign in to manage your portfolio.</p>
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

                        <Button type="submit" className="w-full">Authenticate</Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  DASHBOARD
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-24">

            {/* Edit & Delete Modals */}
            {editingVideo && (
                <EditModal
                    video={editingVideo}
                    onClose={() => setEditingVideo(null)}
                    onSave={handleUpdateVideo}
                    isSaving={isSaving}
                />
            )}
            {deletingVideo && (
                <DeleteConfirmModal
                    video={deletingVideo}
                    onClose={() => setDeletingVideo(null)}
                    onConfirm={handleDeleteVideo}
                    isDeleting={isSaving}
                />
            )}

            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-poppins font-bold text-white mb-1">Dashboard</h1>
                        <p className="text-[var(--color-text-secondary)] text-sm">Manage your portfolio videos</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchVideos}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:text-white hover:border-white transition-colors text-sm disabled:opacity-40"
                            title="Refresh"
                        >
                            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:text-white hover:border-white transition-colors text-sm"
                        >
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>

                {/* Status Banner */}
                <AnimatePresence>
                    {statusMsg.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${statusMsg.type === 'error'
                                ? 'bg-red-500/10 border-red-500/20 text-red-200'
                                : statusMsg.type === 'success'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-200'
                                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
                                }`}
                        >
                            {statusMsg.type === 'success' ? <FiCheckCircle className="w-5 h-5 shrink-0" /> : <FiAlertCircle className="w-5 h-5 shrink-0" />}
                            {statusMsg.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Add Form ── */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#111111] border border-[var(--color-divider)] rounded-3xl p-6 sticky top-32">
                            <h2 className="text-lg font-poppins font-bold text-white mb-6 flex items-center gap-2">
                                <FiPlus className="text-[var(--color-accent-primary)]" /> Add New Video
                            </h2>

                            <form onSubmit={handleAddVideo} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-1.5">Title</label>
                                    <input type="text" name="title" value={formData.title}
                                        onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required
                                        className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none"
                                        placeholder="e.g. Cyberpunk Promo" />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-1.5">YouTube Embed Link</label>
                                    <input type="url" name="youtubeLink" value={formData.youtubeLink}
                                        onChange={e => setFormData(p => ({ ...p, youtubeLink: e.target.value }))} required
                                        className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none"
                                        placeholder="https://www.youtube.com/embed/..." />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-1.5">Category</label>
                                        <select name="category" value={formData.category}
                                            onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                                            className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-3 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none">
                                            <option>Video Editing</option>
                                            <option>Motion Graphics</option>
                                            <option>Animation</option>
                                            <option>Commercial</option>
                                            <option>YouTube Editing</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-1.5">Year</label>
                                        <input type="text" name="date" value={formData.date}
                                            onChange={e => setFormData(p => ({ ...p, date: e.target.value }))} required
                                            className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-[var(--color-text-secondary)] font-medium mb-1.5">Description</label>
                                    <textarea name="description" value={formData.description}
                                        onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} required rows="3"
                                        className="w-full bg-[#1a1a1a] border border-[var(--color-divider)] rounded-xl px-4 py-2 text-white text-sm focus:border-[var(--color-accent-primary)] outline-none resize-none"
                                        placeholder="Brief description..." />
                                </div>

                                <button
                                    type="submit" disabled={isSaving}
                                    className="w-full mt-2 px-4 py-2.5 rounded-xl bg-[var(--color-accent-primary)] text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                                >
                                    <FiSave className="w-4 h-4" />
                                    {isSaving ? 'Saving...' : 'Add Video'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Video List ── */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111111] border border-[var(--color-divider)] rounded-3xl overflow-hidden">
                            <div className="p-5 border-b border-[var(--color-divider)] flex justify-between items-center bg-[#151515]">
                                <h2 className="text-lg font-poppins font-bold text-white">Current Portfolio</h2>
                                <span className="text-xs bg-[var(--color-divider)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full">
                                    {videos.length} video{videos.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="p-5">
                                {isLoading && videos.length === 0 ? (
                                    <div className="animate-pulse space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-20 bg-[var(--color-divider)] rounded-xl" />
                                        ))}
                                    </div>
                                ) : videos.length === 0 ? (
                                    <div className="text-center py-14 text-[var(--color-text-secondary)] border-2 border-dashed border-[var(--color-divider)] rounded-2xl">
                                        <FiPlus className="w-8 h-8 mx-auto mb-3 opacity-40" />
                                        <p>No videos yet. Add your first one!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                                        <AnimatePresence>
                                            {videos.map(video => (
                                                <motion.div
                                                    key={video.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-[var(--color-divider)] hover:border-[var(--color-accent-secondary)]/40 transition-colors group"
                                                >
                                                    {/* Thumbnail */}
                                                    <div className="w-28 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={
                                                                video.youtubeLink?.includes('/embed/')
                                                                    ? `https://img.youtube.com/vi/${video.youtubeLink.split('/embed/')[1]?.split('?')[0]}/hqdefault.jpg`
                                                                    : ''
                                                            }
                                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                            alt=""
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-grow min-w-0">
                                                        <h3 className="text-white font-medium text-sm truncate">{video.title}</h3>
                                                        <div className="flex gap-2 mt-1 mb-1.5">
                                                            <span className="text-xs text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 px-2 py-0.5 rounded-full">
                                                                {video.category}
                                                            </span>
                                                            <span className="text-xs text-[var(--color-text-secondary)]">{video.date}</span>
                                                        </div>
                                                        <p className="text-xs text-[var(--color-text-secondary)] truncate">{video.description}</p>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-col gap-1.5 items-center justify-center pl-1 shrink-0">
                                                        <button
                                                            onClick={() => setEditingVideo(video)}
                                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/10 p-2 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <FiEdit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setDeletingVideo(video)}
                                                            className="text-[var(--color-text-secondary)] hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
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
