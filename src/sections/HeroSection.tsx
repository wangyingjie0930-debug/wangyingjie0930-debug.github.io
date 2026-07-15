import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import Particles from '../components/Particles';

const navItems = ['About', 'Expertise', 'Projects', 'Gallery'];

export default function HeroSection() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Hero 头像跟随鼠标视差倾斜 — 整体幅度 ×1.25(原 15/15/3/3 → 18.75/18.75/3.75/3.75)
  const translateX = useTransform(springX, [0, 1], [18.75, -18.75]);
  const translateY = useTransform(springY, [0, 1], [18.75, -18.75]);
  const rotateX = useTransform(springY, [0, 1], [3.75, -3.75]);
  const rotateY = useTransform(springX, [0, 1], [-3.75, 3.75]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative h-screen flex flex-col overflow-x-clip"
      onMouseMove={handleMouseMove}
    >
      {/* Particles background - full screen behind everything */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#7c8dc0', '#8899cc', '#a7b8e0']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          moveParticlesOnHover={true}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={1}
        />
      </div>

      {/* Navbar - very top */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-between w-full gap-12 sm:gap-16 md:gap-20"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* Hero Heading - directly below navbar, fills the top band, behind portrait */}
      <div className="absolute top-[3.5rem] sm:top-[4.5rem] md:top-[5rem] left-0 right-0 overflow-hidden z-10 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading uppercase whitespace-nowrap w-full text-center text-[11.5vw] sm:text-[12.65vw] md:text-[13.8vw] lg:text-[14.95vw] select-none origin-center"
          style={{ letterSpacing: '-0.01em' }}
        >
          HI, I'M EVAN
        </motion.h1>
      </div>

      {/* Hero Portrait - centered, follows mouse with parallax tilt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ x: translateX, y: translateY, rotateX, rotateY }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 flex justify-center z-10 pointer-events-none"
      >
        <div className="h-full flex items-center justify-center">
          <img
            src="/avatar.webp"
            alt="Evan Portrait"
            className="h-[80.5vh] sm:h-[86.25vh] md:h-[92vh] w-auto object-contain pointer-events-none select-none translate-y-[6vh] md:translate-y-[4vh]"
            draggable={false}
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="relative z-20 mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            10Y KIDS FOOTWEAR
            <br />
            FOOTWEAR DESIGN
            <br />
            TEAM MANAGEMENT
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <Magnet padding={80} strength={3} activeTransition="transform 0.2s ease-out" inactiveTransition="transform 0.5s ease-in-out">
            <ContactButton />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
