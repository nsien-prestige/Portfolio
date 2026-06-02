import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const experiences = [
  {
    id: 1,
    org: 'AltSchool Africa',
    role: 'Backend Engineering Student',
    period: 'March 2025 — March 2026',
    duration: '1 year',
    type: 'Education',
    color: '#00f5a0',
    accent: '#00d9f5',
    url: 'https://altschoolafrica.com',
    summary: 'Trained in backend engineering through an intensive, project-based program focused on building real-world applications and understanding scalable systems.',
    highlights: [
      {
        project: 'Eventful',
        text: 'Built a full-stack event ticketing and management platform that streamlined event creation, ticket checkout, and attendee workflows — replacing manual coordination with a scalable digital system.',
        tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis'],
      },
      {
        project: 'REST API Design',
        text: 'Designed modular REST APIs using Node.js, TypeScript, and Express. Integrated Redis caching to improve response performance and support long-term scalability across backend services.',
        tech: ['Node.js', 'Express', 'TypeScript', 'Redis'],
      },
      {
        project: 'Guessing Game',
        text: 'Developed a real-time multiplayer game system using WebSockets and Socket.IO — implementing low-latency bidirectional communication, event-driven game logic, timers, scoring, and concurrent user handling.',
        tech: ['Socket.IO', 'Node.js', 'MongoDB'],
      },
      {
        project: 'Chat Ordering Platform',
        text: 'Built a chat-based food ordering platform using NestJS and TypeScript with modular APIs, session-driven workflows, and payment verification flows to improve user accessibility and transaction handling.',
        tech: ['NestJS', 'TypeScript'],
      },
      {
        project: 'Auth & Access Control',
        text: 'Designed backend systems supporting authentication, access control, relational data modeling, and payment integrations — strengthening experience with production-style application architecture.',
        tech: ['JWT', 'PostgreSQL', 'RBAC'],
      },
      {
        project: 'Content Publishing API',
        text: 'Developed a content publishing backend with role-based access controls and reusable RESTful API structures for both protected and public content operations.',
        tech: ['Node.js', 'Express', 'MongoDB'],
      },
    ],
    takeaway: 'Left the program with a solid foundation in backend development, hands-on project experience, and a much stronger ability to learn and adapt quickly. Beyond technical skills, developed a real understanding of how the tech world works — collaboration, communication, and the importance of putting yourself out there.',
  },
]

const upcoming = {
  org: 'HNG Internship',
  role: 'Backend Engineering Intern',
  period: 'April 2026 — Present',
  color: '#ffa657',
  status: 'ongoing',
}

export default function Experience() {
  const [ref, inView] = useInView(0.1)

  return (
    <section
      id="experience"
      ref={ref}
      style={{ padding: '8rem 1.5rem', position: 'relative', background: 'rgba(13,17,23,0.4)' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ color: '#00f5a0', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>$</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>cat ./experience.json</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          </div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem' }}>
            // where I've been and what I built there
          </p>
        </motion.div>

        {/* timeline */}
        <div style={{ position: 'relative' }}>

          {/* vertical line */}
          <div style={{
            position: 'absolute',
            left: '11px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'linear-gradient(180deg, #00f5a0, rgba(48,54,61,0.4))',
          }} />

          {/* AltSchool entry */}
          {experiences.map((exp, ei) => {
            const [cardRef, cardInView] = [null, true]
            return (
              <ExperienceCard key={exp.id} exp={exp} index={ei} globalInView={inView} />
            )
          })}

          {/* HNG — coming soon */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '3rem', paddingLeft: '2.5rem', position: 'relative' }}
          >
            {/* dot */}
            <div style={{
              position: 'absolute', left: '4px', top: '8px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#ffa657',
              boxShadow: '0 0 12px #ffa65780',
              animation: 'hng-pulse 2s infinite',
              flexShrink: 0,
            }} />
            <style>{`@keyframes hng-pulse { 0%,100%{box-shadow:0 0 8px #ffa65770} 50%{box-shadow:0 0 20px #ffa657cc} }`}</style>

            <div style={{
              background: 'rgba(255,166,87,0.05)',
              border: '1px dashed rgba(255,166,87,0.25)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#ffa657', fontSize: '0.95rem', fontWeight: 800 }}>HNG Internship</span>
                  <span style={{
                    background: 'rgba(255,166,87,0.15)',
                    border: '1px solid rgba(255,166,87,0.3)',
                    color: '#ffa657',
                    fontSize: '0.62rem', fontWeight: 700,
                    padding: '2px 8px', borderRadius: '100px',
                    letterSpacing: '1px',
                  }}>ONGOING</span>
                </div>
                <p style={{ color: '#8b949e', fontSize: '0.82rem', fontFamily: 'monospace', margin: 0 }}>
                  Backend Engineering Intern · April 2026 — Present
                </p>
              </div>
              <span style={{ color: '#475569', fontSize: '0.78rem', fontFamily: 'monospace' }}>
                // more coming soon
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ exp, index, globalInView }) {
  const [ref, inView] = useInView(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={globalInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', paddingLeft: '2.5rem', position: 'relative' }}
    >
      {/* timeline dot */}
      <div style={{
        position: 'absolute', left: '4px', top: '8px',
        width: '16px', height: '16px', borderRadius: '50%',
        background: exp.color,
        boxShadow: `0 0 12px ${exp.color}80`,
        flexShrink: 0,
        zIndex: 1,
      }} />

      {/* card */}
      <div style={{
        background: 'rgba(13,17,23,0.9)',
        border: `1px solid rgba(48,54,61,0.8)`,
        borderRadius: '14px',
        overflow: 'hidden',
        width: '100%',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}>

        {/* card header */}
        <div style={{
          background: 'rgba(22,27,34,0.8)',
          borderBottom: '1px solid rgba(48,54,61,0.6)',
          padding: '1.25rem 1.75rem',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}35`,
                color: exp.color,
                fontSize: '0.65rem', fontWeight: 700,
                padding: '2px 10px', borderRadius: '100px',
                letterSpacing: '1px',
              }}>{exp.type.toUpperCase()}</span>
              <span style={{
                background: 'rgba(126,231,135,0.1)',
                border: '1px solid rgba(126,231,135,0.25)',
                color: '#7ee787',
                fontSize: '0.65rem', fontWeight: 700,
                padding: '2px 10px', borderRadius: '100px',
                letterSpacing: '1px',
              }}>COMPLETED</span>
            </div>
            <h3 style={{ color: '#e6edf3', fontSize: '1.2rem', fontWeight: 900, margin: '0 0 4px', fontFamily: 'inherit' }}>
              {exp.org}
            </h3>
            <p style={{ color: exp.accent, fontSize: '0.85rem', margin: '0 0 2px', fontWeight: 600 }}>{exp.role}</p>
            <p style={{ color: '#8b949e', fontSize: '0.78rem', margin: 0 }}>{exp.period} · {exp.duration}</p>
          </div>
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#475569', fontSize: '0.75rem',
              textDecoration: 'none', fontFamily: 'monospace',
              display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = exp.color}
            onMouseLeave={e => e.currentTarget.style.color = '#475569'}
          >
            {exp.url.replace('https://', '')} ↗
          </a>
        </div>

        {/* summary */}
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid rgba(48,54,61,0.4)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: '#8b949e', fontSize: '0.78rem', flexShrink: 0 }}>{'/**'}</span>
          </div>
          <p style={{ color: '#cdd9e5', fontSize: '0.85rem', lineHeight: 1.8, margin: '4px 0', paddingLeft: '1rem' }}>
            {'* '}{exp.summary}
          </p>
          <span style={{ color: '#8b949e', fontSize: '0.78rem' }}>{' */'}</span>
        </div>

        {/* highlights */}
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid rgba(48,54,61,0.4)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: '#d2a8ff', fontSize: '0.78rem' }}>const </span>
            <span style={{ color: '#7ee787', fontSize: '0.78rem', fontWeight: 700 }}>highlights</span>
            <span style={{ color: '#8b949e', fontSize: '0.78rem' }}> = [</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem' }}>
            {exp.highlights.map((h, i) => (
              <motion.div
                key={h.project}
                initial={{ opacity: 0, x: -8 }}
                animate={globalInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                style={{
                  background: 'rgba(22,27,34,0.6)',
                  border: '1px solid rgba(48,54,61,0.5)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#ffa657', fontSize: '0.75rem', fontWeight: 700 }}>{h.project}</span>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {h.tech.map(t => (
                      <span key={t} style={{
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}25`,
                        color: exp.color,
                        fontSize: '0.62rem', fontWeight: 600,
                        padding: '1px 7px', borderRadius: '100px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
                <p style={{ color: '#8b949e', fontSize: '0.8rem', lineHeight: 1.75, margin: 0 }}>
                  <span style={{ color: exp.color, marginRight: '6px' }}>→</span>{h.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <span style={{ color: '#8b949e', fontSize: '0.78rem' }}>]</span>
          </div>
        </div>

        {/* takeaway */}
        <div style={{ padding: '1.25rem 1.75rem' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: exp.accent, fontSize: '0.75rem', flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>// takeaway</span>
            <p style={{ color: '#8b949e', fontSize: '0.82rem', lineHeight: 1.8, margin: 0 }}>{exp.takeaway}</p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}