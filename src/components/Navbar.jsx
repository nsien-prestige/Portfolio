import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 1.5rem',
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(2, 8, 23, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,160,0.1)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <motion.a href="#" whileHover={{ scale: 1.05 }} style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.5px' }}>
            &lt;Prestige /&gt;
          </span>
        </motion.a>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden-mobile">
          {links.map((link, i) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3 }} whileHover={{ color: '#00f5a0' }} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>
              {link}
            </motion.a>
          ))}
          <motion.a href="https://github.com/nsien-prestige" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,245,160,0.4)' }} style={{ background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', color: '#020817', padding: '0.5rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>
            GitHub
          </motion.a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}>
          <div style={{ width: '24px', height: '2px', background: '#00f5a0', marginBottom: '5px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <div style={{ width: '24px', height: '2px', background: '#00f5a0', marginBottom: '5px', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <div style={{ width: '24px', height: '2px', background: '#00f5a0', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ background: 'rgba(2,8,23,0.98)', borderTop: '1px solid rgba(0,245,160,0.1)', padding: '1rem 0' }}>
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.8rem 1.5rem', color: '#94a3b8', textDecoration: 'none', fontSize: '1rem' }}>{link}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }`}</style>
    </motion.nav>
  )
}
