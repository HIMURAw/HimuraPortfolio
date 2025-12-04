"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Lock,
    Mail,
    Eye,
    EyeOff,
    Shield,
    Sparkles,
    ArrowRight,
    Github,
    Chrome
} from 'lucide-react';

const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay, duration, x, y }) => (
    <motion.div
        className="absolute w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20"
        animate={{
            x: [x, x + 100, x],
            y: [y, y - 100, y],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    />
);


interface FloatingParticleProps {
    delay: number;
    duration: number;
    x: number;
    y: number;
}

const AdminLogin: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAuthenticated = localStorage.getItem('admin_authenticated');
            if (isAuthenticated === 'true') {
                router.push('/admin');
            }

            const urlParams = new URLSearchParams(window.location.search);
            const errorParam = urlParams.get('error');
            
            if (errorParam) {
                let errorMessage = '';
                switch (errorParam) {
                    case 'github_not_configured':
                        errorMessage = 'GitHub OAuth yapılandırılmamış. Lütfen .env.local dosyasına GITHUB_CLIENT_ID ve GITHUB_CLIENT_SECRET ekleyin.';
                        break;
                    case 'invalid_state':
                        errorMessage = 'Güvenlik kontrolü başarısız. Lütfen tekrar deneyin.';
                        break;
                    case 'token_error':
                        errorMessage = 'GitHub token alınamadı. Lütfen tekrar deneyin.';
                        break;
                    case 'user_fetch_failed':
                        errorMessage = 'Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.';
                        break;
                    case 'unauthorized_user':
                        errorMessage = 'Bu GitHub hesabına admin erişimi verilmemiş.';
                        break;
                    case 'oauth_error':
                        errorMessage = 'OAuth hatası oluştu. Lütfen tekrar deneyin.';
                        break;
                    default:
                        errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
                }
                
                window.history.replaceState({}, '', window.location.pathname);
                
                setTimeout(() => {
                    setError(errorMessage);
                }, 0);
            }
        }
    }, [router]);

    const [particlePositions] = useState<{ x: number; y: number }[]>(() => {
        if (typeof window === "undefined") return [];

        const width = window.innerWidth;
        const height = window.innerHeight;

        return [...Array(20)].map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
        }));
    });

    const theme = {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899'
    };

    const handleSubmit = async (e?: React.FormEvent): Promise<void> => {
        if (e) {
            e.preventDefault();
        }

        // Form validasyonu
        if (!email || !password) {
            setError('Lütfen email ve şifre alanlarını doldurun');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Başarılı giriş
                if (typeof window !== 'undefined') {
                    localStorage.setItem('admin_authenticated', 'true');
                    if (rememberMe) {
                        // Remember me seçilmişse, daha uzun süreli bir token saklanabilir
                        localStorage.setItem('admin_remember', 'true');
                    }
                    router.push('/admin');
                }
            } else {
                // Hatalı giriş
                setError(data.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            setIsLoading(false);
        }
    };

    const handleGitHubLogin = () => {
        setIsLoading(true);
        window.location.href = '/api/auth/github';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6 relative overflow-hidden">
            <style>{`
                .gradient-text {
                    background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.accent});
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .gradient-bg {
                    background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
                }
                .glass-effect {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 gradient-bg -top-48 -left-48 animate-pulse" />
                <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 gradient-bg -bottom-48 -right-48 animate-pulse"
                    style={{ animationDelay: '1s' }} />

                {/* Floating Particles */}
                {particlePositions.map((pos, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 0.2}
                        duration={10 + (i % 5)}
                        x={pos.x}
                        y={pos.y}
                    />
                ))}

            </div>

            {/* Login Container */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo & Title */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Shield size={32} className="text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-bold mb-2 gradient-text">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your admin dashboard</p>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    className="glass-effect rounded-3xl p-8 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <motion.input
                                    type="email"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="admin@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-gray-500"
                                    whileFocus={{ scale: 1.02 }}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <motion.input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-gray-500"
                                    whileFocus={{ scale: 1.02 }}
                                    required
                                    disabled={isLoading}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !isLoading) {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 bg-white/5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-400 group-hover:text-white transition">
                                    Remember me
                                </span>
                            </label>
                            <motion.a
                                href="#"
                                className="text-sm gradient-text font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Forgot password?
                            </motion.a>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 gradient-bg rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 text-gray-400 bg-gray-900/50">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                type="button"
                                onClick={handleGitHubLogin}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Github size={20} />
                                <span className="font-medium">Github</span>
                            </motion.button>
                            <motion.button
                                type="button"
                                disabled
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl opacity-50 cursor-not-allowed text-white"
                            >
                                <Chrome size={20} />
                                <span className="font-medium">Google</span>
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <motion.a
                            href="#"
                            className="gradient-text font-semibold"
                            whileHover={{ scale: 1.05 }}
                        >
                            Contact Admin
                        </motion.a>
                    </p>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 gradient-bg rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-40 h-40 gradient-bg rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                        duration: 4,
                        delay: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Trust Badges */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-gray-500 text-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center gap-2">
                    <Shield size={16} />
                    <span>Secure Login</span>
                </div>
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <div className="flex items-center gap-2">
                    <Lock size={16} />
                    <span>Encrypted</span>
                </div>
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <div className="flex items-center gap-2">
                    <Sparkles size={16} />
                    <span>Admin Access</span>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;