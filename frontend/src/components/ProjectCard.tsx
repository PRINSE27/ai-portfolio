import { useRef } from 'react'
import type { PointerEvent } from 'react'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  number: number
}

function ProjectCard({ project, number }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const card = ref.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    card.style.transform = `perspective(700px) rotateY(${(px - 0.5) * 14}deg) rotateX(${(0.5 - py) * 14}deg) scale(1.03)`
    card.style.setProperty('--mx', `${px * 100}%`)
    card.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      className="card"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <span className="card-number">{String(number).padStart(2, '0')}</span>
      <small>{project.kind}</small>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <small>{project.tech.join(' · ')}</small>
    </a>
  )
}

export default ProjectCard