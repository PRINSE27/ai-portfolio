import { SKILLS } from '../data/skills'
import './Marquee.css'

function Marquee() {
  const items = [...SKILLS, ...SKILLS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {items.map((skill, index) => (
          <span key={index}>◆ {skill}</span>
        ))}
      </div>
    </div>
  )
}

export default Marquee