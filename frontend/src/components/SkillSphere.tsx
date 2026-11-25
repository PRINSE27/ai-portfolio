import { useEffect, useRef } from 'react'
import { SKILLS } from '../data/skills'
import './SkillSphere.css'

type Point = { word: string; x: number; y: number; z: number }

function makePoints(): Point[] {
  return SKILLS.map((word, i) => {
    const y = 1 - ((i + 0.5) / SKILLS.length) * 2
    const radius = Math.sqrt(1 - y * y)
    const angle = i * 2.39996
    return {
      word,
      x: Math.cos(angle) * radius,
      y,
      z: Math.sin(angle) * radius,
    }
  })
}

function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const points = makePoints()
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const drift = calm ? 0 : 0.0001

    let width = 0
    let height = 0
    let angleX = 0
    let angleY = 0
    let speedX = calm ? 0 : 0.003
    let speedY = calm ? 0 : 0.004
    let dragging = false
    let lastX = 0
    let lastY = 0
    let frame = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }

    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      speedY = (e.clientX - lastX) * 0.0006
      speedX = (e.clientY - lastY) * 0.0006
      lastX = e.clientX
      lastY = e.clientY
    }

    const onUp = () => {
      dragging = false
    }

    const draw = () => {
      angleX += speedX
      angleY += speedY
      speedX *= 0.985
      speedY = speedY * 0.985 + drift

      const styles = getComputedStyle(document.documentElement)
      const colorFront = styles.getPropertyValue('--b').trim()
      const colorBack = styles.getPropertyValue('--a').trim()

      const sinA = Math.sin(angleX)
      const cosA = Math.cos(angleX)
      const sinB = Math.sin(angleY)
      const cosB = Math.cos(angleY)

      const rotated = points
        .map((p) => {
          const y1 = p.y * cosA - p.z * sinA
          const z1 = p.y * sinA + p.z * cosA
          const x2 = p.x * cosB + z1 * sinB
          const z2 = -p.x * sinB + z1 * cosB
          return { word: p.word, x: x2, y: y1, z: z2 }
        })
        .sort((a, b) => a.z - b.z)

      ctx.clearRect(0, 0, width, height)
      ctx.textAlign = 'center'
      const radius = Math.min(width, height) * 0.42

      for (const p of rotated) {
        const depth = (p.z + 1) / 2
        ctx.globalAlpha = 0.25 + depth * 0.75
        ctx.fillStyle = p.z > 0.3 ? colorFront : colorBack
        ctx.font = `700 ${13 + depth * 13}px system-ui`
        ctx.fillText(
          p.word,
          width / 2 + p.x * radius * 1.5,
          height / 2 + p.y * radius,
        )
      }
      ctx.globalAlpha = 1

      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="sphere"
      aria-label="Interactive 3D cloud of my skills. Drag to rotate."
    />
  )
}

export default SkillSphere