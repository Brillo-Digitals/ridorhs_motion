import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../Button';
import { FiArrowRight } from 'react-icons/fi';

// A simple floating orb component for background animation
function FloatingOrb({ color, size, top, left, delay, duration }) {
    return (
        <motion.div
            className="absolute rounded-full mix-blend-screen filter blur-[80px] pointer-events-none"
            style={{
                backgroundColor: color,
                width: size,
                height: size,
                top,
                left,
            }}
            animate={{
                y: [0, -40, 0],
                x: [0, 30, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
        />
    );
}

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Split text animation for headline
    const headline = "Creative Motion Design & Video Editing";
    const words = headline.split(" ");

    const containerAttr = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 * i },
        }),
    };

    const childAttr = {
        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
        hidden: { opacity: 0, y: 40 },
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            id="hero"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--color-primary)]">
                {/* Abstract Grid Map */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN1Y1LjM3M0g1LjM3M3Y0OS4yNTRoNDkuMjU0ek01LjM3MyA1LjM3M2g0OS4yNTR2NDkuMjU0SDUuMzczVjUuMzczem0yNC42MjcgMjQuNjI3VjUuMzczSDI5Ljk5djk0LjEyN2g0Mi42MzZIMjkuOTl6bTAgMjQuNjI3aC0xLjEzNXYtNDkuMjU0aDEuMTM1djQ5LjI1NHptMjQuNjI3LTQ5LjI1NHYxLjEzM0g1LjM3M1Y1LjM3M2g0OS4yNTR6TTE3LjUgMjh2MmgtMTJ2LTJoMTJ6bTE3IDI0djJoLTEydS0yaDEyem0xNy0yNHYyaC0xMnYtMmgxMnoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none"></div>

                {/* Animated Orbs */}
                <FloatingOrb color="var(--color-accent-primary)" size="400px" top="-10%" left="10%" delay={0} duration={8} />
                <FloatingOrb color="var(--color-accent-secondary)" size="300px" top="30%" left="60%" delay={2} duration={10} />
                <FloatingOrb color="var(--color-highlight)" size="350px" top="-20%" left="80%" delay={1} duration={9} />
                <FloatingOrb color="var(--color-accent-primary)" size="250px" top="60%" left="20%" delay={3} duration={7} />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] via-transparent to-transparent z-10"></div>
            </div>

            {/* Main Content */}
            <motion.div
                className="container mx-auto px-6 max-w-5xl relative z-20 text-center"
                style={{ y: y1, opacity }}
            >
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                >
                    <span className="text-[var(--color-accent-secondary)] text-sm font-medium tracking-wide uppercase">
                        A Premium Studio Experience
                    </span>
                </motion.div>

                {/* Dynamic Headline */}
                <motion.h1
                    variants={containerAttr}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-black font-poppins text-white mb-6 leading-[1.1] tracking-tight"
                >
                    {words.map((word, index) => (
                        <motion.span
                            variants={childAttr}
                            key={index}
                            className={`inline-block mr-[0.25em] ${word === 'Motion'
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] italic pr-1'
                                    : ''
                                }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Transforming ideas into captivating visual experiences through high-end animation, dynamic editing, and creative storytelling.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                >
                    <Button href="/#portfolio" icon={FiArrowRight} className="w-full sm:w-auto px-8 py-4 text-lg">
                        View Portfolio
                    </Button>
                    <Button href="/#contact" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">
                        Let's Talk
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-xs text-[var(--color-text-secondary)] tracking-widest uppercase">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-divider)] to-[var(--color-accent-primary)]"
                    animate={{
                        scaleY: [0, 1, 0],
                        transformOrigin: ["top", "top", "bottom"],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
