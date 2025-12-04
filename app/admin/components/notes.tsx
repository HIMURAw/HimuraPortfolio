"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, StickyNote, Save, X } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const NotesView = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // localStorage'dan notları yükle
        const savedNotes = localStorage.getItem('admin_notes');
        if (savedNotes) {
            // setState'i asenkron olarak çağır
            setTimeout(() => {
                setNotes(JSON.parse(savedNotes));
            }, 0);
        }
    }, []);

    const saveNotes = (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
        localStorage.setItem('admin_notes', JSON.stringify(updatedNotes));
    };

    const createNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: 'Yeni Not',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const updatedNotes = [newNote, ...notes];
        saveNotes(updatedNotes);
        setSelectedNote(newNote);
        setTitle(newNote.title);
        setContent(newNote.content);
        setIsEditing(true);
    };

    const deleteNote = (id: string) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        saveNotes(updatedNotes);
        if (selectedNote?.id === id) {
            setSelectedNote(null);
            setIsEditing(false);
        }
    };

    const startEdit = (note: Note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(true);
    };

    const saveNote = () => {
        if (!selectedNote) return;

        const updatedNotes = notes.map(note =>
            note.id === selectedNote.id
                ? { ...note, title, content, updatedAt: new Date().toISOString() }
                : note
        );
        saveNotes(updatedNotes);
        setSelectedNote(updatedNotes.find(n => n.id === selectedNote.id) || null);
        setIsEditing(false);
    };

    const cancelEdit = () => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
        setIsEditing(false);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Notlar</h2>
                    <p className="text-sm sm:text-base text-gray-400">Fikirlerinizi ve notlarınızı burada saklayın</p>
                </div>
                <motion.button
                    onClick={createNote}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold text-sm sm:text-base w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus size={20} />
                    Yeni Not
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-200px)]">
                {/* Notlar Listesi */}
                <div className="bg-gray-900/50 rounded-2xl p-4 border border-white/10 overflow-hidden flex flex-col">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Notlarda ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {filteredNotes.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <StickyNote size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Henüz not yok</p>
                            </div>
                        ) : (
                            filteredNotes.map((note) => (
                                <motion.div
                                    key={note.id}
                                    onClick={() => !isEditing && startEdit(note)}
                                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                                        selectedNote?.id === note.id
                                            ? 'bg-indigo-600/20 border border-indigo-500'
                                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <h3 className="font-semibold text-white mb-1 truncate">{note.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">{note.content || 'Boş not'}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(note.updatedAt).toLocaleDateString('tr-TR')}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Not Detayı */}
                <div className="lg:col-span-2 bg-gray-900/50 rounded-2xl p-4 lg:p-6 border border-white/10 flex flex-col min-h-[400px] lg:min-h-0">
                    {selectedNote ? (
                        <>
                            {isEditing ? (
                                <div className="flex-1 flex flex-col space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">Notu Düzenle</h3>
                                        <div className="flex gap-2">
                                            <motion.button
                                                onClick={saveNote}
                                                className="p-2 bg-green-600 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Save size={20} />
                                            </motion.button>
                                            <motion.button
                                                onClick={cancelEdit}
                                                className="p-2 bg-gray-700 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <X size={20} />
                                            </motion.button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="Not başlığı"
                                    />
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="flex-1 w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
                                        placeholder="Not içeriği..."
                                    />
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-white">{selectedNote.title}</h3>
                                        <div className="flex gap-2">
                                            <motion.button
                                                onClick={() => startEdit(selectedNote)}
                                                className="p-2 bg-indigo-600 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Edit size={20} />
                                            </motion.button>
                                            <motion.button
                                                onClick={() => deleteNote(selectedNote.id)}
                                                className="p-2 bg-red-600 rounded-lg text-white"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Trash2 size={20} />
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        <p className="text-gray-300 whitespace-pre-wrap">{selectedNote.content || 'Bu not boş'}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">
                                        <p>Oluşturulma: {new Date(selectedNote.createdAt).toLocaleString('tr-TR')}</p>
                                        <p>Son güncelleme: {new Date(selectedNote.updatedAt).toLocaleString('tr-TR')}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center">
                            <div>
                                <StickyNote size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400">Bir not seçin veya yeni not oluşturun</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesView;

