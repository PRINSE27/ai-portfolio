import { useEffect, useState } from 'react'

type CounterProps = {
  to: number
  start: boolean
}

function Counter({ to, start }: CounterProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const duration = 1200
    const startTime = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(Math.round(to * progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, to])

  return <>{value}</>
}

export default Counter