import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const skills = [
  {
    category: 'API Design',
    color: '#00f5a0',
    accent: '#00d9f5',
    token: 'const',
    items: [
      { skill: 'REST API Design', project: 'Insighta Labs+', detail: 'Designed versioned REST endpoints with consistent response shapes, proper HTTP semantics, and middleware-based validation across all three interfaces.' },
      { skill: 'API Versioning', project: 'Insighta Labs+', detail: 'Implemented /api/v1 versioning prefix with backward-compatible route structure and version-aware middleware chain.' },
      { skill: 'Swagger / OpenAPI', project: 'Eventful', detail: 'Auto-generated full API documentation from NestJS decorators covering all endpoints, request/response schemas, and auth flows.' },
    ],
  },
  {
    category: 'Authentication',
    color: '#ff7b72',
    accent: '#f85149',
    token: 'async',
    items: [
      { skill: 'GitHub OAuth2 + PKCE', project: 'Insighta Labs+', detail: 'Implemented the full PKCE flow for both browser and CLI clients — code challenge generation, authorization redirect, code exchange, and token issuance.' },
      { skill: 'JWT + Refresh Tokens', project: 'Insighta Labs+', detail: 'Built rotating access/refresh token system with short expiry windows, server-side invalidation, and silent refresh on 401.' },
      { skill: 'BCrypt Password Hashing', project: 'Guessing Game', detail: 'Hashed all user passwords with BCrypt before persistence, with configurable salt rounds.' },
      { skill: 'Passport.js Strategy', project: 'Eventful', detail: 'Configured JWT Passport strategy for stateless authentication across all protected NestJS routes.' },
    ],
  },
  {
    category: 'Databases',
    color: '#7ee787',
    accent: '#3fb950',
    token: 'class',
    items: [
      { skill: 'PostgreSQL', project: 'Insighta Labs+', detail: 'Designed relational schema for demographic profiles with structured migrations on Supabase. Optimised with indexes for natural language search queries.' },
      { skill: 'MongoDB + Mongoose', project: 'Guessing Game', detail: 'Modelled user profiles and game history as documents with Mongoose schemas, validators, and pre-save hooks.' },
      { skill: 'Redis Caching', project: 'Insighta Labs+ / Eventful', detail: 'Used Redis to cache repeated read queries and reduce database load. In Stage 4B, implemented query normalisation to maximise cache hit rate.' },
      { skill: 'TypeORM', project: 'Eventful', detail: 'Managed all PostgreSQL relations, migrations, and queries through TypeORM entities and repositories.' },
    ],
  },
  {
    category: 'Deployment',
    color: '#79c0ff',
    accent: '#388bfd',
    token: 'export',
    items: [
      { skill: 'Render', project: 'Insighta Labs+ / Portfolio Mailer', detail: 'Deployed Node.js backends on Render with environment variable management and UptimeRobot monitoring to prevent cold starts.' },
      { skill: 'Netlify', project: 'Insighta Web Portal', detail: 'Deployed frontend on Netlify with environment variable injection and automatic deploys from GitHub.' },
      { skill: 'Supabase', project: 'Insighta Labs+', detail: 'Used Supabase as managed PostgreSQL host with connection pooling and remote access from Render backend.' },
      { skill: 'Environment Config', project: 'All Projects', detail: 'Managed secrets and config via .env files with .env.example templates, never committing sensitive values to version control.' },
    ],
  },
  {
    category: 'Caching',
    color: '#ffa657',
    accent: '#e3b341',
    token: 'return',
    items: [
      { skill: 'Redis Query Caching', project: 'Insighta Labs+', detail: 'Cached natural language search results with TTL-based expiry to reduce repeated database hits under high query volume.' },
      { skill: 'Query Normalisation', project: 'Insighta Labs+ (Stage 4B)', detail: 'Built deterministic canonical key generation so semantically identical queries like "Nigerian females 20–45" and "Women aged 20-45 from Nigeria" hit the same cache entry.' },
      { skill: 'IORedis', project: 'Eventful', detail: 'Used IORedis client for high-performance read caching across event listing and ticket availability endpoints.' },
    ],
  },
  {
    category: 'Testing & Docs',
    color: '#d2a8ff',
    accent: '#bc8cff',
    token: 'import',
    items: [
      { skill: 'Jest', project: 'Guessing Game', detail: 'Wrote unit tests for game logic, auth middleware, and utility functions using Jest with mocked dependencies.' },
      { skill: 'Postman', project: 'Insighta Labs+', detail: 'Used Postman collections to manually test and document all API endpoints during development before Swagger was set up.' },
      { skill: 'README Documentation', project: 'All Projects', detail: 'Wrote detailed READMEs covering system architecture, auth flows, CLI usage, token handling, and deployment instructions.' },
    ],
  },
  {
    category: 'Background & Ingestion',
    color: '#39d0d8',
    accent: '#56d364',
    token: 'class',
    items: [
      { skill: 'CSV Streaming Ingestion', project: 'Insighta Labs+ (Stage 4B)', detail: 'Built a chunked CSV ingestion pipeline supporting up to 500,000 rows per file. Streamed rows without loading the full file into memory, processed in batches, and reported per-row skip reasons.' },
      { skill: 'Concurrent Upload Handling', project: 'Insighta Labs+ (Stage 4B)', detail: 'Designed the ingestion endpoint to support concurrent uploads without blocking read traffic, using non-blocking batch inserts.' },
      { skill: 'Rate Limiting', project: 'Insighta Labs+', detail: 'Applied per-route rate limiting middleware to prevent abuse on auth and search endpoints.' },
    ],
  },
]

export default function Skills() {
  const [ref, inView] = useInView(0.1)

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: '8rem 1.5rem', position: 'relative', background: 'rgba(13,17,23,0.4)' }}
    >
      {/* background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(48,54,61,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.15) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>cat ./skills.json</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.75rem' }}>{skills.length} categories</span>
          </div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem' }}>
            // every skill links back to a real project
          </p>
        </motion.div>

        {/* skill categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {skills.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.08 }}
              style={{
                background: 'rgba(13,17,23,0.9)',
                border: '1px solid rgba(48,54,61,0.8)',
                borderRadius: '12px',
                overflow: 'hidden',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            >
              {/* category header */}
              <div style={{
                background: 'rgba(22,27,34,0.8)',
                borderBottom: '1px solid rgba(48,54,61,0.6)',
                padding: '0.85rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{ color: cat.color, fontSize: '0.78rem', fontWeight: 700 }}>{cat.token}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>{'{'}</span>
                <span style={{ color: '#e6edf3', fontSize: '0.85rem', fontWeight: 700 }}>{cat.category}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>{'}'}</span>
                <span style={{
                  marginLeft: 'auto',
                  background: `${cat.accent}15`,
                  border: `1px solid ${cat.accent}30`,
                  color: cat.color,
                  fontSize: '0.62rem', fontWeight: 700,
                  padding: '2px 8px', borderRadius: '100px',
                }}>{cat.items.length} skills</span>
              </div>

              {/* skill rows */}
              <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: ci * 0.08 + ii * 0.06 + 0.2 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 160px 1fr',
                      gap: '1rem',
                      alignItems: 'start',
                      padding: '0.75rem 1rem',
                      background: 'rgba(22,27,34,0.5)',
                      borderRadius: '8px',
                      border: '1px solid rgba(48,54,61,0.4)',
                    }}
                  >
                    {/* skill name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: cat.accent, fontSize: '0.7rem', flexShrink: 0 }}>→</span>
                      <span style={{ color: '#e6edf3', fontSize: '0.82rem', fontWeight: 600 }}>{item.skill}</span>
                    </div>

                    {/* project tag */}
                    <span style={{
                      background: `${cat.color}10`,
                      border: `1px solid ${cat.color}25`,
                      color: cat.color,
                      fontSize: '0.68rem', fontWeight: 600,
                      padding: '2px 10px', borderRadius: '100px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      alignSelf: 'center',
                    }}>{item.project}</span>

                    {/* detail */}
                    <span style={{ color: '#8b949e', fontSize: '0.78rem', lineHeight: 1.7 }}>
                      {item.detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}