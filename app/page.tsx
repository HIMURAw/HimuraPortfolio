"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, Code, Palette, Zap, Send } from 'lucide-react';
import Image from 'next/image';

// Theme Generator
const generateTheme = () => {
  const themes = [
    { primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899' }, // Purple-Pink
    { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#14b8a6' }, // Cyan-Teal
    { primary: '#f59e0b', secondary: '#f97316', accent: '#ef4444' }, // Orange-Red
    { primary: '#10b981', secondary: '#059669', accent: '#14b8a6' }, // Green-Teal
    { primary: '#8b5cf6', secondary: '#a855f7', accent: '#d946ef' }, // Purple-Magenta
    { primary: '#ec4899', secondary: '#f43f5e', accent: '#fb7185' }, // Pink-Rose
  ];
  return themes[Math.floor(Math.random() * themes.length)];
};

const Portfolio = () => {
  const [theme] = useState(() => generateTheme());
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const roles = [
    'Full-Stack Developer',
    'Creative Designer',
    'UI/UX Enthusiast',
    'Problem Solver'
  ];

  const projects = [
    {
      title: 'AI SaaS Platform',
      description: 'Full-stack SaaS platform with AI-powered analytics and real-time collaboration',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'OpenAI'],
      link: '#'
    },
    {
      title: 'E-Commerce System',
      description: 'Modern shopping experience with advanced filtering, payments, and admin dashboard',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      title: 'Social Media App',
      description: 'Real-time social platform with posts, stories, messaging, and notifications',
      tech: ['React Native', 'Firebase', 'Redux', 'WebSocket'],
      link: '#'
    },
    {
      title: 'Design System',
      description: 'Comprehensive component library with documentation and interactive examples',
      tech: ['React', 'Storybook', 'CSS-in-JS', 'TypeScript'],
      link: '#'
    }
  ];

  const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TailwindCSS', level: 92 },
    { name: 'Python', level: 80 },
    { name: 'UI/UX Design', level: 88 }
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setFormStatus('Message sent successfully!');
      setTimeout(() => {
        setFormStatus('');
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      <style>{`
        :root {
          --primary: ${theme.primary};
          --secondary: ${theme.secondary};
          --accent: ${theme.accent};
        }
        .gradient-text {
          background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.accent});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-bg {
          background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
        }
        .gradient-border {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 gradient-bg -top-48 -left-48" />
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 gradient-bg -bottom-48 -right-48" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block mb-6"
              animate={{ 
                y: [0, -10, 0, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut" 
              }}
            >
              <Image src="/himura.png" alt="HIMURA" width={128} height={128} className="w-32 h-32" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Hi, I 'm <span className="gradient-text">HIMURA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Full-Stack Developer & Creative Designer
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
              Building beautiful, performant web experiences with modern technologies.
              Passionate about clean code, user experience, and continuous learning.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.a
                href="#projects"
                className="px-8 py-4 gradient-bg rounded-full font-semibold text-white shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
            <div className="flex gap-6 justify-center mt-12">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/30 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6 gradient-text">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-400 mb-6">
                  I'm a passionate developer with 5+ years of experience building modern web applications. 
                  My journey started with a curiosity for how things work, and it's evolved into a career 
                  crafting digital experiences that users love.
                </p>
                <p className="text-lg text-gray-400 mb-6">
                  I specialize in React, Next.js, and Node.js, with a keen eye for design and performance. 
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                  or designing user interfaces.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Code, text: 'Clean Code' },
                    { icon: Palette, text: 'Great Design' },
                    { icon: Zap, text: 'Performance' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      <item.icon size={18} style={{ color: theme.primary }} />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="gradient-border rounded-3xl p-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-2">5+</div>
                    <div className="text-gray-400 mb-6">Years Experience</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl">
                        <div className="text-3xl font-bold" style={{ color: theme.primary }}>50+</div>
                        <div className="text-sm text-gray-400">Projects</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl">
                        <div className="text-3xl font-bold" style={{ color: theme.secondary }}>30+</div>
                        <div className="text-sm text-gray-400">Clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-16 gradient-text">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  className="gradient-border rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <ExternalLink size={20} style={{ color: theme.primary }} />
                  </div>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-16 gradient-text">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-bg rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6 text-center gradient-text">Let's Work Together</h2>
            <p className="text-xl text-gray-400 text-center mb-16">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
            
            <div className="gradient-border rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                onClick={handleSubmit}
                className="w-full py-4 gradient-bg rounded-xl font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                Send Message
              </motion.button>
              {formStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-green-400"
                >
                  {formStatus}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 HIMURA. Built with Next.js, TailwindCSS & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;