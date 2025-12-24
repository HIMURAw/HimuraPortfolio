"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Lock, Eye, EyeOff, Copy, Check, Search } from 'lucide-react';

interface Password {
    id: string;
    name: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

const PasswordsView = () => {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [selectedPassword, setSelectedPassword] = useState<Password | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
    const [copied, setCopied] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        url: '',
        notes: ''
    });

    useEffect(() => {
        const savedPasswords = localStorage.getItem('admin_passwords');
        if (savedPasswords) {
            // setState'i asenkron olarak çağır
            setTimeout(() => {
                setPasswords(JSON.parse(savedPasswords));
            }, 0);
        }
    }, []);

    const savePasswords = (updatedPasswords: Password[]) => {
        setPasswords(updatedPasswords);
        localStorage.setItem('admin_passwords', JSON.stringify(updatedPasswords));
    };

    const createPassword = () => {
        const newPassword: Password = {
            id: Date.now().toString(),
            name: 'Yeni Şifre',
            username: '',
            password: '',
            url: '',
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const updatedPasswords = [newPassword, ...passwords];
        savePasswords(updatedPasswords);
        setSelectedPassword(newPassword);
        setFormData({
            name: newPassword.name,
            username: newPassword.username,
            password: newPassword.password,
            url: newPassword.url || '',
            notes: newPassword.notes || ''
        });
        setIsEditing(true);
    };

    const deletePassword = (id: string) => {
        if (confirm('Bu şifreyi silmek istediğinize emin misiniz?')) {
            const updatedPasswords = passwords.filter(p => p.id !== id);
            savePasswords(updatedPasswords);
            if (selectedPassword?.id === id) {
                setSelectedPassword(null);
                setIsEditing(false);
            }
        }
    };

    const startEdit = (password: Password) => {
        setSelectedPassword(password);
        setFormData({
            name: password.name,
            username: password.username,
            password: password.password,
            url: password.url || '',
            notes: password.notes || ''
        });
        setIsEditing(true);
    };

    const savePassword = () => {
        if (!selectedPassword) return;

        const updatedPasswords = passwords.map(p =>
            p.id === selectedPassword.id
                ? {
                    ...p,
                    ...formData,
                    updatedAt: new Date().toISOString()
                }
                : p
        );
        savePasswords(updatedPasswords);
        setSelectedPassword(updatedPasswords.find(p => p.id === selectedPassword.id) || null);
        setIsEditing(false);
    };

    const cancelEdit = () => {
        if (selectedPassword) {
            setFormData({
                name: selectedPassword.name,
                username: selectedPassword.username,
                password: selectedPassword.password,
                url: selectedPassword.url || '',
                notes: selectedPassword.notes || ''
            });
        }
        setIsEditing(false);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const togglePasswordVisibility = (id: string) => {
        setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredPasswords = passwords.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.url && p.url.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Şifreler</h2>
                    <p className="text-sm sm:text-base text-gray-400">Şifrelerinizi güvenli bir şekilde saklayın</p>
                </div>
                <motion.button
                    onClick={createPassword}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold text-sm sm:text-base w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus size={20} />
                    Yeni Şifre
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-200px)]">
                {/* Şifreler Listesi */}
                <div className="bg-gray-900/50 rounded-2xl p-4 border border-white/10 overflow-hidden flex flex-col">
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Şifrelerde ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {filteredPasswords.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <Lock size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Henüz şifre yok</p>
                            </div>
                        ) : (
                            filteredPasswords.map((password) => (
                                <motion.div
                                    key={password.id}
                                    onClick={() => !isEditing && startEdit(password)}
                                    className={`p-3 rounded-xl cursor-pointer transition-all ${selectedPassword?.id === password.id
                                        ? 'bg-indigo-600/20 border border-indigo-500'
                                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Lock size={16} className="text-indigo-400" />
                                        <h3 className="font-semibold text-white truncate">{password.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">{password.username || 'Kullanıcı adı yok'}</p>
                                    {password.url && (
                                        <p className="text-xs text-gray-500 truncate mt-1">{password.url}</p>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Şifre Detayı */}
                <div className="lg:col-span-2 bg-gray-900/50 rounded-2xl p-4 lg:p-6 border border-white/10 flex flex-col min-h-[400px] lg:min-h-0">
                    {selectedPassword ? (
                        <>
                            {isEditing ? (
                                <div className="flex-1 flex flex-col space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">Şifreyi Düzenle</h3>
                                        <div className="flex gap-2">
                                            <motion.button
                                                onClick={savePassword}
                                                className="p-2 bg-green-600 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Kaydet
                                            </motion.button>
                                            <motion.button
                                                onClick={cancelEdit}
                                                className="p-2 bg-gray-700 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                İptal
                                            </motion.button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="İsim (örn: Gmail, GitHub)"
                                    />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="Kullanıcı adı / Email"
                                    />
                                    <div className="relative">
                                        <input
                                            type={showPassword[selectedPassword.id] ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-4 py-2 pr-20 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            placeholder="Şifre"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                                            <motion.button
                                                onClick={() => togglePasswordVisibility(selectedPassword.id)}
                                                className="p-1 text-gray-400 hover:text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {showPassword[selectedPassword.id] ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </motion.button>
                                            <motion.button
                                                onClick={() => copyToClipboard(formData.password, selectedPassword.id + '_pass')}
                                                className="p-1 text-gray-400 hover:text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {copied === selectedPassword.id + '_pass' ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                                            </motion.button>
                                        </div>
                                    </div>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="URL (opsiyonel)"
                                    />
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="flex-1 w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
                                        placeholder="Notlar (opsiyonel)"
                                    />
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-white">{selectedPassword.name}</h3>
                                        <div className="flex gap-2">
                                            <motion.button
                                                onClick={() => startEdit(selectedPassword)}
                                                className="p-2 bg-indigo-600 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Edit size={20} />
                                            </motion.button>
                                            <motion.button
                                                onClick={() => deletePassword(selectedPassword.id)}
                                                className="p-2 bg-red-600 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Trash2 size={20} />
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <label className="text-sm text-gray-400">Kullanıcı Adı</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-white">{selectedPassword.username || 'Belirtilmemiş'}</p>
                                                {selectedPassword.username && (
                                                    <motion.button
                                                        onClick={() => copyToClipboard(selectedPassword.username, selectedPassword.id + '_user')}
                                                        className="p-1 text-gray-400 hover:text-white"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        {copied === selectedPassword.id + '_user' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Şifre</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-white font-mono">
                                                    {showPassword[selectedPassword.id] ? selectedPassword.password : '••••••••'}
                                                </p>
                                                <motion.button
                                                    onClick={() => togglePasswordVisibility(selectedPassword.id)}
                                                    className="p-1 text-gray-400 hover:text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {showPassword[selectedPassword.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => copyToClipboard(selectedPassword.password, selectedPassword.id + '_pass')}
                                                    className="p-1 text-gray-400 hover:text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {copied === selectedPassword.id + '_pass' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                                </motion.button>
                                            </div>
                                        </div>
                                        {selectedPassword.url && (
                                            <div>
                                                <label className="text-sm text-gray-400">URL</label>
                                                <a
                                                    href={selectedPassword.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-400 hover:text-indigo-300 block mt-1"
                                                >
                                                    {selectedPassword.url}
                                                </a>
                                            </div>
                                        )}
                                        {selectedPassword.notes && (
                                            <div>
                                                <label className="text-sm text-gray-400">Notlar</label>
                                                <p className="text-gray-300 mt-1 whitespace-pre-wrap">{selectedPassword.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">
                                        <p>Oluşturulma: {new Date(selectedPassword.createdAt).toLocaleString('tr-TR')}</p>
                                        <p>Son güncelleme: {new Date(selectedPassword.updatedAt).toLocaleString('tr-TR')}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center">
                            <div>
                                <Lock size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400">Bir şifre seçin veya yeni şifre oluşturun</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordsView;

