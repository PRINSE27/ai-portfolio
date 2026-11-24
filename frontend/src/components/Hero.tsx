import { useEffect, useState } from 'react'
import './Hero.css'

const ROLES = [
  'Full-Stack Developer',
  'AI / ML Engineer',
  'Generative AI Builder',
  'C++ Problem Solver',
]

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = ROLES[roleIndex]
    const finishedTyping = !deleting && text === word
    const finishedDeleting = deleting && text === ''

    let delay = deleting ? 40 : 90
    if (finishedTyping) delay = 1500
    if (finishedDeleting) delay = 300

    const timer = setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true)
      } else if (finishedDeleting) {
        setDeleting(false)
        setRoleIndex((roleIndex + 1) % ROLES.length)
      } else {
        const nextLength = text.length + (deleting ? -1 : 1)
        setText(word.slice(0, nextLength))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, roleIndex])

  return (
    <section className="hero" id="top">
      <span className="tag">
        <i className="dot"></i>Open to Software Engineer roles
      </span>
      <h1>
        Prince
        <br />
        <span className="gradient">Kumar</span>
      </h1>
      <p className="typing">{text}</p>
      <div className="cta">
        <a className="btn primary" href="#lab">Try my AI Lab ✨</a>
        <a className="btn" href="#work">See my work</a>
      </div>
    </section>
  )
}

export default Hero