import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const hngProjects = [
  {
    id: 'h1',
    filename: 'insighta-backend.js',
    title: 'Insighta Labs+ — Backend API',
    subtitle: 'Stages 3 & 4B · Node.js / Express / PostgreSQL',
    badge: 'HNG',
    color: '#00f5a0',
    type: 'platform',
    status: 'live',
    liveUrl: 'https://insighta-backend-zph3.onrender.com',
    githubUrl: 'https://github.com/nsien-prestige/insighta-backend',
    contribution: 'Built the entire backend solo across two stages — auth system, RBAC middleware chain, natural language search parser, query caching with normalisation, streaming CSV ingestion, and connection pooling.',
    description: 'A production-grade demographic intelligence platform serving three client types from one backend: a REST API, a web portal using HTTP-only cookies, and a CLI using file-stored tokens. Built in two stages — Stage 3 added auth, roles, and multi-interface support; Stage 4B added query optimisation, cache normalisation, and bulk CSV ingestion.',
    architecture: `Routes → middleware chain (requireApiVersion → authenticate → apiLimiter → requireRole) → controller → Redis cache check → PostgreSQL. Two separate GitHub OAuth apps — one for web, one for CLI — both using PKCE but with different callback mechanisms. Access tokens expire in 3 minutes; refresh tokens in 5. Every refresh rotates both tokens.`,
    problem: 'Single backend serving three clients with completely different auth models: the browser needed HTTP-only cookies and CSRF protection, the REST consumer needed Bearer tokens, and the CLI needed to complete an OAuth2 PKCE flow without a traditional server redirect. Stage 4B then required the same system to handle 1M+ records, hundreds of queries per minute, and 500k-row CSV uploads without degrading read performance.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT', 'GitHub OAuth2', 'PKCE', 'Supabase', 'pg Pool', 'multer', 'csv-parse'],
    features: [
      { key: 'auth', value: 'GitHub OAuth2 + PKCE — separate apps for web and CLI' },
      { key: 'tokens', value: 'Rotating JWT pairs, 3min/5min expiry, server-side invalidation' },
      { key: 'rbac', value: 'Admin vs analyst enforced at router level via middleware chain' },
      { key: 'search', value: 'Rule-based NL parser — "young males from Nigeria" → SQL filters' },
      { key: 'caching', value: 'Redis with normalised keys — sorted filter object as cache key' },
      { key: 'pooling', value: 'pg Pool: max 10 connections, 2000ms timeout, 30s idle eviction' },
      { key: 'window_fn', value: 'COUNT(*) OVER() eliminates second COUNT query round trip' },
      { key: 'ingestion', value: 'Stream → csv-parse → chunks of 1000 → bulk INSERT ON CONFLICT' },
    ],
  },
  {
    id: 'h2',
    filename: 'insighta-portal.js',
    title: 'Insighta Web Portal',
    subtitle: 'Stage 3 · Vanilla HTML / CSS / JS · Netlify',
    badge: 'HNG',
    color: '#00d9f5',
    type: 'frontend',
    status: 'live',
    liveUrl: 'https://insightalabs.netlify.app',
    githubUrl: 'https://github.com/nsien-prestige/insighta-web-portal',
    contribution: 'Built all six pages, the centralised api.js fetch wrapper with auto-refresh, the PKCE flow using the Web Crypto API, role-based UI gating, and the Netlify deployment config.',
    description: 'A six-page web portal for Insighta Labs+. Implements the full GitHub OAuth2 PKCE flow using the browser\'s Web Crypto API — no library required. Tokens are stored in HTTP-only cookies, making them invisible to JavaScript. A centralised api.js handles all fetch calls and transparently retries on 401 before failing.',
    architecture: `Static HTML/CSS/JS on Netlify. Every page runs checkAuth() on load which calls GET /auth/me — if the access token is expired, it silently calls POST /auth/refresh and retries. If the refresh token is also expired, it redirects to login. The _redirects file on Netlify handles clean URL routing without .html extensions.`,
    problem: 'Completing a PKCE OAuth2 flow in a browser without a backend proxy — the code challenge had to be generated client-side using the Web Crypto API (crypto.subtle.digest), the state had to be validated on return, and tokens had to be refreshed silently so users never see a login page mid-session.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Crypto API', 'GitHub OAuth2', 'PKCE', 'Netlify'],
    features: [
      { key: 'pages', value: 'Login, Dashboard, Profiles list, Profile detail, Search, Account' },
      { key: 'pkce', value: 'code_verifier + code_challenge via crypto.subtle.digest (SHA-256)' },
      { key: 'cookies', value: 'HTTP-only cookies — JS cannot read tokens at all' },
      { key: 'refresh', value: 'api.js retries every 401 with /auth/refresh before failing' },
      { key: 'rbac', value: 'Create Profile button hidden for analyst role; enforced by backend' },
      { key: 'routing', value: '_redirects file for clean URLs on Netlify static hosting' },
    ],
  },
  {
    id: 'h3',
    filename: 'insighta-cli.js',
    title: 'Insighta CLI',
    subtitle: 'Stage 3 · Node.js / Commander.js · Globally installable',
    badge: 'HNG',
    color: '#ffa657',
    type: 'cli',
    status: 'local',
    liveUrl: null,
    githubUrl: 'https://github.com/nsien-prestige/insighta-cli',
    contribution: 'Built the entire CLI tool — command structure, PKCE auth flow from a terminal using a local callback server, Axios request layer with auto-refresh, credential file management, and formatted terminal output.',
    description: 'A globally installable Node.js CLI (npm install -g) for the Insighta platform. Implements GitHub OAuth2 PKCE from the terminal by spawning a local HTTP server on port 9876 to receive the OAuth redirect, then posts the code to a dedicated backend endpoint. Tokens are stored at ~/.insighta/credentials.json and refreshed automatically on every 401.',
    architecture: `bin/insighta.js defines Commander commands. commands/auth.js handles login (spawns local server, opens browser, captures callback), logout (deletes credentials + server invalidation), and whoami. commands/profiles.js handles list, get, search, create, export. utils/api.js is an Axios instance with a response interceptor that catches 401s, refreshes the token, and retries the original request.`,
    problem: 'GitHub OAuth2 requires redirecting to a URL the server controls — but a CLI has no persistent server. The solution: spawn a one-shot local HTTP server on :9876 before initiating the flow. The CLI GitHub OAuth app has its callback URL set to localhost:9876/callback. After the user authorises in the browser, GitHub redirects there, the server captures the code, shuts itself down, and the CLI exchanges the code via POST /auth/cli/callback with the PKCE code_verifier.',
    tech: ['Node.js', 'Commander.js', 'Axios', 'Chalk', 'Ora', 'cli-table3', 'open', 'GitHub OAuth2', 'PKCE'],
    features: [
      { key: 'install', value: 'npm install -g — insighta command available globally' },
      { key: 'login', value: 'Spawns :9876 server → opens browser → captures OAuth callback' },
      { key: 'pkce', value: 'code_verifier + code_challenge generated locally, no client secret in binary' },
      { key: 'storage', value: 'Credentials at ~/.insighta/credentials.json' },
      { key: 'refresh', value: 'Axios interceptor auto-refreshes on 401, retries original request' },
      { key: 'commands', value: 'profiles list/get/search/create/export, login/logout/whoami' },
    ],
  },
]

// ─── Personal projects commented out for HNG submission ───────────────────
// Restore after deadline by uncommenting featuredProjects, otherProjects
// and re-adding the folder structure in the sidebar
// ──────────────────────────────────────────────────────────────────────────

const typeColors = {
  platform: '#00f5a0',
  frontend: '#00d9f5',
  cli: '#ffa657',
}

const statusConfig = {
  live: { label: 'LIVE', color: '#00f5a0' },
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
        fontSize: '0.78rem', fontFamily: 'monospace',
        transition: 'color 0.15s',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{project.filename}</span>
    </div>
  )
}

// ── Deep Dive ────────────────────────────────────────────────────────────────

const endpoints = [
  { method: 'GET',  path: '/auth/github',           auth: 'public',   desc: 'Redirect to GitHub OAuth page with PKCE code_challenge' },
  { method: 'GET',  path: '/auth/github/callback',   auth: 'public',   desc: 'Exchange code with GitHub, set HTTP-only cookies, redirect to dashboard' },
  { method: 'POST', path: '/auth/cli/callback',      auth: 'public',   desc: 'CLI-specific: exchange code + code_verifier, return tokens as JSON' },
  { method: 'POST', path: '/auth/refresh',           auth: 'token',    desc: 'Rotate both tokens; old refresh token deleted immediately' },
  { method: 'POST', path: '/auth/logout',            auth: 'token',    desc: 'Delete refresh token from DB; client clears local storage' },
  { method: 'GET',  path: '/auth/me',                auth: 'analyst+', desc: 'Return current user — used by every page on load for session check' },
  { method: 'GET',  path: '/api/profiles',           auth: 'analyst+', desc: 'List with filters (gender, country, age_group, min_age, max_age), sort, paginate' },
  { method: 'GET',  path: '/api/profiles/search',    auth: 'analyst+', desc: 'Natural language query parsed to filters, result cached in Redis' },
  { method: 'GET',  path: '/api/profiles/export',    auth: 'analyst+', desc: 'Stream matching profiles as CSV download' },
  { method: 'POST', path: '/api/profiles',           auth: 'admin',    desc: 'Create profile — admin only, 422 if name already exists' },
  { method: 'POST', path: '/api/profiles/import',    auth: 'admin',    desc: 'Stream CSV → chunked bulk insert, returns inserted/skipped summary' },
  { method: 'DELETE', path: '/api/profiles/:id',     auth: 'admin',    desc: 'Hard delete — admin only' },
]

const methodColors = { GET: '#7ee787', POST: '#79c0ff', DELETE: '#ff7b72', PATCH: '#ffa657' }

function Section({ title, color, children, isLast }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <div style={{ width: '3px', height: '16px', background: color, borderRadius: '2px' }} />
        <span style={{ color, fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function DeepDive({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4 }}
      style={{ marginTop: '4rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
        <span style={{ color: '#ffd700', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>$</span>
        <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>cat ./featured-deep-dive.md</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
        <span style={{ color: '#ffd700', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700 }}>🏆 Featured Project</span>
      </div>
      <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem', marginBottom: '2.5rem' }}>
        // Insighta Labs+ Backend — Stages 3 & 4B
      </p>

      <div style={{
        background: 'rgba(13,17,23,0.95)',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '12px', overflow: 'hidden',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}>
        <div style={{
          background: 'rgba(22,27,34,0.9)',
          borderBottom: '1px solid rgba(48,54,61,0.6)',
          padding: '0.7rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
          ))}
          <span style={{ color: '#8b949e', fontSize: '0.72rem', marginLeft: '6px' }}>insighta-deep-dive.md</span>
        </div>

        <div style={{ padding: '2rem' }}>

          {/* Problem */}
          <Section title="The Problem" color="#ff7b72">
            <p style={{ color: '#cdd9e5', fontSize: '0.87rem', lineHeight: 1.9, margin: 0 }}>
              Stage 3 required one backend to serve three clients — a browser that needed HTTP-only cookies and CSRF protection, a REST consumer that needed Bearer tokens, and a terminal CLI that needed to complete GitHub OAuth2 PKCE without a persistent redirect server. Each required a different auth mechanism, a different token delivery method, and a different session handling strategy — all from the same codebase.
            </p>
            <p style={{ color: '#8b949e', fontSize: '0.87rem', lineHeight: 1.9, margin: '0.85rem 0 0' }}>
              Stage 4B then extended the problem: the same system now had to handle 1M+ records under concurrent read/write load. Repeated queries were hitting the database redundantly because semantically identical queries like <code style={{ color: '#00f5a0', background: 'rgba(0,245,160,0.08)', padding: '1px 5px', borderRadius: '3px' }}>"young males from nigeria"</code> and <code style={{ color: '#00f5a0', background: 'rgba(0,245,160,0.08)', padding: '1px 5px', borderRadius: '3px' }}>"males from nigeria who are young"</code> produced different cache keys. CSV uploads of up to 500,000 rows needed to run without blocking read traffic or loading the full file into memory.
            </p>
          </Section>

          {/* Architecture */}
          <Section title="Architecture & Request Flow" color="#79c0ff">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
              {[
                { n: '1', title: 'requireApiVersion', detail: 'Checks X-API-Version: 1 header — rejects missing or unsupported versions with 400' },
                { n: '2', title: 'authenticate', detail: 'Verifies JWT signature and expiry. Attaches req.user = { id, username, role }. 401 if invalid or missing.' },
                { n: '3', title: 'apiLimiter', detail: 'Per-IP rate limit via express-rate-limit. Prevents abuse on all /api/* routes.' },
                { n: '4', title: 'requireRole (admin routes)', detail: 'Checks req.user.role against allowed roles. Returns 403 if role is insufficient or if is_active is false.' },
                { n: '5', title: 'Controller', detail: 'Builds filter object from query params or NL parser. Normalises filters, generates Redis key, checks cache.' },
                { n: '6', title: 'Redis cache check', detail: 'On hit: returns cached result in ~1ms. On miss: queries PostgreSQL and stores result with 60s TTL.' },
                { n: '7', title: 'PostgreSQL query', detail: 'Single query using COUNT(*) OVER() window function — one round trip for data + total count. pg Pool: max 10 connections.' },
              ].map(s => (
                <div key={s.n} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  padding: '0.6rem 0.85rem',
                  background: 'rgba(22,27,34,0.5)',
                  borderRadius: '6px', border: '1px solid rgba(48,54,61,0.4)',
                }}>
                  <span style={{
                    color: '#79c0ff', fontSize: '0.68rem', fontWeight: 700,
                    background: 'rgba(121,192,255,0.1)', border: '1px solid rgba(121,192,255,0.2)',
                    padding: '1px 7px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                  }}>{s.n}</span>
                  <div>
                    <span style={{ color: '#e6edf3', fontSize: '0.82rem', fontWeight: 700 }}>{s.title}</span>
                    <span style={{ color: '#8b949e', fontSize: '0.78rem' }}> — {s.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Endpoints */}
          <Section title="Key Endpoints" color="#7ee787">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {endpoints.map(ep => (
                <div key={ep.path} style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 240px 72px 1fr',
                  gap: '0.75rem', alignItems: 'center',
                  padding: '0.45rem 0.85rem',
                  background: 'rgba(22,27,34,0.5)',
                  borderRadius: '6px', border: '1px solid rgba(48,54,61,0.4)',
                }}>
                  <span style={{
                    color: methodColors[ep.method] || '#8b949e',
                    fontSize: '0.65rem', fontWeight: 800,
                    background: `${methodColors[ep.method] || '#8b949e'}12`,
                    border: `1px solid ${methodColors[ep.method] || '#8b949e'}25`,
                    padding: '1px 4px', borderRadius: '4px', textAlign: 'center',
                  }}>{ep.method}</span>
                  <span style={{ color: '#a5d6ff', fontSize: '0.75rem' }}>{ep.path}</span>
                  <span style={{
                    color: '#8b949e', fontSize: '0.62rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(48,54,61,0.5)',
                    padding: '1px 5px', borderRadius: '4px', textAlign: 'center',
                  }}>{ep.auth}</span>
                  <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>{ep.desc}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Challenge */}
          <Section title="The Hardest Challenge — OAuth2 PKCE from a Terminal" color="#ffa657" isLast>
            <div style={{
              background: 'rgba(255,166,87,0.05)',
              border: '1px solid rgba(255,166,87,0.15)',
              borderRadius: '8px', padding: '1.1rem 1.25rem', marginBottom: '1rem',
            }}>
              <p style={{ color: '#8b949e', fontSize: '0.7rem', fontFamily: 'monospace', margin: '0 0 0.5rem' }}>// the problem</p>
              <p style={{ color: '#cdd9e5', fontSize: '0.87rem', lineHeight: 1.85, margin: 0 }}>
                GitHub OAuth2 requires the authorization code to be delivered to a redirect URL. The CLI had no server to receive it. The task required the CLI to use the exact same PKCE flow as the web portal — from a terminal window with no persistent process waiting to catch the redirect.
              </p>
            </div>
            <div style={{
              background: 'rgba(0,245,160,0.04)',
              border: '1px solid rgba(0,245,160,0.12)',
              borderRadius: '8px', padding: '1.1rem 1.25rem', marginBottom: '1rem',
            }}>
              <p style={{ color: '#8b949e', fontSize: '0.7rem', fontFamily: 'monospace', margin: '0 0 0.5rem' }}>// the solution</p>
              <p style={{ color: '#cdd9e5', fontSize: '0.87rem', lineHeight: 1.85, margin: '0 0 0.85rem' }}>
                Before initiating the OAuth flow, the CLI spawns a one-shot local HTTP server on port 9876. The CLI's GitHub OAuth app has its callback URL set to <code style={{ color: '#00f5a0', background: 'rgba(0,245,160,0.08)', padding: '1px 5px', borderRadius: '3px' }}>localhost:9876/callback</code>. The CLI generates a <code style={{ color: '#00f5a0', background: 'rgba(0,245,160,0.08)', padding: '1px 5px', borderRadius: '3px' }}>code_verifier</code> and <code style={{ color: '#00f5a0', background: 'rgba(0,245,160,0.08)', padding: '1px 5px', borderRadius: '3px' }}>code_challenge</code> locally, opens the browser to GitHub, and waits. When the user authorises, GitHub redirects to localhost:9876 — the local server captures the code and validates the state, shuts itself down, then sends <code style={{ color: '#00f5a0', background: 'rgba(0,245,160,0.08)', padding: '1px 5px', borderRadius: '3px' }}>POST /auth/cli/callback {"{ code, code_verifier }"}</code> to the backend.
              </p>
              <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
                Because PKCE is used, no client secret ever needs to be embedded in the CLI binary — the backend verifies the code exchange using the code_verifier against the original code_challenge. Tokens are written to <code style={{ color: '#ffa657', background: 'rgba(255,166,87,0.08)', padding: '1px 5px', borderRadius: '3px' }}>~/.insighta/credentials.json</code> and all subsequent requests attach them as Bearer headers. A 401 response triggers an automatic token rotation before retrying.
              </p>
            </div>

            {/* Stage 4B callout */}
            <div style={{
              background: 'rgba(121,192,255,0.04)',
              border: '1px solid rgba(121,192,255,0.12)',
              borderRadius: '8px', padding: '1.1rem 1.25rem',
            }}>
              <p style={{ color: '#8b949e', fontSize: '0.7rem', fontFamily: 'monospace', margin: '0 0 0.5rem' }}>// stage 4B — query normalisation & CSV ingestion</p>
              <p style={{ color: '#cdd9e5', fontSize: '0.87rem', lineHeight: 1.85, margin: '0 0 0.85rem' }}>
                Cache hit rate was low because word-order variations of the same query produced different Redis keys. The fix: after parsing the NL query into a filter object, sort its keys alphabetically with <code style={{ color: '#79c0ff', background: 'rgba(121,192,255,0.08)', padding: '1px 5px', borderRadius: '3px' }}>Object.keys(filters).sort()</code>, rebuild the object, then use <code style={{ color: '#79c0ff', background: 'rgba(121,192,255,0.08)', padding: '1px 5px', borderRadius: '3px' }}>JSON.stringify(normalised)</code> as the cache key. Deterministic, no AI, no ambiguity — two queries with the same filters always hit the same cache entry regardless of phrasing.
              </p>
              <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
                CSV ingestion uses multer memoryStorage to receive the file as a buffer, converts it to a readable stream with <code style={{ color: '#79c0ff', background: 'rgba(121,192,255,0.08)', padding: '1px 5px', borderRadius: '3px' }}>Readable.from(buffer)</code>, pipes through csv-parse row-by-row, collects valid rows in chunks of 1000, and bulk inserts each chunk with a single parameterised <code style={{ color: '#79c0ff', background: 'rgba(121,192,255,0.08)', padding: '1px 5px', borderRadius: '3px' }}>INSERT ... ON CONFLICT (name) DO NOTHING</code>. Bad rows are skipped with reasons tracked. The full file is never in memory at once. Measured improvement on repeated queries: ~1220ms → ~370ms.
              </p>
            </div>
          </Section>

        </div>
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Projects() {
  const [ref, inView] = useInView(0.05)
  const [active, setActive] = useState(hngProjects[0])
  const status = statusConfig[active.status]

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
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>ls -la ./hng-projects</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
            <span style={{ color: '#ffd700', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700 }}>🏆 HNG Internship</span>
          </div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem' }}>
            // click any file to inspect
          </p>
        </motion.div>

        {/* IDE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'grid', gridTemplateColumns: '240px 1fr',
            background: 'rgba(13,17,23,0.95)',
            border: '1px solid rgba(48,54,61,0.8)',
            borderRadius: '12px', overflow: 'hidden', minHeight: '520px',
          }}
        >
          {/* Sidebar */}
          <div style={{ borderRight: '1px solid rgba(48,54,61,0.8)', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              padding: '0.75rem 1rem', borderBottom: '1px solid rgba(48,54,61,0.6)',
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
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0.5rem 1rem', color: '#ffd700',
                fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '1px',
              }}>
                <span style={{ fontSize: '0.6rem' }}>▶</span>
                <span>🏆 HNG INTERNSHIP</span>
              </div>
              {hngProjects.map(p => (
                <FileRow key={p.id} project={p} isActive={active.id === p.id} onClick={setActive} />
              ))}
            </div>
          </div>

          {/* Main panel */}
          <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              borderBottom: '1px solid rgba(48,54,61,0.6)',
              display: 'flex', alignItems: 'center', minHeight: '40px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '0 1rem', borderRight: '1px solid rgba(48,54,61,0.6)',
                height: '40px', background: 'rgba(22,27,34,0.6)', flexShrink: 0,
              }}>
                <FileIcon type={active.type} />
                <span style={{ color: '#e6edf3', fontSize: '0.78rem', fontFamily: 'monospace' }}>{active.filename}</span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: active.color, marginLeft: '4px' }} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  flex: 1, overflowY: 'auto', padding: '1.75rem 2rem',
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }}
              >
                {/* header */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.35)',
                      color: '#ffd700', fontSize: '0.65rem', fontWeight: 700,
                      padding: '2px 10px', borderRadius: '100px', letterSpacing: '1px',
                    }}>🏆 HNG</span>
                    <span style={{
                      background: `${status.color}15`, border: `1px solid ${status.color}35`,
                      color: status.color, fontSize: '0.65rem', fontWeight: 700,
                      padding: '2px 10px', borderRadius: '100px', letterSpacing: '1px',
                    }}>{status.label}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#e6edf3', margin: '0 0 4px', fontFamily: 'inherit' }}>
                    {active.title}
                  </h3>
                  <p style={{ color: '#8b949e', fontSize: '0.8rem', margin: 0 }}>{active.subtitle}</p>
                </div>

                {/* contribution */}
                <div style={{
                  background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)',
                  borderRadius: '8px', padding: '0.85rem 1.1rem', marginBottom: '1.5rem',
                  display: 'flex', gap: '10px', alignItems: 'flex-start',
                }}>
                  <span style={{ color: '#ffd700', fontSize: '0.72rem', flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>// my contribution</span>
                  <span style={{ color: '#cdd9e5', fontSize: '0.8rem', lineHeight: 1.7 }}>{active.contribution}</span>
                </div>

                {/* description */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(48,54,61,0.6)',
                  borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.25rem',
                }}>
                  <div style={{ color: '#8b949e', fontSize: '0.72rem', marginBottom: '0.4rem' }}>{'/**'}</div>
                  <div style={{ color: '#8b949e', fontSize: '0.82rem', lineHeight: 1.8, paddingLeft: '0.5rem' }}>
                    {'* '}<span style={{ color: '#cdd9e5' }}>{active.description}</span>
                  </div>
                  <div style={{ color: '#8b949e', fontSize: '0.72rem', marginTop: '0.4rem' }}>{' */'}</div>
                </div>

                {/* problem + arch */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  {[
                    { label: 'problem', color: '#ff7b72', value: active.problem },
                    { label: 'architecture', color: '#79c0ff', value: active.architecture },
                  ].map(item => (
                    <div key={item.label} style={{
                      background: 'rgba(22,27,34,0.6)', border: '1px solid rgba(48,54,61,0.6)',
                      borderRadius: '8px', padding: '0.9rem',
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ color: '#79c0ff', fontSize: '0.72rem' }}>const </span>
                        <span style={{ color: item.color, fontSize: '0.72rem', fontWeight: 700 }}>{item.label}</span>
                        <span style={{ color: '#8b949e', fontSize: '0.72rem' }}> = `</span>
                      </div>
                      <p style={{ color: '#8b949e', fontSize: '0.77rem', lineHeight: 1.75, margin: '0 0 0.4rem', paddingLeft: '0.5rem' }}>{item.value}</p>
                      <span style={{ color: '#8b949e', fontSize: '0.72rem' }}>`</span>
                    </div>
                  ))}
                </div>

                {/* features */}
                <div style={{
                  background: 'rgba(22,27,34,0.6)', border: '1px solid rgba(48,54,61,0.6)',
                  borderRadius: '8px', padding: '0.9rem 1.1rem', marginBottom: '1.25rem',
                }}>
                  <div style={{ marginBottom: '0.6rem' }}>
                    <span style={{ color: '#d2a8ff', fontSize: '0.72rem' }}>const </span>
                    <span style={{ color: '#7ee787', fontSize: '0.72rem', fontWeight: 700 }}>features</span>
                    <span style={{ color: '#8b949e', fontSize: '0.72rem' }}> = {'{'}</span>
                  </div>
                  {active.features.map((f, i) => (
                    <div key={f.key} style={{ display: 'flex', gap: '8px', paddingLeft: '1rem', marginBottom: '0.3rem' }}>
                      <span style={{ color: '#ffa657', fontSize: '0.72rem', flexShrink: 0 }}>{f.key}:</span>
                      <span style={{ color: '#a5d6ff', fontSize: '0.72rem' }}>"{f.value}"</span>
                      {i < active.features.length - 1 && <span style={{ color: '#8b949e', fontSize: '0.72rem' }}>,</span>}
                    </div>
                  ))}
                  <div style={{ marginTop: '0.4rem' }}>
                    <span style={{ color: '#8b949e', fontSize: '0.72rem' }}>{'}'}</span>
                  </div>
                </div>

                {/* tech */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ color: '#8b949e', fontSize: '0.72rem', fontFamily: 'monospace', display: 'block', marginBottom: '0.6rem' }}>// tech stack</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {active.tech.map(t => (
                      <span key={t} style={{
                        background: `${active.color}10`, border: `1px solid ${active.color}30`,
                        color: active.color, padding: '2px 10px', borderRadius: '100px',
                        fontSize: '0.68rem', fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href={active.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#cdd9e5', padding: '0.5rem 1rem', borderRadius: '8px',
                      textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    View Code
                  </a>
                  {active.liveUrl && (
                    <a href={active.liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: `${active.color}18`, border: `1px solid ${active.color}40`,
                        color: active.color, padding: '0.5rem 1rem', borderRadius: '8px',
                        textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, transition: 'all 0.2s',
                      }}
                    >↗ Live Demo</a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Deep Dive */}
        <DeepDive inView={inView} />

      </div>
    </section>
  )
}