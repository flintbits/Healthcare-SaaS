import { useLocation } from '@tanstack/react-router'
import { gsap } from 'gsap'
import { type ReactNode, useLayoutEffect, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useLayoutEffect(() => {
    const element = pageRef.current
    if (!element) return

    const animation = gsap.timeline()
    animation.fromTo(
      element,
      { autoAlpha: 0, y: 18 },
      { duration: 0.55, autoAlpha: 1, y: 0, ease: 'power3.out' }
    )

    return () => {
      gsap.to(element, { duration: 0.28, autoAlpha: 0, y: -12, ease: 'power3.in' })
    }
  }, [location.pathname])

  return (
    <div ref={pageRef} className="page-transition">
      {children}
    </div>
  )
}
