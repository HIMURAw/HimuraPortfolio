"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileEdit,
  Settings,
  TrendingUp,
  Eye,
  Clock,
  Mail,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  LucideIcon
} from 'lucide-react';

import Sidebar from './components/SideBar';
import DashboardView from './components/dashboard';
import MessagesView from './components/message';
import BlogView from './components/blog'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [theme] = useState({ primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899' });
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Authentication kontrolü
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        // Önce localStorage'ı kontrol et
        let isAuthenticated = localStorage.getItem('admin_authenticated');
        
        // Eğer localStorage'da yoksa, cookie'yi kontrol et (GitHub OAuth için)
        if (!isAuthenticated || isAuthenticated !== 'true') {
          const cookies = document.cookie.split(';');
          const authCookie = cookies.find(cookie => cookie.trim().startsWith('admin_authenticated='));
          
          if (authCookie && authCookie.split('=')[1] === 'true') {
            // Cookie varsa localStorage'a da set et
            localStorage.setItem('admin_authenticated', 'true');
            isAuthenticated = 'true';
          }
        }
        
        if (!isAuthenticated || isAuthenticated !== 'true') {
          router.push('/admin/login');
        } else {
          setIsChecking(false);
        }
      }
    };

    checkAuth();
  }, [router]);

  // Authentication kontrolü yapılırken loading göster
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

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