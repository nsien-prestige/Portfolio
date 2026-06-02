import { motion } from 'framer-motion'

const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Reflection', 'Contact']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid rgba(48,54,61,0.6)',
      padding: '3rem 1.5rem 2rem',
      position: 'relative',
      background: 'rgba(13,17,23,0.6)',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* top row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* brand */}
          <div>
            <motion.a
              href="#"
              whileHover={{ opacity: 0.8 }}
              style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}
            >
              <span style={{
                fontSize: '1.2rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>&lt;Prestige /&gt;</span>
            </motion.a>
            <p style={{ color: '#475569', fontSize: '0.78rem', margin: 0, lineHeight: 1.7 }}>
              Backend Engineer · Eket, Nigeria 🇳🇬<br />
              <span style={{ color: '#00f5a0' }}>available_for_hire</span>
            </p>
          </div>

          {/* nav links */}
          <div>
            <p style={{ color: '#475569', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '0.75rem' }}>
              // navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    color: '#8b949e',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00f5a0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8b949e'}
                >
                  → {link}
                </a>
              ))}
            </div>
          </div>

          {/* stack */}
          <div>
            <p style={{ color: '#475569', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '0.75rem' }}>
              // built with
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {['React', 'Framer Motion', 'Vite', 'Netlify'].map(tech => (
                <span key={tech} style={{ color: '#8b949e', fontSize: '0.78rem' }}>→ {tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div style={{
          borderTop: '1px solid rgba(48,54,61,0.4)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ color: '#334155', fontSize: '0.75rem', margin: 0 }}>
            <span style={{ color: '#475569' }}>©</span> {year} Prestige Nsien.{' '}
            <span style={{ color: '#334155' }}>Built from scratch. No templates.</span>
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a
              href="https://github.com/nsien-prestige/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#475569', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00f5a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              view source ↗
            </a>
            <span style={{ color: '#334155', fontSize: '0.75rem' }}>·</span>
            <span style={{ color: '#334155', fontSize: '0.75rem' }}>
              <span style={{ color: '#00f5a0' }}>▲</span> deployed on Netlify
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}