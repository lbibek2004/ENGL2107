import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'

import logo from './assets/logo.png'
import introVideo from './assets/intro.mp4'
import bgTexture from './assets/BGimg.png'
import heroImage from './assets/WatchingNetflix.png'
import BlueProfile from './assets/ProfileIcons/BlueProfile.png'
import GreyProfile from './assets/ProfileIcons/GreyProfile.png'
import LimeProfile from './assets/ProfileIcons/LimeProfile.png'
import PurpleProfile from './assets/ProfileIcons/PrurpleProfile.png'
import RedProfile from './assets/ProfileIcons/RedProfile.png'
import YellowProfile from './assets/ProfileIcons/YellowProfile.png'

const profiles = [
  { name: 'Medium', img: BlueProfile },
  { name: 'Maddie', img: GreyProfile },
  { name: 'Bryce', img: LimeProfile },
  { name: 'Emma', img: PurpleProfile },
  { name: 'AI', img: RedProfile },
  { name: 'Bibek', img: YellowProfile },
]

const conceptCards = [
  {
    title: 'Medium is the Message',
    body:
      'The platform reshapes stories: skip intros, speed controls, and watch-anywhere screens turn narrative into an on-demand stream.',
    accent: 'signal',
  },
  {
    title: 'Hot vs. Cool Media',
    body:
      'Streaming is a cool medium: viewers must choose, pause, rewind, and binge. Interaction pulls us in deeper than a scheduled TV broadcast.',
    accent: 'heat',
  },
  {
    title: 'Global Village',
    body:
      'Algorithmic curation connects niche communities instantly—K‑dramas, true crime, stand-up—shared memes appear overnight worldwide.',
    accent: 'village',
  },
]

const mediumCards = [
  {
    title: 'Interface as Channel',
    body: 'Rows, tiles, and trailers auto-play to keep attention drifting forward—navigation itself delivers the "message."',
  },
  {
    title: 'Binge Architecture',
    body: 'Season drops remove weekly suspense, trading anticipation for immersion and long, continuous sessions.',
  },
  {
    title: 'Adaptive Thumbnails',
    body: 'Artwork shifts per viewer to hint at romance, action, or cast—visual cues tuned to taste data.',
  },
]

const applyingCards = [
  {
    title: 'Attention Loops',
    body: 'Post-episode countdowns and skip buttons shorten friction, nudging another hour of viewing.',
  },
  {
    title: 'Social Sync',
    body: 'Simultaneous drops spark online watch-parties and collective reactions instead of living-room watercoolers.',
  },
  {
    title: 'Ambient Screens',
    body: 'Phones, tablets, TVs—Netflix follows context, shrinking and expanding to fit any moment of the day.',
  },
]

const implicationCards = [
  {
    title: 'Shared Experience',
    body: 'The village is digital: memes, group chats, and spoiler culture form hours after release.',
  },
  {
    title: 'Curation Power',
    body: 'A few recommendation loops decide what surfaces; creator visibility depends on data, not airtime.',
  },
  {
    title: 'Viewer Agency',
    body: 'Controls like skip intro, speed, and download shift narrative pacing into the viewer’s hands.',
  },
]

const heroVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  }),
}

function Section({ id, kicker, title, lead, cards, image, gradient }) {
  return (
    <section
      id={id}
      className="section"
      style={{
        backgroundImage: `linear-gradient(${gradient || '180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.9)'}), url(${bgTexture})`,
      }}
    >
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={heroVariant}
        >
          {kicker}
        </motion.p>
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={heroVariant}
          custom={0.1}
        >
          {title}
        </motion.h2>
        <motion.p
          className="lead"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={heroVariant}
          custom={0.2}
        >
          {lead}
        </motion.p>

        <div className="card-grid">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`card ${card.accent ? `card-${card.accent}` : ''}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariant}
              custom={0.15 * index}
            >
              <div className="card-header">
                <span className="pill">{index + 1}</span>
                <h3>{card.title}</h3>
              </div>
              <p>{card.body}</p>
            </motion.article>
          ))}
        </div>

        {image && (
          <motion.img
            src={image}
            alt="visual"
            className="section-visual"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        )}
      </div>
    </section>
  )
}

function IntroOverlay({ show, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleEnd = () => onClose()
    video.addEventListener('ended', handleEnd)
    return () => video.removeEventListener('ended', handleEnd)
  }, [onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <video
            ref={videoRef}
            className="intro-video"
            src={introVideo}
            autoPlay
            muted
            playsInline
          />
          <button className="skip" onClick={onClose}>
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const fallback = setTimeout(() => setShowIntro(false), 12000)
    return () => clearTimeout(fallback)
  }, [])

  return (
    <div className="page">
      <IntroOverlay show={showIntro} onClose={() => setShowIntro(false)} />

      <header className="nav">
        <div className="brand">
          <img src={logo} alt="Site logo" />
          <div>
            <p className="mini">ENG 2107</p>
            <strong>Netflix x McLuhan</strong>
          </div>
        </div>
        <div className="nav-links">
          <a href="#hero">Profiles</a>
          <a href="#through">Through McLuhan</a>
          <a href="#medium">As a Medium</a>
          <a href="#implications">Implications</a>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="show"
            variants={heroVariant}
            custom={0}
          >
            <p className="eyebrow">Who&apos;s watching?</p>
            <h1>Pick a profile, pick a perspective.</h1>
            <p className="lead">
              Netflix is more than entertainment; it is a medium that rewires how we watch,
              think, and connect. Choose a lens and follow the story below.
            </p>
            <div className="profiles">
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.name}
                  className="profile-card"
                  initial="hidden"
                  animate="show"
                  variants={cardVariant}
                  custom={0.08 * index}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <img src={profile.img} alt={profile.name} />
                  <span>{profile.name}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="hero-actions"
              initial="hidden"
              animate="show"
              variants={heroVariant}
              custom={0.5}
            >
              <a className="cta" href="#through">
                Scroll to begin
              </a>
              <span className="hint">Scroll to explore the medium.</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <img src={heroImage} alt="People watching Netflix" />
            <div className="floating">
              <motion.div
                className="pill status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                autoplay • subtitles • 1.0x
              </motion.div>
              <motion.div
                className="pill status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                binge mode enabled
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Section
          id="through"
          kicker="McLuhan Lens"
          title="Netflix Through McLuhan"
          lead="Instead of waiting a week for new episodes, seasons drop at once. Binge-ready design keeps viewers glued and pushes conversation online in real time."
          cards={conceptCards}
          image={null}
          gradient="140deg, rgba(10,10,10,0.9), rgba(7,7,7,0.7)"
        />

        <Section
          id="medium"
          kicker="Medium Mechanics"
          title="Netflix as a Medium"
          lead="The interface, release schedule, and algorithm are not extras—they are the medium shaping meaning." 
          cards={mediumCards}
          image={heroImage}
          gradient="160deg, rgba(8,8,8,0.9), rgba(12,12,12,0.65)"
        />

        <Section
          id="applying"
          kicker="Applying McLuhan"
          title="How the medium steers behavior"
          lead="From countdown timers to downloads, small interface choices direct the pace, place, and community around each story."
          cards={applyingCards}
          image={null}
          gradient="120deg, rgba(6,6,6,0.92), rgba(18,18,18,0.7)"
        />

        <Section
          id="implications"
          kicker="Implications"
          title="What this means for viewers and creators"
          lead="Shared drops, algorithmic power, and viewer controls are rewriting how culture circulates—and who gets seen."
          cards={implicationCards}
          image={null}
          gradient="180deg, rgba(5,5,5,0.94), rgba(15,15,15,0.68)"
        />
      </main>

      <footer className="footer">
        <div className="brand">
          <img src={logo} alt="logo" />
          <span>Thanks for watching.</span>
        </div>
        <p className="mini">© 2026 Bibek Luitel</p>
      </footer>
    </div>
  )
}

export default App
