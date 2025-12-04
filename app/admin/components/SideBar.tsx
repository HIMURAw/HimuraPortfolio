"use client";

import react, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    FileEdit,
    Settings
} from 'lucide-react';
import { stats } from './db';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');

    return (
        <motion.div
            className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-white/10 h-screen fixed left-0 top-0 p-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
            <div className="mb-10">
                <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
                <p className="text-sm text-gray-400 mt-1">Portfolio Management</p>
            </div>

            <nav className="space-y-2">
                {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'visitors', icon: Users, label: 'Visitors' },
                    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: stats.unreadMessages },
                    { id: 'blog', icon: FileEdit, label: 'Blog Posts' },
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
    );
};



export default Sidebar;