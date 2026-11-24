import { useEffect, useState } from 'react'
import './Navbar.css'

type Theme = 'light' | 'dark'

function getStartTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function Navbar() {
  const [theme, setTheme] = useState<Theme>(getStartTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <nav className="navbar">
      <a href="#top" className="logo">PK.</a>
      <div className="links">
        <a href="#work">Work</a>
        <a href="#lab">AI Lab</a>
        <a href="#contact">Contact</a>
        <button
          className="theme-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          ◐
        </button>
      </div>
    </nav>
  )
}

export default Navbar