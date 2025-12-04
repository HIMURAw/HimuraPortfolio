"use client"

import react, { useState } from 'react'
import { motion } from 'framer-motion';
import {
    Plus,
    Eye,
    Calendar,
    Trash2,
    Edit
} from 'lucide-react';

import { blogPosts } from './db';

const BlogView = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Blog Posts</h2>
            <motion.button
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Plus size={20} />
                New Post
            </motion.button>
        </div>

        <div className="grid gap-4">
            {blogPosts.map((post, i) => (
                <motion.div
                    key={post.id}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold">{post.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'published'
                                    ? 'bg-green-600/20 text-green-400'
                                    : 'bg-yellow-600/20 text-yellow-400'
                                    }`}>
                                    {post.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Eye size={16} />
                                    <span>{post.views.toLocaleString()} views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.button
                                className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Edit size={20} />
                            </motion.button>
                            <motion.button
                                className="p-3 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Trash2 size={20} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);


export default BlogView;