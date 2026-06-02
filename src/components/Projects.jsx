import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const projects = [
  { id: 1, title: 'Insighta Labs+', subtitle: 'Demographic Intelligence Platform', description: 'A secure, multi-interface demographic intelligence platform with three access points: a REST API, a web portal, and a CLI tool — all powered by a single Node.js backend. Features GitHub OAuth2 with PKCE, rotating JWT tokens, role-based access control, and natural language profile search.', longDesc: ['GitHub OAuth2 with PKCE flow for both web and CLI authentication', 'Rotating JWT access & refresh tokens with server-side invalidation', 'Role-based access control (admin vs analyst) via middleware chain', 'Natural language search engine — "young males from Nigeria"', 'CSV export endpoint for bulk data downloads', 'Rate limiting and API versioning middleware', 'PostgreSQL on Supabase with structured schema migrations'], tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'GitHub OAuth2', 'PKCE', 'Supabase'], github: 'https://github.com/nsien-prestige/insighta-backend', live: 'https://insightabackend.hostless.app', color: '#00f5a0', badge: '🔐 Auth + API', featured: true },
  { id: 2, title: 'Insighta CLI', subtitle: 'Command-Line Interface Tool', description: 'A globally installable Node.js CLI tool for interacting with the Insighta platform. Implements full GitHub OAuth2 PKCE flow from the terminal — opens browser, captures callback on localhost, exchanges tokens, and stores credentials securely.', longDesc: ['Full GitHub OAuth2 PKCE flow initiated from the terminal', 'Spawns a local server on port 9876 to capture the OAuth callback', 'Auto token refresh on 401 — seamless re-authentication', 'Rich terminal UI with colored tables, spinners, and formatted output', 'Profile listing, search, creation, and CSV export from the command line'], tech: ['Node.js', 'Commander.js', 'Axios', 'Chalk', 'Ora', 'GitHub OAuth2', 'PKCE'], github: 'https://github.com/nsien-prestige/insighta-cli', live: null, color: '#00d9f5', badge: '🖥️ CLI Tool', featured: true },
  { id: 3, title: 'Eventful', subtitle: 'Event Management Platform', description: 'A full-featured event management backend built with NestJS and TypeScript. Handles event creation, ticketing, payments, notifications, webhooks, and analytics. Includes Swagger API documentation, Redis caching, QR code generation, and email notifications.', longDesc: ['NestJS modular architecture: Events, Tickets, Payments, Users, Auth, Notifications, Webhooks, Analytics', 'JWT authentication with Passport.js strategy', 'Redis caching with IORedis for high-performance reads', 'QR code generation for event tickets', 'Nodemailer integration for email notifications', 'Swagger/OpenAPI documentation auto-generated', 'TypeORM with PostgreSQL for relational data management'], tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'TypeORM', 'JWT', 'Swagger', 'Nodemailer'], github: 'https://github.com/nsien-prestige/Eventful', live: null, color: '#7c3aed', badge: '🏟️ Full Platform', featured: true },
  { id: 4, title: 'Guessing Game', subtitle: 'Real-Time Multiplayer Game', description: 'A real-time multiplayer number-guessing game built with Express.js and Socket.IO. Players join lobbies, compete in real time, and scores are persisted to MongoDB. Full JWT auth, BCrypt hashing, and MVC architecture.', longDesc: ['Real-time multiplayer via Socket.IO websockets', 'Lobby system for players to create and join game rooms', 'JWT authentication with BCrypt password hashing', 'MongoDB + Mongoose for user profiles and game history', 'MVC architecture with controllers, services, models, routes, validators', 'Input validation with Joi', 'Jest test suite'], tech: ['Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Mongoose', 'JWT', 'BCrypt', 'Joi', 'Jest'], github: 'https://github.com/nsien-prestige/Guessing-Game', live: null, color: '#f59e0b', badge: '🎮 Real-Time', featured: false },
  { id: 5, title: 'Blog Application', subtitle: 'Full CRUD Blog API', description: 'A full-featured blog platform with complete CRUD operations, user authentication, and a clean RESTful API design. Features protected routes, session management, and a well-structured Express backend.', longDesc: ['Full CRUD: create, read, update, delete posts and comments', 'User authentication with JWT-protected routes', 'RESTful API design with proper HTTP methods and status codes', 'Input validation and error handling middleware'], tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'JavaScript'], github: 'https://github.com/nsien-prestige/Blog-application', live: null, color: '#06b6d4', badge: '📝 CRUD API', featured: false },
  { id: 6, title: 'Restaurant ChatBot', subtitle: 'Conversational Ordering System', description: 'A conversational chatbot for restaurant ordering that handles menu navigation, item selection, and order management through a natural dialogue flow.', longDesc: ['Stateful conversation flow with multi-step ordering process', 'Menu management and item selection through dialogue', 'Order summarisation and confirmation handling', 'Node.js backend with Express routing'], tech: ['Node.js', 'Express', 'JavaScript'], github: 'https://github.com/nsien-prestige/Restaurant-ChatBot', live: null, color: '#ef4444', badge: '🤖 Chatbot', featured: false },
]

function ProjectModal({ project, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,8,23,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ scale: 0.85, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} style={{ background: '#0f172a', border: `1px solid ${project.color}30`, borderRadius: '24px', padding: '2.5rem', maxWidth: '640px', width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: `0 25px 60px ${project.color}20` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ background: `${project.color}20`, color: project.color, padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.5rem' }}>{project.badge}</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f1f5f9', margin: 0 }}>{project.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0' }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }}>✕</button>
        </div>
        <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.5rem' }}>{project.description}</p>
        <h4 style={{ color: project.color, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>Key Features</h4>
        <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: '1.5rem' }}>
          {project.longDesc.map((f, i) => (
            <li key={i} style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem', display: 'flex', gap: '10px' }}>
              <span style={{ color: project.color, flexShrink: 0, marginTop: '2px' }}>→</span>{f}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {project.tech.map((t) => <span key={t} style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color, padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600 }}>{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', padding: '0.65rem 1.4rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>View Code ↗</a>
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`, color: '#020817', padding: '0.65rem 1.4rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>Live Demo ↗</a>}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView(0.1)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)
  const shown = filter === 'featured' ? featured : filter === 'others' ? others : projects

  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#00f5a0', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>— Projects —</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', marginBottom: '1rem' }}>
            Things I've{' '}
            <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Built</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '550px', margin: '0 auto', lineHeight: 1.7 }}>Real projects with real architecture decisions. Click any card to see the full breakdown.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {['all', 'featured', 'others'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? 'linear-gradient(135deg, #00f5a0, #00d9f5)' : 'rgba(255,255,255,0.04)', color: filter === f ? '#020817' : '#94a3b8', border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.1)', padding: '8px 22px', borderRadius: '100px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.25s' }}>
              {f === 'all' ? 'All Projects' : f === 'featured' ? '⭐ Featured' : 'More Projects'}
            </button>
          ))}
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
          <AnimatePresence>
            {shown.map((project, i) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ y: -8, borderColor: `${project.color}40`, boxShadow: `0 25px 50px ${project.color}18` }} onClick={() => setSelected(project)} style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '1.75rem', cursor: 'pointer', transition: 'all 0.35s', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ background: `${project.color}15`, color: project.color, padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.5rem' }}>{project.badge}</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', margin: 0, lineHeight: 1.2 }}>{project.title}</h3>
                    <p style={{ color: '#475569', fontSize: '0.8rem', margin: '4px 0 0', fontWeight: 500 }}>{project.subtitle}</p>
                  </div>
                  {project.featured && <span style={{ fontSize: '1.1rem' }}>⭐</span>}
                </div>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{project.description.slice(0, 160)}...</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {project.tech.slice(0, 4).map((t) => <span key={t} style={{ background: `${project.color}10`, border: `1px solid ${project.color}25`, color: project.color, padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>)}
                  {project.tech.length > 4 && <span style={{ background: 'rgba(255,255,255,0.04)', color: '#475569', padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600 }}>+{project.tech.length - 4} more</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: project.color, fontSize: '0.82rem', fontWeight: 600 }}>Click to explore →</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', padding: '5px 10px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>GitHub</a>
                    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ background: `${project.color}20`, color: project.color, padding: '5px 10px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>Live ↗</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: '#475569', marginBottom: '1rem', fontSize: '0.95rem' }}>Want to see more? Check out my full GitHub profile.</p>
          <motion.a href="https://github.com/nsien-prestige" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,245,160,0.3)' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(0,245,160,0.08)', border: '1px solid rgba(0,245,160,0.25)', color: '#00f5a0', padding: '0.9rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', transition: 'all 0.3s' }}>View All Repos on GitHub ↗</motion.a>
        </motion.div>
      </div>
      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
