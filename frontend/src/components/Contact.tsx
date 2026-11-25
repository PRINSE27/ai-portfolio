import { useState } from 'react'
import type { FormEvent } from 'react'
import { useInView } from '../hooks/useInView'
import './Contact.css'

type Status = 'idle' | 'error' | 'sent'

function Contact() {
  const { ref, inView } = useInView<HTMLElement>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailOk = /^\S+@\S+\.\S+$/.test(email)
    if (!name.trim() || !emailOk || message.trim().length < 10) {
      setStatus('error')
      return
    }

    // Backend will receive this in a later step.
    setStatus('sent')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact reveal ${inView ? 'show' : ''}`}
    >
      <h2>
        Let’s build something <span className="gradient">unforgettable</span>
      </h2>
      <p className="sub">
        Open to Software Engineer roles. Send a message or find me online.
      </p>

      <div className="contact-links">
        <a href="mailto:sukheprince27@gmail.com">Email</a>
        <a href="https://github.com/PRINSE27" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/prince-kumar-06233a28b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Message
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button className="send" type="submit">Send message</button>

        {status === 'error' && (
          <p className="note error" role="alert">
            Please enter your name, a valid email, and a message of at least 10 characters.
          </p>
        )}
        {status === 'sent' && (
          <p className="note ok" role="status">
            The form works. Real sending will be connected in the backend step.
          </p>
        )}
      </form>
    </section>
  )
}

export default Contact