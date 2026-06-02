import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const stats = [
  { number: '10+', label: 'Projects Built' },
  { number: '5+', label: 'Technologies' },
  { number: '2+', label: 'Years Learning' },
  { number: '100%', label: 'Backend Focus' },
]

export default function About() {
  const [ref, inView] = useInView(0.2)

  return (
    <section id="about" ref={ref} style={{ padding: '8rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <span style={{ color: '#00f5a0', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>— About Me —</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.1 }}>
          The Engineer Behind the{' '}
          <span style={{ background: 'linear-gradient(135deg, #00f5a0, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Server</span>
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '1.5rem' }}>I'm <strong style={{ color: '#f1f5f9' }}>Prestige Nsien</strong>, a passionate backend engineer who thrives on designing systems that are fast, secure, and built to last. My journey started at AltSchool Africa, where I honed my craft with a laser focus on backend engineering.</p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '1.5rem' }}>I specialise in building production-grade REST APIs, implementing authentication systems with OAuth2/PKCE, designing database schemas, and architecting multi-service platforms. From real-time multiplayer games to demographic intelligence platforms — I love the challenge of making complex systems simple.</p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '1.05rem' }}>When I'm not writing Node.js or NestJS code, I'm exploring new backend patterns and constantly levelling up my engineering skills.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {['Problem Solver', 'API Architect', 'Clean Code Advocate'].map((tag) => (
              <span key={tag} style={{ background: 'rgba(0,245,160,0.08)', border: '1px solid rgba(0,245,160,0.2)', color: '#00f5a0', padding: '5px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} whileHover={{ scale: 1.05 }} style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(0,245,160,0.12)', borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center', transition: 'all 0.3s', cursor: 'default' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '0.5rem' }}>{s.number}</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
