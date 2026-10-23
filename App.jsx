import { useEffect, useMemo, useState } from 'react'
import './index.css'
import metaImg from './Meta.png'
import spotifyImg from './Spotify.png'
import codingGif from './Coding.gif'
import animationGif from './Animation1.gif'
import photoImg from './Photo.jpeg'
import htmlIcon from './html.png'
import cssIcon from './css.png'
import javascriptIcon from './javascript.png'
import reactjsIcon from './reactjs.png'
import tailwindIcon from './tailwind.png'
import nodejsIcon from './nodejs.png'
import viteIcon from './vite.png'
import firebaseIcon from './firebase.png'
import muiIcon from './MUI.png'
import bootstrapIcon from './bootstrap.png'
import vercelIcon from './vercel.png'
import sweetalertIcon from './SweetAlert.png'

const words = ['Creative Developer', 'Tech Enthusiast', 'Digital Builder']
const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Portfolio', '#portfolio'],
  ['Contact', '#contact'],
]
const projects = [
  { title: 'Pikabot', description: 'Ruang eksperimen untuk web, automasi, dan ide digital yang dibuat lebih sederhana.', image: metaImg, tags: ['React', 'Web', 'System'] },
  { title: 'Interface Study', description: 'Eksplorasi visual tentang ritme, tipografi, dan interaksi yang terasa hidup.', image: spotifyImg, tags: ['UI', 'Motion', 'Design'] },
  { title: 'Small Things', description: 'Catatan kecil, proses belajar, dan eksperimen yang tumbuh menjadi karya.', image: codingGif, tags: ['Build', 'Learn', 'Explore'] },
]
const stack = [
  { name: 'HTML', icon: htmlIcon }, { name: 'CSS', icon: cssIcon }, { name: 'JavaScript', icon: javascriptIcon }, { name: 'ReactJS', icon: reactjsIcon },
  { name: 'Tailwind', icon: tailwindIcon }, { name: 'Node.js', icon: nodejsIcon }, { name: 'Vite', icon: viteIcon }, { name: 'Firebase', icon: firebaseIcon },
  { name: 'Material UI', icon: muiIcon }, { name: 'Bootstrap', icon: bootstrapIcon }, { name: 'Vercel', icon: vercelIcon }, { name: 'SweetAlert2', icon: sweetalertIcon },
]

function App() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tab, setTab] = useState('projects')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const start = performance.now()
    let frame
    const tick = (time) => {
      const progress = Math.min(100, Math.round(((time - start) / 950) * 100))
      setLoadingProgress(progress)
      if (progress < 100) frame = requestAnimationFrame(tick)
      else window.setTimeout(() => setLoading(false), 300)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const target = words[wordIndex]
    const speed = deleting ? 44 : 92
    const pause = deleting ? 0 : typed === target ? 1700 : 0
    const timer = window.setTimeout(() => {
      if (!deleting && typed === target) return setDeleting(true)
      if (deleting && typed === '') { setDeleting(false); setWordIndex((index) => (index + 1) % words.length); return }
      setTyped(deleting ? target.slice(0, typed.length - 1) : target.slice(0, typed.length + 1))
    }, pause || speed)
    return () => window.clearTimeout(timer)
  }, [typed, deleting, wordIndex])

  useEffect(() => {
    const reveal = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    reveal.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [loading])

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Pesan dari ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nBalas ke: ${form.email}`)
    window.location.href = `mailto:hello@pikabot.my.id?subject=${subject}&body=${body}`
  }

  const activeStack = useMemo(() => stack, [])

  return (
    <>
      <div className={`zip-loader ${loading ? 'is-active' : 'is-done'}`} aria-hidden={!loading}>
        <div className="zip-loader__glow" />
        <img src={codingGif} alt="" />
        <strong>Ndraa<span>.</span></strong>
        <div className="zip-loader__bar"><i style={{ width: `${loadingProgress}%` }} /></div>
        <small>initializing experience / {loadingProgress}%</small>
      </div>
      <div className="zip-background" aria-hidden="true"><i /><i /><i /><i /><b /></div>

      <header className={`zip-nav ${menuOpen ? 'is-open' : ''}`}>
        <a className="zip-logo" href="#home" onClick={() => setMenuOpen(false)}>Ndraa<span>.</span></a>
        <nav>
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="zip-nav__cta" href="#contact">Let&apos;s talk <span className="zip-icon zip-icon--up" aria-hidden="true" /></a>
        <button className="zip-menu" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation"><span /><span /></button>
      </header>

      <main>
        <section id="home" className="zip-hero zip-wrap">
          <div className="zip-hero__copy" data-reveal>
            <div className="zip-pill"><span /> Ready to create something new</div>
            <p className="zip-eyebrow">NDRAA / PIKABOT.MY.ID</p>
            <h1>Creative<br /><em>Developer</em></h1>
            <div className="zip-typing">{typed}<b>|</b></div>
            <p className="zip-lead">Menciptakan pengalaman digital yang inovatif, fungsional, dan tetap terasa personal.</p>
            <div className="zip-chips">{['React', 'JavaScript', 'Motion', 'Design'].map((item) => <span key={item}>{item}</span>)}</div>
            <div className="zip-actions"><a className="zip-button" href="#portfolio">Projects <span className="zip-icon zip-icon--up" aria-hidden="true" /></a><a className="zip-button zip-button--ghost" href="#contact">Contact <span className="zip-icon zip-icon--right" aria-hidden="true" /></a></div>
            <div className="zip-socials"><a href="#contact">GitHub</a><a href="#contact">Instagram</a><a href="#contact">Mail</a></div>
          </div>
          <div className="zip-hero__visual" data-reveal>
            <div className="zip-visual-glow" />
            <div className="zip-gif-card"><img src={codingGif} alt="Animasi coding dari project referensi" /></div>
            <div className="zip-gif-card zip-gif-card--small"><img src={animationGif} alt="Animasi visual dari project referensi" /></div>
            <div className="zip-code-lines"><span>const</span> idea = <b>build</b>(<i>"better"</i>)</div>
          </div>
        </section>

        <section id="about" className="zip-section zip-wrap" data-reveal>
          <div className="zip-section-heading"><span>01 / About</span><p>Transforming ideas into digital experiences</p></div>
          <div className="zip-about-grid">
            <div className="zip-profile"><img src={photoImg} alt="Foto Ndraa di pantai" /><div className="zip-profile__ring" /></div>
            <div className="zip-about-copy"><p className="zip-eyebrow">Hello, I&apos;m</p><h2>Ndraa</h2><p>Saya suka membangun sesuatu dari ide yang masih abstrak sampai menjadi pengalaman digital yang bisa digunakan dan dirasakan. Pikabot.my.id menjadi ruang untuk karya, proses, dan eksperimen saya.</p><div className="zip-quote">&quot;Keep learning, keep building, keep it human.&quot;</div><a className="zip-text-link" href="#portfolio">Explore my work <span className="zip-icon zip-icon--right" aria-hidden="true" /></a></div>
          </div>
          <div className="zip-stats"><div><b>03</b><span>Selected works</span></div><div><b>∞</b><span>Curiosity level</span></div><div><b>01</b><span>Digital playground</span></div></div>
        </section>

        <section id="portfolio" className="zip-section zip-wrap" data-reveal>
          <div className="zip-section-heading"><span>02 / Portfolio</span><p>Selected work and technical playground</p></div>
          <div className="zip-portfolio-head"><div><p className="zip-eyebrow">A few things I&apos;ve made</p><h2>Portfolio <em>showcase</em></h2></div><span className="zip-count">03 / 10</span></div>
          <div className="zip-tabs"><button className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}>Projects <span className="zip-icon zip-icon--up" aria-hidden="true" /></button><button className={tab === 'stack' ? 'active' : ''} onClick={() => setTab('stack')}>Tech stack <span className="zip-icon zip-icon--plus" aria-hidden="true" /></button></div>
          {tab === 'projects' ? <div className="zip-project-grid">{projects.map((project, index) => <article className="zip-project" key={project.title} data-reveal><div className="zip-project__image"><img src={project.image} alt={`${project.title} preview`} /></div><div className="zip-project__meta"><span>0{index + 1}</span><span>{project.tags.join(' / ')}</span></div><h3>{project.title}</h3><p>{project.description}</p><a href="#contact">View project <span className="zip-icon zip-icon--up" aria-hidden="true" /></a></article>)}</div> : <div className="zip-stack-grid">{activeStack.map((item, index) => <div className="zip-stack" key={item.name}><span>0{index + 1}</span><img src={item.icon} alt="" /><b>{item.name}</b><i className="zip-icon zip-icon--up" aria-hidden="true" /></div>)}</div>}
        </section>

        <section id="contact" className="zip-section zip-wrap zip-contact" data-reveal>
          <div className="zip-section-heading"><span>03 / Contact</span><p>Let&apos;s make something meaningful</p></div>
          <div className="zip-contact-grid"><div><p className="zip-eyebrow">Have an idea?</p><h2>Let&apos;s build<br /><em>something great.</em></h2><p className="zip-lead">Punya ide atau ingin berkolaborasi? Kirim pesan, dan kita mulai dari sana.</p><a className="zip-email" href="mailto:ndrraaaaaaaa@gmail.com">ndrraaaaaaaa@gmail.com<span className="zip-icon zip-icon--up" aria-hidden="true" /></a></div><form onSubmit={handleSubmit}><label>Nama<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nama kamu" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="email@kamu.com" /></label><label>Pesan<textarea required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Ceritakan idemu..." /></label><button className="zip-button" type="submit">Send message <span className="zip-icon zip-icon--up" aria-hidden="true" /></button></form></div>
        </section>
      </main>
      <footer className="zip-footer zip-wrap"><span>Ndraa<span>.</span></span><small>Built with curiosity / pikabot.my.id</small><a href="#home">Back to top <span className="zip-icon zip-icon--up" aria-hidden="true" /></a></footer>
    </>
  )
}

export default App
