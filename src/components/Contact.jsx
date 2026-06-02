import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [ref, inView] = useInView(0.2)
  return (
    <section id="contact" ref={ref} style={{ padding: '8rem 1.5rem', background: 'rgba(15,23,42,0.3)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#00f5a0', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>— Contact —</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Let's Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg, #00f5a0, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Remarkable</span>
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>I'm actively looking for backend engineering roles. Whether you have an open position, a project that needs architecture, or just want to chat tech — I'm all ears.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.a href="https://github.com/nsien-prestige" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(0,245,160,0.5), 0 0 100px rgba(0,245,160,0.2)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', color: '#020817', padding: '1.1rem 3rem', borderRadius: '14px', textDecoration: 'none', fontWeight: 900, fontSize: '1.1rem', transition: 'all 0.3s' }}>
            Say Hello 👋
          </motion.a>
        </motion.div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ color: '#334155', fontSize: '0.85rem' }}>or find me here</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {[{ label: 'GitHub', value: 'nsien-prestige', href: 'https://github.com/nsien-prestige', icon: '⌥', color: '#00f5a0', desc: 'See my code' }, { label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com', icon: '▣', color: '#00d9f5', desc: 'Let\'s connect' }].map((link, i) => (
            <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} whileHover={{ y: -6, borderColor: `${link.color}40`, boxShadow: `0 15px 40px ${link.color}20` }} style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', textDecoration: 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', background: `${link.color}15`, border: `1px solid ${link.color}30`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0, color: link.color }}>{link.icon}</div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '2px' }}>{link.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 700 }}>{link.value}</div>
                <div style={{ color: link.color, fontSize: '0.75rem', marginTop: '2px' }}>{link.desc}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
