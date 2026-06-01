import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return

    const dot = dotRef.current
    const circle = circleRef.current
    if (!dot || !circle) return

    const onMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      dot.style.translate = `${x - 4}px ${y - 4}px`
      circle.style.translate = `${x - 14}px ${y - 14}px`
    }

    // Disable smooth transitions during movement
    circle.style.transition = "none"
    dot.style.transition = "none"

    document.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <div className="pointer-events-none z-[9999] hidden lg:block" aria-hidden>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.85)]"
        style={{ willChange: "translate" }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 z-[9998] h-7 w-7 rounded-full border border-primary/50 bg-primary/8 shadow-[0_0_16px_hsl(var(--primary)/0.2)]"
        style={{ willChange: "translate" }}
      />
    </div>
  )
}
