"use client"

import React from "react"
import { motion } from 'framer-motion';
import {
    StatCard,
    Users,
    MessageSquare,
    FileEdit,
} from 'lucide-react';


const DashboardView = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                icon={Users}
                title="Total Visitors"
                value={stats.totalVisitors}
                change={12.5}
                color="from-blue-600 to-cyan-600"
            />
            <StatCard
                icon={Eye}
                title="Today's Visitors"
                value={stats.todayVisitors}
                change={8.2}
                color="from-purple-600 to-pink-600"
            />
            <StatCard
                icon={MessageSquare}
                title="Total Messages"
                value={stats.totalMessages}
                change={15.7}
                color="from-orange-600 to-red-600"
            />
            <StatCard
                icon={FileEdit}
                title="Blog Posts"
                value={stats.blogPosts}
                change={5.3}
                color="from-green-600 to-teal-600"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visitor Chart */}
            <motion.div
                className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Weekly Visitors</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition">Week</button>
                        <button className="px-3 py-1 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition">Month</button>
                    </div>
                </div>
                <div className="flex items-end justify-between h-48 gap-2">
                    {visitorData.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center flex-1"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <motion.div
                                className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg"
                                style={{ height: `${(item.visitors / 450) * 100}%` }}
                                whileHover={{ opacity: 0.8 }}
                            />
                            <span className="text-xs text-gray-400 mt-2">{item.day}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <h3 className="text-xl font-bold mb-6">Quick Stats</h3>
                <div className="space-y-4">
                    {[
                        { icon: Activity, label: 'Avg. Session', value: '4m 32s', color: 'text-blue-400' },
                        { icon: Globe, label: 'Bounce Rate', value: '42.3%', color: 'text-purple-400' },
                        { icon: PieChart, label: 'Conversion', value: '3.8%', color: 'text-pink-400' },
                        { icon: BarChart3, label: 'Page Views', value: '8.2K', color: 'text-green-400' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={item.color} />
                                <span className="text-sm text-gray-400">{item.label}</span>
                            </div>
                            <span className="font-semibold">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 className="text-xl font-bold mb-4">Recent Messages</h3>
            <div className="space-y-3">
                {recentMessages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                                {msg.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-semibold">{msg.name}</h4>
                                <p className="text-sm text-gray-400 truncate max-w-md">{msg.message}</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{msg.date}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    </div>
);

export default DashboardView;