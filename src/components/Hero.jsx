import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const roles = ['Backend Engineer', 'API Architect', 'Node.js & NestJS Developer', 'Database Designer', 'Systems Builder']

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/nsien-prestige',
    color: '#e6edf3',
    accent: '#8b949e',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prestige-nsien',
    color: '#79c0ff',
    accent: '#388bfd',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:prestigensien@gmail.com',
    color: '#ffa657',
    accent: '#e3b341',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/2349068750609',
    color: '#7ee787',
    accent: '#3fb950',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

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
      <span style={{
        background: 'linear-gradient(135deg, #00f5a0, #00d9f5, #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>{text}</span>
      <span style={{
        display: 'inline-block', width: '3px', height: '1em',
        background: '#00f5a0', marginLeft: '4px', verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ambient glows */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,245,160,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)' }} />

      <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>

        {/* available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,245,160,0.08)',
            border: '1px solid rgba(0,245,160,0.25)',
            borderRadius: '100px', padding: '6px 16px',
            fontSize: '0.82rem', color: '#00f5a0', fontWeight: 600,
            fontFamily: 'monospace',
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#00f5a0',
              animation: 'pulse 2s infinite',
              display: 'inline-block',
            }} />
            available_for_hire
            <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }`}</style>
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1rem',
            color: '#f1f5f9',
            letterSpacing: '-2px',
            textAlign: 'center',
          }}
        >
          Hi, I'm{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00f5a0 0%, #00d9f5 60%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Prestige</span>
        </motion.h1>

        {/* typewriter */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
            minHeight: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TypeWriter words={roles} />
        </motion.h2>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            color: '#8b949e',
            lineHeight: 1.8,
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            textAlign: 'center',
          }}
        >
          I build robust, scalable server-side systems with Node.js, NestJS, and PostgreSQL.
          From RESTful APIs with JWT auth to real-time Socket.IO apps —
          I architect backends that perform under pressure.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,160,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
              color: '#020817', padding: '0.85rem 2rem',
              borderRadius: '10px', textDecoration: 'none',
              fontWeight: 800, fontSize: '0.95rem',
            }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, borderColor: '#00f5a0', color: '#00f5a0' }}
            whileTap={{ scale: 0.97 }}
            style={{
              border: '1.5px solid rgba(0,245,160,0.3)',
              color: '#8b949e', padding: '0.85rem 2rem',
              borderRadius: '10px', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.95rem',
              transition: 'all 0.3s',
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88 }}
        >
          {/* divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.8)' }} />
            <span style={{
              color: '#8b949e', fontSize: '0.72rem',
              fontFamily: 'monospace', letterSpacing: '1px',
            }}>
              // find me here
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.8)' }} />
          </div>

          {/* link cards */}
          <div style={{
            display: 'flex', gap: '0.75rem',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.95 + i * 0.08 }}
                whileHover={{
                  y: -4,
                  borderColor: `${link.accent}60`,
                  boxShadow: `0 8px 24px ${link.accent}20`,
                  background: 'rgba(22,27,34,0.95)',
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(48,54,61,0.7)',
                  borderRadius: '10px',
                  padding: '0.6rem 1.1rem',
                  textDecoration: 'none',
                  color: link.accent,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  transition: 'all 0.25s ease',
                }}
              >
                <span style={{ color: link.color, display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                </span>
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}