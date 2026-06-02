import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const skillCategories = [
  { title: 'Languages & Runtimes', icon: '⚡', color: '#00f5a0', skills: [{ name: 'JavaScript (ES6+)', level: 95 }, { name: 'TypeScript', level: 85 }, { name: 'Node.js', level: 92 }, { name: 'SQL', level: 80 }] },
  { title: 'Frameworks & Libraries', icon: '🏗️', color: '#00d9f5', skills: [{ name: 'Express.js', level: 93 }, { name: 'NestJS', level: 82 }, { name: 'Socket.IO', level: 78 }, { name: 'Passport.js', level: 80 }] },
  { title: 'Databases & Storage', icon: '🗄️', color: '#7c3aed', skills: [{ name: 'PostgreSQL', level: 85 }, { name: 'MongoDB', level: 82 }, { name: 'Redis', level: 72 }, { name: 'TypeORM / Mongoose', level: 80 }] },
  { title: 'Auth & Security', icon: '🔐', color: '#f59e0b', skills: [{ name: 'JWT & Refresh Tokens', level: 90 }, { name: 'GitHub OAuth2 / PKCE', level: 88 }, { name: 'BCrypt', level: 85 }, { name: 'Rate Limiting / RBAC', level: 83 }] },
  { title: 'Tools & Practices', icon: '🛠️', color: '#ef4444', skills: [{ name: 'REST API Design', level: 92 }, { name: 'Git & GitHub', level: 88 }, { name: 'Jest (Testing)', level: 72 }, { name: 'ESLint / Prettier', level: 85 }] },
  { title: 'DevOps & Deployment', icon: '🚀', color: '#06b6d4', skills: [{ name: 'Netlify / Vercel', level: 82 }, { name: 'Hostless / Cloud', level: 75 }, { name: 'Supabase (PostgreSQL)', level: 78 }, { name: 'Environment Config', level: 88 }] },
]

const techBadges = ['Node.js','Express','NestJS','TypeScript','JavaScript','PostgreSQL','MongoDB','Redis','Socket.IO','JWT','OAuth2','PKCE','TypeORM','Mongoose','Swagger','BCrypt','Axios','Commander.js','Jest','ESLint','Git','Netlify','Supabase','REST APIs','RBAC']

function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView(0.1)
  return (
    <div ref={ref} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500 }}>{name}</span>
        <span style={{ color, fontSize: '0.85rem', fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : {}} transition={{ duration: 1.2, delay, ease: 'easeOut' }} style={{ height: '100%', borderRadius: '10px', background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 10px ${color}44` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView(0.1)
  return (
    <section id="skills" ref={ref} style={{ padding: '8rem 1.5rem', background: 'rgba(15,23,42,0.3)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#00f5a0', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>— Skills & Technologies —</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', marginBottom: '1rem' }}>
            My Backend{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d9f5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Arsenal</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>Every tool I've used is battle-tested across real projects — not just tutorials.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {skillCategories.map((cat, ci) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: ci * 0.1 }} whileHover={{ borderColor: `${cat.color}40`, transform: 'translateY(-4px)', boxShadow: `0 20px 40px ${cat.color}15` }} style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '2rem', transition: 'all 0.35s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: cat.color }}>{cat.title}</h3>
              </div>
              {cat.skills.map((s, si) => <SkillBar key={s.name} name={s.name} level={s.level} color={cat.color} delay={ci * 0.1 + si * 0.08} />)}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
          <h3 style={{ textAlign: 'center', color: '#475569', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '2rem' }}>All Technologies</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
            {techBadges.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.5 + i * 0.03 }} whileHover={{ scale: 1.12, background: 'rgba(0,245,160,0.15)', borderColor: 'rgba(0,245,160,0.5)', color: '#00f5a0', boxShadow: '0 0 15px rgba(0,245,160,0.2)' }} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '7px 16px', borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600, cursor: 'default', transition: 'all 0.25s' }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
