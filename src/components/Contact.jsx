import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const MAILER_URL = 'https://email-sender-wks9.onrender.com'

const links = [
  {
    label: 'GitHub',
    value: 'nsien-prestige',
    href: 'https://github.com/nsien-prestige',
    color: '#e6edf3',
    accent: '#8b949e',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'prestige-nsien',
    href: 'https://www.linkedin.com/in/prestige-nsien',
    color: '#79c0ff',
    accent: '#388bfd',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'prestigensien@gmail.com',
    href: 'mailto:prestigensien@gmail.com',
    color: '#ffa657',
    accent: '#e3b341',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+234 906 875 0609',
    href: 'https://wa.me/2349068750609',
    color: '#7ee787',
    accent: '#3fb950',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

const inputStyle = {
  width: '100%',
  background: 'rgba(13,17,23,0.8)',
  border: '1px solid rgba(48,54,61,0.8)',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: '#e6edf3',
  fontSize: '0.88rem',
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

export default function Contact() {
  const [ref, inView] = useInView(0.1)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [focused, setFocused] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    // clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors(err => ({ ...err, [e.target.name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'name is required'
    else if (form.name.trim().length < 2) newErrors.name = 'name is too short'

    if (!form.email.trim()) newErrors.email = 'email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'invalid email format'

    if (!form.message.trim()) newErrors.message = 'message is required'
    else if (form.message.trim().length < 10) newErrors.message = 'message is too short (min 10 chars)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch(`${MAILER_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setErrors({})
        setTimeout(() => setStatus(null), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(null), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  const isFormEmpty = !form.name || !form.email || !form.message

  return (
    <section
      id="contact"
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
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '1rem' }}>curl -X POST /contact</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
          </div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', fontFamily: 'monospace', marginLeft: '1.2rem' }}>
            // I actually read these. let's talk.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* left — form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              background: 'rgba(13,17,23,0.9)',
              border: '1px solid rgba(48,54,61,0.8)',
              borderRadius: '12px',
              overflow: 'hidden',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}>
              {/* fake file tab */}
              <div style={{
                background: 'rgba(22,27,34,0.9)',
                borderBottom: '1px solid rgba(48,54,61,0.6)',
                padding: '0.7rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <span style={{ color: '#8b949e', fontSize: '0.72rem', marginLeft: '6px' }}>message.json</span>
              </div>

              <div style={{ padding: '1.5rem' }}>

                {/* field: name */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#8b949e', fontSize: '0.72rem', display: 'block', marginBottom: '6px' }}>
                    <span style={{ color: '#79c0ff' }}>string</span> name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    style={{
                      ...inputStyle,
                      borderColor: errors.name
                        ? '#ff7b72'
                        : focused === 'name'
                        ? 'rgba(0,245,160,0.5)'
                        : 'rgba(48,54,61,0.8)',
                    }}
                  />
                  {errors.name && (
                    <span style={{ color: '#ff7b72', fontSize: '0.7rem', marginTop: '4px', display: 'block' }}>
                      // {errors.name}
                    </span>
                  )}
                </div>

                {/* field: email */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#8b949e', fontSize: '0.72rem', display: 'block', marginBottom: '6px' }}>
                    <span style={{ color: '#79c0ff' }}>string</span> email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    style={{
                      ...inputStyle,
                      borderColor: errors.email
                        ? '#ff7b72'
                        : focused === 'email'
                        ? 'rgba(0,245,160,0.5)'
                        : 'rgba(48,54,61,0.8)',
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: '#ff7b72', fontSize: '0.7rem', marginTop: '4px', display: 'block' }}>
                      // {errors.email}
                    </span>
                  )}
                </div>

                {/* field: message */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ color: '#8b949e', fontSize: '0.72rem', display: 'block', marginBottom: '6px' }}>
                    <span style={{ color: '#79c0ff' }}>string</span> message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="What's on your mind?"
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      borderColor: errors.message
                        ? '#ff7b72'
                        : focused === 'message'
                        ? 'rgba(0,245,160,0.5)'
                        : 'rgba(48,54,61,0.8)',
                    }}
                  />
                  {errors.message && (
                    <span style={{ color: '#ff7b72', fontSize: '0.7rem', marginTop: '4px', display: 'block' }}>
                      // {errors.message}
                    </span>
                  )}
                </div>

                {/* submit button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: '0 0 20px rgba(0,245,160,0.3)' } : {}}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    background: status === 'success'
                      ? 'linear-gradient(135deg, #7ee787, #3fb950)'
                      : status === 'error'
                      ? 'linear-gradient(135deg, #ff7b72, #f85149)'
                      : 'linear-gradient(135deg, #00f5a0, #00d9f5)',
                    color: '#020817',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {status === 'loading' && '// sending...'}
                  {status === 'success' && '✓ message sent!'}
                  {status === 'error' && '✕ failed — try again'}
                  {!status && '→ send message'}
                </motion.button>

                {/* status messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ color: '#7ee787', fontSize: '0.78rem', textAlign: 'center', marginTop: '0.75rem', fontFamily: 'monospace' }}
                    >
                      // got it! I'll get back to you soon.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ color: '#ff7b72', fontSize: '0.78rem', textAlign: 'center', marginTop: '0.75rem', fontFamily: 'monospace' }}
                    >
                      // something went wrong. try emailing directly.
                    </motion.p>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </motion.div>

          {/* right — links + info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* availability */}
            <div style={{
              background: 'rgba(0,245,160,0.05)',
              border: '1px solid rgba(0,245,160,0.15)',
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
              marginBottom: '2rem',
              fontFamily: 'monospace',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f5a0', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#00f5a0', fontSize: '0.8rem', fontWeight: 700 }}>available_for_hire</span>
                <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }`}</style>
              </div>
              <p style={{ color: '#8b949e', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
                Actively looking for backend engineering roles. Open to full-time positions, contracts, and interesting projects.
              </p>
            </div>

            {/* divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
              <span style={{ color: '#475569', fontSize: '0.72rem', fontFamily: 'monospace' }}>// or reach out directly</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(48,54,61,0.6)' }} />
            </div>

            {/* link cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  whileHover={{
                    x: 4,
                    borderColor: `${link.accent}50`,
                    boxShadow: `0 4px 20px ${link.accent}15`,
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: 'rgba(13,17,23,0.8)',
                    border: '1px solid rgba(48,54,61,0.7)',
                    borderRadius: '10px',
                    padding: '0.85rem 1.1rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px',
                    background: `${link.accent}12`,
                    border: `1px solid ${link.accent}25`,
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: link.color,
                    flexShrink: 0,
                  }}>
                    {link.icon}
                  </div>
                  <div>
                    <div style={{ color: '#8b949e', fontSize: '0.68rem', fontFamily: 'monospace', marginBottom: '2px' }}>{link.label}</div>
                    <div style={{ color: '#e6edf3', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'monospace' }}>{link.value}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: link.accent, fontSize: '0.8rem' }}>↗</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}