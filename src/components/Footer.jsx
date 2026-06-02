import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>&lt;Prestige /&gt;</span>
          <p style={{ color: '#334155', fontSize: '0.85rem' }}>Built with React + Framer Motion · Deployed on Vercel</p>
          <a href="https://github.com/nsien-prestige" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>GitHub ↗</a>
        </motion.div>
      </div>
    </footer>
  )
}
