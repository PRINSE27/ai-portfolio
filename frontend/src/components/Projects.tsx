import { PROJECTS } from '../data/projects'
import { useInView } from '../hooks/useInView'
import ProjectCard from './ProjectCard'
import './Projects.css'

function Projects() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      id="work"
      ref={ref}
      className={`projects reveal ${inView ? 'show' : ''}`}
    >
      <h2>
        Selected <span className="gradient">work</span>
      </h2>
      <p className="sub">Hover over a card, then click to open the code.</p>

      <div className="grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            number={index + 1}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects