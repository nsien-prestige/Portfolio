import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const roles = ['Backend Engineer', 'API Architect', 'Node.js Developer', 'Database Designer', 'Systems Builder']

function TypeWriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = words[wordIndex]
    let timeout
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => { setText(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, 80)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => { setText(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 45)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words])

  return (
    <span>
      <span style={{ background: 'linear-gradient(135deg, #00f5a0, #00d9f5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{text}</span>
      <span style={{ display: 'inline-block', width: '3px', height: '1em', background: '#00f5a0', marginLeft: '4px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,245,160,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)' }} />
      <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,245,160,0.08)', border: '1px solid rgba(0,245,160,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '2rem', fontSize: '0.85rem', color: '#00f5a0', fontWeight: 600 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f5a0', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          Available for hire
          <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }`}</style>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1rem', color: '#f1f5f9', letterSpacing: '-2px' }}>
          Hi, I'm{' '}
          <span style={{ background: 'linear-gradient(135deg, #00f5a0 0%, #00d9f5 60%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Prestige</span>
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.5px', minHeight: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TypeWriter words={roles} />
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94a3b8', lineHeight: 1.8, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          I build robust, scalable server-side systems with Node.js, NestJS, and PostgreSQL. From RESTful APIs with JWT auth to real-time Socket.IO apps — I architect backends that perform under pressure.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a href="#projects" whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,160,0.5)' }} whileTap={{ scale: 0.97 }} style={{ background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', color: '#020817', padding: '0.9rem 2.2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 800, fontSize: '1rem', display: 'inline-block' }}>View My Work</motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.05, borderColor: '#00f5a0', color: '#00f5a0' }} whileTap={{ scale: 0.97 }} style={{ border: '1.5px solid rgba(0,245,160,0.3)', color: '#94a3b8', padding: '0.9rem 2.2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', display: 'inline-block', transition: 'all 0.3s' }}>Get In Touch</motion.a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.75rem' }}>
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ fontSize: '1.2rem' }}>↓</motion.div>
        </motion.div>
      </div>
    </section>
  )
}
