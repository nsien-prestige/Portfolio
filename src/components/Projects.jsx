import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const hngProjects = [
  {
    id: 'h1',
    filename: 'insighta-labs.js',
    title: 'Insighta Labs+',
    subtitle: 'Demographic Intelligence Platform',
    badge: 'HNG',
    color: '#00f5a0',
    type: 'platform',
    status: 'live',
    liveUrl: 'https://insighta-backend-zph3.onrender.com',
    githubUrl: 'https://github.com/nsien-prestige/insighta-backend',
    contribution: 'Built the entire backend solo — auth system, database schema, API design, middleware chain, and deployment.',
    description: 'A secure, multi-interface demographic intelligence platform with three access points: a REST API, a web portal, and a CLI tool — all powered by a single Node.js backend.',
    problem: 'Needed a single backend to serve three completely different client types — a web browser, a REST consumer, and a terminal — each with their own auth flow and data format requirements.',
    architecture: 'Monolithic Node.js/Express backend with layered middleware. Auth handled via GitHub OAuth2 + PKCE with rotating JWT access/refresh tokens. PostgreSQL on Supabase stores structured demographic data with full schema migrations.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'GitHub OAuth2', 'PKCE', 'Supabase', 'Redis'],
    features: [
      { key: 'auth', value: 'GitHub OAuth2 + PKCE for web & CLI' },
      { key: 'tokens', value: 'Rotating JWT with server-side invalidation' },
      { key: 'rbac', value: 'Admin vs Analyst roles via middleware chain' },
      { key: 'search', value: 'Natural language — "young males from Nigeria"' },
      { key: 'export', value: 'CSV bulk download endpoint' },
      { key: 'limits', value: 'Rate limiting + API versioning middleware' },
    ],
  },
  {
    id: 'h2',
    filename: 'insighta-portal.js',
    title: 'Insighta Web Portal',
    subtitle: 'Browser Interface for Insighta Platform',
    badge: 'HNG',
    color: '#00d9f5',
    type: 'frontend',
    status: 'live',
    liveUrl: 'https://insightalabs.netlify.app',
    githubUrl: 'https://github.com/nsien-prestige/insighta-web-portal',
    contribution: 'Built the complete frontend — OAuth2 PKCE flow in the browser, token management, role-gated UI, and all pages.',
    description: 'A fully-featured web portal for the Insighta platform. Handles GitHub OAuth2 login, profile management, demographic data browsing, and admin controls.',
    problem: 'Needed a browser client that could complete a full OAuth2 PKCE flow, manage token refresh silently in the background, and present role-gated UI depending on whether the user is an admin or analyst.',
    architecture: 'Vanilla HTML/CSS/JS frontend hosted on Netlify, communicating with the Insighta backend via a centralized api.js client. Auth state is managed client-side with token storage and auto-refresh on 401.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub OAuth2', 'PKCE', 'Netlify'],
    features: [
      { key: 'oauth', value: 'Full PKCE flow entirely in the browser' },
      { key: 'refresh', value: 'Silent token refresh on 401 responses' },
      { key: 'rbac', value: 'Role-gated UI for admin vs analyst' },
      { key: 'profiles', value: 'Create, browse, search, delete profiles' },
      { key: 'admin', value: 'Admin-only delete controls on profile detail' },
    ],
  },
  {
    id: 'h3',
    filename: 'insighta-cli.js',
    title: 'Insighta CLI',
    subtitle: 'Command-Line Interface Tool',
    badge: 'HNG',
    color: '#ffa657',
    type: 'cli',
    status: 'local',
    liveUrl: null,
    githubUrl: 'https://github.com/nsien-prestige/insighta-cli',
    contribution: 'Designed and built the entire CLI tool including the OAuth2 PKCE terminal flow — one of the more unusual auth implementations in the cohort.',
    description: 'A globally installable Node.js CLI tool for interacting with the Insighta platform entirely from the terminal — including a full GitHub OAuth2 PKCE flow.',
    problem: 'Power users and developers needed to query and manage Insighta data without touching a browser — including authenticating via GitHub OAuth2 from a terminal environment.',
    architecture: 'Commander.js CLI with sub-commands. On login, spawns a local HTTP server on port 9876 to capture the OAuth2 callback, exchanges the code for tokens, and stores credentials locally. Axios handles all API communication with auto-refresh logic.',
    tech: ['Node.js', 'Commander.js', 'Axios', 'Chalk', 'Ora', 'GitHub OAuth2', 'PKCE'],
    features: [
      { key: 'oauth', value: 'OAuth2 PKCE initiated from the terminal' },
      { key: 'callback', value: 'Spawns local server on :9876 for redirect' },
      { key: 'refresh', value: 'Auto token refresh on 401 — seamless re-auth' },
      { key: 'ui', value: 'Colored tables, spinners, formatted output' },
      { key: 'commands', value: 'List, search, create, export profiles' },
    ],
  },
]

const featuredProjects = [
  {
    id: 1,
    filename: 'insighta-labs.js',
    title: 'Insighta Labs+',
    subtitle: 'Demographic Intelligence Platform',
    badge: 'FEATURED',
    color: '#00f5a0',
    type: 'platform',
    status: 'live',
    liveUrl: 'https://insighta-backend-zph3.onrender.com',
    githubUrl: 'https://github.com/nsien-prestige/insighta-backend',
    description: 'A secure, multi-interface demographic intelligence platform with three access points: a REST API, a web portal, and a CLI tool — all powered by a single Node.js backend.',
    problem: 'Needed a single backend to serve three completely different client types — a web browser, a REST consumer, and a terminal — each with their own auth flow and data format requirements.',
    architecture: 'Monolithic Node.js/Express backend with layered middleware. Auth handled via GitHub OAuth2 + PKCE with rotating JWT access/refresh tokens. PostgreSQL on Supabase stores structured demographic data with full schema migrations.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'GitHub OAuth2', 'PKCE', 'Supabase', 'Redis'],
    features: [
      { key: 'auth', value: 'GitHub OAuth2 + PKCE for web & CLI' },
      { key: 'tokens', value: 'Rotating JWT with server-side invalidation' },
      { key: 'rbac', value: 'Admin vs Analyst roles via middleware chain' },
      { key: 'search', value: 'Natural language — "young males from Nigeria"' },
      { key: 'export', value: 'CSV bulk download endpoint' },
      { key: 'limits', value: 'Rate limiting + API versioning middleware' },
    ],
  },
  {
    id: 2,
    filename: 'insighta-portal.js',
    title: 'Insighta Web Portal',
    subtitle: 'Browser Interface for Insighta Platform',
    badge: 'FEATURED',
    color: '#00d9f5',
    type: 'frontend',
    status: 'live',
    liveUrl: 'https://insightalabs.netlify.app',
    githubUrl: 'https://github.com/nsien-prestige/insighta-web-portal',
    description: 'A fully-featured web portal for the Insighta platform. Handles GitHub OAuth2 login, profile management, demographic data browsing, and admin controls.',
    problem: 'Needed a browser client that could complete a full OAuth2 PKCE flow, manage token refresh silently in the background, and present role-gated UI depending on whether the user is an admin or analyst.',
    architecture: 'Vanilla HTML/CSS/JS frontend hosted on Netlify, communicating with the Insighta backend via a centralized api.js client. Auth state is managed client-side with token storage and auto-refresh on 401.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub OAuth2', 'PKCE', 'Netlify'],
    features: [
      { key: 'oauth', value: 'Full PKCE flow entirely in the browser' },
      { key: 'refresh', value: 'Silent token refresh on 401 responses' },
      { key: 'rbac', value: 'Role-gated UI for admin vs analyst' },
      { key: 'profiles', value: 'Create, browse, search, delete profiles' },
      { key: 'admin', value: 'Admin-only delete controls on profile detail' },
    ],
  },
  {
    id: 3,
    filename: 'insighta-cli.js',
    title: 'Insighta CLI',
    subtitle: 'Command-Line Interface Tool',
    badge: 'FEATURED',
    color: '#ffa657',
    type: 'cli',
    status: 'local',
    liveUrl: null,
    githubUrl: 'https://github.com/nsien-prestige/insighta-cli',
    description: 'A globally installable Node.js CLI tool for interacting with the Insighta platform entirely from the terminal — including a full GitHub OAuth2 PKCE flow.',
    problem: 'Power users and developers needed to query and manage Insighta data without touching a browser — including authenticating via GitHub OAuth2 from a terminal environment.',
    architecture: 'Commander.js CLI with sub-commands. On login, spawns a local HTTP server on port 9876 to capture the OAuth2 callback, exchanges the code for tokens, and stores credentials locally. Axios handles all API communication with auto-refresh logic.',
    tech: ['Node.js', 'Commander.js', 'Axios', 'Chalk', 'Ora', 'GitHub OAuth2', 'PKCE'],
    features: [
      { key: 'oauth', value: 'OAuth2 PKCE initiated from the terminal' },
      { key: 'callback', value: 'Spawns local server on :9876 for redirect' },
      { key: 'refresh', value: 'Auto token refresh on 401 — seamless re-auth' },
      { key: 'ui', value: 'Colored tables, spinners, formatted output' },
      { key: 'commands', value: 'List, search, create, export profiles' },
    ],
  },
  {
    id: 4,
    filename: 'eventful.ts',
    title: 'Eventful',
    subtitle: 'Event Management Platform',
    badge: 'FEATURED',
    color: '#7c3aed',
    type: 'api',
    status: 'repo',
    liveUrl: null,
    githubUrl: 'https://github.com/nsien-prestige/Eventful',
    description: 'A full-featured event management backend built with NestJS and TypeScript. Handles event creation, ticketing, payments, notifications, webhooks, and analytics.',
    problem: 'Build a production-grade event platform backend with proper separation of concerns, caching, and async communication — not just CRUD endpoints.',
    architecture: 'NestJS modular architecture with dedicated modules for Events, Tickets, Payments, Auth, Notifications, Webhooks, and Analytics. TypeORM manages PostgreSQL relations. IORedis handles caching. Nodemailer sends transactional emails.',
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'TypeORM', 'JWT', 'Swagger', 'Nodemailer'],
    features: [
      { key: 'modules', value: 'Events, Tickets, Payments, Webhooks, Analytics' },
      { key: 'auth', value: 'JWT + Passport.js strategy' },
      { key: 'cache', value: 'Redis via IORedis for high-perf reads' },
      { key: 'qr', value: 'QR code generation for event tickets' },
      { key: 'docs', value: 'Swagger/OpenAPI auto-generated docs' },
    ],
  },
]

const otherProjects = [
  {
    id: 5,
    filename: 'guessing-game.js',
    title: 'Guessing Game',
    subtitle: 'Real-Time Multiplayer Game',
    badge: null,
    color: '#e3b341',
    type: 'realtime',
    status: 'live',
    liveUrl: 'https://guessing-game-lgaw.onrender.com/',
    githubUrl: 'https://github.com/nsien-prestige/Guessing-Game',
    description: 'A real-time multiplayer number-guessing game built with Express.js and Socket.IO. Players join lobbies, compete in real time, and scores persist to MongoDB.',
    problem: 'Coordinate game state across multiple simultaneous connections without a shared memory bottleneck — rooms, turns, scores, and disconnection handling all in real time.',
    architecture: 'Express + Socket.IO server managing lobby rooms as in-memory maps. Game events broadcast via namespaced socket rooms. MongoDB + Mongoose persist user profiles and game history. MVC pattern with Joi validation.',
    tech: ['Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Mongoose', 'JWT', 'BCrypt', 'Jest'],
    features: [
      { key: 'realtime', value: 'Socket.IO websocket lobbies' },
      { key: 'rooms', value: 'Create and join game rooms' },
      { key: 'auth', value: 'JWT + BCrypt password hashing' },
      { key: 'persist', value: 'MongoDB game history & profiles' },
      { key: 'tests', value: 'Jest test suite' },
    ],
  },
  {
    id: 6,
    filename: 'blog-api.js',
    title: 'Blog Application',
    subtitle: 'Full CRUD Blog API',
    badge: null,
    color: '#06b6d4',
    type: 'api',
    status: 'repo',
    liveUrl: null,
    githubUrl: 'https://github.com/nsien-prestige/Blog-application',
    description: 'A full-featured blog platform with complete CRUD operations, user authentication, and a clean RESTful API design.',
    problem: 'Design a clean REST API with proper HTTP semantics, protected routes, and a consistent error-handling pattern.',
    architecture: 'Express REST API with JWT-protected routes. Middleware chain handles auth, validation, and error formatting. MongoDB stores posts and users. Clean separation between routes, controllers, and models.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'JavaScript'],
    features: [
      { key: 'crud', value: 'Full CRUD for posts and comments' },
      { key: 'auth', value: 'JWT-protected routes' },
      { key: 'rest', value: 'Proper HTTP methods and status codes' },
      { key: 'validation', value: 'Input validation middleware' },
    ],
  },
  {
    id: 7,
    filename: 'chatbot.js',
    title: 'Restaurant ChatBot',
    subtitle: 'Conversational Ordering System',
    badge: null,
    color: '#f87171',
    type: 'bot',
    status: 'repo',
    liveUrl: null,
    githubUrl: 'https://github.com/nsien-prestige/Restaurant-ChatBot',
    description: 'A conversational chatbot for restaurant ordering that handles menu navigation, item selection, and order management through a natural dialogue flow.',
    problem: 'Manage stateful multi-step conversation flows without a dedicated state machine library — purely through session tracking and structured dialogue trees.',
    architecture: 'Node.js + Express backend with stateful session management. Each user session tracks conversation state, selected items, and order progress. Dialogue tree determines next prompt based on current state.',
    tech: ['Node.js', 'Express', 'JavaScript'],
    features: [
      { key: 'state', value: 'Stateful multi-step conversation flow' },
      { key: 'menu', value: 'Menu navigation via dialogue' },
      { key: 'order', value: 'Order summary and confirmation' },
    ],
  },
]

const typeColors = {
  platform: '#00f5a0',
  frontend: '#00d9f5',
  cli: '#ffa657',
  api: '#7c3aed',
  realtime: '#e3b341',
  bot: '#f87171',
}

const statusConfig = {
  live: { label: 'LIVE', color: '#00f5a0' },
  repo: { label: 'REPO', color: '#8b949e' },
  local: { label: 'LOCAL', color: '#ffa657' },
}

function FileIcon({ type }) {
  const color = typeColors[type] || '#8b949e'
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

function FolderRow({ label, folderKey, isOpen, onToggle, accent }) {
  return (
    <div
      onClick={() => onToggle(folderKey)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        color: accent || '#8b949e',
        fontSize: '0.72rem',
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '1px',
        userSelect: 'none',
        marginTop: '0.25rem',
      }}
    >
      <span style={{
        fontSize: '0.6rem',
        transition: 'transform 0.2s',
        display: 'inline-block',
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      }}>▶</span>
      <span>{label}</span>
    </div>
  )
}

function FileRow({ project, isActive, onClick }) {
  return (
    <div
      onClick={() => onClick(project)}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '0.45rem 1rem 0.45rem 2rem',
        cursor: 'pointer',
        background: isActive ? 'rgba(0,245,160,0.08)' : 'transparent',
        borderLeft: isActive ? `2px solid ${project.color}` : '2px solid transparent',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      <FileIcon type={project.type} />
      <span style={{
        color: isActive ? '#e6edf3' : '#8b949e',
        fontSize: '0.78rem',
        fontFamily: 'monospace',
        transition: 'color 0.15s',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>{project.filename}</span>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView(0.05)
  const [active, setActive] = useState(hngProjects[0])
  const [openFolders, setOpenFolders] = useState({ hng: true, featured: false, others: false })

  const toggleFolder = (key) => setOpenFolders(f => ({ ...f, [key]: !f[key] }))

  const status = statusConfig[active.status]
  const allCount = hngProjects.length + featuredProjects.length + otherProjects.length

  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>ls -la ./projects</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.75rem' }}>{allCount} projects</span>
          </div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem' }}>
            // click any file to inspect
          </p>
        </motion.div>

        {/* IDE layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            background: 'rgba(13,17,23,0.95)',
            border: '1px solid rgba(48,54,61,0.8)',
            borderRadius: '12px',
            overflow: 'hidden',
            minHeight: '580px',
          }}
        >
          {/* SIDEBAR */}
          <div style={{
            borderRight: '1px solid rgba(48,54,61,0.8)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* traffic lights */}
            <div style={{
              padding: '0.75rem 1rem',
              borderBottom: '1px solid rgba(48,54,61,0.6)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ color: '#8b949e', fontSize: '0.72rem', fontFamily: 'monospace', marginLeft: '4px' }}>EXPLORER</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>

              {/* HNG folder */}
              <FolderRow
                label="🏆 HNG INTERNSHIP"
                folderKey="hng"
                isOpen={openFolders.hng}
                onToggle={toggleFolder}
                accent="#ffd700"
              />
              <AnimatePresence initial={false}>
                {openFolders.hng && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {hngProjects.map(p => (
                      <FileRow key={p.id} project={p} isActive={active.id === p.id} onClick={setActive} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Featured folder */}
              <FolderRow
                label="📁 FEATURED"
                folderKey="featured"
                isOpen={openFolders.featured}
                onToggle={toggleFolder}
              />
              <AnimatePresence initial={false}>
                {openFolders.featured && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {featuredProjects.map(p => (
                      <FileRow key={p.id} project={p} isActive={active.id === p.id} onClick={setActive} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Others folder */}
              <FolderRow
                label="📁 MORE PROJECTS"
                folderKey="others"
                isOpen={openFolders.others}
                onToggle={toggleFolder}
              />
              <AnimatePresence initial={false}>
                {openFolders.others && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {otherProjects.map(p => (
                      <FileRow key={p.id} project={p} isActive={active.id === p.id} onClick={setActive} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* MAIN PANEL */}
          <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

            {/* tab bar */}
            <div style={{
              borderBottom: '1px solid rgba(48,54,61,0.6)',
              display: 'flex', alignItems: 'center',
              minHeight: '40px',
              overflowX: 'auto',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '0 1rem',
                borderRight: '1px solid rgba(48,54,61,0.6)',
                height: '40px',
                background: 'rgba(22,27,34,0.6)',
                flexShrink: 0,
              }}>
                <FileIcon type={active.type} />
                <span style={{ color: '#e6edf3', fontSize: '0.78rem', fontFamily: 'monospace' }}>{active.filename}</span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: active.color, marginLeft: '4px' }} />
              </div>
            </div>

            {/* content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.75rem 2rem',
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }}
              >
                {/* header */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    {active.badge === 'HNG' && (
                      <span style={{
                        background: 'rgba(255,215,0,0.12)',
                        border: '1px solid rgba(255,215,0,0.35)',
                        color: '#ffd700',
                        fontSize: '0.65rem', fontWeight: 700,
                        padding: '2px 10px', borderRadius: '100px',
                        letterSpacing: '1px',
                      }}>🏆 HNG</span>
                    )}
                    {active.badge === 'FEATURED' && (
                      <span style={{
                        background: `${active.color}18`,
                        border: `1px solid ${active.color}40`,
                        color: active.color,
                        fontSize: '0.65rem', fontWeight: 700,
                        padding: '2px 10px', borderRadius: '100px',
                        letterSpacing: '1px',
                      }}>FEATURED</span>
                    )}
                    <span style={{
                      background: `${status.color}15`,
                      border: `1px solid ${status.color}35`,
                      color: status.color,
                      fontSize: '0.65rem', fontWeight: 700,
                      padding: '2px 10px', borderRadius: '100px',
                      letterSpacing: '1px',
                    }}>{status.label}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#e6edf3', margin: '0 0 4px', fontFamily: 'inherit' }}>
                    {active.title}
                  </h3>
                  <p style={{ color: '#8b949e', fontSize: '0.82rem', margin: 0 }}>{active.subtitle}</p>
                </div>

                {/* HNG contribution callout */}
                {active.badge === 'HNG' && active.contribution && (
                  <div style={{
                    background: 'rgba(255,215,0,0.06)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    borderRadius: '8px',
                    padding: '0.85rem 1.1rem',
                    marginBottom: '1.5rem',
                    display: 'flex', gap: '10px', alignItems: 'flex-start',
                  }}>
                    <span style={{ color: '#ffd700', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px' }}>// my contribution</span>
                    <span style={{ color: '#cdd9e5', fontSize: '0.8rem', lineHeight: 1.7 }}>{active.contribution}</span>
                  </div>
                )}

                {/* description */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(48,54,61,0.6)',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{'/**'}</div>
                  <div style={{ color: '#8b949e', fontSize: '0.82rem', lineHeight: 1.8, paddingLeft: '0.5rem' }}>
                    {'* '}<span style={{ color: '#cdd9e5' }}>{active.description}</span>
                  </div>
                  <div style={{ color: '#8b949e', fontSize: '0.75rem', marginTop: '0.5rem' }}>{' */'}</div>
                </div>

                {/* problem + arch */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'problem', color: '#ff7b72', value: active.problem },
                    { label: 'architecture', color: '#79c0ff', value: active.architecture },
                  ].map(item => (
                    <div key={item.label} style={{
                      background: 'rgba(22,27,34,0.6)',
                      border: '1px solid rgba(48,54,61,0.6)',
                      borderRadius: '8px',
                      padding: '1rem',
                    }}>
                      <div style={{ marginBottom: '0.6rem' }}>
                        <span style={{ color: '#79c0ff', fontSize: '0.75rem' }}>const </span>
                        <span style={{ color: item.color, fontSize: '0.75rem', fontWeight: 700 }}>{item.label}</span>
                        <span style={{ color: '#8b949e', fontSize: '0.75rem' }}> = </span>
                        <span style={{ color: '#a5d6ff', fontSize: '0.75rem' }}>`</span>
                      </div>
                      <p style={{ color: '#8b949e', fontSize: '0.78rem', lineHeight: 1.75, margin: '0 0 0.5rem', paddingLeft: '0.5rem' }}>{item.value}</p>
                      <span style={{ color: '#a5d6ff', fontSize: '0.75rem' }}>`</span>
                    </div>
                  ))}
                </div>

                {/* features */}
                <div style={{
                  background: 'rgba(22,27,34,0.6)',
                  border: '1px solid rgba(48,54,61,0.6)',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ color: '#d2a8ff', fontSize: '0.75rem' }}>const </span>
                    <span style={{ color: '#7ee787', fontSize: '0.75rem', fontWeight: 700 }}>features</span>
                    <span style={{ color: '#8b949e', fontSize: '0.75rem' }}> = {'{'}</span>
                  </div>
                  {active.features.map((f, i) => (
                    <div key={f.key} style={{ display: 'flex', gap: '8px', paddingLeft: '1rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: '#ffa657', fontSize: '0.75rem', flexShrink: 0 }}>{f.key}:</span>
                      <span style={{ color: '#a5d6ff', fontSize: '0.75rem' }}>"{f.value}"</span>
                      {i < active.features.length - 1 && <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>,</span>}
                    </div>
                  ))}
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>{'}'}</span>
                  </div>
                </div>

                {/* tech stack */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ color: '#8b949e', fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', marginBottom: '0.75rem' }}>// tech stack</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {active.tech.map(t => (
                      <span key={t} style={{
                        background: `${active.color}10`,
                        border: `1px solid ${active.color}30`,
                        color: active.color,
                        padding: '3px 12px',
                        borderRadius: '100px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#cdd9e5',
                      padding: '0.55rem 1.1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    View Code
                  </a>
                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: `${active.color}18`,
                        border: `1px solid ${active.color}40`,
                        color: active.color,
                        padding: '0.55rem 1.1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        transition: 'all 0.2s',
                      }}
                    >
                      ↗ Live Demo
                    </a>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* github cta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p style={{ color: '#475569', marginBottom: '1rem', fontSize: '0.88rem', fontFamily: 'monospace' }}>
            // more work on github
          </p>
          <motion.a
            href="https://github.com/nsien-prestige"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0,245,160,0.25)' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,245,160,0.07)',
              border: '1px solid rgba(0,245,160,0.2)',
              color: '#00f5a0',
              padding: '0.8rem 1.75rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            github.com/nsien-prestige ↗
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}