import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const stats = [
  { number: '10+', label: 'Projects Built' },
  { number: '2+', label: 'Years of Focus' },
  { number: '100%', label: 'Backend Focus' },
  { number: '♟', label: 'Chess Enjoyer' },
]

const timeline = [
  {
    year: '2021',
    color: '#8b949e',
    event: 'First line of code',
    detail: 'Picked up mobile dev purely because the idea looked cool. Realised quickly I wasn\'t ready — but the spark was lit.',
  },
  {
    year: '2025',
    color: '#ffa657',
    event: 'Went all in',
    detail: 'Came back with full commitment. Chose web development, zeroed in on backend engineering — and never looked back.',
  },
  {
    year: '2025',
    color: '#00f5a0',
    event: 'AltSchool Africa',
    detail: 'Enrolled on the Backend Engineering track. Built production-grade systems, shipped real projects, and levelled up fast.',
  },
  {
    year: 'Now',
    color: '#79c0ff',
    event: 'HNG Internship & beyond',
    detail: 'Actively building, shipping, and looking for the right team to grow with.',
  },
]

const interests = [
  {
    icon: '☁️',
    title: 'Cloud & Infrastructure',
    color: '#79c0ff',
    desc: 'Fascinated by how SaaS and PaaS platforms are architected at scale — how services like Supabase, Render, and Vercel abstract away complexity while staying performant.',
  },
  {
    icon: '🔐',
    title: 'Cybersecurity',
    color: '#ff7b72',
    desc: 'Deep interest in how systems are attacked and defended — from OAuth2 flows and PKCE to rate limiting, input validation, and thinking like an attacker when building APIs.',
  },
  {
    icon: '⚡',
    title: 'Performance & Systems',
    color: '#ffa657',
    desc: 'I care about what happens under load. Redis caching, database indexing, connection pooling — the invisible work that makes a backend feel fast.',
  },
]

export default function About() {
  const [ref, inView] = useInView(0.1)
  const [timelineRef, timelineInView] = useInView(0.1)
  const [interestRef, interestInView] = useInView(0.1)

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '8rem 1.5rem', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(22,27,34,0.9)',
            border: '1px solid rgba(48,54,61,0.8)',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '6px 16px',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: '0.78rem',
            color: '#8b949e',
          }}>
            <span style={{ color: '#ff7b72', fontSize: '0.6rem' }}>●</span>
            <span style={{ color: '#ffa657', fontSize: '0.6rem' }}>●</span>
            <span style={{ color: '#7ee787', fontSize: '0.6rem' }}>●</span>
            <span style={{ marginLeft: '6px' }}>about.me</span>
          </div>
          <div style={{
            background: 'rgba(13,17,23,0.9)',
            border: '1px solid rgba(48,54,61,0.8)',
            borderRadius: '0 8px 8px 8px',
            padding: '2rem',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: '0.8rem',
            lineHeight: 2,
          }}>
            <div>
              <span style={{ color: '#8b949e' }}>$ </span>
              <span style={{ color: '#e6edf3' }}>whoami</span>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ color: '#79c0ff' }}>name</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>"Prestige Nsien"</span>
            </div>
            <div>
              <span style={{ color: '#79c0ff' }}>role</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>"Backend Engineer"</span>
            </div>
            <div>
              <span style={{ color: '#79c0ff' }}>location</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>"Eket, Akwa Ibom, Nigeria 🇳🇬"</span>
            </div>
            <div>
              <span style={{ color: '#79c0ff' }}>stack</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>"Node.js · NestJS · PostgreSQL · Redis"</span>
            </div>
            <div>
              <span style={{ color: '#79c0ff' }}>status</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#7ee787' }}>available_for_hire</span>
            </div>
            <div>
              <span style={{ color: '#79c0ff' }}>after_hours</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>"probably playing chess ♟"</span>
            </div>
          </div>
        </motion.div>

        {/* bio + stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
          marginBottom: '5rem',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              marginBottom: '1.5rem',
            }}>
              <div style={{ height: '1px', width: '24px', background: '#00f5a0' }} />
              <span style={{
                color: '#00f5a0', fontSize: '0.75rem',
                fontFamily: 'monospace', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                The Engineer
              </span>
            </div>

            <p style={{ color: '#cdd9e5', lineHeight: 1.9, fontSize: '1rem', marginBottom: '1.2rem' }}>
              I'm a self-taught backend engineer from{' '}
              <span style={{ color: '#e6edf3', fontWeight: 600 }}>Eket, Nigeria</span> — quiet by nature, obsessive about systems by choice.
              I don't just write code that works; I write code that I'd be comfortable defending in a code review at 2am.
            </p>
            <p style={{ color: '#8b949e', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
              My path wasn't straight. I poked at mobile development in 2021 — got curious, got overwhelmed, stepped away.
              In 2025 I came back with a clear head and a sharper goal: backend engineering. No shortcuts. Trained at{' '}
              <span style={{ color: '#ffa657', fontWeight: 600 }}>AltSchool Africa</span> on the backend track,
              where I built real systems under real pressure.
            </p>
            <p style={{ color: '#8b949e', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2rem' }}>
              Outside the terminal, you'll find me hunched over a chessboard — same energy, different kind of architecture.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['Self-Taught', 'API Architect', 'Clean Code', 'Security-Minded', 'Cloud-Curious'].map((tag) => (
                <span key={tag} style={{
                  background: 'rgba(0,245,160,0.07)',
                  border: '1px solid rgba(0,245,160,0.2)',
                  color: '#00f5a0',
                  padding: '4px 13px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                }}>{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(0,245,160,0.3)' }}
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(48,54,61,0.7)',
                  borderRadius: '12px',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'default',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <div style={{
                  fontSize: s.number === '♟' ? '2rem' : '2.2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>{s.number}</div>
                <div style={{ color: '#8b949e', fontSize: '0.75rem', fontWeight: 600 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 24 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem',
          }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.8rem' }}>git log --oneline --author="Prestige"</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          </div>

          <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
            <div style={{
              position: 'absolute', left: '7px', top: 0, bottom: 0,
              width: '1px', background: 'rgba(48,54,61,0.8)',
            }} />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <div style={{
                  position: 'absolute', left: '-1.08rem', top: '4px',
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}80`,
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{
                    color: item.color,
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    padding: '2px 8px',
                    borderRadius: '100px',
                  }}>{item.year}</span>
                  <span style={{ color: '#e6edf3', fontWeight: 700, fontSize: '0.95rem' }}>{item.event}</span>
                </div>
                <p style={{ color: '#8b949e', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* interests */}
        <motion.div
          ref={interestRef}
          initial={{ opacity: 0, y: 24 }}
          animate={interestInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem',
          }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.8rem' }}>cat ./interests.json</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {interests.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={interestInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  borderColor: `${item.color}40`,
                  boxShadow: `0 8px 24px ${item.color}15`,
                  y: -4,
                }}
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(48,54,61,0.7)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                  <span style={{ color: item.color, fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</span>
                </div>
                <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}