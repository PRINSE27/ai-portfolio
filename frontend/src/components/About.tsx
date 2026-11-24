import { useInView } from '../hooks/useInView'
import Counter from './Counter'
import './About.css'

const STATS = [
  { value: 150, label: 'LeetCode problems targeted' },
  { value: 19, label: 'Technologies' },
  { value: 3, label: 'Featured projects' },
  { value: 2027, label: 'Graduating' },
]

function About() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      id="about"
      ref={ref}
      className={`about reveal ${inView ? 'show' : ''}`}
    >
      <h2>
        Engineer. <span className="gradient">Designer. Builder.</span>
      </h2>
      <p className="sub">
        B.Tech CSE at IIIT Tiruchirappalli. I turn ideas into real products,
        from pixel-level UI to the ML behind them.
      </p>

      <div className="stats">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <b>
              <Counter to={stat.value} start={inView} />
            </b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About