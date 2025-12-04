"use client"

import react, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MessageSquare,
    Filter,
    Search,
    CheckCircle,
    Trash2,
    Mail,
    Clock
} from 'lucide-react';

const recentMessages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'I would like to discuss a project...', date: '2 hours ago', read: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Great portfolio! Can we collaborate?', date: '5 hours ago', read: false },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', message: 'Looking for a developer for my startup', date: '1 day ago', read: true },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', message: 'Interested in hiring you for a project', date: '2 days ago', read: true },
];

type Message = {
    id: number
    name: string
    email: string
    message: string
    date: string
    read: boolean
}


const MessagesView = () => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Messages</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                        />
                    </div>
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition flex items-center gap-2">
                        <Filter size={20} />
                        Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                    {recentMessages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className={`p-4 rounded-xl cursor-pointer transition ${selectedMessage?.id === msg.id
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                                : 'bg-white/5 hover:bg-white/10'
                                }`}
                            whileHover={{ x: 5 }}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {msg.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{msg.name}</h4>
                                        <p className="text-xs text-gray-400">{msg.email}</p>
                                    </div>
                                </div>
                                {!msg.read && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                            </div>
                            <p className="text-sm text-gray-300 truncate">{msg.message}</p>
                            <span className="text-xs text-gray-500 mt-1">{msg.date}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    {selectedMessage ? (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                                        {selectedMessage.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedMessage.name}</h3>
                                        <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <motion.button
                                        className="p-2 bg-green-600 rounded-xl hover:bg-green-700 transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <CheckCircle size={20} />
                                    </motion.button>
                                    <motion.button
                                        className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Trash2 size={20} />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Clock size={16} />
                                    <span>{selectedMessage.date}</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{selectedMessage.message}</p>
                                <div className="pt-6 mt-6 border-t border-white/10">
                                    <textarea
                                        placeholder="Type your reply..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 resize-none"
                                    />
                                    <motion.button
                                        className="mt-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Mail size={20} />
                                        Send Reply
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Select a message to view</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default MessagesView;