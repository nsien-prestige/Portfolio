import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const reflections = [
  {
    id: 1,
    type: 'challenge',
    color: '#ff7b72',
    token: 'throw',
    label: 'Biggest Challenge',
    title: 'The PKCE Flow & Scalable Systems',
    body: `I had never implemented GitHub OAuth2 before. The PKCE flow alone took me deep into the night — understanding that GitHub sends back a code, not a token, and that I have to exchange that code for the actual access token on the backend. It genuinely didn't make sense to me at first. I remember arguing with my AI model that the flow was wrong. It wasn't.

On top of that, I had zero knowledge of system design going in. I didn't know what horizontal or vertical scaling meant. Learning that the architectural decisions you make today will either save you or haunt you six months from now — that was a real shift in how I think about code.`,
  },
  {
    id: 2,
    type: 'growth',
    color: '#00f5a0',
    token: 'return',
    label: 'Biggest Realisation',
    title: 'Being a Software Engineer ≠ Being a Programmer',
    body: `I left AltSchool Africa thinking I had what it takes to get a job. HNG showed me how much I didn't know — and that's the most valuable thing it gave me.

A real software engineer doesn't just write code that works. They make decisions that affect the product months down the line. Code quality matters. Modular structure isn't optional — it's what makes a system debuggable at 2am when something breaks in production. I came in thinking about features. I'm leaving thinking about systems.`,
  },
  {
    id: 3,
    type: 'surprise',
    color: '#ffa657',
    token: 'catch',
    label: 'What Surprised Me',
    title: 'An Online Internship Can Still Stress You Out',
    body: `I genuinely did not expect an online internship to hit this hard. The pressure was real — deadlines, submissions, the constant feeling that you need to be doing more.

I was also surprised by the sheer number of people who applied. Seeing that volume made it click: the industry is competitive. Showing up halfway is not an option. If I could go back and start HNG over, I would go in at full power from day one — no easing in, no "let me get comfortable first."`,
  },
  {
    id: 4,
    type: 'next',
    color: '#79c0ff',
    token: 'finally',
    label: 'What I\'m Still Working On',
    title: 'Scalable Systems & Deeper Code Understanding',
    body: `I know I still have gaps. My understanding of how to build truly scalable systems — not just systems that work, but systems that can grow — is something I'm actively working on. System design is a deep rabbit hole and I've only just started going down it.

I also want to get better at reading and reasoning about code at a deeper level. Not just making it work, but understanding exactly why it works — and why it might not, under different conditions.`,
  },
]

export default function Reflection() {
  const [ref, inView] = useInView(0.1)

  return (
    <section
      id="reflection"
      ref={ref}
      style={{ padding: '8rem 1.5rem', position: 'relative' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>node reflection.js</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          </div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem' }}>
            // HNG internship — honest account of what happened
          </p>

          {/* intro block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginTop: '2.5rem',
              background: 'rgba(13,17,23,0.9)',
              border: '1px solid rgba(48,54,61,0.8)',
              borderRadius: '12px',
              padding: '1.5rem 2rem',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          >
            <div style={{ fontSize: '0.8rem', lineHeight: 2.1 }}>
              <span style={{ color: '#8b949e' }}>{'// '}</span>
              <span style={{ color: '#8b949e' }}>HNG Internship · Stage 7b · Backend Engineering</span>
              <br />
              <span style={{ color: '#d2a8ff' }}>function </span>
              <span style={{ color: '#79c0ff' }}>reflect</span>
              <span style={{ color: '#e6edf3' }}>(</span>
              <span style={{ color: '#ffa657' }}>internship</span>
              <span style={{ color: '#e6edf3' }}>) {'{'}</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'  '}</span>
              <span style={{ color: '#8b949e' }}>// not a highlight reel. just the truth.</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'  '}</span>
              <span style={{ color: '#79c0ff' }}>return </span>
              <span style={{ color: '#a5d6ff' }}>"what I actually learned, struggled with, and still need to fix"</span>
              <span style={{ color: '#e6edf3' }}>;</span>
              <br />
              <span style={{ color: '#e6edf3' }}>{'}'}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* reflection cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reflections.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              style={{
                background: 'rgba(13,17,23,0.9)',
                border: `1px solid rgba(48,54,61,0.8)`,
                borderRadius: '12px',
                overflow: 'hidden',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                transition: 'border-color 0.3s',
              }}
              whileHover={{ borderColor: `${r.color}35` }}
            >
              {/* card top bar */}
              <div style={{
                background: 'rgba(22,27,34,0.8)',
                borderBottom: '1px solid rgba(48,54,61,0.5)',
                padding: '0.85rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{
                  color: r.color,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: `${r.color}12`,
                  border: `1px solid ${r.color}30`,
                  padding: '2px 10px',
                  borderRadius: '100px',
                  letterSpacing: '1px',
                }}>{r.token}</span>
                <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>{'{'}</span>
                <span style={{ color: '#e6edf3', fontSize: '0.8rem', fontWeight: 700 }}>{r.label}</span>
                <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>{'}'}</span>
              </div>

              {/* card body */}
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <h4 style={{
                  color: r.color,
                  fontSize: '1rem',
                  fontWeight: 800,
                  margin: '0 0 1rem',
                  fontFamily: 'inherit',
                }}>
                  {r.title}
                </h4>
                {r.body.split('\n\n').map((para, pi) => (
                  <p key={pi} style={{
                    color: pi === 0 ? '#cdd9e5' : '#8b949e',
                    fontSize: '0.88rem',
                    lineHeight: 1.9,
                    margin: pi < r.body.split('\n\n').length - 1 ? '0 0 1rem' : '0',
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* closing line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            marginTop: '3rem',
            padding: '1.25rem 1.75rem',
            background: 'rgba(0,245,160,0.04)',
            border: '1px solid rgba(0,245,160,0.12)',
            borderRadius: '10px',
            fontFamily: "'JetBrains Mono', monospace",
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ color: '#00f5a0', fontSize: '0.8rem', flexShrink: 0, fontWeight: 700 }}>{'>'}</span>
          <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
            HNG didn't just test my code. It tested how I handle pressure, how fast I can learn something I've never seen before, and whether I can ship under a deadline that doesn't care about your comfort zone.{' '}
            <span style={{ color: '#00f5a0' }}>I'm a better engineer for it.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}