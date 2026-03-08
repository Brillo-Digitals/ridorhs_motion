import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, centered = true }) {
    return (
        <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : 'text-left'}`}>
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[var(--color-accent-secondary)] font-poppins font-medium tracking-wider uppercase text-sm mb-2 block"
                >
                    {subtitle}
                </motion.span>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold font-poppins text-white"
            >
                {title}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`h-1 w-20 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] mt-6 ${centered ? 'mx-auto' : ''}`}
            />
        </div>
    );
}
