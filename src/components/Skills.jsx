import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const categories = [
  {
    id: 'lang',
    label: 'languages',
    token: 'const',
    color: '#79c0ff',
    accent: '#388bfd',
    skills: [
      { name: 'JavaScript (ES6+)', note: 'primary language' },
      { name: 'TypeScript', note: 'typed superset' },
      { name: 'Node.js', note: 'runtime' },
      { name: 'SQL', note: 'query language' },
    ],
  },
  {
    id: 'fw',
    label: 'frameworks',
    token: 'import',
    color: '#ffa657',
    accent: '#e3b341',
    skills: [
      { name: 'Express.js', note: 'REST APIs' },
      { name: 'NestJS', note: 'modular architecture' },
      { name: 'Socket.IO', note: 'real-time' },
      { name: 'Passport.js', note: 'auth middleware' },
      { name: 'Axios', note: 'HTTP client' },
      { name: 'Commander.js', note: 'CLI framework' },
      { name: 'Joi', note: 'schema validation' },
      { name: 'Nodemailer', note: 'email service' },
    ],
  },
  {
    id: 'db',
    label: 'databases',
    token: 'class',
    color: '#7ee787',
    accent: '#3fb950',
    skills: [
      { name: 'PostgreSQL', note: 'relational' },
      { name: 'MongoDB', note: 'document store' },
      { name: 'Redis', note: 'caching layer' },
      { name: 'TypeORM / Mongoose', note: 'ORMs' },
    ],
  },
  {
    id: 'auth',
    label: 'auth & security',
    token: 'async',
    color: '#ff7b72',
    accent: '#f85149',
    skills: [
      { name: 'JWT + Refresh Tokens', note: 'stateless auth' },
      { name: 'GitHub OAuth2 / PKCE', note: 'OAuth flow' },
      { name: 'BCrypt', note: 'password hashing' },
      { name: 'RBAC / Rate Limiting', note: 'access control' },
    ],
  },
  {
    id: 'tools',
    label: 'tools & practices',
    token: 'export',
    color: '#d2a8ff',
    accent: '#bc8cff',
    skills: [
      { name: 'REST API Design', note: 'architecture' },
      { name: 'Git & GitHub', note: 'version control' },
      { name: 'Jest', note: 'unit testing' },
      { name: 'Swagger / OpenAPI', note: 'docs' },
      { name: 'Postman', note: 'API testing' },
      { name: 'Nodemon', note: 'dev server' },
    ],
  },
  {
    id: 'devops',
    label: 'devops & deploy',
    token: 'return',
    color: '#39d0d8',
    accent: '#56d364',
    skills: [
      { name: 'Render / Netlify', note: 'hosting' },
      { name: 'Supabase', note: 'PostgreSQL cloud' },
      { name: 'UptimeRobot', note: 'monitoring' },
      { name: 'Environment Config', note: '.env management' },
      { name: 'Docker', note: 'containerization' },
    ],
  },
]

const allBadges = [
  'Node.js','Express','NestJS','TypeScript','JavaScript',
  'PostgreSQL','MongoDB','Redis','Socket.IO','JWT','OAuth2',
  'PKCE','TypeORM','Mongoose','Swagger','BCrypt','Axios',
  'Commander.js','Jest','ESLint','Git','Netlify','Supabase',
  'REST APIs','RBAC','Render','Passport.js', 'Docker',
  'Joi', 'Nodemailer', 'Postman', 'Nodemon'
]

function CategoryCard({ cat, index, globalInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={globalInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(22,27,34,0.95)' : 'rgba(13,17,23,0.8)',
        border: `1px solid ${hovered ? cat.accent + '55' : 'rgba(48,54,61,0.8)'}`,
        borderRadius: '12px',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 8px 32px ${cat.accent}18` : 'none',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* top glow line */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
          transformOrigin: 'center',
        }}
      />

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
        <span style={{ color: cat.color, fontSize: '0.78rem', fontWeight: 600 }}>{cat.token}</span>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>{'{'}</span>
        <span style={{ color: '#e6edf3', fontSize: '0.78rem', fontWeight: 700 }}>{cat.label}</span>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>{'}'}</span>
        <span style={{
          marginLeft: 'auto',
          background: `${cat.accent}18`,
          border: `1px solid ${cat.accent}35`,
          color: cat.color,
          fontSize: '0.65rem',
          padding: '2px 8px',
          borderRadius: '100px',
          fontWeight: 700,
        }}>
          {cat.skills.length} skills
        </span>
      </div>

      {/* skill lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {cat.skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -8 }}
            animate={globalInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 + si * 0.06 + 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <span style={{ color: cat.accent, fontSize: '0.72rem', flexShrink: 0 }}>→</span>
            <span style={{ color: '#cdd9e5', fontSize: '0.82rem', fontWeight: 500 }}>{skill.name}</span>
            <span style={{ color: 'rgba(139,148,158,0.6)', fontSize: '0.72rem', marginLeft: 'auto', flexShrink: 0 }}>
              // {skill.note}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView(0.1)
  const [activeFilter, setActiveFilter] = useState(null)

  const filteredBadges = activeFilter
    ? allBadges.filter(b => {
        const cat = categories.find(c => c.id === activeFilter)
        return cat?.skills.some(s => s.name.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(s.name.split(' ')[0].toLowerCase()))
      })
    : allBadges

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: '8rem 1.5rem',
        position: 'relative',
        background: 'rgba(13,17,23,0.4)',
      }}
    >
      {/* background grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(48,54,61,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.15) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          {/* fake file tab */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(22,27,34,0.9)',
            border: '1px solid rgba(48,54,61,0.8)',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '6px 16px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: '#8b949e',
            marginBottom: '0',
          }}>
            <span style={{ color: '#00f5a0', fontSize: '0.95rem' }}>●</span>
            skills.config.js
          </div>

          <div style={{
            background: 'rgba(22,27,34,0.9)',
            border: '1px solid rgba(48,54,61,0.8)',
            borderRadius: '0 8px 8px 8px',
            padding: '2rem',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            <div style={{ fontSize: '0.8rem', lineHeight: 2 }}>
              <span style={{ color: '#8b949e' }}>{'// '}</span>
              <span style={{ color: '#8b949e' }}>Prestige Nsien — Backend Engineer</span>
              <br />
              <span style={{ color: '#79c0ff' }}>module</span>
              <span style={{ color: '#e6edf3' }}>.</span>
              <span style={{ color: '#d2a8ff' }}>exports</span>
              <span style={{ color: '#e6edf3' }}> = {'{'}</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'  '}</span>
              <span style={{ color: '#ffa657' }}>stack</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>'Node.js · NestJS · PostgreSQL · Redis'</span>
              <span style={{ color: '#e6edf3' }}>,</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'  '}</span>
              <span style={{ color: '#ffa657' }}>focus</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#a5d6ff' }}>'Backend Engineering · API Design · Auth Systems'</span>
              <span style={{ color: '#e6edf3' }}>,</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'  '}</span>
              <span style={{ color: '#ffa657' }}>available</span>
              <span style={{ color: '#e6edf3' }}>: </span>
              <span style={{ color: '#7ee787' }}>true</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'}'};</span>
            </div>
          </div>
        </motion.div>

        {/* section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '2.5rem',
          }}
        >
          <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>$</span>
          <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>ls -la ./skills</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.75rem' }}>{categories.length} categories</span>
        </motion.div>

        {/* categories grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '4rem',
        }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} globalInView={inView} />
          ))}
        </div>

        {/* all tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.8rem' }}>cat ./all-technologies.txt</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <AnimatePresence>
              {allBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: 0.5 + i * 0.025 }}
                  whileHover={{
                    background: 'rgba(0,245,160,0.12)',
                    borderColor: 'rgba(0,245,160,0.45)',
                    color: '#00f5a0',
                    y: -2,
                  }}
                  style={{
                    background: 'rgba(22,27,34,0.8)',
                    border: '1px solid rgba(48,54,61,0.7)',
                    color: '#8b949e',
                    padding: '5px 14px',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                    display: 'inline-block',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}