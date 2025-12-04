"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Settings,
} from 'lucide-react';

import Sidebar from './components/SideBar';
import DashboardView from './components/dashboard';
import MessagesView from './components/message';
import BlogView from './components/blog'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [theme] = useState({ primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.accent});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <Sidebar />

      <div className="ml-64 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'messages' && <MessagesView />}
          {activeTab === 'blog' && <BlogView />}
          {activeTab === 'visitors' && (
            <div className="text-center py-20">
              <Users size={64} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Visitors Analytics</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-20">
              <Settings size={64} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Settings</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;