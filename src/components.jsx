import { useEffect, useRef, useState } from 'react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Dinesh Babu Thevar, home">Dinesh Babu Thevar<span>.</span></a>
      <button
        className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
      <nav className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
        {navItems.map((item, index) => (
          <a
            className={activeSection === item.id ? 'nav-link is-active' : 'nav-link'}
            href={`#${item.id}`}
            key={item.id}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-index">0{index + 1}</span>{item.label}
          </a>
        ))}
      </nav>
      <a className="header-note" href="#contact"><span className="status-light" />Currently studying <span className="note-arrow">↘</span></a>
    </header>
  )
}

export function ResumeActions({ className = '' }) {
  return (
    <div className={`resume-actions ${className}`}>
      <a className="resume-button resume-button-view" href="/resume.pdf" target="_blank" rel="noreferrer">
        View Resume <span aria-hidden="true">↗</span>
      </a>
      <a className="resume-button resume-button-download" href="/resume.pdf" download="Dinesh-Babu-Thevar-Resume.pdf">
        Download Resume <span aria-hidden="true">↓</span>
      </a>
    </div>
  )
}

export function CursorEffects() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return undefined

    let frame = 0
    let pointerX = -100
    let pointerY = -100
    let ringX = pointerX
    let ringY = pointerY

    const move = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
      }
      document.body.classList.add('cursor-visible')
      if (!frame) frame = window.requestAnimationFrame(trail)
    }

    const trail = () => {
      ringX += (pointerX - ringX) * 0.16
      ringY += (pointerY - ringY) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      if (Math.abs(pointerX - ringX) + Math.abs(pointerY - ringY) > 0.2) {
        frame = window.requestAnimationFrame(trail)
      } else {
        frame = 0
      }
    }

    const setHover = (event) => {
      document.body.classList.toggle('cursor-hover', Boolean(event.target.closest('a, button, [data-cursor]')))
    }
    const hide = () => document.body.classList.remove('cursor-visible', 'cursor-hover')

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', setHover)
    document.addEventListener('pointerout', setHover)
    document.addEventListener('pointerleave', hide)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', setHover)
      document.removeEventListener('pointerout', setHover)
      document.removeEventListener('pointerleave', hide)
      if (frame) window.cancelAnimationFrame(frame)
      document.body.classList.remove('cursor-visible', 'cursor-hover')
    }
  }, [])

  return (
    <>
      <span className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <span className="cursor-trail" ref={ringRef} aria-hidden="true" />
    </>
  )
}

export function ScrollReveal({ children, className = '', as: Element = 'div', delay = 0 }) {
  const revealRef = useRef(null)

  useEffect(() => {
    const node = revealRef.current
    if (!node || typeof window.IntersectionObserver !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let observer
    try {
      observer = new window.IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-revealed')
          node.classList.remove('reveal-pending')
          observer.unobserve(node)
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
      node.classList.add('reveal-pending')
      observer.observe(node)
    } catch {
      node.classList.remove('reveal-pending')
      return undefined
    }
    return () => {
      observer.disconnect()
      node.classList.remove('reveal-pending')
    }
  }, [])

  return <Element className={`reveal ${className}`} ref={revealRef} style={{ '--reveal-delay': `${delay}ms` }}>{children}</Element>
}

export function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  const tilt = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    cardRef.current.style.setProperty('--tilt-x', `${(0.5 - y) * 3}deg`)
    cardRef.current.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`)
    cardRef.current.style.setProperty('--pointer-x', `${x * 100}%`)
    cardRef.current.style.setProperty('--pointer-y', `${y * 100}%`)
  }

  const resetTilt = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--tilt-x', '0deg')
    cardRef.current.style.setProperty('--tilt-y', '0deg')
    cardRef.current.style.setProperty('--pointer-x', '50%')
    cardRef.current.style.setProperty('--pointer-y', '50%')
  }

  return (
    <a
      className={`project-card project-card-${project.visual}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name} in a new tab`}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
      ref={cardRef}
      style={{ '--card-index': index }}
    >
      <div className={`project-art art-${project.visual}`} aria-hidden="true">
        <div className="art-topline"><span>INDEPENDENT PROJECT</span><span>{project.label}</span></div>
        {project.visual === 'security' ? (
          <div className="security-scene">
            <span className="orbit orbit-one" /><span className="orbit orbit-two" />
            <span className="security-core">S<span>+</span></span>
            <span className="scene-tag tag-one">SIGNAL / 01</span><span className="scene-tag tag-two">SYSTEM ONLINE</span>
          </div>
        ) : (
          <div className="planner-scene">
            <div className="planner-window"><div className="planner-window-head"><span>STUDY PLAN</span><span>↗</span></div><div className="planner-date">A little progress,<br /><strong>every day.</strong></div><div className="planner-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="planner-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div>
            <span className="planner-stamp">PLAN<br />/ DO</span>
          </div>
        )}
        <span className="art-caption">{project.category}</span>
      </div>
      <div className="project-information">
        <div>
          <p className="project-number">SELECTED WORK / {project.number}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          {project.technologies.length > 0 && (
            <ul className="tech-list" aria-label="Technologies">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          )}
        </div>
        <span className="project-open" aria-hidden="true">↗</span>
      </div>
    </a>
  )
}

export function MagneticLink({ href, children, className = '', external = false }) {
  const linkRef = useRef(null)

  const move = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    linkRef.current.style.setProperty('--magnet-x', `${x * 0.08}px`)
    linkRef.current.style.setProperty('--magnet-y', `${y * 0.08}px`)
  }

  const reset = () => {
    if (!linkRef.current) return
    linkRef.current.style.setProperty('--magnet-x', '0px')
    linkRef.current.style.setProperty('--magnet-y', '0px')
  }

  return (
    <a
      className={`magnetic-link ${className}`}
      href={href}
      ref={linkRef}
      onPointerMove={move}
      onPointerLeave={reset}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

export function Footer({ githubUrl }) {
  return (
    <footer className="site-footer">
      <a href="#home" className="footer-mark" aria-label="Back to top">Dinesh Babu Thevar<span>.</span></a>
      <p>AI & ML Student · Developer · UI/UX Designer</p>
      <a href={githubUrl} target="_blank" rel="noreferrer">GITHUB <span>↗</span></a>
      <span className="footer-year">© 2026</span>
    </footer>
  )
}
