import { useEffect, useState } from 'react'
import { emailUrl, experienceAreas, githubUrl, linkedinUrl, projects, skillGroups } from './data'
import { CursorEffects, Footer, MagneticLink, Navigation, ProjectCard, ResumeActions, ScrollReveal } from './components'
import './portfolio.css'
const sectionIds = ['home', 'about', 'work', 'approach', 'contact']

export function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (typeof window.IntersectionObserver !== 'function') return undefined
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight
        const progress = range > 0 ? window.scrollY / range : 0
        document.documentElement.style.setProperty('--scroll-progress', String(progress * 100) + '%')
        frame = 0
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <CursorEffects />
      <div className="scroll-progress" aria-hidden="true" />
      <Navigation activeSection={activeSection} />
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content page-shell">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" />PORTFOLIO <span className="eyebrow-year">AI / CODE / DESIGN</span></p>
            <div className="hero-layout">
              <div className="hero-copy">
                <h1 id="hero-title" className="hero-title"><span>Dinesh Babu</span><span>Thevar<span className="hero-period">.</span></span></h1>
                <p className="hero-role">AI & ML Student <span>·</span> Developer <span>·</span> UI/UX Designer</p>
                <p className="hero-intro">I build thoughtful digital experiences and explore how AI can make useful tools feel intuitive.</p>
                <div className="hero-actions">
                  <a className="action-link action-primary" href="#work">View Projects <span aria-hidden="true">↘</span></a>
                  <ResumeActions className="hero-resume-actions" />
                  <a className="action-link action-secondary" href="#contact">Contact Me <span aria-hidden="true">↘</span></a>
                </div>
                <a className="scroll-cue" href="#about"><span className="scroll-cue-line" /><span>SCROLL TO EXPLORE</span><span className="scroll-cue-arrow">↓</span></a>
              </div>
              <aside className="hero-aside" aria-label="Education details">
                <div className="hero-visual" aria-hidden="true">
                  <span className="hero-visual-orbit orbit-a" />
                  <span className="hero-visual-orbit orbit-b" />
                  <span className="hero-visual-core">AI<span>×</span>UI</span>
                  <span className="hero-visual-label">SYSTEMS / PEOPLE / INTERFACES</span>
                </div>
                <dl className="hero-facts">
                  <div><dt>DEGREE</dt><dd>B.Tech · AI & ML</dd></div>
                  <div><dt>GRADUATION</dt><dd>2028</dd></div>
                  <div><dt>LATEST REPORTED CGPA</dt><dd>8.2</dd></div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="intro-section section-pad" id="about" aria-labelledby="about-title">
          <div className="page-shell">
            <div className="section-topline"><span className="section-kicker">01 / THE PERSON</span><span className="section-caption">A curious mind, still in motion</span></div>
            <div className="intro-layout">
              <ScrollReveal className="intro-heading-wrap"><h2 id="about-title" className="intro-heading">Curious about how it works. Careful about how it <em>feels.</em></h2></ScrollReveal>
              <ScrollReveal className="intro-copy" delay={120}>
                <p>I’m a B.Tech student in Artificial Intelligence & Machine Learning, graduating in 2028. My latest reported CGPA is <span className="text-light">8.2.</span></p>
                <p>I’m interested in AI/ML and data analysis, building with code, and shaping clear, considered interfaces in Figma.</p>
                <a className="text-link" href="#approach">Explore my skills and experience <span>↓</span></a>
              </ScrollReveal>
            </div>
            <div className="intro-footnote"><span>AI / DEVELOPMENT / DESIGN</span><span>LEARNING BY MAKING</span></div>
          </div>
        </section>

        <section className="work-section section-pad" id="work" aria-labelledby="work-title">
          <div className="page-shell">
            <div className="section-topline"><span className="section-kicker">02 / SELECTED WORK</span><span className="section-caption">A few things made along the way</span></div>
            <div className="work-heading-row"><ScrollReveal><h2 id="work-title" className="section-heading">Selected<br /><em>projects.</em></h2></ScrollReveal><p className="work-aside">Independent work, shared as it is.<br />Select a project to visit the live site.</p></div>
            <div className="projects-grid">{projects.map((project, index) => <ScrollReveal className="project-reveal" key={project.number} delay={index * 100}><ProjectCard project={project} index={index} /></ScrollReveal>)}</div>
            <p className="projects-footnote"><span>01—02</span><span>SELECTED EXPERIMENTS / 2026</span><span>↗ OPEN PROJECT</span></p>
          </div>
        </section>

        <section className="practice-section section-pad" id="approach" aria-labelledby="practice-title">
          <div className="page-shell">
            <div className="section-topline"><span className="section-kicker">03 / TOOLS & PRACTICE</span><span className="section-caption">A toolkit, always in progress</span></div>
            <div className="practice-heading-row"><ScrollReveal><h2 id="practice-title" className="section-heading">Learn deeply.<br /><em>Make thoughtfully.</em></h2></ScrollReveal><p className="practice-note">I like learning by making: following an idea from the first sketch to a working, considered result.</p></div>
            <div className="skills-grid">
              {skillGroups.map((group, index) => <ScrollReveal className="skill-group" key={group.title} delay={index * 80}><div className="skill-heading"><span>0{index + 1}</span><h3>{group.title}</h3><span className="skill-plus">+</span></div><ul>{group.items.map((skill, skillIndex) => <li key={skill} style={{ '--skill-index': skillIndex }}><span>{skill}</span><span className="skill-arrow">↗</span></li>)}</ul></ScrollReveal>)}
            </div>
            <div className="experience-block">
              <div className="experience-heading"><span className="section-kicker">EXPERIENCE & ACTIVITIES</span><p>Learning through study,<br />work, and collaboration.</p><small>Specific organizations and dates have not been provided.</small></div>
              <div className="experience-list">{experienceAreas.map((area, index) => <ScrollReveal className="experience-row" key={area.title} delay={index * 45}><span className="experience-index">0{index + 1}</span><h3>{area.title}</h3><p>{area.context}</p></ScrollReveal>)}</div>
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-grid" aria-hidden="true" />
          <div className="page-shell contact-inner">
            <div className="section-topline"><span className="section-kicker">04 / NEXT CHAPTER</span><span className="section-caption">Good things start with a conversation</span></div>
            <ScrollReveal className="contact-main"><p className="contact-pretitle">CONTACT / OPEN CHANNELS</p><h2 id="contact-title">Let’s start<br /><em>a conversation.</em></h2><p className="contact-intro">For project conversations, questions, or a hello, reach me through any of these channels.</p><MagneticLink href={emailUrl} className="contact-email-cta">Email Dinesh <span aria-hidden="true">↗</span></MagneticLink><ResumeActions className="contact-resume-actions" /><div className="contact-links"><a href={emailUrl}><span className="contact-link-label">EMAIL</span><span>dineshbabuk1206@gmail.com</span><span aria-hidden="true">↗</span></a><a href={linkedinUrl} target="_blank" rel="noreferrer"><span className="contact-link-label">LINKEDIN</span><span>View profile</span><span aria-hidden="true">↗</span></a><a href={githubUrl} target="_blank" rel="noreferrer"><span className="contact-link-label">GITHUB</span><span>Dineshbabu-thevar</span><span aria-hidden="true">↗</span></a></div></ScrollReveal>
            <div className="contact-bottom"><span>DINESH BABU THEVAR</span><span>AI & ML / DEVELOPMENT / DESIGN</span></div>
          </div>
        </section>
      </main>
      <Footer githubUrl={githubUrl} />
    </>
  )
}