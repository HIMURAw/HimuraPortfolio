"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    FileEdit,
    Settings,
    StickyNote,
    Lock,
    CheckSquare
} from 'lucide-react';
import { stats } from './db';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen = false }) => {

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div
                className="hidden lg:flex flex-col w-64 bg-gray-900/50 backdrop-blur-xl border-r border-white/10 h-screen fixed left-0 top-0 z-30"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
            >
                {/* Logo - Header'ın altında */}
                <div className="pt-24 pb-6 px-6 flex items-center justify-center border-b border-white/10">
                    <motion.div
                        className="relative w-16 h-16"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image
                            src="/himura.png"
                            alt="Logo"
                            width={64}
                            height={64}
                            className="rounded-xl"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'visitors', icon: Users, label: 'Visitors' },
                        { id: 'messages', icon: MessageSquare, label: 'Messages', badge: stats.unreadMessages },
                        { id: 'blog', icon: FileEdit, label: 'Blog Posts' },
                        { id: 'notes', icon: StickyNote, label: 'Notes' },
                        { id: 'passwords', icon: Lock, label: 'Passwords' },
                        { id: 'todos', icon: CheckSquare, label: 'To DO' },
                        { id: 'settings', icon: Settings, label: 'Settings' },
                    ].map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                : 'text-gray-400 hover:bg-white/5'
                                }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </div>

                            {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </nav>
            </motion.div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lg:hidden w-72 max-w-[85vw] bg-gray-900/98 backdrop-blur-xl border-r border-white/10 h-screen fixed left-0 top-0 p-6 z-[55] shadow-2xl"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        {/* Logo */}
                        <div className="mb-6 flex items-center justify-center">
                            <motion.div
                                className="relative w-16 h-16"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    src="/himura.png"
                                    alt="Logo"
                                    width={64}
                                    height={64}
                                    className="rounded-xl"
                                    priority
                                />
                            </motion.div>
                        </div>

                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
                            <p className="text-sm text-gray-400 mt-1">Portfolio Management</p>
                        </div>

                        <nav className="space-y-2">
                            {[
                                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                                { id: 'visitors', icon: Users, label: 'Visitors' },
                                { id: 'messages', icon: MessageSquare, label: 'Messages', badge: stats.unreadMessages },
                                { id: 'blog', icon: FileEdit, label: 'Blog Posts' },
                                { id: 'notes', icon: StickyNote, label: 'Notes' },
                                { id: 'passwords', icon: Lock, label: 'Passwords' },
                                { id: 'todos', icon: CheckSquare, label: 'To DO' },
                                { id: 'settings', icon: Settings, label: 'Settings' },
                            ].map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        : 'text-gray-400 hover:bg-white/5'
                                        }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </div>

                                    {item.badge && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};



export default Sidebar;