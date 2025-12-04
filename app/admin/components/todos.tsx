"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckSquare, Square, CheckCircle2 } from 'lucide-react';

interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    completedAt?: string;
}

const TodosView = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'medium' as Todo['priority'] });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const savedTodos = localStorage.getItem('admin_todos');
        if (savedTodos) {
            // setState'i asenkron olarak çağır
            setTimeout(() => {
                setTodos(JSON.parse(savedTodos));
            }, 0);
        }
    }, []);

    const saveTodos = (updatedTodos: Todo[]) => {
        setTodos(updatedTodos);
        localStorage.setItem('admin_todos', JSON.stringify(updatedTodos));
    };

    const addTodo = () => {
        if (!newTodo.title.trim()) return;

        const todo: Todo = {
            id: Date.now().toString(),
            title: newTodo.title,
            description: newTodo.description,
            completed: false,
            priority: newTodo.priority,
            createdAt: new Date().toISOString()
        };

        const updatedTodos = [todo, ...todos];
        saveTodos(updatedTodos);
        setNewTodo({ title: '', description: '', priority: 'medium' });
        setShowAddForm(false);
    };

    const toggleTodo = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id
                ? {
                      ...todo,
                      completed: !todo.completed,
                      completedAt: !todo.completed ? new Date().toISOString() : undefined
                  }
                : todo
        );
        saveTodos(updatedTodos);
    };

    const deleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        saveTodos(updatedTodos);
    };

    const updatePriority = (id: string, priority: Todo['priority']) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, priority } : todo
        );
        saveTodos(updatedTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const getPriorityColor = (priority: Todo['priority']) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500/20 border-red-500 text-red-400';
            case 'medium':
                return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
            case 'low':
                return 'bg-green-500/20 border-green-500 text-green-400';
        }
    };

    const completedCount = todos.filter(t => t.completed).length;
    const activeCount = todos.filter(t => !t.completed).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Yapılacaklar</h2>
                    <p className="text-sm sm:text-base text-gray-400">
                        {activeCount} aktif, {completedCount} tamamlandı
                    </p>
                </div>
                <motion.button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold text-sm sm:text-base w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus size={20} />
                    Yeni Görev
                </motion.button>
            </div>

            {/* Filtreler */}
            <div className="flex flex-wrap gap-2">
                {(['all', 'active', 'completed'] as const).map((filterType) => (
                    <motion.button
                        key={filterType}
                        onClick={() => setFilter(filterType)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            filter === filterType
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {filterType === 'all' && 'Tümü'}
                        {filterType === 'active' && 'Aktif'}
                        {filterType === 'completed' && 'Tamamlanan'}
                    </motion.button>
                ))}
            </div>

            {/* Yeni Görev Formu */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-900/50 rounded-2xl p-4 border border-white/10"
                    >
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={newTodo.title}
                                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                                placeholder="Görev başlığı..."
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addTodo();
                                    } else if (e.key === 'Escape') {
                                        setShowAddForm(false);
                                    }
                                }}
                                autoFocus
                            />
                            <textarea
                                value={newTodo.description}
                                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                                placeholder="Açıklama (opsiyonel)..."
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                                rows={3}
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {(['low', 'medium', 'high'] as const).map((priority) => (
                                        <motion.button
                                            key={priority}
                                            onClick={() => setNewTodo({ ...newTodo, priority })}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                                newTodo.priority === priority
                                                    ? getPriorityColor(priority)
                                                    : 'bg-white/5 text-gray-400'
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {priority === 'low' && 'Düşük'}
                                            {priority === 'medium' && 'Orta'}
                                            {priority === 'high' && 'Yüksek'}
                                        </motion.button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <motion.button
                                        onClick={addTodo}
                                        className="px-4 py-2 bg-green-600 rounded-xl text-white font-semibold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Ekle
                                    </motion.button>
                                    <motion.button
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setNewTodo({ title: '', description: '', priority: 'medium' });
                                        }}
                                        className="px-4 py-2 bg-gray-700 rounded-xl text-white font-semibold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        İptal
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Görevler Listesi */}
            <div className="space-y-3">
                <AnimatePresence>
                    {filteredTodos.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <CheckSquare size={64} className="mx-auto mb-4 opacity-50" />
                            <p>Henüz görev yok</p>
                        </div>
                    ) : (
                        filteredTodos.map((todo) => (
                            <motion.div
                                key={todo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={`bg-gray-900/50 rounded-2xl p-4 border border-white/10 ${
                                    todo.completed ? 'opacity-60' : ''
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <motion.button
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`mt-1 ${todo.completed ? 'text-green-400' : 'text-gray-400'}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {todo.completed ? <CheckCircle2 size={24} /> : <Square size={24} />}
                                    </motion.button>
                                    <div className="flex-1">
                                        <h3
                                            className={`font-semibold text-lg ${
                                                todo.completed ? 'line-through text-gray-500' : 'text-white'
                                            }`}
                                        >
                                            {todo.title}
                                        </h3>
                                        {todo.description && (
                                            <p className="text-gray-400 mt-1">{todo.description}</p>
                                        )}
                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex gap-2">
                                                {(['low', 'medium', 'high'] as const).map((priority) => (
                                                    <motion.button
                                                        key={priority}
                                                        onClick={() => updatePriority(todo.id, priority)}
                                                        className={`px-2 py-1 rounded text-xs ${
                                                            todo.priority === priority
                                                                ? getPriorityColor(priority)
                                                                : 'bg-white/5 text-gray-500'
                                                        }`}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {priority === 'low' && 'Düşük'}
                                                        {priority === 'medium' && 'Orta'}
                                                        {priority === 'high' && 'Yüksek'}
                                                    </motion.button>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="p-2 text-red-400 hover:text-red-300"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Trash2 size={20} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TodosView;

